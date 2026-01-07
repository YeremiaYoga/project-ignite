"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CalendarForm from "../../components/CalendarForm";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function UpdateCalendarPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/ignite/calendars/${id}`, {
          credentials: "include",
          cache: "no-store",
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json?.success) {
          throw new Error(json?.message || "Failed load calendar");
        }

        // ✅ kirim RAW ke CalendarForm (biar CalendarForm yang normalize)
        setInitialData(json.data || null);
      } catch (e) {
        console.error(e);
        alert(e?.message || "Failed load calendar");
        setInitialData(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  if (loading)
    return <div className="p-6 text-sm text-slate-400">Loading...</div>;

  if (!initialData)
    return <div className="p-6 text-sm text-red-400">Calendar not found</div>;

  return (
    <div className="h-full w-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-100">Edit Calendar</h1>

        <button
          type="button"
          onClick={() => router.push("/creator/timeline/calendar")}
          className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-100"
        >
          Back to Calendar Table
        </button>
      </div>

      {/* ✅ pakai mode yang sama dengan CalendarForm kamu */}
      <CalendarForm mode="update" initialData={initialData} />
    </div>
  );
}
