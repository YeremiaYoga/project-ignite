// data/warlockCoreTraits.js

const warlockCoreTraits = {
  class: "Warlock",
  primaryAbility: "Charisma",
  hitPoints: {
    hitDie: "D8 per Warlock level",
    level1: "8 + Con. modifier",
    perLevel: "D8 + your Con. modifier, or, 5 + your Con. modifier",
  },
  savingThrowProficiencies: ["Wisdom", "Charisma"],
  skillProficiencies: {
    choose: 2,
    options: [
      "Arcana",
      "Deception",
      "History",
      "Intimidation",
      "Investigation",
      "Nature",
      "Religion",
    ],
  },
  weaponProficiencies: ["Simple weapons"],
  toolProficiencies: [],
  armorTraining: ["Light armor"],
  startingEquipment: {
    instruction: "Choose A or B:",
    options: [
      {
        label: "A",
        items: [
          "Leather Armor",
          "Sickle",
          "2 Daggers",
          "Arcane Focus (orb)",
          "Book (occult lore)",
          "Scholar's Pack",
          "15 GP",
        ],
      },
      {
        label: "B",
        items: ["100 GP"],
      },
    ],
  },
  optionalEquipment: {},
};

export default warlockCoreTraits;