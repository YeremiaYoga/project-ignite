const paladinFeatures = [
  {
    id: "lay-on-hands-1",
    title: "Lay on Hands",
    level: 1,
    source: "PHB'24 p109",
    content: [
      {
        type: "paragraph",
        value:
          "Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you finish a Long Rest. With that pool, you can restore a total number of Hit Points equal to five times your Paladin level.",
      },
      {
        type: "paragraph",
        value:
          "As a Bonus Action, you can touch a creature (which could be yourself) and draw power from the pool of healing to restore a number of Hit Points to that creature, up to the maximum amount remaining in the pool.",
      },
      {
        type: "paragraph",
        value:
          "You can also expend 5 Hit Points from the pool of healing power to remove the Poisoned condition from the creature; those points don't also restore Hit Points to the creature.",
      },
    ],
  },
  {
    id: "spellcasting-1",
    title: "Spellcasting",
    level: 1,
    source: "PHB'24 p109",
    content: [
      {
        type: "paragraph",
        value:
          "You have learned to cast spells through prayer and meditation. See chapter 7 for the rules on spellcasting. The information below details how you use those rules with Paladin spells, which appear in the Paladin spell list later in the class's description.",
      },
      {
        type: "heading",
        value: "Spell Slots",
      },
      {
        type: "paragraph",
        value:
          "The Paladin Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest.",
      },
      {
        type: "heading",
        value: "Prepared Spells of Level 1+",
      },
      {
        type: "paragraph",
        value:
          "You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose two level 1 Paladin spells. Heroism and Searing Smite are recommended.",
      },
      {
        type: "paragraph",
        value:
          "The number of spells on your list increases as you gain Paladin levels, as shown in the Prepared Spells column of the Paladin Features table. Whenever that number increases, choose additional Paladin spells until the number of spells on your list matches the number in the Paladin Features table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 5 Paladin, your list of prepared spells can include six Paladin spells of level 1 or 2 in any combination.",
      },
      {
        type: "paragraph",
        value:
          "If another Paladin feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Paladin spells for you.",
      },
      {
        type: "heading",
        value: "Changing Your Prepared Spells",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a Long Rest, you can replace one spell on your list with another Paladin spell for which you have spell slots.",
      },
      {
        type: "heading",
        value: "Spellcasting Ability",
      },
      {
        type: "paragraph",
        value: "Charisma is your spellcasting ability for your Paladin spells.",
      },
      {
        type: "heading",
        value: "Spellcasting Focus",
      },
      {
        type: "paragraph",
        value:
          "You can use a Holy Symbol as a Spellcasting Focus for your Paladin spells.",
      },
    ],
  },
  {
    id: "weapon-mastery-1",
    title: "Weapon Mastery",
    level: 1,
    source: "PHB'24 p110",
    content: [
      {
        type: "paragraph",
        value:
          "Your training with weapons allows you to use the mastery properties of two kinds of weapons of your choice with which you have proficiency, such as Longswords and Javelins.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a Long Rest, you can change the kinds of weapons you chose. For example, you could switch to using the mastery properties of Halberds and Flails.",
      },
    ],
  },
  {
    id: "fighting-style-2",
    title: "Fighting Style",
    level: 2,
    source: "PHB'24 p110",
    content: [
      {
        type: "paragraph",
        value:
          "You gain a Fighting Style feat of your choice. Instead of choosing one of those feats, you can choose the option below.",
      },
      {
        type: "heading",
        value: "Blessed Warrior",
      },
      {
        type: "paragraph",
        value:
          "You learn two Cleric cantrips of your choice. Guidance and Sacred Flame are recommended. The chosen cantrips count as Paladin spells for you, and Charisma is your spellcasting ability for them. Whenever you gain a Paladin level, you can replace one of these cantrips with another Cleric cantrip.",
      },
    ],
  },
  {
    id: "paladins-smite-2",
    title: "Paladin's Smite",
    level: 2,
    source: "PHB'24 p110",
    content: [
      {
        type: "paragraph",
        value:
          "You always have the Divine Smite spell prepared. In addition, you can cast it without expending a spell slot, but you must finish a Long Rest before you can cast it in this way again.",
      },
    ],
  },
  {
    id: "channel-divinity-3",
    title: "Channel Divinity",
    level: 3,
    source: "PHB'24 p110",
    content: [
      {
        type: "paragraph",
        value:
          "You can channel divine energy directly from the Outer Planes, using it to fuel magical effects. You start with one such effect: Divine Sense, which is described below. Other Paladin features give additional Channel Divinity effect options. Each time you use this class's Channel Divinity, you choose which effect from this class to create.",
      },
      {
        type: "paragraph",
        value:
          "You can use this class's Channel Divinity twice. You regain one of its expended uses when you finish a Short Rest, and you regain all expended uses when you finish a Long Rest. You gain an additional use when you reach Paladin level 11.",
      },
      {
        type: "paragraph",
        value:
          "If a Channel Divinity effect requires a saving throw, the DC equals the spell save DC from this class's Spellcasting feature.",
      },
      {
        type: "heading",
        value: "Divine Sense",
      },
      {
        type: "paragraph",
        value:
          "As a Bonus Action, you can open your awareness to detect Celestials, Fiends, and Undead. For the next 10 minutes or until you have the Incapacitated condition, you know the location of any creature of those types within 60 feet of yourself, and you know its creature type. Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the Hallow spell.",
      },
    ],
  },
  {
    id: "paladin-subclass-3",
    title: "Paladin Subclass",
    level: 3,

    content: [
      {
        type: "paragraph",
        value:
          "You gain a Paladin subclass of your choice. A subclass is a specialization that grants you features at certain Paladin levels. For the rest of your career, you gain each of your subclass's features that are of your Paladin level or lower.",
      },
      {
        type: "note",
        value: "Breaking Your Oath",
        content: [
          "A Paladin who has broken a vow typically seeks absolution, spending an all-night vigil as a sign of penitence or undertaking a fast. After a rite of forgiveness, the Paladin starts fresh.",
          "If your Paladin unrepentantly violates their oath, talk to your DM. Your Paladin should probably take a more appropriate subclass or even abandon the class and adopt another one.",
        ],
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Paladin levels 8, 12, and 16.",
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
    id: "faithful-steed-5",
    title: "Faithful Steed",
    level: 5,

    content: [
      {
        type: "paragraph",
        value:
          "You can call on the aid of an otherworldly steed. You always have the Find Steed spell prepared.",
      },
      {
        type: "paragraph",
        value:
          "You can also cast the spell once without expending a spell slot, and you regain the ability to do so when you finish a Long Rest.",
      },
    ],
  },
  {
    id: "aura-of-protection-6",
    title: "Aura of Protection",
    level: 6,

    content: [
      {
        type: "paragraph",
        value:
          "You radiate a protective, unseeable aura in a 10-foot Emanation that originates from you. The aura is inactive while you have the Incapacitated condition.",
      },
      {
        type: "paragraph",
        value:
          "You and your allies in the aura gain a bonus to saving throws equal to your Charisma modifier (minimum bonus of +1).",
      },
      {
        type: "paragraph",
        value:
          "If another Paladin is present, a creature can benefit from only one Aura of Protection at a time; the creature chooses which aura while in them.",
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
        value: "You gain a feature from your Paladin Subclass.",
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
    id: "abjure-foes-9",
    title: "Abjure Foes",
    level: 9,

    content: [
      {
        type: "paragraph",
        value:
          "As a Magic action, you can expend one use of this class's Channel Divinity to overwhelm foes with awe. As you present your Holy Symbol or weapon, you can target a number of creatures equal to your Charisma modifier (minimum of one creature) that you can see within 60 feet of yourself. Each target must succeed on a Wisdom saving throw or have the Frightened condition for 1 minute or until it takes any damage. While Frightened in this way, a target can do only one of the following on its turns: move, take an action, or take a Bonus Action.",
      },
    ],
  },
  {
    id: "aura-of-courage-10",
    title: "Aura of Courage",
    level: 10,

    content: [
      {
        type: "paragraph",
        value:
          "You and your allies have Immunity to the Frightened condition while in your Aura of Protection. If a Frightened ally enters the aura, that condition has no effect on that ally while there.",
      },
    ],
  },
  {
    id: "radiant-strikes-11",
    title: "Radiant Strikes",
    level: 11,

    content: [
      {
        type: "paragraph",
        value:
          "Your strikes now carry supernatural power. When you hit a target with an attack roll using a Melee weapon or an Unarmed Strike, the target takes an extra 1d8 Radiant damage.",
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
    id: "restoring-touch-14",
    title: "Restoring Touch",
    level: 14,

    content: [
      {
        type: "paragraph",
        value:
          "When you use Lay On Hands on a creature, you can also remove one or more of the following conditions from the creature: Blinded, Charmed, Deafened, Frightened, Paralyzed, or Stunned. You must expend 5 Hit Points from the healing pool of Lay On Hands for each of these conditions you remove; those points don't also restore Hit Points to the creature.",
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
        value: "You gain a feature from your Paladin Subclass.",
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
    id: "aura-expansion-18",
    title: "Aura Expansion",
    level: 18,

    content: [
      {
        type: "paragraph",
        value: "Your Aura of Protection is now a 30-foot Emanation.",
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
          "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Truesight is recommended.",
      },
    ],
  },
  {
    id: "subclass-feature-20",
    title: "Subclass Feature",
    level: 20,

    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Paladin Subclass.",
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
];

export default paladinFeatures;
