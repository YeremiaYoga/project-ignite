// src/incumbency/AbilityCard.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AbilityCard({
  name,
  type,
  cost,
  type_ability = [],
  img,
  description,
  defaultOpen = true,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const tags = Array.isArray(type_ability)
    ? type_ability.join(" • ")
    : type_ability;

  return (
    <div className="mb-4 rounded-lg  shadow-md">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start gap-3 p-3 text-left"
      >
        <img
          src={img}
          alt={name}
          className="w-10 h-10 rounded-md shadow border border-gray-600 object-cover"
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-200">{name}</h3>
          <p className="text-sm text-gray-400 italic">
            ─ {type} • {cost}
            {tags ? ` • ${tags}` : ""}
          </p>
        </div>
        {open ? (
          <ChevronUp className="shrink-0 text-gray-400" size={18} />
        ) : (
          <ChevronDown className="shrink-0 text-gray-400" size={18} />
        )}
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className="px-3 pb-3 text-sm leading-relaxed text-gray-300 whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
