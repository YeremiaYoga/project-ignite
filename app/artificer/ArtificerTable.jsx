"use client";
import React from "react";

export default function ArtificerTable() {
  const data = [
    {
      level: "1st",
      prof: "+2",
      features: "Magical Tinkering, Spellcasting",
      infusionsKnown: "–",
      infusedItems: "–",
      cantripsKnown: "2",
      slots: ["2", "–", "–", "–", "–"],
    },
    {
      level: "2nd",
      prof: "+2",
      features: "Infuse Item",
      infusionsKnown: "4",
      infusedItems: "2",
      cantripsKnown: "2",
      slots: ["2", "–", "–", "–", "–"],
    },
    {
      level: "3rd",
      prof: "+2",
      features: "Artificer Specialist, The Right Tool for the Job",
      infusionsKnown: "4",
      infusedItems: "2",
      cantripsKnown: "2",
      slots: ["3", "–", "–", "–", "–"],
    },
    {
      level: "4th",
      prof: "+2",
      features: "Ability Score Improvement",
      infusionsKnown: "4",
      infusedItems: "2",
      cantripsKnown: "2",
      slots: ["3", "–", "–", "–", "–"],
    },
    {
      level: "5th",
      prof: "+3",
      features: "Artificer Specialist Feature",
      infusionsKnown: "6",
      infusedItems: "2",
      cantripsKnown: "2",
      slots: ["4", "2", "–", "–", "–"],
    },
    {
      level: "6th",
      prof: "+3",
      features: "Tool Expertise",
      infusionsKnown: "6",
      infusedItems: "3",
      cantripsKnown: "2",
      slots: ["4", "2", "–", "–", "–"],
    },
    {
      level: "7th",
      prof: "+3",
      features: "Flash of Genius",
      infusionsKnown: "6",
      infusedItems: "3",
      cantripsKnown: "2",
      slots: ["4", "3", "–", "–", "–"],
    },
    {
      level: "8th",
      prof: "+3",
      features: "Ability Score Improvement",
      infusionsKnown: "8",
      infusedItems: "3",
      cantripsKnown: "2",
      slots: ["4", "3", "–", "–", "–"],
    },
    {
      level: "9th",
      prof: "+4",
      features: "Artificer Specialist Feature",
      infusionsKnown: "8",
      infusedItems: "3",
      cantripsKnown: "2",
      slots: ["4", "3", "2", "–", "–"],
    },
    {
      level: "10th",
      prof: "+4",
      features: "Magic Item Adept",
      infusionsKnown: "10",
      infusedItems: "4",
      cantripsKnown: "3",
      slots: ["4", "3", "2", "–", "–"],
    },
    {
      level: "11th",
      prof: "+4",
      features: "Spell-Storing Item",
      infusionsKnown: "10",
      infusedItems: "4",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "–", "–"],
    },
    {
      level: "12th",
      prof: "+4",
      features: "Ability Score Improvement",
      infusionsKnown: "12",
      infusedItems: "4",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "–", "–"],
    },
    {
      level: "13th",
      prof: "+5",
      features: "–",
      infusionsKnown: "12",
      infusedItems: "4",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "1", "–"],
    },
    {
      level: "14th",
      prof: "+5",
      features: "Magic Item Savant",
      infusionsKnown: "14",
      infusedItems: "5",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "1", "–"],
    },
    {
      level: "15th",
      prof: "+5",
      features: "Artificer Specialist Feature",
      infusionsKnown: "14",
      infusedItems: "5",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "2", "–"],
    },
    {
      level: "16th",
      prof: "+5",
      features: "Ability Score Improvement",
      infusionsKnown: "16",
      infusedItems: "5",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "2", "–"],
    },
    {
      level: "17th",
      prof: "+6",
      features: "Magic Item Master",
      infusionsKnown: "16",
      infusedItems: "6",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "3", "1"],
    },
    {
      level: "18th",
      prof: "+6",
      features: "–",
      infusionsKnown: "18",
      infusedItems: "6",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "3", "1"],
    },
    {
      level: "19th",
      prof: "+6",
      features: "Ability Score Improvement",
      infusionsKnown: "18",
      infusedItems: "6",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "3", "2"],
    },
    {
      level: "20th",
      prof: "+6",
      features: "Soul of Artifice",
      infusionsKnown: "20",
      infusedItems: "6",
      cantripsKnown: "3",
      slots: ["4", "3", "3", "3", "2"],
    },
  ];

  return (
    <div className="overflow-x-auto border border-gray-700 rounded-lg shadow mt-6 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <table className="w-full text-sm text-left text-gray-200">
        <thead className="bg-blue-900 text-blue-200">
          <tr>
            <th className="px-4 py-2" colSpan={3}>
              The Artificer
            </th>
            <th className="px-4 py-2 text-center" colSpan={10}>
              Spell Slots per Spell Level
            </th>
          </tr>
          <tr className="uppercase text-xs bg-blue-900">
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Proficiency Bonus</th>
            <th className="px-4 py-2">Features</th>
            <th className="px-4 py-2">Infusions Known</th>
            <th className="px-4 py-2">Infused Items</th>
            <th className="px-4 py-2">Cantrips Known</th>
            <th className="px-4 py-2">1st</th>
            <th className="px-4 py-2">2nd</th>
            <th className="px-4 py-2">3rd</th>
            <th className="px-4 py-2">4th</th>
            <th className="px-4 py-2">5th</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-800">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-700 transition">
              <td className="px-4 py-2">{row.level}</td>
              <td className="px-4 py-2">{row.prof}</td>
              <td className="px-4 py-2 whitespace-pre-wrap">{row.features}</td>
              <td className="px-4 py-2">{row.infusionsKnown}</td>
              <td className="px-4 py-2">{row.infusedItems}</td>
              <td className="px-4 py-2">{row.cantripsKnown}</td>
              {row.slots.map((slot, idx) => (
                <td key={idx} className="px-4 py-2 text-center">
                  {slot}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
