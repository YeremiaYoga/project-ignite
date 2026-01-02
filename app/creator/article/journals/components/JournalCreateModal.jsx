"use client";

import { useEffect, useMemo, useState } from "react";
import { X, RefreshCw, Copy, Save, Lock, Globe } from "lucide-react";
import RichTextAdvanced from "@/components/RichTextAdvanced";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

/* ---------- helpers ---------- */
function genShareId(len = 30) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function normalizeLevel(v) {
  const n = Number(v);
  if (n === 2) return 2;
  if (n === 3) return 3;
  return 1;
}
function computeCharacterCount(pages) {
  if (!Array.isArray(pages)) return 0;
  let total = 0;
  for (const p of pages) total += String(p?.content ?? "").length;
  return total;
}
function buildFvttFormat({ name, pages }) {
  const safeName = (name || "").trim() || "Untitled Journal";
  const fvttPages = (pages || []).map((p, idx) => {
    const pageName = (p?.name || "").trim() || `Page Name ${idx + 1}`;
    const content = p?.content ?? "";
    const show_title = typeof p?.show_title === "boolean" ? p.show_title : true;
    const level = normalizeLevel(p?.level);

    return {
      name: pageName,
      type: "text",
      text: { format: 1, content },
      _id: String(idx + 1).padStart(16, "0"),
      title: { show: show_title, level },
    };
  });

  return { name: safeName, pages: fvttPages };
}

/**
 * Reusable modal for:
 * - create: POST /ignite/journals
 * - edit:   PUT  /ignite/journals/:id  (basic info only)
 *
 * Props:
 * open: boolean
 * mode: "create" | "edit"
 * initial: { id, name, description, private, share_id, pages? } (for edit)
 * onClose: fn
 * onCreated: fn(data)
 * onUpdated: fn(data)
 */
export default function JournalCreateModal({
  open,
  mode = "create",
  initial,
  onClose,
  onCreated,
  onUpdated,
}) {
  const [saving, setSaving] = useState(false);

  const [draft, setDraft] = useState({
    name: "",
    description: "",
    private: true,
    share_id: "",
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initial) {
      setDraft({
        name: initial?.name || "",
        description: initial?.description || "",
        private: typeof initial?.private === "boolean" ? initial.private : true,
        share_id: initial?.share_id || "",
      });
      return;
    }

    // create defaults
    setDraft({
      name: "",
      description: "",
      private: true,
      share_id: genShareId(30),
    });
  }, [open, mode, initial]);

  const canSave = useMemo(() => {
    if (!draft.name?.trim()) return false;
    if (!draft.share_id?.trim()) return false;
    if (mode === "edit" && !initial?.id) return false;
    return true;
  }, [draft, mode, initial]);

  async function submit() {
    if (!canSave || saving) return;
    setSaving(true);

    try {
      if (mode === "create") {
        // ✅ default minimal pages biar editor gak kosong
        const pages = [
          {
            id: uid(),
            name: "Page Name 1",
            content: "",
            show_title: true,
            level: 1,
          },
        ];

        const payload = {
          name: draft.name.trim(),
          description: draft.description || null,
          private: !!draft.private,
          share_id: draft.share_id.trim(),
          pages,
          fvtt_format: buildFvttFormat({ name: draft.name, pages }),
          character_count: computeCharacterCount(pages),
        };

        const res = await fetch(`${API_BASE}/ignite/journals`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json?.success) {
          console.error("create journal failed:", json);
          alert(json?.message || "Failed to create journal");
          return;
        }

        onCreated?.(json?.data || null);
        onClose?.();
        return;
      }

      // mode === "edit"
      const payload = {
        name: draft.name.trim(),
        description: draft.description || null,
        private: !!draft.private,
        // share_id biasanya sebaiknya tidak diubah, tapi kalau kamu mau bisa:
        share_id: draft.share_id.trim(),
      };

      const res = await fetch(`${API_BASE}/ignite/journals/${initial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        console.error("update journal basic info failed:", json);
        alert(json?.message || "Failed to update journal");
        return;
      }

      // backend idealnya return row terbaru di json.data
      onUpdated?.(json?.data || payload);
      onClose?.();
    } catch (e) {
      console.error(e);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  const title = mode === "edit" ? "Edit Journal Info" : "Create Journal";
  const primaryLabel = mode === "edit" ? "Save" : "Create";

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950/70 via-slate-950/50 to-indigo-950/20 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs text-slate-400">Creator Panel</p>
            <p className="text-sm font-semibold">{title}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-slate-500">
                Name
              </label>
              <input
                value={draft.name}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, name: e.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Journal Name"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setDraft((d) => ({ ...d, share_id: genShareId(30) }))
                }
                className="p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 disabled:opacity-40"
                title="Regenerate share id"
                disabled={saving}
              >
                <RefreshCw className="w-4 h-4 text-slate-200" />
              </button>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60">
                <span className="text-[11px] font-mono text-slate-200">
                  {draft.share_id || "—"}
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(draft.share_id || "");
                    } catch {}
                  }}
                  className="p-1 rounded-lg hover:bg-slate-800"
                  title="Copy"
                  disabled={!draft.share_id}
                >
                  <Copy className="w-4 h-4 text-slate-200" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-slate-500">
              Description (Opsional)
            </label>
            <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <RichTextAdvanced
                value={draft.description}
                rows={10}
                onChange={(html) =>
                  setDraft((d) => ({ ...d, description: html }))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setDraft((d) => ({ ...d, private: !d.private }))}
              className={[
                "inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs",
                draft.private
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/15"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15",
              ].join(" ")}
            >
              {draft.private ? (
                <Lock className="w-4 h-4" />
              ) : (
                <Globe className="w-4 h-4" />
              )}
              {draft.private ? "Private" : "Public"}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={submit}
                disabled={!canSave || saving}
                className={[
                  "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium",
                  !canSave || saving
                    ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                    : "bg-indigo-600/90 hover:bg-indigo-600 text-white",
                ].join(" ")}
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : primaryLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
