"use client";

import { useMemo } from "react";
import { Plus, CalendarClock } from "lucide-react";

function getMonthTitle(month) {
  const name = month?.name || "Month";
  const abbr = month?.abbreviation ? ` (${month.abbreviation})` : "";
  return `${name}${abbr}`;
}

export default function DayEventPanel({
  calendar,
  activeMonth,
  selected, // { year, monthOrdinal, day }
  events,
  loading,
  onAddEvent,
}) {
  const title = useMemo(() => {
    if (!selected) return "";
    const m = activeMonth ? getMonthTitle(activeMonth) : "Month";
    return `Events • ${m} • Day ${selected.day} • Year ${selected.year}`;
  }, [selected, activeMonth]);

  if (!selected) return null; // ✅ only show after day is clicked

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Day Events
          </p>
          <p className="text-sm font-semibold text-slate-100 truncate">{title}</p>
          <p className="text-[12px] text-slate-500 mt-0.5 truncate">
            {calendar?.name || "Calendar"}
            {calendar?.abbreviation ? ` (${calendar.abbreviation})` : ""}
          </p>
        </div>

        <button
          type="button"
        //   onClick={onAddEvent}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl text-xs transition border border-emerald-500/30 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/15"
          aria-label="Add event"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-400">
            Loading events…
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700/70 bg-transparent p-6 text-center">
            <div className="mx-auto w-10 h-10 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-slate-300" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-200">
              No events for this day
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Click <span className="text-emerald-200">Add Event</span> to create
              one.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 hover:bg-slate-900/40 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-center justify-center overflow-hidden shrink-0">
                    {ev?.icon ? (
                      <img
                        src={ev.icon}
                        alt="event icon"
                        className="w-6 h-6 object-contain"
                        draggable={false}
                      />
                    ) : (
                      <CalendarClock className="w-5 h-5 text-slate-300" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-100 truncate">
                        {ev.title || "Untitled"}
                      </p>

                      <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-800 bg-slate-950/60 text-slate-300">
                        {ev.type || "event"}
                      </span>

                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full border ${
                          ev.private
                            ? "border-slate-700 bg-slate-900/40 text-slate-300"
                            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                        }`}
                      >
                        {ev.private ? "Private" : "Public"}
                      </span>
                    </div>

                    {ev.content ? (
                      <p className="text-sm text-slate-300 mt-1 whitespace-pre-wrap">
                        {ev.content}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-500 mt-1">
                        No description
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
