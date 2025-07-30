// data/druidCoreTraits.js

const druidCoreTraits = {
  class: "Druid",
  primaryAbility: "Wisdom",
  hitPoints: {
    hitDie: "D8 per Druid level",
    level1: "8 + Con. modifier",
    perLevel: "D8 + your Con. modifier, or, 5 + your Con. modifier",
  },
  savingThrowProficiencies: ["Intelligence", "Wisdom"],
  skillProficiencies: {
    choose: 2,
    options: [
      "Arcana",
      "Animal Handling",
      "Insight",
      "Medicine",
      "Nature",
      "Perception",
      "Religion",
      "Survival",
    ],
  },
  weaponProficiencies: ["Simple weapons"],
  toolProficiencies: ["Herbalism Kit"], // Specific tool proficiency
  armorTraining: ["Light armor", "Shields"],
  startingEquipment: {
    instruction: "Choose A or B:",
    options: [
      {
        label: "A",
        items: [
          "Leather Armor",
          "Shield",
          "Sickle",
          "Druidic Focus (Quarterstaff)",
          "Explorer's Pack",
          "Herbalism kit", // Pastikan Herbalism kit di sini jika itu bagian dari pilihan A
          "9 GP",
        ],
      },
      {
        label: "B",
        items: ["50 GP"],
      },
    ],
  },
  optionalEquipment: {}, // Objek kosong karena tidak ada bagian 'alternatively' terpisah setelah starting equipment
};

export default druidCoreTraits;