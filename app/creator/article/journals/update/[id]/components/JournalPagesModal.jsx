
"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import RichTextAdvanced from "@/components/RichTextAdvanced";

function normalizeLevel(v) {
  const n = Number(v);
  if (n === 2) return 2;
  if (n === 3) return 3;
  return 1;
}

function Toggle({ checked, onChange, label, disabled = false }) {
  return (
    <label
      className={`inline-flex items-center gap-2 select-none ${
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <span className="text-xs text-slate-300">{label}</span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          "relative inline-flex h-6 w-11 items-center rounded-full border transition",
          checked
            ? "bg-indigo-600/80 border-indigo-500/40"
            : "bg-slate-900/60 border-slate-800",
        ].join(" ")}
        aria-pressed={checked}
        aria-label={label}
      >
        <span
          className={[
            "inline-block h-5 w-5 transform rounded-full bg-white transition",
            checked ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </label>
  );
}

export default function JournalPagesModal({
  open,
  initial,
  onClose,
  onSave,
  title = "Edit Page",
  saving = false,
}) {
  const [draft, setDraft] = useState({
    name: "",
    content: "",
    show_title: true,
    level: 1,
  });

  useEffect(() => {
    if (!open) return;
    setDraft({
      name: initial?.name || "Page Name 1",
      content: initial?.content ?? "",
      show_title:
        typeof initial?.show_title === "boolean" ? initial.show_title : true,
      level: normalizeLevel(initial?.level),
    });
  }, [open, initial]);

  if (!open) return null;

  const canSave = !!draft.name?.trim();

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950/70 via-slate-950/50 to-indigo-950/20 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs text-slate-400">Journal</p>
            <p className="text-sm font-semibold">{title}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900"
            title="Close"
            disabled={saving}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-slate-500">
                Page Name
              </label>
              <input
                value={draft.name}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, name: e.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Page Name"
              />
            </div>

            <div className="flex flex-col justify-end gap-2">
              <Toggle
                label="Show Title"
                checked={!!draft.show_title}
                onChange={(v) => setDraft((d) => ({ ...d, show_title: v }))}
                disabled={saving}
              />

              <div>
                <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-2">
                  Level
                </p>

                <div className="inline-flex rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                  {[1, 2, 3].map((lv) => {
                    const active = normalizeLevel(draft.level) === lv;
                    return (
                      <button
                        key={lv}
                        type="button"
                        onClick={() => setDraft((d) => ({ ...d, level: lv }))}
                        disabled={saving}
                        className={[
                          "px-3 py-2 text-xs transition",
                          active
                            ? "bg-indigo-600/80 text-white"
                            : "bg-transparent text-slate-200 hover:bg-slate-900",
                          saving ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                      >
                        Level {lv}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-slate-500">
              Content 
            </label>

            <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <RichTextAdvanced
                value={draft.content}
                onChange={(html) => setDraft((d) => ({ ...d, content: html }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!canSave || saving}
              onClick={() =>
                onSave({
                  name: draft.name,
                  content: draft.content,
                  show_title: !!draft.show_title,
                  level: normalizeLevel(draft.level),
                })
              }
              className={`px-3 py-2 rounded-xl text-xs font-medium inline-flex items-center gap-2 ${
                !canSave || saving
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600/90 hover:bg-indigo-600 text-white"
              }`}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
