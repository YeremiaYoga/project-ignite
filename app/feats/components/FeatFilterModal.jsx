// app/feats/components/FeatFilterModal.jsx
"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";

const LEVEL_MIN_DEFAULT = 0;
const LEVEL_MAX_DEFAULT = 20;

// type feat yang bisa dipilih (bisa multiple)
// untuk sekarang: General & Origin, nanti tinggal tambah kalau perlu
const TYPE_OPTIONS = ["General", "Origin"];

const INITIAL_FILTERS = {
  type: [], // multiple (["General","Origin",...])
  levelMinIndex: LEVEL_MIN_DEFAULT,
  levelMaxIndex: LEVEL_MAX_DEFAULT,
  repeatable: false, // toggle: hanya tampilkan feat repeatable
};

export default function FeatFilterModal({ onClose, onApply, value }) {
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const getInitialFromValue = (val) => {
    const base = { ...(val || {}) };

    // normalisasi type: boleh string / array
    let typeArr = [];
    if (Array.isArray(base.type)) {
      typeArr = base.type.filter(Boolean);
    } else if (typeof base.type === "string" && base.type.trim()) {
      typeArr = base.type
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const levelMinIndex =
      typeof base.levelMin === "number"
        ? clamp(base.levelMin, LEVEL_MIN_DEFAULT, LEVEL_MAX_DEFAULT)
        : LEVEL_MIN_DEFAULT;

    const levelMaxIndex =
      typeof base.levelMax === "number"
        ? clamp(base.levelMax, LEVEL_MIN_DEFAULT, LEVEL_MAX_DEFAULT)
        : LEVEL_MAX_DEFAULT;

    return {
      ...INITIAL_FILTERS,
      type: typeArr,
      repeatable: !!base.repeatable,
      levelMinIndex,
      levelMaxIndex: Math.max(levelMinIndex, levelMaxIndex),
    };
  };

  const [filters, setFilters] = useState(getInitialFromValue(value));

  useEffect(() => {
    setFilters(getInitialFromValue(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleApply = () => {
    const levelMin =
      typeof filters.levelMinIndex === "number"
        ? clamp(filters.levelMinIndex, LEVEL_MIN_DEFAULT, LEVEL_MAX_DEFAULT)
        : LEVEL_MIN_DEFAULT;

    const levelMax =
      typeof filters.levelMaxIndex === "number"
        ? clamp(filters.levelMaxIndex, LEVEL_MIN_DEFAULT, LEVEL_MAX_DEFAULT)
        : LEVEL_MAX_DEFAULT;

    onApply({
      type: filters.type, // array, contoh: ["General","Origin"]
      levelMin,
      levelMax,
      repeatable: !!filters.repeatable, // true = hanya feat repeatable
    });

    onClose?.();
  };

  // toggle pill Type
  const toggleType = (val) => {
    setFilters((prev) => {
      const current = prev.type || [];
      const exists = current.includes(val);
      return {
        ...prev,
        type: exists ? current.filter((t) => t !== val) : [...current, val],
      };
    });
  };

  // toggle repeatable
  const toggleRepeatable = () => {
    setFilters((prev) => ({
      ...prev,
      repeatable: !prev.repeatable,
    }));
  };

  // value slider level
  const levelMinVal =
    typeof filters.levelMinIndex === "number"
      ? clamp(filters.levelMinIndex, LEVEL_MIN_DEFAULT, LEVEL_MAX_DEFAULT)
      : LEVEL_MIN_DEFAULT;

  const levelMaxVal = Math.max(
    levelMinVal,
    typeof filters.levelMaxIndex === "number"
      ? clamp(filters.levelMaxIndex, LEVEL_MIN_DEFAULT, LEVEL_MAX_DEFAULT)
      : LEVEL_MAX_DEFAULT
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* MODAL */}
      <div className="relative z-10 w-full max-w-md rounded-xl border border-[#2a2f55] bg-[#050822] p-4 md:p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <SlidersHorizontal className="w-4 h-4 text-slate-300" />
            <span>Filter Feats</span>
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
          {/* ===== TYPE (PILLS, MULTI) ===== */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
              Type
            </div>

            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((val) => {
                const active = filters.type.includes(val);
                return (
                  <button
                    key={val}
                    type="button"
                    // onClick={() => toggleType(val)}
                    className={`px-2.5 py-1 rounded-md border text-xs transition
                      ${
                        active
                          ? "border-sky-500 bg-sky-500/20 text-sky-100"
                          : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]"
                      }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border border-slate-700/70 rounded-lg px-3 py-3 bg-[#050a2a]/60">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Level Range
              </div>
              <div className="text-xs text-slate-300">
                {levelMinVal} – {levelMaxVal}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-300 w-10 text-right">
                  {levelMinVal}
                </span>

                <Slider.Root
                  className="relative flex-1 flex items-center h-5"
                  min={LEVEL_MIN_DEFAULT}
                  max={LEVEL_MAX_DEFAULT}
                  step={1}
                  value={[levelMinVal, levelMaxVal]}
                  onValueChange={([min, max]) => {
                    const clampedMin = clamp(
                      min,
                      LEVEL_MIN_DEFAULT,
                      LEVEL_MAX_DEFAULT
                    );
                    const clampedMax = Math.max(
                      clampedMin,
                      clamp(max, LEVEL_MIN_DEFAULT, LEVEL_MAX_DEFAULT)
                    );
                    setFilters((prev) => ({
                      ...prev,
                      levelMinIndex: clampedMin,
                      levelMaxIndex: clampedMax,
                    }));
                  }}
                >
                  <Slider.Track className="bg-slate-700 relative grow rounded-full h-1">
                    <Slider.Range className="absolute bg-emerald-500 rounded-full h-1" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-3 h-3 bg-emerald-400 rounded-full border border-emerald-200 shadow"
                    aria-label="Minimum level"
                  />
                  <Slider.Thumb
                    className="block w-3 h-3 bg-emerald-400 rounded-full border border-emerald-200 shadow"
                    aria-label="Maximum level"
                  />
                </Slider.Root>

                <span className="text-xs text-slate-300 w-10">
                  {levelMaxVal}
                </span>
              </div>

          
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
              Prerequisite Repeatable
            </div>

            <button
              type="button"
              onClick={toggleRepeatable}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition
                ${
                  filters.repeatable
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
                    : "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                }`}
            >
              <span
                className={`h-3 w-3 rounded-full border ${
                  filters.repeatable
                    ? "bg-emerald-400 border-emerald-200"
                    : "bg-transparent border-slate-500"
                }`}
              />
              <span>repeatable prerequisites</span>
            </button>
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
