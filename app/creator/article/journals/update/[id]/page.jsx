"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JournalForm from "../../components/JournalForm";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function normalize(j) {
  // pages kolom: [{name, content}] (yang kamu mau)
  // kalau belum ada pages, fallback dari fvtt_format.pages
  let pages = Array.isArray(j?.pages) ? j.pages : null;

  if (!pages && Array.isArray(j?.fvtt_format?.pages)) {
    pages = j.fvtt_format.pages.map((p, idx) => ({
      name: p?.name || `Page ${idx + 1}`,
      content: p?.text?.content ?? "",
    }));
  }

  if (!pages) pages = [{ name: "Page 1", content: "" }];

  return {
    name: j?.name || "",
    description: j?.description || "",
    private: typeof j?.private === "boolean" ? j.private : true,
    pages,
  };
}

export default function UpdateJournalPage() {
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ignite/journals/${id}`, {
        cache: "no-store",
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) throw new Error(json?.message || "Failed");
      setInitial(normalize(json?.data));
    } catch (e) {
      console.error(e);
      setInitial(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) load();
  }, [id]);

  async function onSubmit(payload) {
    const res = await fetch(`${API_BASE}/ignite/journals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || "Failed to update journal");
    }
  }

  if (loading) {
    return (
      <div className="h-full w-full p-4 md:p-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-400">
          Loading...
        </div>
      </div>
    );
  }

  if (!initial) {
    return (
      <div className="h-full w-full p-4 md:p-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-red-300">
          Journal not found / cannot access.
        </div>
      </div>
    );
  }

  return <JournalForm mode="update" initial={initial} onSubmit={onSubmit} />;
}
