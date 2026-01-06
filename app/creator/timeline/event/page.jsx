// app/creator/timeline/event/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Loader2, RefreshCw } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

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

/* ---------------- UI: Calendar Preview ---------------- */
function CalendarPreviewInline({ calendar }) {
  const months = safeArray(calendar?.months?.values);
  const seasons = safeArray(calendar?.seasons?.values);

  const [monthIndex, setMonthIndex] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    setMonthIndex(0);
    setYear(0);
  }, [calendar?.id]);

  const activeMonth = months[monthIndex] || null;

  const weekdayHeaders = useMemo(() => getWeekdayHeaders(calendar), [calendar]);

  const cols = useMemo(() => {
    const n = weekdayHeaders.length;
    return Number.isFinite(n) && n > 0 ? n : 7;
  }, [weekdayHeaders]);

  const daysInMonth = useMemo(() => {
    const d = Number(activeMonth?.days ?? 30);
    return Number.isFinite(d) && d > 0 ? d : 30;
  }, [activeMonth]);

  const seasonName = useMemo(() => {
    const ord = Number(activeMonth?.ordinal ?? monthIndex + 1);
    return getSeasonName(seasons, ord);
  }, [seasons, activeMonth, monthIndex]);

  const gridCells = useMemo(() => {
    const cells = [];
    for (let i = 1; i <= daysInMonth; i++) cells.push(i);
    return cells;
  }, [daysInMonth]);

  const trailingPads = useMemo(() => {
    const remainder = gridCells.length % cols;
    return (cols - remainder) % cols;
  }, [gridCells, cols]);

  const goPrev = () => {
    if (!months.length) return;
    setMonthIndex((p) => {
      if (p > 0) return p - 1;
      setYear((y) => y - 1);
      return months.length - 1;
    });
  };

  const goNext = () => {
    if (!months.length) return;
    setMonthIndex((p) => {
      if (p < months.length - 1) return p + 1;
      setYear((y) => y + 1);
      return 0;
    });
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      {/* top */}
      <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-950/70 to-indigo-950/20">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              {seasonName || "Season"}
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
              {activeMonth?.days ? `  •  ${activeMonth.days} days` : ""}
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
          {gridCells.map((day) => (
            <div
              key={day}
              className="h-11 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-center justify-center text-[12px] text-slate-100 hover:bg-slate-900/40 hover:border-slate-700 transition"
              title={`Day ${day}`}
            >
              {day}
            </div>
          ))}

          {Array.from({ length: trailingPads }).map((_, i) => (
            <div
              key={`pad-${i}`}
              className="h-11 rounded-2xl border border-slate-900/30 bg-transparent"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
export default function EventPage() {
  const [pageLoading, setPageLoading] = useState(true);

  const [calLoading, setCalLoading] = useState(false);
  const [calendars, setCalendars] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const selectedCalendar = useMemo(() => {
    if (!selectedId) return calendars[0] || null;
    return calendars.find((c) => String(c?.id) === String(selectedId)) || null;
  }, [calendars, selectedId]);

  async function loadCalendars() {
    setCalLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ignite/calendars`, {
        cache: "no-store",
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        console.error("load calendars failed:", json);
        setCalendars([]);
        setSelectedId("");
        return;
      }

      const rows = Array.isArray(json?.data) ? json.data : [];
      setCalendars(rows);

      if (rows.length > 0) {
        setSelectedId((prev) => (prev ? prev : String(rows[0].id)));
      } else {
        setSelectedId("");
      }
    } catch (e) {
      console.error(e);
      setCalendars([]);
      setSelectedId("");
    } finally {
      setCalLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      setPageLoading(true);
      await loadCalendars();
      setPageLoading(false);
    })();
  }, []);

  return (
    <div className="h-full w-full p-4 md:p-8 space-y-4">
      {/* header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-slate-200" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Creator Panel
          </p>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
            Events
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={loadCalendars}
            disabled={calLoading}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs text-slate-200 disabled:opacity-60"
            aria-label="Refresh calendars"
            title="Refresh"
          >
            {calLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Refresh
              </>
            )}
          </button>
        </div>
      </div>

      {/* selector */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            disabled={calLoading || calendars.length === 0}
            className="w-full md:w-[520px] rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40 disabled:opacity-60"
          >
            {calendars.length === 0 ? (
              <option value="">No calendars</option>
            ) : (
              calendars.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {(c?.name || "Untitled") +
                    (c?.abbreviation ? ` (${c.abbreviation})` : "")}
                </option>
              ))
            )}
          </select>

          <div className="md:ml-auto text-[12px] text-slate-500">
            {calLoading
              ? "Loading…"
              : calendars.length > 0
              ? `${calendars.length} calendars`
              : "0 calendars"}
          </div>
        </div>
      </div>

      {/* preview */}
      {pageLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5 text-sm text-slate-400">
          Loading…
        </div>
      ) : !selectedCalendar ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5">
          <p className="text-sm text-slate-200 font-semibold">No calendars found</p>
          <p className="text-sm text-slate-400 mt-1">
            Create a calendar first, then come back here.
          </p>
        </div>
      ) : (
        <CalendarPreviewInline calendar={selectedCalendar} />
      )}
    </div>
  );
}
