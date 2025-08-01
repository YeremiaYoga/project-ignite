"use client";

import { useEffect, useState } from "react";
import ListSpells from "./ListSpells";
import DetailSpells from "./DetailSpells";
import { Search, SlidersHorizontal, Bookmark } from "lucide-react";
import FilterModal from "./FilterModal";

export default function ClientSpellsPage({ spells }) {
  const [selectedSpell, setSelectedSpell] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  const filteredSpells = spells.filter((spell) => {
    const matchesSearch = spell.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesClass =
      !activeFilters?.classes?.length ||
      spell.classes?.some((cls) => activeFilters.classes.includes(cls));
    const normalizeLevel = (level) => (level === 0 ? "Cantrips" : level);
    const matchesLevel =
      !activeFilters?.levels?.length ||
      activeFilters.levels.includes(normalizeLevel(spell.level));
    const matchesCastTime =
      !activeFilters?.castTime?.length ||
      (spell?.casting_time &&
        activeFilters.castTime.some((time) =>
          spell.casting_time.toLowerCase().includes(time.toLowerCase())
        ));

    const matchesRange =
      !activeFilters?.range?.length ||
      activeFilters.range.some((r) =>
        spell.range.toLowerCase().includes(r.toString().toLowerCase())
      );

    // const matchesSchool =
    //   !activeFilters?.schools?.length ||
    //   activeFilters.schools.includes(spell.school);

    return (
      matchesSearch &&
      matchesClass &&
      matchesLevel &&
      matchesCastTime &&
      matchesRange
      // matchesSchool
    );
  });

  return (
    <main className="h-screen  p-4 overflow-y-hidden max-w-6xl mx-auto">
      <div className="md:col-span-1">
        <div className=" rounded p-4 h-[60vh] overflow-y-auto">
          <DetailSpells spell={selectedSpell} />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            size={18}
          />
          <input
            className="w-full bg-gray-300 text-black pl-10 pr-3 py-2 rounded focus:outline-none"
            placeholder="Search Spells"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <SlidersHorizontal
          className="text-yellow-300 cursor-pointer"
          size={30}
          onClick={() => setIsFilterOpen(true)}
        />
        <Bookmark className="text-yellow-400 cursor-pointer" size={39} />
      </div>

      <div className="h-[25vh] overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          <ListSpells
            spells={filteredSpells}
            onSelect={setSelectedSpell}
            selectedSpell={selectedSpell}
          />
        </div>
      </div>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />
    </main>
  );
}
