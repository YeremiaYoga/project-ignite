"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SpellDetail from "./components/SpellDetail";
import SpellFilterModal from "./components/SpellFilterModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const SCHOOL_COLORS = {
  abjuration: "#60a5fa",
  conjuration: "#34d399",
  divination: "#facc15",
  enchantment: "#f97316",
  evocation: "#ef4444",
  illusion: "#a855f7",
  necromancy: "#6b7280",
  transmutation: "#22c55e",
};

const SCHOOL_OPTIONS = [
  { key: "abjuration", label: "Abjuration" },
  { key: "conjuration", label: "Conjuration" },
  { key: "divination", label: "Divination" },
  { key: "enchantment", label: "Enchantment" },
  { key: "evocation", label: "Evocation" },
  { key: "illusion", label: "Illusion" },
  { key: "necromancy", label: "Necromancy" },
  { key: "transmutation", label: "Transmutation" },
];

const LEVEL_OPTIONS = [
  { key: "0", label: "Cantrip" },
  { key: "1", label: "Level 1" },
  { key: "2", label: "Level 2" },
  { key: "3", label: "Level 3" },
  { key: "4", label: "Level 4" },
  { key: "5", label: "Level 5" },
  { key: "6", label: "Level 6" },
  { key: "7", label: "Level 7" },
  { key: "8", label: "Level 8" },
  { key: "9", label: "Level 9" },
];

function normalizeSchool(school) {
  if (!school) return "";
  return String(school).toLowerCase().trim();
}

function getSchoolColor(school) {
  const key = normalizeSchool(school);
//   if (!key) return "#e5e7eb";
//   return SCHOOL_COLORS[key] || "#e5e7eb";

 return "#e5e7eb";
}

function normalizeLevel(level) {
  if (level == null) return "";
  const num = Number(level);
  if (Number.isNaN(num)) return String(level);
  return String(num);
}

function makeSlug(spell) {
  const name = (spell.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `spell-${name}`;
}

function getLevelLabel(level) {
  const num = Number(level);
  if (Number.isNaN(num)) return level;
  return num === 0 ? "Cantrip" : `Level ${num}`;
}

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
          <div className="w-7 h-7 rounded-md border border-slate-600 mr-3 flex items-center justify-center text-[9px]">
            #
          </div>
          <span className="font-semibold text-slate-100">Spell</span>
          <div className="flex-1" />
          <div className="text-right text-[10px] text-slate-400">
            <div>Level</div>
            <div>School</div>
          </div>
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
                    <div className="h-2 w-16 bg-slate-800 rounded" />
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <div className="h-2 w-10 bg-slate-800 rounded" />
                  <div className="h-2 w-8 bg-slate-800 rounded" />
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
              const levelNorm = normalizeLevel(
                spell.level ?? spell.level_int ?? spell.lvl ?? ""
              );
              const levelLabel = getLevelLabel(levelNorm);

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
                      <span className="text-[11px] text-slate-400 capitalize break-words">
                        {school}
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-[10px] text-slate-400 leading-tight shrink-0">
                    <div>{levelLabel}</div>
                    <div className="capitalize">{school}</div>
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
          {/* top bar */}
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

          {/* slider list/detail */}
          <div
            className="flex w-[200%] flex-1 min-h-0 transition-all duration-300 ease-in-out"
            style={{
              transform:
                pane === "list" ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            {/* LIST PANE */}
            <section className="w-1/2 min-w-[50%] h-full p-4 flex flex-col min-h-0">
              {ListBlock}
            </section>

            {/* DETAIL PANE */}
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

      {/* FILTER MODAL */}
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
