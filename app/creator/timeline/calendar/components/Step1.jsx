"use client";

import {
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import InputField from "@/components/InputField";
import RichTextAdvanced from "@/components/RichTextAdvanced";
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
function genShareId(len = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

/** Sortable card wrapper */
function SortableEraCard({ id, children }) {
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

/** Header actions: move up/down + drag + delete */
function CardHeaderActions({
  id,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onDelete,
}) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={index === 0}
        onClick={onMoveUp}
        title="Move up"
        className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800
          disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <ChevronUp className="w-4 h-4 text-slate-200" />
      </button>

      <button
        type="button"
        disabled={index === total - 1}
        onClick={onMoveDown}
        title="Move down"
        className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800
          disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <ChevronDown className="w-4 h-4 text-slate-200" />
      </button>

      <button
        type="button"
        {...attributes}
        {...listeners}
        title="Drag to reorder"
        className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800
          flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-slate-300" />
      </button>

      <button
        type="button"
        onClick={onDelete}
        title="Delete"
        className="w-9 h-9 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/15
          flex items-center justify-center"
      >
        <Trash2 className="w-4 h-4 text-red-200" />
      </button>
    </div>
  );
}

export default function Step1({
  form,
  setForm,
  addListItem,
  removeListItem,
  patchListItem,
  addOtherName,
  removeOtherName,
  newEra,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ✅ Generate ALWAYS creates a new share_id (so user sees it works)
  const generateShareId = () => {
    setForm((p) => ({ ...p, share_id: genShareId(12) }));
  };

  // ✅ Only 1 current per list
  const setCurrentInList = (listName, key, nextVal) => {
    setForm((p) => {
      const arr = Array.isArray(p[listName]) ? p[listName] : [];
      const nextArr = arr.map((it) => {
        if (it._key === key) return { ...it, current: !!nextVal };
        if (nextVal) return { ...it, current: false };
        return it;
      });
      return { ...p, [listName]: nextArr };
    });
  };

  // ✅ reorder helper (DnD)
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

  const moveItem = (listName, key, direction) => {
    setForm((p) => {
      const arr = Array.isArray(p[listName]) ? p[listName] : [];
      const index = arr.findIndex((x) => x._key === key);
      if (index < 0) return p;

      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= arr.length) return p;

      const nextArr = arrayMove(arr, index, target);
      return { ...p, [listName]: nextArr };
    });
  };

  return (
    <div className="space-y-4">
      {/* ================= Calendar Basics ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 md:p-5">
        <p className="text-[11px] uppercase tracking-widest text-slate-500">
          Calendar Basics
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InputField
            label="Calendar Name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: pickValue(v) }))}
          />

          <InputField
            label="Abbreviation"
            value={form.abbreviation || ""}
            onChange={(v) =>
              setForm((p) => ({ ...p, abbreviation: pickValue(v) }))
            }
          />

          {/* ✅ Share ID + Generate on the LEFT */}
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Share ID</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={generateShareId}
                className="px-3 h-[42px] rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-200 shrink-0"
              >
                Generate
              </button>

              <input
                value={form.share_id || ""}
                readOnly
                className="w-full h-[42px] rounded-xl border border-slate-800 bg-slate-950/60 px-3 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-200">Private</p>

          <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-200">Private</p>

            <button
              type="button"
              onClick={() =>
                setForm((p) => ({
                  ...p,
                  private: !p.private,
                }))
              }
              className={[
                "relative inline-flex h-7 w-12 items-center rounded-full transition border",
                form.private
                  ? "bg-indigo-600/70 border-indigo-500/40"
                  : "bg-slate-900 border-slate-700",
              ].join(" ")}
              aria-label="Toggle private"
              title={form.private ? "Private" : "Public"}
            >
              <span
                className={[
                  "inline-block h-5 w-5 transform rounded-full bg-white transition",
                  form.private ? "translate-x-6" : "translate-x-1",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
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

      {/* ================= Eras ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-4 md:px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-3">
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

        <div className="p-3 md:p-4 space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) =>
              reorderListByKeys("era", active?.id, over?.id)
            }
          >
            <SortableContext
              items={(form.era || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.era || []).map((e, idx) => (
                <SortableEraCard key={e._key} id={e._key}>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-slate-400">Era</p>
                      <CardHeaderActions
                        id={e._key}
                        index={idx}
                        total={(form.era || []).length}
                        onMoveUp={() => moveItem("era", e._key, "up")}
                        onMoveDown={() => moveItem("era", e._key, "down")}
                        onDelete={() => removeListItem("era", e._key, newEra)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <InputField
                        label="Name"
                        value={e.name}
                        onChange={(v) =>
                          patchListItem("era", e._key, { name: pickValue(v) })
                        }
                      />
                      <InputField
                        label="Abbreviation"
                        value={e.abbreviation}
                        onChange={(v) =>
                          patchListItem("era", e._key, {
                            abbreviation: pickValue(v),
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
                      <p className="text-xs font-medium text-slate-200">
                        Current Era
                      </p>

                      <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={!!e.current}
                          onChange={(ev) =>
                            setCurrentInList("era", e._key, ev.target.checked)
                          }
                          className="h-4 w-4 rounded border-slate-700 bg-slate-900"
                        />
                        <span className="text-xs text-slate-300">Current</span>
                      </label>
                    </div>

                    <PillsInput
                      label="Other Names"
                      value={e.other_name || []}
                      inputValue={e._other_name_input || ""}
                      onInputChange={(val) =>
                        patchListItem("era", e._key, { _other_name_input: val })
                      }
                      onAdd={() => addOtherName("era", e._key)}
                      onRemove={(i) => removeOtherName("era", e._key, i)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        label="End"
                        type="number"
                        value={e.end ?? ""}
                        onChange={(v) =>
                          patchListItem("era", e._key, {
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
                          patchListItem("era", e._key, { description: val })
                        }
                        rows={8}
                      />
                    </div>
                  </div>
                </SortableEraCard>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* ================= Other Eras ================= */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-4 md:px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-3">
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

        <div className="p-3 md:p-4 space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) =>
              reorderListByKeys("other_era", active?.id, over?.id)
            }
          >
            <SortableContext
              items={(form.other_era || []).map((x) => x._key)}
              strategy={verticalListSortingStrategy}
            >
              {(form.other_era || []).map((e, idx) => (
                <SortableEraCard key={e._key} id={e._key}>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-slate-400">Other Era</p>
                      <CardHeaderActions
                        id={e._key}
                        index={idx}
                        total={(form.other_era || []).length}
                        onMoveUp={() => moveItem("other_era", e._key, "up")}
                        onMoveDown={() => moveItem("other_era", e._key, "down")}
                        onDelete={() =>
                          removeListItem("other_era", e._key, newEra)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <InputField
                        label="Name"
                        value={e.name}
                        onChange={(v) =>
                          patchListItem("other_era", e._key, {
                            name: pickValue(v),
                          })
                        }
                      />
                      <InputField
                        label="Abbreviation"
                        value={e.abbreviation}
                        onChange={(v) =>
                          patchListItem("other_era", e._key, {
                            abbreviation: pickValue(v),
                          })
                        }
                      />
                    </div>

                    <PillsInput
                      label="Other Names"
                      value={e.other_name || []}
                      inputValue={e._other_name_input || ""}
                      onInputChange={(val) =>
                        patchListItem("other_era", e._key, {
                          _other_name_input: val,
                        })
                      }
                      onAdd={() => addOtherName("other_era", e._key)}
                      onRemove={(i) => removeOtherName("other_era", e._key, i)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        label="End"
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
                          patchListItem("other_era", e._key, {
                            description: val,
                          })
                        }
                        rows={8}
                      />
                    </div>
                  </div>
                </SortableEraCard>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
