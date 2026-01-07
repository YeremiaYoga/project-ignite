"use client";

import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ================= helpers ================= */
function safeArray(v) {
  return Array.isArray(v) ? v : [];
}

function getSeasonName(seasons, monthOrdinal) {
  const list = safeArray(seasons);
  const m = Number(monthOrdinal);
  if (!m) return "";

  for (const s of list) {
    const a = Number(s?.month_start);
    const b = Number(s?.month_end);
    if (!a || !b) continue;

    if (a <= b) {
      if (m >= a && m <= b) return s?.name || "";
    } else {
      if (m >= a || m <= b) return s?.name || "";
    }
  }
  return "";
}

function getMonthTitle(month) {
  const name = month?.name || "Month";
  const abbr = month?.abbreviation ? ` (${month.abbreviation})` : "";
  return `${name}${abbr}`;
}

function getWeekdayHeaders(calendar) {
  const days = safeArray(calendar?.days?.values);
  if (days.length > 0) {
    return days.map((d) => d?.abbreviation || d?.name?.slice(0, 2) || "--");
  }
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
}

function getDaysForMonth(m, leapOn) {
  const normal = Number(m?.days ?? 30);
  const leapOverride = Number(
    m?.leap_days ?? m?.leap_day ?? m?.leapDays ?? NaN
  );

  if (leapOn && Number.isFinite(leapOverride) && leapOverride > 0) {
    return leapOverride;
  }
  return Number.isFinite(normal) && normal > 0 ? normal : 30;
}

function computeMoonCycleLength(moonCycle) {
  const values = safeArray(moonCycle?.values);
  const sum = values.reduce((acc, ph) => acc + Number(ph?.day_length || 0), 0);

  const raw = Number(moonCycle?.cycle_length);
  if (Number.isFinite(raw) && raw > 0) return raw;
  return sum;
}

function getMoonIconByAbsoluteDay(absDay, moonCycle) {
  const values = safeArray(moonCycle?.values);
  if (!values.length) return "";

  const cycleLen = computeMoonCycleLength(moonCycle);
  if (!cycleLen) return "";

  const pos = ((absDay % cycleLen) + cycleLen) % cycleLen;

  let acc = 0;
  for (const ph of values) {
    const len = Math.max(1, Number(ph?.day_length || 1));
    if (pos >= acc && pos < acc + len) return ph?.icon || "";
    acc += len;
  }
  return values[0]?.icon || "";
}

export default function CalendarView({ calendar, onClose }) {
  const months = safeArray(calendar?.months?.values);
  const seasons = safeArray(calendar?.seasons?.values);
  const moonCycle = calendar?.moon_cycle || null;

  const weekdayHeaders = useMemo(() => getWeekdayHeaders(calendar), [calendar]);
  const cols = weekdayHeaders.length || 7;

  const [nav, setNav] = useState({ monthIndex: 0, year: 0 });

  useEffect(() => {
    setNav({ monthIndex: 0, year: 0 });
  }, [calendar?.id]);

  const activeMonth = months[nav.monthIndex] || null;

  const leapCfg = calendar?.leap_year || null;
  const isLeapAt = (y) => {
    if (!leapCfg) return false;
    const s = Number(leapCfg?.leap_start);
    const i = Number(leapCfg?.leap_interval);
    if (!Number.isFinite(s) || !Number.isFinite(i) || i <= 0) return false;
    if (y < s) return false;
    return (y - s) % i === 0;
  };

  const isLeapYear = isLeapAt(nav.year);

  const daysInMonth = useMemo(() => {
    if (!activeMonth) return 30;
    return getDaysForMonth(activeMonth, isLeapYear);
  }, [activeMonth, isLeapYear]);

  const daysBeforeThisMonth = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < nav.monthIndex; i++) {
      sum += getDaysForMonth(months[i], isLeapYear);
    }
    return sum;
  }, [months, nav.monthIndex, isLeapYear]);

  const daysBeforeYears = useMemo(() => {
    let sum = 0;
    for (let y = 0; y < nav.year; y++) {
      const leap = isLeapAt(y);
      for (const m of months) sum += getDaysForMonth(m, leap);
    }
    return sum;
  }, [nav.year, months]);

  const monthAbsStart = daysBeforeYears + daysBeforeThisMonth;

  const moonIconByDay = useMemo(() => {
    const arr = [];
    for (let d = 1; d <= daysInMonth; d++) {
      arr[d] = getMoonIconByAbsoluteDay(monthAbsStart + (d - 1), moonCycle);
    }
    return arr;
  }, [daysInMonth, monthAbsStart, moonCycle]);

  const startOffset = ((monthAbsStart % cols) + cols) % cols;

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push({ type: "pad" });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ type: "day", d });

  const trailing = (cols - (cells.length % cols)) % cols;

  const seasonName = getSeasonName(
    seasons,
    activeMonth?.ordinal ?? nav.monthIndex + 1
  );

  return (
    <div className="bg-slate-950">
      <div className="px-4 py-3 border-b border-slate-800 flex justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-slate-400">
            {seasonName || "Season"}
          </p>
          <p className="text-sm font-semibold text-slate-100">
            {calendar?.name}{" "}
            <span className="text-slate-400">
              {calendar?.abbreviation ? `(${calendar.abbreviation})` : ""}
            </span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center"
        >
          <X className="w-4 h-4 text-slate-200" />
        </button>
      </div>

      {/* month nav */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <button
          onClick={() =>
            setNav((n) =>
              n.monthIndex > 0
                ? { ...n, monthIndex: n.monthIndex - 1 }
                : { monthIndex: months.length - 1, year: n.year - 1 }
            )
          }
          className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-950/60 items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-xs font-semibold text-slate-100">
          {activeMonth ? getMonthTitle(activeMonth) : "No Month"}{" "}
          <span className="text-slate-400">{nav.year}</span>
        </div>

        <button
          onClick={() =>
            setNav((n) =>
              n.monthIndex < months.length - 1
                ? { ...n, monthIndex: n.monthIndex + 1 }
                : { monthIndex: 0, year: n.year + 1 }
            )
          }
          className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 pt-3">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {weekdayHeaders.map((h, i) => (
            <div
              key={i}
              className="text-[11px] text-slate-400 text-center py-2"
            >
              {h}
            </div>
          ))}
        </div>

        <div
          className="grid gap-1 pb-4"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {cells.map((c, i) =>
            c.type === "pad" ? (
              <div
                key={i}
                className="h-10 border border-dashed border-slate-700/60 rounded-lg"
              />
            ) : (
              <div
                key={i}
                className="h-10 rounded-lg border border-slate-800 bg-slate-950/40 flex items-center justify-center text-xs text-slate-100 relative"
              >
                {moonIconByDay[c.d] && (
                  <img
                    src={moonIconByDay[c.d]}
                    className="absolute left-1 top-1 w-4 h-4"
                    alt=""
                  />
                )}
                {c.d}
              </div>
            )
          )}
          {Array.from({ length: trailing }).map((_, i) => (
            <div
              key={`t-${i}`}
              className="h-10 border border-dashed border-slate-700/60 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
