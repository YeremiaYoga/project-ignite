"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function BackgroundList({ backgrounds }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-5 gap-2 px-2 py-2 text-[10px] sm:text-sm  text-gray-200 bg-gray-700 sticky top-0 z-10 text-center">
        <div>Name</div>
        <div>Feature</div>
        <div>Proficiencies</div>
        <div>Tags</div>
        <div className="text-center">Action</div>
      </div>

      <div className="divide-y divide-gray-700">
        {backgrounds.map((bg, idx) => (
          <BackgroundRow key={idx} bg={bg} />
        ))}
      </div>
    </div>
  );
}

function BackgroundRow({ bg }) {
  const [expanded, setExpanded] = useState(false);

  const bgImage = `/assets/backgrounds/${bg.name.replace(/\s+/g, "_")}.webp`;

  return (
    <div
      className="relative text-gray-100"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundColor: bgImage ? "transparent" : "#808080",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid grid-cols-5 gap-2 items-center px-2 py-2 text-[10px] sm:text-xs">
        <div>
          <h2 className="font-semibold">{bg.name}</h2>
          <p className="text-[10px] text-gray-300 italic">{bg.source}</p>
        </div>
        <div>{bg.feat}</div>
        <div>{bg.skill_proficiencies.join(", ")}</div>
        <div className="flex justify-center">
          {bg.tags ? bg.tags.join(", ") : "—"}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-full bg-orange-500 text-white hover:bg-orange-600"
          >
            {expanded ? <Minus size={12} /> : <Plus size={12} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 py-3 bg-gray-900 border-t border-gray-700 text-xs">
          <p className="mb-3 text-gray-200">{bg.description}</p>

          <hr className="border-orange-500 my-2" />

          <p className="mb-1">
            <span className="font-semibold">Ability Scores: </span>
            {bg.ability_scores.join(", ")}
          </p>

          <p className="mb-1">
            <span className="font-semibold">Feat: </span>
            {bg.feat}
          </p>

          <p className="mb-1">
            <span className="font-semibold">Skill Proficiencies: </span>
            {bg.skill_proficiencies.map((skill, i) => (
              <span key={i}>
                {skill}
                {i < bg.skill_proficiencies.length - 1 && ", "}
              </span>
            ))}
          </p>

          <p className="mb-1">
            <span className="font-semibold">Tool Proficiencies: </span>
            {bg.tool_proficiencies.length > 0
              ? bg.tool_proficiencies.join(", ")
              : "—"}
          </p>

          <p>
            <span className="font-semibold">Equipment: </span>
            {Object.entries(bg.equipment_options).map(([key, val], idx) => (
              <span key={idx}>
                {idx === 0 && <em>Choose A or B: </em>}({key}){" "}
                {val.items.map((item, j) => (
                  <span key={j}>
                    {item}
                    {j < val.items.length - 1 && ", "}
                  </span>
                ))}
                {idx < Object.entries(bg.equipment_options).length - 1 && "; "}
              </span>
            ))}
          </p>

          <div className="mt-3">
            <button className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-xs">
              View {bg.name} Detail
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
