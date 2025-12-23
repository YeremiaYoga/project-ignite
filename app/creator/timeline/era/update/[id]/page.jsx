"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EraForm from "../../components/EraForm";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/* ===============================
   NORMALIZER (WAJIB)
================================ */
function normalizeTimeline(raw) {
  if (!raw) return null;

  const normEra = (e) => ({
    _key: uid(),
    name: e?.name || "",
    shorten: e?.shorten || "",
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
    days: m?.days ?? 30,
    season: Array.isArray(m?.season) ? m.season : [],
    _season_input: "",
    leap: {
      state: !!m?.leap?.state,
      every_year: m?.leap?.every_year ?? null,
      skip_every: m?.leap?.skip_every ?? null,
      except_century: !!m?.leap?.except_century,
      plus: m?.leap?.plus ?? null,
    },
    events: Array.isArray(m?.events) ? m.events : [],
  });

  const normWeek = (w) => ({
    _key: uid(),
    name: w?.name || "",
    shorten: w?.shorten || "",
  });

  const normPhase = (p) => ({
    _key: uid(),
    name: p?.name || "",
    day: p?.day ?? 1,
    symbol: p?.symbol || "",
  });

  return {
    id: raw.id, // ⬅️ PENTING biar PATCH
    name: raw.name || "",
    share_id: raw.share_id || "",
    epoch: {
      private: raw?.epoch?.private ?? -10000,
      public: raw?.epoch?.public ?? 0,
    },
    era: raw.era?.length ? raw.era.map(normEra) : [normEra({})],
    other_era: raw.other_era?.length
      ? raw.other_era.map(normEra)
      : [normEra({})],
    days_in_a_year: raw.days_in_a_year ?? 365,
    months: raw.months?.map(normMonth) || [],
    weeks: raw.weeks?.map(normWeek) || [],
    moon_cycle: {
      name: raw?.moon_cycle?.name || "",
      total_days: raw?.moon_cycle?.total_days ?? null,
      phases: raw?.moon_cycle?.phases?.map(normPhase) || [],
    },
  };
}

export default function UpdateEraPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/ignite/timelines/${id}`, {
          credentials: "include",
          cache: "no-store",
        });

        const json = await res.json();
        if (!res.ok || !json?.success) {
          throw new Error(json?.message || "Failed load era");
        }

        setInitialData(normalizeTimeline(json.data));
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-sm text-slate-400">Loading...</div>;
  }

  if (!initialData) {
    return <div className="p-6 text-sm text-red-400">Era not found</div>;
  }

  return (
    <div className="h-full w-full p-6">

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-100">Edit Era</h1>

        <button
          onClick={() => router.push("/creator/timeline/era")}
          className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
        >
          Back to Era Table
        </button>
      </div>

      <EraForm mode="edit" initialData={initialData} />
    </div>
  );
}
