"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ChevronLeft, ChevronRight, Save } from "lucide-react";

import Step1 from "./Step1";
import Step2 from "./Step2";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function pickValue(v) {
  if (v && typeof v === "object" && "target" in v) return v.target?.value;
  return v;
}
function pickNumber(v, fallback = null) {
  const raw = pickValue(v);
  if (raw === "" || raw === null || raw === undefined) return fallback;
  const n = Number(raw);
  return Number.isNaN(n) ? fallback : n;
}
function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function genShareId(len = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
function computeTotal(start, end) {
  if (typeof start !== "number" || typeof end !== "number") return null;
  return end - start;
}
function newEra() {
  return {
    _key: uid(),
    name: "",
    shorten: "",
    other_name: [],
    _other_name_input: "",
    current: false,
    start: null,
    end: null,
    total: null,
    description: "",
  };
}
function newMonth() {
  return {
    _key: uid(),
    name: "",
    days: 30,
    season: [],
    leap: {
      state: false,
      every_year: null,
      skip_every: null,
      except_century: false,
      plus: null,
    },
    events: [], // ⬅️ tetap ada, tapi tidak di UI
  };
}

function newWeekDay() {
  return { _key: uid(), name: "", shorten: "" };
}

export default function EraForm({ mode = "create", initialData = null }) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(() => {
    if (initialData) return initialData;
    return {
      id: null,
      name: "",
      share_id: genShareId(12),
      epoch: { private: -10000, public: 0 },
      era: [newEra()],
      other_era: [newEra()],
      days_in_a_year: 365,
      months: [],
      weeks: [], // empty
      moon_cycle: { name: "", total_days: null, phases: [] }, // empty
    };
  });

  const step1Complete = useMemo(() => {
    if (!form.name?.trim()) return false;
    if (
      form.epoch?.private === null ||
      Number.isNaN(Number(form.epoch?.private))
    )
      return false;
    if (form.epoch?.public === null || Number.isNaN(Number(form.epoch?.public)))
      return false;
    return true;
  }, [form]);

  // helpers list
  const patchListItem = (listKey, key, patch) =>
    setForm((p) => ({
      ...p,
      [listKey]: (p[listKey] || []).map((x) =>
        x._key === key ? { ...x, ...patch } : x
      ),
    }));

  const addListItem = (listKey, createFn) =>
    setForm((p) => ({ ...p, [listKey]: [...(p[listKey] || []), createFn()] }));

  const removeListItem = (listKey, key, fallbackFn) =>
    setForm((p) => {
      const next = (p[listKey] || []).filter((x) => x._key !== key);
      return {
        ...p,
        [listKey]: next.length ? next : fallbackFn ? [fallbackFn()] : [],
      };
    });

  const addOtherName = (listKey, key) => {
    setForm((p) => {
      const next = (p[listKey] || []).map((x) => {
        if (x._key !== key) return x;
        const raw = (x._other_name_input || "").trim();
        if (!raw) return x;
        const exists = (x.other_name || []).some(
          (s) => String(s).toLowerCase() === raw.toLowerCase()
        );
        return {
          ...x,
          other_name: exists
            ? x.other_name || []
            : [...(x.other_name || []), raw],
          _other_name_input: "",
        };
      });
      return { ...p, [listKey]: next };
    });
  };

  const removeOtherName = (listKey, key, idx) => {
    setForm((p) => ({
      ...p,
      [listKey]: (p[listKey] || []).map((x) => {
        if (x._key !== key) return x;
        return {
          ...x,
          other_name: (x.other_name || []).filter((_, i) => i !== idx),
        };
      }),
    }));
  };

  // moon phases helpers (dipakai di step2)
  const addMoonPhase = () =>
    setForm((p) => ({
      ...p,
      moon_cycle: {
        ...(p.moon_cycle || { name: "", total_days: null, phases: [] }),
        phases: [
          ...(p.moon_cycle?.phases || []),
          { _key: uid(), name: "", day: 1, symbol: "" },
        ],
      },
    }));

  const removeMoonPhase = (phaseKey) =>
    setForm((p) => ({
      ...p,
      moon_cycle: {
        ...(p.moon_cycle || {}),
        phases: (p.moon_cycle?.phases || []).filter((x) => x._key !== phaseKey),
      },
    }));

  const patchMoonPhase = (phaseKey, patch) =>
    setForm((p) => ({
      ...p,
      moon_cycle: {
        ...(p.moon_cycle || {}),
        phases: (p.moon_cycle?.phases || []).map((x) =>
          x._key === phaseKey ? { ...x, ...patch } : x
        ),
      },
    }));

  async function onSave() {
    const payload = {
      name: form.name,
      share_id: form.share_id,
      epoch: {
        private: Number(form.epoch.private),
        public: Number(form.epoch.public),
      },
      era: (form.era || []).map(({ _key, _other_name_input, ...e }) => ({
        ...e,
        start: e.start === null ? null : Number(e.start),
        end: e.end === null || e.end === "" ? null : Number(e.end),
        total:
          e.end === null || e.end === ""
            ? null
            : computeTotal(Number(e.start), Number(e.end)),
      })),
      other_era: (form.other_era || []).map(
        ({ _key, _other_name_input, ...e }) => ({
          ...e,
          start: e.start === null ? null : Number(e.start),
          end: e.end === null || e.end === "" ? null : Number(e.end),
          total:
            e.end === null || e.end === ""
              ? null
              : computeTotal(Number(e.start), Number(e.end)),
        })
      ),
      days_in_a_year: Number(form.days_in_a_year),
      months: (form.months || []).map(({ _key, ...m }) => ({
        ...m,
        days: Number(m.days),
      })),
      weeks: (form.weeks || []).map(({ _key, ...w }) => w),
      moon_cycle: {
        ...(form.moon_cycle || {}),
        phases: (form.moon_cycle?.phases || []).map(({ _key, ...ph }) => ph),
      },
    };

    setSaving(true);
    try {
      const isUpdate = !!form.id;
      const url = isUpdate
        ? `${API_BASE}/ignite/timelines/${form.id}`
        : `${API_BASE}/ignite/timelines`;
      const method = isUpdate ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok || !json?.success) {
        console.error("save timeline failed:", json);
        alert(json?.message || "Failed to save timeline");
        return;
      }

      const saved = json?.data || null;
      if (saved?.id && !form.id) setForm((p) => ({ ...p, id: saved.id }));
      alert("Saved ✅");
    } catch (e) {
      console.error(e);
      alert("Failed to save timeline");
    } finally {
      setSaving(false);
    }
  }

  // --- SCROLL BEHAVIOR ---
  // header tetap, konten step scroll
  // tinggi: viewport - (approx padding/header). Kalau layout kamu beda, ubah angka 120.
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
      {/* Step Tabs (SAMA PERSIS) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(1)}
            className={`text-xs px-3 py-1 rounded-full border ${
              step === 1
                ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-200"
                : "border-slate-800 bg-slate-950/50 text-slate-400"
            }`}
          >
            Step 1
          </button>
          <button
            onClick={() => setStep(2)}
            className={`text-xs px-3 py-1 rounded-full border ${
              step === 2
                ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-200"
                : "border-slate-800 bg-slate-950/50 text-slate-400"
            }`}
          >
            Step 2
          </button>
        </div>

        <div className="flex items-center gap-2">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto pr-1">
        {step === 1 ? (
          <Step1
            form={form}
            setForm={setForm}
            patchListItem={patchListItem}
            addListItem={addListItem}
            removeListItem={removeListItem}
            addOtherName={addOtherName}
            removeOtherName={removeOtherName}
            pickValue={pickValue}
            pickNumber={pickNumber}
            newEra={newEra}
          />
        ) : (
          <Step2
            form={form}
            setForm={setForm}
            patchListItem={patchListItem}
            addListItem={addListItem}
            removeListItem={removeListItem}
            pickValue={pickValue}
            pickNumber={pickNumber}
            newMonth={newMonth}
            newWeekDay={newWeekDay}
            addMoonPhase={addMoonPhase}
            removeMoonPhase={removeMoonPhase}
            patchMoonPhase={patchMoonPhase}
          />
        )}
      </div>
    </div>
  );
}
