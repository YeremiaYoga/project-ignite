"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function EraListPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  // ✅ limit dari user (users.era_limit)
  const [eraLimit, setEraLimit] = useState(null); // null = unlimited/unknown

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ignite/timelines`, {
        cache: "no-store",
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        console.error("load timelines failed:", json);
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

  async function loadLimit() {
    try {
      const res = await fetch(`${API_BASE}/users/me`, {
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      console.log(json);

      const lim = json?.user.era_limit;
      console.log(lim);
      setEraLimit(typeof lim === "number" ? lim : null);
    } catch (e) {
      console.warn("load limit error:", e);
      setEraLimit(null);
    }
  }

  async function onDelete(id) {
    const ok = confirm("Delete this timeline? This action cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/ignite/timelines/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        console.error("delete timeline failed:", json);
        alert(json?.message || "Failed to delete timeline");
        return;
      }

      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete timeline");
    }
  }

  useEffect(() => {
    load();
    loadLimit();
  }, []);

  // --------- Slots (Character-limit style circles) ----------
  const usedSlots = rows.length;
  const totalSlots = typeof eraLimit === "number" ? eraLimit : 0;
  const isLimited = typeof eraLimit === "number";
  const remainingSlots = isLimited
    ? Math.max(0, totalSlots - usedSlots)
    : 999999;
  const isLimitReached = isLimited && usedSlots >= totalSlots;

  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return "-";
    }
  };

  return (
    <div className="h-full w-full p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-slate-500">
            Creator Panel
          </p>

          <h1 className="text-xl font-semibold text-slate-100 mt-1">
            Timelines
          </h1>
        </div>
        <div className="rounded-2xl  bg-slate-950/40 p-4">
          <div className="flex flex-col items-center">
           

            {isLimited ? (
              <>
                <div className="flex gap-2 flex-wrap justify-center">
                  {[...Array(totalSlots)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                        i < usedSlots
                          ? "bg-indigo-600 border-indigo-600"
                          : "bg-transparent border-slate-600"
                      }`}
                      title={i < usedSlots ? "Used" : "Available"}
                    />
                  ))}
                </div>

                {remainingSlots <= 0 && (
                  <p className="text-xs text-red-400 mt-2">
                    You have reached your timeline limit.
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-slate-400">Unlimited</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLimitReached ? (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs cursor-not-allowed"
              title="Timeline limit reached"
            >
              <Plus className="w-4 h-4" />
              Add Timeline
            </button>
          ) : (
            <Link
              href="/creator/timeline/era/create"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
            >
              <Plus className="w-4 h-4" />
              Add Timeline
            </Link>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-indigo-950/20">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">Manage</p>
              <p className="text-sm font-semibold text-slate-100">
                Timeline Table
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
                <th className="px-5 py-3 font-medium">Epoch</th>
                <th className="px-5 py-3 font-medium">Updated</th>
                <th className="px-5 py-3 font-medium w-[240px]">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {!loading && rows.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-sm text-slate-400" colSpan={5}>
                    No timelines found.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr
                    key={r.id}
                    className="text-xs text-slate-200 hover:bg-slate-950/50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-100">
                        {r.name || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {r.share_id || "-"}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {r.epoch
                        ? `${r.epoch?.private ?? ""} / ${r.epoch?.public ?? ""}`
                        : "-"}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {r.updated_at ? fmtDate(r.updated_at) : "-"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/creator/timeline/era/update/${r.id}`}
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
                ))
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
    </div>
  );
}
