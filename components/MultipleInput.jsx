"use client";

import { useState } from "react";

export default function MultipleInput({
  labels = "Items",
  label = "Item",
  items = [],
  onChange,
  type = "string", // "string" | "object"
  fields = ["name"], // hanya untuk type object
  selectOptions = null, // hanya untuk single field select
}) {
  const [entries, setEntries] = useState(
    items.length
      ? items
      : type === "object"
      ? [Object.fromEntries(fields.map((f) => [f, ""]))]
      : [""]
  );

  const addItem = () => {
    const newItem =
      type === "object" ? Object.fromEntries(fields.map((f) => [f, ""])) : "";
    const updated = [...entries, newItem];
    setEntries(updated);
    onChange(updated);
  };

  const updateItem = (index, fieldOrValue, valueIfObject) => {
    const updated = [...entries];
    if (type === "object") {
      updated[index] = { ...updated[index], [fieldOrValue]: valueIfObject };
    } else {
      updated[index] = fieldOrValue;
    }
    setEntries(updated);
    onChange(updated);
  };

  const removeItem = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
    onChange(updated);
  };

  return (
    <div className="my-4">
      {labels && (
        <label className="block text-sm font-medium mb-2">{labels}</label>
      )}

      {entries.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2 border p-2 rounded-lg border-gray-400">
          {type === "object" ? (
            <div className="flex-1 flex flex-col gap-2">
              {fields.map((f) => (
                <input
                  key={f}
                  type="text"
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={item[f] || ""}
                  onChange={(e) => updateItem(index, f, e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                />
              ))}
            </div>
          ) : selectOptions ? (
            <select
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 p-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="">Select {label}</option>
              {selectOptions.map((opt) => (
                <option key={opt.value ?? opt} value={opt.value ?? opt}>
                  {opt.label ?? opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder={label}
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 p-2 rounded bg-gray-700 border border-gray-600"
            />
          )}
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            x
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add {label}
      </button>
    </div>
  );
}
