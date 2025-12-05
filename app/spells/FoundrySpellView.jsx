"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SpellDetail from "./components/SpellDetail";
import SpellFilterModal from "./components/SpellFilterModal";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// ======================== HELPERS ========================

function cap(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
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

// ===== SCHOOL MAPS (kode <-> label) =====
const SCHOOL_LABEL_BY_CODE = {
  abj: "Abjuration",
  con: "Conjuration",
  div: "Divination",
  enc: "Enchantment",
  evo: "Evocation",
  ill: "Illusion",
  nec: "Necromancy",
  trs: "Transmutation",
};

// raw (dari data) → kode
const SCHOOL_CODE_BY_RAW = {
  abj: "abj",
  abjuration: "abj",

  con: "con",
  conj: "con",
  conjuration: "con",

  div: "div",
  divination: "div",

  enc: "enc",
  ench: "enc",
  enchantment: "enc",

  evo: "evo",
  evocation: "evo",

  ill: "ill",
  illusion: "ill",

  nec: "nec",
  necromancy: "nec",

  trs: "trs",
  transmutation: "trs",
};

// kode school utk filter
function getSpellSchoolCode(spell) {
  const raw =
    spell.school ||
    spell.school_name ||
    spell.format_data?.school ||
    spell.raw_data?.system?.school;

  if (!raw) return "";

  const lower = String(raw).toLowerCase().trim();
  return SCHOOL_CODE_BY_RAW[lower] || lower;
}

// label school utk display
function getSpellSchoolLabel(spell) {
  const code = getSpellSchoolCode(spell);
  if (!code) return "";
  if (SCHOOL_LABEL_BY_CODE[code]) return SCHOOL_LABEL_BY_CODE[code];
  return cap(code);
}

// sementara warna sekolah putih semua
function getSchoolColor() {
  return "#e5e7eb";
}

// Activation label utk display
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
    round: "Round",
    special: "Special",
  };

  const typeLabel = map[type] || cap(String(type));

  if (value != null && value !== "" && Number(value) !== 0) {
    return `${value} ${typeLabel}`;
  }

  return typeLabel;
}

// Activation key utk filter (lowercase)
function getActivationFilterKey(spell) {
  const activation =
    spell.activation ||
    spell.format_data?.activation ||
    spell.raw_data?.system?.activation;

  if (!activation || typeof activation !== "object") return "";

  const type = activation.type;
  if (!type) return "";

  const map = {
    action: "action",
    bonus: "bonus action",
    reaction: "reaction",
    minute: "minute",
    hour: "hour",
    round: "round",
    special: "special",
  };

  return map[type] || String(type).toLowerCase();
}

function getRangeLabel(spell) {
  const range =
    spell.range || spell.format_data?.range || spell.raw_data?.system?.range;

  const template =
    spell.template ||
    spell.format_data?.template ||
    spell.raw_data?.system?.target?.template;

  let base = "";

  if (!range) {
    base = "";
  } else if (typeof range === "string") {
    const raw = range.trim().toLowerCase();

    if (raw.includes("self")) {
      return "Self";
    }
    if (raw.includes("touch")) {
      return "Touch";
    }

    const m = raw.match(/^0+\s+([a-z]+.*)$/);
    if (m) {
      return cap(m[1]);
    }

    base = range;
  } else if (typeof range === "object") {
    const units = range.units || range.unit;
    const value = range.value;

    if (!units && (value == null || value === "")) {
      base = "";
    } else if (units === "self") {
      base = "Self";
    } else if (units === "touch") {
      base = "Touch";
    } else if (value != null && Number(value) !== 0) {
      base = `${value} ${units || ""}`.trim();
    } else if (units) {
      base = cap(String(units));
    }
  }

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
      if (!base) return inner;
      return `${base} (${inner})`;
    }
  }

  return base || "";
}

