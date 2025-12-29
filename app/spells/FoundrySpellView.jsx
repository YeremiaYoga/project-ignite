"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SpellDetail from "./components/SpellDetail";
import SpellFilterModal from "./components/SpellFilterModal";
import Cookies from "js-cookie";
import { SlidersHorizontal } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// ======================== HELPERS ========================
function makeSlug(spell) {
  const name = (spell.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `spell-${name}`;
}

function uniq(arr) {
  return Array.from(new Set((arr || []).filter((x) => x !== null && x !== undefined)));
}

// "ONLY/BLACKLIST" active?
function hasListFiltersActive(onlyArr, blackArr) {
  return (Array.isArray(onlyArr) && onlyArr.length > 0) || (Array.isArray(blackArr) && blackArr.length > 0);
}

function normalizeCastTimeKeyForBackend(v) {
  // Modal biasanya pakai label: "Action", "Bonus Action", ...
  // Backend expect lowercase: "action", "bonus action", ...
  return String(v || "").trim().toLowerCase();
}

function normalizeSchoolKeyForBackend(v) {
  // Modal kamu sudah map label -> code, tapi kalau ada yang kebawa label,
  // minimal kita lowercase-kan.
  return String(v || "").trim().toLowerCase();
}

function normalizeHomebrewCode(v) {
  return String(v || "").trim().toLowerCase();
}

function getSpellSummary(spell) {
  const lvl = Number(spell.level ?? spell.level_int ?? spell.lvl ?? 0);
  const levelLabel = lvl === 0 ? "Cantrip" : `Level ${lvl}`;
  const activation =
    spell.activation ||
    spell.format_data?.activation ||
    spell.raw_data?.system?.activation;
  const range =
    spell.range || spell.format_data?.range || spell.raw_data?.system?.range;

  let actLabel = "";
  if (activation && typeof activation === "object") {
    const value = activation.value;
    const type = activation.type;
    const map = {
      action: "Action",
      bonus: "Bonus Action",
      reaction: "Reaction",
      minute: "Minute",
      hour: "Hour",
      round: "Round",
      special: "Special",
    };
    const typeLabel = map[type] || (type ? String(type) : "");
    if (typeLabel) {
      actLabel = value && Number(value) !== 0 ? `${value} ${typeLabel}` : typeLabel;
    }
  }

  let rangeLabel = "";
  if (typeof range === "string") {
    rangeLabel = range;
  } else if (range && typeof range === "object") {
    const units = range.units || range.unit;
    const value = range.value;
    if (units === "self") rangeLabel = "Self";
    else if (units === "touch") rangeLabel = "Touch";
    else if (value != null && Number(value) !== 0) {
      rangeLabel = `${value} ${units || ""}`.trim();
    } else if (units) {
      rangeLabel = String(units);
    }
  }

  return [levelLabel, actLabel, rangeLabel]
    .filter((x) => x && String(x).trim() !== "")
    .join(" • ");
}

function getSpellSchoolCode(spell) {
  const raw =
    spell.school ||
    spell.school_name ||
    spell.format_data?.school ||
    spell.raw_data?.system?.school;

  if (!raw) return "";
  return String(raw).toLowerCase();
}

function hasProperty(spell, target) {
  let props = spell.properties;

  if (typeof props === "string") {
    try {
      props = JSON.parse(props);
    } catch {
      return false;
    }
  }

  if (!Array.isArray(props)) return false;

  const key = String(target).toLowerCase().trim();
  return props.some((p) => String(p).toLowerCase().trim() === key);
}

function getSchoolColor() {
  return "#e5e7eb";
}

// ====== DURATION STEPS (harus sama dengan backend & modal) ======
const DURATION_STEPS = [
  { key: "turn", label: "Turn", sec: 1 },
  { key: "round", label: "Round", sec: 6 },
  { key: "minute", label: "Minute", sec: 360 },
  { key: "hour", label: "Hour", sec: 3600 },
  { key: "day", label: "Day", sec: 86400 },
  { key: "month", label: "Month", sec: 2592000 },
  { key: "year", label: "Year", sec: 31536000 },
];

const DURATION_MIN_INDEX_DEFAULT = 0;
const DURATION_MAX_INDEX_DEFAULT = DURATION_STEPS.length - 1;
const RANGE_MIN_DEFAULT = 0;
const RANGE_MAX_DEFAULT = 999;

// ======================== SORT OPTIONS ========================
const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A → Z)" },
  { value: "name-desc", label: "Name (Z → A)" },
  { value: "level-asc", label: "Level (Low → High)" },
  { value: "level-desc", label: "Level (High → Low)" },
  { value: "rating-desc", label: "Rating (High → Low)" },
  { value: "rating-asc", label: "Rating (Low → High)" },
  { value: "favorites-desc", label: "Favorites (Most → Least)" },
  { value: "favorites-asc", label: "Favorites (Least → Most)" },
];

