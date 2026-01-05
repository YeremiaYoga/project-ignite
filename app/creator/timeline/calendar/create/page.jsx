"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CalendarForm from "../components/CalendarForm"; // idealnya rename ke CalendarForm

const BACK_PATH = "/creator/timeline/calendar"; // ✅ ubah sesuai halaman tabel calendar kamu

export default function CreateCalendarPage() {
  const router = useRouter();

  return (
    <div className="h-full w-full p-6 space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push(BACK_PATH)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Calendars
        </button>
      </div>

      <CalendarForm mode="create" />
    </div>
  );
}
