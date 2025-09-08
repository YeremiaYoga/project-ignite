const warlockFeatures = [
  {
    id: "eldritch-invocations-1",
    title: "Eldritch Invocations",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          'You have unearthed Eldritch Invocations, pieces of forbidden knowledge that imbue you with an abiding magical ability or other lessons. You gain one invocation of your choice, such as Pact of the Tome. Invocations are described in the "Eldritch Invocation Options" section later in this class\'s description.',
      },
      {
        type: "heading",
        value: "Prerequisites",
      },
      {
        type: "paragraph",
        value:
          "If an invocation has a prerequisite, you must meet it to learn that invocation. For example, if an invocation requires you to be a level 5+ Warlock, you can select the invocation once you reach Warlock level 5.",
      },
      {
        type: "heading",
        value: "Replacing and Gaining Invocations",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Warlock level, you can replace one of your invocations with another one for which you qualify. You can't replace an invocation if it's a prerequisite for another invocation that you have.",
      },
      {
        type: "paragraph",
        value:
          "When you gain certain Warlock levels, you gain more invocations of your choice, as shown in the Invocations column of the Warlock Features table.",
      },
      {
        type: "paragraph",
        value:
          "You can't pick the same invocation more than once unless its description says otherwise.",
      },
    ],
  },
  {
    id: "pact-magic-1",
    title: "Pact Magic",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "Through occult ceremony, you have formed a pact with a mysterious entity to gain magical powers. The entity is a voice in the shadows—its identity unclear—but its boon to you is concrete: the ability to cast spells. See chapter 7 for the rules on spellcasting. The information below details how you use those rules with Warlock spells, which appear in the Warlock spell list later in the class's description.",
      },
      {
        type: "heading",
        value: "Cantrips",
      },
      {
        type: "paragraph",
        value:
          "You know two Warlock cantrips of your choice. Eldritch Blast and Prestidigitation are recommended. Whenever you gain a Warlock level, you can replace one of your cantrips from this feature with another Warlock cantrip of your choice.",
      },
      {
        type: "paragraph",
        value:
          "When you reach Warlock levels 4 and 10, you learn another Warlock cantrip of your choice, as shown in the Cantrips column of the Warlock Features table.",
      },
      {
        type: "heading",
        value: "Spell Slots",
      },
      {
        type: "paragraph",
        value:
          "The Warlock Features table shows how many spell slots you have to cast your Warlock spells of levels 1–5. The table also shows the level of those slots, all of which are the same level. You regain all expended Pact Magic spell slots when you finish a Short or Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "For example, when you're a level 5 Warlock, you have two level 3 spell slots. To cast the level 1 spell Witch Bolt, you must spend one of those slots, and you cast it as a level 3 spell.",
      },
      {
        type: "heading",
        value: "Prepared Spells of Level 1+",
      },
      {
        type: "paragraph",
        value:
          "You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose two level 1 Warlock spells. Charm Person and Hex are recommended.",
      },
      {
        type: "paragraph",
        value:
          "The number of spells on your list increases as you gain Warlock levels, as shown in the Prepared Spells column of the Warlock Features table. Whenever that number increases, choose additional Warlock spells until the number of spells on your list matches the number in the table. The chosen spells must be of a level no higher than what's shown in the table's Slot Level column for your level. When you reach level 6, for example, you learn a new Warlock spell, which can be of levels 1–3.",
      },
      {
        type: "paragraph",
        value:
          "If another Warlock feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Warlock spells for you.",
      },
      {
        type: "heading",
        value: "Changing Your Prepared Spells",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Warlock level, you can replace one spell on your list with another Warlock spell of an eligible level.",
      },
      {
        type: "heading",
        value: "Spellcasting Ability",
      },
      {
        type: "paragraph",
        value: "Charisma is the spellcasting ability for your Warlock spells.",
      },
      {
        type: "heading",
        value: "Spellcasting Focus",
      },
      {
        type: "paragraph",
        value:
          "You can use an Arcane Focus as a Spellcasting Focus for your Warlock spells.",
      },
    ],
  },
  {
    id: "eldritch-invocation-options-1",
    title: "Eldritch Invocation Options",
    level: 1,

    content: [
      {
        type: "paragraph",
        value: "Eldritch Invocation options appear in alphabetical order.",
      },
      {
        type: "heading",
        value: "Agonizing Blast",
      },
      {
        type: "paragraph",
        value: "Prerequisites: Level 2+, a Warlock Cantrip That Deals Damage",
      },
      {
        type: "paragraph",
        value:
          "Choose one of your known Warlock cantrips that deals damage. You can add your Charisma modifier to that spell's damage rolls.",
      },
      {
        type: "heading",
        value: "Repeatable",
      },
      {
        type: "paragraph",
        value:
          "You can gain this invocation more than once. Each time you do so, choose a different eligible cantrip.",
      },
      {
        type: "heading",
        value: "Armor of Shadows",
      },
      {
        type: "paragraph",
        value:
          "You can cast Mage Armor on yourself without expending a spell slot.",
      },
      {
        type: "heading",
        value: "Ascendant Step",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 5+",
      },
      {
        type: "paragraph",
        value:
          "You can cast Levitate on yourself without expending a spell slot.",
      },
      {
        type: "heading",
        value: "Devil's Sight",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 2+",
      },
      {
        type: "paragraph",
        value:
          "You can see normally in Dim Light and Darkness—both magical and nonmagical—within 120 feet of yourself.",
      },
      {
        type: "heading",
        value: "Devouring Blade",
      },
      {
        type: "paragraph",
        value: "Prerequisites: Level 12+, Thirsting Blade",
      },
      {
        type: "paragraph",
        value:
          "The Extra Attack of your Thirsting Blade invocation confers two extra attacks rather than one.",
      },
      {
        type: "heading",
        value: "Eldritch Mind",
      },
      {
        type: "paragraph",
        value:
          "You have Advantage on Constitution saving throws that you make to maintain Concentration.",
      },
      {
        type: "heading",
        value: "Eldritch Smite",
      },
      {
        type: "paragraph",
        value: "Prerequisites: Level 5+, Pact of the Blade",
      },
      {
        type: "paragraph",
        value:
          "Once per turn when you hit a creature with your pact weapon, you can expend a Pact Magic spell slot to deal an extra 1d8 Force damage to the target, plus another 1d8 per level of the spell slot, and you can give the target the Prone condition if it is Huge or smaller.",
      },
      {
        type: "heading",
        value: "Eldritch Spear",
      },
      {
        type: "paragraph",
        value: "Prerequisites: Level 2+, a Warlock Cantrip That Deals Damage",
      },
      {
        type: "paragraph",
        value:
          "Choose one of your known Warlock cantrips that deals damage and has a range of 10+ feet. When you cast that spell, its range increases by a number of feet equal to 30 times your Warlock level.",
      },
      {
        type: "heading",
        value: "Repeatable",
      },
      {
        type: "paragraph",
        value:
          "You can gain this invocation more than once. Each time you do so, choose a different eligible cantrip.",
      },
      {
        type: "heading",
        value: "Fiendish Vigor",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 2+",
      },
      {
        type: "paragraph",
        value:
          "You can cast False Life on yourself without expending a spell slot. When you cast the spell with this feature, you don't roll the die for the Temporary Hit Points; you automatically get the highest number on the die.",
      },
      {
        type: "heading",
        value: "Gaze of Two Minds",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 5+",
      },
      {
        type: "paragraph",
        value:
          "You can use a Bonus Action to touch a willing creature and perceive through its senses until the end of your next turn. As long as the creature is on the same plane of existence as you, you can take a Bonus Action on subsequent turns to maintain this connection, extending the duration until the end of your next turn. The connection ends if you don't maintain it in this way.",
      },
      {
        type: "paragraph",
        value:
          "While perceiving through the other creature's senses, you benefit from any special senses possessed by that creature, and you can cast spells as if you were in your space or the other creature's space if the two of you are within 60 feet of each other.",
      },
      {
        type: "heading",
        value: "Gift of the Depths",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 5+",
      },
      {
        type: "paragraph",
        value:
          "You can breathe underwater, and you gain a Swim Speed equal to your Speed.",
      },
      {
        type: "paragraph",
        value:
          "You can also cast Water Breathing once without expending a spell slot. You regain the ability to cast it in this way again when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Gift of the Protectors",
      },
      {
        type: "paragraph",
        value: "Prerequisites: Level 9+, Pact of the Tome",
      },
      {
        type: "paragraph",
        value:
          "A new page appears in your Book of Shadows when you conjure it. With your permission, a creature can take an action to write its name on that page, which can contain a number of names equal to your Charisma modifier (minimum of one name).",
      },
      {
        type: "paragraph",
        value:
          "When any creature whose name is on the page is reduced to 0 Hit Points but not killed outright, the creature magically drops to 1 Hit Point instead. Once this magic is triggered, no creature can benefit from it until you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "As a Magic action, you can erase a name on the page by touching it.",
      },
      {
        type: "heading",
        value: "Investment of the Chain Master",
      },
      {
        type: "paragraph",
        value: "Prerequisites: Level 5+, Pact of the Chain",
      },
      {
        type: "paragraph",
        value:
          "When you cast Find Familiar, you infuse the summoned familiar with a measure of your eldritch power, granting the creature the following benefits.",
      },
      {
        type: "heading",
        value: "Aerial or Aquatic",
      },
      {
        type: "paragraph",
        value:
          "The familiar gains either a Fly Speed or a Swim Speed (your choice) of 40 feet.",
      },
      {
        type: "heading",
        value: "Quick Attack",
      },
      {
        type: "paragraph",
        value:
          "As a Bonus Action, you can command the familiar to take the Attack action.",
      },
      {
        type: "heading",
        value: "Necrotic or Radiant Damage",
      },
      {
        type: "paragraph",
        value:
          "Whenever the familiar deals Bludgeoning, Piercing, or Slashing damage, you can make it deal Necrotic or Radiant damage instead.",
      },
      {
        type: "heading",
        value: "Your Save DC",
      },
      {
        type: "paragraph",
        value:
          "If the familiar forces a creature to make a saving throw, it uses your spell save DC.",
      },
      {
        type: "heading",
        value: "Resistance",
      },
      {
        type: "paragraph",
        value:
          "When the familiar takes damage, you can take a Reaction to grant it Resistance against that damage.",
      },
      {
        type: "heading",
        value: "Lessons of the First Ones",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 2+",
      },
      {
        type: "paragraph",
        value:
          "You have received knowledge from an elder entity of the multiverse, allowing you to gain one Origin feat of your choice.",
      },
      {
        type: "heading",
        value: "Repeatable",
      },
      {
        type: "paragraph",
        value:
          "You can gain this invocation more than once. Each time you do so, choose a different Origin feat.",
      },
      {
        type: "heading",
        value: "Lifedrinker",
      },
      {
        type: "paragraph",
        value: "Prerequisites: Level 9+, Pact of the Blade",
      },
      {
        type: "paragraph",
        value:
          "Once per turn when you hit a creature with your pact weapon, you can deal an extra 1d6 Necrotic, Psychic, or Radiant damage (your choice) to the creature, and you can expend one of your Hit Point Dice to roll it and regain a number of Hit Points equal to the roll plus your Constitution modifier (minimum of 1 Hit Point).",
      },
      {
        type: "heading",
        value: "Mask of Many Faces",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 2+",
      },
      {
        type: "paragraph",
        value: "You can cast Disguise Self without expending a spell slot.",
      },
      {
        type: "heading",
        value: "Master of Myriad Forms",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 5+",
      },
      {
        type: "paragraph",
        value: "You can cast Alter Self without expending a spell slot.",
      },
      {
        type: "heading",
        value: "Misty Visions",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 2+",
      },
      {
        type: "paragraph",
        value: "You can cast Silent Image without expending a spell slot.",
      },
      {
        type: "heading",
        value: "One with Shadows",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 5+",
      },
      {
        type: "paragraph",
        value:
          "While you're in an area of Dim Light or Darkness, you can cast Invisibility on yourself without expending a spell slot.",
      },
      {
        type: "heading",
        value: "Otherworldly Leap",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 2+",
      },
      {
        type: "paragraph",
        value: "You can cast Jump on yourself without expending a spell slot.",
      },
      {
        type: "heading",
        value: "Pact of the Blade",
      },
      {
        type: "paragraph",
        value:
          "As a Bonus Action, you can conjure a pact weapon in your hand—a Simple or Martial Melee weapon of your choice with which you bond—or create a bond with a magic weapon you touch; you can't bond with a magic weapon if someone else is attuned to it or another Warlock is bonded with it. Until the bond ends, you have proficiency with the weapon, and you can use it as a Spellcasting Focus.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you attack with the bonded weapon, you can use your Charisma modifier for the attack and damage rolls instead of using Strength or Dexterity; and you can cause the weapon to deal Necrotic, Psychic, or Radiant damage or its normal damage type.",
      },
      {
        type: "paragraph",
        value:
          "Your bond with the weapon ends if you use this feature's Bonus Action again, if the weapon is more than 5 feet away from you for 1 minute or more, or if you die. A conjured weapon disappears when the bond ends.",
      },
      {
        type: "heading",
        value: "Pact of the Chain",
      },
      {
        type: "paragraph",
        value:
          "You learn the Find Familiar spell and can cast it as a Magic action without expending a spell slot.",
      },
      {
        type: "paragraph",
        value:
          "When you cast the spell, you choose one of the normal forms for your familiar or one of the following special forms: Imp, Pseudodragon, Quasit, Skeleton, Slaad Tadpole, Sphinx of Wonder, Sprite, or Venomous Snake (see appendix B for the familiar's stat block).",
      },
      {
        type: "paragraph",
        value:
          "Additionally, when you take the Attack action, you can forgo one of your own attacks to allow your familiar to make one attack of its own with its Reaction.",
      },
      {
        type: "heading",
        value: "Pact of the Tome",
      },
      {
        type: "paragraph",
        value:
          "Stitching together strands of shadow, you conjure forth a book in your hand at the end of a Short or Long Rest. This Book of Shadows (you determine its appearance) contains eldritch magic that only you can access, granting you the benefits below. The book disappears if you conjure another book with this feature or if you die.",
      },
      {
        type: "heading",
        value: "Cantrips and Rituals",
      },
      {
        type: "paragraph",
        value:
          "When the book appears, choose three cantrips, and choose two level 1 spells that have the Ritual tag. The spells can be from any class's spell list, and they must be spells you don't already have prepared. While the book is on your person, you have the chosen spells prepared, and they function as Warlock spells for you.",
      },
      {
        type: "heading",
        value: "Spellcasting Focus",
      },
      {
        type: "paragraph",
        value: "You can use the book as a Spellcasting Focus.",
      },
      {
        type: "heading",
        value: "Repelling Blast",
      },
      {
        type: "paragraph",
        value:
          "Prerequisites: Level 2+, a Warlock Cantrip That Deals Damage via an Attack Roll",
      },
      {
        type: "paragraph",
        value:
          "Choose one of your known Warlock cantrips that requires an attack roll. When you hit a Large or smaller creature with that cantrip, you can push the creature up to 10 feet straight away from you.",
      },
      {
        type: "heading",
        value: "Repeatable",
      },
      {
        type: "paragraph",
        value:
          "You can gain this invocation more than once. Each time you do so, choose a different eligible cantrip.",
      },
      {
        type: "heading",
        value: "Thirsting Blade",
      },
      {
        type: "paragraph",
        value: "Prerequisites: Level 5+, Pact of the Blade",
      },
      {
        type: "paragraph",
        value:
          "You gain the Extra Attack feature for your pact weapon only. With that feature, you can attack twice with the weapon instead of once when you take the Attack action on your turn.",
      },
      {
        type: "heading",
        value: "Visions of Distant Realms",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 9+",
      },
      {
        type: "paragraph",
        value: "You can cast Arcane Eye without expending a spell slot.",
      },
      {
        type: "heading",
        value: "Whispers of the Grave",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 7+",
      },
      {
        type: "paragraph",
        value: "You can cast Speak with Dead without expending a spell slot.",
      },
      {
        type: "heading",
        value: "Witch Sight",
      },
      {
        type: "paragraph",
        value: "Prerequisite: Level 15+",
      },
      {
        type: "paragraph",
        value: "You have Truesight with a range of 30 feet.",
      },
    ],
  },
  {
    id: "magical-cunning-2",
    title: "Magical Cunning",
    level: 2,

    content: [
      {
        type: "paragraph",
        value:
          "You can perform an esoteric rite for 1 minute. At the end of it, you regain expended Pact Magic spell slots but no more than a number equal to half your maximum (round up). Once you use this feature, you can't do so again until you finish a Long Rest.",
      },
    ],
  },
  {
    id: "warlock-subclass-3",
    title: "Warlock Subclass",
    level: 3,

    content: [
      {
        type: "paragraph",
        value:
          "You gain a Warlock subclass of your choice. A subclass is a specialization that grants you features at certain Warlock levels. For the rest of your career, you gain each of your subclass's features that are of your Warlock level or lower.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Warlock levels 8, 12, and 16.",
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
        value: "You gain a feature from your Warlock subclass.",
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
    id: "contact-patron-9",
    title: "Contact Patron",
    level: 9,

    content: [
      {
        type: "paragraph",
        value:
          "In the past, you usually contacted your patron through intermediaries. Now you can communicate directly; you always have the Contact Other Plane spell prepared. With this feature, you can cast the spell without expending a spell slot to contact your patron, and you automatically succeed on the spell's saving throw.",
      },
      {
        type: "paragraph",
        value:
          "Once you cast the spell with this feature, you can't do so in this way again until you finish a Long Rest.",
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
        value: "You gain a feature from your Warlock subclass.",
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
    id: "mystic-arcanum-11",
    title: "Mystic Arcanum",
    level: 11,

    content: [
      {
        type: "paragraph",
        value:
          "Your patron grants you a magical secret called an arcanum. Choose one level 6 Warlock spell as this arcanum.",
      },
      {
        type: "paragraph",
        value:
          "You can cast your arcanum spell once without expending a spell slot, and you must finish a Long Rest before you can cast it in this way again.",
      },
      {
        type: "paragraph",
        value:
          "As shown in the Warlock Features table, you gain another Warlock spell of your choice that can be cast in this way when you reach Warlock levels 13 (level 7 spell), 15 (level 8 spell), and 17 (level 9 spell). You regain all uses of your Mystic Arcanum when you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Warlock level, you can replace one of your arcanum spells with another Warlock spell of the same level.",
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
    id: "mystic-arcanum-13",
    title: "Mystic Arcanum",
    level: 13,

    content: [
      {
        type: "paragraph",
        value: "You gain a level 7 Warlock Spell of your choice.",
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
        value: "You gain a feature from your Warlock subclass.",
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
    id: "mystic-arcanum-15",
    title: "Mystic Arcanum",
    level: 15,

    content: [
      {
        type: "paragraph",
        value: "You gain a level 8 Warlock Spell of your choice.",
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
    id: "mystic-arcanum-17",
    title: "Mystic Arcanum",
    level: 17,

    content: [
      {
        type: "paragraph",
        value: "You gain a level 9 Warlock Spell of your choice.",
      },
    ],
  },
  {
    id: "subclass-feature-18",
    title: "Subclass Feature",
    level: 18,

    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Warlock subclass.",
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
    id: "eldritch-master-20",
    title: "Eldritch Master",
    level: 20,

    content: [
      {
        type: "paragraph",
        value:
          "When you use your Magical Cunning feature, you regain all your expended Pact Magic spell slots.",
      },
    ],
  },
];

export default warlockFeatures;
