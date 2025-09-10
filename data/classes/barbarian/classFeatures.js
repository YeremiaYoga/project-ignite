const barbarianFeatures = [
  {
    id: "rage-1",
    title: "Rage",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "You can imbue yourself with a primal power called Rage, a force that grants you extraordinary might and resilience. You can enter it as a Bonus Action if you aren't wearing Heavy armor.",
      },
      {
        type: "paragraph",
        value:
          "You can enter your Rage the number of times shown for your Barbarian level in the Rages column of the Barbarian Features table. You regain one expended use when you finish a Short Rest, and you regain all expended uses when you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value: "While active, your Rage follows the rules below.",
      },
      {
        type: "list",
        items: [
          "You have Resistance to Bludgeoning, Piercing, and Slashing damage.",
          "When you make an attack using Strength—with either a weapon or an Unarmed Strike—and deal damage to the target, you gain a bonus to the damage that increases as you gain levels as a Barbarian, as shown in the Rage Damage column of the Barbarian Features table.",
          "You have Advantage on Strength checks and Strength saving throws.",
          "You can't maintain Concentration, and you can't cast spells.",
        ],
      },
      {
        type: "heading",
        value: "Duration",
      },
      {
        type: "paragraph",
        value:
          "The Rage lasts until the end of your next turn, and it ends early if you don Heavy armor or have the Incapacitated condition. If your Rage is still active on your next turn, you can extend the Rage for another round by doing one of the following:",
      },
      {
        type: "list",
        items: [
          "Make an attack roll against an enemy.",
          "Force an enemy to make a saving throw.",
          "Take a Bonus Action to extend your Rage.",
        ],
      },
      {
        type: "note",
        value: "You can maintain a Rage for up to 10 minutes.",
        content: [],
      },
    ],
  },
  {
    id: "unarmored-defense-1",
    title: "Unarmored Defense",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "While you aren't wearing any armor, your base Armor Class equals 10 plus your Dexterity and Constitution modifiers. You can use a Shield and still gain this benefit.",
      },
    ],
  },
  {
    id: "weapon-mastery-1",
    title: "Weapon Mastery",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "Your training with weapons allows you to use the mastery properties of two kinds of Simple or Martial Melee weapons of your choice, such as Greataxes and Handaxes. Whenever you finish a Long Rest, you can practice weapon drills and change one of those weapon choices.",
      },
      {
        type: "paragraph",
        value:
          "When you reach certain Barbarian levels, you gain the ability to use the mastery properties of more kinds of weapons, as shown in the Weapon Mastery column of the Barbarian Features table.",
      },
    ],
  },
  {
    id: "danger-sense-2",
    title: "Danger Sense",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "You gain an uncanny sense of when things aren't as they should be, giving you an edge when you dodge perils. You have Advantage on Dexterity saving throws unless you have the Incapacitated condition.",
      },
    ],
  },
  {
    id: "reckless-attack-2",
    title: "Reckless Attack",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "You can throw aside all concern for defense to attack with increased ferocity. When you make your first attack roll on your turn, you can decide to attack recklessly. Doing so gives you Advantage on attack rolls using Strength until the start of your next turn, but attack rolls against you have Advantage during that time.",
      },
    ],
  },
  {
    id: "barbarian-subclass-3",
    title: "Barbarian Subclass",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "You choose a subclass, a specialization that grants additional features at levels 3, 6, 10, and 14. (No subclass selected here.)",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
    ],
  },
  {
    id: "primal-knowledge-3",
    title: "Primal Knowledge",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "You gain proficiency in another skill from the Barbarian's level 1 skill list.",
      },
      {
        type: "paragraph",
        value:
          "In addition, while your Rage is active, you can channel primal power when you attempt certain tasks; whenever you make an ability check using one of the following skills, you can make it as a Strength check even if it normally uses a different ability: Acrobatics, Intimidation, Perception, Stealth, or Survival. When you use this ability, your Strength represents primal power coursing through you, honing your agility, bearing, and senses.",
      },
    ],
  },
  {
    id: "ability-score-improvement-4",
    title: "Ability Score Improvement",
    level: 4,
    content: [
      {
        type: "paragraph",
        value:
          "When you reach 4th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature.",
      },
      {
        type: "note",
        value:
          "If your DM allows the use of feats, you may instead take a feat.",
      },
    ],
  },
  {
    id: "extra-attack-5",
    title: "Extra Attack",
    level: 5,
    content: [
      {
        type: "paragraph",
        value:
          "You can attack twice instead of once whenever you take the Attack action on your turn.",
      },
    ],
  },
  {
    id: "fast-movement-5",
    title: "Fast Movement",
    level: 5,
    content: [
      {
        type: "paragraph",
        value:
          "Your speed increases by 10 feet while you aren't wearing Heavy armor.",
      },
    ],
  },
  {
    id: "subclass-feature-6",
    title: "Subclass Feature",
    level: 6,
    content: [
      {
        type: "paragraph",
        value:
          "You gain a feature from your chosen subclass. (None selected here.)",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
    ],
  },
  {
    id: "feral-instinct-7",
    title: "Feral Instinct",
    level: 7,
    content: [
      {
        type: "paragraph",
        value:
          "Your instincts are so honed that you have Advantage on Initiative rolls.",
      },
    ],
  },
  {
    id: "instinctive-pounce-7",
    title: "Instinctive Pounce",
    level: 7,
    content: [
      {
        type: "paragraph",
        value:
          "As part of the Bonus Action you take to enter your Rage, you can move up to half your Speed.",
      },
    ],
  },
  {
    id: "ability-score-improvement-8",
    title: "Ability Score Improvement",
    level: 8,
    content: [
      {
        type: "paragraph",
        value:
          "When you reach 8th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature.",
      },
      {
        type: "note",
        value:
          "If your DM allows the use of feats, you may instead take a feat.",
      },
    ],
  },
  {
    id: "brutal-strike-9",
    title: "Brutal Strike",
    level: 9,
    content: [
      {
        type: "paragraph",
        value:
          "If you use Reckless Attack, you can forgo any Advantage on one Strength-based attack roll of your choice on your turn. The chosen attack roll mustn't have Disadvantage. If the chosen attack roll hits, the target takes an extra 1d10 damage of the same type dealt by the weapon or Unarmed Strike, and you can cause one Brutal Strike effect of your choice. You have the following effect options.",
      },
      {
        type: "list",
        items: [
          "Forceful Blow : The target is pushed 15 feet straight away from you. You can then move up to half your Speed straight toward the target without provoking Opportunity Attacks.",
          "Hamstring Blow : The target's Speed is reduced by 15 feet until the start of your next turn. A target can be affected by only one Hamstring Blow at a time—the most recent one.",
        ],
      },
    ],
  },
  {
    id: "subclass-feature-10",
    title: "Subclass Feature",
    level: 10,
    content: [
      {
        type: "paragraph",
        value:
          "You gain another feature from your subclass. (None selected here.)",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
    ],
  },
  {
    id: "relentless-rage-11",
    title: "Relentless Rage",
    level: 11,
    content: [
      {
        type: "paragraph",
        value:
          "Your Rage can keep you fighting despite grievous wounds. If you drop to 0 Hit Points while your Rage is active and don't die outright, you can make a DC 10 Constitution saving throw. If you succeed, your Hit Points instead change to a number equal to twice your Barbarian level.",
      },
      {
        type: "paragraph",
        value:
          "Each time you use this feature after the first, the DC increases by 5. When you finish a Short or Long Rest, the DC resets to 10.",
      },
    ],
  },
  {
    id: "ability-score-improvement-12",
    title: "Ability Score Improvement",
    level: 12,
    content: [
      {
        type: "paragraph",
        value:
          "When you reach 12th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature.",
      },
      {
        type: "note",
        value:
          "If your DM allows the use of feats, you may instead take a feat.",
      },
    ],
  },
  {
    id: "improved-brutal-strike-13",
    title: "Improved Brutal Strike",
    level: 13,
    content: [
      {
        type: "paragraph",
        value: "You gain two new Brutal Strike effects:",
      },
      {
        type: "list",
        items: [
          "Staggering Blow: Target has disadvantage on its next saving throw and can’t make opportunity attacks until the start of your next turn.",
          "Sundering Blow: Before the start of your next turn, the next attack roll made by another creature against the target gains a +5 bonus. Only one attack can benefit from this.",
        ],
      },
    ],
  },
  {
    id: "subclass-feature-14",
    title: "Subclass Feature",
    level: 14,
    content: [
      {
        type: "paragraph",
        value:
          "You gain another feature from your subclass. (None selected here.)",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
    ],
  },
  {
    id: "persistent-rage-15",
    title: "Persistent Rage",
    level: 15,
    content: [
      {
        type: "paragraph",
        value:
          "When you roll Initiative, you can regain all expended uses of Rage. After you regain uses of Rage in this way, you can't do so again until you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "In addition, your Rage is so fierce that it now lasts for 10 minutes without you needing to do anything to extend it from round to round. Your Rage ends early if you have the Unconscious condition (not just the Incapacitated condition) or don Heavy armor.",
      },
    ],
  },
  {
    id: "ability-score-improvement-16",
    title: "Ability Score Improvement",
    level: 16,
    content: [
      {
        type: "paragraph",
        value:
          "When you reach 4th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature.",
      },
      {
        type: "note",
        value:
          "If your DM allows the use of feats, you may instead take a feat.",
      },
    ],
  },
  {
    id: "improved-brutal-strike-17",
    title: "Improved Brutal Strike",
    level: 17,
    content: [
      {
        type: "paragraph",
        value:
          "The extra damage of your Brutal Strike increases to 2d10. In addition, you can use two different Brutal Strike effects whenever you use your Brutal Strike feature.",
      },
    ],
  },
  {
    id: "indomitable-might-18",
    title: "Indomitable Might",
    level: 18,
    content: [
      {
        type: "paragraph",
        value:
          "If your total for a Strength check or Strength saving throw is less than your Strength score, you can use that score in place of the total.",
      },
    ],
  },
  {
    id: "epic-boon-19",
    title: "Epic Boon",
    level: 19,
    content: [
      {
        type: "paragraph",
        value:
          "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Irresistible Offense is recommended.",
      },
    ],
  },
  {
    id: "primal-champion-20",
    title: "Primal Champion",
    level: 20,
    content: [
      {
        type: "paragraph",
        value:
          "You embody primal power. Your Strength and Constitution scores increase by 4, to a maximum of 25.",
      },
    ],
  },
];

export default barbarianFeatures;
