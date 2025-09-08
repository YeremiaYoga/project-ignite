const rangerFeatures = [
  {
    id: "spellcasting-1",
    title: "Spellcasting",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "You have learned to channel the magical essence of nature to cast spells. See chapter 7 for the rules on spellcasting. The information below details how you use those rules with Ranger spells, which appear in the Ranger spell list later in the class's description.",
      },
      {
        type: "heading",
        value: "Spell Slots",
      },
      {
        type: "paragraph",
        value:
          "The Ranger Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Prepared Spells of Level 1+",
      },
      {
        type: "paragraph",
        value:
          "You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose two level 1 Ranger spells. Cure Wounds and Ensnaring Strike are recommended.",
      },
      {
        type: "paragraph",
        value:
          "The number of spells on your list increases as you gain Ranger levels, as shown in the Prepared Spells column of the Ranger Features table. Whenever that number increases, choose additional Ranger spells until the number of spells on your list matches the number in the Ranger Features table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 5 Ranger, your list of prepared spells can include six Ranger spells of level 1 or 2 in any combination.",
      },
      {
        type: "paragraph",
        value:
          "If another Ranger feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Ranger spells for you.",
      },
      {
        type: "heading",
        value: "Changing Your Prepared Spells",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a Long Rest, you can replace one spell on your list with another Ranger spell for which you have spell slots.",
      },
      {
        type: "heading",
        value: "Spellcasting Ability",
      },
      {
        type: "paragraph",
        value: "Wisdom is your spellcasting ability for your Ranger spells.",
      },
      {
        type: "heading",
        value: "Spellcasting Focus",
      },
      {
        type: "paragraph",
        value:
          "You can use a Druidic Focus as a Spellcasting Focus for your Ranger spells.",
      },
    ],
  },
  {
    id: "favored-enemy-1",
    title: "Favored Enemy",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "You always have the Hunter's Mark spell prepared. You can cast it twice without expending a spell slot, and you regain all expended uses of this ability when you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "The number of times you can cast the spell without a spell slot increases when you reach certain Ranger levels, as shown in the Favored Enemy column of the Ranger Features table.",
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
          "Your training with weapons allows you to use the mastery properties of two kinds of weapons of your choice with which you have proficiency, such as Longbows and Shortswords.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a Long Rest, you can change the kinds of weapons you chose. For example, you could switch to using the mastery properties of Scimitars and Longswords.",
      },
    ],
  },
  {
    id: "deft-explorer-2",
    title: "Deft Explorer",
    level: 2,

    content: [
      {
        type: "paragraph",
        value: "Thanks to your travels, you gain the following benefits.",
      },
      {
        type: "heading",
        value: "Expertise",
      },
      {
        type: "paragraph",
        value:
          "Choose one of your skill proficiencies with which you lack Expertise. You gain Expertise in that skill.",
      },
      {
        type: "heading",
        value: "Languages",
      },
      {
        type: "paragraph",
        value:
          "You know two languages of your choice from the language tables in chapter 2.",
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
          "You gain a Fighting Style feat of your choice. Instead of choosing one of those feats, you can choose the option below.",
      },
      {
        type: "heading",
        value: "Druidic Warrior",
      },
      {
        type: "paragraph",
        value:
          "You learn two Druid cantrips of your choice. Guidance and Starry Wisp are recommended. The chosen cantrips count as Ranger spells for you, and Wisdom is your spellcasting ability for them. Whenever you gain a Ranger level, you can replace one of these cantrips with another Druid cantrip.",
      },
    ],
  },
  {
    id: "ranger-subclass-3",
    title: "Ranger Subclass",
    level: 3,

    content: [
      {
        type: "paragraph",
        value:
          "You gain a Ranger subclass of your choice. A subclass is a specialization that grants you features at certain Ranger levels. For the rest of your career, you gain each of your subclass's features that are of your Ranger level or lower.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Ranger levels 8, 12, and 16.",
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
    id: "roving-6",
    title: "Roving",
    level: 6,

    content: [
      {
        type: "paragraph",
        value:
          "Your Speed increases by 10 feet while you aren't wearing Heavy armor. You also have a Climb Speed and a Swim Speed equal to your Speed.",
      },
    ],
  },
  {
    id: "subclass-feature-7",
    title: "Subclass Feature",
    level: 7,

    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Ranger Subclass.",
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
    id: "expertise-9",
    title: "Expertise",
    level: 9,

    content: [
      {
        type: "paragraph",
        value:
          "Choose two of your skill proficiencies with which you lack Expertise. You gain Expertise in those skills.",
      },
    ],
  },
  {
    id: "tireless-10",
    title: "Tireless",
    level: 10,

    content: [
      {
        type: "paragraph",
        value:
          "Primal forces now help fuel you on your journeys, granting you the following benefits.",
      },
      {
        type: "heading",
        value: "Temporary Hit Points",
      },
      {
        type: "paragraph",
        value:
          "As a Magic action, you can give yourself a number of Temporary Hit Points equal to 1d8 plus your Wisdom modifier (minimum of 1). You can use this action a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Decrease Exhaustion",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a Short Rest, your Exhaustion level, if any, decreases by 1.",
      },
    ],
  },
  {
    id: "subclass-feature-11",
    title: "Subclass Feature",
    level: 11,

    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Ranger Subclass.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "relentless-hunter-13",
    title: "Relentless Hunter",
    level: 13,

    content: [
      {
        type: "paragraph",
        value: "Taking damage can't break your Concentration on Hunter's Mark.",
      },
    ],
  },
  {
    id: "natures-veil-14",
    title: "Nature's Veil",
    level: 14,

    content: [
      {
        type: "paragraph",
        value:
          "You invoke spirits of nature to magically hide yourself. As a Bonus Action, you can give yourself the Invisible condition until the end of your next turn.",
      },
      {
        type: "paragraph",
        value:
          "You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.",
      },
    ],
  },
  {
    id: "subclass-feature-15",
    title: "Subclass Feature",
    level: 15,

    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Ranger Subclass.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "precise-hunter-17",
    title: "Precise Hunter",
    level: 17,

    content: [
      {
        type: "paragraph",
        value:
          "You have Advantage on attack rolls against the creature currently marked by your Hunter's Mark.",
      },
    ],
  },
  {
    id: "feral-senses-18",
    title: "Feral Senses",
    level: 18,

    content: [
      {
        type: "paragraph",
        value:
          "Your connection to the forces of nature grants you Blindsight with a range of 30 feet.",
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
          "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Dimensional Travel is recommended.",
      },
    ],
  },
  {
    id: "foe-slayer-20",
    title: "Foe Slayer",
    level: 20,

    content: [
      {
        type: "paragraph",
        value:
          "The damage die of your Hunter's Mark is a d10 rather than a d6.",
      },
    ],
  },
];

export default rangerFeatures;
