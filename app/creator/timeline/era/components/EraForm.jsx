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
    events: [],
  };
}
function newWeekDay() {
  return { _key: uid(), name: "", shorten: "" };
}

export default function EraForm({ mode = "create", initialData = null }) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  // ✅ copy state
  const [copied, setCopied] = useState(false);

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
      weeks: [],
      moon_cycle: { name: "", total_days: null, phases: [] },
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

  const patchListItem = (listKey, key, patch) =>
    setForm((p) => ({
      ...p,
      [listKey]: (p[listKey] || []).map((x) =>
        x._key === key ? { ...x, ...patch } : x
      ),
    }));

  const addListItem = (listKey, createFn) =>
    setForm((p) => ({
      ...p,
      [listKey]: [...(p[listKey] || []), createFn()],
    }));

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

  const goStep = (nextStep) => {
    if (nextStep === 2 && !step1Complete) {
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
        // fallback
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

      const json = await res.json().catch(() => ({}));
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

  const stepLabel = step === 1 ? "Step 1" : "Step 2";

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col overflow-hidden">
      {/* ====== HEADER ====== */}
      <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* left: title + share id */}
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-slate-500">
              {mode === "update" ? "Edit Timeline" : "Create Timeline"}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h2 className="text-sm md:text-base font-semibold text-slate-100 truncate">
                {form.name?.trim() ? form.name : "Untitled Timeline"}
              </h2>

              <span className="text-[11px] px-2 py-1 rounded-full border border-slate-800 bg-slate-950/60 text-slate-400">
                {stepLabel}
              </span>
            </div>

            {/* ✅ Share ID row */}
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

            {/* validation hint */}
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

          {/* right: segmented step + actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* ✅ Step segmented control */}
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
                title={
                  !step1Complete ? "Complete Step 1 first" : "Go to Step 2"
                }
              >
                Step 2
              </button>
            </div>

            {/* back/next */}
            {step === 2 ? (
              <button
                type="button"
                onClick={() => goStep(1)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goStep(2)}
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
            )}

            {/* save */}
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
    </div>
  );
}
