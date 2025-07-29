"use client";
import React from "react";

export default function TableContent({
  data,
  columns,
  title,
  slotHeader,
  nameClass,
}) {
  const ordinal = (n) => {
    if (n === "—" || n === "-") return n;
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const classColors = {
    Artificer: "#a890f0",
    Barbarian: "#d32f2f",
    Bard: "#ba68c8",
    "Blood Hunter": "#8e24aa",
    Cleric: "#fbc02d",
    Druid: "#388e3c",
    Fighter: "#455a64",
    Monk: "#009688",
    Paladin: "#fdd835",
    Ranger: "#558b2f",
    Rogue: "#212121",
    Sorcerer: "#f06292",
    Warlock: "#6a1b9a",
    Wizard: "#1976d2",
  };

  const headerColor = classColors[nameClass] || "#1976d2";
  return (
    <div className="overflow-x-auto border border-gray-700 rounded-lg shadow mt-6 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <table className="w-full text-sm text-left text-gray-200">
        <thead style={{ backgroundColor: headerColor }} className="text-white">
          <tr>
            <th className="px-4 py-2" colSpan={columns.length}>
              {title}
            </th>
            {slotHeader && (
              <th className="px-4 py-2 text-center" colSpan={slotHeader.length}>
                Spell Slots per Spell Level
              </th>
            )}
          </tr>
          <tr
            style={{ backgroundColor: headerColor }}
            className="uppercase text-xs "
          >
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2">
                {col.label}
              </th>
            ))}
            {slotHeader &&
              slotHeader.map((h, i) => (
                <th key={i} className="px-4 py-2">
                  {h}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-800">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-700 transition">
              {columns.map((col) => {
                let content;

                if (col.render) {
                  content = col.render(row[col.key], row, i);
                } else if (col.key === "level") {
                  content = ordinal(row.level);
                } else if (
                  col.key === "features" &&
                  Array.isArray(row.features) &&
                  Array.isArray(row.featuresId)
                ) {
                  content =
                    row.features.length > 0 && row.features[0] !== "—"
                      ? row.features
                          .map((feature, idx) => (
                            <a
                              key={row.featuresId[idx]}
                              href={`#${row.featuresId[idx]}`}
                              className="text-blue-400 hover:underline custom"
                            >
                              {feature}
                            </a>
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])
                      : "—";
                } else if (col.isArray && Array.isArray(row[col.key])) {
                  content =
                    row[col.key].length > 0 && row[col.key][0] !== "—"
                      ? row[col.key]
                          .map((val) => (
                            <span key={val} className="inline-block">
                              {val}
                            </span>
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])
                      : "—";
                }
                // else if (col.key === "proficiencyBonus") {
                //   content =
                //     typeof row[col.key] === "number"
                //       ? `+${row[col.key]}`
                //       : row[col.key];
                // }
                else {
                  content = row[col.key];
                }

                return (
                  <td key={col.key} className="px-4 py-2 whitespace-pre-wrap">
                    {content}
                  </td>
                );
              })}
              {slotHeader &&
                row.spellSlots &&
                row.spellSlots.map((slot, idx) => (
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
