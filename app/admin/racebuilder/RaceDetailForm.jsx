"use client";

import { useState, useEffect } from "react";
import RaceDetailFormContent from "./RaceDetailFormContent";

export default function RaceDetailForm() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/races/getAllRace")
      .then((res) => res.json())
      .then((data) => setFolders(data))
      .catch((err) => console.error("Error loading race folders:", err));
  }, []);

  const filteredFolders = folders.filter((folder) =>
    folder.replace(/_/g, " ").toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectFolder = (folder) => {
    setSelectedFolder(folder);
    setQuery(
      folder.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
    setIsOpen(false);
  };

  const formattedSelectedName = selectedFolder
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="relative">
      <label className="block mb-2 text-white font-medium">Select Race</label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
            setSelectedFolder("");
          }}
          placeholder="Choose Race"
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg border border-gray-700">
            {filteredFolders.length === 0 ? (
              <div className="px-3 py-2 text-gray-400">No races found.</div>
            ) : (
              <ul>
                {filteredFolders.map((folder) => (
                  <li
                    key={folder}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleSelectFolder(folder)}
                  >
                    {folder
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {selectedFolder && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-white mb-2">
            Selected Race: {formattedSelectedName}
          </h3>
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
