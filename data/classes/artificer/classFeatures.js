const artificerFeatures = [
  {
    id: "optional-rule-firearm-proficiency-1",
    title: "Optional Rule: Firearm Proficiency",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "The secrets of gunpowder weapons have been discovered in various corners of the D&D multiverse. If your Dungeon Master uses the rules on firearms in the Dungeon Master's Guide and your artificer has been exposed to the operation of such weapons, your artificer is proficient with them.",
      },
    ],
  },
  {
    id: "magical-tinkering-1",
    title: "Magical Tinkering",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "At 1st level, you've learned how to invest a spark of magic into mundane objects. To use this ability, you must have thieves' tools or artisan's tools in hand. You then touch a Tiny nonmagical object as an action and give it one of the following magical properties of your choice:",
      },
      {
        type: "list",
        items: [
          "The object sheds bright light in a 5-foot radius and dim light for an additional 5 feet.",
          "Whenever tapped by a creature, the object emits a recorded message that can be heard up to 10 feet away. You utter the message when you bestow this property on the object, and the recording can be no more than 6 seconds long.",
          "The object continuously emits your choice of an odor or a nonverbal sound (wind, waves, chirping, or the like). The chosen phenomenon is perceivable up to 10 feet away.",
          "A static visual effect appears on one of the object's surfaces. This effect can be a picture, up to 25 words of text, lines and shapes, or a mixture of these elements, as you like.",
        ],
      },
      {
        type: "paragraph",
        value:
          "The chosen property lasts indefinitely. As an action, you can touch the object and end the property early.",
      },
      {
        type: "paragraph",
        value:
          "You can bestow magic on multiple objects, touching one object each time you use this feature, though a single object can only bear one property at a time. The maximum number of objects you can affect with this feature at one time is equal to your Intelligence modifier (minimum of one object). If you try to exceed your maximum, the oldest property immediately ends, and then the new property applies.",
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
          "You've studied the workings of magic and how to cast spells, channeling the magic through objects. To observers, you don't appear to be casting spells in a conventional way; you appear to produce wonders from mundane items and outlandish inventions.",
      },
      {
        type: "heading",
        value: "Tools Required",
      },
      {
        type: "paragraph",
        value:
          "You produce your artificer spell effects through your tools. You must have a spellcasting focus—specifically thieves' tools or some kind of artisan's tools—in hand when you cast any spell with the Spellcasting feature (meaning the spell has an 'M' component when you cast it). You must be proficient with the tool to use it in this way.",
      },
      {
        type: "paragraph",
        value:
          "After you gain the Infuse Item feature at 2nd level, you can also use any item bearing one of your infusions as a spellcasting focus.",
      },
      {
        type: "note",
        value: "The Magic of Artifice",
        content: [
          "As an artificer, you use tools when you cast your spells. When describing your spellcasting, think about how you're using a tool to perform the spell effect. If you cast cure wounds using alchemist’s supplies, you could be quickly producing a salve. If you cast it using tinker’s tools, you might have a miniature mechanical spider that binds wounds. ...",
          "Such details don’t limit you in any way or provide you with any benefit beyond the spell’s effects. You don’t have to justify how you’re using tools to cast a spell. But describing your spellcasting creatively is a fun way to distinguish yourself from other spellcasters.",
        ],
      },
      {
        type: "heading",
        value: "Cantrips (0-Level Spells)",
      },
      {
        type: "paragraph",
        value:
          "At 1st level, you know two cantrips of your choice from the artificer spell list. At higher levels, you learn additional artificer cantrips of your choice, as shown in the Cantrips Known column of the Artificer table. When you gain a level in this class, you can replace one of the artificer cantrips you know with another cantrip from the artificer spell list.",
      },
      {
        type: "heading",
        value: "Preparing and Casting Spells",
      },
      {
        type: "paragraph",
        value:
          "The Artificer table shows how many spell slots you have to cast your artificer spells of 1st level and higher. To cast one of these artificer spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.",
      },
      {
        type: "paragraph",
        value:
          "You prepare the list of artificer spells that are available for you to cast, choosing from the artificer spell list. When you do so, choose a number of artificer spells equal to your Intelligence modifier + half your artificer level, rounded down (minimum of one spell). The spells must be of a level for which you have spell slots.",
      },
      {
        type: "paragraph",
        value:
          "For example, if you are a 5th-level artificer, you have four 1st-level and two 2nd-level spell slots. With an Intelligence of 14, your list of prepared spells can include four spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or a 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.",
      },
      {
        type: "paragraph",
        value:
          "You can change your list of prepared spells when you finish a long rest. Preparing a new list of artificer spells requires time spent tinkering with your spellcasting focuses: at least 1 minute per spell level for each spell on your list.",
      },
      {
        type: "heading",
        value: "Spellcasting Ability",
      },
      {
        type: "paragraph",
        value:
          "Intelligence is your spellcasting ability for your artificer spells; your understanding of the theory behind magic allows you to wield these spells with superior skill. You use your Intelligence whenever an artificer spell refers to your spellcasting ability. In addition, you use your Intelligence modifier when setting the saving throw DC for an artificer spell you cast and when making an attack roll with one.",
      },
      {
        type: "list",
        items: [
          "Spell save DC = 8 + your proficiency bonus + your Intelligence modifier",
          "Spell attack modifier = your proficiency bonus + your Intelligence modifier",
        ],
      },
      {
        type: "heading",
        value: "Ritual Casting",
      },
      {
        type: "paragraph",
        value:
          "You can cast an artificer spell as a ritual if that spell has the ritual tag and you have the spell prepared.",
      },
    ],
  },
  {
    id: "infuse-item-2",
    title: "Infuse Item",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "You've gained the ability to imbue mundane items with certain magical infusions, turning those objects into magic items.",
      },
      {
        type: "heading",
        value: "Infusions Known",
      },
      {
        type: "paragraph",
        value:
          "When you gain this feature, pick four artificer infusions to learn, choosing from the 'Artificer Infusions' section at the end of the class's description. You learn additional infusions of your choice when you reach certain levels in this class, as shown in the Infusions Known column of the Artificer table.",
      },
      {
        type: "note",
        value: "Artificer Infusions",
        content: [
          "Artificers have invented numerous magical infusions, extraordinary processes that rapidly create magic items. To many, artificers seem like wonderworkers, accomplishing in hours what others need weeks to complete.",
          "The description of each of the following infusions details the type of item that can receive it, along with whether the resulting magic item requires attunement.",
          "Some infusions specify a minimum artificer level. You can't learn such an infusion until you are at least that level.",
          "Unless an infusion's description says otherwise, you can't learn an infusion more than once.",
        ],
      },
      {
        type: "heading",
        value: "Infusing an Item",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a long rest, you can touch a nonmagical object and imbue it with one of your artificer infusions, turning it into a magic item. An infusion works only on certain kinds of objects, as specified in the infusion’s description. If the item requires attunement, you can attune yourself to it the instant you infuse the item. If you decide to attune to the item later, you must do so using the normal process for attunement (see 'Attunement' in chapter 7 of the Dungeon Master's Guide).",
      },
      {
        type: "paragraph",
        value:
          "Your infusion remains in an item indefinitely, but when you die, the infusion vanishes after a number of days have passed equal to your Intelligence modifier (minimum of 1 day). The infusion also vanishes if you give up your knowledge of the infusion for another one.",
      },
      {
        type: "paragraph",
        value:
          "You can infuse more than one nonmagical object at the end of a long rest; the maximum number of objects appears in the Infused Items column of the Artificer table. You must touch each of the objects, and each of your infusions can be in only one object at a time. Moreover, no object can bear more than one of your infusions at a time. If you try to exceed your maximum number of infusions, the oldest infusion immediately ends, and then the new infusion applies.",
      },
      {
        type: "paragraph",
        value:
          "If an infusion ends on an item that contains other things, like a bag of holding, its contents harmlessly appear in and around its space.",
      },
    ],
  },
  {
    id: "artificer-specialist-3",
    title: "Artificer Specialist",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "Choose an Artificer Specialist subclass at 3rd level. Your choice grants you features at 3rd, 5th, 9th, and 15th level.",
      },
      {
        type: "subclass",
        value: "No Subclasses Available",
      },
    ],
  },
  {
    id: "the-right-tool-for-the-job-3",
    title: "The Right Tool for the Job",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "You've learned how to produce exactly the tool you need: with thieves' tools or artisan's tools in hand, you can magically create one set of artisan's tools in an unoccupied space within 5 feet of you. This creation requires 1 hour of uninterrupted work, which can coincide with a short or long rest. Though the product of magic, the tools are nonmagical, and they vanish when you use this feature again.",
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
    id: "artificer-specialist-feature-5",
    title: "Artificer Specialist Feature",
    level: 5,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature granted by your Artificer Specialist choice.",
      },
      {
        type: "subclass",
        value: "No Subclasses Available",
      },
    ],
  },
  {
    id: "tool-expertise-6",
    title: "Tool Expertise",
    level: 6,
    content: [
      {
        type: "paragraph",
        value:
          "At 6th level, your proficiency bonus is now doubled for any ability check you make that uses your proficiency with a tool.",
      },
    ],
  },
  {
    id: "flash-of-genius-7",
    title: "Flash of Genius",
    level: 7,
    content: [
      {
        type: "paragraph",
        value:
          "You've gained the ability to come up with solutions under pressure. When you or another creature you can see within 30 feet of you makes an ability check or a saving throw, you can use your reaction to add your Intelligence modifier to the roll.",
      },
      {
        type: "paragraph",
        value:
          "You can use this feature a number of times equal to your Intelligence modifier (minimum of one). You regain all expended uses when you finish a long rest.",
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
    id: "artificer-specialist-feature-9",
    title: "Artificer Specialist Feature",
    level: 9,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature granted by your Artificer Specialist choice.",
      },
      {
        type: "subclass",
        value: "No Subclasses Available",
      },
    ],
  },
  {
    id: "magic-item-adept-10",
    title: "Magic Item Adept",
    level: 10,
    content: [
      {
        type: "paragraph",
        value:
          "You've achieved a profound understanding of how to use and make magic items:",
      },
      {
        type: "list",
        items: [
          "You can attune up to four magic items at once.",
          "If you craft a magic item with a rarity of common or uncommon, it takes you a quarter of the normal time, and it costs you half as much of the usual gold.",
        ],
      },
    ],
  },
  {
    id: "spell-storing-item-11",
    title: "Spell-Storing Item",
    level: 11,
    content: [
      {
        type: "paragraph",
        value:
          "You can now store a spell in an object. Whenever you finish a long rest, you can touch one simple or martial weapon or one item that you can use as a spellcasting focus, and you store a spell in it, choosing a 1st- or 2nd-level spell from the artificer spell list that requires 1 action to cast (it need not be prepared).",
      },
      {
        type: "paragraph",
        value:
          "While holding the object, a creature can use an action to produce the spell's effect from it, using your spellcasting ability modifier. If the spell requires concentration, the creature must concentrate. The spell stays in the object until it's been used a number of times equal to twice your Intelligence modifier (minimum of twice), or until you use this feature again to store a spell in an object.",
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
    id: "magic-item-savant-14",
    title: "Magic Item Savant",
    level: 14,
    content: [
      {
        type: "paragraph",
        value: "Your skill with magic items deepens:",
      },
      {
        type: "list",
        items: [
          "You can attune up to five magic items at once.",
          "You ignore all class, race, spell, and level requirements on attuning to or using a magic item.",
        ],
      },
    ],
  },
  {
    id: "artificer-specialist-feature-15",
    title: "Artificer Specialist Feature",
    level: 15,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature granted by your Artificer Specialist choice.",
      },
      {
        type: "subclass",
        value: "No Subclasses Available",
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
          "When you reach 16th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature.",
      },
      {
        type: "note",
        value:
          "If your DM allows the use of feats, you may instead take a feat.",
      },
    ],
  },
  {
    id: "magic-item-master-18",
    title: "Magic Item Master",
    level: 18,
    content: [
      {
        type: "paragraph",
        value:
          "Starting at 18th level, you can attune up to six magic items at once.",
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
          "When you reach 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature.",
      },
      {
        type: "note",
        value:
          "If your DM allows the use of feats, you may instead take a feat.",
      },
    ],
  },
  {
    id: "soul-of-artifice-20",
    title: "Soul of Artifice",
    level: 20,
    content: [
      {
        type: "paragraph",
        value:
          "At 20th level, you develop a mystical connection to your magic items, which you can draw on for protection:",
      },
      {
        type: "list",
        items: [
          "You gain a +1 bonus to all saving throws per magic item you are currently attuned to.",
          "If you’re reduced to 0 hit points but not killed outright, you can use your reaction to end one of your artificer infusions, causing you to drop to 1 hit point instead of 0.",
        ],
      },
    ],
  },
];

export default artificerFeatures;
