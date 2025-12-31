"use client";

import { useMemo, useState } from "react";
import { Save, Copy, Check, RefreshCw, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import JournalEditor from "./JournalEditor";
import RichTextAdvanced from "@/components/RichTextAdvanced";
function genShareId(len = 12) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function buildFvttFormat({ name, pages }) {
  const safeName = (name || "").trim() || "Untitled Journal";
  const fvttPages = (pages || []).map((p, idx) => {
    const pageName = (p?.name || "").trim() || `Page ${idx + 1}`;
    const content = p?.content ?? "";
    return {
      name: pageName,
      type: "text",
      text: { format: 1, content },
      _id: String(idx + 1).padStart(16, "0"),
      title: { show: true, level: 1 },
    };
  });
  return { name: safeName, pages: fvttPages };
}

export default function JournalForm({ mode = "create", initial, onSubmit }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState(() => ({
    name: initial?.name || "",
    description: initial?.description || "",
    private: typeof initial?.private === "boolean" ? initial.private : true,
    pages:
      Array.isArray(initial?.pages) && initial.pages.length > 0
        ? initial.pages.map((p) => ({
            ...p,
            id: p.id || `${Date.now()}_${Math.random()}`,
          }))
        : [
            {
              id: `${Date.now()}_${Math.random()}`,
              name: "Page 1",
              content: "",
            },
          ],
    share_id: mode === "create" ? genShareId(12) : null,
  }));

  function patch(p) {
    setForm((f) => ({ ...f, ...p }));
  }

  const canSave = useMemo(() => {
    if (!form.name?.trim()) return false;
    if (mode === "create" && !form.share_id?.trim()) return false;
    if (!Array.isArray(form.pages) || form.pages.length === 0) return false;
    return true;
  }, [form, mode]);

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(form.share_id || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 900);
    } catch {}
  }

  async function submit() {
    if (!canSave || saving) return;

    setSaving(true);
    try {
      // ✅ pages kolom: cuma name+content
      const pages = (form.pages || []).map((p, idx) => ({
        name: (p?.name || "").trim() || `Page ${idx + 1}`,
        content: p?.content ?? "",
      }));

      const payload = {
        name: form.name.trim(),
        description: form.description || null,
        private: !!form.private,
        pages,
        fvtt_format: buildFvttFormat({ name: form.name, pages }),
      };

      if (mode === "create") payload.share_id = form.share_id.trim();

      await onSubmit(payload);
      router.push("/creator/journals");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="h-full w-full p-4 md:p-6">
      <div className="w-full max-w-5xl mx-auto space-y-4">
        {/* top bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="button"
            // onClick={submit}
            disabled={!canSave || saving}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium ${
              !canSave || saving
                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600/90 hover:bg-indigo-600 text-white"
            }`}
          >
            <Save className="w-4 h-4" />
            {saving
              ? "Saving..."
              : mode === "create"
              ? "Create Journal"
              : "Update Journal"}
          </button>
        </div>

        {/* basics */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-indigo-950/20">
            <p className="text-xs text-slate-400">Journal</p>
            <p className="text-sm font-semibold text-slate-100">Basic Info</p>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-slate-500">
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Journal name..."
                />
              </div>

              <div className="flex items-end justify-between gap-3">
                <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={!!form.private}
                    onChange={(e) => patch({ private: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Private
                </label>

                {mode === "create" && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => patch({ share_id: genShareId(12) })}
                      className="p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900"
                      title="Regenerate share id"
                    >
                      <RefreshCw className="w-4 h-4 text-slate-200" />
                    </button>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60">
                      <span className="text-[11px] font-mono text-slate-200">
                        {form.share_id}
                      </span>
                      <button
                        type="button"
                        onClick={copyShare}
                        className="p-1 rounded-lg hover:bg-slate-800"
                        title="Copy"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-200" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-[11px] uppercase tracking-widest text-slate-500">
                  Description
                </p>
              </div>

              <div className="p-3">
                <RichTextAdvanced
                  value={form.description || ""}
                  onChange={(html) => patch({ description: html })}
                  placeholder="Optional description..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* ✅ JournalEditor dipakai di sini */}
        <JournalEditor
          value={{ pages: form.pages }}
          onChange={(v) => patch({ pages: v.pages || [] })}
        />
      </div>
    </div>
  );
}
