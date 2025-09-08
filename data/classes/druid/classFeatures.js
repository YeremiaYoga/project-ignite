const druidFeatures = [
  {
    id: "druidic-1",
    title: "Druidic",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "You know Druidic, the secret language of Druids. While learning this ancient tongue, you also unlocked the magic of communicating with animals; you always have the Speak with Animals spell prepared.",
      },
      {
        type: "paragraph",
        value:
          "You can use Druidic to leave hidden messages. You and others who know Druidic automatically spot such a message. Others spot the message’s presence with a successful DC 15 Intelligence (Investigation) check but can’t decipher it without magic.",
      },
    ],
  },
  {
    id: "primal-order-1",
    title: "Primal Order",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "You have dedicated yourself to one of the following sacred roles of your choice.",
      },
      {
        type: "heading",
        value: "Magician",
      },
      {
        type: "paragraph",
        value:
          "You know one extra cantrip from the Druid spell list. In addition, your mystical connection to nature gives you a bonus to your Intelligence (Arcana or Nature) checks. The bonus equals your Wisdom modifier (minimum of +1).",
      },
      {
        type: "heading",
        value: "Warden",
      },
      {
        type: "paragraph",
        value:
          "Trained for battle, you gain proficiency with Martial weapons and training with Medium armor.",
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
          "You have learned to cast spells through studying the mystical forces of nature. See chapter 7 for the rules on spellcasting. The information below details how you use those rules with Druid spells, which appear on the Druid spell list later in the class’s description.",
      },
      {
        type: "heading",
        value: "Cantrips",
      },
      {
        type: "paragraph",
        value:
          "You know two cantrips of your choice from the Druid spell list. Druidcraft and Produce Flame are recommended. Whenever you gain a Druid level, you can replace one of your cantrips with another cantrip of your choice from the Druid spell list. When you reach Druid levels 4 and 10, you learn another cantrip of your choice from the Druid spell list, as shown in the Cantrips column of the Druid Features table.",
      },
      {
        type: "heading",
        value: "Spell Slots",
      },
      {
        type: "paragraph",
        value:
          "The Druid Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Prepared Spells of Level 1+",
      },
      {
        type: "paragraph",
        value:
          "You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose four level 1 spells from the Druid spell list. Animal Friendship, Cure Wounds, Faerie Fire, and Thunderwave are recommended. The number of spells on your list increases as you gain Druid levels, as shown in the Prepared Spells column of the Druid Features table. Whenever that number increases, choose additional spells from the Druid spell list until the number of spells on your list matches the number on the table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 3 Druid, your list of prepared spells can include six spells of levels 1 and 2 in any combination.",
      },
      {
        type: "paragraph",
        value:
          "If another Druid feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Druid spells for you.",
      },
      {
        type: "heading",
        value: "Changing Your Prepared Spells",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a Long Rest, you can change your list of prepared spells, replacing any of the spells with other Druid spells for which you have spell slots.",
      },
      {
        type: "heading",
        value: "Spellcasting Ability",
      },
      {
        type: "paragraph",
        value: "Wisdom is your spellcasting ability for your Druid spells.",
      },
      {
        type: "heading",
        value: "Spellcasting Focus",
      },
      {
        type: "paragraph",
        value:
          "You can use a Druidic Focus as a Spellcasting Focus for your Druid spells.",
      },
    ],
  },
  {
    id: "wild-companion-2",
    title: "Wild Companion",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "You can summon a nature spirit that assumes an animal form to aid you. As a Magic action, you can expend a spell slot or a use of Wild Shape to cast the Find Familiar spell without Material components. When you cast the spell in this way, the familiar is Fey and disappears when you finish a Long Rest.",
      },
    ],
  },
  {
    id: "wild-shape-2",
    title: "Wild Shape",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "The power of nature allows you to assume the form of an animal. As a Bonus action, you shape-shift into a Beast form that you have learned from the nature (see “Known Forms” below). You stay in that form for a number of hours equal to half your Druid level or until you use Wild Shape again, you fall Unconscious, you drop to 0 hit points, you die, or you leave the form early as a Bonus action.",
      },
      {
        type: "paragraph",
        value:
          "Number of Uses. You can use Wild Shape twice. You regain one expended use when you finish a Short Rest, and you regain all expended uses when you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "You gain additional uses when you reach certain Druid levels, as shown in the Wild Shape column of the Druid Features table.",
      },
      {
        type: "heading",
        value: "Known Forms",
      },
      {
        type: "paragraph",
        value:
          "You know your Beast forms for this feature. Chosen kinds of known Beast stat blocks that the D&D Beyond Character Builder provides and that a DM has approved for this feature are: Cat, Dire Wolf, Eagle, Giant Badger, Giant Frog, Giant Spider, and Wolf are recommended. Whenever you finish a Long Rest, you can replace one of your known forms with another eligible form.",
      },
      {
        type: "paragraph",
        value:
          "When you reach certain Druid levels, your number of known forms and the maximum Challenge Rating for those forms increases, as shown in the Known Forms column of the Druid Features table. A level 13 Druid can turn into a Giant Spider.",
      },
      {
        type: "paragraph",
        value:
          "When choosing known forms, you may look in the Monster Manual or elsewhere for eligible Beasts if the Dungeon Master permits you to do so. Beast Shapes is a table with Druid Level, Known Forms, Max CR, Fly Speed, and Swim Speed.",
      },
      {
        type: "table",
        headers: [
          "Druid Level",
          "Known Forms",
          "Max CR",
          "Fly Speed",
       
        ],
        rows: [
          ["2", "4", "1/4", "No" ],
          ["4", "6", "1/2", "No"],
          ["8", "8", "1", "Yes"],
        ],
      },
      {
        type: "heading",
        value: "Rules While Transformed",
      },
      {
        type: "paragraph",
        value:
          "While in a form, you retain your personality, memories, and ability to speak, and the following rules apply: Temporary Hit Points. When you assume a Wild Shape form, you gain a number of Temporary Hit Points equal to your Druid level. Game Statistics. Your game statistics are replaced by the chosen form’s bloc, but you retain your alignment, hit points, Hit Dice, Intelligence, Wisdom, and Charisma scores, class features, languages, and feats. You also retain your skill and saving throw proficiencies and use your Proficiency Bonus for them, in addition to gaining the proficiencies of the creature. If a skill or saving throw modifier in the Beast’s stat block is higher than yours, use the one in the stat block. No Spellcasting. You can’t cast spells, but shape-shifting doesn’t break your Concentration or otherwise interfere with a spell you’ve already cast. Objects. Your ability to handle objects is determined by the form’s limbs rather than your own. In addition, you choose whether your equipment falls in your space, merges into your new form, or is worn by it. Worn equipment functions as normal, but the DM decides whether it’s practical for the new form to wear a piece of equipment based on the creature’s size and shape. Your equipment doesn’t change size or shape to match the new form, and any equipment that the new form can’t wear must either fall to the ground or merge with the form. Equipment that merges with the form has no effect while you’re in that form.",
      },
    ],
  },
  {
    id: "druid-subclass-3",
    title: "Druid Subclass",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "You gain a Druid subclass of your choice. A subclass is a specialization that grants you features at certain Druid levels. For the rest of your career, you gain each of your subclass’s features that are of your Druid level or lower.",
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
    id: "wild-resurgence-5",
    title: "Wild Resurgence",
    level: 5,
    content: [
      {
        type: "paragraph",
        value:
          "Once on each of your turns, if you have no uses of Wild Shape left, you can give yourself one use by expending a spell slot (no action required). In addition, you can expend one use of Wild Shape (no action required) to give yourself a level 1 spell slot, but you can’t do so again until you finish a Long Rest.",
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
        value: "You gain a feature from your Druid Subclass.",
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
    id: "elemental-fury-7",
    title: "Elemental Fury",
    level: 7,
    content: [
      {
        type: "paragraph",
        value:
          "The magic of the elements flows through you. You gain one of the following options of your choice.",
      },
      {
        type: "heading",
        value: "Potent Spellcasting",
      },
      {
        type: "paragraph",
        value:
          "Add your Wisdom modifier to the damage you deal with any Druid cantrip.",
      },
      {
        type: "heading",
        value: "Primal Strike",
      },
      {
        type: "paragraph",
        value:
          "Once on each of your turns when you hit a creature with an attack roll using a weapon or a Beast form’s attack in Wild Shape, you can cause the target to take an extra 1d8 Cold, Fire, Lightning, or Thunder damage (choose when you hit).",
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
    id: "subclass-feature-10",
    title: "Subclass Feature",
    level: 10,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Druid Subclass.",
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
    id: "subclass-feature-14",
    title: "Subclass Feature",
    level: 14,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Druid Subclass.",
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
    id: "improved-elemental-fury-15",
    title: "Improved Elemental Fury",
    level: 15,
    content: [
      {
        type: "paragraph",
        value:
          "The option you chose for Elemental Fury grows more powerful, as detailed below.",
      },
      {
        type: "heading",
        value: "Potent Spellcasting",
      },
      {
        type: "paragraph",
        value:
          "When you cast a Druid cantrip with a range of 10 feet or greater, the spell's range increases by 300 feet.",
      },
      {
        type: "heading",
        value: "Primal Strike",
      },
      {
        type: "paragraph",
        value: "The extra damage of your Primal Strike increases to 2d8.",
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
    id: "beast-spells-18",
    title: "Beast Spells",
    level: 18,
    content: [
      {
        type: "paragraph",
        value:
          "While using Wild Shape, you can cast spells in Beast form, except for any spell that has a Material component with a cost specified or that consumes its Material component.",
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
    id: "archdruid-20",
    title: "Archdruid",
    level: 20,
    content: [
      {
        type: "paragraph",
        value:
          "The vitality of nature constantly blooms within you, granting you the following benefits.",
      },
      {
        type: "heading",
        value: "Evergreen Wild Shape",
      },
      {
        type: "paragraph",
        value:
          "Whenever you roll Initiative and have no uses of Wild Shape left, you regain one expended use of it.",
      },
      {
        type: "heading",
        value: "Nature Magician",
      },
      {
        type: "paragraph",
        value:
          "You can convert uses of Wild Shape into a spell slot (no action required). Choose a number of your unexpended uses of Wild Shape and convert them into a single spell slot, with each use contributing 2 spell levels. For example, if you convert two uses of Wild Shape, you produce a level 4 spell slot. Once you use this benefit, you can’t do so again until you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Longevity",
      },
      {
        type: "paragraph",
        value:
          "The primal magic that you wield causes you to age more slowly. For every ten years that pass, your body ages only one year.",
      },
    ],
  },
];

export default druidFeatures;
