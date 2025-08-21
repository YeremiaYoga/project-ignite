"use client";

export default function TraitItem({ title, value, onChange }) {
  const ensureDescription = () => {
    if (!("description" in value)) onChange({ ...value, description: "" });
  };

  const ensureTable = () => {
    if (!("table" in value))
      onChange({ ...value, table: { headers: [""], rows: [[""]] } });
  };

  const ensureList = () => {
    if (!("list" in value)) onChange({ ...value, list: [""] });
  };

  const updateDescription = (text) => onChange({ ...value, description: text });

  const addTableHeader = () => {
    const table = value.table ?? { headers: [], rows: [] };
    const nextHeaders = [...table.headers, ""];
    const nextRows = (table.rows || []).map((r) => [...r, ""]);
    onChange({ ...value, table: { headers: nextHeaders, rows: nextRows } });
  };

  const changeTableHeader = (i, text) => {
    const table = value.table;
    const nextHeaders = table.headers.map((h, idx) => (idx === i ? text : h));
    onChange({ ...value, table: { headers: nextHeaders, rows: table.rows } });
  };

  const addTableRow = () => {
    const table = value.table ?? { headers: [], rows: [] };
    const colCount = table.headers?.length || 0;
    const nextRows = [...(table.rows || []), Array(colCount).fill("")];
    onChange({
      ...value,
      table: { headers: table.headers || [], rows: nextRows },
    });
  };

  const changeTableCell = (rIdx, cIdx, text) => {
    const table = value.table;
    const nextRows = table.rows.map((row, ri) =>
      ri === rIdx ? row.map((cell, ci) => (ci === cIdx ? text : cell)) : row
    );
    onChange({ ...value, table: { headers: table.headers, rows: nextRows } });
  };

  const addListItem = () => {
    const next = [...(value.list || []), ""];
    onChange({ ...value, list: next });
  };

  const changeListItem = (i, text) => {
    const next = (value.list || []).map((it, idx) => (idx === i ? text : it));
    onChange({ ...value, list: next });
  };

  return (
    <div className="border border-gray-700 rounded-xl p-4">
      <h4 className="text-lg font-semibold mb-3">{title}</h4>

      <div className="flex flex-wrap gap-2 mb-3">
        {!("description" in value) && (
          <button
            type="button"
            onClick={ensureDescription}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            + Description
          </button>
        )}
        {!("table" in value) && (
          <button
            type="button"
            onClick={ensureTable}
            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
          >
            + Table
          </button>
        )}
        {!("list" in value) && (
          <button
            type="button"
            onClick={ensureList}
            className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
          >
            + List
          </button>
        )}
      </div>

      {"description" in value && (
        <div className="mb-3">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            rows={3}
            value={value.description}
            onChange={(e) => updateDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            placeholder={`Describe ${title}...`}
          />
        </div>
      )}
      {"table" in value && (
        <div className="mb-3">
          <label className="block mb-1 font-medium">Table</label>

          <div className="flex flex-wrap gap-2 mb-2">
            {(value.table?.headers || []).map((h, i) => (
              <input
                key={i}
                type="text"
                value={h}
                onChange={(e) => changeTableHeader(i, e.target.value)}
                className="px-2 py-1 rounded bg-gray-800 border border-gray-700"
                placeholder={`Header ${i + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={addTableHeader}
              className="bg-blue-600 hover:bg-blue-700 px-2 rounded"
            >
              + Header
            </button>
          </div>

          {(value.table?.rows || []).map((row, rIdx) => (
            <div key={rIdx} className="flex flex-wrap gap-2 mb-2">
              {row.map((cell, cIdx) => (
                <input
                  key={cIdx}
                  type="text"
                  value={cell}
                  onChange={(e) => changeTableCell(rIdx, cIdx, e.target.value)}
                  className="px-2 py-1 rounded bg-gray-800 border border-gray-700"
                  placeholder={`R${rIdx + 1}C${cIdx + 1}`}
                />
              ))}
            </div>
          ))}

          <button
            type="button"
            onClick={addTableRow}
            className="bg-blue-600 hover:bg-blue-700 px-2 rounded"
          >
            + Row
          </button>
        </div>
      )}

      {"list" in value && (
        <div>
          <label className="block mb-1 font-medium">List</label>
          {(value.list || []).map((it, i) => (
            <input
              key={i}
              type="text"
              value={it}
              onChange={(e) => changeListItem(i, e.target.value)}
              className="w-full px-3 py-1 rounded-md bg-gray-800 border border-gray-700 mb-1"
              placeholder={`Item ${i + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={addListItem}
            className="bg-blue-600 hover:bg-blue-700 px-2 rounded"
          >
            + Item
          </button>
        </div>
      )}
    </div>
  );
}
