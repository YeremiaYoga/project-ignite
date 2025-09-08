const bloodhunterFeatures = [
  {
    id: "hunters-bane-1",
    title: "Hunter's Bane",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "At 1st level, you have survived the Hunter's Bane — a dangerous, long-guarded ritual that alters your life's blood, forever binding you to the darkness and honing your senses against it. You have advantage on Wisdom (Survival) checks to track fey, fiends, or undead, as well as on Intelligence checks to recall information about such creatures. The Hunter's Bane also empowers your body to control and shape hemocraft magic, using your own blood and life essence to fuel your abilities. Some of your features require your target to make a saving throw to resist the feature's effects. The saving throw DC is calculated as follows: Hemocraft save DC = 8 + Wisdom or Intelligence modifier (your choice) + Proficiency Bonus",
      },
    ],
  },
  {
    id: "blood-maledict-1",
    title: "Blood Maledict",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "Also at 1st level, you gain the ability to channel — or sometimes sacrifice — a part of your vital essence to curse and manipulate creatures through hemocraft magic. You know one blood curse of your choice, detailed in the “Blood Curses” section at the end of the class description. You learn one additional blood curse of your choice at 6th, 10th, 14th, and 18th level. Each time you learn a new blood curse, you can also choose one of the blood curses you know and replace it with another blood curse.",
      },
      {
        type: "paragraph",
        value:
          "Each time you use your Blood Maledict feature, you choose which curse to invoke from the curses you know. While invoking a blood curse, but before it affects the target, you can choose to amplify the curse by taking necrotic damage equal to one roll of your hemocraft die. This damage can't be reduced in any way. An amplified curse inflicts an additional effect, noted in the curse's description. Creatures that do not have blood are immune to blood curses unless you have amplified the curse.",
      },
      {
        type: "paragraph",
        value:
          "Once you use this feature, you must finish a short or long rest before you can use it again. You can use Blood Maledict twice between rests starting at 6th level, three times starting at 13th level, and four times starting at 17th level.",
      },
    ],
  },
  {
    id: "fighting-style-2",
    title: "Fighting Style",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "At 2nd level, you adopt a particular style of fighting as your specialty. Choose one of the following options. You can't take the same Fighting Style option more than once, even if you get to choose again.",
      },
      {
        type: "heading",
        value: "Archery",
      },
      {
        type: "paragraph",
        value:
          "You gain a +2 bonus to attack rolls you make with ranged weapons.",
      },
      {
        type: "heading",
        value: "Dueling",
      },
      {
        type: "paragraph",
        value:
          "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
      },
      {
        type: "heading",
        value: "Great Weapon Fighting",
      },
      {
        type: "paragraph",
        value:
          "When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.",
      },
      {
        type: "heading",
        value: "Two-Weapon Fighting",
      },
      {
        type: "paragraph",
        value:
          "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.",
      },
    ],
  },
  {
    id: "crimson-rite-2",
    title: "Crimson Rite",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "Also at 2nd level, you learn to invoke a rite of hemocraft that infuses your weapon strikes with elemental energy. As a bonus action, you can activate any rite you know on one weapon you're holding. The effect of the rite lasts until you finish a short or long rest. When you activate a rite, you take necrotic damage equal to one roll of your hemocraft die. This damage can't be reduced in any way.",
      },
      {
        type: "paragraph",
        value:
          "While the rite is in effect, attacks you make with this weapon are magical, and deal extra damage equal to your hemocraft die of the type determined by the chosen rite. A weapon can hold only one active rite at a time. Other creatures can't gain the benefit of the rite.",
      },
      {
        type: "paragraph",
        value:
          "You choose one rite from the crimson rites below when you first gain this feature. You learn an additional crimson rite at 7th level, and again at 14th level.",
      },
      {
        type: "list",
        items: [
          "Rite of the Flame. The extra damage dealt by your rite is fire damage.",
          "Rite of the Frozen. The extra damage dealt by your rite is cold damage.",
          "Rite of the Storm. The extra damage dealt by your rite is lightning damage.",
          "Rite of the Dead. The extra damage dealt by your rite is necrotic damage. (Prerequisite: 14th level)",
          "Rite of the Oracle. The extra damage dealt by your rite is psychic damage. (Prerequisite: 14th level)",
          "Rite of the Roar. The extra damage dealt by your rite is thunder damage. (Prerequisite: 14th level)",
        ],
      },
    ],
  },
  {
    id: "blood-hunter-order-3",
    title: "Blood Hunter Order",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "At 3rd level, you commit to an order of blood hunters whose philosophy will guide you throughout your life: the Order of the Ghostslayer, the Order of the Lycan, the Order of the Mutant, or the Order of the Profane Soul, each of which is detailed at the end of the class description. Your choice grants you features at 3rd level and again at 7th, 11th, and 15th level.",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
      {
        type: "paragraph",
        value: "Select a subclass to view its feature(s) here.",
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
          "When you reach 4th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
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
          "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.",
      },
    ],
  },
  {
    id: "brand-of-castigation-6",
    title: "Brand of Castigation",
    level: 6,
    content: [
      {
        type: "paragraph",
        value:
          "At 6th level, when you damage a creature with a weapon for which you have an active crimson rite, you can channel hemocraft magic to sear an arcane brand into that creature (no action required). You always know the direction to the branded creature as long as it's on the same plane as you. Further, each time the branded creature deals damage to you or a creature you can see within 5 feet of you, the branded creature takes psychic damage equal to your Wisdom or Intelligence modifier (minimum of 1). Your brand lasts until you dismiss it or until you use this feature to apply a brand to another creature. Your brand can be dispelled with dispel magic, and is treated as a spell with a level equal to half your blood hunter level (maximum 9th level). Once you use this feature, you can't use it again until you finish a short or long rest.",
      },
    ],
  },
  {
    id: "blood-maledict-improvement-6",
    title: "Blood Maledict Improvement",
    level: 6,
    content: [
      {
        type: "paragraph",
        value:
          "Beginning at 6th level, you can use your Blood Maledict feature twice between rests.",
      },
    ],
  },
  {
    id: "order-feature-7",
    title: "Order Feature",
    level: 7,
    content: [
      {
        type: "paragraph",
        value:
          "At 7th level, you gain a feature granted by your Blood Hunter Order.",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
      {
        type: "paragraph",
        value: "Select a subclass to view its feature(s) here.",
      },
    ],
  },
  {
    id: "crimson-rite-improvement-7",
    title: "Crimson Rite Improvement",
    level: 7,
    content: [
      {
        type: "paragraph",
        value: "At 7th level, you learn an additional Crimson Rite.",
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
          "When you reach 8th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
      },
    ],
  },
  {
    id: "grim-psychometry-9",
    title: "Grim Psychometry",
    level: 9,
    content: [
      {
        type: "paragraph",
        value:
          "When you reach 9th level, you gain a supernatural talent for discerning the secrets surrounding mysterious relics or places touched by evil. Whenever you make an Intelligence (History) check to recall information about the sinister or tragic history of an object you are touching or your current location, you have advantage on the check. At the DM's discretion, a suitably high roll might cause your character to experience brief visions of the past connected to the object or location.",
      },
    ],
  },
  {
    id: "dark-augmentation-10",
    title: "Dark Augmentation",
    level: 10,
    content: [
      {
        type: "paragraph",
        value:
          "Starting at 10th level, the magic of hemocraft suffuses your body to permanently reinforce your resilience. Your speed increases by 5 feet, and you have a bonus to Strength, Dexterity, and Constitution saving throws equal to your Hemocraft modifier (minimum of +1).",
      },
    ],
  },
  {
    id: "order-feature-11",
    title: "Order Feature",
    level: 11,
    content: [
      {
        type: "paragraph",
        value:
          "At 11th level, you gain a feature granted by your Blood Hunter Order.",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
      {
        type: "paragraph",
        value: "Select a subclass to view its feature(s) here.",
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
          "When you reach 12th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
      },
    ],
  },
  {
    id: "brand-of-tethering-13",
    title: "Brand of Tethering",
    level: 13,
    content: [
      {
        type: "paragraph",
        value:
          "Starting at 13th level, the psychic damage from your Brand of Castigation increases to twice your Hemocraft modifier (minimum of 2). Additionally, a branded creature that tries to use an ability or spell that would teleport or leave its current plane by any means, it takes 4d6 psychic damage and must make a Wisdom saving throw. On a failure, the attempt to teleport or leave the plane fails.",
      },
    ],
  },
  {
    id: "blood-maledict-improvement-13",
    title: "Blood Maledict Improvement",
    level: 13,
    content: [
      {
        type: "paragraph",
        value:
          "Beginning at 13th level, you can use your Blood Maledict feature three times between rests.",
      },
    ],
  },
  {
    id: "hardened-soul-14",
    title: "Hardened Soul",
    level: 14,
    content: [
      {
        type: "paragraph",
        value:
          "When you reach 14th level, you have advantage on saving throws against being charmed and frightened.",
      },
    ],
  },
  {
    id: "crimson-rite-improvement-14",
    title: "Crimson Rite Improvement",
    level: 14,
    content: [
      {
        type: "paragraph",
        value: "At 14th level, you learn an additional Crimson Rite.",
      },
    ],
  },
  {
    id: "order-feature-15",
    title: "Order Feature",
    level: 15,
    content: [
      {
        type: "paragraph",
        value:
          "At 15th level, you gain a feature granted by your Blood Hunter Order.",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
      {
        type: "paragraph",
        value: "Select a subclass to view its feature(s) here.",
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
          "When you reach 16th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
      },
    ],
  },
  {
    id: "blood-maledict-improvement-17",
    title: "Blood Maledict Improvement",
    level: 17,
    content: [
      {
        type: "paragraph",
        value:
          "Beginning at 17th level, you can use your Blood Maledict feature four times between rests.",
      },
    ],
  },
  {
    id: "order-feature-18",
    title: "Order Feature",
    level: 18,
    content: [
      {
        type: "paragraph",
        value:
          "At 18th level, you gain a feature granted by your Blood Hunter Order.",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
      {
        type: "paragraph",
        value: "Select a subclass to view its feature(s) here.",
      },
    ],
  },
  {
    id: "ability-score-improvement-19",
    title: "Ability Score Improvement",
    level: 19,
    content: [
      {
        type: "paragraph",
        value:
          "When you reach 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
      },
    ],
  },
  {
    id: "sanguine-mastery-20",
    title: "Sanguine Mastery",
    level: 20,
    content: [
      {
        type: "paragraph",
        value:
          "Upon reaching 20th level, your mastery of blood magic reaches its height, mitigating your sacrifice and empowering your expertise. Once per turn, whenever a blood hunter feature requires you to roll a hemocraft die, you can reroll the die and use either roll.",
      },
      {
        type: "paragraph",
        value:
          "Additionally, whenever you score a critical hit with a weapon for which you have an active crimson rite, you regain one expended use of your Blood Maledict feature.",
      },
    ],
  },
];

export default bloodhunterFeatures;
