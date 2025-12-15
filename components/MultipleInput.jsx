"use client";

import { useEffect, useState } from "react";
import { X, Info } from "lucide-react";
import * as LucideIcons from "lucide-react";
import InputField from "./InputField";

export default function MultipleInput({
  labels = "Items",
  hint = null,
  label = "Item",
  btnLabel = "Add",
  items = [],
  onChange,

  type = "string", // "string" | "object"
  fields = ["name"],

  // textarea support
  textareaFields = [], // khusus object
  textareaRows = 4,
  textareaPlaceholder = "Write here...",

  // select support
  selectOptions = null,

  columns = 1,
}) {
  /* ================= HELPERS ================= */

  const makeEmptyObject = () =>
    Object.fromEntries(fields.map((f) => [f, ""]));

  const initEntries = () => {
    if (Array.isArray(items) && items.length) return items;
    if (type === "object") return [makeEmptyObject()];
    return [""];
  };

  const [entries, setEntries] = useState(initEntries);

  useEffect(() => {
    setEntries(initEntries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(items), type, JSON.stringify(fields)]);

  const resolveLucideIcon = (iconName) => {
    if (!iconName) return Info;
    const cleanName = iconName.replace(/[-_]/g, "").toLowerCase();
    const found = Object.entries(LucideIcons).find(
      ([key]) => key.toLowerCase() === cleanName
    );
    return found ? found[1] : Info;
  };

  const HintIcon = hint?.icon ? resolveLucideIcon(hint.icon) : Info;

  const emit = (updated) => {
    setEntries(updated);
    onChange?.(updated);
  };

  const addItem = () => {
    const newItem = type === "object" ? makeEmptyObject() : "";
    emit([...entries, newItem]);
  };

  const updateItem = (index, fieldOrValue, valueIfObject) => {
    const updated = [...entries];
    if (type === "object") {
      updated[index] = {
        ...(updated[index] || {}),
        [fieldOrValue]: valueIfObject,
      };
    } else {
      updated[index] = fieldOrValue;
    }
    emit(updated);
  };

  const removeItem = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    emit(updated.length ? updated : initEntries());
  };

  const isTextareaField = (field) =>
    Array.isArray(textareaFields) && textareaFields.includes(field);

  /* ================= RENDER ================= */

  return (
    <div className="my-2">
      {/* LABEL */}
      {labels && (
        <label className="block text-sm font-medium mb-2 text-gray-200 flex items-center gap-1">
          {labels}
          {hint && (
            <div className="relative group flex items-center">
              <HintIcon
                size={18}
                className="text-gray-400 cursor-pointer group-hover:text-blue-600"
              />
              <div
                className="absolute left-full bottom-0 ml-2 hidden group-hover:block
                bg-gray-800 text-gray-200 text-xs rounded-md px-3 py-2 shadow-lg z-20 w-80"
              >
                {hint.text}
              </div>
            </div>
          )}
        </label>
      )}

      {/* ITEMS */}
      {entries.map((item, index) => (
        <div
          key={index}
          className={`flex items-start gap-2 mb-2 ${
            type === "object"
              ? "rounded-lg border border-gray-700 bg-gray-900 p-2"
              : ""
          }`}
        >
          <div className="flex-1">
            {/* ===== OBJECT MODE ===== */}
            {type === "object" ? (
              <div
                className={`grid gap-2 ${
                  columns === 2 ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {fields.map((field) => (
                  <div key={field}>
                    {isTextareaField(field) ? (
                      <InputField
                        type="textarea"
                        value={item?.[field] || ""}
                        onChange={(val) => updateItem(index, field, val)}
                        placeholder={textareaPlaceholder}
                        rows={textareaRows}
                      />
                    ) : (
                      <InputField
                        type="text"
                        value={item?.[field] || ""}
                        onChange={(val) =>
                          updateItem(index, field, val)
                        }
                        placeholder={field
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      />
                    )}
                  </div>
                ))}
              </div>

            /* ===== STRING MODE ===== */
            ) : selectOptions ? (
              <select
                value={item ?? ""}
                onChange={(e) => updateItem(index, e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-gray-200"
              >
                <option value="">Select {label}</option>
                {selectOptions.map((opt) => (
                  <option
                    key={opt.value ?? opt}
                    value={opt.value ?? opt}
                  >
                    {opt.label ?? opt}
                  </option>
                ))}
              </select>
            ) : textareaRows > 1 ? (
              <InputField
                type="textarea"
                value={item ?? ""}
                onChange={(val) => updateItem(index, val)}
                placeholder={textareaPlaceholder || label}
                rows={textareaRows}
              />
            ) : (
              <InputField
                type="text"
                value={item ?? ""}
                onChange={(val) => updateItem(index, val)}
                placeholder={label}
              />
            )}
          </div>

          {/* REMOVE */}
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
            title="Remove"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      {/* ADD */}
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
