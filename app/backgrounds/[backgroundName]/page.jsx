"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BackgroundDetailPage() {
  const { backgroundName } = useParams(); // ambil nama dari URL
  const [bgData, setBgData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/backgrounds/getDataBackground?name=${backgroundName}`
        );

        const data = await res.json();

        setBgData(data);
      } catch (err) {
        console.error("Error fetching background:", err);
      }
    };
    if (backgroundName) fetchData();
  }, [backgroundName]);

  if (!bgData) {
    return <div className="p-4 text-gray-300">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-200">
      <h1 className="text-2xl font-bold mb-2">{bgData.name}</h1>
      <p className="italic text-gray-400 mb-4">{bgData.source}</p>
      <p className="mb-4">{bgData.description}</p>

      <hr className="border-orange-500 my-4" />

      <p>
        <span className="font-semibold">Ability Scores: </span>
        {bgData.ability_scores.join(", ")}
      </p>
      <p>
        <span className="font-semibold">Feat: </span>
        {bgData.feat}
      </p>
      <p>
        <span className="font-semibold">Skill Proficiencies: </span>
        {bgData.skill_proficiencies.join(", ")}
      </p>
      <p>
        <span className="font-semibold">Tool Proficiencies: </span>
        {bgData.tool_proficiencies.length > 0
          ? bgData.tool_proficiencies.join(", ")
          : "—"}
      </p>
      <p className="mt-2">
        <span className="font-semibold">Equipment: </span>
        {Object.entries(bgData.equipment_options).map(([key, val], idx) => (
          <span key={idx}>
            {idx === 0 && <em>Choose A or B: </em>}({key}){" "}
            {val.items.map((item, j) => (
              <span key={j}>
                {item}
                {j < val.items.length - 1 && ", "}
              </span>
            ))}
            {idx < Object.entries(bgData.equipment_options).length - 1 && "; "}
          </span>
        ))}
      </p>
    </div>
  );
}
