"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
} from "lucide-react";
import InputField from "@/components/InputField";
import ImagePicker from "@/components/ImagePicker";

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

/* ---------- helpers ---------- */
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

/** sortable wrapper */
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

/** drag handle + up/down + delete */
function CardHeaderActions({ id, onDelete, onMoveUp, onMoveDown }) {
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
        onClick={onMoveUp}
        title="Move up"
        className="w-9 h-9 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 flex items-center justify-center"
      >
        <ChevronUp className="w-4 h-4 text-slate-200" />
      </button>

      <button
        type="button"
        onClick={onMoveDown}
        title="Move down"
        className="w-9 h-9 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 flex items-center justify-center"
      >
        <ChevronDown className="w-4 h-4 text-slate-200" />
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

export default function Step2({ form, setForm }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL || "";

  const SEASON_PICKER_BASE = `${MEDIA_URL}/browser/list?path=calender/season_icon`;
  const MOON_PICKER_BASE = `${MEDIA_URL}/calendar/moon/list`;

  const [openSeasonPicker, setOpenSeasonPicker] = useState(false);
  const [seasonPickingKey, setSeasonPickingKey] = useState(null);

  const [openMoonPicker, setOpenMoonPicker] = useState(false);
  const [moonPickingKey, setMoonPickingKey] = useState(null);

  /* -------- nested get/set -------- */
  const getArr = (path) => {
    if (path === "months")
      return Array.isArray(form.months?.values) ? form.months.values : [];
    if (path === "days")
      return Array.isArray(form.days?.values) ? form.days.values : [];
    if (path === "seasons")
      return Array.isArray(form.seasons?.values) ? form.seasons.values : [];
    if (path === "weather")
      return Array.isArray(form.weather?.values) ? form.weather.values : [];
    if (path === "moon_cycle")
      return Array.isArray(form.moon_cycle?.values)
        ? form.moon_cycle.values
        : [];
    return [];
  };

  const setArr = (path, nextArr) => {
    setForm((p) => {
      if (path === "months")
        return { ...p, months: { ...(p.months || {}), values: nextArr } };
      if (path === "days")
        return { ...p, days: { ...(p.days || {}), values: nextArr } };
      if (path === "seasons")
        return { ...p, seasons: { ...(p.seasons || {}), values: nextArr } };
      if (path === "weather")
        return { ...p, weather: { ...(p.weather || {}), values: nextArr } };
      if (path === "moon_cycle")
        return {
          ...p,
          moon_cycle: { ...(p.moon_cycle || {}), values: nextArr },
        };
      return p;
    });
  };

  const normalizeOrdinals = (path, arr) => {
    return arr.map((it, idx) => {
      if (path === "months") return { ...it, ordinal: idx + 1 };
      if (path === "days") return { ...it, ordinal: idx + 1 };
      return it;
    });
  };

  const reorder = (path, activeId, overId) => {
    if (!overId || activeId === overId) return;
    const arr = getArr(path);
    const oldIndex = arr.findIndex((x) => x._key === activeId);
    const newIndex = arr.findIndex((x) => x._key === overId);
    if (oldIndex < 0 || newIndex < 0) return;

    const next = normalizeOrdinals(path, arrayMove(arr, oldIndex, newIndex));
    setArr(path, next);
  };

  const moveByIndex = (path, fromIndex, toIndex) => {
    const arr = getArr(path);
    if (fromIndex < 0 || toIndex < 0) return;
    if (fromIndex >= arr.length || toIndex >= arr.length) return;
    if (fromIndex === toIndex) return;

    const next = normalizeOrdinals(path, arrayMove(arr, fromIndex, toIndex));
    setArr(path, next);
  };

  const moveUp = (path, key) => {
    const arr = getArr(path);
    const idx = arr.findIndex((x) => x._key === key);
    if (idx <= 0) return;
    moveByIndex(path, idx, idx - 1);
  };

  const moveDown = (path, key) => {
    const arr = getArr(path);
    const idx = arr.findIndex((x) => x._key === key);
    if (idx < 0 || idx >= arr.length - 1) return;
    moveByIndex(path, idx, idx + 1);
  };

  const addItem = (path, item) => {
    const arr = getArr(path);
    const next = normalizeOrdinals(path, [...arr, item]);
    setArr(path, next);
  };

  const removeItem = (path, key) => {
    const arr = getArr(path);
    const next = normalizeOrdinals(
      path,
      arr.filter((x) => x._key !== key)
    );
    setArr(path, next);
  };

  const patchItem = (path, key, patch) => {
    const arr = getArr(path);
    const next = arr.map((x) => (x._key === key ? { ...x, ...patch } : x));
    setArr(path, next);
  };

  return (
    <div className="space-y-4">
      {/* ================= Months ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Months</p>
          <button
            type="button"
            onClick={() =>
              addItem("months", {
                _key: uid(),
                name: "",
                abbreviation: "",
                ordinal: (form.months?.values?.length || 0) + 1,
                days: 30,
                leap_days: null,
              })
            }
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
              reorder("months", active?.id, over?.id)
            }
          >
            <SortableContext
              items={(form.months?.values || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.months?.values || []).map((m) => (
                <SortableCard key={m._key} id={m._key}>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">
                        Month #{m.ordinal ?? "-"}
                      </p>
                      <CardHeaderActions
                        id={m._key}
                        onMoveUp={() => moveUp("months", m._key)}
                        onMoveDown={() => moveDown("months", m._key)}
                        onDelete={() => removeItem("months", m._key)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <InputField
                        label="Name"
                        value={m.name}
                        onChange={(v) =>
                          patchItem("months", m._key, { name: pickValue(v) })
                        }
                      />
                      <InputField
                        label="Abbreviation"
                        value={m.abbreviation}
                        onChange={(v) =>
                          patchItem("months", m._key, {
                            abbreviation: pickValue(v),
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <InputField
                        label="Days"
                        type="number"
                        value={m.days ?? 30}
                        onChange={(v) =>
                          patchItem("months", m._key, {
                            days: pickNumber(v, 30),
                          })
                        }
                      />
                      <InputField
                        label="Ordinal"
                        value={m.ordinal ?? ""}
                        disabled
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <InputField
                        label="Leap Days (optional)"
                        type="number"
                        value={m.leap_days ?? ""}
                        onChange={(v) =>
                          patchItem("months", m._key, {
                            leap_days: pickNumber(v, null),
                          })
                        }
                      />
                      <div className="text-[11px] text-slate-500 self-end">
                        Used when leap year triggers.
                      </div>
                    </div>
                  </div>
                </SortableCard>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* ================= Days ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Days</p>
          <button
            type="button"
            onClick={() =>
              addItem("days", {
                _key: uid(),
                name: "",
                abbreviation: "",
                ordinal: (form.days?.values?.length || 0) + 1,
              })
            }
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Day
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-xs text-slate-300 mb-3">Day Settings</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <InputField
                label="Days per year"
                type="number"
                value={form.days?.days_per_year ?? 365}
                onChange={(v) =>
                  setForm((p) => ({
                    ...p,
                    days: {
                      ...(p.days || {}),
                      days_per_year: pickNumber(v, 365),
                    },
                  }))
                }
              />
              <InputField
                label="Hours per day"
                type="number"
                value={form.days?.hours_per_day ?? 24}
                onChange={(v) =>
                  setForm((p) => ({
                    ...p,
                    days: {
                      ...(p.days || {}),
                      hours_per_day: pickNumber(v, 24),
                    },
                  }))
                }
              />
              <InputField
                label="Minutes per hour"
                type="number"
                value={form.days?.minutes_per_hour ?? 60}
                onChange={(v) =>
                  setForm((p) => ({
                    ...p,
                    days: {
                      ...(p.days || {}),
                      minutes_per_hour: pickNumber(v, 60),
                    },
                  }))
                }
              />
              <InputField
                label="Seconds per minute"
                type="number"
                value={form.days?.seconds_per_minute ?? 60}
                onChange={(v) =>
                  setForm((p) => ({
                    ...p,
                    days: {
                      ...(p.days || {}),
                      seconds_per_minute: pickNumber(v, 60),
                    },
                  }))
                }
              />
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) =>
              reorder("days", active?.id, over?.id)
            }
          >
            <SortableContext
              items={(form.days?.values || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.days?.values || []).map((d) => (
                <SortableCard key={d._key} id={d._key}>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">
                        Day #{d.ordinal ?? "-"}
                      </p>
                      <CardHeaderActions
                        id={d._key}
                        onMoveUp={() => moveUp("days", d._key)}
                        onMoveDown={() => moveDown("days", d._key)}
                        onDelete={() => removeItem("days", d._key)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <InputField
                        label="Name"
                        value={d.name}
                        onChange={(v) =>
                          patchItem("days", d._key, { name: pickValue(v) })
                        }
                      />
                      <InputField
                        label="Abbreviation"
                        value={d.abbreviation}
                        onChange={(v) =>
                          patchItem("days", d._key, {
                            abbreviation: pickValue(v),
                          })
                        }
                      />
                    </div>

                    <InputField
                      label="Ordinal"
                      value={d.ordinal ?? ""}
                      disabled
                    />
                  </div>
                </SortableCard>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* ================= Seasons (ImagePicker langsung) ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Seasons</p>
          <button
            type="button"
            onClick={() =>
              addItem("seasons", {
                _key: uid(),
                name: "",
                month_start: 1,
                month_end: 1,
                icon: "",
              })
            }
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Season
          </button>
        </div>

        <div className="p-4 space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) =>
              reorder("seasons", active?.id, over?.id)
            }
          >
            <SortableContext
              items={(form.seasons?.values || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.seasons?.values || []).map((s) => {
                const hasIcon = String(s.icon || "").trim().length > 0;

                return (
                  <SortableCard key={s._key} id={s._key}>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">Season</p>
                        <CardHeaderActions
                          id={s._key}
                          onMoveUp={() => moveUp("seasons", s._key)}
                          onMoveDown={() => moveDown("seasons", s._key)}
                          onDelete={() => removeItem("seasons", s._key)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <InputField
                          label="Name"
                          value={s.name}
                          onChange={(v) =>
                            patchItem("seasons", s._key, { name: pickValue(v) })
                          }
                        />
                        <InputField
                          label="Month start"
                          type="number"
                          value={s.month_start ?? 1}
                          onChange={(v) =>
                            patchItem("seasons", s._key, {
                              month_start: pickNumber(v, 1),
                            })
                          }
                        />
                        <InputField
                          label="Month end"
                          type="number"
                          value={s.month_end ?? 1}
                          onChange={(v) =>
                            patchItem("seasons", s._key, {
                              month_end: pickNumber(v, 1),
                            })
                          }
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden flex items-center justify-center">
                          {hasIcon ? (
                            <img
                              src={s.icon}
                              alt="Season Icon"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[11px] text-slate-500">
                              —
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="text-[11px] text-slate-400">Icon</div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSeasonPickingKey(s._key);
                                setOpenSeasonPicker(true);
                              }}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-100"
                            >
                              <ImageIcon className="w-4 h-4 text-slate-200" />
                              {hasIcon ? "Change" : "Pick icon"}
                            </button>

                            {hasIcon ? (
                              <button
                                type="button"
                                onClick={() =>
                                  patchItem("seasons", s._key, { icon: "" })
                                }
                                className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center"
                                title="Clear icon"
                              >
                                <Trash2 className="w-4 h-4 text-slate-200" />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SortableCard>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* ================= Weather ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Weather</p>
          <button
            type="button"
            onClick={() =>
              addItem("weather", {
                _key: uid(),
                name: "",
                month_start: 1,
                month_end: 1,
                temp_offset: 0,
              })
            }
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Weather
          </button>
        </div>

        <div className="p-4 space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) =>
              reorder("weather", active?.id, over?.id)
            }
          >
            <SortableContext
              items={(form.weather?.values || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.weather?.values || []).map((w) => (
                <SortableCard key={w._key} id={w._key}>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Weather</p>
                      <CardHeaderActions
                        id={w._key}
                        onMoveUp={() => moveUp("weather", w._key)}
                        onMoveDown={() => moveDown("weather", w._key)}
                        onDelete={() => removeItem("weather", w._key)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <InputField
                        label="Name"
                        value={w.name}
                        onChange={(v) =>
                          patchItem("weather", w._key, { name: pickValue(v) })
                        }
                      />
                      <InputField
                        label="Month start"
                        type="number"
                        value={w.month_start ?? 1}
                        onChange={(v) =>
                          patchItem("weather", w._key, {
                            month_start: pickNumber(v, 1),
                          })
                        }
                      />
                      <InputField
                        label="Month end"
                        type="number"
                        value={w.month_end ?? 1}
                        onChange={(v) =>
                          patchItem("weather", w._key, {
                            month_end: pickNumber(v, 1),
                          })
                        }
                      />
                      <InputField
                        label="Temp offset"
                        type="number"
                        value={w.temp_offset ?? 0}
                        onChange={(v) =>
                          patchItem("weather", w._key, {
                            temp_offset: pickNumber(v, 0),
                          })
                        }
                      />
                    </div>
                  </div>
                </SortableCard>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* ================= Moon Cycle (rapi + tanpa Icon URL) ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">Moon Cycle</p>
          <button
            type="button"
            onClick={() =>
              addItem("moon_cycle", {
                _key: uid(),
                name: "",
                day_start: 1,
                day_end: 1,
                icon: "",
              })
            }
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Phase
          </button>
        </div>

        <div className="p-4 space-y-4">
          <InputField
            label="Moon name"
            value={form.moon_cycle?.name || ""}
            onChange={(v) =>
              setForm((p) => ({
                ...p,
                moon_cycle: { ...(p.moon_cycle || {}), name: pickValue(v) },
              }))
            }
          />

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) =>
              reorder("moon_cycle", active?.id, over?.id)
            }
          >
            <SortableContext
              items={(form.moon_cycle?.values || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.moon_cycle?.values || []).map((ph) => {
                const hasIcon = String(ph.icon || "").trim().length > 0;

                return (
                  <SortableCard key={ph._key} id={ph._key}>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">Phase</p>
                        <CardHeaderActions
                          id={ph._key}
                          onMoveUp={() => moveUp("moon_cycle", ph._key)}
                          onMoveDown={() => moveDown("moon_cycle", ph._key)}
                          onDelete={() => removeItem("moon_cycle", ph._key)}
                        />
                      </div>

                      {/* ✅ rapihin: name + start + end satu baris */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <InputField
                          label="Name"
                          value={ph.name}
                          onChange={(v) =>
                            patchItem("moon_cycle", ph._key, {
                              name: pickValue(v),
                            })
                          }
                        />
                        <InputField
                          label="Day start"
                          type="number"
                          value={ph.day_start ?? 1}
                          onChange={(v) =>
                            patchItem("moon_cycle", ph._key, {
                              day_start: pickNumber(v, 1),
                            })
                          }
                        />
                        <InputField
                          label="Day end"
                          type="number"
                          value={ph.day_end ?? 1}
                          onChange={(v) =>
                            patchItem("moon_cycle", ph._key, {
                              day_end: pickNumber(v, 1),
                            })
                          }
                        />
                      </div>

                      {/* ✅ icon block rapi */}
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden flex items-center justify-center">
                          {hasIcon ? (
                            <img
                              src={ph.icon}
                              alt="Moon Icon"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[11px] text-slate-500">
                              —
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="text-[11px] text-slate-400">Icon</div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setMoonPickingKey(ph._key);
                                setOpenMoonPicker(true);
                              }}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-100"
                            >
                              <ImageIcon className="w-4 h-4 text-slate-200" />
                              {hasIcon ? "Change" : "Pick icon"}
                            </button>

                            {hasIcon ? (
                              <button
                                type="button"
                                onClick={() =>
                                  patchItem("moon_cycle", ph._key, { icon: "" })
                                }
                                className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center"
                                title="Clear icon"
                              >
                                <Trash2 className="w-4 h-4 text-slate-200" />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SortableCard>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* ================= Modals ================= */}
      <ImagePicker
        isOpen={openSeasonPicker}
        baseUrl={SEASON_PICKER_BASE}
        title="Select Season Icon"
        onSelect={(url) => {
          if (seasonPickingKey)
            patchItem("seasons", seasonPickingKey, { icon: url });
          setOpenSeasonPicker(false);
          setSeasonPickingKey(null);
        }}
        onClose={() => {
          setOpenSeasonPicker(false);
          setSeasonPickingKey(null);
        }}
      />

      <ImagePicker
        isOpen={openMoonPicker}
        baseUrl={MOON_PICKER_BASE}
        title="Select Moon Phase Icon"
        onSelect={(url) => {
          if (moonPickingKey)
            patchItem("moon_cycle", moonPickingKey, { icon: url });
          setOpenMoonPicker(false);
          setMoonPickingKey(null);
        }}
        onClose={() => {
          setOpenMoonPicker(false);
          setMoonPickingKey(null);
        }}
      />
    </div>
  );
}
