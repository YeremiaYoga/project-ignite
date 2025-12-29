"use client";

import { useEffect, useMemo, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";

const SCHOOL_CODE_BY_LABEL = {
  Abjuration: "abj",
  Conjuration: "con",
  Divination: "div",
  Enchantment: "enc",
  Evocation: "evo",
  Illusion: "ill",
  Necromancy: "nec",
  Transmutation: "trs",
};

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

const FILTERS = {
  classes: [
    "Artificer",
    "Barbarian",
    "Bard",
    "Blood Hunter",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
  ],
  // ⚠️ levels UI tetap tampil Cantrips, 1..9 (tapi state kita simpan string "0".."9")
  levels: ["Cantrips", 1, 2, 3, 4, 5, 6, 7, 8, 9],
  castTime: [
    "Action",
    "Bonus Action",
    "Reaction",
    "Round",
    "Minute",
    "Hour",
    "Special",
  ],
  range: [],
  damageType: [
    "acid",
    "bludgeoning",
    "cold",
    "fire",
    "force",
    "lightning",
    "necrotic",
    "piercing",
    "poison",
    "psychic",
    "radiant",
    "slashing",
    "thunder",
    "healing",
    "temporary healing",
  ],
  school: [
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation",
  ],
};

function uniq(arr) {
  return Array.from(
    new Set(
      (arr || []).filter((x) => x !== null && x !== undefined && x !== "")
    )
  );
}
function removeFrom(arr, v) {
  return (arr || []).filter((x) => x !== v);
}

// tri-state cycle for options: 0(off) -> 1(ONLY/whitelist) -> 2(BLACKLIST) -> 0(off)
function cycleTriState(prev, key, value) {
  const onlyKey = `${key}Only`;
  const blackKey = `${key}Blacklist`;

  const only = uniq(prev[onlyKey]);
  const black = uniq(prev[blackKey]);

  const inOnly = only.includes(value);
  const inBlack = black.includes(value);

  // OFF -> ONLY
  if (!inOnly && !inBlack) {
    return {
      ...prev,
      [onlyKey]: [...only, value],
      [blackKey]: black,
    };
  }

  // ONLY -> BLACKLIST
  if (inOnly && !inBlack) {
    return {
      ...prev,
      [onlyKey]: removeFrom(only, value),
      [blackKey]: [...black, value],
    };
  }

  // BLACKLIST -> OFF
  return {
    ...prev,
    [onlyKey]: only,
    [blackKey]: removeFrom(black, value),
  };
}

function cycleFlag(prev, flagKey) {
  const cur = Number(prev[flagKey] ?? 0);
  const next = cur === 0 ? 1 : cur === 1 ? 2 : 0;
  return { ...prev, [flagKey]: next };
}

// Homebrew cycle: 0(off) -> 1(include) -> 2(only) -> 0(off)
function cycleHomebrew(prev, code) {
  const include = uniq(prev.homebrewInclude);
  const only = uniq(prev.homebrewOnly);

  const inInclude = include.includes(code);
  const inOnly = only.includes(code);

  if (!inInclude && !inOnly) {
    return { ...prev, homebrewInclude: [...include, code], homebrewOnly: only };
  }
  if (inInclude && !inOnly) {
    return {
      ...prev,
      homebrewInclude: removeFrom(include, code),
      homebrewOnly: [...only, code],
    };
  }
  return {
    ...prev,
    homebrewInclude: include,
    homebrewOnly: removeFrom(only, code),
  };
}

const INITIAL_SELECTED = {
  favoritesOnly: false,

  // ✅ tri-state lists for all filter categories:
  classesOnly: [],
  classesBlacklist: [],
  levelsOnly: [], // stored as string "0".."9"
  levelsBlacklist: [],
  castTimeOnly: [],
  castTimeBlacklist: [],
  damageTypeOnly: [],
  damageTypeBlacklist: [],
  schoolOnly: [],
  schoolBlacklist: [],

  // ✅ tri-state flag (0/1/2)
  ritualMode: 0,
  concentrationMode: 0,

  // ✅ Homebrew include/only/off
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

function normalizeCastTimeForModal(arr) {
  if (!Array.isArray(arr)) return [];
  const map = {
    action: "Action",
    "bonus action": "Bonus Action",
    reaction: "Reaction",
    round: "Round",
    minute: "Minute",
    hour: "Hour",
    special: "Special",
  };
  return arr.map((v) => {
    const lower = String(v).toLowerCase();
    return map[lower] || v;
  });
}

function normalizeSchoolForModal(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((v) => {
    const str = String(v);
    const lower = str.toLowerCase();
    if (SCHOOL_LABEL_BY_CODE[lower]) return SCHOOL_LABEL_BY_CODE[lower];
    return str;
  });
}

// normalize levels to string "0".."9"
function normalizeLevelsForModal(arr) {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((v) => {
      if (v === "Cantrips") return "0";
      const n = Number(v);
      if (!Number.isNaN(n)) return String(n);
      const s = String(v).trim();
      if (s === "0") return "0";
      return s;
    })
    .filter((x) => x !== "" && x != null);
}

export default function SpellFilterModal({
  onClose,
  onApply,
  value,
  homebrewOptions = [],
}) {
  const getInitialFromValue = (val) => {
    const base = { ...INITIAL_SELECTED, ...(val || {}) };

    // backward compat (kalau dulu masih pakai arrays biasa)
    const legacyClasses = Array.isArray(base.classes) ? base.classes : [];
    const legacyLevels = Array.isArray(base.levels) ? base.levels : [];
    const legacyCast = Array.isArray(base.castTime) ? base.castTime : [];
    const legacyDmg = Array.isArray(base.damageType) ? base.damageType : [];
    const legacySchool = Array.isArray(base.school) ? base.school : [];
    const legacyHB = Array.isArray(base.homebrews) ? base.homebrews : [];

    return {
      ...base,

      // legacy -> ONLY (whitelist)
      classesOnly: uniq(
        base.classesOnly?.length ? base.classesOnly : legacyClasses
      ),
      levelsOnly: uniq(
        normalizeLevelsForModal(
          base.levelsOnly?.length ? base.levelsOnly : legacyLevels
        )
      ),

      castTimeOnly: uniq(
        base.castTimeOnly?.length
          ? normalizeCastTimeForModal(base.castTimeOnly)
          : normalizeCastTimeForModal(legacyCast)
      ),
      damageTypeOnly: uniq(
        base.damageTypeOnly?.length ? base.damageTypeOnly : legacyDmg
      ),
      schoolOnly: uniq(
        base.schoolOnly?.length
          ? normalizeSchoolForModal(base.schoolOnly)
          : normalizeSchoolForModal(legacySchool)
      ),

      classesBlacklist: uniq(base.classesBlacklist),
      levelsBlacklist: uniq(
        normalizeLevelsForModal(base.levelsBlacklist || [])
      ),
      castTimeBlacklist: uniq(
        normalizeCastTimeForModal(base.castTimeBlacklist || [])
      ),
      damageTypeBlacklist: uniq(base.damageTypeBlacklist),
      schoolBlacklist: uniq(
        normalizeSchoolForModal(base.schoolBlacklist || [])
      ),

      ritualMode: Number(base.ritualMode ?? 0),
      concentrationMode: Number(base.concentrationMode ?? 0),

      // homebrew legacy -> include
      homebrewInclude: uniq(
        base.homebrewInclude?.length ? base.homebrewInclude : legacyHB
      ).map((x) => String(x).trim().toLowerCase()),
      homebrewOnly: uniq(base.homebrewOnly).map((x) =>
        String(x).trim().toLowerCase()
      ),

      favoritesOnly: !!base.favoritesOnly,
    };
  };

  const [selected, setSelected] = useState(getInitialFromValue(value));

  useEffect(() => {
    setSelected(getInitialFromValue(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // ✅ reset konsisten
  const handleReset = () => setSelected(getInitialFromValue({}));

  const handleApply = () => {
    const modified = {
      ...selected,

      classesOnly: uniq(selected.classesOnly),
      classesBlacklist: uniq(selected.classesBlacklist),

      levelsOnly: uniq(selected.levelsOnly).map(String),
      levelsBlacklist: uniq(selected.levelsBlacklist).map(String),

      castTimeOnly: uniq(selected.castTimeOnly).map((v) =>
        String(v).toLowerCase()
      ),
      castTimeBlacklist: uniq(selected.castTimeBlacklist).map((v) =>
        String(v).toLowerCase()
      ),

      damageTypeOnly: uniq(selected.damageTypeOnly).map((v) =>
        String(v).toLowerCase()
      ),
      damageTypeBlacklist: uniq(selected.damageTypeBlacklist).map((v) =>
        String(v).toLowerCase()
      ),

      schoolOnly: uniq(selected.schoolOnly)
        .map((s) => SCHOOL_CODE_BY_LABEL[s] || String(s))
        .map((s) => String(s).toLowerCase()),
      schoolBlacklist: uniq(selected.schoolBlacklist)
        .map((s) => SCHOOL_CODE_BY_LABEL[s] || String(s))
        .map((s) => String(s).toLowerCase()),

      ritualMode: Number(selected.ritualMode ?? 0),
      concentrationMode: Number(selected.concentrationMode ?? 0),

      homebrews: uniq(selected.homebrewInclude).map((x) =>
        String(x).trim().toLowerCase()
      ),
      homebrewOnly: uniq(selected.homebrewOnly).map((x) =>
        String(x).trim().toLowerCase()
      ),

      favoritesOnly: !!selected.favoritesOnly,

      durationMinIndex:
        typeof selected.durationMinIndex === "number"
          ? selected.durationMinIndex
          : DURATION_MIN_INDEX_DEFAULT,
      durationMaxIndex:
        typeof selected.durationMaxIndex === "number"
          ? selected.durationMaxIndex
          : DURATION_MAX_INDEX_DEFAULT,
      durationIncludeInstant: !!selected.durationIncludeInstant,
      durationIncludePermanent: !!selected.durationIncludePermanent,
      durationIncludeSpecial: !!selected.durationIncludeSpecial,

      rangeMin:
        typeof selected.rangeMin === "number"
          ? selected.rangeMin
          : RANGE_MIN_DEFAULT,
      rangeMax:
        typeof selected.rangeMax === "number"
          ? selected.rangeMax
          : RANGE_MAX_DEFAULT,
      rangeIncludeSelf: !!selected.rangeIncludeSelf,
      rangeIncludeTouch: !!selected.rangeIncludeTouch,
    };

    onApply(modified);
    onClose?.();
  };

  const renderButtonLabel = (key, value) => {
    if (key === "levels") {
      if (value === "Cantrips") return "Cantrips";
      return `${value}th`;
    }
    if (typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return String(value);
  };

  const sectionTitle = (key) => {
    switch (key) {
      case "classes":
        return "Classes";
      case "levels":
        return "Level";
      case "castTime":
        return "Cast Time";
      case "range":
        return "Range";
      case "damageType":
        return "Damage Type";
      case "school":
        return "School";
      default:
        return key;
    }
  };

  const durationMinIdx = Math.max(
    0,
    Math.min(
      DURATION_STEPS.length - 1,
      selected.durationMinIndex ?? DURATION_MIN_INDEX_DEFAULT
    )
  );
  const durationMaxIdx = Math.max(
    durationMinIdx,
    Math.min(
      DURATION_STEPS.length - 1,
      selected.durationMaxIndex ?? DURATION_MAX_INDEX_DEFAULT
    )
  );

  const rangeMinVal =
    typeof selected.rangeMin === "number"
      ? selected.rangeMin
      : RANGE_MIN_DEFAULT;
  const rangeMaxVal = Math.max(
    rangeMinVal,
    typeof selected.rangeMax === "number"
      ? selected.rangeMax
      : RANGE_MAX_DEFAULT
  );

  const handleRangeMinInputChange = (e) => {
    const raw = e.target.value;
    if (raw === "") {
      setSelected((prev) => ({ ...prev, rangeMin: RANGE_MIN_DEFAULT }));
      return;
    }
    let val = Number(raw);
    if (Number.isNaN(val)) return;
    val = Math.max(RANGE_MIN_DEFAULT, Math.min(RANGE_MAX_DEFAULT, val));
    setSelected((prev) => ({
      ...prev,
      rangeMin: Math.min(val, prev.rangeMax ?? RANGE_MAX_DEFAULT),
    }));
  };

  const handleRangeMaxInputChange = (e) => {
    const raw = e.target.value;
    if (raw === "") {
      setSelected((prev) => ({ ...prev, rangeMax: RANGE_MAX_DEFAULT }));
      return;
    }
    let val = Number(raw);
    if (Number.isNaN(val)) return;
    val = Math.max(RANGE_MIN_DEFAULT, Math.min(RANGE_MAX_DEFAULT, val));
    setSelected((prev) => ({
      ...prev,
      rangeMax: Math.max(val, prev.rangeMin ?? RANGE_MIN_DEFAULT),
    }));
  };

  // state getter for tri-state options: 0/1/2
  const optionState = (key, value) => {
    const onlyKey = `${key}Only`;
    const blackKey = `${key}Blacklist`;
    if ((selected[blackKey] || []).includes(value)) return 2;
    if ((selected[onlyKey] || []).includes(value)) return 1;
    return 0;
  };

  // ✅ normalize values stored for each key (levels -> "0".."9", castTime/school -> modal labels)
  const normalizeValueForKey = (key, value) => {
    if (key === "levels") {
      if (value === "Cantrips") return "0";
      return String(value);
    }
    if (key === "castTime") {
      const arr = normalizeCastTimeForModal([value]);
      return arr[0];
    }
    if (key === "school") {
      const arr = normalizeSchoolForModal([value]);
      return arr[0];
    }
    return value;
  };

  // ✅ homebrew codes (lowercase, trim)
  const homebrewCodes = useMemo(() => {
    return (homebrewOptions || [])
      .filter((hb) => hb?.code)
      .map((hb) => ({
        ...hb,
        code: String(hb.code || "")
          .trim()
          .toLowerCase(),
      }))
      .filter((hb) => hb.code.length > 0);
  }, [homebrewOptions]);

  const homebrewStateOf = (code) => {
    if ((selected.homebrewOnly || []).includes(code)) return 2;
    if ((selected.homebrewInclude || []).includes(code)) return 1;
    return 0;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-[#2a2f55] bg-[#050822] p-4 md:p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <SlidersHorizontal className="w-4 h-4 text-slate-300" />
            <span>Filter Spells</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        <div className="space-y-4">
          {/* ===== FILTER UTAMA (tri-state) ===== */}
          {Object.entries(FILTERS).map(([key, options]) => {
            if (key === "range") return null;
            if (key === "school") return null;
            return (
              <div key={key}>
                <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  {sectionTitle(key)}
                </div>

                <div className="flex flex-wrap gap-2">
                  {(options || []).length === 0 ? (
                    <span className="text-xs text-slate-500">No options</span>
                  ) : (
                    options.map((rawVal) => {
                      const value = normalizeValueForKey(key, rawVal);
                      const state = optionState(key, value); // 0/1/2

                      // base color per key (for ONLY)
                      const onlyColor =
                        key === "levels"
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
                          : key === "classes"
                          ? "border-indigo-500 bg-indigo-500/20 text-indigo-100"
                          : key === "damageType"
                          ? "border-rose-500 bg-rose-500/20 text-rose-100"
                          : "border-sky-500 bg-sky-500/20 text-sky-100";

                      const blackColor =
                        "border-slate-500 bg-slate-500/10 text-slate-300";

                      const cls =
                        state === 2
                          ? blackColor
                          : state === 1
                          ? onlyColor
                          : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]";

                      const badge =
                        state === 1 ? (
                          <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-white/5 border border-white/10">
                            ONLY
                          </span>
                        ) : state === 2 ? (
                          <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-slate-600/15 border border-slate-500/30">
                            NO
                          </span>
                        ) : null;

                      return (
                        <button
                          key={`${key}-${String(rawVal)}`}
                          type="button"
                          onClick={() =>
                            setSelected((prev) =>
                              cycleTriState(prev, key, value)
                            )
                          }
                          className={`px-2.5 py-1 rounded-md border text-xs capitalize transition ${cls}`}
                        >
                          {key === "levels"
                            ? rawVal === "Cantrips"
                              ? "Cantrips"
                              : `${rawVal}th`
                            : renderButtonLabel(key, rawVal)}
                          {badge}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}

          <div className="border-t border-slate-700/60 pt-3 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Other Filters
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Ritual tri-state */}
              {(() => {
                const s = Number(selected.ritualMode ?? 0);
                const cls =
                  s === 1
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
                    : s === 2
                    ? "border-slate-500 bg-slate-500/10 text-slate-300"
                    : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]";
                const badge = s === 1 ? "ONLY" : s === 2 ? "NO" : "";

                return (
                  <button
                    type="button"
                    onClick={() =>
                      setSelected((p) => cycleFlag(p, "ritualMode"))
                    }
                    className={`px-2.5 py-1 rounded-md border text-xs transition ${cls}`}
                  >
                    Ritual{" "}
                    {badge ? (
                      <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-white/5 border border-white/10">
                        {badge}
                      </span>
                    ) : null}
                  </button>
                );
              })()}

              {/* Concentration tri-state */}
              {(() => {
                const s = Number(selected.concentrationMode ?? 0);
                const cls =
                  s === 1
                    ? "border-sky-500 bg-sky-500/20 text-sky-100"
                    : s === 2
                    ? "border-slate-500 bg-slate-500/10 text-slate-300"
                    : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]";
                const badge = s === 1 ? "ONLY" : s === 2 ? "NO" : "";

                return (
                  <button
                    type="button"
                    onClick={() =>
                      setSelected((p) => cycleFlag(p, "concentrationMode"))
                    }
                    className={`px-2.5 py-1 rounded-md border text-xs transition ${cls}`}
                  >
                    Concentration{" "}
                    {badge ? (
                      <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-white/5 border border-white/10">
                        {badge}
                      </span>
                    ) : null}
                  </button>
                );
              })()}

              {/* Favorites boolean */}
              <button
                type="button"
                onClick={() =>
                  setSelected((p) => ({
                    ...p,
                    favoritesOnly: !p.favoritesOnly,
                  }))
                }
                className={`px-2.5 py-1 rounded-md border text-xs transition ${
                  selected.favoritesOnly
                    ? "border-amber-500 bg-amber-500/20 text-amber-100"
                    : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]"
                }`}
              >
                Favorites only
              </button>
            </div>
          </div>

          {/* ===== DURATION ===== */}
          <div className="border border-slate-700/70 rounded-lg px-3 py-3 bg-[#050a2a]/60">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Duration
              </div>
              <div className="text-xs text-slate-300">
                {DURATION_STEPS[durationMinIdx].label} –{" "}
                {DURATION_STEPS[durationMaxIdx].label}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-300 w-14 text-right">
                  {DURATION_STEPS[durationMinIdx].label}
                </span>

                <Slider.Root
                  className="relative flex-1 flex items-center h-5"
                  min={0}
                  max={DURATION_STEPS.length - 1}
                  step={1}
                  value={[durationMinIdx, durationMaxIdx]}
                  onValueChange={([min, max]) => {
                    const clampedMin = Math.max(
                      0,
                      Math.min(DURATION_STEPS.length - 1, min)
                    );
                    const clampedMax = Math.max(
                      clampedMin,
                      Math.min(DURATION_STEPS.length - 1, max)
                    );
                    setSelected((prev) => ({
                      ...prev,
                      durationMinIndex: clampedMin,
                      durationMaxIndex: clampedMax,
                    }));
                  }}
                >
                  <Slider.Track className="bg-slate-700 relative grow rounded-full h-1">
                    <Slider.Range className="absolute bg-emerald-500 rounded-full h-1" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-3 h-3 bg-emerald-400 rounded-full border border-emerald-200 shadow"
                    aria-label="Minimum duration"
                  />
                  <Slider.Thumb
                    className="block w-3 h-3 bg-emerald-400 rounded-full border border-emerald-200 shadow"
                    aria-label="Maximum duration"
                  />
                </Slider.Root>

                <span className="text-xs text-slate-300 w-14">
                  {DURATION_STEPS[durationMaxIdx].label}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/60 mt-2">
                {[
                  { key: "durationIncludeInstant", short: "Inst" },
                  { key: "durationIncludePermanent", short: "Perm" },
                  { key: "durationIncludeSpecial", short: "Special" },
                ].map((cfg) => {
                  const active = selected[cfg.key];
                  return (
                    <button
                      key={cfg.key}
                      type="button"
                      onClick={() =>
                        setSelected((prev) => ({
                          ...prev,
                          [cfg.key]: !prev[cfg.key],
                        }))
                      }
                      className={`px-2.5 py-1 rounded-md border text-[11px] transition ${
                        active
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
                          : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]"
                      }`}
                    >
                      {cfg.short}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== RANGE ===== */}
          <div className="border border-slate-700/70 rounded-lg px-3 py-3 bg-[#050a2a]/60">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Range
              </div>
              <div className="text-[11px] text-slate-300">
                {rangeMinVal} ft – {rangeMaxVal} ft
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-24">
                  <input
                    type="number"
                    min={RANGE_MIN_DEFAULT}
                    max={RANGE_MAX_DEFAULT}
                    value={rangeMinVal}
                    onChange={handleRangeMinInputChange}
                    className="w-full rounded-md border border-slate-600 bg-[#02051b] px-2 py-1 text-xs text-slate-100 outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <span className="text-xs text-slate-400">ft</span>
                </div>

                <Slider.Root
                  className="relative flex-1 flex items-center h-5"
                  min={RANGE_MIN_DEFAULT}
                  max={RANGE_MAX_DEFAULT}
                  step={5}
                  value={[rangeMinVal, rangeMaxVal]}
                  onValueChange={([min, max]) => {
                    const clampedMin = Math.max(
                      RANGE_MIN_DEFAULT,
                      Math.min(RANGE_MAX_DEFAULT, min)
                    );
                    const clampedMax = Math.max(
                      clampedMin,
                      Math.min(RANGE_MAX_DEFAULT, max)
                    );
                    setSelected((prev) => ({
                      ...prev,
                      rangeMin: clampedMin,
                      rangeMax: clampedMax,
                    }));
                  }}
                >
                  <Slider.Track className="bg-slate-700 relative grow rounded-full h-1">
                    <Slider.Range className="absolute bg-sky-500 rounded-full h-1" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-3 h-3 bg-sky-400 rounded-full border border-sky-200 shadow"
                    aria-label="Minimum range"
                  />
                  <Slider.Thumb
                    className="block w-3 h-3 bg-sky-400 rounded-full border border-sky-200 shadow"
                    aria-label="Maximum range"
                  />
                </Slider.Root>

                <div className="flex items-center gap-1 w-24">
                  <input
                    type="number"
                    min={RANGE_MIN_DEFAULT}
                    max={RANGE_MAX_DEFAULT}
                    value={rangeMaxVal}
                    onChange={handleRangeMaxInputChange}
                    className="w-full rounded-md border border-slate-600 bg-[#02051b] px-2 py-1 text-xs text-slate-100 outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <span className="text-xs text-slate-400">ft</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-700/60 mt-2">
                <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-slate-500 bg-transparent"
                    checked={selected.rangeIncludeSelf}
                    onChange={() =>
                      setSelected((prev) => ({
                        ...prev,
                        rangeIncludeSelf: !prev.rangeIncludeSelf,
                      }))
                    }
                  />
                  <span>Include Self</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-slate-500 bg-transparent"
                    checked={selected.rangeIncludeTouch}
                    onChange={() =>
                      setSelected((prev) => ({
                        ...prev,
                        rangeIncludeTouch: !prev.rangeIncludeTouch,
                      }))
                    }
                  />
                  <span>Include Touch</span>
                </label>
              </div>
            </div>
          </div>
          {/* ===== SCHOOL (tri-state) — moved below Range ===== */}
          <div className="mt-4">
            <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
              School
            </div>

            <div className="flex flex-wrap gap-2">
              {(FILTERS.school || []).map((rawVal) => {
                const key = "school";
                const value = normalizeValueForKey(key, rawVal);
                const state = optionState(key, value);

                const onlyColor = "border-sky-500 bg-sky-500/20 text-sky-100";
                const blackColor =
                  "border-slate-500 bg-slate-500/10 text-slate-300";

                const cls =
                  state === 2
                    ? blackColor
                    : state === 1
                    ? onlyColor
                    : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]";

                const badge =
                  state === 1 ? (
                    <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-white/5 border border-white/10">
                      ONLY
                    </span>
                  ) : state === 2 ? (
                    <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-slate-600/15 border border-slate-500/30">
                      NO
                    </span>
                  ) : null;

                return (
                  <button
                    key={`school-${String(rawVal)}`}
                    type="button"
                    onClick={() =>
                      setSelected((prev) =>
                        cycleTriState(prev, "school", value)
                      )
                    }
                    className={`px-2.5 py-1 rounded-md border text-xs transition ${cls}`}
                  >
                    {renderButtonLabel("school", rawVal)}
                    {badge}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== HOME BREW (include/only/off) ===== */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
              Homebrew
            </div>

            <div className="flex flex-wrap gap-2">
              {homebrewCodes.length === 0 ? (
                <span className="text-xs text-slate-500">No homebrew code</span>
              ) : (
                homebrewCodes.map((hb) => {
                  const code = hb.code; // already lowercase
                  const state = homebrewStateOf(code); // 0/1/2

                  const cls =
                    state === 2
                      ? "border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-100"
                      : state === 1
                      ? "border-amber-500 bg-amber-500/20 text-amber-100"
                      : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]";

                  const badge =
                    state === 2 ? (
                      <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-fuchsia-600/30 border border-fuchsia-500/50">
                        ONLY
                      </span>
                    ) : state === 1 ? (
                      <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-amber-600/30 border border-amber-500/50">
                        +INC
                      </span>
                    ) : null;

                  return (
                    <button
                      key={hb.id || code}
                      type="button"
                      onClick={() =>
                        setSelected((prev) => cycleHomebrew(prev, code))
                      }
                      className={`px-2.5 py-1 rounded-md border text-xs transition ${cls}`}
                      title={hb.name || code}
                    >
                      {code}
                      {badge}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-700/60">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs rounded-md border border-[#2a2f55] bg-[#0b1034] hover:bg-[#151d55] text-slate-200"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs rounded-md border border-[#2a2f55] bg-[#0b1034] hover:bg-[#151d55] text-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-3 py-1.5 text-xs rounded-md border border-emerald-600 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export { DURATION_STEPS, RANGE_MIN_DEFAULT, RANGE_MAX_DEFAULT };
