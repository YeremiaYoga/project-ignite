"use client";

import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import FactionCard from "./FactionCard";

export default function FactionList() {
  const [factions, setFactions] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetch("/api/factions/getAllData")
      .then((res) => res.json())
      .then((data) => setFactions(data));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredFactions = factions.filter((f) =>
    f.faction_name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg shadow px-3 py-2">
        <input
          type="text"
          placeholder="Search Factions..."
          className="flex-1 p-2 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowFilter(true)}
          className="ml-3 p-2 rounded-lg text-orange-500 hover:bg-gray-700"
        >
          <Filter size={20} />
        </button>
      </div>

      {filteredFactions.length > 0 ? (
        filteredFactions.map((faction, idx) => (
          <FactionCard key={idx} faction={faction} />
        ))
      ) : (
        <p className="text-gray-400">No factions found.</p>
      )}

      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-bold text-white mb-4">
              Filter Options
            </h2>
            <button
              onClick={() => setShowFilter(false)}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
