"use client";

import { useEffect, useState, useMemo, useCallback } from "react";

export default function editSelector({ onSelect }) {
  const [all, setAll] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch("/api/incumbency/getAllData", { cache: "no-store" });
      const data = await res.json();
      setAll(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch incumbency:", err);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return all.filter(
      (x) =>
        (x.name || "").toLowerCase().includes(q) ||
        (x.role || "").toLowerCase().includes(q)
    );
  }, [all, search]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-lg">
      <div className="mb-3 flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or role"
          className="flex-1 bg-[#0a1040] text-white placeholder-gray-400 border border-[#2a2f55] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#6670ff]"
        />
      </div>

      <div className="grid gap-2 max-h-[420px] overflow-y-auto">
        {filtered.map((it) => (
          <button
            key={`${it.name}-${it.version ?? "v"}`}
            onClick={() => onSelect(it)}
            className="flex items-center gap-3 text-left rounded-md border border-[#2a2f55] p-3 bg-[#0a1040] hover:bg-[#101858] transition"
          >
            <img
              src={it.img || "/assets/default.png"}
              alt={it.name}
              className="w-10 h-10 rounded-md object-cover border border-[#2a2f55]"
            />
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-xs text-gray-400 capitalize">
                {it.role} {it.version ? `• v${it.version}` : ""}
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-400">No results</p>
        )}
      </div>
    </section>
  );
}
