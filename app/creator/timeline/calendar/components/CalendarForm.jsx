"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Save,
  Copy,
  Check,
} from "lucide-react";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

/* ---------------- helpers ---------------- */
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
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  return end - start;
}
function numOrNull(v) {
  if (v === null || v === "" || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}
function parseJsonMaybe(v) {
  if (v === null || v === undefined) return v;
  if (typeof v !== "string") return v;
  const s = v.trim();
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return v; // biar kelihatan kalau memang bukan JSON
  }
}
function sumMoonCycleLength(values) {
  const arr = Array.isArray(values) ? values : [];
  return arr.reduce((sum, it) => {
    const n = Number(it?.day_length ?? 0);
    return sum + (Number.isFinite(n) ? n : 0);
  }, 0);
}

function newEra() {
  return {
    _key: uid(),
    name: "",
    abbreviation: "",
    other_name: [],
    _other_name_input: "",
    current: false,
    start: null,
    end: null,
    total: null,
    description: "",
  };
}

/**
 * Normalize calendar initialData (supports:
 * - raw fields already objects
 * - raw fields as JSON string (from SQL / Supabase)
 * Ensures:
 * - seasons.values[].icon exists
 * - moon_cycle.values[].icon exists
 * - moon_cycle.cycle_length computed from sum(day_length)
 */
