"use client";

import Link from "next/link";
import { Pencil, Trash2, Lock, Globe } from "lucide-react";

export default function JournalTable({
  loading,
  rows,
  onDelete,
  fmtDate,
}) {
  const totalCharacterCount = Array.isArray(rows)
    ? rows.reduce((sum, r) => sum + Number(r.character_count || 0), 0)
    : 0;

  return (
    <div className="hidden md:block rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-indigo-950/20">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-400">Manage</p>
            <p className="text-sm font-semibold text-slate-100">
              Journal Table
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">
              {loading ? "Loading..." : `${rows.length} journals`}
            </p>
            <p className="text-[11px] text-slate-500">
              Total Characters:{" "}
              <span className="text-slate-300 font-medium">
                {totalCharacterCount}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-950/60">
            <tr className="text-[11px] text-slate-400">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Share ID</th>
              <th className="px-5 py-3 font-medium">Privacy</th>
              <th className="px-5 py-3 font-medium text-right">Pages</th>
              <th className="px-5 py-3 font-medium text-right">
                Characters
              </th>
              <th className="px-5 py-3 font-medium">Updated</th>
              <th className="px-5 py-3 font-medium w-[300px]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {!loading && rows.length === 0 ? (
              <tr>
                <td
                  className="px-5 py-6 text-sm text-slate-400"
                  colSpan={7}
                >
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
                    {/* Name */}
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

                    {/* Share ID */}
                    <td className="px-5 py-4 text-slate-300 font-mono">
                      {r.share_id || "-"}
                    </td>

                    {/* Privacy */}
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

                    {/* Pages */}
                    <td className="px-5 py-4 text-right text-slate-300">
                      {pageCount}
                    </td>

                    {/* Character Count */}
                    <td className="px-5 py-4 text-right text-slate-300">
                      {r.character_count ?? 0}
                    </td>

                    {/* Updated */}
                    <td className="px-5 py-4 text-slate-400">
                      {r.updated_at ? fmtDate(r.updated_at) : "-"}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/creator/article/journals/update/${r.id}`}
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
  );
}
