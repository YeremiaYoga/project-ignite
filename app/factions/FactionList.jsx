"use client";

import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import FactionCard from "./FactionCard";

import options from "@/data/factionsOptions.json";

const {
  groupTypeOptions,
  legalStandingOptions,
  ownershipOptions,
  goalOptions,
} = options;

export default function FactionList() {
  const [factions, setFactions] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [groupType, setGroupType] = useState("");
  const [legalStanding, setLegalStanding] = useState("");
  const [ownership, setOwnership] = useState("");
  const [goal, setGoal] = useState("");

  const [appliedFilter, setAppliedFilter] = useState({
    groupType: "",
    legalStanding: "",
    ownership: "",
    goal: "",
  });

  useEffect(() => {
    fetch("/api/factions/getAllData")
      .then((res) => res.json())
      .then((data) => setFactions(data));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredFactions = factions.filter((f) => {
    return (
      f.faction_name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (appliedFilter.groupType
        ? f.group_type === appliedFilter.groupType
        : true) &&
      (appliedFilter.legalStanding
        ? f.legal_standing === appliedFilter.legalStanding
        : true) &&
      (appliedFilter.ownership
        ? f.ownership === appliedFilter.ownership
        : true) &&
      (appliedFilter.goal && appliedFilter.goal.length > 0
        ? f.goal.some((g) => appliedFilter.goal.includes(g))
        : true)
    );
  });

  const handleApplyFilter = () => {
    setAppliedFilter({
      groupType,
      legalStanding,
      ownership,
      goal,
    });
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    setGroupType("");
    setLegalStanding("");
    setOwnership("");
    setGoal("");
    setAppliedFilter({
      groupType: "",
      legalStanding: "",
      ownership: "",
      goal: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg shadow px-3 py-2">
        <input
          type="text"
          placeholder="Search Factions..."
          className="flex-1 p-2 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none"
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

      {filteredFactions.length > 0 ? (
        filteredFactions.map((faction, idx) => (
          <FactionCard key={idx} faction={faction} />
        ))
      ) : (
        <p className="text-gray-400">No factions found.</p>
      )}
      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-xl border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4">
              Filter Options
            </h2>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <p className="text-gray-300 mb-2">Group Type:</p>
                <div className="flex flex-wrap gap-2">
                  {groupTypeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setGroupType(groupType === opt.value ? "" : opt.value)
                      }
                      className={`px-3 py-1 rounded-full border transition ${
                        groupType === opt.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-300 mb-2">Legal Standing:</p>
                <div className="flex flex-wrap gap-2">
                  {legalStandingOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setLegalStanding(
                          legalStanding === opt.value ? "" : opt.value
                        )
                      }
                      className={`px-3 py-1 rounded-full border transition ${
                        legalStanding === opt.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-300 mb-2">Ownership:</p>
                <div className="flex flex-wrap gap-2">
                  {ownershipOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setOwnership(ownership === opt.value ? "" : opt.value)
                      }
                      className={`px-3 py-1 rounded-full border transition ${
                        ownership === opt.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-300 mb-2">Goal:</p>
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setGoal(goal === opt.value ? "" : opt.value)
                      }
                      className={`px-3 py-1 rounded-full border transition ${
                        goal === opt.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      {opt.label}
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
