"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import CombatStyleCard from "./CombatStyleCard";
import * as Slider from "@radix-ui/react-slider";

const ROLE_OPTIONS = [
  "support",
  "tank",
  "debuffer",
  "sustain",
  "shielder",
  "utility",
  "specialist",
  "damage dealer",
  "controller",
  "summoner",
  "bruiser",
];

export default function IncumbencyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [allIncumbency, setAllIncumbency] = useState([]);

  const [roleFilters, setRoleFilters] = useState([]);
  const [hpMin, setHpMin] = useState("");
  const [hpMax, setHpMax] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [draftRoles, setDraftRoles] = useState([]);
  const [draftHpMin, setDraftHpMin] = useState(1);
  const [draftHpMax, setDraftHpMax] = useState(20);
  const DEFAULT_MIN = 1;
  const DEFAULT_MAX = 20;
  const openFilter = () => {
    setDraftRoles(roleFilters);
    setDraftHpMin(hpMin === "" ? DEFAULT_MIN : Number(hpMin));
    setDraftHpMax(hpMax === "" ? DEFAULT_MAX : Number(hpMax));
    setFilterOpen(true);
  };

  const closeFilter = () => setFilterOpen(false);

  const toggleDraftRole = (role) =>
    setDraftRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );

  const resetDraft = () => {
    setDraftRoles([]);
    setDraftHpMin(DEFAULT_MIN);
    setDraftHpMax(DEFAULT_MAX);
  };

const applyDraft = () => {
  setRoleFilters(draftRoles);
  if (draftHpMin === DEFAULT_MIN && draftHpMax === DEFAULT_MAX) {
    setHpMin(""); 
    setHpMax("");
  } else {
    setHpMin(draftHpMin);
    setHpMax(draftHpMax);
  }
  setFilterOpen(false);
};


  const activeFilterCount =
    (roleFilters.length ? 1 : 0) + (hpMin !== "" || hpMax !== "" ? 1 : 0);

  const fetchAllIncumbency = useCallback(async () => {
    try {
      const res = await fetch("/api/incumbency/getAllData", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setAllIncumbency(Array.isArray(data) ? data : []);
      if ((data?.length ?? 0) > 0) setSelected((prev) => prev ?? data[0]);
    } catch (err) {
      console.error("Failed to fetch incumbency:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllIncumbency();
  }, [fetchAllIncumbency]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return allIncumbency.filter((style) => {
      const name = (style.name || "").toLowerCase();
      const role = (style.role || "").toLowerCase();
      const hp = Number(style.hp_scale ?? style.hp ?? 0);

      const matchesName = term === "" ? true : name.includes(term);

      const matchesRole =
        roleFilters.length === 0 ? true : roleFilters.includes(role);

      const minOK = hpMin === "" ? true : hp >= Number(hpMin);
      const maxOK = hpMax === "" ? true : hp <= Number(hpMax);

      return matchesName && matchesRole && minOK && maxOK;
    });
  }, [allIncumbency, searchTerm, roleFilters, hpMin, hpMax]);
  const clampMin = (v, max) => Math.min(Math.max(v, 1), max - 1);
  const clampMax = (v, min) => Math.max(Math.min(v, 20), min + 1);
  return (
    <div className="min-h-screen bg-[#050b26] flex text-white w-full max-w-6xl">
      <aside className="w-1/3 max-w-[300px] border-r border-[#2a2f55] p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-[#0a1040] text-white placeholder-gray-400 border border-[#2a2f55] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#6670ff]"
          />
          <button
            onClick={openFilter}
            className="relative bg-[#101858] border border-[#2a2f55] hover:bg-[#1c2b7a] text-white px-3 py-2 rounded-md transition flex items-center justify-center"
            title="Filter"
          >
            <span className="text-sm font-semibold">☰</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-[#050b26] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {filtered.map((style) => (
            <div
              key={style.name}
              onClick={() => setSelected(style)}
              className={`p-3 rounded-md border border-[#2a2f55] cursor-pointer transition ${
                selected?.name === style.name
                  ? "bg-[#1c2b7a]"
                  : "bg-[#0a1040] hover:bg-[#101858]"
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={style.img || "/assets/default.png"}
                  alt={style.name}
                  className="w-10 h-10 rounded-md object-cover border border-[#2a2f55]"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{style.name}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {style.role}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-10">
              No results found.
            </p>
          )}
        </div>
      </aside>

      <main className="flex-1 flex justify-center items-start p-10">
        {selected ? (
          <CombatStyleCard data={selected} />
        ) : (
          <p className="text-gray-400 text-lg">Select one</p>
        )}
      </main>

      {filterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/60" onClick={closeFilter} />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-[#2a2f55] bg-[#0a1040] p-4 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-300 mb-2">
                Roles
              </div>
              <div className="flex flex-wrap gap-2">
                {ROLE_OPTIONS.map((r) => {
                  const active = draftRoles.includes(r);
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => toggleDraftRole(r)}
                      className={`px-2.5 py-1 rounded-md border text-xs capitalize transition
                        ${
                          active
                            ? "border-emerald-700 bg-emerald-600/20 text-emerald-200"
                            : "border-[#2a2f55] bg-[#101858] text-gray-300 hover:bg-[#19246e]"
                        }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-300">
                  HP Range
                </span>
                <span className="text-[11px] text-gray-400">
                  {draftHpMin} – {draftHpMax}
                </span>
              </div>

              <Slider.Root
                className="relative flex items-center select-none w-full h-5"
                min={1}
                max={20}
                step={1}
                value={[draftHpMin, draftHpMax]}
                onValueChange={(val) => {
                  setDraftHpMin(val[0]);
                  setDraftHpMax(val[1]);
                }}
              >
                {/* Track */}
                <Slider.Track className="bg-[#1c2b7a] relative flex-grow rounded-full h-[4px]">
                  <Slider.Range className="absolute bg-emerald-500 rounded-full h-full" />
                </Slider.Track>

                {/* Thumbs */}
                <Slider.Thumb
                  className="block w-4 h-4 bg-emerald-500 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  aria-label="Min HP"
                />
                <Slider.Thumb
                  className="block w-4 h-4 bg-emerald-500 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  aria-label="Max HP"
                />
              </Slider.Root>

              <div className="flex justify-between w-full text-[11px] text-gray-400 mt-2">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={resetDraft}
                className="px-3 py-2 text-sm rounded-md border border-[#2a2f55] bg-[#101858] hover:bg-[#19246e]"
              >
                Reset
              </button>
              <button
                onClick={closeFilter}
                className="px-3 py-2 text-sm rounded-md border border-[#2a2f55] bg-[#101858] hover:bg-[#19246e]"
              >
                Cancel
              </button>
              <button
                onClick={applyDraft}
                className="px-3 py-2 text-sm rounded-md border border-emerald-700 bg-emerald-600/20 text-emerald-200 hover:bg-emerald-600/30"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