const INITIAL_FILTERS = {
  favoritesOnly: false,

  // tri-state list (modal output)
  classesOnly: [],
  classesBlacklist: [],
  levelsOnly: [],
  levelsBlacklist: [],
  castTimeOnly: [],
  castTimeBlacklist: [],
  damageTypeOnly: [],
  damageTypeBlacklist: [],
  schoolOnly: [],
  schoolBlacklist: [],

  // tri-state flag
  ritualMode: 0,
  concentrationMode: 0,

  // homebrew: include / only
  homebrewInclude: [],
  homebrewOnly: [],

  durationMinIndex: DURATION_MIN_INDEX_DEFAULT,
  durationMaxIndex: DURATION_MAX_INDEX_DEFAULT,
  durationIncludeInstant: true,
  durationIncludePermanent: true,
  durationIncludeSpecial: true,

  rangeMin: RANGE_MIN_DEFAULT,
  rangeMax: RANGE_MAX_DEFAULT,
  rangeIncludeSelf: true,
  rangeIncludeTouch: true,
};

export default function FoundrySpellView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [spells, setSpells] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [homebrewOptions, setHomebrewOptions] = useState([]);

  // ✅ filters shape sesuai modal
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [sortMode, setSortMode] = useState("name-asc");
  const [filterOpen, setFilterOpen] = useState(false);

  // mobile
  const [isMobile, setIsMobile] = useState(false);
  const [pane, setPane] = useState("list");
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  // ===== fetch homebrew options =====
  useEffect(() => {
    async function fetchHomebrews() {
      try {
        const url = `${API_BASE}/ignite/homebrew/all`;

        const res = await fetch(url, {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Homebrew HTTP ${res.status}`);

        const json = await res.json();
        const arr = Array.isArray(json.data) ? json.data : [];

        arr.sort((a, b) => {
          const ac = (a.code || "").toLowerCase();
          const bc = (b.code || "").toLowerCase();
          if (ac && bc) return ac.localeCompare(bc);
          return String(a.name || "").localeCompare(String(b.name || ""));
        });

        setHomebrewOptions(arr);
      } catch (e) {
        console.warn("⚠️ fetchHomebrews failed:", e?.message || e);
        setHomebrewOptions([]);
      }
    }

    if (API_BASE) fetchHomebrews();
  }, []);

  // ===== detect mobile =====
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onTouchStart = (e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e) => {
    if (!isMobile || touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (!isMobile) return;
    const dx = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;
    const THRESH = 60;

    if (pane === "list" && dx < -THRESH) setPane("detail");
    if (pane === "detail" && dx > THRESH) setPane("list");
  };

  // ===== debounce search =====
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(t);
  }, [search]);

  // ===== memo deps (stabil) =====
  const filterDeps = useMemo(() => {
    return JSON.stringify(filters || {});
  }, [filters]);

  // ===== fetch spells =====
  useEffect(() => {
    async function fetchSpells() {
      try {
        setLoading(true);
        setError("");

        const isLoggedIn = !!Cookies.get("ignite-user-data");
        const baseUrl = isLoggedIn
          ? `${API_BASE}/ignite/spells/all`
          : `${API_BASE}/ignite/spells`;

        const params = new URLSearchParams();

        if (debouncedSearch.trim() !== "") {
          params.set("search", debouncedSearch.trim());
        }

        // ========================
        // ✅ TRI-STATE LIST PARAMS
        // ========================
        const classesOnly = uniq(filters.classesOnly);
        const classesBlacklist = uniq(filters.classesBlacklist);
        if (classesOnly.length) params.set("classesOnly", classesOnly.join(","));
        if (classesBlacklist.length) params.set("classesBlacklist", classesBlacklist.join(","));

        // IMPORTANT: levels sebaiknya string angka "0".."9"
        // Kalau modal kamu pakai "Cantrips", convert ke "0"
        const normalizeLevel = (lv) => {
          const s = String(lv).trim();
          if (s.toLowerCase() === "cantrips" || s.toLowerCase() === "cantrip") return "0";
          // "1" / 1 -> "1"
          return String(Number(s));
        };

        const levelsOnly = uniq(filters.levelsOnly).map(normalizeLevel).filter((x) => x !== "NaN");
        const levelsBlacklist = uniq(filters.levelsBlacklist).map(normalizeLevel).filter((x) => x !== "NaN");
        if (levelsOnly.length) params.set("levelsOnly", levelsOnly.join(","));
        if (levelsBlacklist.length) params.set("levelsBlacklist", levelsBlacklist.join(","));

        const castTimeOnly = uniq(filters.castTimeOnly).map(normalizeCastTimeKeyForBackend);
        const castTimeBlacklist = uniq(filters.castTimeBlacklist).map(normalizeCastTimeKeyForBackend);
        if (castTimeOnly.length) params.set("castTimeOnly", castTimeOnly.join(","));
        if (castTimeBlacklist.length) params.set("castTimeBlacklist", castTimeBlacklist.join(","));

        const damageTypeOnly = uniq(filters.damageTypeOnly).map((v) => String(v).trim().toLowerCase());
        const damageTypeBlacklist = uniq(filters.damageTypeBlacklist).map((v) => String(v).trim().toLowerCase());
        if (damageTypeOnly.length) params.set("damageTypeOnly", damageTypeOnly.join(","));
        if (damageTypeBlacklist.length) params.set("damageTypeBlacklist", damageTypeBlacklist.join(","));

        const schoolOnly = uniq(filters.schoolOnly).map(normalizeSchoolKeyForBackend);
        const schoolBlacklist = uniq(filters.schoolBlacklist).map(normalizeSchoolKeyForBackend);
        if (schoolOnly.length) params.set("schoolOnly", schoolOnly.join(","));
        if (schoolBlacklist.length) params.set("schoolBlacklist", schoolBlacklist.join(","));

        // ========================
        // ✅ TRI-STATE FLAGS
        // ========================
        params.set("ritualMode", String(Number(filters.ritualMode ?? 0)));
        params.set("concentrationMode", String(Number(filters.concentrationMode ?? 0)));

        // ========================
        // ✅ HOME BREW (backend expect: homebrews + homebrewOnly)
        // ========================
        const hbInclude = uniq(filters.homebrewInclude).map(normalizeHomebrewCode);
        const hbOnly = uniq(filters.homebrewOnly).map(normalizeHomebrewCode);
        if (hbInclude.length) params.set("homebrews", hbInclude.join(","));
        if (hbOnly.length) params.set("homebrewOnly", hbOnly.join(","));

        // ========================
        // ✅ FAVORITES
        // ========================
        if (filters.favoritesOnly) params.set("favoritesOnly", "true");

        // ========================
        // ✅ DURATION (index -> seconds)
        // ========================
        if (
          typeof filters.durationMinIndex === "number" &&
          typeof filters.durationMaxIndex === "number"
        ) {
          const minIdx = Math.max(0, Math.min(DURATION_STEPS.length - 1, filters.durationMinIndex));
          const maxIdx = Math.max(minIdx, Math.min(DURATION_STEPS.length - 1, filters.durationMaxIndex));
          params.set("minDurationSec", String(DURATION_STEPS[minIdx].sec));
          params.set("maxDurationSec", String(DURATION_STEPS[maxIdx].sec));
        }

        const durationFlags = [];
        if (filters.durationIncludeInstant) durationFlags.push("inst");
        if (filters.durationIncludePermanent) durationFlags.push("perm");
        if (filters.durationIncludeSpecial) durationFlags.push("special");
        if (durationFlags.length) params.set("durationFlags", durationFlags.join(","));

        // ========================
        // ✅ RANGE
        // ========================
        if (typeof filters.rangeMin === "number") params.set("minRange", String(filters.rangeMin));
        if (typeof filters.rangeMax === "number") params.set("maxRange", String(filters.rangeMax));

        const rangeFlags = [];
        if (filters.rangeIncludeSelf) rangeFlags.push("self");
        if (filters.rangeIncludeTouch) rangeFlags.push("touch");
        if (rangeFlags.length) params.set("rangeFlags", rangeFlags.join(","));

        // ========================
        // ✅ SORTING
        // ========================
        if (sortMode) {
          const [field, dir] = sortMode.split("-");
          const sortDir = dir === "desc" ? "desc" : "asc";
          const sortBy =
            field === "level"
              ? "level"
              : field === "rating"
              ? "rating"
              : field === "favorites"
              ? "favorites"
              : "name";

          params.set("sortBy", sortBy);
          params.set("sortDir", sortDir);
        }

        const query = params.toString();
        const url = query ? `${baseUrl}?${query}` : baseUrl;

     

        const res = await fetch(url, {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const arr = Array.isArray(json.spells) ? json.spells : [];
        setSpells(arr);

        // URL param selection
        const urlSlug = searchParams.get("spell");
        if (urlSlug) {
          const found = arr.find((sp) => makeSlug(sp) === urlSlug);
          if (found) {
            setSelected(found);
            return;
          }
        }

        // keep selected if still exists
        if (selected) {
          const still = arr.find(
            (sp) =>
              (sp.__global_id || sp.id) === (selected.__global_id || selected.id)
          );
          if (still) {
            setSelected(still);
            return;
          }
        }

        if (arr.length > 0) setSelected(arr[0]);
        else setSelected(null);
      } catch (err) {
        setError(err.message || "Failed to load spells");
        setSpells([]);
        setSelected(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSpells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, sortMode, filterDeps]);

  function handleSpellUpdate(updatedSpell) {
    if (!updatedSpell || !updatedSpell.id) return;

    setSpells((prev) =>
      prev.map((sp) => (sp.id === updatedSpell.id ? { ...sp, ...updatedSpell } : sp))
    );

    setSelected((prev) =>
      prev && prev.id === updatedSpell.id ? { ...prev, ...updatedSpell } : prev
    );
  }

  function handleSelect(spell, fromMobile = false) {
    setSelected(spell);
    const slug = makeSlug(spell);
    const params = new URLSearchParams();
    params.set("spell", slug);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    if (isMobile && fromMobile) setPane("detail");
  }

  // ===== filter badge count =====
  const activeFilterCount = useMemo(() => {
    let n = 0;

    if (hasListFiltersActive(filters.classesOnly, filters.classesBlacklist)) n++;
    if (hasListFiltersActive(filters.levelsOnly, filters.levelsBlacklist)) n++;
    if (hasListFiltersActive(filters.castTimeOnly, filters.castTimeBlacklist)) n++;
    if (hasListFiltersActive(filters.damageTypeOnly, filters.damageTypeBlacklist)) n++;
    if (hasListFiltersActive(filters.schoolOnly, filters.schoolBlacklist)) n++;

    if (Number(filters.ritualMode || 0) !== 0) n++;
    if (Number(filters.concentrationMode || 0) !== 0) n++;

    if (hasListFiltersActive(filters.homebrewInclude, filters.homebrewOnly)) n++;
    if (filters.favoritesOnly) n++;

    // duration changed?
    if (
      filters.durationMinIndex !== DURATION_MIN_INDEX_DEFAULT ||
      filters.durationMaxIndex !== DURATION_MAX_INDEX_DEFAULT ||
      !filters.durationIncludeInstant ||
      !filters.durationIncludePermanent ||
      !filters.durationIncludeSpecial
    ) n++;

    // range changed?
    if (
      filters.rangeMin !== RANGE_MIN_DEFAULT ||
      filters.rangeMax !== RANGE_MAX_DEFAULT ||
      !filters.rangeIncludeSelf ||
      !filters.rangeIncludeTouch
    ) n++;

    return n;
  }, [filters]);

  const ListBlock = (
    <>
      <div className="flex gap-2 mb-4 shrink-0">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search spells..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-xl pl-3 pr-3 py-2 text-xs outline-none
              focus:ring-2 focus:ring-indigo-500/70 transition"
          />
          {search !== debouncedSearch && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
              ...
            </span>
          )}
        </div>

        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="hidden sm:block px-2 py-2 text-[11px] rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="relative p-2 text-xs font-medium bg-slate-900 border border-slate-700 rounded-xl
            hover:bg-slate-800 hover:border-indigo-400 hover:text-indigo-200 transition flex items-center justify-center"
          aria-label="Open spell filter"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-[#050b26] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col min-h-0">
        <div className="flex items-center px-4 py-2 border-b border-slate-800 bg-slate-900/70 text-[11px] uppercase tracking-wide text-slate-400 shrink-0">
          <span className="font-semibold text-slate-100">Spells</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-full px-4 py-3 flex items-center justify-between gap-3 text-xs
                    border-b border-slate-800/50 bg-slate-950/70 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-slate-800/80 border border-slate-700" />
                  <div className="space-y-1">
                    <div className="h-3 w-24 bg-slate-800 rounded" />
                    <div className="h-2 w-32 bg-slate-800 rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="p-4 text-xs text-rose-300">Error: {error}</div>
          ) : spells.length === 0 ? (
            <div className="p-4 text-xs text-slate-400">No spells found.</div>
          ) : (
            spells.map((spell) => {
              const key = spell.__global_id || spell.id || spell.name;
              const isActive =
                selected &&
                (selected.__global_id || selected.id) === (spell.__global_id || spell.id);

              const imgSrc =
                spell.image ||
                spell.format_data?.img ||
                spell.raw_data?.img ||
                "/assets/example_token.png";

              const school = getSpellSchoolCode(spell) || "Unknown School";
              const schoolColor = getSchoolColor();

              const summary = getSpellSummary(spell);
              const isConcentration = hasProperty(spell, "concentration");
              const isRitual = hasProperty(spell, "ritual");

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(spell, true)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 text-xs
                        border-b border-slate-800/50 bg-gradient-to-r
                        ${
                          isActive
                            ? "from-indigo-600/40 to-slate-900/70"
                            : "from-slate-950/80 to-slate-900/40 hover:from-slate-900 hover:to-slate-900/70"
                        }
                        transition`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-md overflow-hidden border"
                      style={{ borderColor: schoolColor }}
                    >
                      <img
                        src={imgSrc}
                        alt={spell.name || "spell"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/example_token.png";
                        }}
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-slate-100 break-words">
                        {spell.name || "Unnamed spell"}
                      </span>
                      <span className="text-[11px] text-slate-300 break-words">
                        {summary}
                      </span>
                    </div>
                  </div>

                  <div className="items-center gap-2 text-right text-[10px] text-slate-400 leading-tight shrink-0">
                    <div className="capitalize">{school}</div>

                    <div className="flex items-center gap-1 justify-end mt-1">
                      {isConcentration && (
                        <img
                          src="https://019a0f6bb5a27dc5b6ab32a19a8ad5d6.phanneldeliver.my.id/foundryvtt/systems/dnd5e/icons/svg/statuses/concentrating.svg"
                          className="w-4 h-4"
                          alt="Concentration"
                          title="Concentration"
                        />
                      )}

                      {isRitual && (
                        <img
                          src="https://019a0f6bb5a27dc5b6ab32a19a8ad5d6.phanneldeliver.my.id/foundryvtt/systems/dnd5e/icons/svg/facilities/empower.svg"
                          className="w-4 h-4"
                          alt="Ritual"
                          title="Ritual"
                        />
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen text-slate-50 flex justify-center w-full">
      <div className="w-full max-w-7xl h-[90vh] bg-slate-950/80 border border-slate-700 rounded-none shadow-xl backdrop-blur-md overflow-hidden">
        {/* DESKTOP VIEW */}
        <div className="hidden md:flex gap-4 h-full">
          <div className="w-[30%] h-full bg-slate-900/80 border-slate-800 p-4 flex flex-col min-h-0">
            {ListBlock}
          </div>

          <div className="flex-1 h-full bg-slate-900/80 p-6 flex flex-col overflow-hidden">
            <SpellDetail spell={selected} onSpellUpdate={handleSpellUpdate} />
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div
          className="md:hidden relative h-full flex flex-col min-h-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex w-[200%] flex-1 min-h-0 transition-all duration-300 ease-in-out"
            style={{
              transform: pane === "list" ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            <section className="w-1/2 min-w-[50%] h-full p-4 flex flex-col min-h-0">
              {ListBlock}
            </section>

            <section className="w-1/2 min-w-[50%] h-full p-4 flex flex-col min-h-0">
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-4 overflow-auto">
                {selected ? (
                  <SpellDetail spell={selected} onSpellUpdate={handleSpellUpdate} />
                ) : (
                  <p className="text-sm text-slate-400">Select a spell</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {filterOpen && (
        <SpellFilterModal
          value={filters}
          homebrewOptions={homebrewOptions}
          onClose={() => setFilterOpen(false)}
          onApply={(newFilters) => {
            // ✅ pastikan shape sama dengan INITIAL_FILTERS
            setFilters((prev) => ({
              ...prev,
              ...newFilters,
            }));
            setFilterOpen(false);
          }}
        />
      )}
    </div>
  );
}