function normalizeCalendarInitialData(raw) {
  if (!raw) return null;

  const parsed = {
    ...raw,
    epoch: parseJsonMaybe(raw.epoch),
    era: parseJsonMaybe(raw.era),
    other_era: parseJsonMaybe(raw.other_era),
    months: parseJsonMaybe(raw.months),
    days: parseJsonMaybe(raw.days),
    seasons: parseJsonMaybe(raw.seasons),
    weather: parseJsonMaybe(raw.weather),
    moon_cycle: parseJsonMaybe(raw.moon_cycle),
    current_year: parseJsonMaybe(raw.current_year),
    leap_year: parseJsonMaybe(raw.leap_year),
  };

  const normalizeEraList = (arr) =>
    (Array.isArray(arr) ? arr : []).map((e) => ({
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
    }));

  const normalizeMonthList = (arr) =>
    (Array.isArray(arr) ? arr : []).map((m, idx) => ({
      _key: uid(),
      name: m?.name || "",
      abbreviation: m?.abbreviation || "",
      ordinal: m?.ordinal ?? idx + 1,
      days: m?.days ?? 30,
      leap_days: m?.leap_days ?? null,
    }));

  const normalizeDayList = (arr) =>
    (Array.isArray(arr) ? arr : []).map((d, idx) => ({
      _key: uid(),
      name: d?.name || "",
      abbreviation: d?.abbreviation || "",
      ordinal: d?.ordinal ?? idx + 1,
      is_rest_day:
        typeof d?.is_rest_day === "boolean" ? d.is_rest_day : false,
      rest_day_color: String(d?.rest_day_color || "#FF0000"),
    }));

  const normalizeSeasonList = (arr) =>
    (Array.isArray(arr) ? arr : []).map((s) => ({
      _key: uid(),
      name: s?.name || "",
      month_start: s?.month_start ?? 1,
      month_end: s?.month_end ?? 1,
      icon: String(s?.icon || ""), // ✅ keep icon
    }));

  const normalizeWeatherList = (arr) =>
    (Array.isArray(arr) ? arr : []).map((w) => ({
      _key: uid(),
      name: w?.name || "",
      month_start: w?.month_start ?? 1,
      month_end: w?.month_end ?? 1,
      temp_offset: w?.temp_offset ?? 0,
    }));

  const normalizeMoonValues = (arr) =>
    (Array.isArray(arr) ? arr : []).map((ph) => ({
      _key: uid(),
      name: ph?.name || "",
      day_length: Number.isFinite(Number(ph?.day_length))
        ? Number(ph.day_length)
        : Number.isFinite(Number(ph?.day_end)) &&
          Number.isFinite(Number(ph?.day_start))
        ? Math.max(0, Number(ph.day_end) - Number(ph.day_start))
        : 1,
      icon: String(ph?.icon || ""), // ✅ NOT symbol
    }));

  const monthsValues =
    parsed?.months && Array.isArray(parsed.months?.values)
      ? normalizeMonthList(parsed.months.values)
      : Array.isArray(parsed?.months)
      ? normalizeMonthList(parsed.months)
      : [];

  const daysValues =
    parsed?.days && Array.isArray(parsed.days?.values)
      ? normalizeDayList(parsed.days.values)
      : Array.isArray(parsed?.days)
      ? normalizeDayList(parsed.days)
      : [];

  const seasonsValues = normalizeSeasonList(
    parsed?.seasons?.values ?? parsed?.seasons
  );

  const weatherValues = normalizeWeatherList(
    parsed?.weather?.values ?? parsed?.weather
  );

  const moonValues = normalizeMoonValues(
    parsed?.moon_cycle?.values ?? parsed?.moon_cycle
  );

  const cy =
    parsed?.current_year ??
    parsed?.currentYear ??
    parsed?.calendar_current_year ??
    null;

  const ly =
    parsed?.leap_year ??
    parsed?.leapYear ??
    parsed?.calendar_leap_year ??
    null;

  const nOrNull = (v) => {
    if (v === "" || v === undefined || v === null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const leapStart = nOrNull(ly?.leap_start);
  const leapInterval = nOrNull(ly?.leap_interval);
  const normalizedLeap =
    leapStart === null && leapInterval === null
      ? null
      : { leap_start: leapStart, leap_interval: leapInterval };

  // ✅ cycle_length: prefer backend value if valid (>0), else compute sum(day_length)
  const parsedCycleLen = Number(parsed?.moon_cycle?.cycle_length);
  const computedCycleLen = sumMoonCycleLength(moonValues);
  const cycleLen =
    Number.isFinite(parsedCycleLen) && parsedCycleLen > 0
      ? parsedCycleLen
      : computedCycleLen;

  return {
    id: parsed?.id ?? null,
    name: parsed?.name || "",
    abbreviation: parsed?.abbreviation || "",
    share_id: parsed?.share_id || genShareId(12),
    private: typeof parsed?.private === "boolean" ? parsed.private : true,

    epoch: {
      private: Number(parsed?.epoch?.private ?? -10000),
      public: Number(parsed?.epoch?.public ?? 0),
    },

    era: normalizeEraList(parsed?.era),
    other_era: normalizeEraList(parsed?.other_era),

    months: { values: monthsValues },

    days: {
      values: daysValues,
      days_per_year:
        parsed?.days?.days_per_year ??
        parsed?.days?.days_per_Year ??
        parsed?.days_per_year ??
        365,
      hours_per_day: parsed?.days?.hours_per_day ?? 24,
      minutes_per_hour: parsed?.days?.minutes_per_hour ?? 60,
      seconds_per_minute: parsed?.days?.seconds_per_minute ?? 60,
    },

    seasons: { values: seasonsValues },
    weather: { values: weatherValues },

    moon_cycle: {
      name: parsed?.moon_cycle?.name || "",
      cycle_length: cycleLen, // ✅ now exists & correct
      values: moonValues,
    },

    current_year: {
      era: String(cy?.era ?? ""),
      era_year: Number(cy?.era_year ?? 0),
      true_year: Number(cy?.true_year ?? 0),
    },

    leap_year: normalizedLeap,
  };
}

/* ---------------- component ---------------- */
export default function CalendarForm({ mode = "create", initialData = null }) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState(() => {
    if (initialData) return normalizeCalendarInitialData(initialData);

    return {
      id: null,
      name: "",
      abbreviation: "",
      share_id: genShareId(12),
      private: true,
      epoch: { private: -10000, public: 0 },

      era: [newEra()],
      other_era: [newEra()],

      months: { values: [] },
      days: {
        values: [],
        days_per_year: 365,
        hours_per_day: 24,
        minutes_per_hour: 60,
        seconds_per_minute: 60,
      },
      seasons: { values: [] },
      weather: { values: [] },

      // ✅ include cycle_length from start
      moon_cycle: { name: "", cycle_length: 0, values: [] },

      current_year: { era: "", era_year: 0, true_year: 0 },
      leap_year: null,
    };
  });

  const step1Complete = useMemo(() => {
    if (!form.name?.trim()) return false;
    if (form.epoch?.private === null || Number.isNaN(Number(form.epoch?.private)))
      return false;
    if (form.epoch?.public === null || Number.isNaN(Number(form.epoch?.public)))
      return false;
    return true;
  }, [form]);

  // ---------- list helpers for era / other_era ----------
  const patchListItem = (listKey, key, patch) =>
    setForm((p) => ({
      ...p,
      [listKey]: (Array.isArray(p[listKey]) ? p[listKey] : []).map((x) =>
        x._key === key ? { ...x, ...patch } : x
      ),
    }));

  const addListItem = (listKey, createFn) =>
    setForm((p) => ({
      ...p,
      [listKey]: [...(Array.isArray(p[listKey]) ? p[listKey] : []), createFn()],
    }));

  const removeListItem = (listKey, key, fallbackFn) =>
    setForm((p) => {
      const curr = Array.isArray(p[listKey]) ? p[listKey] : [];
      const next = curr.filter((x) => x._key !== key);
      return {
        ...p,
        [listKey]: next.length ? next : fallbackFn ? [fallbackFn()] : [],
      };
    });

  const addOtherName = (listKey, key) => {
    setForm((p) => {
      const curr = Array.isArray(p[listKey]) ? p[listKey] : [];
      const next = curr.map((x) => {
        if (x._key !== key) return x;
        const raw = String(x._other_name_input || "").trim();
        if (!raw) return x;

        const exists = (x.other_name || []).some(
          (s) => String(s).toLowerCase() === raw.toLowerCase()
        );

        return {
          ...x,
          other_name: exists ? x.other_name || [] : [...(x.other_name || []), raw],
          _other_name_input: "",
        };
      });

      return { ...p, [listKey]: next };
    });
  };

  const removeOtherName = (listKey, key, idx) => {
    setForm((p) => ({
      ...p,
      [listKey]: (Array.isArray(p[listKey]) ? p[listKey] : []).map((x) => {
        if (x._key !== key) return x;
        return {
          ...x,
          other_name: (x.other_name || []).filter((_, i) => i !== idx),
        };
      }),
    }));
  };

  const goStep = (nextStep) => {
    if ((nextStep === 2 || nextStep === 3) && !step1Complete) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    setStep(nextStep);
  };

  const copyShareId = async () => {
    try {
      const text = String(form.share_id || "");
      if (!text) return;

      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error("copy failed:", e);
      alert("Copy failed");
    }
  };

  async function onSave() {
    if (!step1Complete) {
      setShowValidation(true);
      setStep(1);
      return;
    }

    const moonValuesPayload = (form.moon_cycle?.values || []).map(
      ({ _key, ...ph }) => ({
        ...ph,
        day_length: Math.max(0, Number(numOrNull(ph.day_length) ?? 1)),
        icon: String(ph.icon || ""),
      })
    );

    const cycleLenPayload = sumMoonCycleLength(moonValuesPayload);

    const payload = {
      name: form.name,
      abbreviation: form.abbreviation || "",
      share_id: form.share_id,
      private: !!form.private,

      epoch: {
        private: Number(form.epoch.private),
        public: Number(form.epoch.public),
      },

      era: (Array.isArray(form.era) ? form.era : []).map(
        ({ _key, _other_name_input, ...e }) => {
          const start = numOrNull(e.start);
          const end = numOrNull(e.end);
          return {
            ...e,
            start,
            end,
            total: end === null ? null : computeTotal(start, end),
          };
        }
      ),

      other_era: (Array.isArray(form.other_era) ? form.other_era : []).map(
        ({ _key, _other_name_input, ...e }) => {
          const start = numOrNull(e.start);
          const end = numOrNull(e.end);
          return {
            ...e,
            start,
            end,
            total: end === null ? null : computeTotal(start, end),
          };
        }
      ),

      months: {
        values: (form.months?.values || []).map(({ _key, ...m }, idx) => ({
          ...m,
          ordinal: m.ordinal ?? idx + 1,
          days: Number(m.days ?? 30),
          leap_days: numOrNull(m.leap_days),
        })),
      },

      days: {
        values: (form.days?.values || []).map(({ _key, ...d }, idx) => ({
          ...d,
          ordinal: d.ordinal ?? idx + 1,
          is_rest_day: !!d.is_rest_day,
          rest_day_color: String(d.rest_day_color || "#FF0000"),
        })),
        days_per_year: Number(form.days?.days_per_year ?? 365),
        hours_per_day: Number(form.days?.hours_per_day ?? 24),
        minutes_per_hour: Number(form.days?.minutes_per_hour ?? 60),
        seconds_per_minute: Number(form.days?.seconds_per_minute ?? 60),
      },

      seasons: {
        values: (form.seasons?.values || []).map(({ _key, ...s }) => ({
          ...s,
          month_start: Number(s.month_start ?? 1),
          month_end: Number(s.month_end ?? 1),
          icon: String(s.icon || ""),
        })),
      },

      weather: {
        values: (form.weather?.values || []).map(({ _key, ...w }) => ({
          ...w,
          month_start: Number(w.month_start ?? 1),
          month_end: Number(w.month_end ?? 1),
          temp_offset: Number(w.temp_offset ?? 0),
        })),
      },

      moon_cycle: {
        name: form.moon_cycle?.name || "",
        cycle_length: cycleLenPayload, // ✅ always sum(day_length)
        values: moonValuesPayload,
      },

      current_year: {
        era: String(form.current_year?.era || ""),
        era_year: Number(form.current_year?.era_year ?? 0),
        true_year: Number(form.current_year?.true_year ?? 0),
      },

      leap_year: form.leap_year
        ? {
            leap_start: Number(form.leap_year?.leap_start ?? 0),
            leap_interval: Number(form.leap_year?.leap_interval ?? 4),
          }
        : null,
    };

    setSaving(true);
    try {
      const isUpdate = !!form.id;
      const url = isUpdate
        ? `${API_BASE}/ignite/calendars/${form.id}`
        : `${API_BASE}/ignite/calendars`;
      const method = isUpdate ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        console.error("save calendar failed:", json);
        alert(json?.message || "Failed to save calendar");
        return;
      }

      // ✅ refresh form from saved server response (keeps icons/cycle_length in sync)
      const saved = json?.data || null;
      if (saved) {
        setForm(normalizeCalendarInitialData(saved));
      } else if (json?.data?.id && !form.id) {
        setForm((p) => ({ ...p, id: json.data.id }));
      }

      alert("Saved ✅");
    } catch (e) {
      console.error(e);
      alert("Failed to save calendar");
    } finally {
      setSaving(false);
    }
  }

  const stepLabel = step === 1 ? "Step 1" : step === 2 ? "Step 2" : "Step 3";

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col overflow-hidden">
      {/* ====== HEADER ====== */}
      <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* left */}
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-slate-500">
              {mode === "update" ? "Edit Calendar" : "Create Calendar"}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h2 className="text-sm md:text-base font-semibold text-slate-100 truncate">
                {form.name?.trim() ? form.name : "Untitled Calendar"}
              </h2>

              <span className="text-[11px] px-2 py-1 rounded-full border border-slate-800 bg-slate-950/60 text-slate-400">
                {stepLabel}
              </span>
            </div>

            {/* Share ID row */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Share ID</span>

              <div className="flex items-center gap-2 max-w-full">
                <code className="text-[11px] px-2 py-1 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-200 truncate max-w-[220px] sm:max-w-[360px]">
                  {form.share_id}
                </code>

                <button
                  type="button"
                  onClick={copyShareId}
                  className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-950/50 hover:bg-slate-900 flex items-center justify-center"
                  title="Copy Share ID"
                  aria-label="Copy Share ID"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-200" />
                  )}
                </button>
              </div>
            </div>

            {showValidation && !step1Complete && (
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-amber-200">
                <span className="w-7 h-7 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <span className="text-amber-200/90">
                  Complete Step 1 (name) before continuing.
                </span>
              </div>
            )}
          </div>

          {/* right */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center p-1 rounded-2xl border border-slate-800 bg-slate-950/60">
              <button
                type="button"
                onClick={() => goStep(1)}
                className={[
                  "px-3 py-2 text-xs rounded-xl transition",
                  step === 1
                    ? "bg-indigo-600/20 text-indigo-100 border border-indigo-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/50",
                ].join(" ")}
              >
                Step 1
              </button>

              <button
                type="button"
                onClick={() => goStep(2)}
                disabled={!step1Complete}
                className={[
                  "px-3 py-2 text-xs rounded-xl transition",
                  step === 2
                    ? "bg-indigo-600/20 text-indigo-100 border border-indigo-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/50",
                  !step1Complete ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
                title={!step1Complete ? "Complete Step 1 first" : "Go to Step 2"}
              >
                Step 2
              </button>

              <button
                type="button"
                onClick={() => goStep(3)}
                disabled={!step1Complete}
                className={[
                  "px-3 py-2 text-xs rounded-xl transition",
                  step === 3
                    ? "bg-indigo-600/20 text-indigo-100 border border-indigo-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/50",
                  !step1Complete ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
                title={!step1Complete ? "Complete Step 1 first" : "Go to Step 3"}
              >
                Step 3
              </button>
            </div>

            {step > 1 ? (
              <button
                type="button"
                onClick={() => goStep(step - 1)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            ) : null}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => goStep(step + 1)}
                disabled={!step1Complete}
                className={[
                  "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition",
                  step1Complete
                    ? "bg-indigo-600/90 hover:bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-400 cursor-not-allowed",
                ].join(" ")}
                title={!step1Complete ? "Complete Step 1 first" : "Next"}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : null}

            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">
                {saving ? "Saving..." : "Save"}
              </span>
              <span className="sm:hidden">{saving ? "..." : ""}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====== CONTENT ====== */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto pr-1 pb-8">
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
          ) : step === 2 ? (
            <Step2 form={form} setForm={setForm} />
          ) : (
            <Step3 form={form} setForm={setForm} />
          )}
        </div>
      </div>
    </div>
  );
}
