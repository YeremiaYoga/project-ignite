// data/fighterCoreTraits.js

const fighterCoreTraits = {
  class: "Fighter",
  primaryAbility: "Strength or Dexterity",
  hitPoints: {
    hitDie: "D10 per Fighter level",
    level1: "10 + Con. modifier",
    perLevel: "D10 + your Con. modifier, or, 6 + your Con. modifier",
  },
  savingThrowProficiencies: ["Strength", "Constitution"],
  skillProficiencies: {
    choose: 2,
    options: [
      "Acrobatics",
      "Animal Handling",
      "Athletics",
      "History",
      "Insight",
      "Intimidation",
      "Persuasion",
      "Perception",
      "Survival",
    ],
  },
  weaponProficiencies: ["Simple weapons", "Martial weapons"],
  toolProficiencies: [], 
  armorTraining: ["Light", "Medium", "Heavy armor", "Shields"],
  startingEquipment: {
    instruction: "Choose A, B, or C:",
    options: [
      {
        label: "A",
        items: [
          "Chain Mail",
          "Greatsword",
          "Flail",
          "8 Javelins",
          "Dungeoneer's Pack",
          "4 GP",
        ],
      },
      {
        label: "B",
        items: [
          "Studded Leather Armor",
          "Scimitar",
          "Shortsword",
          "Longbow",
          "20 Arrows",
          "Quiver",
          "Dungeoneer's Pack",
          "11 GP",
        ],
      },
      {
        label: "C",
        items: ["155 GP"],
      },
    ],
  },
  optionalEquipment: {},
};

export default fighterCoreTraits;