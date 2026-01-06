"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { ChevronDown, Search, AlertTriangle, X } from "lucide-react";

function safeArray(v) {
  return Array.isArray(v) ? v : [];
}
function toInt(v, fallback = null) {
  if (v === "" || v === undefined || v === null) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}
function normalizeKey(s) {
  return String(s || "").trim().toLowerCase();
}
function eraLabel(e) {
  const name = String(e?.name || "").trim() || "Unnamed Era";
  const abbr = String(e?.abbreviation || "").trim();
  return abbr ? `${name} (${abbr})` : name;
}
function findEraByAbbrOrName(eraList, key) {
  const k = normalizeKey(key);
  const list = safeArray(eraList);
  return (
    list.find((e) => normalizeKey(e?.abbreviation) === k) ||
    list.find((e) => normalizeKey(e?.name) === k) ||
    null
  );
}
function computeEraTotal(eraObj) {
  const explicit = toInt(eraObj?.total, null);
  if (explicit !== null && explicit >= 0) return explicit;

  const start = toInt(eraObj?.start, null);
  const end = toInt(eraObj?.end, null);
  if (start === null || end === null) return null;

  return Math.abs(end - start);
}

export default function Step3({ form, setForm }) {
  const eras = useMemo(() => safeArray(form?.era), [form?.era]);

  // current_year in form
  const current = form?.current_year || { era: "", era_year: 0, true_year: 0 };
  const selectedEraKey = String(current?.era || "");
  const selectedEra = useMemo(
    () => findEraByAbbrOrName(eras, selectedEraKey),
    [eras, selectedEraKey]
  );

  const start = useMemo(() => toInt(selectedEra?.start, null), [selectedEra]);
  const end = useMemo(() => toInt(selectedEra?.end, null), [selectedEra]);
  const total = useMemo(() => computeEraTotal(selectedEra), [selectedEra]);

  // leap_year in form (snake_case) — starts EMPTY (null)
  const leap = form?.leap_year ?? null;
  const leapStart = leap ? String(leap?.leap_start ?? "") : "";
  const leapInterval = leap ? String(leap?.leap_interval ?? "") : "";

  // combobox UI
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const wrapRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!open) return;
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus?.(), 0);
  }, [open]);

  const filtered = useMemo(() => {
    const query = normalizeKey(q);
    if (!query) return eras;

    return eras.filter((e) => {
      const hay = `${e?.name || ""} ${e?.abbreviation || ""} ${(
        e?.other_name || []
      ).join(" ")}`;
      return normalizeKey(hay).includes(query);
    });
  }, [eras, q]);

  const computedTrueYear = useMemo(() => {
    const ey = toInt(current?.era_year, 0) ?? 0;
    if (start === null) return null;
    return start + ey;
  }, [start, current?.era_year]);

  function patchCurrentYear(patch) {
    setForm((p) => {
      const prev = p.current_year || { era: "", era_year: 0, true_year: 0 };
      const next = { ...prev, ...patch };

      const eraObj = findEraByAbbrOrName(p.era, next.era);
      const st = toInt(eraObj?.start, null);
      const ey = toInt(next.era_year, 0) ?? 0;

      return {
        ...p,
        current_year: {
          era: String(next.era || ""),
          era_year: ey,
          true_year: st === null ? 0 : st + ey,
        },
      };
    });
  }

  /**
   * Leap inputs behavior:
   * - both empty => leap_year = null
   * - one filled => keep object, but warning until valid
   * - interval must be > 0
   */
  function patchLeapRaw(nextStartStr, nextIntervalStr) {
    setForm((p) => {
      const sStr = String(nextStartStr ?? "").trim();
      const iStr = String(nextIntervalStr ?? "").trim();

      // ✅ if both empty -> null
      if (!sStr && !iStr) {
        return { ...p, leap_year: null };
      }

      const s = toInt(sStr, null);
      const i = toInt(iStr, null);

      // keep object even if invalid, user might be typing
      return {
        ...p,
        leap_year: {
          leap_start: s,
          leap_interval: i,
        },
      };
    });
  }

  const leapWarning = useMemo(() => {
    if (form?.leap_year === null || form?.leap_year === undefined) return "";

    const s = form?.leap_year?.leap_start;
    const i = form?.leap_year?.leap_interval;

    const sOk = typeof s === "number" && Number.isFinite(s);
    const iOk = typeof i === "number" && Number.isFinite(i) && i > 0;

    if (!sOk && !iOk) return "Leap start and interval must be numbers.";
    if (!sOk) return "Leap start must be a number.";
    if (!iOk) return "Leap interval must be a number greater than 0.";
    return "";
  }, [form?.leap_year]);

  // warning + prevention/clamp for current_year
  const warning = useMemo(() => {
    if (!selectedEraKey) return "";
    if (!selectedEra) return "Selected era not found.";
    if (start === null) return "Selected era is missing start value.";

    const ey = toInt(current?.era_year, 0) ?? 0;
    const ty = start + ey;

    if (end !== null) {
      const lo = Math.min(start, end);
      const hi = Math.max(start, end);

      if (ty < lo || ty > hi) {
        return `Year is outside era range (${lo}..${hi}).`;
      }
      return "";
    }

    if (total !== null && Math.abs(ey) > total) {
      return `Year exceeds era total (${total}).`;
    }

    return "";
  }, [selectedEraKey, selectedEra, start, end, total, current?.era_year]);

  // clamp on change (prevention)
  const onChangeEraYear = (v) => {
    const raw = toInt(v, 0) ?? 0;
    if (!selectedEra || start === null) {
      patchCurrentYear({ era_year: raw });
      return;
    }

    if (end !== null) {
      const lo = Math.min(start, end);
      const hi = Math.max(start, end);

      const ty = start + raw;
      const clampedTy = Math.min(hi, Math.max(lo, ty));
      const clampedEraYear = clampedTy - start;

      patchCurrentYear({ era_year: clampedEraYear });
      return;
    }

    if (total !== null) {
      const clamped = Math.max(-total, Math.min(total, raw));
      patchCurrentYear({ era_year: clamped });
      return;
    }

    patchCurrentYear({ era_year: raw });
  };

  const onSelectEra = (eraObj) => {
    const key = eraObj?.abbreviation || eraObj?.name || "";

    patchCurrentYear({
      era: key,
      era_year: 0, // ✅ reset era_year when era changes
    });

    setOpen(false);
    setQ("");
  };

  const clearEra = () => {
    patchCurrentYear({ era: "" });
    setOpen(false);
    setQ("");
  };

  return (
    <div className="space-y-4">
      {/* ===== Current Year ===== */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
        <p className="text-[11px] uppercase tracking-widest text-slate-400">
          Current Year
        </p>
        <h3 className="text-sm font-semibold text-slate-100 mt-1">
          Set the calendar’s current year
        </h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Era combobox */}
          <div className="space-y-2" ref={wrapRef}>
            <label className="text-[11px] text-slate-400">Era</label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 hover:bg-slate-900/40 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
              >
                <span className="truncate">
                  {selectedEra ? eraLabel(selectedEra) : "—"}
                </span>

                <span className="flex items-center gap-2">
                  {selectedEraKey ? (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        clearEra();
                      }}
                      className="w-7 h-7 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center"
                      title="Clear"
                      aria-label="Clear"
                    >
                      <X className="w-4 h-4 text-slate-200" />
                    </span>
                  ) : null}
                  <ChevronDown className="w-4 h-4 text-slate-300" />
                </span>
              </button>

              {open && (
                <div className="absolute z-20 mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
                  <div className="p-2 border-b border-slate-800">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        ref={searchRef}
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/60 pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
                      />
                    </div>
                  </div>

                  <div className="max-h-64 overflow-y-auto p-1">
                    {filtered.length === 0 ? (
                      <div className="px-3 py-3 text-sm text-slate-400">
                        No results.
                      </div>
                    ) : (
                      filtered.map((e) => (
                        <button
                          key={e._key || e.abbreviation || e.name}
                          type="button"
                          onClick={() => onSelectEra(e)}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-900/60 text-sm text-slate-100"
                        >
                          <div className="truncate">{eraLabel(e)}</div>
                          {(e?.description || "").trim() ? (
                            <div className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                              {e.description}
                            </div>
                          ) : null}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {selectedEra ? (
              <div className="text-[11px] text-slate-500">
                <span className="text-slate-400">Start:</span>{" "}
                <span className="text-slate-200">
                  {String(selectedEra?.start ?? "-")}
                </span>
                <span className="mx-2 text-slate-600">•</span>
                <span className="text-slate-400">End:</span>{" "}
                <span className="text-slate-200">
                  {String(selectedEra?.end ?? "∞")}
                </span>
                {total !== null ? (
                  <>
                    <span className="mx-2 text-slate-600">•</span>
                    <span className="text-slate-400">Total:</span>{" "}
                    <span className="text-slate-200">{total}</span>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="text-[11px] text-slate-500">
                Pick an era from Step 1.
              </div>
            )}
          </div>

          {/* Year + computed true year */}
          <div className="space-y-2">
            <label className="text-[11px] text-slate-400">Era Year</label>

            <input
              type="number"
              value={String(current?.era_year ?? 0)}
              onChange={(e) => onChangeEraYear(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
            />

            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-[11px] text-slate-500">True Year</div>
              <div className="mt-1 text-lg font-semibold text-slate-100">
                {computedTrueYear === null ? "—" : computedTrueYear}
              </div>
            </div>

            {warning ? (
              <div className="mt-2 inline-flex items-start gap-2 text-xs text-amber-200">
                <span className="w-7 h-7 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <span className="text-amber-200/90">{warning}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ===== Leap Year ===== */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
        <p className="text-[11px] uppercase tracking-widest text-slate-400">
          Leap Year
        </p>
        <h3 className="text-sm font-semibold text-slate-100 mt-1">
          Configure leap year interval
        </h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[11px] text-slate-400">Leap Start</label>
            <input
              type="number"
              value={leapStart}
              onChange={(e) => patchLeapRaw(e.target.value, leapInterval)}
              placeholder="e.g. 0"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
            />
            <div className="text-[11px] text-slate-500">
              Leave empty to disable leap year.
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] text-slate-400">Leap Interval</label>
            <input
              type="number"
              value={leapInterval}
              onChange={(e) => patchLeapRaw(leapStart, e.target.value)}
              placeholder="e.g. 4"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
            />

            {leapWarning ? (
              <div className="mt-2 inline-flex items-start gap-2 text-xs text-amber-200">
                <span className="w-7 h-7 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <span className="text-amber-200/90">{leapWarning}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
