"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";

/* =========================
 * Helpers (same as spells)
 * ========================= */
function uniq(arr) {
  return Array.from(
    new Set((arr || []).filter((x) => x !== null && x !== undefined && x !== ""))
  );
}
function removeFrom(arr, v) {
  return (arr || []).filter((x) => x !== v);
}

// tri-state cycle: 0(off) -> 1(ONLY) -> 2(NO) -> 0(off)
function cycleTriState(prev, key, value) {
  const onlyKey = `${key}Only`;
  const blackKey = `${key}Blacklist`;

  const only = uniq(prev[onlyKey]);
  const black = uniq(prev[blackKey]);

  const inOnly = only.includes(value);
  const inBlack = black.includes(value);

  if (!inOnly && !inBlack) {
    return { ...prev, [onlyKey]: [...only, value], [blackKey]: black };
  }
  if (inOnly && !inBlack) {
    return {
      ...prev,
      [onlyKey]: removeFrom(only, value),
      [blackKey]: [...black, value],
    };
  }
  return { ...prev, [onlyKey]: only, [blackKey]: removeFrom(black, value) };
}

function optionState(selected, key, value) {
  const onlyKey = `${key}Only`;
  const blackKey = `${key}Blacklist`;
  if ((selected[blackKey] || []).includes(value)) return 2;
  if ((selected[onlyKey] || []).includes(value)) return 1;
  return 0;
}

/**
 * IMPORTANT:
 * - weaponType DB uses camel ("simpleM") so we preserve case.
 * - baseWeapon/mastery/properties are stored lowercase in DB so we lowercase them.
 * - types/rarities normalize to lowercase.
 */
function normalizeValueForKey(filterKey, raw) {
  if (raw == null) return "";

  if (filterKey === "weaponType") return String(raw).trim(); // keep: simpleM
  if (filterKey === "baseWeapon") return String(raw).trim().toLowerCase();
  if (filterKey === "mastery") return String(raw).trim().toLowerCase();
  if (filterKey === "properties") return String(raw).trim().toLowerCase();

  return String(raw).trim().toLowerCase();
}

/* =========================
 * Config
 * ========================= */
const PRICE_MIN_DEFAULT = 0;
const PRICE_MAX_DEFAULT = 200000;

const FILTERS = {
  weaponType: [
    { key: "natural", label: "Natural" },
    { key: "improv", label: "Improvised" },
    { key: "siege", label: "Siege Weapon" },
    { key: "simpleM", label: "Simple Melee" },
    { key: "simpleR", label: "Simple Range" },
    { key: "martialM", label: "Martial Melee" },
    { key: "martialR", label: "Martial Range" },
  ],

  baseWeapon: [
    { key: "battleaxe", label: "Battleaxe" },
    { key: "pistol", label: "Pistol" },
    { key: "musket", label: "Musket" },
    { key: "morningstar", label: "Morningstar" },
    { key: "maul", label: "Maul" },
    { key: "mace", label: "Mace" },
    { key: "longsword", label: "Longsword" },
    { key: "longbow", label: "Longbow" },
    { key: "lighthammer", label: "Light Hammer" },
    { key: "lightcrossbow", label: "Light Crossbow" },
    { key: "lance", label: "Lance" },
    { key: "javelin", label: "Javelin" },
    { key: "heavycrossbow", label: "Heavy Crossbow" },
    { key: "handcrossbow", label: "Hand Crossbow" },
    { key: "handaxe", label: "Handaxe" },
    { key: "halberd", label: "Halberd" },
    { key: "greatsword", label: "Greatsword" },
    { key: "greatclub", label: "Greatclub" },
    { key: "greataxe", label: "Greataxe" },
    { key: "glaive", label: "Glaive" },
    { key: "flail", label: "Flail" },
    { key: "dart", label: "Dart" },
    { key: "dagger", label: "Dagger" },
    { key: "club", label: "Club" },
    { key: "blowgun", label: "Blowgun" },
    { key: "rapier", label: "Rapier" },
    { key: "sickle", label: "Sickle" },
    { key: "scimitar", label: "Scimitar" },
    { key: "spear", label: "Spear" },
    { key: "shortsword", label: "Shortsword" },
    { key: "trident", label: "Trident" },
    { key: "warpick", label: "Warpick" },
    { key: "whip", label: "Whip" },
    { key: "warhammer", label: "Warhammer" },
    { key: "pike", label: "Pike" },
    { key: "sling", label: "Sling" },
    { key: "__null__", label: "Others/Unknown" },
  ],

  mastery: [
    { key: "cleave", label: "Cleave" },
    { key: "graze", label: "Graze" },
    { key: "nick", label: "Nick" },
    { key: "push", label: "Push" },
    { key: "sap", label: "Sap" },
    { key: "slow", label: "Slow" },
    { key: "topple", label: "Topple" },
    { key: "vex", label: "Vex" },
  ],

  properties: [
    { key: "mgc", label: "Magical" },
    { key: "fin", label: "Finesse" },
    { key: "ver", label: "Versatile" },
    { key: "hvy", label: "Heavy" },
    { key: "lgt", label: "Light" },
    { key: "two", label: "Two-handed Weapon" },
    { key: "rch", label: "Reach" },
    { key: "sil", label: "Silvered" },
    { key: "thr", label: "Thrown" },
    { key: "amm", label: "Ammunition" },
    { key: "foc", label: "Focus" },
    { key: "lod", label: "Loading" },
    { key: "rel", label: "Reloading" },
    { key: "ada", label: "Adamantine" },
    { key: "fir", label: "Firearm" },
    { key: "spc", label: "Special" },
  ],
};

