const bardFeatures = [
  {
    id: "bardic-inspiration-1",
    title: "Bardic Inspiration",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "You can supernaturally inspire others through words, music, or dance. This inspiration is represented by your Bardic Inspiration die, which is a d6.",
      },
      {
        type: "heading",
        value: "Using Bardic Inspiration",
      },
      {
        type: "paragraph",
        value:
          "As a Bonus Action, you can inspire another creature within 60 feet of yourself who can see or hear you. That creature gains one of your Bardic Inspiration die. A creature can have only one Bardic Inspiration die at a time. Once within the next hour when the creature fails a d20 Test, the creature can roll the Bardic Inspiration die and add the number rolled to the d20, potentially turning the failure into a success. A Bardic Inspiration die is expended when it’s rolled.",
      },
      {
        type: "heading",
        value: "Number of Uses",
      },
      {
        type: "paragraph",
        value:
          "You can confer a Bardic Inspiration die a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "At Higher Levels",
      },
      {
        type: "paragraph",
        value:
          "Your Bardic Inspiration die changes when you reach certain Bard levels, as shown in the Bardic Die column of the Bard Features table. The die becomes a d8 at level 5, a d10 at level 10, and a d12 at level 15.",
      },
    ],
  },
  {
    id: "spellcasting-1",
    title: "Spellcasting",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "You have learned to cast spells through your bardic arts. See chapter 7 for the rules on spellcasting. The information below details how you use those rules with Bard spells, which appear in the Bard spell list later in the class's description.",
      },
      {
        type: "heading",
        value: "Cantrips",
      },
      {
        type: "paragraph",
        value:
          "You know two cantrips of your choice from the Bard spell list. Dancing Lights and Vicious Mockery are recommended. Whenever you gain a Bard level, you can replace one of your cantrips with another cantrip of your choice from the Bard spell list, as shown in the Cantrips column of the Bard Features table.",
      },
      {
        type: "heading",
        value: "Spell Slots",
      },
      {
        type: "paragraph",
        value:
          "The Bard Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Prepared Spells of Level 1+",
      },
      {
        type: "paragraph",
        value:
          "You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose four level 1 spells from the Bard spell list. Charm Person, Color Spray, Dissonant Whispers, and Healing Word are recommended. The number of spells on your list increases as you gain Bard levels, as shown in the Prepared Spells column of the Bard Features table. Whenever that number increases, choose additional spells from the Bard spell list until the number of spells on your list matches the number on the table. For example, if you're a level 3 Bard, your list of prepared spells can include six spells of levels 1 and 2 in any combination. If another Bard feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Bard spells for you.",
      },
      {
        type: "heading",
        value: "Changing Your Prepared Spells",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Bard level, you can replace one spell on your list with another Bard spell for which you have spell slots.",
      },
      {
        type: "heading",
        value: "Spellcasting Ability",
      },
      {
        type: "paragraph",
        value: "Charisma is your spellcasting ability for your Bard spells.",
      },
      {
        type: "heading",
        value: "Spellcasting Focus",
      },
      {
        type: "paragraph",
        value:
          "You can use a Musical Instrument as a Spellcasting Focus for your Bard spells.",
      },
    ],
  },
  {
    id: "expertise-2",
    title: "Expertise",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "You gain Expertise in two of your skill proficiencies of your choice. Performance and Persuasion are recommended. At Bard level 9, you gain Expertise in two more of your skill proficiencies of your choice.",
      },
    ],
  },
  {
    id: "jack-of-all-trades-2",
    title: "Jack of All Trades",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "You can add half your Proficiency Bonus (round down) to any ability check you make that uses a skill proficiency you lack and that doesn't otherwise use your Proficiency Bonus. For example, if you make a Strength (Athletics) check and lack Athletics proficiency, you can add half your Proficiency Bonus to the check.",
      },
      {
        type: "note",
        value: "A Bard's Repertoire",
        content: [
          "Does your Bard beat a drum while chanting the deeds of ancient heroes? Strum a lute while crooning romantic tunes? Perform arias of stirring power? Recite dramatic monologues from classic tragedies? Use the rhythm of a folk dance to coordinate the movement of allies in battle? Compose naughty limericks?",
          "When you play a Bard, consider the style of artistic performance you favor, the moods you might invoke, and the themes that inspire your own creations. Are you poems inspired by moments of natural beauty, or are they brooding reflections on loss? Do you prefer lofty hymns or rowdy tavern songs? Do you dance merry jigs or perform elaborate interpretive choreography? Do you focus on one style of performance or strive to master them all?",
        ],
      },
    ],
  },

  {
    id: "bard-subclass-3",
    title: "Bard Subclass",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "You gain a Bard subclass of your choice. A subclass is a specialization that grants you features at certain Bard levels. For the rest of your career, you gain each of your subclass's features that are of your Bard level or lower.",
      },
      {
        type: "subclass",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Bard levels 8, 12, and 16.",
      },
    ],
  },
  {
    id: "font-of-inspiration-5",
    title: "Font of Inspiration",
    level: 5,
    content: [
      {
        type: "paragraph",
        value:
          "You now regain all your expended uses of Bardic Inspiration when you finish a Short or Long Rest. In addition, you can expend a spell slot (no action required) to regain one expended use of Bardic Inspiration.",
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
        value: "You gain a feature from your Bard Subclass.",
      },
      {
        type: "subclass",
        value: "Select a subclass to view its feature(s) here.",
      },
    ],
  },
  {
    id: "countercharm-7",
    title: "Countercharm",
    level: 7,
    content: [
      {
        type: "paragraph",
        value:
          "You can use musical notes or words of power to disrupt mind-influencing effects. If you or a creature within 30 feet of you fails a saving throw against an effect that applies the Charmed or Frightened condition, you can take a Reaction to cause the save to be rerolled, and the new roll has Advantage.",
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
          "You gain Expertise in two more of your skill proficiencies of your choice.",
      },
    ],
  },
  {
    id: "magical-secrets-10",
    title: "Magical Secrets",
    level: 10,
    content: [
      {
        type: "paragraph",
        value:
          "You've learned secrets from various magical traditions. Whenever you reach a Bard level (including this level) and the Prepared Spells number in the Bard Features table increases, you can choose any of your new prepared spells from the Bard, Cleric, Druid, and Wizard spell lists, and the chosen spells count as Bard spells for you (see a class's section for its spell list). In addition, whenever you replace a spell prepared for this class, you can replace it with a spell from those lists.",
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
    id: "subclass-feature-14",
    title: "Subclass Feature",
    level: 14,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Bard Subclass.",
      },
      {
        type: "subclass",
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
    id: "superior-inspiration-18",
    title: "Superior Inspiration",
    level: 18,
    content: [
      {
        type: "paragraph",
        value:
          "When you roll Initiative, you regain expended uses of Bardic Inspiration until you have two if you have fewer than that.",
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
          "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Spell Recall is recommended.",
      },
    ],
  },
  {
    id: "words-of-creation-20",
    title: "Words of Creation",
    level: 20,
    content: [
      {
        type: "paragraph",
        value:
          "You have mastered two of the Words of Creation: the words of life and death. You therefore always have the Power Word Heal and Power Word Kill spells prepared. When you cast either spell, you can target a second creature with it if that creature is within 10 feet of the first target.",
      },
    ],
  },
];

export default bardFeatures;
