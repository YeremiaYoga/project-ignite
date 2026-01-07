"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Save } from "lucide-react";

export default function EventCreateModal({
  open,
  onClose,
  onSubmit,
  calendar,
  selected, // { year, monthOrdinal, day }
  journals, // owned by user
}) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!open) return;

    setForm({
      title: "",
      content: "",
      icon: "",
      type: "event",
      private: true,
      repeat_unit: "none",
      repeat_interval: 1,
      repeat_count: 0,
      is_preset: false,
      journal_id: "",
      year: Number(selected?.year ?? 0),
      month: Number(selected?.monthOrdinal ?? 1),
      day: Number(selected?.day ?? 1),
    });
  }, [open, selected]);

  const canSave = useMemo(() => {
    return (
      !!calendar?.id &&
      !!form &&
      String(form.title || "").trim().length > 0 &&
      Number.isFinite(Number(form.year)) &&
      Number.isFinite(Number(form.month)) &&
      Number.isFinite(Number(form.day))
    );
  }, [form, calendar?.id]);

  if (!open || !form) return null;

  const patch = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = () => {
    if (!canSave) return;
    onSubmit?.({
      ...form,
      title: String(form.title).trim(),
      content: String(form.content || "").trim() || null,
      icon: String(form.icon || "").trim() || null,
      journal_id: form.journal_id ? String(form.journal_id) : null,
      repeat_interval: Number(form.repeat_interval ?? 1),
      repeat_count: Number(form.repeat_count ?? 0),
      private: !!form.private,
      is_preset: !!form.is_preset,
      year: Number(form.year),
      month: Number(form.month),
      day: Number(form.day),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              Add Event
            </p>
            <p className="text-sm font-semibold truncate">
              {calendar?.name || "Calendar"} • Y{form.year} M{form.month} D{form.day}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-slate-200" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm">
          <div>
            <label className="text-xs text-slate-400">Title</label>
            <input
              value={form.title}
              onChange={(e) => patch("title", e.target.value)}
              className="w-full mt-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
              placeholder="Event title"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => patch("content", e.target.value)}
              rows={3}
              className="w-full mt-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
              placeholder="Description (optional)"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">Icon URL</label>
            <input
              value={form.icon}
              onChange={(e) => patch("icon", e.target.value)}
              className="w-full mt-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
              placeholder="/assets/icons/..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400">Type</label>
              <select
                value={form.type}
                onChange={(e) => patch("type", e.target.value)}
                className="w-full mt-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
              >
                <option value="event">Event</option>
                <option value="holiday">Holiday</option>
                <option value="battle">Battle</option>
                <option value="ritual">Ritual</option>
                <option value="note">Note</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400">Visibility</label>
              <select
                value={form.private ? "private" : "public"}
                onChange={(e) => patch("private", e.target.value === "private")}
                className="w-full mt-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400">Journal (optional)</label>
            <select
              value={form.journal_id}
              onChange={(e) => patch("journal_id", e.target.value)}
              className="w-full mt-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
            >
              <option value="">None</option>
              {journals.map((j) => (
                <option key={j.id} value={String(j.id)}>
                  {j?.title || j?.name || "Untitled Journal"}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="text-xs text-slate-300 font-semibold mb-3">
              Repeat
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-400">Unit</label>
                <select
                  value={form.repeat_unit}
                  onChange={(e) => patch("repeat_unit", e.target.value)}
                  className="w-full mt-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
                >
                  <option value="none">None</option>
                  <option value="day">Day</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400">Interval</label>
                <input
                  type="number"
                  value={String(form.repeat_interval)}
                  onChange={(e) => patch("repeat_interval", Number(e.target.value || 1))}
                  className="w-full mt-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Count</label>
                <input
                  type="number"
                  value={String(form.repeat_count)}
                  onChange={(e) => patch("repeat_count", Number(e.target.value || 0))}
                  className="w-full mt-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-2xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={submit}
            disabled={!canSave}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-xs text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
