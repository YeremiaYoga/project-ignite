const artificerCoreTraits = {
  class: "Artificer",
  primaryAbility: "",
  hitDie: "D8",
  hitPointsAtLevel1: "8 + Con. modifier",
  hitPointsAtHigherLevels:
    "D8 + your Con. modifier, or, 5 + your Con. modifier",
  savingThrowProficiencies: ["Constitution", "Intelligence"],
  skillProficiencies: {
    choose: 2,
    options: [
      "Arcana",
      "History",
      "Investigation",
      "Medicine",
      "Nature",
      "Perception",
      "Sleight of Hand",
    ],
  },
  weaponProficiencies: ["Simple weapons", "firearms"],
  toolProficiencies: [
    "thieves' tools",
    "tinker's tools",
    "one type of artisan's tools of your choice",
  ],
  armorTraining: ["Light and Medium armor", "Shields"],
  startingEquipment: {},
  optionalEquipment: {
    instruction:
      "You start with the following items, plus anything provided by your background.",
    type: "list",
    items: [
      "any two simple weapons of your choice",
      "a light crossbow and 20 bolts",
      "(a) studded leather armor or (b) scale mail",
      "thieves' tools and a dungeoneer's pack",
    ],
    alternativeInstruction: "Alternatively, you may start with",
    alternativeValue: "5d4 × 10 gp to buy your own equipment.",
  },
};

export default artificerCoreTraits;
