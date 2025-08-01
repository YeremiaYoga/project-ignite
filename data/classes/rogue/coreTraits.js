// data/rogueCoreTraits.js

const rogueCoreTraits = {
  class: "Rogue",
  primaryAbility: "Dexterity",
  hitPoints: {
    hitDie: "D8 per Rogue level",
    level1: "8 + Con. modifier",
    perLevel: "D8 + your Con. modifier, or, 5 + your Con. modifier",
  },
  savingThrowProficiencies: ["Dexterity", "Intelligence"],
  skillProficiencies: {
    choose: 4,
    options: [
      "Acrobatics",
      "Athletics",
      "Deception",
      "Insight",
      "Intimidation",
      "Investigation",
      "Perception",
      "Persuasion",
      "Sleight of Hand",
      "Stealth",
    ],
  },
  weaponProficiencies: ["Simple weapons", "Martial weapons that have the Finesse or Light property"],
  toolProficiencies: ["Thieves' Tools"],
  armorTraining: ["Light armor"],
  startingEquipment: {
    instruction: "Choose A or B:",
    options: [
      {
        label: "A",
        items: [
          "Leather Armor",
          "2 Daggers",
          "Shortsword",
          "Shortbow",
          "20 Arrows",
          "Quiver",
          "Thieves' Tools",
          "Burglar's Pack",
          "8 GP",
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

export default rogueCoreTraits;