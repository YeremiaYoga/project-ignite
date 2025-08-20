"use client";

import { useState } from "react";
import BackgroundList from "./BackgroundList"; // 👉 gunakan ini

export default function BackgroundsClient({ backgrounds }) {
  const [search, setSearch] = useState("");
  const [sourceCategory, setSourceCategory] = useState("");
  const [source, setSource] = useState("");
  const [skills, setSkills] = useState("");
  const [tags, setTags] = useState("");

  const [appliedFilter, setAppliedFilter] = useState({
    sourceCategory: "",
    source: "",
    skills: "",
    tags: "",
  });

  const filtered = backgrounds.filter((bg) => {
    return (
      bg.name.toLowerCase().includes(search.toLowerCase()) &&
      (appliedFilter.sourceCategory
        ? bg.source_category === appliedFilter.sourceCategory
        : true) &&
      (appliedFilter.source ? bg.source === appliedFilter.source : true) &&
      (appliedFilter.skills
        ? bg.skill_proficiencies.includes(appliedFilter.skills)
        : true) &&
      (appliedFilter.tags ? bg.tags?.includes(appliedFilter.tags) : true)
    );
  });

  const handleApplyFilter = () => {
    setAppliedFilter({
      sourceCategory,
      source,
      skills,
      tags,
    });
  };

  const handleResetFilter = () => {
    setSourceCategory("");
    setSource("");
    setSkills("");
    setTags("");
    setAppliedFilter({
      sourceCategory: "",
      source: "",
      skills: "",
      tags: "",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-100">Backgrounds</h1>

      {/* <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg shadow">
        <input
          type="text"
          placeholder="🔍 Search Background Names..."
          className="w-full p-3 border rounded-lg bg-gray-800 text-gray-100 border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}

      <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Source Category"
            className="p-2 border rounded bg-gray-800 text-gray-100 border-gray-600"
            value={sourceCategory}
            onChange={(e) => setSourceCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Source"
            className="p-2 border rounded bg-gray-800 text-gray-100 border-gray-600"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Skills"
            className="p-2 border rounded bg-gray-800 text-gray-100 border-gray-600"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags"
            className="p-2 border rounded bg-gray-800 text-gray-100 border-gray-600"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          /> */}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleApplyFilter}
            className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
          >
            Apply Filter
          </button>
          {/* <button
            onClick={handleResetFilter}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
          >
            Reset
          </button> */}
        </div>
      </div>

      <BackgroundList backgrounds={filtered} />
    </div>
  );
}
