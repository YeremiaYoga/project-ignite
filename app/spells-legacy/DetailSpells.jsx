"use client";
import { linkifyText } from "@/utils/linkifyText";
import { Star, StarOff } from "lucide-react";

export default function DetailSpells({ spell }) {
  if (!spell) return null;

  const renderStars = () => {
    const level = Math.min(spell.level || 0, 5);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < level) {
        stars.push(
          <Star fill="yellow" key={i} className="w-4 h-4 inline-block" />
        );
      }
    }

    return <div className=" gap-0.5 mt-1">{stars}</div>;
  };

  return (
    <div className="bg-gray-600 p-6 rounded shadow-lg text-gray-100 relative">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-yellow-300 uppercase">
            {spell.name}
          </h1>
          <div className="flex gap-2 italic text-gray-200 text-sm">
            <p>{spell.level} Level</p>
            <p>{spell.school}</p>
          </div>
          <p className="mt-2 text-sm tracking-wide">
            <strong>Casting Time</strong> : {spell.casting_time}
            <br />
            <strong>Range</strong>: {spell.distance} {spell.range}
            {spell.area && ` (${spell.area})`}
            <br />
            <strong>Components</strong>: {spell.components || "-"}
            <br />
            <strong>Duration</strong>:{" "}
            {spell.concentration
              ? `Concentration up to ${spell.duration}`
              : spell.duration}
          </p>
        </div>
        <div className="text-right text-yellow-200 text-sm">
          <p className="uppercase font-semibold">{spell.short_source}</p>

          {renderStars()}
        </div>
      </div>

      <div className="mt-4 text-xs leading-relaxed text-white">
        <p
          dangerouslySetInnerHTML={{
            __html: linkifyText(spell.description, "universalLink spellsLink"),
          }}
        />
        {spell.higher_level && (
          <p className="mt-3 italic text-yellow-100">
            <strong>Using a Higher-Level Spell Slot:</strong>{" "}
            {spell.higher_level}
          </p>
        )}
      </div>

      {spell.material && (
        <p className="text-xs italic text-gray-300 mt-4">*– {spell.material}</p>
      )}
    </div>
  );
}
