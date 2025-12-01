"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Diamond } from "lucide-react";
import SpellDetail from "./components/SpellDetail";
// import SpellFilterModal from "./components/SpellFilterModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// ======================== HELPERS ========================
function normalizeSchool(school) {
  if (!school) return "";
  return String(school).toLowerCase().trim();
}

// sementara warna sekolah putih semua
function getSchoolColor() {
  return "#e5e7eb";
}

function normalizeLevel(level) {
  if (level == null) return "";
  const num = Number(level);
  if (Number.isNaN(num)) return String(level);
  return String(num);
}

function getLevelLabel(level) {
  const num = Number(level);
  if (Number.isNaN(num)) return level;
  return num === 0 ? "Cantrip" : `Level ${num}`;
}

function makeSlug(spell) {
  const name = (spell.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `spell-${name}`;
}

function cap(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Ambil objek activation mentah lalu jadikan label singkat
 * contoh: "1 Action", "Bonus Action", "Reaction"
 */
function getActivationLabel(spell) {
  const activation =
    spell.activation ||
    spell.format_data?.activation ||
    spell.raw_data?.system?.activation;

  if (!activation || typeof activation !== "object") return "";

  const value = activation.value;
  const type = activation.type;

  if (!type) return "";

  const map = {
    action: "Action",
    bonus: "Bonus Action",
    reaction: "Reaction",
    minute: "Minute",
    hour: "Hour",
  };

  const typeLabel = map[type] || cap(String(type));

  if (value != null && value !== "" && Number(value) !== 0) {
    return `${value} ${typeLabel}`;
  }

  return typeLabel;
}

/**
 * Ambil range + template → "Self (100 ft line)" dll.
 * - Jika units = self/touch → hanya "Self"/"Touch"
 * - Jika value > 0 → "100 ft"
 * - Jika value = 0 → hanya units capitalized ("Self", "Touch", dll)
 */
function getRangeLabel(spell) {
  const range =
    spell.range ||
    spell.format_data?.range ||
    spell.raw_data?.system?.range;

  const template =
    spell.template ||
    spell.format_data?.template ||
    spell.raw_data?.system?.target?.template;

  let base = "";

  if (!range) {
    base = "";
  } else if (typeof range === "string") {
    const raw = range.trim().toLowerCase();

    // khusus pattern "0 self" / "self 0"
    if (raw.includes("self")) {
      return "Self";
    }
    // khusus pattern "0 touch" / "touch 0"
    if (raw.includes("touch")) {
      return "Touch";
    }

    // pattern "0 ft", "0 m", dll → ambil units saja
    const m = raw.match(/^0+\s+([a-z]+.*)$/);
    if (m) {
      // kembalikan units dengan huruf pertama besar
      return cap(m[1]);
    }

    // selain itu, pakai apa adanya
    base = range;
  } else if (typeof range === "object") {
    const units = range.units || range.unit;
    const value = range.value;

    if (!units && (value == null || value === "")) {
      base = "";
    } else if (units === "self") {
      // Self tanpa value
      base = "Self";
    } else if (units === "touch") {
      // Touch tanpa value
      base = "Touch";
    } else if (value != null && Number(value) !== 0) {
      // Ada value > 0
      base = `${value} ${units || ""}`.trim();
    } else if (units) {
      // value 0 / null → tampilkan units saja (cap)
      base = cap(String(units));
    }
  }

  // gabung dengan template kalau ada
  if (template && typeof template === "object") {
    const size = template.size;
    const tType = template.type;
    const tUnits = template.units || template.unit || "";

    const innerParts = [];
    if (size != null && size !== "") {
      innerParts.push(`${size}${tUnits ? tUnits : ""}`.trim());
    }
    if (tType) innerParts.push(cap(String(tType)));

    const inner = innerParts.join(" ");
    if (inner) {
      if (!base) return inner; // fallback kalau range kosong
      return `${base} (${inner})`;
    }
  }

  return base || "";
}

/**
 * Baca flag concentration dari duration object
 */
function getConcentrationFlag(spell) {
  const duration =
    spell.duration ||
    spell.format_data?.duration ||
    spell.raw_data?.system?.duration;

  if (!duration) return false;

  if (typeof duration === "object") {
    if (typeof duration.concentration === "boolean") {
      return duration.concentration;
    }
    if (typeof duration.concentration === "string") {
      return duration.concentration.toLowerCase() === "true";
    }
  }

  if (typeof duration === "string") {
    return duration.toLowerCase().includes("concentration");
  }

  return false;
}

/**
 * Summary: "Level 6 • 1 Action • Self (100 ft line)"
 */
function getSpellSummary(spell) {
  const lvl = normalizeLevel(spell.level ?? spell.level_int ?? spell.lvl ?? 0);
  const levelLabel = getLevelLabel(lvl);
  const activationLabel = getActivationLabel(spell);
  const rangeLabel = getRangeLabel(spell);

  return [levelLabel, activationLabel, rangeLabel]
    .filter((x) => x && String(x).trim() !== "")
    .join(" • ");
}

// ======================== COMPONENT ========================
export default function FoundrySpellView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [spells, setSpells] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [schoolFilters, setSchoolFilters] = useState([]);
  const [levelFilters, setLevelFilters] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  // ===== Mobile state =====
  const [isMobile, setIsMobile] = useState(false);
  const [pane, setPane] = useState("list");
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

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

  // ===== Fetch spells =====
  useEffect(() => {
    async function fetchSpells() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/ignite/spells/all`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const arr = Array.isArray(json.spells) ? json.spells : [];

        setSpells(arr);

        const urlSlug = searchParams.get("spell");
        if (urlSlug) {
          const found = arr.find((sp) => makeSlug(sp) === urlSlug);
          if (found) {
            setSelected(found);
            return;
          }
        }

        if (arr.length > 0) setSelected(arr[0]);
      } catch (err) {
        setError(err.message || "Failed to load spells");
      } finally {
        setLoading(false);
      }
    }

    fetchSpells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredSpells = useMemo(() => {
    const term = search.trim().toLowerCase();

    return spells.filter((sp) => {
      const name = (sp.name || "").toLowerCase();
      const schoolKey = normalizeSchool(sp.school || sp.school_name || "");
      const lvl = normalizeLevel(sp.level ?? sp.level_int ?? sp.lvl ?? "");

      const matchesSearch =
        term === ""
          ? true
          : name.includes(term) ||
            schoolKey.includes(term) ||
            (`${lvl}` || "").includes(term);

      const matchesSchool =
        schoolFilters.length === 0 ? true : schoolFilters.includes(schoolKey);

      const matchesLevel =
        levelFilters.length === 0 ? true : levelFilters.includes(lvl);

      return matchesSearch && matchesSchool && matchesLevel;
    });
  }, [spells, search, schoolFilters, levelFilters]);

  function handleSelect(spell, fromMobile = false) {
    setSelected(spell);
    const slug = makeSlug(spell);
    const params = new URLSearchParams();
    params.set("spell", slug);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    if (isMobile && fromMobile) {
      setPane("detail");
    }
  }

  const activeFilterCount =
    (schoolFilters.length ? 1 : 0) + (levelFilters.length ? 1 : 0);

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
        </div>

        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="relative px-3 py-2 text-xs font-medium bg-slate-900 border border-slate-700 rounded-xl 
            hover:bg-slate-800 hover:border-indigo-400 hover:text-indigo-200 transition flex items-center justify-center"
        >
          ☰
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
          ) : filteredSpells.length === 0 ? (
            <div className="p-4 text-xs text-slate-400">No spells found.</div>
          ) : (
            filteredSpells.map((spell) => {
              const key = spell.__global_id || spell.id || spell.name;
              const isActive =
                selected &&
                (selected.__global_id || selected.id) ===
                  (spell.__global_id || spell.id);

              const imgSrc =
                spell.image ||
                spell.format_data?.img ||
                spell.raw_data?.img ||
                "/assets/example_token.png";

              const school =
                spell.school || spell.school_name || "Unknown School";
              const schoolColor = getSchoolColor(
                spell.school || spell.school_name
              );

              const summary = getSpellSummary(spell); // "Level 6 • 1 Action • Self (100 ft line)"
              const isConcentration = getConcentrationFlag(spell);

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

                  {/* kanan: school + concentration diamond */}
                  <div className=" items-center gap-2 text-right text-[10px] text-slate-400 leading-tight shrink-0">
                    <div className="capitalize">{school}</div>
                    <Diamond
                      className={`w-4 h-4 ${
                        isConcentration
                          ? "text-slate-50 fill-slate-50"
                          : "text-slate-500 fill-transparent"
                      }`}
                    />
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
            <SpellDetail spell={selected} />
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div
          className="md:hidden relative h-full flex flex-col min-h-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="shrink-0 sticky top-0 z-20 flex items-center justify-between bg-[#050b26]/90 backdrop-blur border-b border-slate-800 px-3 py-2">
            {pane === "detail" ? (
              <button
                onClick={() => setPane("list")}
                className="px-2 py-1 text-xs rounded-md border border-[#2a2f55] bg-[#101858] hover:bg-[#19246e]"
              >
                Back
              </button>
            ) : (
              <span className="text-xs text-slate-400">Spells</span>
            )}
          </div>

          <div
            className="flex w-[200%] flex-1 min-h-0 transition-all duration-300 ease-in-out"
            style={{
              transform:
                pane === "list" ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            <section className="w-1/2 min-w-[50%] h-full p-4 flex flex-col min-h-0">
              {ListBlock}
            </section>

            <section className="w-1/2 min-w-[50%] h-full p-4 flex flex-col min-h-0">
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-4 overflow-auto">
                {selected ? (
                  <SpellDetail spell={selected} />
                ) : (
                  <p className="text-sm text-slate-400">Select a spell</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FILTER MODAL (masih dimatikan, tinggal aktifkan kalau mau) */}
      {/* {filterOpen && (
        <SpellFilterModal
          schoolOptions={SCHOOL_OPTIONS}
          selectedSchools={schoolFilters}
          levelOptions={LEVEL_OPTIONS}
          selectedLevels={levelFilters}
          onClose={() => setFilterOpen(false)}
          onApply={({ schools, levels }) => {
            setSchoolFilters(schools);
            setLevelFilters(levels);
            setFilterOpen(false);
          }}
        />
      )} */}
    </div>
  );
}
