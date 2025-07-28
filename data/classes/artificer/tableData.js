const artificerTableData = [
  {
    level: 1,
    proficiencyBonus: 2,
    features: [
      "Optional Rule: Firearm Proficiency",
      "Magical Tinkering",
      "Spellcasting"
    ],
    featuresId: [
      "optional-rule-firearm-proficiency-1",
      "magical-tinkering-1",
      "spellcasting-1"
    ],
    infusionsKnown: "—",
    infusedItems: "—",
    cantripsKnown: 2,
    spellSlots: [2, "—", "—", "—", "—"]
  },
  {
    level: 2,
    proficiencyBonus: 2,
    features: ["Infuse Item"],
    featuresId: ["infuse-item-2"],
    infusionsKnown: 4,
    infusedItems: 2,
    cantripsKnown: 2,
    spellSlots: [2, "—", "—", "—", "—"]
  },
  {
    level: 3,
    proficiencyBonus: 2,
    features: [
      "Artificer Specialist",
      "The Right Tool for the Job"
    ],
    featuresId: [
      "artificer-specialist-3",
      "the-right-tool-for-the-job-3"
    ],
    infusionsKnown: 4,
    infusedItems: 2,
    cantripsKnown: 2,
    spellSlots: [3, "—", "—", "—", "—"]
  },
  {
    level: 4,
    proficiencyBonus: 2,
    features: ["Ability Score Improvement"],
    featuresId: ["ability-score-improvement-4"],
    infusionsKnown: 4,
    infusedItems: 2,
    cantripsKnown: 2,
    spellSlots: [3, "—", "—", "—", "—"]
  },
  {
    level: 5,
    proficiencyBonus: 3,
    features: ["Artificer Specialist Feature"],
    featuresId: ["artificer-specialist-feature-5"],
    infusionsKnown: 4,
    infusedItems: 2,
    cantripsKnown: 2,
    spellSlots: [4, 2, "—", "—", "—"]
  },
  {
    level: 6,
    proficiencyBonus: 3,
    features: ["Tool Expertise"],
    featuresId: ["tool-expertise-6"],
    infusionsKnown: 6,
    infusedItems: 3,
    cantripsKnown: 2,
    spellSlots: [4, 2, "—", "—", "—"]
  },
  {
    level: 7,
    proficiencyBonus: 3,
    features: ["Flash of Genius"],
    featuresId: ["flash-of-genius-7"],
    infusionsKnown: 6,
    infusedItems: 3,
    cantripsKnown: 2,
    spellSlots: [4, 3, "—", "—", "—"]
  },
  {
    level: 8,
    proficiencyBonus: 3,
    features: ["Ability Score Improvement"],
    featuresId: ["ability-score-improvement-8"],
    infusionsKnown: 6,
    infusedItems: 3,
    cantripsKnown: 2,
    spellSlots: [4, 3, "—", "—", "—"]
  },
  {
    level: 9,
    proficiencyBonus: 4,
    features: ["Artificer Specialist Feature"],
    featuresId: ["artificer-specialist-feature-9"],
    infusionsKnown: 6,
    infusedItems: 3,
    cantripsKnown: 2,
    spellSlots: [4, 3, 2, "—", "—"]
  },
  {
    level: 10,
    proficiencyBonus: 4,
    features: ["Magic Item Adept"],
    featuresId: ["magic-item-adept-10"],
    infusionsKnown: 8,
    infusedItems: 4,
    cantripsKnown: 3,
    spellSlots: [4, 3, 2, "—", "—"]
  },
  {
    level: 11,
    proficiencyBonus: 4,
    features: ["Spell-Storing Item"],
    featuresId: ["spell-storing-item-11"],
    infusionsKnown: 8,
    infusedItems: 4,
    cantripsKnown: 3,
    spellSlots: [4, 3, 3, "—", "—"]
  },
  {
    level: 12,
    proficiencyBonus: 4,
    features: ["Ability Score Improvement"],
    featuresId: ["ability-score-improvement-12"],
    infusionsKnown: 8,
    infusedItems: 4,
    cantripsKnown: 3,
    spellSlots: [4, 3, 3, "—", "—"]
  },
  {
    level: 13,
    proficiencyBonus: 5,
    features: [],
    featuresId: [],
    infusionsKnown: 8,
    infusedItems: 4,
    cantripsKnown: 3,
    spellSlots: [4, 3, 3, 1, "—"]
  },
  {
    level: 14,
    proficiencyBonus: 5,
    features: ["Magic Item Savant"],
    featuresId: ["magic-item-savant-14"],
    infusionsKnown: 10,
    infusedItems: 5,
    cantripsKnown: 4,
    spellSlots: [4, 3, 3, 1, "—"]
  },
  {
    level: 15,
    proficiencyBonus: 5,
    features: ["Artificer Specialist Feature"],
    featuresId: ["artificer-specialist-feature-15"],
    infusionsKnown: 10,
    infusedItems: 5,
    cantripsKnown: 4,
    spellSlots: [4, 3, 3, 2, "—"]
  },
  {
    level: 16,
    proficiencyBonus: 5,
    features: ["Ability Score Improvement"],
    featuresId: ["ability-score-improvement-16"],
    infusionsKnown: 10,
    infusedItems: 5,
    cantripsKnown: 4,
    spellSlots: [4, 3, 3, 2, "—"]
  },
  {
    level: 17,
    proficiencyBonus: 6,
    features: [],
    featuresId: [],
    infusionsKnown: 10,
    infusedItems: 5,
    cantripsKnown: 4,
    spellSlots: [4, 3, 3, 3, 1]
  },
  {
    level: 18,
    proficiencyBonus: 6,
    features: ["Magic Item Master"],
    featuresId: ["magic-item-master-18"],
    infusionsKnown: 12,
    infusedItems: 6,
    cantripsKnown: 4,
    spellSlots: [4, 3, 3, 3, 1]
  },
  {
    level: 19,
    proficiencyBonus: 6,
    features: ["Ability Score Improvement"],
    featuresId: ["ability-score-improvement-19"],
    infusionsKnown: 12,
    infusedItems: 6,
    cantripsKnown: 4,
    spellSlots: [4, 3, 3, 3, 2]
  },
  {
    level: 20,
    proficiencyBonus: 6,
    features: ["Soul of Artifice"],
    featuresId: ["soul-of-artifice-20"],
    infusionsKnown: 12,
    infusedItems: 6,
    cantripsKnown: 4,
    spellSlots: [4, 3, 3, 3, 2]
  }
];

export default artificerTableData;