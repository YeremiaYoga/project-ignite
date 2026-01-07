"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Loader2, RefreshCw } from "lucide-react";

import CalendarView from "./components/CalendarView";
import DayEventPanel from "./components/DayEventPanel";
import EventCreateModal from "./components/EventCreateModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function safeArray(v) {
  return Array.isArray(v) ? v : [];
}

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, { credentials: "include", ...opts });
  const json = await res.json().catch(() => ({}));
  return { res, json };
}

export default function EventPage() {
  const [pageLoading, setPageLoading] = useState(true);

  const [calLoading, setCalLoading] = useState(false);
  const [calendars, setCalendars] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const selectedCalendar = useMemo(() => {
    if (!selectedId) return calendars[0] || null;
    return calendars.find((c) => String(c?.id) === String(selectedId)) || null;
  }, [calendars, selectedId]);

  // clicked day info (ONLY set when user clicks a day)
  const [selected, setSelected] = useState(null); 
  // { day, year, monthIndex, monthOrdinal }

  const [activeMonth, setActiveMonth] = useState(null);

  // events for selected day
  const [eventsLoading, setEventsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  // modal
  const [openCreate, setOpenCreate] = useState(false);

  async function loadCalendars() {
    setCalLoading(true);
    try {
      const { res, json } = await fetchJSON(`${API_BASE}/ignite/calendars`, {
        cache: "no-store",
      });

      if (!res.ok || !json?.success) {
        console.error("load calendars failed:", json);
        setCalendars([]);
        setSelectedId("");
        return;
      }

      const rows = safeArray(json?.data);
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

  async function loadEventsForDay({ calendarId, year, monthOrdinal, day }) {
    setEventsLoading(true);
    try {
      // adjust if your endpoint differs
      const url =
        `${API_BASE}/ignite/calendar-events` +
        `?calendar_id=${encodeURIComponent(calendarId)}` +
        `&year=${encodeURIComponent(year)}` +
        `&month=${encodeURIComponent(monthOrdinal)}` +
        `&day=${encodeURIComponent(day)}`;

      const { res, json } = await fetchJSON(url, { cache: "no-store" });

      if (!res.ok || !json?.success) {
        console.error("load events failed:", json);
        setEvents([]);
        return;
      }

      setEvents(safeArray(json?.data));
    } catch (e) {
      console.error(e);
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  }

  async function createEvent(payload) {
    try {
      const body = {
        ...payload,
        calendar_id: selectedCalendar?.id,
      };

      const { res, json } = await fetchJSON(`${API_BASE}/ignite/calendar-events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok || !json?.success) {
        console.error("create event failed:", json);
        alert(json?.message || "Failed to create event");
        return;
      }

      setOpenCreate(false);

      // reload for current selected day
      if (selectedCalendar?.id && selected) {
        await loadEventsForDay({
          calendarId: selectedCalendar.id,
          year: selected.year,
          monthOrdinal: selected.monthOrdinal,
          day: selected.day,
        });
      }
    } catch (e) {
      console.error(e);
      alert("Failed to create event");
    }
  }

  useEffect(() => {
    (async () => {
      setPageLoading(true);
      await loadCalendars();
      setPageLoading(false);
    })();
  }, []);

  // when calendar changes, reset selected + events
  useEffect(() => {
    setSelected(null);
    setActiveMonth(null);
    setEvents([]);
  }, [selectedId]);

  const handleDaySelect = async ({ day, year, monthIndex, monthOrdinal, activeMonth }) => {
    if (!selectedCalendar?.id) return;

    const next = { day, year, monthIndex, monthOrdinal };
    setSelected(next);
    setActiveMonth(activeMonth);

    await loadEventsForDay({
      calendarId: selectedCalendar.id,
      year,
      monthOrdinal,
      day,
    });
  };

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

      {/* main */}
      {pageLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5 text-sm text-slate-400">
          Loading…
        </div>
      ) : !selectedCalendar ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5">
          <p className="text-sm text-slate-200 font-semibold">
            No calendars found
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Create a calendar first, then come back here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <CalendarView
            calendar={selectedCalendar}
            selectedDay={selected?.day ?? null}
            onDaySelect={handleDaySelect}
          />

          {/* <DayEventPanel
            calendar={selectedCalendar}
            activeMonth={activeMonth}
            selected={
              selected
                ? {
                    year: selected.year,
                    monthOrdinal: selected.monthOrdinal,
                    day: selected.day,
                  }
                : null
            }
            events={safeArray(events)}
            loading={eventsLoading}
            onAddEvent={() => setOpenCreate(true)}
          /> */}

          <EventCreateModal
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            onSubmit={createEvent}
            calendar={selectedCalendar}
            selected={
              selected
                ? {
                    year: selected.year,
                    monthOrdinal: selected.monthOrdinal,
                    day: selected.day,
                  }
                : null
            }
            journals={[]} // fill later (owned journals)
          />
        </div>
      )}
    </div>
  );
}
