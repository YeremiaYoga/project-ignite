

const sorcererCoreTraits = {
  class: "Sorcerer",
  primaryAbility: "Charisma",
  hitPoints: {
    hitDie: "D6 per Sorcerer level",
    level1: "6 + Con. modifier",
    perLevel: "D6 + your Con. modifier, or, 4 + your Con. modifier",
  },
  savingThrowProficiencies: ["Constitution", "Charisma"],
  skillProficiencies: {
    choose: 2,
    options: [
      "Arcana",
      "Deception",
      "Insight",
      "Intimidation",
      "Persuasion",
      "Religion",
    ],
  },
  weaponProficiencies: ["Simple weapons"],
  toolProficiencies: [],
  armorTraining: [],
  startingEquipment: {
    instruction: "Choose A or B:",
    options: [
      {
        label: "A",
        items: [
          "a Spear",
          "2 Daggers",
          "Arcane Focus (crystal)",
          "Dungeoneer's Pack",
          "28 GP",
        ],
      },
      {
        label: "B",
        items: ["50 GP"],
      },
    ],
  },
  optionalEquipment: {},
};

export default sorcererCoreTraits;