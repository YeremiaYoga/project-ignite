export default function ListSpells({ spells, onSelect, selectedSpell }) {
  return (
    <div className=" text-white rounded  mt-4 shadow-inner">
      <table className="w-full text-sm text-left border-t border-yellow-400">
        <thead className="text-gray-300 border-b border-yellow-400">
          <tr>
            <th className="px-2 py-1">Name</th>
            <th className="px-2 py-1">Level</th>
            <th className="px-2 py-1">Time</th>
            <th className="px-2 py-1">School</th>
            <th className="px-2 py-1">Range</th>
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
              <td className="px-2 py-1">{spell.name}</td>
              <td className="px-2 py-1 italic">
                {spell.level === 0 ? "Cantrip" : `${spell.level}rd`}
              </td>
              <td className="px-2 py-1 italic">{spell.casting_time}</td>
              <td className="px-2 py-1 italic">{spell.school}</td>
              <td className="px-2 py-1 italic">
                {spell.range}
                {spell.area ? ` (${spell.area} Sphere)` : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
