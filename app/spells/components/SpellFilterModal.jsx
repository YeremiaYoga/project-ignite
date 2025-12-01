"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function SpellFilterModal({
  schoolOptions = [],
  selectedSchools = [],
  levelOptions = [],
  selectedLevels = [],
  onClose,
  onApply,
}) {
  const [draftSchools, setDraftSchools] = useState(selectedSchools || []);
  const [draftLevels, setDraftLevels] = useState(selectedLevels || []);

  useEffect(() => {
    setDraftSchools(selectedSchools || []);
  }, [selectedSchools]);

  useEffect(() => {
    setDraftLevels(selectedLevels || []);
  }, [selectedLevels]);

  const toggleSchool = (key) => {
    setDraftSchools((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleLevel = (key) => {
    setDraftLevels((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleReset = () => {
    setDraftSchools([]);
    setDraftLevels([]);
  };

  const handleApply = () => {
    onApply({
      schools: draftSchools,
      levels: draftLevels,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-xl border border-[#2a2f55] bg-[#050822] p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-100">
            Filter Spells
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* SCHOOL FILTER */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
            School
          </div>
          <div className="flex flex-wrap gap-2">
            {schoolOptions.map((opt) => {
              const active = draftSchools.includes(opt.key);
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => toggleSchool(opt.key)}
                  className={`px-2.5 py-1 rounded-md border text-xs capitalize transition
                    ${
                      active
                        ? "border-indigo-500 bg-indigo-500/20 text-indigo-100"
                        : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]"
                    }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* LEVEL FILTER */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
            Level
          </div>
          <div className="flex flex-wrap gap-2">
            {levelOptions.map((opt) => {
              const active = draftLevels.includes(opt.key);
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => toggleLevel(opt.key)}
                  className={`px-2.5 py-1 rounded-md border text-xs capitalize transition
                    ${
                      active
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
                        : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]"
                    }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

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
