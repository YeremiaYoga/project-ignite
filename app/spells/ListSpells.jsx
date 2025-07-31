"use client";

import { useState, useMemo } from "react";
import { Check, ArrowUp, ArrowDown } from "lucide-react";

export default function ListSpells({ spells, onSelect, selectedSpell }) {
  const [sortKey, setSortKey] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function handleSort(key) {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  function SortIcon({ column }) {
    if (sortKey !== column) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="inline w-3 h-3 ml-1 text-yellow-300" />
    ) : (
      <ArrowDown className="inline w-3 h-3 ml-1 text-yellow-300" />
    );
  }

  function getCastingTimeValue(time) {
    if (!time) return 999;
    const t = time.toLowerCase();

    if (t === "action") return 1;
    if (t === "bonus action") return 2;
    if (t === "reaction") return 3;

    const roundMatch = t.match(/^(\d+)\s*round/);
    if (roundMatch) return 10 + parseInt(roundMatch[1]);

    const minuteMatch = t.match(/^(\d+)\s*minute/);
    if (minuteMatch) return 50 + parseInt(minuteMatch[1]);

    const hourMatch = t.match(/^(\d+)\s*hour/);
    if (hourMatch) return 100 + parseInt(hourMatch[1]);

    if (t === "special") return 999;

    return 500;
  }
  function getRangeValue(range) {
    if (!range) return 99999;

    const r = typeof range === "string" ? range.toLowerCase() : String(range);

    if (r === "self") return 0;
    if (r === "touch") return 1;

    const numMatch = r.match(/^(\d+)/);
    if (numMatch) return parseInt(numMatch[1]);

    return 99999;
  }

  const sortedSpells = useMemo(() => {
    return [...spells].sort((a, b) => {
      let aVal, bVal;

      if (sortKey === "level") {
        aVal = a.level ?? 0;
        bVal = b.level ?? 0;
      } else if (sortKey === "casting_time") {
        aVal = getCastingTimeValue(a.casting_time);
        bVal = getCastingTimeValue(b.casting_time);
      } else if (sortKey === "range") {
        aVal = getRangeValue(a.range);
        bVal = getRangeValue(b.range);
      } else {
        aVal = (a[sortKey] ?? "").toString().toLowerCase();
        bVal = (b[sortKey] ?? "").toString().toLowerCase();
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [spells, sortKey, sortDirection]);

  return (
    <div className="text-white rounded mt-4 shadow-inner overflow-hidden">
      <table className="w-full text-xs text-left border-t border-yellow-400 table-fixed">
        <thead className="text-gray-300 border-b border-yellow-400">
          <tr>
            <th
              className="px-2 py-1 w-[20%] cursor-pointer hover:text-yellow-300"
              onClick={() => handleSort("name")}
            >
              Name <SortIcon column="name" />
            </th>
            <th
              className="px-1 py-1 w-[15%] cursor-pointer hover:text-yellow-300"
              onClick={() => handleSort("level")}
            >
              Level <SortIcon column="level" />
            </th>
            <th
              className="px-1 py-1 w-[15%] cursor-pointer hover:text-yellow-300"
              onClick={() => handleSort("casting_time")}
            >
              Time <SortIcon column="casting_time" />
            </th>
            <th
              className="px-1 py-1 w-[20%] cursor-pointer hover:text-yellow-300"
              onClick={() => handleSort("school")}
            >
              School <SortIcon column="school" />
            </th>
            <th className="px-1 py-1 w-[10%]">Con.</th>
            <th
              className="px-1 py-1 w-[25%] cursor-pointer hover:text-yellow-300"
              onClick={() => handleSort("range")}
            >
              Range <SortIcon column="range" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSpells.map((spell) => (
            <tr
              key={spell.name}
              onClick={() => onSelect(spell)}
              className={`cursor-pointer hover:bg-gray-800 ${
                selectedSpell?.name === spell.name ? "bg-gray-700" : ""
              }`}
            >
              <td className="px-2 py-1 whitespace-normal break-words">
                {spell.name}
              </td>
              <td className="px-1 py-1 italic">
                {spell.level === 0 ? "C" : getOrdinal(spell.level)}
              </td>
              <td className="px-1 py-1 italic whitespace-normal break-words">
                {spell.casting_time}
              </td>
              <td className="px-1 py-1 italic whitespace-normal break-words">
                {spell.school.length > 5
                  ? `${spell.school.slice(0, 5)}.`
                  : spell.school}
              </td>
              <td className="px-1 py-1 text-center">
                {spell.concentration && (
                  <Check className="w-4 h-4 text-yellow-400 inline-block" />
                )}
              </td>
              <td className="px-1 py-1 italic whitespace-normal break-words">
                {spell.range} {spell.measurement || ""}
                {spell.area ? ` (${spell.area})` : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
