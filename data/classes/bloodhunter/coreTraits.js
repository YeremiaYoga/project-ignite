

const bloodHunterCoreTraits = {
  class: "Blood Hunter",
  primaryAbility: "",
  hitPoints: {
    hitDie: "D10 per Blood Hunter level",
    level1: "10 + Con. modifier",
    perLevel: "D10 + your Con. modifier, or, 6 + your Con. modifier",
  },
  savingThrowProficiencies: ["Dexterity", "Intelligence"],
  skillProficiencies: {
    choose: 3,
    options: [
      "Athletics",
      "Acrobatics",
      "Arcana",
      "History",
      "Insight",
      "Investigation",
      "Religion",
      "Survival",
    ],
  },
  weaponProficiencies: ["Simple weapons", "Martial weapons"],
  toolProficiencies: ["alchemist's supplies"],
  armorTraining: ["Light and Medium armor", "Shields"],
  startingEquipment: {},
  optionalEquipment: {
    instruction:
      "You start with the following items, plus anything provided by your background.",
    items: [
      "(a) a martial weapon or (b) two simple weapons",
      "a light crossbow and 20 bolts",
      "(a) studded leather armor or (b) scale mail armor",
      "an explorer's pack and alchemist's supplies",
    ],
    alternativeInstruction: "Alternatively, you may start with",
    alternativeValue: "4d4 × 10 gp to buy your own equipment.",
  },
};

export default bloodHunterCoreTraits;
