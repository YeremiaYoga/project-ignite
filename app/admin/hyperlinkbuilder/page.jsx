"use client";

import { useState, useEffect } from "react";
import HyperlinkTable from "./HyperlinkTable";

export default function Page() {
  const [activeFile, setActiveFile] = useState("universal");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hyperlinks/${activeFile}`);
      const json = await res.json();
      setData(json);
    } catch {
      setData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeFile]);

  return (
    <div className="p-6 mx-auto w-full max-w-5xl">
      <div className="flex mb-6 justify-center">
        {[
          "universal",
          "classes",
          "races",
          "spells",
          "backgrounds",
          "feats",
          "factions",
        ].map((file, index, arr) => (
          <button
            key={file}
            className={`px-6 py-3 text-lg font-semibold transition ${
              activeFile === file
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            } ${
              index === 0
                ? "rounded-l-lg"
                : index === arr.length - 1
                ? "rounded-r-lg"
                : "rounded-none"
            } -ml-px`}
            onClick={() => setActiveFile(file)}
          >
            {file.charAt(0).toUpperCase() + file.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full">
        {loading ? (
          <p className="text-white">Loading {activeFile}.json...</p>
        ) : (
          <HyperlinkTable
            initialData={data}
            activeFile={activeFile}
            reload={loadData}
          />
        )}
      </div>
    </div>
  );
}
