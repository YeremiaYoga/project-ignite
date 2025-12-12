"use client";

import { useEffect, useState } from "react";
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

// duration steps untuk slider (index 0..6)
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
  ritual: false,
  concentration: false,
};

const INITIAL_SELECTED = {
  classes: [],
  levels: [],
  castTime: [],
  damageType: [],
  range: [],
  school: [],
  ritual: false,
  concentration: false,

  favoritesOnly: false,

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

    if (SCHOOL_LABEL_BY_CODE[lower]) {
      return SCHOOL_LABEL_BY_CODE[lower];
    }

    return str;
  });
}

export default function SpellFilterModal({ onClose, onApply, value }) {
  const getInitialFromValue = (val) => {
    const base = {
      ...INITIAL_SELECTED,
      ...(val || {}),
    };

    return {
      ...base,
      castTime: normalizeCastTimeForModal(base.castTime),
      school: normalizeSchoolForModal(base.school),
    };
  };

  const [selected, setSelected] = useState(getInitialFromValue(value));

  useEffect(() => {
    setSelected(getInitialFromValue(value));
  }, [value]);

  const toggleOption = (category, value) => {
    setSelected((prev) => {
      if (
        category === "ritual" ||
        category === "concentration" ||
        category === "favoritesOnly"
      ) {
        return { ...prev, [category]: !prev[category] };
      }

      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [category]: updated };
    });
  };

  const handleReset = () => {
    setSelected(INITIAL_SELECTED);
  };

  const handleApply = () => {
    const modified = {
      ...selected,
      castTime: (selected.castTime || []).map((ct) => String(ct).toLowerCase()),
      school: (selected.school || [])
        .map((s) => {
          const code = SCHOOL_CODE_BY_LABEL[s];
          return code || String(s);
        })
        .map((s) => String(s).toLowerCase()),

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

  // ====== HANDLER INPUT MANUAL RANGE (tetap dipakai, tapi input nempel di slider) ======
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-[#2a2f55] bg-[#050822] p-4 md:p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
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
          {/* ====== FILTER UTAMA ====== */}
          {Object.entries(FILTERS).map(([key, options]) => {
            if (key === "range") return null;
            if (key === "ritual" || key === "concentration") return null;

            return (
              <div key={key}>
                <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  {sectionTitle(key)}
                </div>

                <div className="flex flex-wrap gap-2">
                  {(options || []).length === 0 ? (
                    <span className="text-xs text-slate-500">No options</span>
                  ) : (
                    options.map((value) => {
                      const active = (selected[key] || []).includes(value);

                      const activeColor =
                        key === "levels"
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
                          : key === "classes"
                          ? "border-indigo-500 bg-indigo-500/20 text-indigo-100"
                          : key === "damageType"
                          ? "border-rose-500 bg-rose-500/20 text-rose-100"
                          : "border-sky-500 bg-sky-500/20 text-sky-100";

                      return (
                        <button
                          key={`${key}-${value}`}
                          type="button"
                          onClick={() => toggleOption(key, value)}
                          className={`px-2.5 py-1 rounded-md border text-xs capitalize transition
                            ${
                              active
                                ? activeColor
                                : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]"
                            }`}
                        >
                          {renderButtonLabel(key, value)}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}

          {/* ====== OTHER FILTERS ====== */}
          <div className="border-t border-slate-700/60 pt-3 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Other Filters
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-slate-500 bg-transparent"
                  checked={selected.ritual}
                  onChange={() => toggleOption("ritual")}
                />
                <span>Ritual</span>
              </label>

              <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-slate-500 bg-transparent"
                  checked={selected.concentration}
                  onChange={() => toggleOption("concentration")}
                />
                <span>Concentration</span>
              </label>

              <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-slate-500 bg-transparent"
                  checked={selected.favoritesOnly}
                  onChange={() => toggleOption("favoritesOnly")}
                />
                <span>Favorites only</span>
              </label>
            </div>
          </div>

          {/* ====== DURATION (teks dibesarkan) ====== */}
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
                  {
                    key: "durationIncludeInstant",
                    label: "Instantaneous",
                    short: "Inst",
                  },
                  {
                    key: "durationIncludePermanent",
                    label: "Permanent",
                    short: "Perm",
                  },
                  {
                    key: "durationIncludeSpecial",
                    label: "Special",
                    short: "Special",
                  },
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

          {/* ====== RANGE (slider + input angka di kiri/kanan) ====== */}
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
                {/* input MIN di kiri slider */}
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

                {/* SLIDER */}
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

                {/* input MAX di kanan slider */}
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
        </div>

        {/* FOOTER BUTTONS */}
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
