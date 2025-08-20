"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function BackgroundList({ backgrounds }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-5 gap-4 px-4 py-2 text-sm font-bold text-gray-200 bg-gray-700 sticky top-0 z-10">
        <div>NAME</div>
        <div>FEATURE</div>
        <div>PROFICIENCIES</div>
        <div>TAGS</div>
        <div className="text-center">ACTION</div>
      </div>

      <div className="divide-y divide-gray-700">
        {/* {backgrounds.map((bg, idx) => (
          <BackgroundRow key={idx} bg={bg} />
        ))} */}
         <BackgroundRow bg={backgrounds[0]} />
      </div>
    </div>
  );
}

function BackgroundRow({ bg }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800 text-gray-100">
      <div className="grid grid-cols-5 gap-4 items-center px-4 py-3">
        <div>
          <h2 className="font-semibold">{bg.name}</h2>
          <p className="text-xs text-gray-400 italic">{bg.source}</p>
        </div>
        <div className="text-sm">{bg.feat}</div>
        <div className="text-sm">{bg.skill_proficiencies.join(", ")}</div>
        <div className="text-sm">{bg.tags ? bg.tags.join(", ") : "—"}</div>
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600"
          >
            {expanded ? <Minus size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-6 py-4 bg-gray-900 text-sm space-y-2 border-t border-gray-700">
          <p>{bg.description}</p>
          <p>
            <strong>Ability Scores:</strong> {bg.ability_scores.join(", ")}
          </p>
          <p>
            <strong>Tool Proficiencies:</strong>{" "}
            {bg.tool_proficiencies.join(", ")}
          </p>
          {/* <div>
            <strong>Equipment Options:</strong>
            <ul className="list-disc ml-6">
              {Object.entries(bg.equipment_options).map(([key, val]) => (
                <li key={key}>
                  <strong>Option {key}:</strong> {val.items.join(", ")}
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      )}
    </div>
  );
}
