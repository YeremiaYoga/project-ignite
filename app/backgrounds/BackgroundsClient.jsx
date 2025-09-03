"use client";

import { useState, useEffect } from "react";
import BackgroundList from "./BackgroundList";
import { Filter } from "lucide-react";

import options from "@/data/bgoptions.json";

const { tagsOptions, skillsOptions } = options;

export default function BackgroundsClient({ backgrounds }) {
  const [search, setSearch] = useState("");
  const [sourceCategory, setSourceCategory] = useState("");
  const [source, setSource] = useState("");
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);

  const [appliedFilter, setAppliedFilter] = useState({
    sourceCategory: "",
    source: "",
    skills: [],
    tags: [],
  });

  const [showFilter, setShowFilter] = useState(false);
  const [filtered, setFiltered] = useState(backgrounds);

  useEffect(() => {
    const delay = setTimeout(() => {
      console.log(appliedFilter);
      const result = backgrounds.filter((bg) => {
        return (
          bg.name.toLowerCase().includes(search.toLowerCase()) &&
          (appliedFilter.sourceCategory
            ? bg.source_category === appliedFilter.sourceCategory
            : true) &&
          (appliedFilter.source ? bg.source === appliedFilter.source : true) &&
          (appliedFilter.skills.length > 0
            ? appliedFilter.skills.every((s) =>
                bg.skill_proficiencies.some(
                  (sp) => sp.toLowerCase() === s.toLowerCase()
                )
              )
            : true) &&
          (appliedFilter.tags.length > 0
            ? appliedFilter.tags.every((t) => bg.tags?.includes(t))
            : true)
        );
      });

      setFiltered(result);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, appliedFilter, backgrounds]);

  const handleApplyFilter = () => {
    setAppliedFilter({
      sourceCategory,
      source,
      skills,
      tags,
    });
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    setSourceCategory("");
    setSource("");
    setSkills([]);
    setTags([]);
    setAppliedFilter({
      sourceCategory: "",
      source: "",
      skills: [],
      tags: [],
    });
  };

  const handleTagChange = (value) => {
    setTags((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const handleSkillChange = (value) => {
    setSkills((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-100">Backgrounds</h1>

      <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg shadow px-3 py-2">
        <input
          type="text"
          placeholder="Search Backgrounds..."
          className="flex-1 p-2 bg-gray-800 text-gray-100 focus:outline-none"
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

      <BackgroundList backgrounds={filtered} />

      {showFilter && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50 ">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-sm sm:max-w-2xl border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">
              Filters
            </h2>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <p className="text-gray-300 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {skillsOptions.map((skill) => (
                    <button
                      key={skill.value}
                      onClick={() => handleSkillChange(skill.value)}
                      className={`px-3 py-1 rounded-full border transition
                        ${
                          skills.includes(skill.value)
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                        }`}
                    >
                      {skill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-gray-300 mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {tagsOptions.map((tag) => (
                    <button
                      key={tag.value}
                      onClick={() => handleTagChange(tag.value)}
                      className={`px-3 py-1 rounded-full border transition
                        ${
                          tags.includes(tag.value)
                            ? "bg-orange-600 text-white border-orange-600"
                            : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                        }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleResetFilter}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilter}
                className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
              >
                Apply
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
