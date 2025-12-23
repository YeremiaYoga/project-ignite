"use client";

import { Plus, Trash2 } from "lucide-react";
import InputField from "@/components/InputField";
import RichTextAdvanced from "@/components/RichTextAdvanced";
import PillsInput from "./PillsInput";

function pickValue(v) {
  if (v && typeof v === "object" && "target" in v) return v.target?.value;
  return v;
}
function pickNumber(v, fallback = null) {
  const raw = pickValue(v);
  if (raw === "" || raw === null || raw === undefined) return fallback;
  const n = Number(raw);
  return Number.isNaN(n) ? fallback : n;
}

export default function Step1({
  form,
  setForm,
  patchListItem,
  addListItem,
  removeListItem,
  addOtherName,
  removeOtherName,
  newEra,
}) {
  // ✅ Only 1 "current" per list (era / other_era)
  const setCurrentInList = (listName, key, nextVal) => {
    setForm((p) => {
      const arr = Array.isArray(p[listName]) ? p[listName] : [];
      const nextArr = arr.map((it) => {
        if (it._key === key) return { ...it, current: !!nextVal };
        // kalau nyalain satu -> yang lain harus false
        if (nextVal) return { ...it, current: false };
        // kalau matiin -> yang lain tetap
        return it;
      });
      return { ...p, [listName]: nextArr };
    });
  };

  return (
    <div className="space-y-4">
      {/* Timeline Basics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
        <p className="text-[11px] uppercase tracking-widest text-slate-500">
          Timeline Basics
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <InputField
            label="Timeline Name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: pickValue(v) }))}
          />
          <InputField
            label="Share ID"
            value={form.share_id}
            disabled
            onChange={() => {}}
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <InputField
            label="Epoch Private"
            type="number"
            value={form.epoch?.private ?? ""}
            onChange={(v) =>
              setForm((p) => ({
                ...p,
                epoch: { ...(p.epoch || {}), private: pickNumber(v, 0) },
              }))
            }
          />
          <InputField
            label="Epoch Public"
            type="number"
            value={form.epoch?.public ?? ""}
            onChange={(v) =>
              setForm((p) => ({
                ...p,
                epoch: { ...(p.epoch || {}), public: pickNumber(v, 0) },
              }))
            }
          />
        </div>
      </div>

      {/* Eras */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Eras</p>
          <button
            type="button"
            onClick={() => addListItem("era", newEra)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="p-4 space-y-3">
          {(form.era || []).map((e) => (
            <div
              key={e._key}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Era</p>
                <button
                  type="button"
                  onClick={() => removeListItem("era", e._key, newEra)}
                  className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 text-red-200" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Name"
                  value={e.name}
                  onChange={(v) =>
                    patchListItem("era", e._key, { name: pickValue(v) })
                  }
                />
                <InputField
                  label="Shorten"
                  value={e.shorten}
                  onChange={(v) =>
                    patchListItem("era", e._key, { shorten: pickValue(v) })
                  }
                />
              </div>

              {/* ✅ CURRENT (only one per list) */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
                <div>
                  <p className="text-xs font-medium text-slate-200">
                    Current Era
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Only one era can be marked as current.
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={!!e.current}
                    onChange={(ev) =>
                      setCurrentInList("era", e._key, ev.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900"
                  />
                  <span className="text-xs text-slate-300">Set as current</span>
                </label>
              </div>

              <PillsInput
                label="Era Other Names"
                value={e.other_name || []}
                inputValue={e._other_name_input || ""}
                onInputChange={(val) =>
                  patchListItem("era", e._key, { _other_name_input: val })
                }
                onAdd={() => addOtherName("era", e._key)}
                onRemove={(idx) => removeOtherName("era", e._key, idx)}
              />

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Start"
                  type="number"
                  value={e.start ?? ""}
                  onChange={(v) =>
                    patchListItem("era", e._key, {
                      start: pickNumber(v, null),
                    })
                  }
                />
                <InputField
                  label="End (optional)"
                  type="number"
                  value={e.end ?? ""}
                  onChange={(v) =>
                    patchListItem("era", e._key, { end: pickNumber(v, null) })
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-300 mb-2">Description</p>
                <RichTextAdvanced
                  value={e.description || ""}
                  onChange={(val) =>
                    patchListItem("era", e._key, { description: val })
                  }
                  rows={8}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Eras */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Other Eras</p>
          <button
            type="button"
            onClick={() => addListItem("other_era", newEra)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="p-4 space-y-3">
          {(form.other_era || []).map((e) => (
            <div
              key={e._key}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Other Era</p>
                <button
                  type="button"
                  onClick={() => removeListItem("other_era", e._key, newEra)}
                  className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 text-red-200" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Name"
                  value={e.name}
                  onChange={(v) =>
                    patchListItem("other_era", e._key, { name: pickValue(v) })
                  }
                />
                <InputField
                  label="Shorten"
                  value={e.shorten}
                  onChange={(v) =>
                    patchListItem("other_era", e._key, { shorten: pickValue(v) })
                  }
                />
              </div>

              {/* ✅ CURRENT (only one per list) */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
                <div>
                  <p className="text-xs font-medium text-slate-200">
                    Current Other Era
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Only one other era can be marked as current.
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={!!e.current}
                    onChange={(ev) =>
                      setCurrentInList("other_era", e._key, ev.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900"
                  />
                  <span className="text-xs text-slate-300">Set as current</span>
                </label>
              </div>

              <PillsInput
                label="Other Era Other Names"
                value={e.other_name || []}
                inputValue={e._other_name_input || ""}
                onInputChange={(val) =>
                  patchListItem("other_era", e._key, { _other_name_input: val })
                }
                onAdd={() => addOtherName("other_era", e._key)}
                onRemove={(idx) => removeOtherName("other_era", e._key, idx)}
              />

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Start"
                  type="number"
                  value={e.start ?? ""}
                  onChange={(v) =>
                    patchListItem("other_era", e._key, {
                      start: pickNumber(v, null),
                    })
                  }
                />
                <InputField
                  label="End (optional)"
                  type="number"
                  value={e.end ?? ""}
                  onChange={(v) =>
                    patchListItem("other_era", e._key, {
                      end: pickNumber(v, null),
                    })
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-300 mb-2">Description</p>
                <RichTextAdvanced
                  value={e.description || ""}
                  onChange={(val) =>
                    patchListItem("other_era", e._key, { description: val })
                  }
                  rows={8}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
