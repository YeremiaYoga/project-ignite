"use client";

import { useState } from "react";

export default function RaceBuilder() {
  const [raceName, setRaceName] = useState("");
  const [handbook, setHandbook] = useState("");
  const [description, setDescription] = useState("");
  const [traitsInput, setTraitsInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const traitsArray = traitsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const raceData = {
      raceName,
      handbook,
      description,
      traits: traitsArray,
    };

    console.log("Race Data:", raceData);
    alert("Race data submitted! Check console.");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-2xl font-bold mb-4">Race Builder</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Race Name</label>
          <input
            type="text"
            value={raceName}
            onChange={(e) => setRaceName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Elf"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Handbook</label>
          <input
            type="text"
            value={handbook}
            onChange={(e) => setHandbook(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Player’s Handbook"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            placeholder="Describe the race..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Traits</label>
          <input
            type="text"
            value={traitsInput}
            onChange={(e) => setTraitsInput(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Darkvision, Keen Senses, Fey Ancestry"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition"
        >
          Save Race
        </button>
      </form>
    </div>
  );
}
