"use client";

import { useState, useEffect } from "react";
import RaceDetailFormContent from "./RaceDetailFormContent";

export default function RaceDetailForm() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");

  useEffect(() => {
    fetch("/api/races/getAllRace")
      .then((res) => res.json())
      .then((data) => setFolders(data))
      .catch((err) => console.error("Error loading race folders:", err));
  }, []);

  return (
    <div>
      <label className="block mb-2 text-white font-medium">
        Select Race Races
      </label>
      <select
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value)}
        className="w-full px-3 py-2 mb-4 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Choose Race</option>
        {folders.map((folder) => (
          <option key={folder} value={folder}>
            {folder.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </option>
        ))}
      </select>

      {selectedFolder && (
        <div>
          <RaceDetailFormContent
            selectedFolder={selectedFolder}
            onSubmit={(data) => {
              console.log("Save to folder:", selectedFolder, data);
            }}
          />
        </div>
      )}
    </div>
  );
}
