// app/feats/components/FeatFilterModal.jsx
"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

const INITIAL_FILTERS = {
  type: "",
  category: "",
};

export default function FeatFilterModal({ onClose, onApply, value }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    setFilters({
      ...INITIAL_FILTERS,
      ...(value || {}),
    });
  }, [value]);

  const handleChange = (key, val) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleApply = () => {
    onApply(filters);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

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
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wide">
              Type
            </label>
            <input
              type="text"
              value={filters.type}
              onChange={(e) => handleChange("type", e.target.value)}
              placeholder="e.g. General, Combat..."
              className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wide">
              Category
            </label>
            <input
              type="text"
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="e.g. Racial, Class, Background..."
              className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-indigo-400"
            />
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
