"use client";

import { Plus, X } from "lucide-react";

export default function PillsInput({
  label,
  value = [],
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
      <p className="text-xs text-slate-300 mb-2">{label}</p>

      {value.length ? (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((item, idx) => (
            <div
              key={`${item}_${idx}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-950 text-xs text-slate-200"
            >
              <span className="max-w-[240px] truncate">{item}</span>
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="w-5 h-5 rounded-full hover:bg-slate-800 flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5 text-slate-300" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-slate-500 mb-3">No items yet.</p>
      )}

      <div className="flex items-center gap-2">
        <input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type alias then click Add..."
          className="flex-1 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
}
