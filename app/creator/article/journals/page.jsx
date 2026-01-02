"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Copy, Check, Lock, Globe, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import JournalCreateModal from "./components/JournalCreateModal";
import JournalTable from "./components/JournalTable";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function JournalListPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ignite/journals`, {
        cache: "no-store",
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        console.error("load journals failed:", json);
        setRows([]);
        return;
      }

      setRows(json?.data || []);
    } catch (e) {
      console.error(e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    const ok = confirm("Delete this journal? This action cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/ignite/journals/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        console.error("delete journal failed:", json);
        alert(json?.message || "Failed to delete journal");
        return;
      }

      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete journal");
    }
  }

  async function copyShare(id, shareId) {
    try {
      await navigator.clipboard.writeText(shareId || "");
      setCopied(id);
      setTimeout(() => setCopied(null), 900);
    } catch {}
  }

  useEffect(() => {
    load();
  }, []);

  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return "-";
    }
  };

  // ✅ total characters for mobile header
  const totalCharacterCount = useMemo(() => {
    if (!Array.isArray(rows)) return 0;
    return rows.reduce((sum, r) => sum + Number(r.character_count || 0), 0);
  }, [rows]);

  return (
    <div className="h-full w-full p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-slate-500">
            Creator Panel
          </p>
          <h1 className="text-xl font-semibold text-slate-100 mt-1">
            Journals
          </h1>

          {/* ✅ mobile total */}
          <p className="md:hidden text-xs text-slate-400 mt-1">
            Total Characters:{" "}
            <span className="text-slate-200 font-medium">
              {loading ? "..." : totalCharacterCount}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-end md:justify-start">
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs w-full md:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Journal
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <JournalTable
        loading={loading}
        rows={rows}
        onDelete={onDelete}
        fmtDate={fmtDate}
      />

      {/* ✅ Mobile Cards (tetap ada, plus character_count) */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-400">
            Loading...
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-400">
            No journals found.
          </div>
        ) : (
          rows.map((r) => {
            const pageCount = Array.isArray(r.pages)
              ? r.pages.length
              : Array.isArray(r?.fvtt_format?.pages)
              ? r.fvtt_format.pages.length
              : 0;

            const charCount = Number(r.character_count || 0);

            return (
              <div
                key={r.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden"
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-100 truncate">
                        {r.name || "-"}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 font-mono">
                        Share ID:{" "}
                        <span className="text-slate-300">
                          {r.share_id || "-"}
                        </span>
                      </p>
                    </div>

                    <span
                      className={[
                        "inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] shrink-0",
                        r.private
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
                      ].join(" ")}
                    >
                      {r.private ? (
                        <Lock className="w-3 h-3" />
                      ) : (
                        <Globe className="w-3 h-3" />
                      )}
                      {r.private ? "Private" : "Public"}
                    </span>
                  </div>

                  {r.description ? (
                    <div className="text-xs text-slate-400 line-clamp-2">
                      {r.description}
                    </div>
                  ) : null}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                      <p className="text-[11px] text-slate-500">Pages</p>
                      <p className="text-xs text-slate-200 mt-1">{pageCount}</p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                      <p className="text-[11px] text-slate-500">Characters</p>
                      <p className="text-xs text-slate-200 mt-1">{charCount}</p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                      <p className="text-[11px] text-slate-500">Updated</p>
                      <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                        {r.updated_at ? fmtDate(r.updated_at) : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyShare(r.id, r.share_id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
                    >
                      {copied === r.id ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>

                    <Link
                      href={`/creator/article/journals/update/${r.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDelete(r.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 text-xs text-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Modal */}
      <JournalCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => load()}
      />
    </div>
  );
}
