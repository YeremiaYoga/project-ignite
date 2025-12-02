"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
  damageType: [
    "acid",
    "bludgeoning",
    "cold",
    "fire",
    "force",
    "lightning",
    "necrotic",
    "piercing",
    "poison",
    "psychic",
    "radiant",
    "slashing",
    "thunder",
  ],
  school: [
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation",
  ],
  ritual: false,
};

const INITIAL_SELECTED = {
  classes: [],
  levels: [],
  castTime: [],
  damageType: [],
  range: [],
  school: [],
  ritual: false,
};

// ⚠️ Tambahan: untuk sync lowercase <-> label cast time
function normalizeCastTimeForModal(arr) {
  if (!Array.isArray(arr)) return [];

  const map = {
    action: "Action",
    "bonus action": "Bonus Action",
    reaction: "Reaction",
    round: "Round",
    minute: "Minute",
    hour: "Hour",
    special: "Special",
  };

  return arr.map((v) => {
    const lower = String(v).toLowerCase();
    return map[lower] || v;
  });
}

export default function SpellFilterModal({ onClose, onApply, value }) {
  // merge value dari parent dengan default
  const getInitialFromValue = (val) => {
    const base = {
      ...INITIAL_SELECTED,
      ...(val || {}),
    };

    return {
      ...base,
      // castTime dari parent bisa lowercase -> convert ke label modal
      castTime: normalizeCastTimeForModal(base.castTime),
    };
  };

  const [selected, setSelected] = useState(getInitialFromValue(value));

  // setiap kali value berubah (buka modal lagi), sync state lokal
  useEffect(() => {
    setSelected(getInitialFromValue(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const toggleOption = (category, value) => {
    setSelected((prev) => {
      if (category === "ritual") {
        return { ...prev, ritual: !prev.ritual };
      }

      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [category]: updated };
    });
  };

  const handleReset = () => {
    setSelected(INITIAL_SELECTED);
  };

  const handleApply = () => {
    const modified = {
      ...selected,
      // ⬇️ castTime dikembalikan ke lowercase ke parent (buat filter logic)
      castTime: (selected.castTime || []).map((ct) =>
        String(ct).toLowerCase()
      ),
      ritual: selected.ritual,
    };

    onApply(modified);
    onClose?.();
  };

  const renderButtonLabel = (key, value) => {
    if (key === "levels") {
      if (value === "Cantrips") return "Cantrips";
      return `${value}th`;
    }
    if (typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return String(value);
  };

  const sectionTitle = (key) => {
    switch (key) {
      case "classes":
        return "Classes";
      case "levels":
        return "Level";
      case "castTime":
        return "Cast Time";
      case "range":
        return "Range";
      case "damageType":
        return "Damage Type";
      case "school":
        return "School";
      case "ritual":
        return "Other Filters";
      default:
        return key;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* MODAL */}
      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-[#2a2f55] bg-[#050822] p-4 md:p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-100">
            Filter Spells
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        <div className="space-y-4">
          {Object.entries(FILTERS).map(([key, options]) => {
            if (key === "ritual") {
              return (
                <div key={key} className="border-t border-slate-700/60 pt-3">
                  <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    {sectionTitle(key)}
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                    <input
                      type="checkbox"
                      className="h-3 w-3 rounded border-slate-500 bg-transparent"
                      checked={selected.ritual}
                      onChange={() => toggleOption("ritual")}
                    />
                    <span>Ritual</span>
                  </label>
                </div>
              );
            }

            return (
              <div key={key}>
                <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  {sectionTitle(key)}
                </div>

                <div className="flex flex-wrap gap-2">
                  {(options || []).length === 0 ? (
                    <span className="text-xs text-slate-500">No options</span>
                  ) : (
                    options.map((value) => {
                      const active = (selected[key] || []).includes(value);

                      const activeColor =
                        key === "levels"
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-100"
                          : key === "classes"
                          ? "border-indigo-500 bg-indigo-500/20 text-indigo-100"
                          : key === "damageType"
                          ? "border-rose-500 bg-rose-500/20 text-rose-100"
                          : "border-sky-500 bg-sky-500/20 text-sky-100";

                      return (
                        <button
                          key={`${key}-${value}`}
                          type="button"
                          onClick={() => toggleOption(key, value)}
                          className={`px-2.5 py-1 rounded-md border text-xs capitalize transition
                            ${
                              active
                                ? activeColor
                                : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]"
                            }`}
                        >
                          {renderButtonLabel(key, value)}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-700/60">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs rounded-md border border-[#2a2f55] bg-[#0b1034] hover:bg-[#151d55] text-slate-200"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs rounded-md border border-[#2a2f55] bg-[#0b1034] hover:bg-[#151d55] text-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-3 py-1.5 text-xs rounded-md border border-emerald-600 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
