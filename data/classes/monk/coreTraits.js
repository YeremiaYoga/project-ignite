// data/monkCoreTraits.js

const monkCoreTraits = {
  class: "Monk",
  primaryAbility: "Dexterity and Wisdom",
  hitPoints: {
    hitDie: "D8 per Monk level",
    level1: "8 + Con. modifier",
    perLevel: "D8 + your Con. modifier, or, 5 + your Con. modifier",
  },
  savingThrowProficiencies: ["Strength", "Dexterity"],
  skillProficiencies: {
    choose: 2,
    options: [
      "Acrobatics",
      "Athletics",
      "History",
      "Insight",
      "Religion",
      "Stealth",
    ],
  },
  weaponProficiencies: ["Simple weapons", "Martial weapons that have the Light property"],
  toolProficiencies: {
    instruction: "Choose one type of Artisan's Tools or Musical Instrument", 
    options: null,
  },
  armorTraining: [], 
  startingEquipment: {
    instruction: "Choose A or B:",
    options: [
      {
        label: "A",
        items: [
          "a Spear",
          "5 Daggers",
          "Artisan's Tools or Musical Instrument chosen for the tool proficiency above",
          "Explorer's Pack",
          "11 GP",
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

export default monkCoreTraits;