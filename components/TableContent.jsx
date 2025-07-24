"use client";
import React from "react";

export default function TableContent({ data, columns, title, slotHeader }) {
  const ordinal = (n) => {
    if (n === "—" || n === "-") return n;
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  console.log(data);
  return (
    <div className="overflow-x-auto border border-gray-700 rounded-lg shadow mt-6 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <table className="w-full text-sm text-left text-gray-200">
        <thead className="bg-blue-900 text-blue-200">
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
          <tr className="uppercase text-xs bg-blue-900">
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
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 whitespace-pre-wrap">
                  {col.render
                    ? col.render(row[col.key], row, i)
                    : col.key === "level"
                    ? ordinal(row.level)
                    : col.key === "features" &&
                      Array.isArray(row.features) &&
                      Array.isArray(row.featuresId)
                    ? row.features.length > 0 && row.features[0] !== "—"
                      ? row.features
                          .map((feature, idx) => (
                            <a
                              key={row.featuresId[idx]}
                              href={`#${row.featuresId[idx]}`}
                              className="text-blue-400 hover:underline"
                            >
                              {feature}
                            </a>
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])
                      : "—"
                    : col.isArray && Array.isArray(row[col.key])
                    ? row[col.key].length > 0 && row[col.key][0] !== "—"
                      ? row[col.key]
                          .map((val) => (
                            <span key={val} className="inline-block">
                              {val}
                            </span>
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])
                      : "—"
                    : row[col.key]}
                </td>
              ))}
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
