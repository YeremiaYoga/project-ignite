"use client";

import { Plus, Trash2 } from "lucide-react";
import InputField from "@/components/InputField";
import PillsInput from ".//PillsInput"; 

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

export default function Step2({
  form,
  setForm,
  patchListItem,
  addListItem,
  removeListItem,
  newMonth,
  newWeekDay,
  addMoonPhase,
  removeMoonPhase,
  patchMoonPhase,
}) {
  // ===== MONTH: season pills helpers =====
  const setSeasonInput = (monthKey, val) => {
    setForm((p) => ({
      ...p,
      months: (p.months || []).map((m) =>
        m._key === monthKey ? { ...m, _season_input: val } : m
      ),
    }));
  };

  const addSeason = (monthKey) => {
    setForm((p) => ({
      ...p,
      months: (p.months || []).map((m) => {
        if (m._key !== monthKey) return m;
        const raw = (m._season_input || "").trim();
        if (!raw) return m;

        const exists = (m.season || []).some(
          (s) => s.toLowerCase() === raw.toLowerCase()
        );

        return {
          ...m,
          season: exists ? m.season : [...(m.season || []), raw],
          _season_input: "",
        };
      }),
    }));
  };

  const removeSeason = (monthKey, idx) => {
    setForm((p) => ({
      ...p,
      months: (p.months || []).map((m) =>
        m._key === monthKey
          ? { ...m, season: m.season.filter((_, i) => i !== idx) }
          : m
      ),
    }));
  };

  const patchLeap = (monthKey, patch) => {
    setForm((p) => ({
      ...p,
      months: (p.months || []).map((m) =>
        m._key === monthKey
          ? { ...m, leap: { ...(m.leap || {}), ...patch } }
          : m
      ),
    }));
  };

  return (
    <div className="space-y-4">
      {/* ================= Calendar ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
        <p className="text-[11px] uppercase tracking-widest text-slate-500">
          Calendar
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <InputField
            label="Days in a Year"
            type="number"
            value={form.days_in_a_year ?? 365}
            onChange={(v) =>
              setForm((p) => ({
                ...p,
                days_in_a_year: pickNumber(v, 365),
              }))
            }
          />
        </div>
      </div>

      {/* ================= Months ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Months</p>
          <button
            type="button"
            onClick={() => addListItem("months", newMonth)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Month
          </button>
        </div>

        <div className="p-4 space-y-4">
          {(form.months || []).map((m) => (
            <div
              key={m._key}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Month</p>
                <button
                  onClick={() => removeListItem("months", m._key)}
                  className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 text-red-200" />
                </button>
              </div>

              {/* name & days */}
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Name"
                  value={m.name}
                  onChange={(v) =>
                    patchListItem("months", m._key, { name: pickValue(v) })
                  }
                />
                <InputField
                  label="Days"
                  type="number"
                  value={m.days ?? 30}
                  onChange={(v) =>
                    patchListItem("months", m._key, {
                      days: pickNumber(v, 30),
                    })
                  }
                />
              </div>

              {/* season pills (PAKAI COMPONENT) */}
              <PillsInput
                label="Season"
                value={m.season || []}
                inputValue={m._season_input || ""}
                onInputChange={(val) => setSeasonInput(m._key, val)}
                onAdd={() => addSeason(m._key)}
                onRemove={(idx) => removeSeason(m._key, idx)}
              />

              {/* leap */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 space-y-3">
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={!!m.leap?.state}
                    onChange={(e) =>
                      patchLeap(m._key, { state: e.target.checked })
                    }
                  />
                  Enable Leap
                </label>

                {m.leap?.state && (
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      label="Every Year"
                      type="number"
                      value={m.leap.every_year ?? ""}
                      onChange={(v) =>
                        patchLeap(m._key, {
                          every_year: pickNumber(v, null),
                        })
                      }
                    />
                    <InputField
                      label="Skip Every"
                      type="number"
                      value={m.leap.skip_every ?? ""}
                      onChange={(v) =>
                        patchLeap(m._key, {
                          skip_every: pickNumber(v, null),
                        })
                      }
                    />
                    <InputField
                      label="Plus"
                      type="number"
                      value={m.leap.plus ?? ""}
                      onChange={(v) =>
                        patchLeap(m._key, {
                          plus: pickNumber(v, null),
                        })
                      }
                    />
                    <label className="flex items-center gap-2 text-xs text-slate-300 mt-6">
                      <input
                        type="checkbox"
                        checked={!!m.leap.except_century}
                        onChange={(e) =>
                          patchLeap(m._key, {
                            except_century: e.target.checked,
                          })
                        }
                      />
                      Except Century
                    </label>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-600">
                Events are managed in a separate page.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Weeks ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Weeks</p>
          <button
            onClick={() => addListItem("weeks", newWeekDay)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Day
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3">
          {(form.weeks || []).map((d) => (
            <div
              key={d._key}
              className="rounded-xl border border-slate-800 bg-slate-950/50 p-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Day</p>
                <button
                  onClick={() => removeListItem("weeks", d._key)}
                  className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 text-red-200" />
                </button>
              </div>

              <InputField
                label="Name"
                value={d.name}
                onChange={(v) =>
                  patchListItem("weeks", d._key, { name: pickValue(v) })
                }
              />
              <InputField
                label="Shorten"
                value={d.shorten}
                onChange={(v) =>
                  patchListItem("weeks", d._key, { shorten: pickValue(v) })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= Moon Cycle ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Moon Cycle</p>
          <button
            onClick={addMoonPhase}
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
              onChange={(v) =>
                setForm((p) => ({
                  ...p,
                  moon_cycle: {
                    ...(p.moon_cycle || {}),
                    name: pickValue(v),
                  },
                }))
              }
            />
            <InputField
              label="Total Days"
              type="number"
              value={form.moon_cycle?.total_days ?? ""}
              onChange={(v) =>
                setForm((p) => ({
                  ...p,
                  moon_cycle: {
                    ...(p.moon_cycle || {}),
                    total_days: pickNumber(v, null),
                  },
                }))
              }
            />
          </div>

          {(form.moon_cycle?.phases || []).map((ph) => (
            <div
              key={ph._key}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Phase</p>
                <button
                  onClick={() => removeMoonPhase(ph._key)}
                  className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 text-red-200" />
                </button>
              </div>

              <InputField
                label="Name"
                value={ph.name}
                onChange={(v) =>
                  patchMoonPhase(ph._key, { name: pickValue(v) })
                }
              />
              <InputField
                label="Day"
                type="number"
                value={ph.day}
                onChange={(v) =>
                  patchMoonPhase(ph._key, { day: pickNumber(v, 1) })
                }
              />
              <InputField
                label="Symbol"
                value={ph.symbol}
                onChange={(v) =>
                  patchMoonPhase(ph._key, { symbol: pickValue(v) })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
