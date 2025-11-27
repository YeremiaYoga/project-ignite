"use client";

// urutan properties
const PROPERTY_ORDER = [
  "mgc",
  "fin",
  "ver",
  "hvy",
  "lgt",
  "two",
  "rch",
  "sil",
  "thr",
  "amm",
  "foc",
  "lod",
  "rel",
  "ada",
  "fir",
  "spc",
];

const PROPERTY_META = {
  mgc: {
    label: "✨Magical✨",
    description:
      "Every magic item has a rarity, which provides a rough measure of an item’s power relative to other magic items. The rarities are shown in the Magic Item Rarities and Values table. Common magic items, such as a Potion of Healing, are the most plentiful. Artifacts, such as the Dragon Orb, are priceless, unique, and difficult to acquire.",
  },
  fin: {
    label: "Finesse",
    description:
      "When making an attack with a Finesse weapon, use your choice of your Strength or Dexterity modifier for the attack and damage rolls. You must use the same modifier for both rolls.",
  },
  ver: {
    label: "Versatile",
    description:
      "A Versatile weapon can be used with one or two hands. A damage value in parentheses appears with the property. The weapon deals that damage when used with two hands to make a melee attack.",
  },
  hvy: {
    label: "Heavy",
    description:
      "You have Disadvantage on attack rolls with a Heavy weapon if it’s a Melee weapon and your Strength score isn’t at least 13 or if it’s a Ranged weapon and your Dexterity score isn’t at least 13.",
  },
  lgt: {
    label: "Light",
    description:
      "When you take the Attack action on your turn and attack with a Light weapon, you can make one extra attack as a Bonus Action later on the same turn. That extra attack must be made with a different Light weapon, and you don’t add your ability modifier to the extra attack’s damage unless that modifier is negative. For example, you can attack with a Shortsword in one hand and a Dagger in the other using the Attack action and a Bonus Action, but you don’t add your Strength or Dexterity modifier to the damage roll of the Bonus Action unless that modifier is negative.",
  },
  two: {
    label: "Two-handed Weapon",
    description:
      "A Two-Handed weapon requires two hands when you attack with it.",
  },
  rch: {
    label: "Reach",
    description:
      "A Reach weapon adds 5 feet to your reach when you attack with it, as well as when determining your reach for Opportunity Attacks with it.",
  },
  sil: {
    label: "Silvered",
    description:
      "Some monsters that have immunity or resistance to nonmagical weapons are susceptible to silver weapons, so cautious adventurers invest extra coin to plate their weapons with silver. You can silver a single weapon or ten pieces of ammunition for 100 gp. This cost represents not only the price of the silver, but the time and expertise needed to add silver to the weapon without making it less effective.",
  },
  thr: {
    label: "Thrown",
    description:
      "If a weapon has the Thrown property, you can throw the weapon to make a ranged attack, and you can draw that weapon as part of the attack. If the weapon is a Melee weapon, use the same ability modifier for the attack and damage rolls that you use for a melee attack with that weapon.",
  },
  amm: {
    label: "Ammunition",
    description:
      "You can use a weapon that has the Ammunition property to make a ranged attack only if you have ammunition to fire from it. The type of ammunition required is specified with the weapon’s range. Each attack expends one piece of ammunition. Drawing the ammunition is part of the attack (you need a free hand to load a one-handed weapon). After a fight, you can spend 1 minute to recover half the ammunition (round down) you used in the fight; the rest is lost.",
  },
  foc: {
    label: "Focus",
    description: "You can use this weapon as spellcasting focus.",
  },
  lod: {
    label: "Loading",
    description:
      "You can fire only one piece of ammunition from a Loading weapon when you use an action, a Bonus Action, or a Reaction to fire it, regardless of the number of attacks you can normally make.",
  },
  rel: {
    label: "Reloading",
    description:
      "You can make a limited number of shots with a Reload weapon. You must then reload the weapon as an action or a Bonus Action.",
  },
  ada: {
    label: "Adamantine",
    description:
      "When an adamantine weapon or ammunition hits an object, the hit is a critical hit. This property functions regardless of any magical enchantment on the weapon.",
  },
  fir: {
    label: "Firearm",
    description:
      "Firearm Bullets are destroyed upon use in a modern firearm. Futuristic firearms use Energy Cells that become depleted but could possibly be recharged with the proper equipment, at your discretion.",
  },
  spc: {
    label: "Special",
    description:
      "A weapon with the special property has unusual rules governing its use, explained in the weapon’s description",
  },
};

