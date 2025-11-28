// itemData.js

export const PROPERTY_ORDER = [
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

export const PROPERTY_META = {
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

export const RARITY_COLORS = {
  common: "#b5bda6",
  uncommon: "#78c178",
  rare: "#6464bd",
  "very rare": "#62c1ad",
  legendary: "#bb9348",
  artifact: "#a46b43",
};

export function normalizeRarityKey(r) {
  if (!r) return "";

  let key = r.toLowerCase().trim();
  key = key.replace(/[-_]/g, " ");
  key = key.replace(/\s+/g, " ");

  if (key.replace(/\s+/g, "") === "veryrare") {
    key = "very rare";
  }

  return key;
}

export function getRarityColor(r) {
  const key = normalizeRarityKey(r);
  return RARITY_COLORS[key] || "#e5e7eb";
}

export const MASTERY_DESCRIPTIONS = {
  cleave: `If you hit a creature with a melee weapon attack, you can make a second attack against a creature within 5 feet that is also within your reach. When you hit with the second attack, you can roll your weapon’s damage, but you don’t add your ability modifier unless it’s negative.`,
  graze: `If you miss a creature with your weapon, you deal damage equal to the ability modifier you used to make the roll.`,
  nick: `You can make an additional attack against a target creature if your first attack was made while wielding two Light weapons.`,
  push: `You can launch a creature you hit (up to a Large size) 10 feet away from you.`,
  sap: `An enemy you hit has Disadvantage on their next attack roll before the start of your next turn.`,
  slow: `When you hit a creature and deal damage, you can reduce its Speed by 10 feet until the start of your next turn.`,
  topple: `When you hit a creature, you can force it to make a Constitution saving throw or fall Prone.The DC for this save is 8 + modifier used to make the attack + your Proficiency Bonus.`,
  vex: `When you hit a creature and deal damage, you gain Advantage on your next attack roll before the end of your next turn.`,
};

export function formatNumber(value) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function formatPriceLabel(value) {
  if (value == null || isNaN(value)) return "-";

  if (value < 10) return `${formatNumber(value)} Cp`;
  if (value < 100) return `${formatNumber(value / 10)} Sp`;
  return `${formatNumber(value / 100)} Gp`;
}
