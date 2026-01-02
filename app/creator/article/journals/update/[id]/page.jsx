"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import JournalFormVTT from "./components/JournalFormVTT";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

/* ---------- helpers ---------- */
function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function normalizeLevel(v) {
  const n = Number(v);
  if (n === 2) return 2;
  if (n === 3) return 3;
  return 1;
}

/**
 * Normalisasi data dari API ke shape yang dipakai JournalFormVTT
 * - priority: j.pages
 * - fallback: j.fvtt_format.pages (text.content)
 * - fallback terakhir: 1 page kosong
 */
function normalizeInitial(j) {
  let pages = [];

  if (Array.isArray(j?.pages) && j.pages.length > 0) {
    pages = j.pages.map((p, idx) => ({
      id: p?.id || uid(),
      name: p?.name || `Page Name ${idx + 1}`,
      content: p?.content ?? "",
      show_title: typeof p?.show_title === "boolean" ? p.show_title : true,
      level: normalizeLevel(p?.level),
    }));
  } else if (Array.isArray(j?.fvtt_format?.pages) && j.fvtt_format.pages.length) {
    pages = j.fvtt_format.pages.map((p, idx) => ({
      id: uid(),
      name: p?.name || `Page Name ${idx + 1}`,
      content: p?.text?.content ?? "",
      show_title: typeof p?.title?.show === "boolean" ? p.title.show : true,
      level: normalizeLevel(p?.title?.level),
    }));
  }

  if (!pages.length) {
    pages = [
      { id: uid(), name: "Page Name 1", content: "", show_title: true, level: 1 },
    ];
  }

  return {
    id: j?.id,
    name: j?.name || "",
    description: j?.description || "",
    private: typeof j?.private === "boolean" ? j.private : true,
    share_id: j?.share_id || "",
    pages,
  };
}

export default function UpdateJournalPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(null);

  async function load() {
    if (!id) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/ignite/journals/${id}`, {
        cache: "no-store",
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        throw new Error(json?.message || "Failed to load journal");
      }

      setInitial(normalizeInitial(json?.data));
    } catch (e) {
      console.error(e);
      setInitial(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function onSubmit(payloadFromForm) {
    // ✅ FE cukup kirim pages + basic info
    const safePayload = {
      name: payloadFromForm?.name ?? initial?.name ?? "",
      description:
        payloadFromForm?.description !== undefined
          ? payloadFromForm.description
          : initial?.description ?? "",
      private:
        typeof payloadFromForm?.private === "boolean"
          ? payloadFromForm.private
          : !!initial?.private,
      pages: Array.isArray(payloadFromForm?.pages)
        ? payloadFromForm.pages
        : initial?.pages || [],
      // share_id gak usah diubah di update (tetap dari initial)
      share_id: initial?.share_id || "",
    };

    const res = await fetch(`${API_BASE}/ignite/journals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(safePayload),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || "Failed to update journal");
    }

    setInitial(normalizeInitial(json?.data || safePayload));
    router.refresh();
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

  return <JournalFormVTT mode="update" initial={initial} onSubmit={onSubmit} />;
}
