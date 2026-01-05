"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CalendarForm from "../../components/CalendarForm"; // kalau komponen kamu masih namanya CalendarForm, boleh. Idealnya rename jadi CalendarForm.

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

// NOTE: kamu bilang "tidak jadi shorten" => pakai abbreviation
function normalizeCalendar(raw) {
  if (!raw) return null;

  const normEra = (e) => ({
    _key: uid(),
    name: e?.name || "",
    abbreviation: e?.abbreviation || "",
    other_name: Array.isArray(e?.other_name) ? e.other_name : [],
    _other_name_input: "",
    current: !!e?.current,
    start: e?.start ?? null,
    end: e?.end ?? null,
    total: e?.total ?? null,
    description: e?.description || "",
  });

  const normMonth = (m) => ({
    _key: uid(),
    name: m?.name || "",
    abbreviation: m?.abbreviation || "",
    ordinal: Number.isFinite(Number(m?.ordinal)) ? Number(m.ordinal) : null,
    days: Number.isFinite(Number(m?.days)) ? Number(m.days) : 28,
  });

  const normDay = (d) => ({
    _key: uid(),
    name: d?.name || "",
    abbreviation: d?.abbreviation || "",
    ordinal: Number.isFinite(Number(d?.ordinal)) ? Number(d.ordinal) : null,
  });

  const normSeason = (s) => ({
    _key: uid(),
    name: s?.name || "",
    month_start: Number.isFinite(Number(s?.month_start)) ? Number(s.month_start) : 1,
    month_end: Number.isFinite(Number(s?.month_end)) ? Number(s.month_end) : 1,
  });

  const normWeather = (w) => ({
    _key: uid(),
    name: w?.name || "",
    month_start: Number.isFinite(Number(w?.month_start)) ? Number(w.month_start) : 1,
    month_end: Number.isFinite(Number(w?.month_end)) ? Number(w.month_end) : 1,
    temp_offset: Number.isFinite(Number(w?.temp_offset)) ? Number(w.temp_offset) : 0,
  });

  const normMoon = (p) => ({
    _key: uid(),
    name: p?.name || "",
    day_start: Number.isFinite(Number(p?.day_start)) ? Number(p.day_start) : 1,
    day_end: Number.isFinite(Number(p?.day_end)) ? Number(p.day_end) : 1,
    symbol: p?.symbol || "",
  });

  return {
    id: raw.id,
    name: raw.name || "",
    abbreviation: raw.abbreviation || "",
    share_id: raw.share_id || "",
    private: typeof raw.private === "boolean" ? raw.private : true,

    epoch: {
      private: raw?.epoch?.private ?? -10000,
      public: raw?.epoch?.public ?? 0,
    },

    era: Array.isArray(raw?.era) && raw.era.length ? raw.era.map(normEra) : [normEra({})],
    other_era:
      Array.isArray(raw?.other_era) && raw.other_era.length
        ? raw.other_era.map(normEra)
        : [],

    months: {
      values:
        Array.isArray(raw?.months?.values) && raw.months.values.length
          ? raw.months.values.map(normMonth)
          : [],
    },

    days: {
      values:
        Array.isArray(raw?.days?.values) && raw.days.values.length
          ? raw.days.values.map(normDay)
          : [],
      days_per_year: Number.isFinite(Number(raw?.days?.days_per_year))
        ? Number(raw.days.days_per_year)
        : 365,
      hours_per_day: Number.isFinite(Number(raw?.days?.hours_per_day))
        ? Number(raw.days.hours_per_day)
        : 24,
      minutes_per_hour: Number.isFinite(Number(raw?.days?.minutes_per_hour))
        ? Number(raw.days.minutes_per_hour)
        : 60,
      seconds_per_minute: Number.isFinite(Number(raw?.days?.seconds_per_minute))
        ? Number(raw.days.seconds_per_minute)
        : 60,
    },

    seasons: {
      values:
        Array.isArray(raw?.seasons?.values) && raw.seasons.values.length
          ? raw.seasons.values.map(normSeason)
          : [],
    },

    weather: {
      values:
        Array.isArray(raw?.weather?.values) && raw.weather.values.length
          ? raw.weather.values.map(normWeather)
          : [],
    },

    moon_cycle: {
      name: raw?.moon_cycle?.name || "",
      values:
        Array.isArray(raw?.moon_cycle?.values) && raw.moon_cycle.values.length
          ? raw.moon_cycle.values.map(normMoon)
          : [],
    },

    created_at: raw.created_at || "",
    updated_at: raw.updated_at || "",
    creator_id: raw.creator_id || "",
    creator_name: raw.creator_name || "",
  };
}

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

        const json = await res.json();
        if (!res.ok || !json?.success) {
          throw new Error(json?.message || "Failed load calendar");
        }

        setInitialData(normalizeCalendar(json.data));
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  if (loading) return <div className="p-6 text-sm text-slate-400">Loading...</div>;
  if (!initialData) return <div className="p-6 text-sm text-red-400">Calendar not found</div>;

  return (
    <div className="h-full w-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-100">Edit Calendar</h1>

        <button
          onClick={() => router.push("/creator/timeline/calendar")} 
          className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
        >
          Back to Calendar Table
        </button>
      </div>

      <CalendarForm mode="edit" initialData={initialData} />
    </div>
  );
}
