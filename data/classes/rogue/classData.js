const rogueClassData = {
  descriptionClass: [
    {
      color: "white",
      text: `Rogues rely on skill, stealth, and their foes' vulnerabilities to
            get the upper hand in any situation. They have a knack for finding
            the solution to just about any problem, demonstrating a
            resourcefulness and versatility that is the cornerstone of any
            successful adventuring party.`,
    },
    {
      color: "gray",
      text: `You must have a Dexterity score of 13 or higher in order to
            multiclass in or out of this class.`,
    },
  ],
  dataTable: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        "Expertise",
        "Sneak Attack",
        "Thieves' Cant",
        "Weapon Mastery",
      ],
      featuresId: [
        "expertise-1",
        "sneak-attack-1",
        "thieves-cant-1",
        "weapon-mastery-1",
      ],
      sneakAttack: "1d6",
      arcane_trickster: {
        spellsPrepared: "—",
        spellSlots: ["—", "—", "—", "—"],
      },
      soulknife: {
        dieDice: "—",
        number: "—",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["Cunning Action"],
      featuresId: ["cunning-action-2"],
      sneakAttack: "1d6",
      arcane_trickster: {
        spellsPrepared: "—",
        spellSlots: ["—", "—", "—", "—"],
      },
      soulknife: {
        dieDice: "—",
        number: "—",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: ["Rogue Subclass", "Steady Aim"],
      featuresId: ["rogue-subclass-3", "steady-aim-3"],
      sneakAttack: "2d6",
      arcane_trickster: {
        spellsPrepared: "3",
        spellSlots: ["2", "—", "—", "—"],
      },
      soulknife: {
        dieDice: "D6",
        number: "4",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-4"],
      sneakAttack: "2d6",
      arcane_trickster: {
        spellsPrepared: "4",
        spellSlots: ["3", "—", "—", "—"],
      },
      soulknife: {
        dieDice: "D6",
        number: "4",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: ["Cunning Strike", "Uncanny Dodge"],
      featuresId: ["cunning-strike-5", "uncanny-dodge-5"],
      sneakAttack: "3d6",
      arcane_trickster: {
        spellsPrepared: "4",
        spellSlots: ["3", "—", "—", "—"],
      },
      soulknife: {
        dieDice: "D8",
        number: "6",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["Expertise"],
      featuresId: ["expertise-6"],
      sneakAttack: "3d6",
      arcane_trickster: {
        spellsPrepared: "4",
        spellSlots: ["3", "—", "—", "—"],
      },
      soulknife: {
        dieDice: "D8",
        number: "6",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: ["Evasion", "Reliable Talent"],
      featuresId: ["evasion-7", "reliable-talent-7"],
      sneakAttack: "4d6",
      arcane_trickster: {
        spellsPrepared: "5",
        spellSlots: ["4", "2", "—", "—"],
      },
      soulknife: {
        dieDice: "D8",
        number: "6",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-8"],
      sneakAttack: "4d6",
      arcane_trickster: {
        spellsPrepared: "6",
        spellSlots: ["4", "2", "—", "—"],
      },
      soulknife: {
        dieDice: "D8",
        number: "6",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: ["Subclass Feature"],
      featuresId: ["subclass-feature-9"],
      sneakAttack: "5d6",
      arcane_trickster: {
        spellsPrepared: "6",
        spellSlots: ["4", "2", "—", "—"],
      },
      soulknife: {
        dieDice: "D8",
        number: "8",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-10"],
      sneakAttack: "5d6",
      arcane_trickster: {
        spellsPrepared: "7",
        spellSlots: ["4", "3", "—", "—"],
      },
      soulknife: {
        dieDice: "D8",
        number: "8",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: ["Improved Cunning Strike"],
      featuresId: ["improved-cunning-strike-11"],
      sneakAttack: "6d6",
      arcane_trickster: {
        spellsPrepared: "8",
        spellSlots: ["4", "3", "—", "—"],
      },
      soulknife: {
        dieDice: "D10",
        number: "8",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-12"],
      sneakAttack: "6d6",
      arcane_trickster: {
        spellsPrepared: "8",
        spellSlots: ["4", "3", "—", "—"],
      },
      soulknife: {
        dieDice: "D10",
        number: "8",
      },
    },
    {
      level: 13,
      proficiencyBonus: 6,
      features: ["Subclass Feature"],
      featuresId: ["subclass-feature-13"],
      sneakAttack: "7d6",
      arcane_trickster: {
        spellsPrepared: "9",
        spellSlots: ["4", "3", "2", "—"],
      },
      soulknife: {
        dieDice: "D10",
        number: "10",
      },
    },
    {
      level: 14,
      proficiencyBonus: 6,
      features: ["Devious Strikes"],
      featuresId: ["devious-strikes-14"],
      sneakAttack: "7d6",
      arcane_trickster: {
        spellsPrepared: "10",
        spellSlots: ["4", "3", "2", "—"],
      },
      soulknife: {
        dieDice: "D10",
        number: "10",
      },
    },
    {
      level: 15,
      proficiencyBonus: 6,
      features: ["Slippery Mind"],
      featuresId: ["slippery-mind-15"],
      sneakAttack: "8d6",
      arcane_trickster: {
        spellsPrepared: "10",
        spellSlots: ["4", "3", "2", "—"],
      },
      soulknife: {
        dieDice: "D10",
        number: "10",
      },
    },
    {
      level: 16,
      proficiencyBonus: 6,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-16"],
      sneakAttack: "8d6",
      arcane_trickster: {
        spellsPrepared: "11",
        spellSlots: ["4", "3", "3", "—"],
      },
      soulknife: {
        dieDice: "D10",
        number: "10",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: ["Subclass Feature"],
      featuresId: ["subclass-feature-17"],
      sneakAttack: "9d6",
      arcane_trickster: {
        spellsPrepared: "11",
        spellSlots: ["4", "3", "3", "—"],
      },
      soulknife: {
        dieDice: "D12",
        number: "12",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["Elusive"],
      featuresId: ["elusive-18"],
      sneakAttack: "9d6",
      arcane_trickster: {
        spellsPrepared: "11",
        spellSlots: ["4", "3", "3", "—"],
      },
      soulknife: {
        dieDice: "D12",
        number: "12",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["Epic Boon"],
      featuresId: ["epic-boon-19"],
      sneakAttack: "10d6",
      arcane_trickster: {
        spellsPrepared: "12",
        spellSlots: ["4", "3", "3", "1"],
      },
      soulknife: {
        dieDice: "D12",
        number: "12",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["Stroke of Luck"],
      featuresId: ["stroke-of-luck-20"],
      sneakAttack: "10d6",
      arcane_trickster: {
        spellsPrepared: "13",
        spellSlots: ["4", "3", "3", "1"],
      },
      soulknife: {
        dieDice: "D12",
        number: "12",
      },
    },
  ],
  coreTraits: {
    class: "Rogue",
    primaryAbility: "Dexterity",
    hitDie: "D8 per Rogue level",
    hitPointsAtLevel1: "8 + Con. modifier",
    hitPointsAtHigherLevels:
      "D8 + your Con. modifier, or, 5 + your Con. modifier",
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
    weaponProficiencies: [
      "Simple weapons",
      "Martial weapons that have the Finesse or Light property",
    ],
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
  },
};

export default rogueClassData;
