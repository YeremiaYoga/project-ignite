"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- helpers ---------------- */
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
    return days.map((d) => {
      const ab = String(d?.abbreviation || "").trim();
      const nm = String(d?.name || "").trim();
      return ab || (nm ? nm.slice(0, 2) : "--");
    });
  }
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
}

function isFinitePos(n) {
  return Number.isFinite(n) && n > 0;
}

/* ---------------- component ---------------- */
export default function CalendarView({
  calendar,
  selectedDay,
  onDaySelect, // ({ day, year, monthIndex, monthOrdinal, activeMonth })
}) {
  const months = safeArray(calendar?.months?.values);
  const seasons = safeArray(calendar?.seasons?.values);

  const weekdayHeaders = useMemo(() => getWeekdayHeaders(calendar), [calendar]);

  const cols = useMemo(() => {
    const n = weekdayHeaders.length;
    return Number.isFinite(n) && n > 0 ? n : 7;
  }, [weekdayHeaders]);

  // navigation (month + year)
  const [nav, setNav] = useState({ monthIndex: 0, year: 0 });

  const reducer = useMemo(() => {
    return (state, action) => {
      switch (action.type) {
        case "RESET":
          return { monthIndex: 0, year: 0 };
        case "NEXT": {
          const len = action.len || 0;
          if (!len) return state;
          if (state.monthIndex < len - 1)
            return { ...state, monthIndex: state.monthIndex + 1 };
          return { monthIndex: 0, year: state.year + 1 };
        }
        case "PREV": {
          const len = action.len || 0;
          if (!len) return state;
          if (state.monthIndex > 0)
            return { ...state, monthIndex: state.monthIndex - 1 };
          return { monthIndex: len - 1, year: state.year - 1 };
        }
        default:
          return state;
      }
    };
  }, []);

  const dispatch = (action) => setNav((prev) => reducer(prev, action));

  const monthIndex = nav.monthIndex;
  const year = nav.year;

  // reset on calendar change
  useEffect(() => {
    dispatch({ type: "RESET" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendar?.id]);

  const activeMonth = months[monthIndex] || null;

  const monthOrdinal = useMemo(() => {
    return Number(activeMonth?.ordinal ?? monthIndex + 1);
  }, [activeMonth, monthIndex]);

  const seasonName = useMemo(() => {
    return getSeasonName(seasons, monthOrdinal);
  }, [seasons, monthOrdinal]);

  // leap config
  const leapCfg = calendar?.leap_year || null;

  const isLeapAt = useMemo(() => {
    const cfg = leapCfg;
    return (y) => {
      if (!cfg || typeof cfg !== "object") return false;
      const ls = Number(cfg?.leap_start);
      const li = Number(cfg?.leap_interval);
      if (!Number.isFinite(ls) || !Number.isFinite(li) || li <= 0) return false;
      if (y < ls) return false;
      return (y - ls) % li === 0;
    };
  }, [leapCfg]);

  const isLeapYear = useMemo(() => isLeapAt(year), [isLeapAt, year]);

  const getDaysForMonth = (m, leapOn) => {
    const normal = Number(m?.days ?? 30);
    const leapOverrideRaw = m?.leap_days ?? m?.leap_day ?? m?.leapDays ?? null;
    const leapOverride = Number(leapOverrideRaw);

    const normalSafe = isFinitePos(normal) ? normal : 30;
    if (leapOn && isFinitePos(leapOverride)) return leapOverride;
    return normalSafe;
  };

  const daysInMonth = useMemo(() => {
    if (!activeMonth) return 30;
    return getDaysForMonth(activeMonth, isLeapYear);
  }, [activeMonth, isLeapYear]);

  // moon icons
  const moonPhases = safeArray(calendar?.moon_cycle?.values);

  const inMoonRange = (day, start, end, maxDay) => {
    const s = Number(start);
    const e = Number(end);
    if (!Number.isFinite(s) || !Number.isFinite(e)) return false;
    if (s <= e) return day >= s && day <= e;
    return (day >= s && day <= maxDay) || (day >= 1 && day <= e);
  };

  const moonIconByDay = useMemo(() => {
    const maxDay = Number(daysInMonth || 30);
    const arr = new Array(maxDay + 1).fill("");
    for (let d = 1; d <= maxDay; d++) {
      for (const ph of moonPhases) {
        if (inMoonRange(d, ph?.day_start, ph?.day_end, maxDay)) {
          arr[d] = String(ph?.icon || "");
          break;
        }
      }
    }
    return arr;
  }, [moonPhases, daysInMonth]);

  // weekday offset
  const baseStartIndex = 0;

  const daysBeforeThisMonth = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < monthIndex; i++) {
      sum += getDaysForMonth(months[i], isLeapYear);
    }
    return sum;
  }, [months, monthIndex, isLeapYear]);

  const totalDaysBeforeYears = useMemo(() => {
    let sum = 0;
    for (let y = 0; y < year; y++) {
      const leapOn = isLeapAt(y);
      let yearSum = 0;
      for (const m of months) yearSum += getDaysForMonth(m, leapOn);
      sum += yearSum;
    }
    return sum;
  }, [year, months, isLeapAt]);

  const startOffset = useMemo(() => {
    if (!cols) return 0;
    const totalDaysBefore = totalDaysBeforeYears + daysBeforeThisMonth;
    return (((baseStartIndex + totalDaysBefore) % cols) + cols) % cols;
  }, [cols, totalDaysBeforeYears, daysBeforeThisMonth]);

  const leadingPads = startOffset;

  const trailingPads = useMemo(() => {
    if (!cols) return 0;
    const used = (leadingPads + daysInMonth) % cols;
    return (cols - used) % cols;
  }, [cols, leadingPads, daysInMonth]);

  const goPrev = () => dispatch({ type: "PREV", len: months.length });
  const goNext = () => dispatch({ type: "NEXT", len: months.length });

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      {/* top */}
      <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-950/70 to-indigo-950/20">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              {seasonName || "Season"}
              {leapCfg && isLeapYear ? (
                <span className="ml-2 text-[10px] text-slate-500 normal-case">
                  (Leap Year)
                </span>
              ) : null}
            </p>

            <p className="text-base font-semibold text-slate-100 truncate">
              {calendar?.name || "Calendar"}{" "}
              {calendar?.abbreviation ? (
                <span className="text-slate-400 font-normal">
                  ({calendar.abbreviation})
                </span>
              ) : null}
            </p>
          </div>

          <span
            className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] border ${
              calendar?.private === true
                ? "border-slate-700 bg-slate-900/40 text-slate-300"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
            }`}
          >
            {calendar?.private === true ? "Private" : "Public"}
          </span>
        </div>
      </div>

      {/* month controls */}
      <div className="px-5 py-4 border-b border-slate-800">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="w-10 h-10 rounded-2xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center transition"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-slate-200" />
          </button>

          <div className="text-center min-w-0">
            <div className="text-sm font-semibold text-slate-100 truncate">
              {activeMonth ? getMonthTitle(activeMonth) : "No months"}
              <span className="text-slate-400 font-normal">{`  •  ${year}`}</span>
            </div>

            <div className="text-[11px] text-slate-500 mt-0.5">
              {activeMonth?.ordinal ? `Month #${activeMonth.ordinal}` : ""}
              {activeMonth ? `  •  ${daysInMonth} days` : ""}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="w-10 h-10 rounded-2xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center transition"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-slate-200" />
          </button>
        </div>
      </div>

      {/* grid */}
      <div className="px-5 pt-4 pb-5">
        <div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {weekdayHeaders.map((h, i) => (
            <div
              key={i}
              className="text-[11px] text-slate-400 text-center py-2 rounded-xl bg-slate-950/40 border border-slate-900/40"
              title={h}
            >
              {h}
            </div>
          ))}
        </div>

        <div
          className="grid gap-1.5 mt-1.5"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {/* leading pads (dashed) */}
          {Array.from({ length: leadingPads }).map((_, i) => (
            <div
              key={`lead-${i}`}
              className="h-11 rounded-2xl border border-dashed border-slate-600/50 bg-transparent"
              aria-hidden="true"
            />
          ))}

          {/* days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const isSelected = Number(selectedDay) === day;

            return (
              <button
                key={`day-${day}`}
                type="button"
                onClick={() =>
                  onDaySelect?.({
                    day,
                    year,
                    monthIndex,
                    monthOrdinal,
                    activeMonth,
                  })
                }
                className={[
                  "h-11 rounded-2xl border flex items-center justify-center text-[12px] transition relative",
                  isSelected
                    ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-100"
                    : "border-slate-800 bg-slate-950/40 text-slate-100 hover:bg-slate-900/40 hover:border-slate-700",
                ].join(" ")}
                title={`Day ${day}`}
              >
                {moonIconByDay[day] ? (
                  <img
                    src={moonIconByDay[day]}
                    alt="Moon phase"
                    className="absolute left-1.5 top-1.5 w-4 h-4 object-contain pointer-events-none"
                    draggable={false}
                  />
                ) : null}
                {day}
              </button>
            );
          })}

          {/* trailing pads (dashed) */}
          {Array.from({ length: trailingPads }).map((_, i) => (
            <div
              key={`trail-${i}`}
              className="h-11 rounded-2xl border border-dashed border-slate-600/50 bg-transparent"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
