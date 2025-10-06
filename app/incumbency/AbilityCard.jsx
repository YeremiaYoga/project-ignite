// src/incumbency/AbilityCard.jsx
import React from "react";

export default function AbilityCard({ name, type, cost, type_ability, img, description }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <img src={img} alt={name} className="w-10 h-10 rounded-md shadow-md border border-gray-600" />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-200">
          {name}
        </h3>
        <p className="text-sm text-gray-400 italic">
          ─ {type} • {cost} • {type_ability.join(" • ")}
        </p>
        <p className="text-gray-300 mt-1 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
