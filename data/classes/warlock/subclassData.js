const warlockSubclass = [
  {
    key: "archfey",
    name: "Archfey Patron",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Your pact draws on the power of the Feywild. When you choose this subclass, you might make a deal with an archfey, such as the Prince of Frost; the Queen of Air and Darkness, ruler of the Gloaming Court; Titania of the Summer Court; or an ancient hag. Or you might call on a spectrum of Fey, weaving a web of favors and debts. Whoever they are, your patron is often inscrutable and whimsical.`,
      },
      {
        name: "Archfey Spells",
        level: 3,
        description: `The magic of your patron ensures you always have certain spells ready; when you reach a Warlock level specified in the Archfey Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          headers: ["Warlock Level", "Spells"],
          rows: [
            [
              "3rd",
              "Calm Emotions, Faerie Fire, Misty Step, Phantasmal Force, Sleep",
            ],
            ["5th", "Blink, Plant Growth"],
            ["7th", "Dominate Beast, Greater Invisibility"],
            ["9th", "Dominate Person, Seeming"],
          ],
        },
      },
      {
        name: "Steps of the Fey",
        level: 3,
        description: `Your patron grants you the ability to move between the boundaries of the planes. You can cast Misty Step without expending a spell slot a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.
In addition, whenever you cast that spell, you can choose one of the following additional effects.
Refreshing Step. Immediately after you teleport, you or one creature you can see within 10 feet of yourself gains 1d10 Temporary Hit Points.  
Taunting Step. Creatures within 5 feet of the space you left must succeed on a Wisdom saving throw against your spell save DC or have Disadvantage on attack rolls against creatures other than you until the start of your next turn.`,
      },
      {
        name: "Misty Escape",
        level: 6,
        description: `You can cast Misty Step as a Reaction in response to taking damage.
In addition, the following effects are now among your Steps of the Fey options.
Disappearing Step. You have the Invisible condition until the start of your next turn or until immediately after you make an attack roll, deal damage, or cast a spell.  
Dreadful Step. Creatures within 5 feet of the space you left or the space you appear in (your choice) must succeed on a Wisdom saving throw against your spell save DC or take 2d10 Psychic damage.`,
      },
      {
        name: "Beguiling Defenses",
        level: 10,
        description: `Your patron teaches you how to guard your mind and body. You are immune to the Charmed condition.
In addition, immediately after a creature you can see hits you with an attack roll, you can take a Reaction to reduce the damage you take by half (round down), and you can force the attacker to make a Wisdom saving throw against your spell save DC. On a failed save, the attacker takes Psychic damage equal to the damage you take. Once you use this Reaction, you can't use it again until you finish a Long Rest unless you expend a Pact Magic spell slot (no action required) to restore your use of it.`,
      },
      {
        name: "Bewitching Magic",
        level: 14,
        description: `Your patron grants you the ability to weave your magic with teleportation. Immediately after you cast an Enchantment or Illusion spell using an action and a spell slot, you can cast Misty Step as part of the same action and without expending a spell slot.`,
      },
    ],
  },
  {
    key: "celestial",
    name: "Celestial Patron",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Call on the Power of the Heavens
        Your pact draws on the Upper Planes, the realms of everlasting bliss. You might enter an agreement with an empyrean, a couatl, a sphinx, a unicorn, or another heavenly entity. Or you might call on numerous such beings as you pursue goals aligned with theirs. Your pact allows you to experience a hint of the holy light that illuminates the multiverse.`,
      },
      {
        name: "Celestial Spells",
        level: 3,
        description: `The magic of your patron ensures you always have certain spells ready; when you reach a Warlock level specified in the Celestial Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          headers: ["Warlock Level", "Spells"],
          rows: [
            [
              "3rd",
              "Aid, Cure Wounds, Guiding Bolt, Lesser Restoration, Light, Sacred Flame",
            ],
            ["5th", "Daylight, Revivify"],
            ["7th", "Guardian of Faith, Wall of Fire"],
            ["9th", "Greater Restoration, Summon Celestial"],
          ],
        },
      },
      {
        name: "Healing Light",
        level: 3,
        description: `You gain the ability to channel celestial energy to heal wounds. You have a pool of d6s to fuel this healing. The number of dice in the pool equals 1 plus your Warlock level.
As a Bonus Action, you can heal yourself or one creature you can see within 60 feet of yourself, expending dice from the pool. The maximum number of dice you can expend at once equals your Charisma modifier (minimum of one die). Roll the dice you expend, and restore a number of Hit Points equal to the roll's total. Your pool regains all expended dice when you finish a Long Rest.`,
      },
      {
        name: "Radiant Soul",
        level: 6,
        description: `Your link to your patron allows you to serve as a conduit for radiant energy. You have Resistance to Radiant damage. Once per turn, when a spell you cast deals Radiant or Fire damage, you can add your Charisma modifier to that spell's damage against one of the spell's targets.`,
      },
      {
        name: "Celestial Resilience",
        level: 10,
        description: `You gain Temporary Hit Points whenever you use your Magical Cunning feature or finish a Short or Long Rest. These Temporary Hit Points equal your Warlock level plus your Charisma modifier. Additionally, choose up to five creatures you can see when you gain the points. Those creatures each gain Temporary Hit Points equal to half your Warlock level plus your Charisma modifier.`,
      },
      {
        name: "Searing Vengeance",
        level: 14,
        description: `When you or an ally within 60 feet of you is about to make a Death Saving Throw, you can unleash radiant energy to save the creature. The creature regains Hit Points equal to half its Hit Point maximum and can end the Prone condition on itself. Each creature of your choice that is within 30 feet of the creature takes Radiant damage equal to 2d8 plus your Charisma modifier, and each has the Blinded condition until the end of the current turn.
Once you use this feature, you can't use it again until you finish a Long Rest.`,
      },
    ],
  },
  {
    key: "fathomless",
    name: "The Fathomless",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `You have plunged into a pact with the deeps. An entity of the ocean, the Elemental Plane of Water, or another otherworldly sea now allows you to draw on its thalassic power. Is it merely using you to learn about terrestrial realms, or does it want you to open cosmic floodgates and drown the world?
Perhaps you were born into a generational cult that venerates the Fathomless and its spawn. Or you might have been shipwrecked and on the brink of drowning when your patron's grasp offered you a chance at life. Whatever the reason for your pact, the sea and its unknown depths call to you.
Entities of the deep that might empower a warlock include krakens, ancient water elementals, godlike hallucinations dreamed into being by kuo-toa, merfolk demigods, and sea hag covens.`,
      },
      {
        name: "Expanded Spell List",
        level: 3,
        description: `1st-level Fathomless feature
        The Fathomless lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.`,
        table: {
          headers: ["Spell Level", "Spells"],
          rows: [
            ["1st", "create or destroy water, thunderwave"],
            ["2nd", "gust of wind, silence"],
            ["3rd", "lightning bolt, sleet storm"],
            ["4th", "control water, summon elemental (water only)"],
            ["5th", "Bigby's hand (appears as a tentacle), cone of cold"],
          ],
        },
      },
      {
        name: "Tentacle of the Deeps",
        level: 3,
        description: `1st-level Fathomless feature
        You can magically summon a spectral tentacle that strikes at your foes. As a Bonus Action, you create a 10-foot-long tentacle at a point you can see within 60 feet of you. The tentacle lasts for 1 minute or until you use this feature to create another tentacle.
When you create the tentacle, you can make a melee spell attack against one creature within 10 feet of it. On a hit, the target takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn. When you reach 10th level in this class, the damage increases to 2d8.
As a Bonus Action on your turn, you can move the tentacle up to 30 feet and repeat the attack.
You can summon the tentacle a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a Long Rest.`,
      },
      {
        name: "Gift of the Sea",
        level: 3,
        description: `1st-level Fathomless feature
        You gain a swimming speed of 40 feet, and you can breathe underwater.`,
      },
      {
        name: "Oceanic Soul",
        level: 6,
        description: `6th-level Fathomless feature
        You are now even more at home in the depths. You gain resistance to cold damage. In addition, when you are fully submerged, any creature that is also fully submerged can understand your speech, and you can understand theirs.`,
      },
      {
        name: "Guardian Coil",
        level: 6,
        description: `6th-level Fathomless feature
        Your Tentacle of the Deeps can defend you and others, interposing itself between them and harm. When you or a creature you can see takes damage while within 10 feet of the tentacle, you can use your Reaction to choose one of those creatures and reduce the damage to that creature by 1d8. When you reach 10th level in this class, the damage reduced by the tentacle increases to 2d8.`,
      },
      {
        name: "Grasping Tentacles",
        level: 10,
        description: `10th-level Fathomless feature
        You learn the spell Evard's Black Tentacles. It counts as a warlock spell for you, but it doesn't count against the number of spells you know. You can also cast it once without a spell slot, and you regain the ability to do so when you finish a Long Rest.
Whenever you cast this spell, your patron's magic bolsters you, granting you a number of Temporary Hit Points equal to your warlock level. Moreover, damage can't break your concentration on this spell.`,
      },
      {
        name: "Fathomless Plunge",
        level: 14,
        description: `14th-level Fathomless feature
        You can magically open temporary conduits to watery destinations. As an Action, you can teleport yourself and up to five other willing creatures that you can see within 30 feet of you. Amid a whirl of tentacles, you all vanish and then reappear up to 1 mile away in a body of water you've seen (pond size or larger) or within 30 feet of it, each of you appearing in an unoccupied space within 30 feet of the others.
Once you use this feature, you can't use it again until you finish a Short or Long Rest.`,
      },
    ],
  },
  {
    key: "fiend",
    name: "Fiend Patron",
    source: "PHB'24",
    features: [],
  },
  {
    key: "genie",
    name: "The Genie",
    source: "TCE",
    features: [],
  },
  {
    key: "great-old-one",
    name: "Great Old One Patron",
    source: "PHB'24",
    features: [],
  },
  {
    key: "hexblade",
    name: "The Hexblade",
    source: "XGE",
    features: [],
  },
  {
    key: "undead",
    name: "The Undead",
    source: "VRGR",
    features: [],
  },
  {
    key: "undying",
    name: "The Undying",
    source: "SCAG",
    features: [],
  },
];

export default warlockSubclass;
