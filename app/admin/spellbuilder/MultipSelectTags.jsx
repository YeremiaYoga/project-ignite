import React from "react";

const MultiSelectTags = ({ label, options, selected, onSelect, onDeselect }) => {
  return (
    <div className="my-4">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2 min-h-[36px]">
        {selected.map((item) => {
          const displayLabel = options.find(opt => opt.value === item)?.label || item;
          return (
            <span
              key={item}
              className="flex items-center bg-blue-700 text-white px-2 py-1 rounded-full text-sm"
            >
              {displayLabel}
              <button
                type="button"
                onClick={() => onDeselect(item)}
                className="ml-2 text-white hover:text-red-300"
              >
                ✕
              </button>
            </span>
          );
        })}
      </div>
      <select
        value=""
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Pilih {label}
        </option>
        {options
          .filter((opt) => !selected.includes(opt.value))
          .map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default MultiSelectTags;