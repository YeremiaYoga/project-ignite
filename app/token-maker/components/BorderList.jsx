"use client";

import { useState } from "react";

export default function BorderList({
  borders,
  loadingBorders,
  borderError,
  selectedBorder,
  onSelectBorder,
  borderLabel,
}) {
  const [openMobile, setOpenMobile] = useState(false);

  if (loadingBorders) {
    return (
      <div className="p-3 text-[11px] text-slate-400">Loading borders...</div>
    );
  }

  if (borderError) {
    return (
      <div className="p-3 text-[11px] text-red-400">{borderError}</div>
    );
  }

  const handleSelect = (border) => {
    onSelectBorder(border);
    setOpenMobile(false);
  };

  const current = selectedBorder && selectedBorder.id !== "none"
    ? selectedBorder
    : null;

  return (
    <div className="h-full">
      {/* ========== MOBILE (PHONE) – DROPDOWN DENGAN GAMBAR ========== */}
      <div className="md:hidden p-2 space-y-2 text-[11px]">
        <div className="font-semibold text-sky-100 mb-1">Border</div>

        {/* Tombol "select" */}
        <button
          type="button"
          onClick={() => setOpenMobile((v) => !v)}
          className="w-full flex items-center justify-between gap-2 px-2 py-2 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
              {current && current.image_url ? (
                <img
                  src={current.image_url}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-500">
                  –
                </div>
              )}
            </div>
            <span className="truncate">
              {current ? borderLabel(current) : "No Border (default)"}
            </span>
          </div>
          <span className="text-[10px] text-slate-400">▼</span>
        </button>

        {/* Panel dropdown */}
        {openMobile && (
          <div className="mt-1 max-h-64 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 shadow-lg">
            {/* No border option */}
            <button
              type="button"
              onClick={() =>
                handleSelect({ id: "none", name: "No Border", image_url: "" })
              }
              className={`w-full flex items-center gap-2 px-2 py-2 text-left border-b border-slate-800 last:border-b-0 ${
                selectedBorder?.id === "none"
                  ? "bg-sky-600/20 text-sky-200"
                  : "hover:bg-slate-800"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] text-slate-500">
                -
              </div>
              <span className="truncate">No Border</span>
            </button>

            {/* All borders */}
            {borders.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleSelect(b)}
                className={`w-full flex items-center gap-2 px-2 py-2 text-left border-b border-slate-800 last:border-b-0 ${
                  selectedBorder?.id === b.id
                    ? "bg-sky-600/20 text-sky-200"
                    : "hover:bg-slate-800"
                }`}
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                  {b.image_url && (
                    <img
                      src={b.image_url}
                      alt={b.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <span className="truncate">{borderLabel(b)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========== DESKTOP / TABLET – LIST SAMPING SEPERTI BIASA ========== */}
      <div className="hidden md:block p-2 space-y-1 text-[11px]">
        <div className="font-semibold text-sky-100 mb-1">Borders</div>

        {/* No border */}
        <button
          type="button"
          onClick={() =>
            onSelectBorder({ id: "none", name: "No Border", image_url: "" })
          }
          className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-left border ${
            selectedBorder?.id === "none"
              ? "border-sky-500 bg-slate-800"
              : "border-slate-800 bg-slate-900 hover:bg-slate-800"
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] text-slate-500">
            -
          </div>
          <span className="truncate">No Border</span>
        </button>

        {borders.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => onSelectBorder(b)}
            className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-left border ${
              selectedBorder?.id === b.id
                ? "border-sky-500 bg-slate-800"
                : "border-slate-800 bg-slate-900 hover:bg-slate-800"
            }`}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
              {b.image_url && (
                <img
                  src={b.image_url}
                  alt={b.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="truncate">{borderLabel(b)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
