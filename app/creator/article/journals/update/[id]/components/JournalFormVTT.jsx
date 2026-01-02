"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Pencil,
  ChevronUp,
  ChevronDown,
  GripVertical,
  LayoutList,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";

import JournalCreateModal from "../../../components/JournalCreateModal";
import JournalPagesModal from "./JournalPagesModal";

/* ---------- helpers ---------- */
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
function normalizeLevel(v) {
  const n = Number(v);
  if (n === 2) return 2;
  if (n === 3) return 3;
  return 1;
}

/** ✅ character count: hitung RAW (HTML ikut dihitung) + description ikut dihitung */
function computeCharacterCountRaw({ description, pages }) {
  let total = 0;
  total += String(description ?? "").length;

  if (Array.isArray(pages)) {
    for (const p of pages) total += String(p?.content ?? "").length;
  }

  return total;
}

/** ✅ reorder helper */
function arrayMove(list, fromIndex, toIndex) {
  const arr = Array.isArray(list) ? [...list] : [];
  if (fromIndex < 0 || fromIndex >= arr.length) return arr;
  if (toIndex < 0 || toIndex >= arr.length) return arr;
  if (fromIndex === toIndex) return arr;

  const [item] = arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, item);
  return arr;
}

export default function JournalFormVTT({
  mode = "update",
  initial,
  onSubmit,
  onReload,
}) {
  const router = useRouter();

  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState(null);

  // page modal
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [pageModalTitle, setPageModalTitle] = useState("Edit Page");
  const [pageModalTargetId, setPageModalTargetId] = useState(null);

  // basic info modal
  const [basicOpen, setBasicOpen] = useState(false);

  // saving indicator
  const [savingNow, setSavingNow] = useState(false);

  const didInitClient = useRef(false);

  // ✅ drag state (native HTML DnD)
  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);

  // ✅ NEW: pending page (kalau Add Page lalu cancel -> rollback)
  const pendingNewPageIdRef = useRef(null);
  const pendingPrevActiveIdRef = useRef(null);

  // =========================
  // ✅ MOBILE: pane like spell view
  // =========================
  const [isMobile, setIsMobile] = useState(false);
  const [pane, setPane] = useState("list"); // "list" | "detail"
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onTouchStart = (e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e) => {
    if (!isMobile || touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (!isMobile) return;
    const dx = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;

    const THRESH = 60;
    if (pane === "list" && dx < -THRESH) setPane("detail");
    if (pane === "detail" && dx > THRESH) setPane("list");
  };

  // ✅ basic info state: ambil dari backend (initial)
  const [basic, setBasic] = useState(() => ({
    id: initial?.id,
    name: initial?.name || "",
    description: initial?.description || "",
    private: typeof initial?.private === "boolean" ? initial.private : true,
    share_id: initial?.share_id || "",
  }));

  // ✅ pages state: juga dari backend (initial)
  const [pages, setPages] = useState(() => {
    const hasInitialPages =
      Array.isArray(initial?.pages) && initial.pages.length > 0;

    return hasInitialPages
      ? initial.pages.map((p, idx) => ({
          id: p?.id || `page_${idx}`,
          name: p?.name || `Page Name ${idx + 1}`,
          content: p?.content ?? "",
          show_title: typeof p?.show_title === "boolean" ? p.show_title : true,
          level: normalizeLevel(p?.level),
        }))
      : [];
  });

  const journalName = useMemo(() => (basic?.name || "").trim(), [basic?.name]);

  /** ✅ character count (RAW, include description) */
  const characterCount = useMemo(() => {
    return computeCharacterCountRaw({
      description: basic?.description,
      pages,
    });
  }, [basic?.description, pages]);

  // ✅ ketika initial berubah (hasil reload), sync basic + pages
  useEffect(() => {
    if (!initial) return;

    setBasic({
      id: initial?.id,
      name: initial?.name || "",
      description: initial?.description || "",
      private: typeof initial?.private === "boolean" ? initial.private : true,
      share_id: initial?.share_id || "",
    });

    const hasInitialPages =
      Array.isArray(initial?.pages) && initial.pages.length > 0;

    setPages(
      hasInitialPages
        ? initial.pages.map((p, idx) => ({
            id: p?.id || uid(),
            name: p?.name || `Page Name ${idx + 1}`,
            content: p?.content ?? "",
            show_title:
              typeof p?.show_title === "boolean" ? p.show_title : true,
            level: normalizeLevel(p?.level),
          }))
        : [
            {
              id: uid(),
              name: "Page Name 1",
              content: "",
              show_title: true,
              level: 1,
            },
          ]
    );
  }, [initial]);

  // init minimal sekali (kalau pages kosong pertama kali render)
  useEffect(() => {
    if (didInitClient.current) return;
    didInitClient.current = true;

    setPages((prev) => {
      let next = Array.isArray(prev) ? [...prev] : [];
      if (next.length === 0) {
        next = [
          {
            id: uid(),
            name: "Page Name 1",
            content: "",
            show_title: true,
            level: 1,
          },
        ];
      } else {
        next = next.map((p, idx) => {
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
      return next;
    });
  }, []);

  useEffect(() => {
    if (!activeId && pages?.length) setActiveId(pages[0].id);
  }, [pages, activeId]);

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

  async function reloadFromBackend() {
    if (!onReload) return;
    const fresh = await onReload(); // harus return normalized journal
    if (fresh) {
      setBasic({
        id: fresh?.id,
        name: fresh?.name || "",
        description: fresh?.description || "",
        private: typeof fresh?.private === "boolean" ? fresh.private : true,
        share_id: fresh?.share_id || "",
      });

      setPages(
        Array.isArray(fresh?.pages) && fresh.pages.length ? fresh.pages : []
      );
      if (fresh?.pages?.length)
        setActiveId((prev) => prev || fresh.pages[0].id);
    }
  }

  async function persist(nextPages) {
    const name = (basic?.name || "").trim();
    if (!name) {
      alert("Journal name masih kosong. Isi dulu di Basic Info.");
      return false;
    }
    if (!Array.isArray(nextPages) || nextPages.length === 0) return false;
    if (savingNow) return false;

    setSavingNow(true);
    try {
      const normalizedPages = nextPages.map((p, idx) => ({
        id: p.id,
        name: (p?.name || "").trim() || `Page Name ${idx + 1}`,
        content: p?.content ?? "",
        show_title: typeof p?.show_title === "boolean" ? p.show_title : true,
        level: normalizeLevel(p?.level),
      }));

      await onSubmit?.({
        name,
        description: basic?.description ?? null,
        private: !!basic?.private,
        share_id: basic?.share_id || "",
        pages: normalizedPages,
      });

      await reloadFromBackend();
      return true;
    } finally {
      setSavingNow(false);
    }
  }

  function openEditPageModal(pageId, title = "Edit Page") {
    const p = pages.find((x) => x.id === pageId);
    if (!p) return;

    // ✅ kalau edit page existing, bukan pending new
    pendingNewPageIdRef.current = null;
    pendingPrevActiveIdRef.current = null;

    setPageModalTargetId(pageId);
    setPageModalTitle(title);
    setPageModalOpen(true);
  }

  function addPage() {
    // ✅ simpan active sebelumnya supaya kalau cancel bisa balik
    pendingPrevActiveIdRef.current = activeId || pages?.[0]?.id || null;

    const newId = uid();
    const newPage = {
      id: newId,
      name: `Page Name ${pages.length + 1}`,
      content: "",
      show_title: true,
      level: 1,
    };

    // ✅ tandai ini pending new page
    pendingNewPageIdRef.current = newId;

    const next = [...pages, newPage];
    setPages(next);
    setActiveId(newId);

    // ✅ UX mobile: langsung ke detail setelah add
    if (isMobile) setPane("detail");

    setPageModalTargetId(newId);
    setPageModalTitle("Add Page");
    setPageModalOpen(true);
  }

  async function removePage(pageId) {
    if (pages.length <= 1) return;
    const ok = confirm("Delete this page? This action cannot be undone.");
    if (!ok) return;

    const idx = pages.findIndex((p) => p.id === pageId);
    const next = pages.filter((p) => p.id !== pageId);
    setPages(next);

    const nextIdx = Math.min(idx, next.length - 1);
    setActiveId(next[nextIdx]?.id || next[0]?.id || null);

    await persist(next);
  }

  // ✅ CLOSE modal handler:
  // kalau modal ditutup dan page-nya pending new => rollback (hapus page itu)
  function handleClosePageModal() {
    const pendingId = pendingNewPageIdRef.current;

    if (pendingId && pageModalTargetId === pendingId) {
      // gunakan variable lokal supaya gak “race” sama setState
      let computedNextActive = null;

      setPages((prev) => {
        const idx = prev.findIndex((p) => p.id === pendingId);
        if (idx < 0) return prev;

        const next = prev.filter((p) => p.id !== pendingId);

        const fallback =
          (pendingPrevActiveIdRef.current &&
            next.some((p) => p.id === pendingPrevActiveIdRef.current) &&
            pendingPrevActiveIdRef.current) ||
          next[idx - 1]?.id ||
          next[idx]?.id ||
          next[0]?.id ||
          null;

        computedNextActive = fallback;
        return next;
      });

      // ✅ pastikan activeId balik
      setActiveId(computedNextActive);

      // ✅ UX mobile: kalau dibatalin dari Add Page, balik ke list pane
      if (isMobile) setPane("list");
    }

    // reset modal state
    setPageModalOpen(false);
    setPageModalTargetId(null);
    setPageModalTitle("Edit Page");

    // clear pending markers
    pendingNewPageIdRef.current = null;
    pendingPrevActiveIdRef.current = null;
  }

  // ✅ SAVE modal: update local + persist + reload backend
  async function onPageModalSave({ name, content, show_title, level }) {
    const id = pageModalTargetId;
    if (!id) return;

    const nextPages = pages.map((p) =>
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

    setPages(nextPages);
    const ok = await persist(nextPages);

    if (ok) {
      // ✅ kalau berhasil save, pending new dianggap valid
      if (pendingNewPageIdRef.current === id) {
        pendingNewPageIdRef.current = null;
        pendingPrevActiveIdRef.current = null;
      }
      setPageModalOpen(false);
      setPageModalTargetId(null);
    }
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

  /** ✅ arrow reorder (up/down) */
  async function movePageByArrow(pageId, dir /* -1 or +1 */) {
    if (savingNow) return;

    const from = pages.findIndex((p) => p.id === pageId);
    if (from < 0) return;

    const to = from + dir;
    if (to < 0 || to >= pages.length) return;

    const next = arrayMove(pages, from, to);
    setPages(next);
    setActiveId(pageId);

    await persist(next);
  }

  /** ✅ drag reorder */
  async function applyReorderByDrag(dragPageId, overPageId) {
    if (!dragPageId || !overPageId) return;
    if (dragPageId === overPageId) return;
    if (savingNow) return;

    const from = pages.findIndex((p) => p.id === dragPageId);
    const to = pages.findIndex((p) => p.id === overPageId);
    if (from < 0 || to < 0) return;

    const next = arrayMove(pages, from, to);
    setPages(next);
    setActiveId(dragPageId);

    await persist(next);
  }

  // =========================
  // ✅ UI blocks (reuse)
  // =========================
  const PagesListBlock = (
    <aside className="h-full flex flex-col min-h-0">
      <div className="p-3 border-b border-slate-800 bg-slate-950/60 shrink-0">
        <div className="flex justify-between gap-3 items-center">
          {/* LEFT: Back + Characters */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => router.back()}
              className="
        hidden md:inline-flex
        items-center gap-2 px-3 py-2 rounded-xl
        border border-slate-800 bg-slate-950/60
        hover:bg-slate-900
        text-xs text-slate-200
      "
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="min-w-0">
              <p className="text-sm text-slate-500">
                Characters:{" "}
                <span className="text-slate-300">{characterCount}</span>
              </p>

              {/*
      <div className="mt-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pages..."
          className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-xl px-3 py-2 text-xs outline-none
            focus:ring-2 focus:ring-indigo-500/70 transition"
        />
      </div>
      */}
            </div>
          </div>

          {/* RIGHT: Pencil */}
          <button
            type="button"
            onClick={() => setBasicOpen(true)}
            className="shrink-0 p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900"
            title="Edit basic info"
          >
            <Pencil className="w-4 h-4 text-slate-200" />
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="p-2 flex-1 overflow-auto min-h-0">
        {filteredPages.length === 0 ? (
          <div className="p-3 text-xs text-slate-500">No pages found.</div>
        ) : (
          filteredPages.map((p) => {
            const isActive = p.id === activeId;
            const realIdx = pages.findIndex((x) => x.id === p.id);

            const level = normalizeLevel(p.level);
            const indent =
              level === 1 ? "pl-2" : level === 2 ? "pl-6" : "pl-10";
            const numStyle = level === 1 ? "" : "text-slate-600";

            const isFirst = realIdx <= 0;
            const isLast = realIdx >= pages.length - 1;

            return (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveId(p.id);
                  // ✅ UX mobile: kalau pilih page dari list, pindah ke detail
                  if (isMobile) setPane("detail");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveId(p.id);
                    if (isMobile) setPane("detail");
                  }
                }}
                draggable
                onDragStart={() => {
                  setDragId(p.id);
                  setOverId(null);
                }}
                onDragEnd={() => {
                  setDragId(null);
                  setOverId(null);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (overId !== p.id) setOverId(p.id);
                }}
                onDrop={async (e) => {
                  e.preventDefault();
                  const fromId = dragId;
                  const toId = p.id;
                  setDragId(null);
                  setOverId(null);
                  await applyReorderByDrag(fromId, toId);
                }}
                className={[
                  "w-full text-left rounded-xl border mb-2 px-3 py-2 transition cursor-pointer",
                  isActive
                    ? "border-slate-600 bg-slate-200/10"
                    : "border-slate-800 bg-transparent hover:bg-slate-200/5",
                  overId === p.id && dragId && dragId !== p.id
                    ? "ring-2 ring-indigo-500/30"
                    : "",
                ].join(" ")}
                title="Select page (drag to reorder)"
              >
                <div
                  className={`flex items-center justify-between gap-2 ${indent}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-slate-500 shrink-0">
                      <GripVertical className="w-4 h-4" />
                    </span>

                    <p className="text-xs text-slate-200 truncate">
                      <span className={`mr-2 ${numStyle}`}>{realIdx + 1}.</span>
                      {p.name || `Page Name ${realIdx + 1}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        movePageByArrow(p.id, -1);
                      }}
                      disabled={isFirst || savingNow}
                      className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 hover:bg-slate-900 disabled:opacity-40"
                      title="Move up"
                    >
                      <ChevronUp className="w-3.5 h-3.5 text-slate-200" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        movePageByArrow(p.id, +1);
                      }}
                      disabled={isLast || savingNow}
                      className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 hover:bg-slate-900 disabled:opacity-40"
                      title="Move down"
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-slate-200" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePage(p.id);
                      }}
                      disabled={pages.length <= 1 || savingNow}
                      className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 disabled:opacity-40"
                      title="Delete page"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-200" />
                    </button>
                  </div>
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

      {/* BOTTOM ACTIONS */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-2 shrink-0">
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
          disabled={savingNow}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-200/10 hover:bg-slate-200/15 text-xs text-slate-100 disabled:opacity-40"
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
  );

  const DetailBlock = (
    <section className="h-full flex flex-col min-h-0">
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/55 shrink-0">
        <div className="flex items-center justify-between gap-2">
          {/* <button
            type="button"
            onClick={() => (isMobile ? setPane("list") : router.back())}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-200"
            title={isMobile ? "Back to pages" : "Back"}
          >
            <ArrowLeft className="w-4 h-4" />
            {isMobile ? "Pages" : "Back"}
          </button> */}

          <div className="flex-1 min-w-0 px-3">
            <p className="text-center text-lg font-extrabold tracking-wide text-slate-100 truncate">
              {(journalName || "UNTITLED JOURNAL").toUpperCase()}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setBasicOpen(true)}
            className="shrink-0 p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900"
            title="Edit basic info"
          >
            <Pencil className="w-4 h-4 text-slate-200" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-auto p-4 min-h-0">
        {!activePage ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-slate-400 text-sm">
            Select a page from the list.
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            {activePage.show_title !== false && (
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg md:text-2xl font-bold text-slate-100 tracking-wide">
                  {activePage.name || "Page"}
                </p>

                <button
                  type="button"
                  onClick={() => openEditPageModal(activePage.id, "Edit Page")}
                  disabled={savingNow}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-100 disabled:opacity-40"
                  title="Edit this page"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className={activePage.show_title !== false ? "mt-4" : ""}>
              <div
                className="
                  max-w-none text-slate-200
                  [&_p]:text-slate-200
                  [&_br]:content-['']
                  [&_h1]:text-3xl md:[&_h1]:text-5xl
                  [&_h1]:font-extrabold
                  [&_h1]:tracking-tight
                  [&_h1]:leading-tight
                  [&_h1]:mt-6 [&_h1]:mb-3
                  [&_h2]:text-2xl md:[&_h2]:text-3xl
                  [&_h2]:font-bold
                  [&_h2]:mt-5 [&_h2]:mb-2
                  [&_h3]:text-xl md:[&_h3]:text-2xl
                  [&_h3]:font-bold
                  [&_ul]:list-disc [&_ul]:pl-6
                  [&_ol]:list-decimal [&_ol]:pl-6
                  [&_a]:text-indigo-300 [&_a:hover]:text-indigo-200
                  [&_blockquote]:border-l-2 [&_blockquote]:border-slate-700 [&_blockquote]:pl-4 [&_blockquote]:text-slate-300
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
    </section>
  );

  return (
    <div className="min-h-screen text-slate-50 flex justify-center w-full">
      <div className="w-full max-w-7xl h-[90vh] bg-slate-950/80 border border-slate-700 rounded-none shadow-xl backdrop-blur-md overflow-hidden">
        <div className="hidden md:grid grid-cols-[340px_1fr] h-full">
          <div className="border-r border-slate-800 bg-slate-950/50 min-h-0">
            {PagesListBlock}
          </div>
          <div className="bg-slate-950/20 min-h-0">{DetailBlock}</div>
        </div>

        <div
          className="md:hidden relative h-full flex flex-col min-h-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/60 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPane("list")}
                  className={[
                    "px-3 py-2 rounded-xl border text-xs flex items-center gap-2",
                    pane === "list"
                      ? "border-indigo-400/40 bg-indigo-500/10 text-indigo-100"
                      : "border-slate-800 bg-slate-950/40 text-slate-200",
                  ].join(" ")}
                  title="Pages"
                >
                  <LayoutList className="w-4 h-4" />
                  Pages
                </button>

                <button
                  type="button"
                  onClick={() => setPane("detail")}
                  className={[
                    "px-3 py-2 rounded-xl border text-xs flex items-center gap-2",
                    pane === "detail"
                      ? "border-indigo-400/40 bg-indigo-500/10 text-indigo-100"
                      : "border-slate-800 bg-slate-950/40 text-slate-200",
                  ].join(" ")}
                  title="Detail"
                >
                  <FileText className="w-4 h-4" />
                  Detail
                </button>
              </div>
            </div>
          </div>

          <div
            className="flex w-[200%] flex-1 min-h-0 transition-all duration-300 ease-in-out"
            style={{
              transform:
                pane === "list" ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            <section className="w-1/2 min-w-[50%] h-full min-h-0 bg-slate-950/40">
              {PagesListBlock}
            </section>

            <section className="w-1/2 min-w-[50%] h-full min-h-0 bg-slate-950/20">
              {DetailBlock}
            </section>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <JournalPagesModal
        open={pageModalOpen}
        title={pageModalTitle}
        initial={pages.find((p) => p.id === pageModalTargetId)}
        onClose={handleClosePageModal}
        onSave={onPageModalSave}
        saving={savingNow}
      />

      <JournalCreateModal
        open={basicOpen}
        mode="edit"
        initial={{
          id: basic?.id,
          name: basic?.name,
          description: basic?.description,
          private: basic?.private,
          share_id: basic?.share_id,
        }}
        onClose={() => setBasicOpen(false)}
        onUpdated={async (dataOrPayload) => {
          setBasic((b) => ({
            ...b,
            name: dataOrPayload?.name ?? b.name,
            description:
              dataOrPayload?.description !== undefined
                ? dataOrPayload.description
                : b.description,
            private:
              typeof dataOrPayload?.private === "boolean"
                ? dataOrPayload.private
                : b.private,
            share_id: dataOrPayload?.share_id ?? b.share_id,
          }));
        }}
      />
    </div>
  );
}
