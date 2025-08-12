"use client";

import { useState } from "react";

export default function RaceDataForm() {
  const [raceName, setRaceName] = useState("");
  const [handbook, setHandbook] = useState("");
  const [description, setDescription] = useState("");
  const [traitsInput, setTraitsInput] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
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

    try {
      const res = await fetch("/api/racebuilder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(raceData),
      });

      if (!res.ok) {
        const errText = await res.text();
        setError(`Error: ${errText}`);
        setMessage("");
        return;
      }

      const data = await res.json();
      setMessage(data.message || "Race saved successfully.");
      setError("");

      setRaceName("");
      setHandbook("");
      setDescription("");
      setTraitsInput("");
    } catch (err) {
      setError("Network or server error");
      setMessage("");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block font-semibold mb-1">Race Name</label>
        <input
          type="text"
          value={raceName}
          onChange={(e) => setRaceName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="e.g. Elf"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Source</label>
        <input
          type="text"
          value={handbook}
          onChange={(e) => setHandbook(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="e.g. Player’s Handbook"
          required
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
          required
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
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition"
      >
        Save Race
      </button>

      {/* {message && <p className="mt-4 text-green-400">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>} */}
    </form>
  );
}
