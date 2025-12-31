"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  Copy,
  Check,
  RefreshCw,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Pencil,
} from "lucide-react";
import { useRouter } from "next/navigation";
import RichTextAdvanced from "@/components/RichTextAdvanced";

function genShareId(len = 12) {
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
function stripHtml(html) {
  try {
    return String(html || "")
      .replace(/<[^>]*>/g, "")
      .trim();
  } catch {
    return "";
  }
}
function computeCharacterCount(pages) {
  if (!Array.isArray(pages)) return 0;
  let total = 0;
  for (const p of pages) total += String(p?.content ?? "").length;
  return total;
}
function normalizeLevel(v) {
  const n = Number(v);
  if (n === 2) return 2;
  if (n === 3) return 3;
  return 1;
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

/* ---------- Toggle ---------- */
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

/* ---------- Modal: Add/Edit page ---------- */
function PageModal({ open, initial, onClose, onSave, title = "Edit Page" }) {
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
              disabled={!canSave}
              onClick={() =>
                onSave({
                  name: draft.name,
                  content: draft.content,
                  show_title: !!draft.show_title,
                  level: normalizeLevel(draft.level),
                })
              }
              className={`px-3 py-2 rounded-xl text-xs font-medium ${
                !canSave
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600/90 hover:bg-indigo-600 text-white"
              }`}
            >
              Save
            </button>
          </div>
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
              />

              {/* <div>
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
                        className={[
                          "px-3 py-2 text-xs transition",
                          active
                            ? "bg-indigo-600/80 text-white"
                            : "bg-transparent text-slate-200 hover:bg-slate-900",
                        ].join(" ")}
                      >
                        Level {lv}
                      </button>
                    );
                  })}
                </div>
              </div> */}
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-slate-500">
              Content (Rich Text / HTML)
            </label>

            <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <RichTextAdvanced
                value={draft.content}
                onChange={(html) => setDraft((d) => ({ ...d, content: html }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main ---------- */
export default function JournalFormFVTT({
  mode = "create",
  initial,
  onSubmit,
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Edit Page");
  const [modalTargetId, setModalTargetId] = useState(null);

  const didInitClient = useRef(false);

  const [form, setForm] = useState(() => {
    const hasInitialPages =
      Array.isArray(initial?.pages) && initial.pages.length > 0;

    const initPages = hasInitialPages
      ? initial.pages.map((p, idx) => ({
          id: p?.id || `page_${idx}`,
          name: p?.name || `Page Name ${idx + 1}`,
          content: p?.content ?? "",
          show_title: typeof p?.show_title === "boolean" ? p.show_title : true,
          level: normalizeLevel(p?.level),
        }))
      : [];

    return {
      name: initial?.name || "",
      description: initial?.description || "",
      private: typeof initial?.private === "boolean" ? initial.private : true,

      share_id: mode === "create" ? "" : initial?.share_id || "",
      pages: initPages,
    };
  });

  useEffect(() => {
    if (didInitClient.current) return;
    didInitClient.current = true;

    setForm((f) => {
      const shareId =
        mode === "create" && !String(f.share_id || "").trim()
          ? genShareId(12)
          : f.share_id;

      let pages = Array.isArray(f.pages) ? [...f.pages] : [];

      if (pages.length === 0) {
        pages = [
          {
            id: uid(),
            name: "Page Name 1",
            content: "",
            show_title: true,
            level: 1,
          },
        ];
      } else {
        pages = pages.map((p, idx) => {
          const pid = String(p?.id || "");
          const isPlaceholder = pid.startsWith("page_");
          return {
            ...p,
            id: isPlaceholder ? uid() : pid,
            name: p?.name || `Page Name ${idx + 1}`,
            content: p?.content ?? "",
            show_title:
              typeof p?.show_title === "boolean" ? p.show_title : true,
            level: normalizeLevel(p?.level),
          };
        });
      }

      return { ...f, share_id: shareId, pages };
    });
  }, [mode]);

  useEffect(() => {
    if (!activeId && form.pages?.length) setActiveId(form.pages[0].id);
  }, [form.pages, activeId]);

  function patch(p) {
    setForm((f) => ({ ...f, ...p }));
  }

  const pages = form.pages || [];
  const activeIndex = useMemo(
    () => pages.findIndex((p) => p.id === activeId),
    [pages, activeId]
  );
  const activePage = useMemo(
    () => (activeIndex >= 0 ? pages[activeIndex] : null),
    [pages, activeIndex]
  );

  const filteredPages = useMemo(() => {
    const qq = (q || "").trim().toLowerCase();
    if (!qq) return pages;
    return pages.filter((p) => (p?.name || "").toLowerCase().includes(qq));
  }, [pages, q]);

  const characterCount = useMemo(() => computeCharacterCount(pages), [pages]);

  const canSaveJournal = useMemo(() => {
    if (!form.name?.trim()) return false;
    if (mode === "create" && !form.share_id?.trim()) return false;
    if (!Array.isArray(pages) || pages.length === 0) return false;
    return true;
  }, [form, mode, pages]);

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(form.share_id || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 900);
    } catch {}
  }

  function openEditModal(pageId, title = "Edit Page") {
    const p = pages.find((x) => x.id === pageId);
    if (!p) return;
    setModalTargetId(pageId);
    setModalTitle(title);
    setModalOpen(true);
  }

  function addPage() {
    const next = [
      ...pages,
      {
        id: uid(),
        name: `Page Name ${pages.length + 1}`,
        content: "",
        show_title: true,
        level: 1,
      },
    ];
    patch({ pages: next });

    const newId = next[next.length - 1].id;
    setActiveId(newId);
    openEditModal(newId, "Add Page");
  }

  function removePage(pageId) {
    if (pages.length <= 1) return;
    const ok = confirm("Delete this page? This action cannot be undone.");
    if (!ok) return;

    const idx = pages.findIndex((p) => p.id === pageId);
    const next = pages.filter((p) => p.id !== pageId);
    patch({ pages: next });

    const nextIdx = Math.min(idx, next.length - 1);
    setActiveId(next[nextIdx]?.id || next[0]?.id || null);
  }

  function onModalSave({ name, content, show_title, level }) {
    const id = modalTargetId;
    if (!id) return;

    const next = pages.map((p) =>
      p.id === id
        ? {
            ...p,
            name: (name || "").trim() || p.name,
            content: content ?? "",
            show_title: !!show_title,
            level: normalizeLevel(level),
          }
        : p
    );

    patch({ pages: next });
    setModalOpen(false);
  }

  function navPrev() {
    if (pages.length <= 1) return;
    const idx = Math.max(0, activeIndex);
    const prevIdx = Math.max(0, idx - 1);
    setActiveId(pages[prevIdx]?.id);
  }

  function navNext() {
    if (pages.length <= 1) return;
    const idx = Math.max(0, activeIndex);
    const nextIdx = Math.min(pages.length - 1, idx + 1);
    setActiveId(pages[nextIdx]?.id);
  }

  async function submitJournal() {
    if (!canSaveJournal || saving) return;

    setSaving(true);
    try {
      const normalizedPages = pages.map((p, idx) => ({
        id: p.id,
        name: (p?.name || "").trim() || `Page Name ${idx + 1}`,
        content: p?.content ?? "",
        show_title: typeof p?.show_title === "boolean" ? p.show_title : true,
        level: normalizeLevel(p?.level),
      }));

      const payload = {
        name: form.name.trim(),
        description: form.description || null,
        private: !!form.private,
        share_id: form.share_id.trim(),
        pages: normalizedPages,
        fvtt_format: buildFvttFormat({
          name: form.name,
          pages: normalizedPages,
        }),
        character_count: computeCharacterCount(normalizedPages),
      };

      await onSubmit(payload);

      router.push("/creator/journals");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="h-full w-full p-4 md:p-6 overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto space-y-4">
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
            onClick={submitJournal}
            disabled={!canSaveJournal || saving}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium ${
              !canSaveJournal || saving
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

        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 items-center">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-slate-500">
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Journal Entry (1)"
                />
              </div>

              <div className="md:pt-5 flex items-center justify-center md:justify-end gap-3 flex-wrap">
                <Toggle
                  label="Private"
                  checked={!!form.private}
                  onChange={(v) => patch({ private: v })}
                />

                <button
                  type="button"
                  onClick={() => patch({ share_id: genShareId(12) })}
                  className="p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 disabled:opacity-40"
                  title="Regenerate share id"
                  disabled={mode !== "create"}
                >
                  <RefreshCw className="w-4 h-4 text-slate-200" />
                </button>

                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60">
                  <span className="text-[11px] font-mono text-slate-200">
                    {form.share_id || "—"}
                  </span>
                  <button
                    type="button"
                    onClick={copyShare}
                    className="p-1 rounded-lg hover:bg-slate-800"
                    title="Copy"
                    disabled={!form.share_id}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-200" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-widest text-slate-500">
                Description
              </label>
              <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                <RichTextAdvanced
                  value={form.description}
                  rows={10}
                  onChange={(html) => patch({ description: html })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] min-h-[680px]">
            {/* LEFT SIDEBAR */}
            <aside className="border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50 flex flex-col">
              <div className="p-2 flex-1 overflow-auto">
                {filteredPages.length === 0 ? (
                  <div className="p-3 text-xs text-slate-500">
                    No pages found.
                  </div>
                ) : (
                  filteredPages.map((p) => {
                    const isActive = p.id === activeId;
                    const realIdx = pages.findIndex((x) => x.id === p.id);
                    const level = normalizeLevel(p.level);
                    const indent =
                      level === 1 ? "pl-2" : level === 2 ? "pl-6" : "pl-10";
                    const numStyle = level === 1 ? "" : "text-slate-600";

                    return (
                      <div
                        key={p.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setActiveId(p.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            setActiveId(p.id);
                        }}
                        className={[
                          "w-full text-left rounded-xl border mb-2 px-3 py-2 transition cursor-pointer",
                          isActive
                            ? "border-slate-600 bg-slate-200/10"
                            : "border-slate-800 bg-transparent hover:bg-slate-200/5",
                        ].join(" ")}
                        title="Select page"
                      >
                        <div
                          className={`flex items-center justify-between gap-2 ${indent}`}
                        >
                          <p className="text-xs text-slate-200 truncate">
                            <span className={`mr-2 ${numStyle}`}>
                              {realIdx + 1}.
                            </span>
                            {p.name || `Page Name ${realIdx + 1}`}
                          </p>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removePage(p.id);
                            }}
                            disabled={pages.length <= 1}
                            className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 disabled:opacity-40"
                            title="Delete page"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-200" />
                          </button>
                        </div>

                        <div
                          className={`mt-1.5 text-[11px] text-slate-500 truncate ${indent}`}
                        >
                          {stripHtml(p.content).slice(0, 70) || "—"}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={navPrev}
                  className="p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 disabled:opacity-40"
                  disabled={activeIndex <= 0}
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-200" />
                </button>

                <button
                  type="button"
                  onClick={addPage}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-200/10 hover:bg-slate-200/15 text-xs text-slate-100"
                >
                  <Plus className="w-4 h-4" />
                  Add Page
                </button>

                <button
                  type="button"
                  onClick={navNext}
                  className="p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 disabled:opacity-40"
                  disabled={activeIndex >= pages.length - 1}
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4 text-slate-200" />
                </button>
              </div>
            </aside>

            {/* RIGHT VIEWER */}
            <section className="bg-slate-950/20">
              <div className="h-full flex flex-col">
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/40">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-[110px]" />
                    <div className="flex-1 rounded-xl border border-slate-800 bg-slate-200/5 px-4 py-2">
                      <p className="text-center text-2xl md:text-3xl font-extrabold tracking-wide text-slate-100 truncate">
                        {(
                          form.name?.trim() || "UNTITLED JOURNAL"
                        ).toUpperCase()}
                      </p>
                    </div>

                    <div className="w-[110px] flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          activePage &&
                          openEditModal(activePage.id, "Edit Page")
                        }
                        disabled={!activePage}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs ${
                          !activePage
                            ? "border-slate-800 bg-slate-950/40 text-slate-500 cursor-not-allowed"
                            : "border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-slate-100"
                        }`}
                        title="Edit this page"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-auto px-6 py-5">
                  {!activePage ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-slate-400 text-sm">
                      Select a page from the left.
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                      {activePage.show_title !== false && (
                        <p className="text-xl md:text-2xl font-bold text-slate-100 tracking-wide">
                          {activePage.name || "Page"}
                        </p>
                      )}

                      <div
                        className={
                          activePage.show_title !== false ? "mt-4" : ""
                        }
                      >
                        <div
                          className="
    prose prose-invert max-w-none
    prose-h1:text-4xl md:prose-h1:text-5xl
    prose-h1:font-extrabold
    prose-h1:tracking-tight
    prose-h1:normal-case
    prose-h2:text-3xl
    prose-p:text-slate-200
  "
                          dangerouslySetInnerHTML={{
                            __html: activePage.content || "",
                          }}
                        />

                        {!stripHtml(activePage.content) && (
                          <p className="text-sm text-slate-500 italic mt-4">
                            This page is empty.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>

        <PageModal
          open={modalOpen}
          title={modalTitle}
          initial={pages.find((p) => p.id === modalTargetId)}
          onClose={() => setModalOpen(false)}
          onSave={onModalSave}
        />
      </div>
    </div>
  );
}
