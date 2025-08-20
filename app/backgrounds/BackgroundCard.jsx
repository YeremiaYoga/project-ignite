"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function BackgroundCard({ bg }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800 text-gray-100 rounded-xl shadow border border-gray-700 p-4">
      <div className="flex justify-between items-start gap-6">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold break-words">{bg.name}</h2>
          <p className="text-sm text-gray-400 italic">{bg.source}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm max-w-[70%]">
          <p>
            <strong>Feature:</strong> {bg.feat}
          </p>
          <p>
            <strong>Proficiencies:</strong> {bg.skill_proficiencies.join(", ")}
          </p>
          <p>
            <strong>Tags:</strong> {bg.tags ? bg.tags.join(", ") : "—"}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 flex-shrink-0"
          >
            {expanded ? <Minus /> : <Plus />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 border-t border-gray-600 pt-4 text-sm space-y-2">
          <p>{bg.description}</p>
          <p>
            <strong>Ability Scores:</strong> {bg.ability_scores.join(", ")}
          </p>
          <p>
            <strong>Tool Proficiencies:</strong>{" "}
            {bg.tool_proficiencies.join(", ")}
          </p>
          <div>
            <strong>Equipment Options:</strong>
            <ul className="list-disc ml-6">
              {Object.entries(bg.equipment_options).map(([key, val]) => (
                <li key={key}>
                  <strong>Option {key}:</strong> {val.items.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
