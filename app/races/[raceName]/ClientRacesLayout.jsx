"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientRacesLayout({ children, currentRace }) {
  const [showRaces, setShowRaces] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [races, setRaces] = useState([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchRaces() {
      try {
        const res = await fetch("/api/races/getAllRace");
        if (!res.ok) throw new Error("Failed to fetch races");
        const data = await res.json();
        setRaces(data);
      } catch {
        setRaces([]);
      }
    }

    fetchRaces();
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      {children}
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50">
        {currentRace && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-4 py-2 rounded-full shadow-lg text-center capitalize"
            onClick={() => setShowDetail((prev) => !prev)}
          >
            {showDetail ? "Close" : `${currentRace.replace(/_/g, " ")}`}
          </button>
        )}

        <button
          onClick={() => setShowRaces((prev) => !prev)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-4 py-2 rounded-full shadow-lg"
        >
          {showRaces ? "Close" : "Races"}
        </button>
      </div>
      {showDetail && currentRace && (
        <div className="fixed bottom-36 left-6 w-60 bg-gray-800 border border-gray-700 rounded-xl p-4 z-40 shadow-2xl">
          <h3 className="text-sm font-semibold text-orange-400 mb-2 uppercase">
            {currentRace.replace(/_/g, " ")}
          </h3>
          <ul className="space-y-2">
            <li className="text-blue-400">
              <a href={`#`}>
                {currentRace
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (s) => s.toUpperCase())}
              </a>
            </li>
            <li className="text-blue-400">
              <a href={`#${currentRace}_traits`}>
                {currentRace
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (s) => s.toUpperCase())}{" "}
                Traits
              </a>
            </li>
          </ul>
        </div>
      )}
      {showRaces && races.length > 0 && (
        <div className="fixed bottom-36 left-6 w-60 bg-gray-800 border border-gray-700 rounded-xl p-4 z-40 max-h-[60vh] overflow-y-auto shadow-2xl">
          <h3 className="text-sm font-semibold text-orange-400 mb-2 uppercase">
            Races
          </h3>
          <ul className="space-y-2">
            {races.map((raceName) => (
              <li key={raceName}>
                <Link
                  href={`/races/${raceName}`}
                  className={`text-blue-400 hover:text-blue-200 flex items-center gap-2 transition capitalize ${
                    currentRace === raceName ? "font-bold" : ""
                  }`}
                >
                  {raceName.replace(/_/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
