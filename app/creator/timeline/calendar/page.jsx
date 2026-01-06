"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Lock,
  Globe,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

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

  // fallback only if days not configured
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
}

function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[720px] rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function CalendarPreview({ calendar, onClose }) {
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


  const baseStartIndex = 0;

  const monthDaysArr = useMemo(() => {
    return months.map((m) => {
      const d = Number(m?.days ?? 30);
      return Number.isFinite(d) && d > 0 ? d : 30;
    });
  }, [months]);

  const yearDays = useMemo(() => {
    return monthDaysArr.reduce((a, b) => a + b, 0) || 0;
  }, [monthDaysArr]);

  const daysBeforeThisMonth = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < monthIndex; i++) sum += monthDaysArr[i] ?? 0;
    return sum;
  }, [monthIndex, monthDaysArr]);

  const mod = (n, m) => ((n % m) + m) % m;

  const startOffset = useMemo(() => {
    if (!cols) return 0;
    // total days passed since month 0 year 0
    const totalDaysBefore =
      (yearDays ? year * yearDays : 0) + daysBeforeThisMonth;
    return mod(baseStartIndex + totalDaysBefore, cols);
  }, [cols, year, yearDays, daysBeforeThisMonth]);

  const leadingPads = startOffset;

  const allCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < leadingPads; i++)
      cells.push({ kind: "pad", key: `lead-${i}` });
    for (let d = 1; d <= daysInMonth; d++)
      cells.push({ kind: "day", day: d, key: `day-${d}` });
    return cells;
  }, [leadingPads, daysInMonth]);

  const trailingPads = useMemo(() => {
    if (!cols) return 0;
    const rem = allCells.length % cols;
    return (cols - rem) % cols;
  }, [allCells, cols]);

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
    <div className="bg-slate-950">
      {/* top bar */}
      <div className="px-4 py-3 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-900">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-slate-400">
              {seasonName || "Season"}
            </p>
            <p className="text-sm font-semibold text-slate-100 truncate">
              {calendar?.name || "Calendar"}{" "}
              <span className="text-slate-400 font-normal">
                {calendar?.abbreviation ? `(${calendar.abbreviation})` : ""}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center"
            title="Close"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-slate-200" />
          </button>
        </div>
      </div>

      {/* month header */}
      <div className="px-4 py-3 border-b border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center"
            title="Previous Month"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4 text-slate-200" />
          </button>

          <div className="text-center min-w-0">
            <div className="text-xs font-semibold text-slate-100 tracking-wide truncate">
              {activeMonth ? getMonthTitle(activeMonth) : "No months"}
              <span className="text-slate-400 font-normal">{`  ${year}`}</span>
            </div>
            <div className="text-[11px] text-slate-500">
              {activeMonth?.ordinal ? `Month ${activeMonth.ordinal}` : ""}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 flex items-center justify-center"
            title="Next Month"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4 text-slate-200" />
          </button>
        </div>
      </div>

      {/* weekday header + grid */}
      <div className="px-4 pt-3">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {weekdayHeaders.map((h, i) => (
            <div
              key={i}
              className="text-[11px] text-slate-400 text-center py-2"
              title={h}
            >
              {h}
            </div>
          ))}
        </div>

        <div
          className="grid gap-1 pb-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {allCells.map((cell) =>
            cell.kind === "pad" ? (
              <div
                key={cell.key}
                className="h-10 rounded-lg border border-dashed border-slate-700/60 bg-transparent"
                aria-hidden="true"
              />
            ) : (
              <div
                key={cell.key}
                className="h-10 rounded-lg border border-slate-800 bg-slate-950/40 flex items-center justify-center text-xs text-slate-100 hover:bg-slate-900/40 transition"
                title={`Day ${cell.day}`}
              >
                {cell.day}
              </div>
            )
          )}

          {Array.from({ length: trailingPads }).map((_, i) => (
            <div
              key={`trail-${i}`}
              className="h-10 rounded-lg border border-dashed border-slate-700/60 bg-transparent"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/70">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            {calendar?.share_id ? `Share ID: ${calendar.share_id}` : ""}
          </div>
          <div className="text-[11px] text-slate-500">
            {calendar?.private === true ? "Private" : "Public"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalendarListPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const [calendarLimit, setCalendarLimit] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ignite/calendars`, {
        cache: "no-store",
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        console.error("load calendars failed:", json);
        setRows([]);
        return;
      }

      setRows(Array.isArray(json?.data) ? json.data : []);
    } catch (e) {
      console.error(e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadLimit() {
    try {
      const res = await fetch(`${API_BASE}/users/me`, {
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      const lim = json?.user?.calendar_limit ?? json?.user?.era_limit ?? null;
      setCalendarLimit(typeof lim === "number" ? lim : null);
    } catch (e) {
      console.warn("load limit error:", e);
      setCalendarLimit(null);
    }
  }

  async function onDelete(id) {
    const ok = confirm("Delete this calendar? This action cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/ignite/calendars/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        console.error("delete calendar failed:", json);
        alert(json?.message || "Failed to delete calendar");
        return;
      }

      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete calendar");
    }
  }

  function onView(row) {
    setViewItem(row || null);
    setViewOpen(true);
  }

  useEffect(() => {
    load();
    loadLimit();
  }, []);

  const ownedRows = rows.filter((r) => r?.is_owner === true || r?.creator_id);

  const usedSlots = ownedRows.length;
  const totalSlots = typeof calendarLimit === "number" ? calendarLimit : 0;
  const isLimited = typeof calendarLimit === "number";
  const remainingSlots = isLimited
    ? Math.max(0, totalSlots - usedSlots)
    : 999999;
  const isLimitReached = isLimited && usedSlots >= totalSlots;

  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return "-";
    }
  };

  return (
    <div className="h-full w-full p-4 md:p-6 space-y-4">
      <Modal
        open={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setViewItem(null);
        }}
      >
        <CalendarPreview
          calendar={viewItem}
          onClose={() => {
            setViewOpen(false);
            setViewItem(null);
          }}
        />
      </Modal>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-slate-500">
            Creator Panel
          </p>
          <h1 className="text-xl font-semibold text-slate-100 mt-1">
            Calendars
          </h1>
        </div>

        <div className="rounded-2xl bg-slate-950/40 p-3 md:p-4 w-full md:w-auto">
          <div className="flex items-center md:flex-col md:items-center gap-3 md:gap-2">
            <div className="flex-1 md:flex-none">
              <p className="text-[11px] uppercase tracking-widest text-slate-500">
                Slots
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {isLimited ? `${usedSlots} / ${totalSlots} used` : "Unlimited"}
              </p>
            </div>

            <div className="flex-1 md:flex-none flex justify-end md:justify-center">
              {isLimited ? (
                <div className="flex gap-2 flex-wrap justify-end md:justify-center">
                  {[...Array(totalSlots)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all duration-200 ${
                        i < usedSlots
                          ? "bg-indigo-600 border-indigo-600"
                          : "bg-transparent border-slate-600"
                      }`}
                      title={i < usedSlots ? "Used" : "Available"}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Unlimited</p>
              )}
            </div>
          </div>

          {isLimited && remainingSlots <= 0 && (
            <p className="text-xs text-red-400 mt-2">
              You have reached your calendar limit.
            </p>
          )}
        </div>

        <div className="flex items-center justify-end md:justify-start">
          {isLimitReached ? (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs cursor-not-allowed w-full md:w-auto justify-center"
              title="Calendar limit reached"
            >
              <Plus className="w-4 h-4" />
              Add Calendar
            </button>
          ) : (
            <Link
              href="/creator/timeline/calendar/create"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs w-full md:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              Add Calendar
            </Link>
          )}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-indigo-950/20">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">Manage</p>
              <p className="text-sm font-semibold text-slate-100">
                Calendar Table
              </p>
            </div>

            <div className="text-xs text-slate-400">
              {loading ? "Loading..." : `${rows.length} items`}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950/60">
              <tr className="text-[11px] text-slate-400">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Abbreviation</th>
                <th className="px-5 py-3 font-medium">Share ID</th>
                <th className="px-5 py-3 font-medium">Visibility</th>
                <th className="px-5 py-3 font-medium">Updated</th>
                <th className="px-5 py-3 font-medium w-[320px]">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {!loading && rows.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-sm text-slate-400" colSpan={6}>
                    No calendars found.
                  </td>
                </tr>
              ) : (
                rows.map((r) => {
                  const isPrivate = r?.private === true;
                  return (
                    <tr
                      key={r.id}
                      className="text-xs text-slate-200 hover:bg-slate-950/50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-100">
                          {r.name || "-"}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-300">
                        {r.abbreviation || "-"}
                      </td>

                      <td className="px-5 py-4 text-slate-300">
                        {r.share_id || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <div className="inline-flex items-center gap-2">
                          {isPrivate ? (
                            <>
                              <Lock className="w-4 h-4 text-slate-300" />
                              <span className="text-slate-300">Private</span>
                            </>
                          ) : (
                            <>
                              <Globe className="w-4 h-4 text-emerald-300" />
                              <span className="text-emerald-200">Public</span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {r.updated_at ? fmtDate(r.updated_at) : "-"}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onView(r)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
                            title="View preview"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>

                          <Link
                            href={`/creator/timeline/calendar/update/${r.id}`}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => onDelete(r.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 text-xs text-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="px-5 py-4 text-xs text-slate-400 border-t border-slate-800">
            Loading...
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-400">
            Loading...
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-400">
            No calendars found.
          </div>
        ) : (
          rows.map((r) => {
            const isPrivate = r?.private === true;

            return (
              <div
                key={r.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-100 truncate">
                        {r.name || "-"}
                      </p>

                      <p className="text-[11px] text-slate-500 mt-1">
                        Abbr:{" "}
                        <span className="text-slate-300">
                          {r.abbreviation || "-"}
                        </span>
                      </p>

                      <p className="text-[11px] text-slate-500 mt-1">
                        Share ID:{" "}
                        <span className="text-slate-300">
                          {r.share_id || "-"}
                        </span>
                      </p>

                      <p className="text-[11px] text-slate-500 mt-1">
                        Visibility:{" "}
                        <span
                          className={
                            isPrivate ? "text-slate-300" : "text-emerald-200"
                          }
                        >
                          {isPrivate ? "Private" : "Public"}
                        </span>
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500 text-right shrink-0">
                      <div>Updated</div>
                      <div className="text-slate-300">
                        {r.updated_at ? fmtDate(r.updated_at) : "-"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => onView(r)}
                      className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>

                    <Link
                      href={`/creator/timeline/calendar/update/${r.id}`}
                      className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-xs"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDelete(r.id)}
                      className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 text-xs text-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
