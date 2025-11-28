"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * Props:
 * - typeOptions: [{ key, label }]
 * - selectedTypes: string[]
 * - rarityOptions: [{ key, label }]
 * - selectedRarities: string[]
 * - onClose: () => void
 * - onApply: ({ types: string[], rarities: string[] }) => void
 */
export default function ItemFilterModal({
  typeOptions = [],
  selectedTypes = [],
  rarityOptions = [],
  selectedRarities = [],
  onClose,
  onApply,
}) {
  const [draftTypes, setDraftTypes] = useState(selectedTypes || []);
  const [draftRarities, setDraftRarities] = useState(selectedRarities || []);

  useEffect(() => {
    setDraftTypes(selectedTypes || []);
  }, [selectedTypes]);

  useEffect(() => {
    setDraftRarities(selectedRarities || []);
  }, [selectedRarities]);

  const toggleType = (key) => {
    setDraftTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleRarity = (key) => {
    setDraftRarities((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleReset = () => {
    setDraftTypes([]);
    setDraftRarities([]);
  };

  const handleApply = () => {
    onApply({
      types: draftTypes,
      rarities: draftRarities,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-xl border border-[#2a2f55] bg-[#050822] p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-100">
            Filter Items
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* TYPE FILTER */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
            Type
          </div>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((opt) => {
              const active = draftTypes.includes(opt.key);
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => toggleType(opt.key)}
                  className={`px-2.5 py-1 rounded-md border text-xs capitalize transition
                    ${
                      active
                        ? "border-emerald-600 bg-emerald-500/20 text-emerald-100"
                        : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]"
                    }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* RARITY FILTER */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
            Rarity
          </div>
          <div className="flex flex-wrap gap-2">
            {rarityOptions.map((opt) => {
              const active = draftRarities.includes(opt.key);
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => toggleRarity(opt.key)}
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
