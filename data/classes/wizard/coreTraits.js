// data/wizardCoreTraits.js

const wizardCoreTraits = {
  class: "Wizard",
  primaryAbility: "Intelligence",
  hitPoints: {
    hitDie: "D6 per Wizard level",
    level1: "6 + Con. modifier",
    perLevel: "D6 + your Con. modifier, or, 4 + your Con. modifier",
  },
  savingThrowProficiencies: ["Intelligence", "Wisdom"],
  skillProficiencies: {
    choose: 2,
    options: [
      "Arcana",
      "History",
      "Insight",
      "Investigation",
      "Medicine",
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
          "2 Daggers",
          "Arcane Focus (Quarterstaff)",
          "Robe",
          "Spellbook",
          "Scholar's Pack",
          "5 GP",
        ],
      },
      {
        label: "B",
        items: ["55 GP"],
      },
    ],
  },
  optionalEquipment: {},
};

export default wizardCoreTraits;