// mapping warna rarity
const RARITY_COLORS = {
  common: "#b5bda6",
  uncommon: "#78c178",
  rare: "#6464bd",
  "very rare": "#62c1ad",
  legendary: "#bb9348",
  artifact: "#a46b43",
};
function normalizeRarityKey(r) {
  if (!r) return "";

  let key = r.toLowerCase().trim();

  key = key.replace(/[-_]/g, " ");

  key = key.replace(/\s+/g, " ");

  if (key.replace(/\s+/g, "") === "veryrare") {
    key = "very rare";
  }

  return key;
}

const MASTERY_DESCRIPTIONS = {
  cleave: `If you hit a creature with a melee weapon attack, you can make a second attack against a creature within 5 feet that is also within your reach. When you hit with the second attack, you can roll your weapon’s damage, but you don’t add your ability modifier unless it’s negative.`,

  graze: `If you miss a creature with your weapon, you deal damage equal to the ability modifier you used to make the roll.`,

  nick: `You can make an additional attack against a target creature if your first attack was made while wielding two Light weapons.`,

  push: `You can launch a creature you hit (up to a Large size) 10 feet away from you.`,

  sap: `An enemy you hit has Disadvantage on their next attack roll before the start of your next turn.`,

  slow: `When you hit a creature and deal damage, you can reduce its Speed by 10 feet until the start of your next turn.`,

  topple: `When you hit a creature, you can force it to make a Constitution saving throw or fall Prone.The DC for this save is 8 + modifier used to make the attack + your Proficiency Bonus.`,

  vex: `When you hit a creature and deal damage, you gain Advantage on your next attack roll before the end of your next turn.`,
};

