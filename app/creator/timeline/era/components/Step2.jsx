"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import InputField from "@/components/InputField";
import PillsInput from "./PillsInput";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

/** ✅ Card wrapper for sortable */
function SortableCard({ id, children }) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.75 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {children}
    </div>
  );
}

/** ✅ Drag handle + delete side-by-side */
function CardHeaderActions({ id, onDelete }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        {...attributes}
        {...listeners}
        title="Drag to reorder"
        className="w-9 h-9 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-slate-300" />
      </button>

      <button
        type="button"
        onClick={onDelete}
        title="Delete"
        className="w-9 h-9 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 flex items-center justify-center"
      >
        <Trash2 className="w-4 h-4 text-red-200" />
      </button>
    </div>
  );
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
  // ✅ DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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
          ? { ...m, season: (m.season || []).filter((_, i) => i !== idx) }
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

  // ✅ reorder helper
  const reorderListByKeys = (listName, activeId, overId) => {
    if (!overId || activeId === overId) return;

    setForm((p) => {
      const arr = Array.isArray(p[listName]) ? p[listName] : [];
      const oldIndex = arr.findIndex((x) => x._key === activeId);
      const newIndex = arr.findIndex((x) => x._key === overId);
      if (oldIndex < 0 || newIndex < 0) return p;

      const nextArr = arrayMove(arr, oldIndex, newIndex);
      return { ...p, [listName]: nextArr };
    });
  };

  // ✅ reorder moon phases (nested)
  const reorderMoonPhases = (activeId, overId) => {
    if (!overId || activeId === overId) return;

    setForm((p) => {
      const phases = Array.isArray(p.moon_cycle?.phases) ? p.moon_cycle.phases : [];
      const oldIndex = phases.findIndex((x) => x._key === activeId);
      const newIndex = phases.findIndex((x) => x._key === overId);
      if (oldIndex < 0 || newIndex < 0) return p;

      const nextPhases = arrayMove(phases, oldIndex, newIndex);
      return {
        ...p,
        moon_cycle: {
          ...(p.moon_cycle || {}),
          phases: nextPhases,
        },
      };
    });
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

      {/* ================= Months (DnD) ================= */}
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) =>
              reorderListByKeys("months", active?.id, over?.id)
            }
          >
            <SortableContext
              items={(form.months || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.months || []).map((m) => (
                <SortableCard key={m._key} id={m._key}>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Month</p>
                      <CardHeaderActions
                        id={m._key}
                        onDelete={() => removeListItem("months", m._key)}
                      />
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

                    {/* season pills */}
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
                </SortableCard>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* ================= Weeks (DnD) ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Weeks</p>
          <button
            type="button"
            onClick={() => addListItem("weeks", newWeekDay)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Day
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) =>
              reorderListByKeys("weeks", active?.id, over?.id)
            }
          >
            {/* NOTE: walau grid 2 kolom, urutan array tetap bisa berubah */}
            <SortableContext
              items={(form.weeks || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.weeks || []).map((d) => (
                <SortableCard key={d._key} id={d._key}>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Day</p>
                      <CardHeaderActions
                        id={d._key}
                        onDelete={() => removeListItem("weeks", d._key)}
                      />
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
                        patchListItem("weeks", d._key, {
                          shorten: pickValue(v),
                        })
                      }
                    />
                  </div>
                </SortableCard>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* ================= Moon Cycle (DnD phases) ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Moon Cycle</p>
          <button
            type="button"
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

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) =>
              reorderMoonPhases(active?.id, over?.id)
            }
          >
            <SortableContext
              items={(form.moon_cycle?.phases || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.moon_cycle?.phases || []).map((ph) => (
                <SortableCard key={ph._key} id={ph._key}>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Phase</p>
                      <CardHeaderActions
                        id={ph._key}
                        onDelete={() => removeMoonPhase(ph._key)}
                      />
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
                </SortableCard>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
