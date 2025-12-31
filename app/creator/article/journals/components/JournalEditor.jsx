"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { uid } from "./journalUtils";
import RichTextAdvanced from "@/components/RichTextAdvanced"; // ✅ sesuaikan path kalau beda

export default function JournalEditor({ value, onChange }) {
  const pages = value?.pages || [];
  const [active, setActive] = useState(0);

  const safeActive = useMemo(() => {
    if (pages.length === 0) return 0;
    return Math.min(active, pages.length - 1);
  }, [active, pages.length]);

  function setPages(nextPages) {
    onChange({ ...(value || {}), pages: nextPages });
  }

  function addPage() {
    const next = [
      ...pages,
      { id: uid(), name: `Page ${pages.length + 1}`, content: "" },
    ];
    setPages(next);
    setActive(next.length - 1);
  }

  function removePage(idx) {
    if (pages.length <= 1) return;
    const next = pages.filter((_, i) => i !== idx);
    setPages(next);
    setActive(Math.max(0, idx - 1));
  }

  function patchPage(idx, patch) {
    const next = pages.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    setPages(next);
  }

  const current = pages[safeActive] || { name: "", content: "" };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-slate-900 disabled:opacity-40 text-slate-200"
            onClick={() => setActive((v) => Math.max(0, v - 1))}
            disabled={safeActive === 0}
            title="Prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-xs text-slate-300">
            Page{" "}
            <span className="font-semibold text-slate-100">
              {safeActive + 1}
            </span>{" "}
            /{" "}
            <span className="font-semibold text-slate-100">
              {pages.length || 0}
            </span>
          </div>

          <button
            type="button"
            className="p-2 rounded-lg hover:bg-slate-900 disabled:opacity-40 text-slate-200"
            onClick={() => setActive((v) => Math.min(pages.length - 1, v + 1))}
            disabled={safeActive >= pages.length - 1}
            title="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            // onClick={addPage}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Page
          </button>

          <button
            type="button"
            onClick={() => removePage(safeActive)}
            disabled={pages.length <= 1}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 text-xs text-red-200 disabled:opacity-40"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-slate-500">
              Page Name
            </label>
            <input
              value={current.name || ""}
              onChange={(e) => patchPage(safeActive, { name: e.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Page name..."
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800">
            <p className="text-[11px] uppercase tracking-widest text-slate-500">
              Content
            </p>
          </div>

          <div className="p-3">
            <RichTextAdvanced
              value={current.content ?? ""}
              onChange={(html) => patchPage(safeActive, { content: html })}
              placeholder="Write something..."
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          {pages.map((p, idx) => (
            <button
              type="button"
              key={p.id || idx}
              onClick={() => setActive(idx)}
              className={[
                "px-3 py-1.5 rounded-full text-xs border transition",
                idx === safeActive
                  ? "bg-indigo-600/90 text-white border-indigo-500/40"
                  : "bg-slate-950/40 text-slate-200 border-slate-800 hover:bg-slate-900",
              ].join(" ")}
              title={p.name || `Page ${idx + 1}`}
            >
              {(p.name || `Page ${idx + 1}`).slice(0, 22)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
