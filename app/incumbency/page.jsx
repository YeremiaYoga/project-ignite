"use client";

import { useState } from "react";
import CombatStyleCard from "./CombatStyleCard";

export default function IncumbencyPage() {
  const allStyles = [
    {
      name: "Harmonic Virtuoso",
      role: "Support",
      img: "/assets//foundry_vtt/icons/magic/life/heart-hand-gold-green.webp",
      hp_scale: 5,
      ac_calc: "10 + Dexterity modifier",
      description:
        "A gentle support who restores health and boosts allies through melodic magic or uplifting words.",
      abilities: [
        {
          name: "Harmonic Unstring",
          type: "Basic",
          cost: "Action",
          type_ability: ["Debuff"],
          img: "/assets//foundry_vtt/icons/magic/control/fear-fright-monster-grin-green.webp",
          description:
            "You are able to choose one creature within 60ft that you can see. The targeted creature must make a Wisdom saving throw. On a failure, the creature gains Harmonic Unstring, which lasts until the end of your next turn. The creature's next attack will have disadvantage while having Harmonic Unstring.",
        },
        {
          name: "Melody of Restoration",
          type: "Skill",
          cost: "Action",
          type_ability: ["Healing"],
          img: "/assets/foundry_vtt/icons/magic/control/orb-web-hold.webp",
          description:
            "You choose one creature that you can see within 60ft of you, and heal them for d4s equal to your Proficiency Bonus. You can use this ability a number of times equal to your combat value per long rest.",
        },
      ],
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(allStyles[0]);

  const filtered = allStyles.filter((style) =>
    style.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050b26] flex text-white w-full max-w-6xl">
      <aside className="w-1/3 max-w-[400px] border-r border-[#2a2f55] p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-[#0a1040] text-white placeholder-gray-400 border border-[#2a2f55] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#6670ff]"
          />
          <button
            onClick={() => console.log("Filter clicked")}
            className="bg-[#101858] border border-[#2a2f55] hover:bg-[#1c2b7a] text-white px-3 py-2 rounded-md transition flex items-center justify-center"
            title="Filter"
          >
            <span className="text-sm font-semibold">☰</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {filtered.map((style) => (
            <div
              key={style.name}
              onClick={() => setSelected(style)}
              className={`p-3 rounded-md border border-[#2a2f55] cursor-pointer transition ${
                selected.name === style.name
                  ? "bg-[#1c2b7a]"
                  : "bg-[#0a1040] hover:bg-[#101858]"
              }`}
            >
              <div className="flex items-center gap-2">
                {/* <img
                  src={style.img}
                  alt={style.name}
                  className="w-8 h-8 rounded-md border border-[#2a2f55]"
                /> */}
                <div>
                  <p className="text-sm font-semibold">{style.name}</p>
                  {/* <p className="text-xs text-gray-400">{style.role}</p> */}
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
        <CombatStyleCard data={selected} />
      </main>
    </div>
  );
}
