const sorcererFeatures = [
  {
    id: "spellcasting-1",
    title: "Spellcasting",
    level: 1,
    
    content: [
      {
        type: "paragraph",
        value:
          "Drawing from your innate magic, you can cast spells. See chapter 7 for the rules on spellcasting. The information below details how you use those rules with Sorcerer spells, which appear in the Sorcerer spell list later in the class's description.",
      },
      {
        type: "heading",
        value: "Cantrips",
      },
      {
        type: "paragraph",
        value:
          "You know four Sorcerer cantrips of your choice. Light, Prestidigitation, Shocking Grasp, and Sorcerous Burst are recommended. Whenever you gain a Sorcerer level, you can replace one of your cantrips from this feature with another Sorcerer cantrip of your choice.",
      },
      {
        type: "paragraph",
        value:
          "When you reach Sorcerer levels 4 and 10, you learn another Sorcerer cantrip of your choice, as shown in the Cantrips column of the Sorcerer Features table.",
      },
      {
        type: "heading",
        value: "Spell Slots",
      },
      {
        type: "paragraph",
        value:
          "The Sorcerer Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Prepared Spells of Level 1+",
      },
      {
        type: "paragraph",
        value:
          "You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose two level 1 Sorcerer spells. Burning Hands and Detect Magic are recommended.",
      },
      {
        type: "paragraph",
        value:
          "The number of spells on your list increases as you gain Sorcerer levels, as shown in the Prepared Spells column of the Sorcerer Features table. Whenever that number increases, choose additional Sorcerer spells until the number of spells on your list matches the number in the Sorcerer Features table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 3 Sorcerer, your list of prepared spells can include six Sorcerer spells of level 1 or 2 in any combination.",
      },
      {
        type: "paragraph",
        value:
          "If another Sorcerer feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Sorcerer spells for you.",
      },
      {
        type: "heading",
        value: "Changing Your Prepared Spells",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Sorcerer level, you can replace one spell on your list with another Sorcerer spell for which you have spell slots.",
      },
      {
        type: "heading",
        value: "Spellcasting Ability",
      },
      {
        type: "paragraph",
        value:
          "Charisma is your spellcasting ability for your Sorcerer spells.",
      },
      {
        type: "heading",
        value: "Spellcasting Focus",
      },
      {
        type: "paragraph",
        value:
          "You can use an Arcane Focus as a Spellcasting Focus for your Sorcerer spells.",
      },
    ],
  },
  {
    id: "innate-sorcery-1",
    title: "Innate Sorcery",
    level: 1,
    
    content: [
      {
        type: "paragraph",
        value:
          "An event in your past left an indelible mark on you, infusing you with simmering magic. As a Bonus Action, you can unleash that magic for 1 minute, during which you gain the following benefits:",
      },
      {
        type: "list",
        items: [
          "The spell save DC of your Sorcerer spells increases by 1.",
          "You have Advantage on the attack rolls of Sorcerer spells you cast.",
        ],
      },
      {
        type: "paragraph",
        value:
          "You can use this feature twice, and you regain all expended uses of it when you finish a Long Rest.",
      },
    ],
  },
  {
    id: "font-of-magic-2",
    title: "Font of Magic",
    level: 2,
    
    content: [
      {
        type: "paragraph",
        value:
          "You can tap into the wellspring of magic within yourself. This wellspring is represented by Sorcery Points, which allow you to create a variety of magical effects.",
      },
      {
        type: "paragraph",
        value:
          "You have 2 Sorcery Points, and you gain more as you reach higher levels, as shown in the Sorcery Points column of the Sorcerer Features table. You can't have more Sorcery Points than the number shown in the table for your level. You regain all expended Sorcery Points when you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "You can use your Sorcery Points to fuel the options below, along with other features, such as Metamagic, that use those points.",
      },
      {
        type: "heading",
        value: "Converting Spell Slots to Sorcery Points",
      },
      {
        type: "paragraph",
        value:
          "You can expend a spell slot to gain a number of Sorcery Points equal to the slot's level (no action required).",
      },
      {
        type: "heading",
        value: "Creating Spell Slots",
      },
      {
        type: "paragraph",
        value:
          "As a Bonus Action, you can transform unexpended Sorcery Points into one spell slot. The Creating Spell Slots table shows the cost of creating a spell slot of a given level, and it lists the minimum Sorcerer level you must be to create a slot. You can create a spell slot no higher than level 5.",
      },
      {
        type: "paragraph",
        value:
          "Any spell slot you create with this feature vanishes when you finish a Long Rest.",
      },
      {
        type: "table",
        caption: "Creating Spell Slots",
        headers: [
          "Spell Slot Level",
          "Sorcery Point Cost",
          "Min. Sorcerer Level",
        ],
        rows: [
          ["1", "2", "2"],
          ["2", "3", "3"],
          ["3", "5", "5"],
          ["4", "6", "7"],
          ["5", "7", "9"],
        ],
      },
    ],
  },
  {
    id: "metamagic-2",
    title: "Metamagic",
    level: 2,
    
    content: [
      {
        type: "paragraph",
        value:
          'Because your magic flows from within, you can alter your spells to suit your needs; you gain two Metamagic options of your choice from "Metamagic Options" later in this class\'s description. You use the chosen options to temporarily modify spells you cast. To use an option, you must spend the number of Sorcery Points that it costs.',
      },
      {
        type: "paragraph",
        value:
          "You can use only one Metamagic option on a spell when you cast it unless otherwise noted in one of those options.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Sorcerer level, you can replace one of your Metamagic options with one you don't know. You gain two more options at Sorcerer level 10 and two more at Sorcerer level 17.",
      },
    ],
  },
  {
    id: "metamagic-options-2",
    title: "Metamagic Options",
    level: 2,
    
    content: [
      {
        type: "paragraph",
        value:
          "The following options are available to your Metamagic feature. The options are presented in alphabetical order.",
      },
      {
        type: "heading",
        value: "Careful Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 1 Sorcery Point",
      },
      {
        type: "paragraph",
        value:
          "When you cast a spell that forces other creatures to make a saving throw, you can protect some of those creatures from the spell's full force. To do so, spend 1 Sorcery Point and choose a number of those creatures up to your Charisma modifier (minimum of one creature). A chosen creature automatically succeeds on its saving throw against the spell, and it takes no damage if it would normally take half damage on a successful save.",
      },
      {
        type: "heading",
        value: "Distant Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 1 Sorcery Point",
      },
      {
        type: "paragraph",
        value:
          "When you cast a spell that has a range of at least 5 feet, you can spend 1 Sorcery Point to double the spell's range. Or when you cast a spell that has a range of Touch, you can spend 1 Sorcery Point to make the spell's range 30 feet.",
      },
      {
        type: "heading",
        value: "Empowered Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 1 Sorcery Point",
      },
      {
        type: "paragraph",
        value:
          "When you roll damage for a spell, you can spend 1 Sorcery Point to reroll a number of the damage dice up to your Charisma modifier (minimum of one), and you must use the new rolls.",
      },
      {
        type: "paragraph",
        value:
          "You can use Empowered Spell even if you've already used a different Metamagic option during the casting of the spell.",
      },
      {
        type: "heading",
        value: "Extended Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 1 Sorcery Point",
      },
      {
        type: "paragraph",
        value:
          "When you cast a spell that has a duration of 1 minute or longer, you can spend 1 Sorcery Point to double its duration to a maximum duration of 24 hours.",
      },
      {
        type: "paragraph",
        value:
          "If the affected spell requires Concentration, you have Advantage on any saving throw you make to maintain that Concentration.",
      },
      {
        type: "heading",
        value: "Heightened Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 2 Sorcery Points",
      },
      {
        type: "paragraph",
        value:
          "When you cast a spell that forces a creature to make a saving throw, you can spend 2 Sorcery Points to give one target of the spell Disadvantage on saves against the spell.",
      },
      {
        type: "heading",
        value: "Quickened Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 2 Sorcery Points",
      },
      {
        type: "paragraph",
        value:
          "When you cast a spell that has a casting time of an action, you can spend 2 Sorcery Points to change the casting time to a Bonus Action for this casting. You can't modify a spell in this way if you've already cast a level 1+ spell on the current turn, nor can you cast a level 1+ spell on this turn after modifying a spell in this way.",
      },
      {
        type: "heading",
        value: "Seeking Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 1 Sorcery Point",
      },
      {
        type: "paragraph",
        value:
          "If you make an attack roll for a spell and miss, you can spend 1 Sorcery Point to reroll the d20, and you must use the new roll.",
      },
      {
        type: "paragraph",
        value:
          "You can use Seeking Spell even if you've already used a different Metamagic option during the casting of the spell.",
      },
      {
        type: "heading",
        value: "Subtle Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 1 Sorcery Point",
      },
      {
        type: "paragraph",
        value:
          "When you cast a spell, you can spend 1 Sorcery Point to cast it without any Verbal, Somatic, or Material components, except Material components that are consumed by the spell or that have a cost specified in the spell.",
      },
      {
        type: "heading",
        value: "Transmuted Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 1 Sorcery Point",
      },
      {
        type: "paragraph",
        value:
          "When you cast a spell that deals a type of damage from the following list, you can spend 1 Sorcery Point to change that damage type to one of the other listed types: Acid, Cold, Fire, Lightning, Poison, Thunder.",
      },
      {
        type: "heading",
        value: "Twinned Spell",
      },
      {
        type: "paragraph",
        value: "Cost: 1 Sorcery Point",
      },
      {
        type: "paragraph",
        value:
          "When you cast a spell, such as Charm Person, that can be cast with a higher-level spell slot to target an additional creature, you can spend 1 Sorcery Point to increase the spell's effective level by 1.",
      },
    ],
  },
  {
    id: "sorcerer-subclass-3",
    title: "Sorcerer Subclass",
    level: 3,
    
    content: [
      {
        type: "paragraph",
        value:
          "You gain a Sorcerer subclass of your choice. A subclass is a specialization that grants you features at certain Sorcerer levels. For the rest of your career, you gain each of your subclass's features that are of your Sorcerer level or lower.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Sorcerer levels 8, 12, and 16.",
      },
    ],
  },
  {
    id: "sorcerous-restoration-5",
    title: "Sorcerous Restoration",
    level: 5,
    
    content: [
      {
        type: "paragraph",
        value:
          "When you finish a Short Rest, you can regain expended Sorcery Points, but no more than a number equal to half your Sorcerer level (round down). Once you use this feature, you can't do so again until you finish a Long Rest.",
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
        value: "You gain a feature from your Sorcerer subclass.",
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
    id: "sorcery-incarnate-7",
    title: "Sorcery Incarnate",
    level: 7,
    
    content: [
      {
        type: "paragraph",
        value:
          "If you have no uses of Innate Sorcery left, you can use it if you spend 2 Sorcery Points when you take the Bonus Action to activate it.",
      },
      {
        type: "paragraph",
        value:
          "In addition, while your Innate Sorcery feature is active, you can use up to two of your Metamagic options on each spell you cast.",
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
    id: "metamagic-10",
    title: "Metamagic",
    level: 10,
    
    content: [
      {
        type: "paragraph",
        value:
          'Because your magic flows from within you, you can alter your spells to suit your needs; you gain two Metamagic options of your choice from the "Metamagic Options" section later in this class\'s description.',
      },
      {
        type: "paragraph",
        value:
          "You can use only one Metamagic option on a spell when you cast it, unless otherwise noted in one of those options.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Sorcerer level, you can replace one of your Metamagic options with one you don't know.",
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
        value: "You gain a feature from your Sorcerer subclass.",
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
    id: "metamagic-17",
    title: "Metamagic",
    level: 17,
    
    content: [
      {
        type: "paragraph",
        value:
          'Because your magic flows from within you, you can alter your spells to suit your needs; you gain two Metamagic options of your choice from the "Metamagic Options" section later in this class\'s description.',
      },
      {
        type: "paragraph",
        value:
          "You can use only one Metamagic option on a spell when you cast it, unless otherwise noted in one of those options.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Sorcerer level, you can replace one of your Metamagic options with one you don't know.",
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
        value: "You gain a feature from your Sorcerer subclass.",
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
          "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Dimensional Travel is recommended.",
      },
    ],
  },
  {
    id: "arcane-apotheosis-20",
    title: "Arcane Apotheosis",
    level: 20,
    
    content: [
      {
        type: "paragraph",
        value:
          "While your Innate Sorcery feature is active, you can use one Metamagic option on each of your turns without spending Sorcery Points on it.",
      },
    ],
  },
];

export default sorcererFeatures;
