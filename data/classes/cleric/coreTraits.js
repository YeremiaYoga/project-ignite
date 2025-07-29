// data/clericCoreTraits.js

const clericCoreTraits = {
  class: "Cleric",
  primaryAbility: "Wisdom",
  hitPoints: {
    hitDie: "D8 per Cleric level",
    level1: "8 + Con. modifier",
    perLevel: "D8 + your Con. modifier, or, 5 + your Con. modifier",
  },
  savingThrowProficiencies: ["Wisdom", "Charisma"],
  skillProficiencies: {
    choose: 2,
    options: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
  },
  weaponProficiencies: ["Simple weapons"],
  toolProficiencies: [], 
  armorTraining: ["Light and Medium armor", "Shields"],
  startingEquipment: {
    instruction: "Choose A or B:",
    options: [
      {
        label: "A",
        items: [
          "Chain Shirt",
          "Shield",
          "Mace",
          "Holy Symbol",
          "Priest's Pack",
          "7 GP",
        ],
      },
      {
        label: "B",
        items: ["110 GP"],
      },
    ],
  },
  optionalEquipment: {}, 
};

export default clericCoreTraits;
