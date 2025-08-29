"use client";

import { useEffect, useState } from "react";
import ListSpells from "./ListSpells";
import DetailSpells from "./DetailSpells";
import { Search, SlidersHorizontal, Bookmark } from "lucide-react";
import FilterModal from "./FilterModal";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientSpellsPage({ spells }) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    const spellParam = searchParams.get("spell");
    if (spellParam) {
      const foundSpell = spells.find(
        (s) =>
          s.name.toLowerCase() === decodeURIComponent(spellParam).toLowerCase()
      );
      if (foundSpell) setSelectedSpell(foundSpell);
    }
  }, [searchParams, spells]);

  const handleSelectSpell = (spell) => {
    setSelectedSpell(spell);
    const params = new URLSearchParams(window.location.search);
    params.set("spell", encodeURIComponent(spell.name));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  const filteredSpells = spells.filter((spell) => {
    console.log(spell);
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
      activeFilters.range
        .map((r) => r.toString().toLowerCase())
        .some((r) => spell.range_exp.toLowerCase().includes(r));

    const matchesSchool =
      !activeFilters?.school?.length ||
      (spell?.school &&
        activeFilters.school.some((time) =>
          spell.school.toLowerCase().includes(time.toLowerCase())
        ));

    const matchesDamageType = activeFilters?.damageType?.length
      ? spell?.damage_type
        ? activeFilters.damageType.some(
            (time) => spell.damage_type.toLowerCase() === time.toLowerCase()
          )
        : false
      : true;

    const matchesRitual = activeFilters?.ritual ? spell?.ritual === true : true;

    // console.log(activeFilters);
    // console.log(spell);

    // console.log(matchesClass);
    // console.log(matchesLevel);
    // console.log(matchesCastTime);
    console.log(matchesRange);
    // console.log(matchesSchool);
    // console.log(matchesDamageType);
    // console.log(matchesRitual);
    return (
      matchesSearch &&
      matchesClass &&
      matchesLevel &&
      matchesCastTime &&
      matchesRange &&
      matchesSchool &&
      matchesDamageType &&
      matchesRitual
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
            onSelect={handleSelectSpell}
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
