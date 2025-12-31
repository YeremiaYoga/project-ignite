"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Copy, Check, Lock, Globe } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function JournalListPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(null);

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
        </div>

        <div className="flex items-center justify-end md:justify-start">
          <Link
            href="/creator/article/journals/create"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs w-full md:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Journal
          </Link>
        </div>
      </div>

      <div className="hidden md:block rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-indigo-950/20">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">Manage</p>
              <p className="text-sm font-semibold text-slate-100">
                Journal Table
              </p>
            </div>

            <div className="text-xs text-slate-400">
              {loading ? "Loading..." : `${rows.length} items`}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950/60">
              <tr className="text-[11px] text-slate-400">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Share ID</th>
                <th className="px-5 py-3 font-medium">Privacy</th>
                <th className="px-5 py-3 font-medium">Pages</th>
                <th className="px-5 py-3 font-medium">Updated</th>
                <th className="px-5 py-3 font-medium w-[320px]">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {!loading && rows.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-sm text-slate-400" colSpan={6}>
                    No journals found.
                  </td>
                </tr>
              ) : (
                rows.map((r) => {
                  const pageCount = Array.isArray(r.pages)
                    ? r.pages.length
                    : Array.isArray(r?.fvtt_format?.pages)
                    ? r.fvtt_format.pages.length
                    : 0;

                  return (
                    <tr
                      key={r.id}
                      className="text-xs text-slate-200 hover:bg-slate-950/50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-100">
                          {r.name || "-"}
                        </div>
                        {r.description ? (
                          <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                            {r.description}
                          </div>
                        ) : null}
                      </td>

                      <td className="px-5 py-4 text-slate-300 font-mono">
                        {r.share_id || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px]",
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
                      </td>

                      <td className="px-5 py-4 text-slate-300">{pageCount}</td>

                      <td className="px-5 py-4 text-slate-400">
                        {r.updated_at ? fmtDate(r.updated_at) : "-"}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() => copyShare(r.id, r.share_id)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
                            title="Copy Share ID"
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
                            href={`/creator/journals/update/${r.id}`}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => onDelete(r.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 text-xs text-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="px-5 py-4 text-xs text-slate-400 border-t border-slate-800">
            Loading...
          </div>
        )}
      </div>

      {/* ===== MOBILE CARDS (<md) ===== */}
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

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                      <p className="text-[11px] text-slate-500">Pages</p>
                      <p className="text-xs text-slate-200 mt-1">{pageCount}</p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                      <p className="text-[11px] text-slate-500">Updated</p>
                      <p className="text-xs text-slate-200 mt-1">
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
    </div>
  );
}