const INITIAL_SELECTED = {
  typesOnly: [],
  typesBlacklist: [],
  raritiesOnly: [],
  raritiesBlacklist: [],

  weaponTypeOnly: [],
  weaponTypeBlacklist: [],
  baseWeaponOnly: [],
  baseWeaponBlacklist: [],
  masteryOnly: [],
  masteryBlacklist: [],
  propertiesOnly: [],
  propertiesBlacklist: [],

  priceMin: PRICE_MIN_DEFAULT,
  priceMax: PRICE_MAX_DEFAULT,
  priceIncludeInfinity: true,
};

export default function ItemFilterModal({
  typeOptions = [],
  rarityOptions = [],
  onClose,
  onApply,
  value,
}) {
  const getInitialFromValue = (val) => {
    const base = { ...INITIAL_SELECTED, ...(val || {}) };

    return {
      ...base,
      typesOnly: uniq(base.typesOnly).map((x) => normalizeValueForKey("types", x)),
      typesBlacklist: uniq(base.typesBlacklist).map((x) => normalizeValueForKey("types", x)),

      raritiesOnly: uniq(base.raritiesOnly).map((x) => normalizeValueForKey("rarities", x)),
      raritiesBlacklist: uniq(base.raritiesBlacklist).map((x) =>
        normalizeValueForKey("rarities", x)
      ),

      weaponTypeOnly: uniq(base.weaponTypeOnly).map((x) =>
        normalizeValueForKey("weaponType", x)
      ),
      weaponTypeBlacklist: uniq(base.weaponTypeBlacklist).map((x) =>
        normalizeValueForKey("weaponType", x)
      ),

      baseWeaponOnly: uniq(base.baseWeaponOnly).map((x) =>
        x == null || x === "" ? "__null__" : normalizeValueForKey("baseWeapon", x)
      ),
      baseWeaponBlacklist: uniq(base.baseWeaponBlacklist).map((x) =>
        x == null || x === "" ? "__null__" : normalizeValueForKey("baseWeapon", x)
      ),

      masteryOnly: uniq(base.masteryOnly).map((x) => normalizeValueForKey("mastery", x)),
      masteryBlacklist: uniq(base.masteryBlacklist).map((x) =>
        normalizeValueForKey("mastery", x)
      ),

      propertiesOnly: uniq(base.propertiesOnly).map((x) => normalizeValueForKey("properties", x)),
      propertiesBlacklist: uniq(base.propertiesBlacklist).map((x) =>
        normalizeValueForKey("properties", x)
      ),

      priceMin: typeof base.priceMin === "number" ? base.priceMin : PRICE_MIN_DEFAULT,
      priceMax: typeof base.priceMax === "number" ? base.priceMax : PRICE_MAX_DEFAULT,
      priceIncludeInfinity: !!base.priceIncludeInfinity,
    };
  };

  const [selected, setSelected] = useState(getInitialFromValue(value));

  useEffect(() => {
    setSelected(getInitialFromValue(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleReset = () => setSelected(getInitialFromValue({}));

  const handleApply = () => {
    const out = {
      ...selected,

      baseWeaponOnly: uniq(selected.baseWeaponOnly).map((x) => (x === "__null__" ? null : x)),
      baseWeaponBlacklist: uniq(selected.baseWeaponBlacklist).map((x) =>
        x === "__null__" ? null : x
      ),

      priceMin: Math.max(PRICE_MIN_DEFAULT, Number(selected.priceMin ?? 0)),
      priceMax: Math.max(PRICE_MIN_DEFAULT, Number(selected.priceMax ?? 0)),
      priceIncludeInfinity: !!selected.priceIncludeInfinity,
    };

    onApply?.(out);
    onClose?.();
  };

  const section = (title) => (
    <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">
      {title}
    </div>
  );

  const renderTriStateButtons = (key, options, onlyColor) => (
    <div className="flex flex-wrap gap-2">
      {(options || []).map((opt) => {
        const value = normalizeValueForKey(key, opt.key);
        const state = optionState(selected, key, value);

        const blackColor = "border-slate-500 bg-slate-500/10 text-slate-300";
        const cls =
          state === 2
            ? blackColor
            : state === 1
            ? onlyColor
            : "border-[#2a2f55] bg-[#0b1034] text-slate-200 hover:bg-[#151d55]";

        const badge =
          state === 1 ? (
            <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-white/5 border border-white/10">
              ONLY
            </span>
          ) : state === 2 ? (
            <span className="ml-1 inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[9px] bg-slate-600/15 border border-slate-500/30">
              NO
            </span>
          ) : null;

        return (
          <button
            key={`${key}-${String(opt.key)}`}
            type="button"
            onClick={() => setSelected((prev) => cycleTriState(prev, key, value))}
            className={`px-2.5 py-1 rounded-md border text-xs capitalize transition ${cls}`}
          >
            {opt.label}
            {badge}
          </button>
        );
      })}
    </div>
  );

  // Price UI values
  const priceMin = Math.max(PRICE_MIN_DEFAULT, selected.priceMin ?? PRICE_MIN_DEFAULT);
  const priceMax = Math.max(priceMin, selected.priceMax ?? PRICE_MAX_DEFAULT);

  const weaponSelected =
    (selected.typesOnly || []).includes("weapon") &&
    !(selected.typesBlacklist || []).includes("weapon");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-[#2a2f55] bg-[#050822] p-4 md:p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <SlidersHorizontal className="w-4 h-4 text-slate-300" />
            <span>Filter Items</span>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-slate-800">
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        <div className="space-y-4">
          {/* ===== PRICE RANGE (INPUT ABOVE, SLIDER BELOW) ===== */}
          <div className="border border-slate-700/70 rounded-lg px-3 py-3 bg-[#050a2a]/60">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Price (cp)
              </div>
              <div className="text-[11px] text-slate-300">
                {priceMin} – {selected.priceIncludeInfinity ? "∞" : priceMax} cp
              </div>
            </div>

            <div className="space-y-3">
              {/* ✅ inputs on top */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 w-36">
                  <input
                    type="number"
                    min={PRICE_MIN_DEFAULT}
                    max={PRICE_MAX_DEFAULT}
                    value={priceMin}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (Number.isNaN(v)) return;
                      setSelected((p) => {
                        const nextMin = Math.max(
                          PRICE_MIN_DEFAULT,
                          Math.min(PRICE_MAX_DEFAULT, v)
                        );
                        const nextMax = Math.max(nextMin, p.priceMax ?? PRICE_MAX_DEFAULT);
                        return { ...p, priceMin: nextMin, priceMax: nextMax };
                      });
                    }}
                    className="w-full rounded-md border border-slate-600 bg-[#02051b] px-2 py-1 text-xs text-slate-100 outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-400">min</span>
                </div>

                <div className="flex items-center gap-1 w-36">
                  <input
                    type="number"
                    min={PRICE_MIN_DEFAULT}
                    max={PRICE_MAX_DEFAULT}
                    value={priceMax}
                    disabled={selected.priceIncludeInfinity}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (Number.isNaN(v)) return;
                      setSelected((p) => {
                        const nextMax = Math.max(
                          p.priceMin ?? PRICE_MIN_DEFAULT,
                          Math.min(PRICE_MAX_DEFAULT, v)
                        );
                        return { ...p, priceMax: nextMax };
                      });
                    }}
                    className={`w-full rounded-md border border-slate-600 bg-[#02051b] px-2 py-1 text-xs text-slate-100 outline-none focus:ring-1 focus:ring-emerald-500 ${
                      selected.priceIncludeInfinity ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  />
                  <span className="text-xs text-slate-400">max</span>
                </div>
              </div>

              {/* ✅ slider below */}
              <Slider.Root
                className="relative flex w-full items-center h-6"
                min={PRICE_MIN_DEFAULT}
                max={PRICE_MAX_DEFAULT}
                step={50}
                value={[priceMin, priceMax]}
                onValueChange={([min, max]) => {
                  const clampedMin = Math.max(
                    PRICE_MIN_DEFAULT,
                    Math.min(PRICE_MAX_DEFAULT, min)
                  );
                  const clampedMax = Math.max(
                    clampedMin,
                    Math.min(PRICE_MAX_DEFAULT, max)
                  );
                  setSelected((p) => ({ ...p, priceMin: clampedMin, priceMax: clampedMax }));
                }}
              >
                <Slider.Track className="bg-slate-700 relative grow rounded-full h-1">
                  <Slider.Range className="absolute bg-emerald-500 rounded-full h-1" />
                </Slider.Track>
                <Slider.Thumb className="block w-3 h-3 bg-emerald-400 rounded-full border border-emerald-200 shadow" />
                <Slider.Thumb className="block w-3 h-3 bg-emerald-400 rounded-full border border-emerald-200 shadow" />
              </Slider.Root>

              <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-700/60 mt-2">
                <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-slate-500 bg-transparent"
                    checked={selected.priceIncludeInfinity}
                    onChange={() =>
                      setSelected((p) => ({ ...p, priceIncludeInfinity: !p.priceIncludeInfinity }))
                    }
                  />
                  <span>Max = Infinity</span>
                </label>
              </div>
            </div>
          </div>

          {/* ===== TYPE (tri-state) ===== */}
          <div>
            {section("Type")}
            {renderTriStateButtons(
              "types",
              (typeOptions || []).map((t) => ({ key: t.key, label: t.label })),
              "border-emerald-500 bg-emerald-500/20 text-emerald-100"
            )}
          </div>

          {/* ===== RARITY (tri-state) ===== */}
          <div>
            {section("Rarity")}
            {renderTriStateButtons(
              "rarities",
              (rarityOptions || []).map((r) => ({ key: r.key, label: r.label })),
              "border-indigo-500 bg-indigo-500/20 text-indigo-100"
            )}
          </div>

          {/* ===== WEAPON-ONLY FILTERS ===== */}
          {!weaponSelected ? (
            <div className="text-xs text-slate-500 border border-slate-700/60 rounded-lg p-3 bg-[#050a2a]/50">
              Select <span className="text-slate-300">Type Weapon</span> to show weapon-specific filters.
            </div>
          ) : (
            <>
              <div>
                {section("Weapon Type")}
                {renderTriStateButtons(
                  "weaponType",
                  FILTERS.weaponType,
                  "border-sky-500 bg-sky-500/20 text-sky-100"
                )}
              </div>

              <div>
                {section("Base Weapon")}
                {renderTriStateButtons(
                  "baseWeapon",
                  FILTERS.baseWeapon,
                  "border-amber-500 bg-amber-500/20 text-amber-100"
                )}
              </div>

              <div>
                {section("Mastery")}
                {renderTriStateButtons(
                  "mastery",
                  FILTERS.mastery,
                  "border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-100"
                )}
              </div>

              <div>
                {section("Weapon Properties")}
                {renderTriStateButtons(
                  "properties",
                  FILTERS.properties.map((p) => ({ key: p.key, label: `${p.label}` })),
                  "border-rose-500 bg-rose-500/20 text-rose-100"
                )}
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
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

export { PRICE_MIN_DEFAULT, PRICE_MAX_DEFAULT };
