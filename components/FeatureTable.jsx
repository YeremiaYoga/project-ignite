export default function FeatureTable({ table }) {
  if (!table || !table.headers || !table.rows) return null;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-left text-sm border border-zinc-700">
        <thead className="bg-zinc-800 text-zinc-200">
          <tr>
            <th className="px-4 py-2 border border-zinc-700">#</th>
            {table.headers.map((header, index) => (
              <th key={index} className="px-4 py-2 border border-zinc-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-zinc-900 even:bg-zinc-800">
              <td className="px-4 py-2 border border-zinc-700 text-zinc-400">
                {rowIndex + 1}
              </td>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 border border-zinc-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
