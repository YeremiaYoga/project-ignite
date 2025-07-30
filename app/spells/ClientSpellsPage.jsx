"use client";

import { useState } from "react";
import ListSpells from "./ListSpells";
import DetailSpells from "./DetailSpells";
import { Search, SlidersHorizontal , Bookmark } from "lucide-react";

export default function ClientSpellsPage({ spells }) {
  const [selectedSpell, setSelectedSpell] = useState(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Spell List</h1>

      <div className="mb-4">
        <DetailSpells spell={selectedSpell} />
      </div>

      <div className=" flex items-center gap-3">
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            size={18}
          />
          <input
            className="w-full bg-gray-300 text-black pl-10 pr-3 py-2 rounded focus:outline-none"
            placeholder="Search Spells"
          
          />
        </div>
        <SlidersHorizontal  className="text-yellow-300 cursor-pointer" size={30} />
        <Bookmark className="text-yellow-400 cursor-pointer" size={39} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <ListSpells
          spells={spells}
          onSelect={setSelectedSpell}
          selectedSpell={selectedSpell}
        />
      </div>
    </main>
  );
}
