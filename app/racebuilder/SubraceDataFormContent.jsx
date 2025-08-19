"use client";

import { useState } from "react";

export default function SubraceDataFormContent({ selectedFolder, onSubmit }) {
  const [subraceNameInput, setSubraceNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [detailValue, setDetailValue] = useState({});
  const ensureDescription = () => {
    if (!("description" in detailValue))
      setDetailValue({ ...detailValue, description: "" });
  };

  const ensureTable = () => {
    if (!("table" in detailValue))
      setDetailValue({
        ...detailValue,
        table: { headers: [""], rows: [[""]] },
      });
  };

  const ensureList = () => {
    if (!("list" in detailValue))
      setDetailValue({ ...detailValue, list: [""] });
  };

  const updateDescription = (text) =>
    setDetailValue({ ...detailValue, description: text });

  const addTableHeader = () => {
    const table = detailValue.table ?? { headers: [], rows: [] };
    const nextHeaders = [...table.headers, ""];
    const nextRows = (table.rows || []).map((r) => [...r, ""]);
    setDetailValue({
      ...detailValue,
      table: { headers: nextHeaders, rows: nextRows },
    });
  };

  const changeTableHeader = (i, text) => {
    const table = detailValue.table;
    const nextHeaders = table.headers.map((h, idx) => (idx === i ? text : h));
    setDetailValue({
      ...detailValue,
      table: { headers: nextHeaders, rows: table.rows },
    });
  };

  const addTableRow = () => {
    const table = detailValue.table ?? { headers: [], rows: [] };
    const colCount = table.headers?.length || 0;
    const nextRows = [...(table.rows || []), Array(colCount).fill("")];
    setDetailValue({
      ...detailValue,
      table: { headers: table.headers || [], rows: nextRows },
    });
  };

  const changeTableCell = (rIdx, cIdx, text) => {
    const table = detailValue.table;
    const nextRows = table.rows.map((row, ri) =>
      ri === rIdx ? row.map((cell, ci) => (ci === cIdx ? text : cell)) : row
    );
    setDetailValue({
      ...detailValue,
      table: { headers: table.headers, rows: nextRows },
    });
  };

  const addListItem = () => {
    const next = [...(detailValue.list || []), ""];
    setDetailValue({ ...detailValue, list: next });
  };

  const changeListItem = (i, text) => {
    const next = (detailValue.list || []).map((it, idx) =>
      idx === i ? text : it
    );
    setDetailValue({ ...detailValue, list: next });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subraceNameInput.trim() === "") {
      alert("Subrace name cannot be empty.");
      return;
    }

    setIsLoading(true);

    const dataToSave = {
      name: subraceNameInput.trim(),
      raceName: selectedFolder,
      description: detailValue.description || "",
      table: detailValue.table || { headers: [], rows: [] },
      list: detailValue.list || [],
    };

    try {
      const response = await fetch("/api/races/saveSubrace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        alert(`Subrace '${subraceNameInput.trim()}' saved successfully!`);
        if (onSubmit) onSubmit(dataToSave);
        setSubraceNameInput("");
        setDetailValue({});
      } else {
        const errorData = await response.json();
        alert(
          `Failed to save subrace: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error saving subrace:", error);
      alert("An error occurred while saving the subrace.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-4 text-white"
    >
      <h3 className="text-xl font-bold mb-4">Create New Subrace</h3>

      {isLoading && <p className="text-center text-gray-400">Saving...</p>}

      {!isLoading && (
        <>
          {/* Nama Subrace */}
          <div>
            <label htmlFor="subrace-name" className="block mb-1 font-medium">
              Subrace Name
            </label>
            <input
              id="subrace-name"
              type="text"
              value={subraceNameInput}
              onChange={(e) => setSubraceNameInput(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              placeholder="Enter subrace name (e.g., Hill Dwarf)"
              required
            />
          </div>

          {/* Detail Controls */}
          <div className="border border-gray-700 rounded-xl p-4">
            <h4 className="text-lg font-semibold mb-3">Detail</h4>

            <div className="flex flex-wrap gap-2 mb-3">
              {!("description" in detailValue) && (
                <button
                  type="button"
                  onClick={ensureDescription}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  + Description
                </button>
              )}
              {!("table" in detailValue) && (
                <button
                  type="button"
                  onClick={ensureTable}
                  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
                >
                  + Table
                </button>
              )}
              {!("list" in detailValue) && (
                <button
                  type="button"
                  onClick={ensureList}
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
                >
                  + List
                </button>
              )}
            </div>

            {/* Description */}
            {"description" in detailValue && (
              <div className="mb-3">
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={detailValue.description}
                  onChange={(e) => updateDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  placeholder="Describe subrace..."
                />
              </div>
            )}

            {/* Table */}
            {"table" in detailValue && (
              <div className="mb-3">
                <label className="block mb-1 font-medium">Table</label>

                <div className="flex flex-wrap gap-2 mb-2">
                  {(detailValue.table?.headers || []).map((h, i) => (
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

                {(detailValue.table?.rows || []).map((row, rIdx) => (
                  <div key={rIdx} className="flex flex-wrap gap-2 mb-2">
                    {row.map((cell, cIdx) => (
                      <input
                        key={cIdx}
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          changeTableCell(rIdx, cIdx, e.target.value)
                        }
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

            {/* List */}
            {"list" in detailValue && (
              <div>
                <label className="block mb-1 font-medium">List</label>
                {(detailValue.list || []).map((it, i) => (
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

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Create Subrace"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
