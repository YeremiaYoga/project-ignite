"use client";

import { useState } from "react";

const FILTERS = {
  classes: [
    "Artificer",
    "Barbarian",
    "Bard",
    "Blood Hunter",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
  ],
  levels: ["Cantrips", 1, 2, 3, 4, 5, 6, 7, 8, 9],
  castTime: [
    "Action",
    "Bonus Action",
    "Reaction",
    "Round",
    "Minute",
    "Hour",
    "Special",
  ],
  range: ["Self", "Touch", "Point", "Area", "Special"],
  damageType: [],
  school: [],
};

const INITIAL_SELECTED = {
  classes: [],
  levels: [],
  castTime: [],
  damageType: [],
  range: [],
  school: [],
};

export default function ModalFilter({ isOpen, onClose, onApply }) {
  const [selected, setSelected] = useState({
    classes: [],
    levels: [],
    castTime: [],
    damageType: [],
    range: [],
    school: [],
  });

  const toggleOption = (category, value) => {
    setSelected((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const applyFilters = () => {
    const modified = {
      ...selected,
      castTime: selected.castTime.map((ct) => ct.toLowerCase()),
    };
    onApply(modified);
    onClose();
  };
  const resetFilters = () => {
    setSelected(INITIAL_SELECTED);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-gray-900 w-[90%] max-h-[90vh] rounded-xl p-4 overflow-y-auto text-white">
        <h2 className="text-lg font-bold mb-4">Filter Spells</h2>

        {Object.entries(FILTERS).map(([key, options]) => (
          <div key={key} className="mb-4">
            <h3 className="font-semibold capitalize mb-1">{key}</h3>
            <div className="flex flex-wrap gap-2">
              {options.length === 0 ? (
                <span className="text-sm text-gray-400">...</span>
              ) : (
                options.map((value) => (
                  <button
                    key={value}
                    className={`text-sm px-3 py-1 rounded border transition ${
                      selected[key].includes(value)
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-gray-800 border-gray-600 text-gray-200"
                    }`}
                    onClick={() => toggleOption(key, value)}
                  >
                    {key === "levels"
                      ? value === "Cantrips"
                        ? "Cantrips"
                        : `${value}th`
                      : value}
                  </button>
                ))
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
