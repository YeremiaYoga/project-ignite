"use client";

import { useState } from "react";
import { X, Info } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function MultipleInput({
  labels = "Items",
  hint = null, // { text: "", icon: "calendar" }
  label = "Item",
  btnLabel = "Add",
  items = [],
  onChange,
  type = "string", // "string" | "object"
  fields = ["name"],
  selectOptions = null,
  columns = 1,
}) {
  const [entries, setEntries] = useState(
    items.length
      ? items
      : type === "object"
      ? [Object.fromEntries(fields.map((f) => [f, ""]))]
      : [""]
  );

  const resolveLucideIcon = (iconName) => {
    if (!iconName) return Info;
    const cleanName = iconName.replace(/[-_]/g, "").toLowerCase();
    const found = Object.entries(LucideIcons).find(
      ([key]) => key.toLowerCase() === cleanName
    );
    return found ? found[1] : Info;
  };

  const HintIcon = hint?.icon ? resolveLucideIcon(hint.icon) : Info;

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
    <div className="my-2">
      {/* Label utama dengan hint */}
      {labels && (
        <label className="block text-sm font-medium mb-2 text-gray-200 flex items-center gap-1">
          {labels}
          {hint && (
            <div className="relative group flex items-center">
              <HintIcon
                size={18}
                className="text-gray-400 cursor-pointer transition-colors duration-200 group-hover:text-blue-600"
              />
              <div
                className="absolute left-full bottom-0 ml-2 hidden group-hover:block 
                transition-all duration-150 opacity-0 group-hover:opacity-100 
                group-hover:translate-x-[2px] bg-gray-800 text-gray-200 text-xs 
                rounded-md px-3 py-2 shadow-lg z-20 w-80"
              >
                {hint.text}
              </div>
            </div>
          )}
        </label>
      )}

      {/* Daftar input */}
      {entries.map((item, index) => (
        <div
          key={index}
          className={`flex items-center mb-2 ${
            type === "object"
              ? "rounded-lg border border-gray-700 bg-gray-900"
              : ""
          }`}
        >
          {type === "object" ? (
            <div
              className={`flex-1 grid gap-2 p-2 ${
                columns === 2 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {fields.map((f) => (
                <input
                  key={f}
                  type="text"
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={item[f] || ""}
                  onChange={(e) => updateItem(index, f, e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-100"
                />
              ))}
            </div>
          ) : selectOptions ? (
            <select
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 p-2 rounded-lg border bg-gray-800 border-gray-600 text-gray-200 focus:border-blue-500"
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
              className="flex-1 p-2 rounded-lg border bg-gray-800 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          )}

          <div className="flex justify-center items-center px-1">
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}

      {/* Tombol tambah */}
      <button
        type="button"
        onClick={addItem}
        className="px-2 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
      >
        {btnLabel === "Add" || !btnLabel ? `Add ${label}` : btnLabel}
      </button>
    </div>
  );
}
