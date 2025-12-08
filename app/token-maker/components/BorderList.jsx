"use client";

import { Lock } from "lucide-react";

export default function BorderList({
  borders,
  loadingBorders,
  borderError,
  selectedBorder,
  onSelectBorder,
  borderLabel,
}) {
  const isNoneActive = !selectedBorder || selectedBorder.id === "none";

  return (
    <aside className="h-full bg-slate-950 border-r border-slate-800 flex flex-col overflow-y-auto">
      <div className="px-3 py-2 text-xs font-semibold tracking-wide text-sky-600 border-b border-slate-800">
        Borders
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
        {loadingBorders && (
          <div className="text-[11px] text-slate-300">Loading borders...</div>
        )}

        {borderError && (
          <div className="text-[11px] text-rose-300">{borderError}</div>
        )}

        {/* ==============================
            🔹 DEFAULT NO BORDER OPTION
        =============================== */}
        {!borderError && (
          <button
            type="button"
            onClick={() => onSelectBorder({ id: "none", name: "No Border" })}
            className={`w-full flex items-center gap-2 px-1 py-1 rounded-md border text-left text-[11px] transition
            ${
              isNoneActive
                ? "border-sky-400 bg-slate-900"
                : "border-slate-800 bg-slate-950 hover:bg-slate-900"
            }`}
          >
            <div className="w-8 h-8 rounded-full border border-dashed border-slate-500 flex items-center justify-center text-[9px] text-slate-400">
              none
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-[11px]">Default</div>
              <div className="truncate text-[10px] text-slate-500">
                No Border
              </div>
            </div>
          </button>
        )}

        {/* ==============================
            🔹 LIST BORDER DARI DATABASE
        =============================== */}
        {!loadingBorders &&
          !borderError &&
          borders.map((b) => {
            const active = selectedBorder?.id === b.id;
            const locked = b.is_paid === true;

            return (
              <button
                key={b.id}
                type="button"
                onClick={() => !locked && onSelectBorder(b)}
                disabled={locked}
                className={`w-full flex items-center gap-2 px-1 py-1 rounded-md border text-left text-[11px] transition
                ${
                  locked
                    ? "border-slate-700 bg-slate-900 cursor-not-allowed"
                    : active
                    ? "border-sky-400 bg-slate-900"
                    : "border-slate-800 bg-slate-950 hover:bg-slate-900"
                }`}
              >
                {/* Thumbnail preview */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-900 border border-slate-700 shrink-0 flex items-center justify-center">
                  {b.image_url ? (
                    <img
                      src={b.image_url}
                      alt={b.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-500" />
                  )}

                  {/* 🔒 LOCKED OVERLAY – blur tipis, gambar masih jelas */}
                  {locked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <Lock size={14} className="text-yellow-400" />
                    </div>
                  )}
                </div>

                {/* Name & Desc */}
                <div className="flex-1 min-w-0">
                  <div className="truncate text-[11px] flex items-center gap-1">
                    {borderLabel(b)}
                    {locked && (
                      <Lock size={10} className="text-yellow-400 shrink-0" />
                    )}
                  </div>
                  {b.description && (
                    <div className="truncate text-[10px] text-slate-400">
                      {b.description}
                    </div>
                  )}
                </div>
              </button>
            );
          })}

        {!loadingBorders && !borderError && borders.length === 0 && (
          <div className="text-[11px] text-slate-300">
            No token borders yet.
          </div>
        )}
      </div>
    </aside>
  );
}
