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
  // UI Cantrips, state disimpan "0".."9"
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
    new Set((arr || []).filter((x) => x !== null && x !== undefined && x !== ""))
  );
}
function removeFrom(arr, v) {
  return (arr || []).filter((x) => x !== v);
}

// 0(off) -> 1(ONLY) -> 2(NO) -> 0
function cycleTriState(prev, key, value) {
  const onlyKey = `${key}Only`;
  const blackKey = `${key}Blacklist`;

  const only = uniq(prev[onlyKey]);
  const black = uniq(prev[blackKey]);

  const inOnly = only.includes(value);
  const inBlack = black.includes(value);

  if (!inOnly && !inBlack) {
    return { ...prev, [onlyKey]: [...only, value], [blackKey]: black };
  }
  if (inOnly && !inBlack) {
    return {
      ...prev,
      [onlyKey]: removeFrom(only, value),
      [blackKey]: [...black, value],
    };
  }
  return { ...prev, [onlyKey]: only, [blackKey]: removeFrom(black, value) };
}

function cycleFlag(prev, flagKey) {
  const cur = Number(prev[flagKey] ?? 0);
  const next = cur === 0 ? 1 : cur === 1 ? 2 : 0;
  return { ...prev, [flagKey]: next };
}

// homebrew: 0(off) -> 1(include) -> 2(only) -> 0
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
  return { ...prev, homebrewInclude: include, homebrewOnly: removeFrom(only, code) };
}

