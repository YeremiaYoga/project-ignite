"use client";

import { useEffect, useState } from "react";
import RaceCard from "./RaceCard";

export default function RacesPage() {
  const [races, setRaces] = useState([]);
  const [filteredRaces, setFilteredRaces] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRaces() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/races`,
          { cache: "no-store" }
        );
        // const res = await fetch("/api/races/getAllDataRaces");
        const data = await res.json();

        setRaces(data);
        setFilteredRaces(data);
      } catch (err) {
        console.error("Failed to fetch races:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRaces();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === "") {
        setFilteredRaces(races);
      } else {
        setFilteredRaces(
          races.filter((race) =>
            race.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, races]);

  if (loading) {
    return <p className="p-6 text-white">Loading...</p>;
  }

  return (
    <div className="p-6 min-h-screen text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Races</h1>

        <input
          type="text"
          placeholder="Search race..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-64"
        />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredRaces.length > 0 ? (
          filteredRaces.map((race) => (
            <RaceCard key={race.name} race={race} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No races found
          </p>
        )}
      </div>
    </div>
  );
}
