const wizardFeatures = [
  {
    id: "spellcasting-1",
    title: "Spellcasting",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "As a student of arcane magic, you have learned to cast spells. See chapter 7 for the rules on spellcasting. The information below details how you use those rules with Wizard spells, which appear in the Wizard spell list later in the class's description.",
      },
      {
        type: "heading",
        value: "Cantrips",
      },
      {
        type: "paragraph",
        value:
          "You know three Wizard cantrips of your choice. Light, Mage Hand, and Ray of Frost are recommended. Whenever you finish a Long Rest, you can replace one of your cantrips from this feature with another Wizard cantrip of your choice.",
      },
      {
        type: "paragraph",
        value:
          "When you reach Wizard levels 4 and 10, you learn another Wizard cantrip of your choice, as shown in the Cantrips column of the Wizard Features table.",
      },
      {
        type: "heading",
        value: "Spellbook",
      },
      {
        type: "paragraph",
        value:
          "Your wizardly apprenticeship culminated in the creation of a unique book: your spellbook. It is a Tiny object that weighs 3 pounds, contains 100 pages, and can be read only by you or someone casting Identify. You determine the book's appearance and materials, such as a gilt-edged tome or a collection of vellum bound with twine.",
      },
      {
        type: "paragraph",
        value:
          "The book contains the level 1+ spells you know. It starts with six level 1 Wizard spells of your choice. Detect Magic, Feather Fall, Mage Armor, Magic Missile, Sleep, and Thunderwave are recommended.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Wizard level after 1, add two Wizard spells of your choice to your spellbook. Each of these spells must be of a level for which you have spell slots, as shown in the Wizard Features table. The spells are the culmination of arcane research you do regularly.",
      },
      {
        type: "heading",
        value: "Spell Slots",
      },
      {
        type: "paragraph",
        value:
          "The Wizard Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Prepared Spells of Level 1+",
      },
      {
        type: "paragraph",
        value:
          "You prepare the list of level 1+ spells that are available for you to cast with this feature. To do so, choose four spells from your spellbook. The chosen spells must be of a level for which you have spell slots.",
      },
      {
        type: "paragraph",
        value:
          "The number of spells on your list increases as you gain Wizard levels, as shown in the Prepared Spells column of the Wizard Features table. Whenever that number increases, choose additional Wizard spells until the number of spells on your list matches the number in the table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 3 Wizard, your list of prepared spells can include six spells of levels 1 and 2 in any combination, chosen from your spellbook.",
      },
      {
        type: "paragraph",
        value:
          "If another Wizard feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Wizard spells for you.",
      },
      {
        type: "heading",
        value: "Changing Your Prepared Spells",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a Long Rest, you can change your list of prepared spells, replacing any of the spells there with spells from your spellbook.",
      },
      {
        type: "heading",
        value: "Spellcasting Ability",
      },
      {
        type: "paragraph",
        value:
          "Intelligence is your spellcasting ability for your Wizard spells.",
      },
      {
        type: "heading",
        value: "Spellcasting Focus",
      },
      {
        type: "paragraph",
        value:
          "You can use an Arcane Focus or your spellbook as a Spellcasting Focus for your Wizard spells.",
      },
      {
        type: "note",
        value: "Expanding and Replacing a Spellbook",
        content: [
          "The spells you add to your spellbook as you gain levels reflect your ongoing magical research, but you might find other spells during your adventures that you can add to the book. You could discover a Wizard spell on a Spell Scroll, for example, and then copy it into your spellbook.",
          "Copying a Spell into the Book. When you find a level 1+ Wizard spell, you can copy it into your spellbook if it's of a level you can prepare and if you have time to copy it. For each level of the spell, the transcription takes 2 hours and costs 50 GP. Afterward you can prepare the spell like the other spells in your spellbook.",
          "Copying the Book. You can copy a spell from your spellbook into another book. This is like copying a new spell into your spellbook but faster, since you already know how to cast the spell. You need spend only 1 hour and 10 GP for each level of the copied spell.",
          "If you lose your spellbook, you can use the same procedure to transcribe the Wizard spells that you have prepared into a new spellbook. Filling out the remainder of the new book requires you to find new spells to do so. For this reason, many wizards keep a backup spellbook.",
        ],
      },
    ],
  },
  {
    id: "ritual-adept-1",
    title: "Ritual Adept",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "You can cast any spell as a Ritual if that spell has the Ritual tag and the spell is in your spellbook. You needn't have the spell prepared, but you must read from the book to cast a spell in this way.",
      },
    ],
  },
  {
    id: "arcane-recovery-1",
    title: "Arcane Recovery",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "You can regain some of your magical energy by studying your spellbook. When you finish a Short Rest, you can choose expended spell slots to recover. The spell slots can have a combined level equal to no more than half your Wizard level (round up), and none of the slots can be level 6 or higher. For example, if you're a level 4 Wizard, you can recover up to two levels' worth of spell slots, regaining either one level 2 spell slot or two level 1 spell slots.",
      },
      {
        type: "paragraph",
        value:
          "Once you use this feature, you can't do so again until you finish a Long Rest.",
      },
    ],
  },
  {
    id: "scholar-2",
    title: "Scholar",
    level: 2,

    content: [
      {
        type: "paragraph",
        value:
          "While studying magic, you also specialized in another field of study. Choose one of the following skills in which you have proficiency: Arcana, History, Investigation, Medicine, Nature, or Religion. You have Expertise in the chosen skill.",
      },
    ],
  },
  {
    id: "wizard-subclass-3",
    title: "Wizard Subclass",
    level: 3,

    content: [
      {
        type: "paragraph",
        value:
          "You gain a Wizard subclass of your choice. A subclass is a specialization that grants you features at certain Wizard levels. For the rest of your career, you gain each of your subclass's features that are of your Wizard level or lower.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Wizard levels 8, 12, and 16.",
      },
    ],
  },
  {
    id: "memorize-spell-5",
    title: "Memorize Spell",
    level: 5,

    content: [
      {
        type: "paragraph",
        value:
          "Whenever you finish a Short Rest, you can study your spellbook and replace one of the level 1+ Wizard spells you have prepared for your Spellcasting feature with another level 1+ spell from the book.",
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
        value: "You gain a feature from your Wizard Subclass.",
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
          "You gain the Ability Score Improvement Feat or another feat of your choice for which you qualify.",
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
        value: "You gain a feature from your Wizard Subclass.",
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
          "You gain the Ability Score Improvement Feat or another feat of your choice for which you qualify.",
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
        value: "You gain a feature from your Wizard Subclass.",
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
          "You gain the Ability Score Improvement Feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "spell-mastery-18",
    title: "Spell Mastery",
    level: 18,

    content: [
      {
        type: "paragraph",
        value:
          "You have achieved such mastery over certain spells that you can cast them at will. Choose a level 1 and a level 2 spell in your spellbook that have a casting time of an action. You always have those spells prepared, and you can cast them at their lowest level without expending a spell slot. To cast either spell at a higher level, you must expend a spell slot.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a Long Rest, you can study your spellbook and replace one of those spells with an eligible spell of the same level from the book.",
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
    id: "signature-spells-20",
    title: "Signature Spells",
    level: 20,

    content: [
      {
        type: "paragraph",
        value:
          "Choose two level 3 spells in your spellbook as your signature spells. You always have these spells prepared, and you can cast each of them once at level 3 without expending a spell slot. When you do so, you can't cast them in this way again until you finish a Short or Long Rest. To cast either spell at a higher level, you must expend a spell slot.",
      },
    ],
  },
];

export default wizardFeatures;
