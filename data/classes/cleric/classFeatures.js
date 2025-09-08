const clericFeatures = [
  {
    id: "spellcasting-1",
    title: "Spellcasting",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "You have learned to cast spells through prayer and meditation. See chapter 7 for the rules on spellcasting. The information below details how you use those rules with Cleric spells, which appear in the Cleric spell list later in the class's description.",
      },
      {
        type: "heading",
        value: "Cantrips",
      },
      {
        type: "paragraph",
        value:
          "You know three cantrips of your choice from the Cleric spell list. Guidance, Sacred Flame, and Thaumaturgy are recommended. Whenever you gain a Cleric level, you can replace one of your cantrips with another cantrip of your choice from the Cleric spell list. When you reach Cleric levels 4 and 10, you learn another cantrip of your choice from the Cleric spell list, as shown in the Cantrips column of the Cleric Features table.",
      },
      {
        type: "heading",
        value: "Spell Slots",
      },
      {
        type: "paragraph",
        value:
          "The Cleric Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Prepared Spells of Level 1+",
      },
      {
        type: "paragraph",
        value:
          "You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose four level 1 spells from the Cleric spell list. Bless, Cure Wounds, Guiding Bolt, and Shield of Faith are recommended. The number of spells on your list increases as you gain Cleric levels, as shown in the Prepared Spells column of the Cleric Features table. Whenever that number increases, choose additional spells from the Cleric spell list until the number of spells on your list matches the number on the table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 3 Cleric, your list of prepared spells can include six spells of levels 1 and 2 in any combination.",
      },
      {
        type: "paragraph",
        value:
          "If another Cleric feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Cleric spells for you.",
      },
      {
        type: "heading",
        value: "Changing Your Prepared Spells",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Cleric level, you can replace one spell on your list with another Cleric spell for which you have spell slots.",
      },
      {
        type: "heading",
        value: "Spellcasting Ability",
      },
      {
        type: "paragraph",
        value: "Wisdom is your spellcasting ability for your Cleric spells.",
      },
      {
        type: "heading",
        value: "Spellcasting Focus",
      },
      {
        type: "paragraph",
        value:
          "You can use a Holy Symbol as a Spellcasting Focus for your Cleric spells.",
      },
    ],
  },
  {
    id: "divine-order-1",
    title: "Divine Order",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "You have dedicated yourself to one of the following sacred roles of your choice.",
      },
      {
        type: "heading",
        value: "Protector",
      },
      {
        type: "paragraph",
        value:
          "Trained for battle, you gain proficiency with Martial weapons and training with Heavy Armor.",
      },
      {
        type: "heading",
        value: "Thaumaturge",
      },
      {
        type: "paragraph",
        value:
          "You know one extra cantrip from the Cleric spell list. In addition, your mystical connection to the divine gives you a bonus to your Intelligence (Arcana or Religion) checks. The bonus equals your Wisdom modifier (minimum of +1).",
      },
    ],
  },
  {
    id: "channel-divinity-2",
    title: "Channel Divinity",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "You can channel divine energy directly from the Outer Planes to fuel magical effects. You start with two such effects: Divine Spark and Turn Undead. Each of which is described below. Each time you use this class's Channel Divinity, choose which Channel Divinity effect from this class to create. You gain additional effect options if a subclass gives you one.",
      },
      {
        type: "paragraph",
        value:
          "You can use this class's Channel Divinity twice. You regain one of its expended uses when you finish a Short Rest, and you regain all expended uses when you finish a Long Rest. You gain additional uses when you reach certain Cleric levels, as shown in the Channel Divinity column of the Cleric Features table.",
      },
      {
        type: "paragraph",
        value:
          "If a Channel Divinity effect requires a saving throw, the DC equals the spell save DC from this class's Spellcasting feature.",
      },
      {
        type: "heading",
        value: "Divine Spark",
      },
      {
        type: "paragraph",
        value:
          "As an Action, you point your Holy Symbol at another creature you can see within 30 feet of yourself and focus divine energy at it. Roll 1d8 and add your Wisdom modifier. You either restore Hit Points to the creature equal to that total or force the creature to make a Constitution saving throw. On a failed save, the creature takes Necrotic or Radiant damage (your choice) equal to that total. On a successful save, the creature takes half as much damage (round down).",
      },
      {
        type: "paragraph",
        value:
          "You gain an additional d8 at Cleric levels 5 (2d8), 7 (3d8), and 13 (4d8).",
      },
      {
        type: "heading",
        value: "Turn Undead",
      },
      {
        type: "paragraph",
        value:
          "As a Magic Action, you present your Holy Symbol and censure Undead creatures. Each Undead of your choice within 30 feet of you must make a Wisdom saving throw. If the creature fails its save, it has the Frightened and Incapacitated conditions for 1 minute. For that duration, it has to move as far from you as it can on its turn. This effect ends early on the creature if it takes any damage, if you have the Incapacitated condition, or if its turn ends.",
      },
    ],
  },
  {
    id: "cleric-subclass-3",
    title: "Cleric Subclass",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "You gain a Cleric subclass of your choice. A subclass is a specialization that grants you features at certain Cleric levels. For the rest of your career, you gain each of your subclass's features that are of your Cleric level or lower.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "sear-undead-5",
    title: "Sear Undead",
    level: 5,
    content: [
      {
        type: "paragraph",
        value:
          "When you use your Turn Undead, you can roll a number of d6s equal to your Wisdom modifier (minimum of 1d6) and add the rolls together. Each Undead that fails its saving throw against that use of Turn Undead takes Radiant damage equal to the rolls' total. This damage doesn't end the turn effect.",
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
        value: "You gain a feature from your Cleric Subclass.",
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
    id: "blessed-strikes-7",
    title: "Blessed Strikes",
    level: 7,
    content: [
      {
        type: "paragraph",
        value:
          "Divine power infuses you in battle. You gain one of the following options of your choice (if you get either option from a Cleric subclass in an older book, use only the option you choose for this feature).",
      },
      {
        type: "heading",
        value: "Divine Strike",
      },
      {
        type: "paragraph",
        value:
          "Once on each of your turns when you hit a creature with an attack roll using a weapon, you can cause the target to take an extra 1d8 Necrotic or Radiant damage (your choice).",
      },
      {
        type: "heading",
        value: "Potent Spellcasting",
      },
      {
        type: "paragraph",
        value:
          "Add your Wisdom modifier to the damage you deal with any Cleric cantrip.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "divine-intervention-10",
    title: "Divine Intervention",
    level: 10,
    content: [
      {
        type: "paragraph",
        value:
          "You can call on your deity or pantheon to intervene on your behalf. As a Magic action, choose any Cleric spell of level 5 or lower that doesn't require a Reaction to cast. As part of the same action, you cast that spell without expending a spell slot or needing Material components. You can't use this feature again until you finish a Long Rest.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "improved-blessed-strikes-14",
    title: "Improved Blessed Strikes",
    level: 14,
    content: [
      {
        type: "paragraph",
        value:
          "The option you chose for Blessed Strikes now grows more powerful.",
      },
      {
        type: "heading",
        value: "Divine Strike",
      },
      {
        type: "paragraph",
        value: "The extra damage of your Divine Strike increases to 2d8.",
      },
      {
        type: "heading",
        value: "Potent Spellcasting",
      },
      {
        type: "paragraph",
        value:
          "When you cast a Cleric cantrip and deal damage to a creature with it, you can give vitality to yourself or another creature within 60 feet of yourself, granting a number of Temporary Hit Points equal to twice your Wisdom modifier.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "subclass-feature-17",
    title: "Subclass Feature",
    level: 17,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Cleric Subclass.",
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
    id: "epic-boon-19",
    title: "Epic Boon",
    level: 19,
    content: [
      {
        type: "paragraph",
        value:
          "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Fate is recommended.",
      },
    ],
  },
  {
    id: "greater-divine-intervention-20",
    title: "Greater Divine Intervention",
    level: 20,
    content: [
      {
        type: "paragraph",
        value:
          "You can call on even more powerful divine intervention. When you use your Divine Intervention feature, you can choose Wish when you select a spell. If you do so, you can't use Divine Intervention again until you finish 2d4 Long Rests.",
      },
    ],
  },
];

export default clericFeatures;
