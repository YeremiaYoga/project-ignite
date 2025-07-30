export default function DetailSpells({ spell }) {
  if (!spell) return null;

  return (
    <div className="bg-gray-600 p-6 rounded shadow-lg text-gray-100 relative">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-yellow-300 uppercase">{spell.name}</h1>
          <p className="mt-2 uppercase text-sm tracking-wide">
            <strong>Casting Time</strong> : {spell.casting_time}<br />
            <strong>Range</strong> : {spell.range} ({spell.area} Sphere)<br />
            <strong>Components</strong>: {spell.components}<br />
            <strong>Duration</strong>: {spell.duration}
          </p>
        </div>
        <div className="text-right text-yellow-200 text-sm">
          <p className="uppercase font-semibold">{spell.short_source}</p>
          <p className="italic">{spell.level}rd Level</p>
          <p className="uppercase">{spell.school}</p>
          <p>{'★★★★★'.slice(0, 5)}</p>
        </div>
      </div>

      <div className="mt-4 text-sm leading-relaxed text-white">
        <p>{spell.description}</p>

        {spell.higher_level && (
          <p className="mt-3 italic text-yellow-100">
            <strong>Using a Higher-Level Spell Slot:</strong> {spell.higher_level}
          </p>
        )}
      </div>

      {spell.material && (
        <p className="text-xs italic text-gray-300 mt-4">
          *– {spell.material}
        </p>
      )}
    </div>
  );
}