export default function ItemDetail({ item }) {
  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
        Select an item from the list.
      </div>
    );
  }

  // ====== BASIC FIELDS ======
  const name = item.name || "Unnamed item";
  const type = item.__type || item.type || "";
  const rarity = item.rarity || item.rarity_name || "";
  const rarityKey = normalizeRarityKey(item.rarity);
  const rarityColor = RARITY_COLORS[rarityKey] || "#e5e7eb";

  const weaponTypeRaw = item.weapon_type || "";
  const mastery = item.mastery || "";
  const attunement = item.attunement || "";
  const sourceBook = item.source_book || "";
  const compendiumSource = item.compendium_source || "";

  const price = item.price ?? item.cost ?? "";
  const weight = item.weight ?? "";

  const imgSrc =
    item.image ||
    item.format_data?.img ||
    item.raw_data?.img ||
    "/assets/example_token.png";

  // slug untuk anchor / share link
  const slugBase = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const slug =
    item.id != null ? `${slugBase}-${String(item.id).slice(-6)}` : slugBase;

  function formatNumber(value) {
    return value.toLocaleString("de-DE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  function formatPriceLabel(value) {
    if (value == null || isNaN(value)) return "-";

    if (value < 10) {
      return `${formatNumber(value)} Cp`;
    }

    if (value < 100) {
      const sp = value / 10;
      return `${formatNumber(sp)} Sp`;
    }

    const gp = value / 100;
    return `${formatNumber(gp)} Gp`;
  }

  const rawPrice = typeof price === "number" ? price : Number(price ?? NaN);
  const priceLabel =
    typeof rawPrice === "number" && !Number.isNaN(rawPrice)
      ? formatPriceLabel(rawPrice)
      : "-";

  const weightLabel = weight ? `${weight} lb` : "-";

  let damageTypes = [];
  if (Array.isArray(item.damage_type)) {
    damageTypes = item.damage_type;
  } else if (typeof item.damage_type === "string" && item.damage_type.trim()) {
    try {
      damageTypes = JSON.parse(item.damage_type);
    } catch {
      damageTypes = [item.damage_type];
    }
  }

  let properties = [];
  if (Array.isArray(item.properties)) {
    properties = item.properties;
  } else if (typeof item.properties === "string" && item.properties.trim()) {
    try {
      properties = JSON.parse(item.properties);
    } catch {
      properties = [item.properties];
    }
  } else if (
    item.properties &&
    typeof item.properties === "object" &&
    !Array.isArray(item.properties)
  ) {
    // handle bentuk { mgc: true, fin: true, ... }
    properties = Object.entries(item.properties)
      .filter(([, v]) => !!v)
      .map(([k]) => k);
  }

  const descriptionHtml =
    item.format_data?.system?.description?.value ||
    item.raw_data?.system?.description?.value ||
    item.description ||
    "<p>No description available.</p>";

  function cap(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function joinClean(arr) {
    return arr.filter((x) => x && x.trim() !== "").join(" - ");
  }

  function mapWeaponTypeValue(v) {
    if (!v) return "";

    const key = v.toLowerCase();

    const map = {
      martialm: "Martial Melee",
      martialr: "Martial Range",
      simplem: "Simple Melee",
      simpler: "Simple Range",
      natural: "Natural",
      siege: "Siege Weapon",
      improv: "Improvise",
    };

    return map[key] || cap(v);
  }

  function getTypeLine(item) {
    const type = cap(item.__type || item.type || "");
    const base = cap(item.base_item || "");
    const typeValueRaw = item.type_value || "";
    const typeValue = cap(typeValueRaw);
    const subtype = cap(item.subtype || "");
    const toolType = cap(item.tool_type || item.toolType || "");

    switch ((item.__type || item.type || "").toLowerCase()) {
      case "weapon": {
        const mapped = mapWeaponTypeValue(typeValueRaw);
        return joinClean([type, base, mapped]);
      }

      case "consumable":
        return joinClean([type, typeValue, subtype]);

      case "container":
        return type;

      case "equipment":
        return joinClean([type, typeValue ? `${typeValue} Armor` : "", base]);

      case "tool":
        return toolType || type;

      case "loot":
        return joinClean(["Loot " + typeValue, base]);

      default:
        return type;
    }
  }

  const propertyCodesNormalized = new Set(
    properties
      .map((p) => String(p).toLowerCase())
      .filter((p) => PROPERTY_ORDER.includes(p))
  );

  const orderedDisplayProperties = PROPERTY_ORDER.filter((code) =>
    propertyCodesNormalized.has(code)
  );

  const masteryKey = mastery ? String(mastery).toLowerCase() : null;
  const masteryDescription = masteryKey
    ? MASTERY_DESCRIPTIONS[masteryKey] || ""
    : "";

  return (
    <>
      {/* HEADER */}
      <div className="flex items-start mb-5 gap-4">
        <div className="shrink-0">
          <div
            className="w-16 h-14 rounded-xl flex items-center justify-center text-[11px] font-semibold text-rose-200 shadow border"
            style={{ borderColor: rarityColor }}
          >
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/assets/example_token.png";
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1
                id={slug}
                className="text-2xl font-semibold break-words leading-tight"
                style={{ color: rarityColor }}
              >
                {name}
              </h1>

              <p className="text-xs text-slate-300 mt-1 break-words">
                {getTypeLine(item)}
              </p>
            </div>

            <div className="text-right text-xs text-indigo-300 leading-tight shrink-0 w-[160px]">
              <div className="break-words">
                {priceLabel}
                {Number(weight) > 0 ? `, ${weightLabel}` : ""}
              </div>
              {rarity && (
                <div
                  className="mt-1 font-semibold break-words capitalize"
                  style={{ color: rarityColor }}
                >
                  ({rarityKey})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

      {/* DESCRIPTION */}
      <div className="flex-1">
        <div className=" overflow-y-auto pr-1">
          <p className="text-sm uppercase tracking-wide text-slate-400 mb-1">
            Description
          </p>

          <div
            className="text-sm leading-relaxed text-slate-100/90 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
        {mastery && (
          <div className="mt-4">
            <p className="text-sm uppercase tracking-wide text-slate-400 mb-1">
              Mastery : <span className="text-slate-400">{cap(mastery)}</span>
            </p>
            {masteryDescription && (
              <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                {masteryDescription}
              </p>
            )}
          </div>
        )}
      </div>

      {/* PROPERTIES BAR */}
      {orderedDisplayProperties.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {orderedDisplayProperties.map((code) => {
              const meta = PROPERTY_META[code] || {
                label: code.toUpperCase(),
              };
              const tooltip = meta.description;

              return (
                <div
                  key={code}
                  className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-600 text-[11px] text-slate-100 cursor-default hover:border-amber-300/70 hover:bg-slate-700/80 transition"
                  title={tooltip}
                >
                  {meta.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
