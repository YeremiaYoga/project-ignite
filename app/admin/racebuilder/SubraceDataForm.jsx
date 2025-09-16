"use client";

import { useState, useEffect } from "react";
import SubraceDataFormContent from "./SubraceDataFormContent";

export default function SubraceDetailForm() {
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

  const formatFolderName = (name) =>
    name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const filteredFolders = folders.filter((folder) =>
    folder.replace(/_/g, " ").toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectFolder = (folder) => {
    setSelectedFolder(folder);
    setQuery(formatFolderName(folder));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block mb-2 text-white font-medium">Select Race</label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedFolder("");
          }}
          onClick={() => setIsOpen(true)}
          placeholder="Choose Race"
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg border border-gray-700 max-h-60 overflow-y-auto">
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
                    {formatFolderName(folder)}
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
            Selected Race: {formatFolderName(selectedFolder)}
          </h3>
          <SubraceDataFormContent
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