// Range kategori utk filter: Self, Touch, Point, Area, Special
// NOTE: Area hanya jika ada size, kalau tidak → Point
function getRangeFilterKey(spell) {
  const range =
    spell.range || spell.format_data?.range || spell.raw_data?.system?.range;

  const template =
    spell.template ||
    spell.format_data?.template ||
    spell.raw_data?.system?.target?.template;

  if (!range && !template) return "";

  // Self / Touch dari object
  if (typeof range === "object" && range) {
    const units = (range.units || range.unit || "").toLowerCase();
    if (units === "self") return "Self";
    if (units === "touch") return "Touch";
  }

  // Self / Touch dari string
  if (typeof range === "string") {
    const raw = range.toLowerCase();
    if (raw.includes("self")) return "Self";
    if (raw.includes("touch")) return "Touch";
  }

  // Template → Area hanya kalau ada size
  if (template && typeof template === "object") {
    const size = template.size ?? template.value;
    const hasSize =
      size != null && size !== "" && (Number.isNaN(Number(size)) || Number(size) !== 0);

    if (hasSize) {
      return "Area";
    }

    // template ada tapi tanpa size → dihitung Point
    return "Point";
  }

  // String mengandung bentuk area
  if (typeof range === "string") {
    const raw = range.toLowerCase();
    if (
      raw.includes("cone") ||
      raw.includes("line") ||
      raw.includes("sphere") ||
      raw.includes("cube") ||
      raw.includes("cylinder")
    ) {
      return "Area";
    }
    if (raw.includes("special")) return "Special";
    return "Point";
  }

  // Object units mengandung bentuk area / special
  if (typeof range === "object" && range) {
    const units = (range.units || range.unit || "").toLowerCase();

    if (
      units.includes("cone") ||
      units.includes("line") ||
      units.includes("sphere") ||
      units.includes("cube") ||
      units.includes("cylinder")
    ) {
      return "Area";
    }
    if (units.includes("special")) return "Special";

    if (units) return "Point";
  }

  return "";
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

function getDamageTypes(spell) {
  const out = new Set();

  if (spell.damage_type) out.add(String(spell.damage_type).toLowerCase());

  if (spell.format_data?.damageType) {
    const v = spell.format_data.damageType;
    if (Array.isArray(v)) {
      v.forEach((d) => out.add(String(d).toLowerCase()));
    } else {
      out.add(String(v).toLowerCase());
    }
  }

  const parts = spell.raw_data?.system?.damage?.parts;
  if (Array.isArray(parts)) {
    parts.forEach((p) => {
      if (Array.isArray(p) && p[1]) {
        out.add(String(p[1]).toLowerCase());
      }
    });
  }

  return Array.from(out);
}

// classes utk filter
function getSpellClasses(spell) {
  const raw =
    spell.classes ||
    spell.class_list ||
    spell.format_data?.classes ||
    spell.raw_data?.classes ||
    spell.raw_data?.system?.classes ||
    spell.raw_data?.flags?.dnd5e?.spell?.classes;

  const result = [];

  if (!raw) return result;

  if (Array.isArray(raw)) {
    raw.forEach((c) => {
      if (!c) return;
      result.push(cap(String(c)));
    });
  } else if (typeof raw === "string") {
    raw
      .split(/[;,/]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((c) => result.push(cap(c)));
  } else if (typeof raw === "object") {
    Object.keys(raw).forEach((k) => {
      if (raw[k]) result.push(cap(k));
    });
  }

  return Array.from(new Set(result));
}

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

  const [filters, setFilters] = useState({
    classes: [],
    levels: [],
    castTime: [],
    damageType: [],
    range: [],
    school: [],      // berisi kode: ["abj", "evo", ...]
    ritual: false,
    concentration: false,
  });

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

        const isLoggedIn = !!Cookies.get("ignite-user-data");

        const baseUrl = isLoggedIn
          ? `${API_BASE}/ignite/spells/all`
          : `${API_BASE}/ignite/spells`;

        const res = await fetch(baseUrl, {
          method: "GET",
          cache: "no-store",
          credentials: "include",
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

  function handleSpellUpdate(updatedSpell) {
    if (!updatedSpell || !updatedSpell.id) return;

    setSpells((prev) =>
      prev.map((sp) =>
        sp.id === updatedSpell.id ? { ...sp, ...updatedSpell } : sp
      )
    );

    setSelected((prev) =>
      prev && prev.id === updatedSpell.id ? { ...prev, ...updatedSpell } : prev
    );
  }

  const filteredSpells = useMemo(() => {
    const term = search.trim().toLowerCase();

    return spells.filter((sp) => {
      const name = (sp.name || "").toLowerCase();
      const lvlNum = Number(sp.level ?? sp.level_int ?? sp.lvl ?? 0);
      const lvlKey = Number.isNaN(lvlNum)
        ? ""
        : lvlNum === 0
        ? "Cantrips"
        : lvlNum;

      const schoolLabel = getSpellSchoolLabel(sp);
      const schoolCode = getSpellSchoolCode(sp);
      const schoolLower = schoolLabel.toLowerCase();

      const matchesSearch =
        term === ""
          ? true
          : name.includes(term) ||
            schoolLower.includes(term) ||
            String(lvlNum).includes(term);

      const spellClasses = getSpellClasses(sp);
      const matchesClasses =
        !filters.classes.length ||
        spellClasses.some((cls) => filters.classes.includes(cls));

      const matchesLevels =
        !filters.levels.length || filters.levels.includes(lvlKey);

      const castKey = getActivationFilterKey(sp);
      const matchesCastTime =
        !filters.castTime.length ||
        (castKey && filters.castTime.includes(castKey));

      const rangeKey = getRangeFilterKey(sp);
      const matchesRange =
        !filters.range.length || (rangeKey && filters.range.includes(rangeKey));

      const dmgTypes = getDamageTypes(sp);
      const matchesDamageType =
        !filters.damageType.length ||
        dmgTypes.some((dt) => filters.damageType.includes(dt));

      const matchesSchool =
        !filters.school.length ||
        (schoolCode && filters.school.includes(schoolCode));

      const isRitual = hasProperty(sp, "ritual");
      const matchesRitual = !filters.ritual || isRitual;

      const isConcentration = hasProperty(sp, "concentration");
      const matchesConcentration =
        !filters.concentration || isConcentration;

      return (
        matchesSearch &&
        matchesClasses &&
        matchesLevels &&
        matchesCastTime &&
        matchesRange &&
        matchesDamageType &&
        matchesSchool &&
        matchesRitual &&
        matchesConcentration
      );
    });
  }, [spells, search, filters]);

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
    (filters.classes.length ? 1 : 0) +
    (filters.levels.length ? 1 : 0) +
    (filters.castTime.length ? 1 : 0) +
    (filters.range.length ? 1 : 0) +
    (filters.damageType.length ? 1 : 0) +
    (filters.school.length ? 1 : 0) +
    (filters.ritual ? 1 : 0) +
    (filters.concentration ? 1 : 0);

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
                  <SpellDetail
                    spell={selected}
                    onSpellUpdate={handleSpellUpdate}
                  />
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
          onClose={() => setFilterOpen(false)}
          onApply={(newFilters) => {
            setFilters(newFilters);
            setFilterOpen(false);
          }}
        />
      )}
    </div>
  );
}