const INITIAL_SELECTED = {
  favoritesOnly: false,

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

  ritualMode: 0,
  concentrationMode: 0,

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

    // legacy arrays
    const legacyClasses = Array.isArray(base.classes) ? base.classes : [];
    const legacyLevels = Array.isArray(base.levels) ? base.levels : [];
    const legacyCast = Array.isArray(base.castTime) ? base.castTime : [];
    const legacyDmg = Array.isArray(base.damageType) ? base.damageType : [];
    const legacySchool = Array.isArray(base.school) ? base.school : [];
    const legacyHB = Array.isArray(base.homebrews) ? base.homebrews : [];

    return {
      ...base,

      classesOnly: uniq(base.classesOnly?.length ? base.classesOnly : legacyClasses),
      levelsOnly: uniq(
        normalizeLevelsForModal(base.levelsOnly?.length ? base.levelsOnly : legacyLevels)
      ),

      castTimeOnly: uniq(
        base.castTimeOnly?.length
          ? normalizeCastTimeForModal(base.castTimeOnly)
          : normalizeCastTimeForModal(legacyCast)
      ),
      damageTypeOnly: uniq(base.damageTypeOnly?.length ? base.damageTypeOnly : legacyDmg),
      schoolOnly: uniq(
        base.schoolOnly?.length
          ? normalizeSchoolForModal(base.schoolOnly)
          : normalizeSchoolForModal(legacySchool)
      ),

      classesBlacklist: uniq(base.classesBlacklist),
      levelsBlacklist: uniq(normalizeLevelsForModal(base.levelsBlacklist || [])),
      castTimeBlacklist: uniq(normalizeCastTimeForModal(base.castTimeBlacklist || [])),
      damageTypeBlacklist: uniq(base.damageTypeBlacklist),
      schoolBlacklist: uniq(normalizeSchoolForModal(base.schoolBlacklist || [])),

      ritualMode: Number(base.ritualMode ?? 0),
      concentrationMode: Number(base.concentrationMode ?? 0),

      homebrewInclude: uniq(
        base.homebrewInclude?.length ? base.homebrewInclude : legacyHB
      ).map((x) => String(x).trim().toLowerCase()),
      homebrewOnly: uniq(base.homebrewOnly).map((x) => String(x).trim().toLowerCase()),

      favoritesOnly: !!base.favoritesOnly,

      durationMinIndex:
        typeof base.durationMinIndex === "number"
          ? base.durationMinIndex
          : DURATION_MIN_INDEX_DEFAULT,
      durationMaxIndex:
        typeof base.durationMaxIndex === "number"
          ? base.durationMaxIndex
          : DURATION_MAX_INDEX_DEFAULT,
      durationIncludeInstant: !!base.durationIncludeInstant,
      durationIncludePermanent: !!base.durationIncludePermanent,
      durationIncludeSpecial: !!base.durationIncludeSpecial,

      rangeMin: typeof base.rangeMin === "number" ? base.rangeMin : RANGE_MIN_DEFAULT,
      rangeMax: typeof base.rangeMax === "number" ? base.rangeMax : RANGE_MAX_DEFAULT,
      rangeIncludeSelf: !!base.rangeIncludeSelf,
      rangeIncludeTouch: !!base.rangeIncludeTouch,
    };
  };

  const [selected, setSelected] = useState(getInitialFromValue(value));

  useEffect(() => {
    setSelected(getInitialFromValue(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleReset = () => setSelected(getInitialFromValue({}));

  const handleApply = () => {
    const modified = {
      ...selected,

      classesOnly: uniq(selected.classesOnly),
      classesBlacklist: uniq(selected.classesBlacklist),

      levelsOnly: uniq(selected.levelsOnly).map(String),
      levelsBlacklist: uniq(selected.levelsBlacklist).map(String),

      castTimeOnly: uniq(selected.castTimeOnly).map((v) => String(v).toLowerCase()),
      castTimeBlacklist: uniq(selected.castTimeBlacklist).map((v) => String(v).toLowerCase()),

      damageTypeOnly: uniq(selected.damageTypeOnly).map((v) => String(v).toLowerCase()),
      damageTypeBlacklist: uniq(selected.damageTypeBlacklist).map((v) => String(v).toLowerCase()),

      schoolOnly: uniq(selected.schoolOnly)
        .map((s) => SCHOOL_CODE_BY_LABEL[s] || String(s))
        .map((s) => String(s).toLowerCase()),
      schoolBlacklist: uniq(selected.schoolBlacklist)
        .map((s) => SCHOOL_CODE_BY_LABEL[s] || String(s))
        .map((s) => String(s).toLowerCase()),

      ritualMode: Number(selected.ritualMode ?? 0),
      concentrationMode: Number(selected.concentrationMode ?? 0),

      homebrews: uniq(selected.homebrewInclude).map((x) => String(x).trim().toLowerCase()),
      homebrewOnly: uniq(selected.homebrewOnly).map((x) => String(x).trim().toLowerCase()),

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

      rangeMin: typeof selected.rangeMin === "number" ? selected.rangeMin : RANGE_MIN_DEFAULT,
      rangeMax: typeof selected.rangeMax === "number" ? selected.rangeMax : RANGE_MAX_DEFAULT,
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
      case "damageType":
        return "Damage Type";
      default:
        return key;
    }
  };

  // tri-state state getter: 0/1/2
  const optionState = (key, value) => {
    const onlyKey = `${key}Only`;
    const blackKey = `${key}Blacklist`;
    if ((selected[blackKey] || []).includes(value)) return 2;
    if ((selected[onlyKey] || []).includes(value)) return 1;
    return 0;
  };

  // normalize values stored for each key (levels -> "0".."9", castTime/school -> modal labels)
  const normalizeValueForKey = (key, value) => {
    if (key === "levels") {
      if (value === "Cantrips") return "0";
      return String(value);
    }
    if (key === "castTime") return normalizeCastTimeForModal([value])[0];
    if (key === "school") return normalizeSchoolForModal([value])[0];
    return value;
  };

  // ===== HOME BREW codes memo =====
  const homebrewCodes = useMemo(() => {
    return (homebrewOptions || [])
      .filter((hb) => hb?.code)
      .map((hb) => ({
        ...hb,
        code: String(hb.code || "").trim().toLowerCase(),
      }))
      .filter((hb) => hb.code.length > 0);
  }, [homebrewOptions]);

  const homebrewStateOf = (code) => {
    if ((selected.homebrewOnly || []).includes(code)) return 2;
    if ((selected.homebrewInclude || []).includes(code)) return 1;
    return 0;
  };

  // ===========================
  // ✅ DURATION & RANGE VALUES
  // ===========================
  const durationMinIdx = Math.max(
    0,
    Math.min(DURATION_STEPS.length - 1, selected.durationMinIndex ?? DURATION_MIN_INDEX_DEFAULT)
  );
  const durationMaxIdx = Math.max(
    durationMinIdx,
    Math.min(DURATION_STEPS.length - 1, selected.durationMaxIndex ?? DURATION_MAX_INDEX_DEFAULT)
  );

  const rangeMinVal =
    typeof selected.rangeMin === "number" ? selected.rangeMin : RANGE_MIN_DEFAULT;

  const rangeMaxVal = Math.max(
    rangeMinVal,
    typeof selected.rangeMax === "number" ? selected.rangeMax : RANGE_MAX_DEFAULT
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

  // ===========================
  // ✅ SLIDER BLOCK (LABEL/INPUT DI ATAS, SLIDER DI BAWAH)
  // ===========================
  function RangeSliderBlock({
    title,
    min,
    max,
    step,
    leftValue,
    rightValue,
    leftLabelSuffix = "",
    rightLabelSuffix = "",
    leftDisabled = false,
    rightDisabled = false,
    onLeftChange,
    onRightChange,
    onSliderChange,
    trackClassName,
    thumbClassName,
  }) {
    return (
      <div className="border border-slate-700/70 rounded-lg px-3 py-3 bg-[#050a2a]/60">
        {/* header */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
            {title}
          </div>
          <div className="text-[11px] text-slate-300">
            {leftValue}
            {leftLabelSuffix} – {rightValue}
            {rightLabelSuffix}
          </div>
        </div>

        {/* ✅ INPUTS on top (left & right) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 w-28">
            <input
              type="number"
              min={min}
              max={max}
              value={leftValue}
              disabled={leftDisabled}
              onChange={onLeftChange}
              className={`w-full rounded-md border border-slate-600 bg-[#02051b] px-2 py-1 text-xs text-slate-100 outline-none focus:ring-1 focus:ring-sky-500 ${
                leftDisabled ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
            {leftLabelSuffix ? (
              <span className="text-xs text-slate-400">{leftLabelSuffix.trim()}</span>
            ) : null}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1 w-28 justify-end">
            <input
              type="number"
              min={min}
              max={max}
              value={rightValue}
              disabled={rightDisabled}
              onChange={onRightChange}
              className={`w-full rounded-md border border-slate-600 bg-[#02051b] px-2 py-1 text-xs text-slate-100 outline-none focus:ring-1 focus:ring-sky-500 ${
                rightDisabled ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
            {rightLabelSuffix ? (
              <span className="text-xs text-slate-400">{rightLabelSuffix.trim()}</span>
            ) : null}
          </div>
        </div>

        {/* ✅ SLIDER below */}
        <div className="mt-3">
          <Slider.Root
            className="relative flex w-full items-center h-5"
            min={min}
            max={max}
            step={step}
            value={[leftValue, rightValue]}
            onValueChange={onSliderChange}
          >
            <Slider.Track className={`bg-slate-700 relative grow rounded-full h-1 ${trackClassName || ""}`}>
              <Slider.Range className="absolute bg-sky-500 rounded-full h-1" />
            </Slider.Track>
            <Slider.Thumb
              className={`block w-3 h-3 bg-sky-400 rounded-full border border-sky-200 shadow ${thumbClassName || ""}`}
              aria-label={`${title} min`}
            />
            <Slider.Thumb
              className={`block w-3 h-3 bg-sky-400 rounded-full border border-sky-200 shadow ${thumbClassName || ""}`}
              aria-label={`${title} max`}
            />
          </Slider.Root>
        </div>
      </div>
    );
  }

  function IndexSliderBlock({
    title,
    minIdx,
    maxIdx,
    step = 1,
    leftIdx,
    rightIdx,
    leftText,
    rightText,
    onSliderChange,
  }) {
    return (
      <div className="border border-slate-700/70 rounded-lg px-3 py-3 bg-[#050a2a]/60">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
            {title}
          </div>
          <div className="text-[11px] text-slate-300">
            {leftText} – {rightText}
          </div>
        </div>

        {/* ✅ labels on top */}
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="w-28 truncate">{leftText}</span>
          <span className="w-28 text-right truncate">{rightText}</span>
        </div>

        {/* ✅ slider below */}
        <div className="mt-3">
          <Slider.Root
            className="relative flex w-full items-center h-5"
            min={minIdx}
            max={maxIdx}
            step={step}
            value={[leftIdx, rightIdx]}
            onValueChange={onSliderChange}
          >
            <Slider.Track className="bg-slate-700 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-emerald-500 rounded-full h-1" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-3 h-3 bg-emerald-400 rounded-full border border-emerald-200 shadow"
              aria-label={`${title} min`}
            />
            <Slider.Thumb
              className="block w-3 h-3 bg-emerald-400 rounded-full border border-emerald-200 shadow"
              aria-label={`${title} max`}
            />
          </Slider.Root>
        </div>

        {/* flags */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-700/60 mt-3">
          {[{ key: "durationIncludeInstant", label: "Inst" },
            { key: "durationIncludePermanent", label: "Perm" },
            { key: "durationIncludeSpecial", label: "Special" },
          ].map((cfg) => {
            const active = !!selected[cfg.key];
            return (
              <button
                key={cfg.key}
                type="button"
                onClick={() =>
                  setSelected((prev) => ({ ...prev, [cfg.key]: !prev[cfg.key] }))
                }
                className={`px-2.5 py-1 rounded-md border text-[11px] transition ${
                  active
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
                    : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]"
                }`}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-[#2a2f55] bg-[#050822] p-4 md:p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <SlidersHorizontal className="w-4 h-4 text-slate-300" />
            <span>Filter Spells</span>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-slate-800">
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        <div className="space-y-4">
          {/* ===== FILTER UTAMA (tri-state) ===== */}
          {Object.entries(FILTERS).map(([key, options]) => {
            if (key === "range") return null;
            if (key === "school") return null; // school kita render khusus bawah
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
                      const state = optionState(key, value);

                      const onlyColor =
                        key === "levels"
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
                          : key === "classes"
                          ? "border-indigo-500 bg-indigo-500/20 text-indigo-100"
                          : key === "damageType"
                          ? "border-rose-500 bg-rose-500/20 text-rose-100"
                          : "border-sky-500 bg-sky-500/20 text-sky-100";

                      const blackColor = "border-slate-500 bg-slate-500/10 text-slate-300";

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
                          onClick={() => setSelected((prev) => cycleTriState(prev, key, value))}
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

          {/* ===== FLAGS ===== */}
          <div className="border-t border-slate-700/60 pt-3 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Other Filters
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Ritual */}
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
                    onClick={() => setSelected((p) => cycleFlag(p, "ritualMode"))}
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

              {/* Concentration */}
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
                    onClick={() => setSelected((p) => cycleFlag(p, "concentrationMode"))}
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

              {/* favorites */}
              <button
                type="button"
                onClick={() => setSelected((p) => ({ ...p, favoritesOnly: !p.favoritesOnly }))}
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

          {/* ===== DURATION (labels top, slider below) ===== */}
          <IndexSliderBlock
            title="Duration"
            minIdx={0}
            maxIdx={DURATION_STEPS.length - 1}
            leftIdx={durationMinIdx}
            rightIdx={durationMaxIdx}
            leftText={DURATION_STEPS[durationMinIdx].label}
            rightText={DURATION_STEPS[durationMaxIdx].label}
            onSliderChange={([min, max]) => {
              const clampedMin = Math.max(0, Math.min(DURATION_STEPS.length - 1, min));
              const clampedMax = Math.max(clampedMin, Math.min(DURATION_STEPS.length - 1, max));
              setSelected((prev) => ({
                ...prev,
                durationMinIndex: clampedMin,
                durationMaxIndex: clampedMax,
              }));
            }}
          />

          {/* ===== RANGE (inputs top, slider below) ===== */}
          <RangeSliderBlock
            title="Range (ft)"
            min={RANGE_MIN_DEFAULT}
            max={RANGE_MAX_DEFAULT}
            step={5}
            leftValue={rangeMinVal}
            rightValue={rangeMaxVal}
            leftLabelSuffix="ft"
            rightLabelSuffix="ft"
            onLeftChange={handleRangeMinInputChange}
            onRightChange={handleRangeMaxInputChange}
            onSliderChange={([min, max]) => {
              const clampedMin = Math.max(RANGE_MIN_DEFAULT, Math.min(RANGE_MAX_DEFAULT, min));
              const clampedMax = Math.max(clampedMin, Math.min(RANGE_MAX_DEFAULT, max));
              setSelected((prev) => ({
                ...prev,
                rangeMin: clampedMin,
                rangeMax: clampedMax,
              }));
            }}
          />

          {/* range flags */}
          <div className="-mt-2 border border-slate-700/70 rounded-lg px-3 py-3 bg-[#050a2a]/60">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
              Range Flags
            </div>
            <div className="flex flex-wrap gap-3">
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

          {/* ===== SCHOOL (tri-state) ===== */}
          <div className="mt-1">
            <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
              School
            </div>

            <div className="flex flex-wrap gap-2">
              {(FILTERS.school || []).map((rawVal) => {
                const key = "school";
                const value = normalizeValueForKey(key, rawVal);
                const state = optionState(key, value);

                const onlyColor = "border-sky-500 bg-sky-500/20 text-sky-100";
                const blackColor = "border-slate-500 bg-slate-500/10 text-slate-300";

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
                    onClick={() => setSelected((prev) => cycleTriState(prev, "school", value))}
                    className={`px-2.5 py-1 rounded-md border text-xs transition ${cls}`}
                  >
                    {renderButtonLabel("school", rawVal)}
                    {badge}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== HOME BREW ===== */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
              Homebrew
            </div>

            <div className="flex flex-wrap gap-2">
              {homebrewCodes.length === 0 ? (
                <span className="text-xs text-slate-500">No homebrew code</span>
              ) : (
                homebrewCodes.map((hb) => {
                  const code = hb.code;
                  const state = homebrewStateOf(code);

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
                      onClick={() => setSelected((prev) => cycleHomebrew(prev, code))}
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
