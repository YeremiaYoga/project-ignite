"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ChevronLeft, ChevronRight, Plus, Save, Trash2, X } from "lucide-react";
import InputField from "@/components/InputField";
import RichTextAdvanced from "@/components/RichTextAdvanced";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

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
function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function genShareId(len = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
function computeTotal(start, end) {
  if (typeof start !== "number" || typeof end !== "number") return null;
  return end - start;
}
function newEra() {
  return {
    _key: uid(),
    name: "",
    shorten: "",
    other_name: [],
    _other_name_input: "",
    current: false,
    start: null,
    end: null,
    total: null,
    description: "",
  };
}
function newMonth() {
  return {
    _key: uid(),
    name: "",
    days: 30,
    season: [],
    leap: { state: false, every_year: null, skip_every: null, except_century: false, plus: null },
  };
}
function newWeekDay() {
  return { _key: uid(), name: "", shorten: "" };
}

function PillsInput({ label, value = [], inputValue, onInputChange, onAdd, onRemove }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
      <p className="text-xs text-slate-300 mb-2">{label}</p>

      {value.length ? (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((item, idx) => (
            <div key={`${item}_${idx}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-950 text-xs text-slate-200">
              <span className="max-w-[240px] truncate">{item}</span>
              <button type="button" onClick={() => onRemove(idx)} className="w-5 h-5 rounded-full hover:bg-slate-800 flex items-center justify-center">
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
        <button onClick={onAdd} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs">
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
}

export default function EraEditor({ mode = "create", initialData = null }) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(() => {
    if (initialData) return initialData;
    return {
      id: null,
      name: "",
      share_id: genShareId(12),
      epoch: { private: -10000, public: 0 },
      era: [newEra()],
      other_era: [newEra()],
      days_in_a_year: 365,
      months: [],
      weeks: [], // empty
      moon_cycle: { name: "", total_days: null, phases: [] }, // empty
    };
  });

  const step1Complete = useMemo(() => {
    if (!form.name?.trim()) return false;
    if (form.epoch?.private === null || Number.isNaN(Number(form.epoch?.private))) return false;
    if (form.epoch?.public === null || Number.isNaN(Number(form.epoch?.public))) return false;
    return true;
  }, [form]);

  // helpers list
  const patchListItem = (listKey, key, patch) =>
    setForm((p) => ({
      ...p,
      [listKey]: (p[listKey] || []).map((x) => (x._key === key ? { ...x, ...patch } : x)),
    }));

  const addListItem = (listKey, createFn) =>
    setForm((p) => ({ ...p, [listKey]: [...(p[listKey] || []), createFn()] }));

  const removeListItem = (listKey, key, fallbackFn) =>
    setForm((p) => {
      const next = (p[listKey] || []).filter((x) => x._key !== key);
      return { ...p, [listKey]: next.length ? next : fallbackFn ? [fallbackFn()] : [] };
    });

  const addOtherName = (listKey, key) => {
    setForm((p) => {
      const next = (p[listKey] || []).map((x) => {
        if (x._key !== key) return x;
        const raw = (x._other_name_input || "").trim();
        if (!raw) return x;
        const exists = (x.other_name || []).some((s) => String(s).toLowerCase() === raw.toLowerCase());
        return { ...x, other_name: exists ? (x.other_name || []) : [...(x.other_name || []), raw], _other_name_input: "" };
      });
      return { ...p, [listKey]: next };
    });
  };

  const removeOtherName = (listKey, key, idx) => {
    setForm((p) => ({
      ...p,
      [listKey]: (p[listKey] || []).map((x) => {
        if (x._key !== key) return x;
        return { ...x, other_name: (x.other_name || []).filter((_, i) => i !== idx) };
      }),
    }));
  };

  async function onSave() {
    const payload = {
      name: form.name,
      share_id: form.share_id,
      epoch: { private: Number(form.epoch.private), public: Number(form.epoch.public) },
      era: (form.era || []).map(({ _key, _other_name_input, ...e }) => ({
        ...e,
        start: e.start === null ? null : Number(e.start),
        end: e.end === null || e.end === "" ? null : Number(e.end),
        total: e.end === null || e.end === "" ? null : computeTotal(Number(e.start), Number(e.end)),
      })),
      other_era: (form.other_era || []).map(({ _key, _other_name_input, ...e }) => ({
        ...e,
        start: e.start === null ? null : Number(e.start),
        end: e.end === null || e.end === "" ? null : Number(e.end),
        total: e.end === null || e.end === "" ? null : computeTotal(Number(e.start), Number(e.end)),
      })),
      days_in_a_year: Number(form.days_in_a_year),
      months: (form.months || []).map(({ _key, ...m }) => ({ ...m, days: Number(m.days) })),
      weeks: (form.weeks || []).map(({ _key, ...w }) => w),
      moon_cycle: {
        ...(form.moon_cycle || {}),
        phases: (form.moon_cycle?.phases || []).map(({ _key, ...ph }) => ph),
      },
    };

    setSaving(true);
    try {
      const isUpdate = !!form.id;
      const url = isUpdate ? `${API_BASE}/ignite/timelines/${form.id}` : `${API_BASE}/ignite/timelines`;
      const method = isUpdate ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok || !json?.success) {
        console.error("save timeline failed:", json);
        alert(json?.message || "Failed to save timeline");
        return;
      }

      const saved = json?.data || null;
      if (saved?.id && !form.id) setForm((p) => ({ ...p, id: saved.id }));
      alert("Saved ✅");
    } catch (e) {
      console.error(e);
      alert("Failed to save timeline");
    } finally {
      setSaving(false);
    }
  }

  // ---------------- UI ----------------
  return (
    <div className="space-y-4">
      {/* Step Tabs */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(1)}
            className={`text-xs px-3 py-1 rounded-full border ${
              step === 1 ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-200" : "border-slate-800 bg-slate-950/50 text-slate-400"
            }`}
          >
            Step 1
          </button>
          <button
            onClick={() => setStep(2)}
            className={`text-xs px-3 py-1 rounded-full border ${
              step === 2 ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-200" : "border-slate-800 bg-slate-950/50 text-slate-400"
            }`}
          >
            Step 2
          </button>

          {!step1Complete && (
            <div className="ml-2 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs">
              <AlertTriangle className="w-4 h-4" />
              Step 1 incomplete (preview)
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            <p className="text-[11px] uppercase tracking-widest text-slate-500">Timeline Basics</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <InputField label="Timeline Name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: pickValue(v) }))} />
              <InputField label="Share ID" value={form.share_id} disabled onChange={() => {}} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <InputField
                label="Epoch Private"
                type="number"
                value={form.epoch?.private ?? ""}
                onChange={(v) => setForm((p) => ({ ...p, epoch: { ...(p.epoch || {}), private: pickNumber(v, 0) } }))}
              />
              <InputField
                label="Epoch Public"
                type="number"
                value={form.epoch?.public ?? ""}
                onChange={(v) => setForm((p) => ({ ...p, epoch: { ...(p.epoch || {}), public: pickNumber(v, 0) } }))}
              />
            </div>
          </div>

          {/* Eras */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-100">Eras</p>
              <button onClick={() => addListItem("era", newEra)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="p-4 space-y-3">
              {(form.era || []).map((e) => (
                <div key={e._key} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">Era</p>
                    <button onClick={() => removeListItem("era", e._key, newEra)} className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-red-200" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Name" value={e.name} onChange={(v) => patchListItem("era", e._key, { name: pickValue(v) })} />
                    <InputField label="Shorten" value={e.shorten} onChange={(v) => patchListItem("era", e._key, { shorten: pickValue(v) })} />
                  </div>

                  <PillsInput
                    label="Era Other Names"
                    value={e.other_name || []}
                    inputValue={e._other_name_input || ""}
                    onInputChange={(val) => patchListItem("era", e._key, { _other_name_input: val })}
                    onAdd={() => addOtherName("era", e._key)}
                    onRemove={(idx) => removeOtherName("era", e._key, idx)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Start" type="number" value={e.start ?? ""} onChange={(v) => patchListItem("era", e._key, { start: pickNumber(v, null) })} />
                    <InputField label="End (optional)" type="number" value={e.end ?? ""} onChange={(v) => patchListItem("era", e._key, { end: pickNumber(v, null) })} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-300 mb-2">Description</p>
                    <RichTextAdvanced value={e.description || ""} onChange={(val) => patchListItem("era", e._key, { description: val })} rows={8} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Eras */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-100">Other Eras</p>
              <button onClick={() => addListItem("other_era", newEra)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="p-4 space-y-3">
              {(form.other_era || []).map((e) => (
                <div key={e._key} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">Other Era</p>
                    <button onClick={() => removeListItem("other_era", e._key, newEra)} className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-red-200" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Name" value={e.name} onChange={(v) => patchListItem("other_era", e._key, { name: pickValue(v) })} />
                    <InputField label="Shorten" value={e.shorten} onChange={(v) => patchListItem("other_era", e._key, { shorten: pickValue(v) })} />
                  </div>

                  <PillsInput
                    label="Other Era Other Names"
                    value={e.other_name || []}
                    inputValue={e._other_name_input || ""}
                    onInputChange={(val) => patchListItem("other_era", e._key, { _other_name_input: val })}
                    onAdd={() => addOtherName("other_era", e._key)}
                    onRemove={(idx) => removeOtherName("other_era", e._key, idx)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Start" type="number" value={e.start ?? ""} onChange={(v) => patchListItem("other_era", e._key, { start: pickNumber(v, null) })} />
                    <InputField label="End (optional)" type="number" value={e.end ?? ""} onChange={(v) => patchListItem("other_era", e._key, { end: pickNumber(v, null) })} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-300 mb-2">Description</p>
                    <RichTextAdvanced value={e.description || ""} onChange={(val) => patchListItem("other_era", e._key, { description: val })} rows={8} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // STEP 2
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            <p className="text-[11px] uppercase tracking-widest text-slate-500">Calendar</p>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <InputField
                label="Days in a Year"
                type="number"
                value={form.days_in_a_year ?? 365}
                onChange={(v) => setForm((p) => ({ ...p, days_in_a_year: pickNumber(v, 365) }))}
              />
            </div>
          </div>

          {/* Months */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-100">Months</p>
              <button onClick={() => addListItem("months", newMonth)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs">
                <Plus className="w-4 h-4" />
                Add Month
              </button>
            </div>

            <div className="p-4 space-y-3">
              {(form.months || []).length === 0 ? (
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-400">No months yet.</div>
              ) : (
                (form.months || []).map((m) => (
                  <div key={m._key} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Month</p>
                      <button onClick={() => removeListItem("months", m._key)} className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-red-200" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <InputField label="Name" value={m.name} onChange={(v) => patchListItem("months", m._key, { name: pickValue(v) })} />
                      <InputField label="Days" type="number" value={m.days ?? 30} onChange={(v) => patchListItem("months", m._key, { days: pickNumber(v, 30) })} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Weeks */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-100">Weeks</p>
              <button onClick={() => addListItem("weeks", newWeekDay)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs">
                <Plus className="w-4 h-4" />
                Add Day
              </button>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
              {(form.weeks || []).length === 0 ? (
                <div className="col-span-2 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-400">No days yet.</div>
              ) : (
                (form.weeks || []).map((d) => (
                  <div key={d._key} className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Day</p>
                      <button onClick={() => removeListItem("weeks", d._key)} className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-red-200" />
                      </button>
                    </div>
                    <div className="mt-2">
                      <InputField label="Name" value={d.name} onChange={(v) => patchListItem("weeks", d._key, { name: pickValue(v) })} />
                    </div>
                    <div className="mt-2">
                      <InputField label="Shorten" value={d.shorten} onChange={(v) => patchListItem("weeks", d._key, { shorten: pickValue(v) })} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Moon Cycle */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-100">Moon Cycle</p>
              <button
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    moon_cycle: {
                      ...(p.moon_cycle || { name: "", total_days: null, phases: [] }),
                      phases: [...(p.moon_cycle?.phases || []), { _key: uid(), name: "", day: 1, symbol: "" }],
                    },
                  }))
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
              >
                <Plus className="w-4 h-4" />
                Add Phase
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Moon Name"
                  value={form.moon_cycle?.name || ""}
                  onChange={(v) => setForm((p) => ({ ...p, moon_cycle: { ...(p.moon_cycle || {}), name: pickValue(v) } }))}
                />
                <InputField
                  label="Total Days"
                  type="number"
                  value={form.moon_cycle?.total_days ?? ""}
                  onChange={(v) => setForm((p) => ({ ...p, moon_cycle: { ...(p.moon_cycle || {}), total_days: pickNumber(v, null) } }))}
                />
              </div>

              {(form.moon_cycle?.phases || []).length === 0 ? (
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-400">No phases yet.</div>
              ) : (
                (form.moon_cycle?.phases || []).map((ph) => (
                  <div key={ph._key} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Phase</p>
                      <button
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            moon_cycle: {
                              ...(p.moon_cycle || {}),
                              phases: (p.moon_cycle?.phases || []).filter((x) => x._key !== ph._key),
                            },
                          }))
                        }
                        className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 text-red-200" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <InputField
                        label="Name"
                        value={ph.name || ""}
                        onChange={(v) =>
                          setForm((p) => ({
                            ...p,
                            moon_cycle: {
                              ...(p.moon_cycle || {}),
                              phases: (p.moon_cycle?.phases || []).map((x) => (x._key === ph._key ? { ...x, name: pickValue(v) } : x)),
                            },
                          }))
                        }
                      />
                      <InputField
                        label="Day"
                        type="number"
                        value={ph.day ?? 1}
                        onChange={(v) =>
                          setForm((p) => ({
                            ...p,
                            moon_cycle: {
                              ...(p.moon_cycle || {}),
                              phases: (p.moon_cycle?.phases || []).map((x) => (x._key === ph._key ? { ...x, day: pickNumber(v, 1) } : x)),
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="mt-3">
                      <InputField
                        label="Symbol"
                        value={ph.symbol || ""}
                        onChange={(v) =>
                          setForm((p) => ({
                            ...p,
                            moon_cycle: {
                              ...(p.moon_cycle || {}),
                              phases: (p.moon_cycle?.phases || []).map((x) => (x._key === ph._key ? { ...x, symbol: pickValue(v) } : x)),
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
