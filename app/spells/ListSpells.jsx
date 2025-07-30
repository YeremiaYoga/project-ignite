import { Check } from "lucide-react";

export default function ListSpells({ spells, onSelect, selectedSpell }) {
  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  return (
    <div className="text-white rounded mt-4 shadow-inner overflow-hidden">
      <table className="w-full text-xs text-left border-t border-yellow-400 table-fixed">
        <thead className="text-gray-300 border-b border-yellow-400">
          <tr>
            <th className="px-2 py-1 w-[25%]">Name</th>
            <th className="px-1 py-1 w-[10%]">Level</th>
            <th className="px-1 py-1 w-[15%]">Time</th>
            <th className="px-1 py-1 w-[15%]">School</th>
            <th className="px-1 py-1 w-[10%]">Con.</th>
            <th className="px-1 py-1 w-[25%]">Range</th>
          </tr>
        </thead>
        <tbody>
          {spells.map((spell) => (
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
