const barbarianCoreTraits = {
  class: "Barbarian",
  primaryAbility: "Strength",
  hitDie: "D12",
  hitPointsAtLevel1: "12 + Con. modifier",
  hitPointsAtHigherLevels: "D12 + Con. modifier, or, 7 + Con. modifier",
  savingThrowProficiencies: ["Strength", "Constitution"],
  skillProficiencies: {
    choose: 2,
    options: [
      "Animal Handling",
      "Athletics",
      "Intimidation",
      "Nature",
      "Perception",
      "Survival",
    ],
  },
  weaponProficiencies: ["Simple weapons", "Martial weapons"],
  toolProficiencies: [],
  armorTraining: ["Light armor", "Medium armor", "Shields"],
  startingEquipment: {
    instruction: "Choose A or B:",
    options: [
      {
        label: "A",
        items: ["Greataxe", "4 Handaxes", "Explorer's Pack", "15 GP"],
      },
      {
        label: "B",
        items: ["75 GP"],
      },
    ],
  },
  optionalEquipment: {},
};

export default barbarianCoreTraits;
