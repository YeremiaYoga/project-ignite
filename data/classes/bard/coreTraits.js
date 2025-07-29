// data/bardCoreTraits.js

const bardCoreTraits = {
  class: "Bard",
  primaryAbility: "Charisma",
  hitPoints: {
    hitDie: "D8 per Bard level",
    level1: "8 + Con. modifier",
    perLevel: "D8 + your Con. modifier, or, 5 + your Con. modifier",
  },
  savingThrowProficiencies: ["Dexterity", "Charisma"],
  skillProficiencies: {
    choose: 3,
    options: null, // As it says "Choose 3." without specific options listed in the image
  },
  weaponProficiencies: ["Simple weapons"],
  toolProficiencies: {
    instruction: "Choose three Musical Instruments", // Explicit instruction for tools
    options: null, // No specific list of instruments, just the type
  },
  armorTraining: ["Light armor"],
  startingEquipment: {
    instruction: "Choose A or B:",
    options: [
      {
        label: "A",
        items: [
          "Leather Armor",
          "2 Dagger",
          "Musical Instrument of your choice",
          "Entertainer's Pack",
          "19 GP",
        ],
      },
      {
        label: "B",
        items: ["90 GP"],
      },
    ],
  },
  optionalEquipment: {}, 
};

export default bardCoreTraits;
