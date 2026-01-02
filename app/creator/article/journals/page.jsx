"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

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

      {/* Desktop Table Only */}
      <JournalTable
        loading={loading}
        rows={rows}
        copiedId={copied}
        onCopyShare={copyShare}
        onDelete={onDelete}
        fmtDate={fmtDate}
      />

      {/* Create Modal */}
      <JournalCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => load()}
      />
    </div>
  );
}
