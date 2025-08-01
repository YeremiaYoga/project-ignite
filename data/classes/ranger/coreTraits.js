// data/rangerCoreTraits.js

const rangerCoreTraits = {
  class: "Ranger",
  primaryAbility: "Dexterity and Wisdom", 
  hitPoints: {
    hitDie: "D10 per Ranger level", 
    level1: "10 + Con. modifier", 
    perLevel: "D10 + your Con. modifier, or, 6 + your Con. modifier", 
  },
  savingThrowProficiencies: ["Strength", "Dexterity"], 
  skillProficiencies: {
    choose: 3, 
    options: [
      "Animal Handling", 
      "Athletics", 
      "Insight", 
      "Investigation", 
      "Nature", 
      "Perception", 
      "Stealth", 
      "Survival", 
    ],
  },
  weaponProficiencies: ["Simple weapons", "Martial weapons"], 
  toolProficiencies: [], 
  armorTraining: ["Light and Medium armor", "Shields"], 
  startingEquipment: {
    instruction: "Choose A or B:", 
    options: [
      {
        label: "A", 
        items: [
          "Studded Leather Armor", 
          "Scimitar", 
          "Shortsword", 
          "Longbow", 
          "20 Arrows", 
          "Quiver", 
          "Druidic Focus (sprig of mistletoe)", 
          "Explorer's Pack", 
          "7 GP", 
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

export default rangerCoreTraits;