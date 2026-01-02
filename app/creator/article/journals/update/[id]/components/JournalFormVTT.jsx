"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Loader2,
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
      // state akan ke-sync oleh useEffect([initial]) dari parent jika parent setInitial
      // tapi untuk aman, kita set langsung juga
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
      if (!activeId && fresh?.pages?.length) setActiveId(fresh.pages[0].id);
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
    setPageModalTargetId(pageId);
    setPageModalTitle(title);
    setPageModalOpen(true);
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
    setPages(next);

    const newId = next[next.length - 1].id;
    setActiveId(newId);

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

  // ✅ SAVE modal: update local (optional) + persist + reload backend
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
    if (ok) setPageModalOpen(false);
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
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] h-[80vh]">
            {/* LEFT */}
            <aside className="border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50 flex flex-col">
              <div className="p-3 border-b border-slate-800 bg-slate-950/60">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="mt-2 text-[11px] text-slate-500">
                      Characters:{" "}
                      <span className="text-slate-300">
                        {
                          stripHtml(pages?.map((p) => p.content).join(""))
                            .length
                        }
                      </span>
                    </p>
                  </div>

                  {/* <button
                    type="button"
                    onClick={() => setBasicOpen(true)}
                    className="shrink-0 p-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900"
                    title="Edit basic info"
                  >
                    <Pencil className="w-4 h-4 text-slate-200" />
                  </button> */}
                </div>

                {/* <div className="mt-3">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search page..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div> */}
              </div>

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
                            disabled={pages.length <= 1 || savingNow}
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

            {/* RIGHT VIEWER */}
            <section className="bg-slate-950/20">
              <div className="h-full flex flex-col">
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/40">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-[110px]" />
                    <div className="flex-1 rounded-xl border border-slate-800 bg-slate-200/5 px-4 py-2">
                      <p className="text-center text-2xl md:text-3xl font-extrabold tracking-wide text-slate-100 truncate">
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
                    <div className="w-[110px]" />
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
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xl md:text-2xl font-bold text-slate-100 tracking-wide">
                            {activePage.name || "Page"}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              openEditPageModal(activePage.id, "Edit Page")
                            }
                            disabled={savingNow}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-100 disabled:opacity-40"
                            title="Edit this page"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      <div
                        className={
                          activePage.show_title !== false ? "mt-4" : ""
                        }
                      >
                        <div
                          className="
    max-w-none text-slate-200
    [&_p]:text-slate-200
    [&_br]:content-['']
    [&_h1]:text-4xl md:[&_h1]:text-5xl
    [&_h1]:font-extrabold
    [&_h1]:tracking-tight
    [&_h1]:leading-tight
    [&_h1]:mt-6 [&_h1]:mb-3
    [&_h2]:text-3xl
    [&_h2]:font-bold
    [&_h2]:mt-5 [&_h2]:mb-2
    [&_h3]:text-2xl
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
              </div>
            </section>
          </div>
        </div>

        <JournalPagesModal
          open={pageModalOpen}
          title={pageModalTitle}
          initial={pages.find((p) => p.id === pageModalTargetId)}
          onClose={() => setPageModalOpen(false)}
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
            // update basic local
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

            // optional: kalau edit basic info juga mau reload backend, panggil:
            // await reloadFromBackend();
          }}
        />
      </div>
    </div>
  );
}
