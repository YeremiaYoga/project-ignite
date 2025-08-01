// data/paladinCoreTraits.js

const paladinCoreTraits = {
  class: "Paladin",
  primaryAbility: "Strength and Charisma",
  hitPoints: {
    hitDie: "D10 per Paladin level",
    level1: "10 + Con. modifier",
    perLevel: "D10 + your Con. modifier, or, 6 + your Con. modifier",
  },
  savingThrowProficiencies: ["Wisdom", "Charisma"],
  skillProficiencies: {
    choose: 2,
    options: [
      "Athletics",
      "Insight",
      "Intimidation",
      "Medicine",
      "Persuasion",
      "Religion",
    ],
  },
  weaponProficiencies: ["Simple weapons", "Martial weapons"],
  toolProficiencies: [],
  armorTraining: ["Light", "Medium", "Heavy armor", "Shields"],
  startingEquipment: {
    instruction: "Choose A or B:",
    options: [
      {
        label: "A",
        items: [
          "Chain Mail",
          "Shield",
          "Longsword",
          "6 Javelins",
          "Holy Symbol",
          "Priest's Pack",
          "9 GP",
        ],
      },
      {
        label: "B",
        items: ["150 GP"],
      },
    ],
  },
  optionalEquipment: {}, 
};

export default paladinCoreTraits;