"use client";

import { useState, useEffect, useCallback } from "react";
import CombatStyleCard from "./CombatStyleCard";

export default function IncumbencyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [allIncumbency, setAllIncumbency] = useState([]);

  const fetchAllIncumbency = useCallback(async () => {
    try {
      const res = await fetch("/api/incumbency/getAllData", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log(data);

      setAllIncumbency(Array.isArray(data) ? data : []);
      if ((data?.length ?? 0) > 0) {
        setSelected((prev) => prev ?? data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch incumbency:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllIncumbency();
  }, [fetchAllIncumbency]);

  const filtered = allIncumbency.filter((style) =>
    (style.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050b26] flex text-white w-full max-w-6xl">
      <aside className="w-1/3 max-w-[300px] border-r border-[#2a2f55] p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-[#0a1040] text-white placeholder-gray-400 border border-[#2a2f55] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#6670ff]"
          />
          <button
            onClick={() => console.log("Filter clicked")}
            className="bg-[#101858] border border-[#2a2f55] hover:bg-[#1c2b7a] text-white px-3 py-2 rounded-md transition flex items-center justify-center"
            title="Filter"
          >
            <span className="text-sm font-semibold">☰</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {filtered.map((style) => (
            <div
              key={style.name}
              onClick={() => setSelected(style)}
              className={`p-3 rounded-md border border-[#2a2f55] cursor-pointer transition ${
                selected?.name === style.name
                  ? "bg-[#1c2b7a]"
                  : "bg-[#0a1040] hover:bg-[#101858]"
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={style.img || "/assets/default.png"}
                  alt={style.name}
                  className="w-10 h-10 rounded-md object-cover border border-[#2a2f55]"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{style.name}</p>
                  <p className="text-xs text-gray-400">{style.role}</p>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-10">
              No results found.
            </p>
          )}
        </div>
      </aside>

      <main className="flex-1 flex justify-center items-start p-10">
        {selected ? (
          <CombatStyleCard data={selected} />
        ) : (
          <p className="text-gray-400 text-lg">Select one</p>
        )}
      </main>
    </div>
  );
}
