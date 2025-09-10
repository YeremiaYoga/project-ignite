const druidSubclass = [
  {
    key: "dreams",
    name: "Circle of Dreams",
    source: "XGE",
    features: [
      {
        level: 3,
        title: "",
        description: `Druids who are members of the Circle of Dreams hail from regions that have strong ties to the Feywild and its dreamlike realms. The druids' guardianship of the natural world makes for a natural alliance between them and good-aligned fey. These druids seek to fill the world with dreamy wonder. Their magic mends wounds and brings joy to downcast hearts, and the realms they protect are gleaming, fruitful places, where dream and reality blur together and where the weary can find rest.`,
      },
      {
        level: 3,
        title: "Balm of the Summer Court",
        description: `At 2nd level, you become imbued with the blessings of the Summer Court. You are a font of energy that offers respite from injuries. You have a pool of fey energy represented by a number of d6s equal to your druid level.
As a bonus action, you can choose one creature you can see within 120 feet of you and spend a number of those dice equal to half your druid level or less. Roll the spent dice and add them together. The target regains a number of hit points equal to the total. The target also gains 1 temporary hit point per die spent.
You regain all expended dice when you finish a long rest.`,
      },
      {
        level: 6,
        title: "Hearth of Moonlight and Shadow",
        description: `At 6th level, home can be wherever you are. During a short or long rest, you can invoke the shadowy power of the Gloaming Court to help guard your respite. At the start of the rest, you touch a point in space, and an invisible, 30-foot-radius sphere of magic appears, centered on that point. Total cover blocks the sphere.
While within the sphere, you and your allies gain a +5 bonus to Dexterity (Stealth) and Wisdom (Perception) checks, and any light from open flames in the sphere (a campfire, torches, or the like) isn't visible outside it.
The sphere vanishes at the end of the rest or when you leave the sphere.`,
      },
      {
        level: 10,
        title: "Hidden Paths",
        description: `Starting at 10th level, you can use the hidden, magical pathways that some fey use to traverse space in the blink of an eye. As a bonus action on your turn, you can teleport up to 60 feet to an unoccupied space you can see. Alternatively, you can use your action to teleport one willing creature you touch up to 30 feet to an unoccupied space you can see.
You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.`,
      },
      {
        level: 14,
        title: "Walker in Dreams",
        description: `At 14th level, the magic of the Feywild grants you the ability to travel mentally or physically through dreamlands.
When you finish a short rest, you can cast one of the following spells, without expending a spell slot or requiring material components: dream (with you as the messenger), scrying, or teleportation circle.
This use of teleportation circle is special. Rather than opening a portal to a permanent teleportation circle, it opens a portal to the last location where you finished a long rest on your current plane of existence. If you haven't taken a long rest on your current plane, the spell fails but isn't wasted.
Once you use this feature, you can't use it again until you finish a long rest.`,
      },
    ],
  },
  {
    key: "land",
    name: "Circle of the Land",
    source: "PHB'24",
    features: [
      {
        name: "Land's Aid",
        level: 3,
        description: `Celebrate Connection to the Natural World
The Circle of the Land comprises mystics and sages who safeguard ancient knowledge and rites. These Druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic. The circle's wisest members preside as the chief priests of their communities.`,
      },
      {
        name: "Circle of the Land Spells",
        level: 3,
        description: `Whenever you finish a Long Rest, choose one type of land: arid, polar, temperate, or tropical. Consult the table below that corresponds to the chosen type; you have the spells listed for your Druid level and lower prepared.`,
      },
      {
        name: "Arid Land",
        level: 3,
        tables: [
          {
            headers: ["Druid Level", "Circle Spells"],
            rows: [
              ["3rd", "Blur, Burning Hands, Fire Bolt"],
              ["5th", "Fireball"],
              ["7th", "Blight"],
              ["9th", "Wall of Stone"],
            ],
          },
        ],
      },
      {
        name: "Polar Land",
        level: 3,
        tables: [
          {
            headers: ["Druid Level", "Circle Spells"],
            rows: [
              ["3rd", "Fog Cloud, Hold Person, Ray of Frost"],
              ["5th", "Sleet Storm"],
              ["7th", "Ice Storm"],
              ["9th", "Cone of Cold"],
            ],
          },
        ],
      },
      {
        name: "Temperate Land",
        level: 3,
        tables: [
          {
            headers: ["Druid Level", "Circle Spells"],
            rows: [
              ["3rd", "Misty Step, Shocking Grasp, Sleep"],
              ["5th", "Lightning Bolt"],
              ["7th", "Freedom of Movement"],
              ["9th", "Tree Stride"],
            ],
          },
        ],
      },
      {
        name: "Tropical Land",
        level: 3,
        tables: [
          {
            headers: ["Druid Level", "Circle Spells"],
            rows: [
              ["3rd", "Acid Splash, Ray of Sickness, Web"],
              ["5th", "Stinking Cloud"],
              ["7th", "Polymorph"],
              ["9th", "Insect Plague"],
            ],
          },
        ],
      },
      {
        name: "Land's Aid",
        level: 3,
        description: `As a Magic action, you can expend a use of your Wild Shape and choose a point within 60 feet of yourself. Vitality-giving flowers and life-draining thorns appear for a moment in a 10-foot-radius Sphere centered on that point. Each creature of your choice in the Sphere must make a Constitution saving throw against your spell save DC, taking 2d6 Necrotic damage on a failed save or half as much damage on a successful one. One creature of your choice in that area regains 2d6 Hit Points.
The damage and healing increase by 1d6 when you reach Druid levels 10 (3d6) and 14 (4d6).`,
      },
      {
        name: "Natural Recovery",
        level: 6,
        description: `You can cast one of the level 1+ spells that you have prepared from your Circle Spells feature without expending a spell slot, and you must finish a Long Rest before you do so again.
In addition, when you finish a Short Rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your Druid level (round up), and none of them can be level 6+. Once you recover spell slots with this feature, you can't do so again until you finish a Long Rest.`,
      },
      {
        name: "Nature's Ward",
        level: 10,
        description: `You are immune to the Poisoned condition, and you have Resistance to a damage type associated with your current land choice in the Circle Spells feature.`,
        table: {
          headers: ["Land Type", "Resistance"],
          rows: [
            ["Arid", "Fire"],
            ["Polar", "Cold"],
            ["Temperate", "Lightning"],
            ["Tropical", "Poison"],
          ],
        },
      },
      {
        name: "Nature's Sanctuary",
        level: 14,
        description: `As a Magic action, you can expend a use of your Wild Shape and cause spectral trees and vines to appear in a 15-foot Cube on the ground within 120 feet of yourself. They last there for 1 minute or until you have the Incapacitated condition or die. You and your allies have Half Cover while in that area, and your allies gain the current Resistance of your Nature's Ward while there.
As a Bonus Action, you can move the Cube up to 60 feet to ground within 120 feet of yourself.`,
      },
    ],
  },
  {
    key: "moon",
    name: "Circle of the Moon",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Adopt Animal Forms to Guard the Wilds
Druids of the Circle of the Moon draw on lunar magic to transform themselves. Their order gathers under the moon to share news and perform rituals.
Changeable as the moon, a Druid of this circle might prowl as a great cat one night, soar over the treetops as an eagle the next day, and then crash through undergrowth as a bear to drive off a trespassing monster. The wild is in the Druid's blood.`,
      },
      {
        name: "Circle of the Moon Spells",
        level: 3,
        description: `When you reach a Druid level specified in the Circle of the Moon Spells table, you thereafter always have the listed spells prepared. You can cast the spells from this feature while you're in a Wild Shape form.`,
        table: {
          headers: ["Druid Level", "Prepared Spells"],
          rows: [
            ["3", "Cure Wounds, Moonbeam, Starry Wisp"],
            ["5", "Conjure Animals"],
            ["7", "Fount of Moonlight"],
            ["9", "Mass Cure Wounds"],
          ],
        },
      },
      {
        name: "Circle Forms",
        level: 3,
        description: `You can channel lunar magic when you assume a Wild Shape form, granting you the benefits below:
Challenge Rating: The maximum Challenge Rating for the form equals your Druid level divided by 3 (round down).
Armor Class: Until you leave the form, your AC equals 13 plus your Wisdom modifier if that total is higher than the Beast's AC.
Temporary Hit Points: You gain a number of Temporary Hit Points equal to three times your Druid level.`,
      },
      {
        name: "Improved Circle Forms",
        level: 6,
        description: `While in a Wild Shape form, you gain the following benefits:
Lunar Radiance: Each of your attacks in a Wild Shape form can deal its normal damage type or Radiant damage. You make this choice each time you hit with those attacks.
Increased Toughness: You can add your Wisdom modifier to your Constitution saving throws.`,
      },
      {
        name: "Moonlight Step",
        level: 10,
        description: `As a Bonus Action, you teleport up to 30 feet to an unoccupied space you can see, and you have Advantage on the next attack roll you make before the end of this turn. 
You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest. You can also regain uses by expending a level 2+ spell slot for each use you want to restore (no action required).`,
      },
      {
        name: "Lunar Form",
        level: 14,
        description: `The power of the moon suffuses you, granting you the following benefits:
Improved Lunar Radiance: Once per turn, you can deal an extra 2d10 Radiant damage to a target you hit with a Wild Shape form's attack.
Shared Moonlight: Whenever you use Moonlight Step, you can also teleport one willing creature within 10 feet of you to an unoccupied space within 10 feet of your destination space.`,
      },
    ],
  },
  {
    key: "sea",
    name: "Circle of the Sea",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Become One with Tides and Storms
Druids of the Circle of the Sea draw on the tempestuous forces of oceans and storms. Some view themselves as embodiments of nature's wrath, seeking vengeance against those who despoil nature. Others seek mystical unity with nature by attuning themselves to the ebb and flow of the tides, following the rush of currents and waves and listening to the inscrutable whispers and roars of the winds.`,
      },
      {
        name: "Circle of the Sea Spells",
        level: 3,
        description: `When you reach a Druid level specified in the Circle of the Sea Spells table, you thereafter always have the listed spells prepared. You can cast the spells from this feature while you're in a Wild Shape form.`,
        table: {
          headers: ["Druid Level", "Prepared Spells"],
          rows: [
            [
              "3rd",
              "Fog Cloud, Gust of Wind, Ray of Frost, Shatter, Thunderwave",
            ],
            ["5th", "Lightning Bolt, Water Breathing"],
            ["7th", "Control Water, Ice Storm"],
            ["9th", "Conjure Elemental, Hold Monster"],
          ],
        },
      },
      {
        name: "Wrath of the Sea",
        level: 3,
        description: `As a Bonus Action, you can expend a use of your Wild Shape to manifest a 5-foot Emanation of ocean spray that surrounds you for 10 minutes. It ends early if you dismiss it, manifest it again, or have the Incapacitated condition. You can choose another creature in the Emanation as a Bonus Action. That target must succeed on a Constitution saving throw or take Cold damage and, if Large or smaller, be pushed up to 15 feet away. Roll a number of d6s equal to your Wisdom modifier (minimum 1) to determine the damage.`,
      },
      {
        name: "Aquatic Affinity",
        level: 6,
        description: `The size of the Emanation increases to 10 feet. You gain a Swim Speed equal to your Speed.`,
      },
      {
        name: "Stormborn",
        level: 10,
        description: `Wrath of the Sea confers two more benefits while active: Flight: You gain a Fly Speed equal to your Speed. Resistance: You have Resistance to Cold, Lightning, and Thunder damage.`,
      },
      {
        name: "Oceanic Gift",
        level: 14,
        description: `Instead of manifesting the Emanation around yourself, you can manifest it around one willing creature within 60 feet. That creature gains all the benefits of the Emanation and uses your spell save DC and Wisdom modifier. You can manifest it around both yourself and another creature if you expend two uses of Wild Shape.`,
      },
    ],
  },
  {
    key: "shepherd",
    name: "Circle of the Shepherd",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `At 2nd level, you gain the ability to converse with beasts and many fey.
You learn to speak, read, and write Sylvan. In addition, beasts can understand your speech, and you gain the ability to decipher their noises and motions. Most beasts lack the intelligence to convey or understand sophisticated concepts, but a friendly beast could relay what it has seen or heard in the recent past. This ability doesn't grant you friendship with beasts, though you can combine this ability with gifts to curry favor with them as you would with any nonplayer character.`,
      },
      {
        name: "Speech of the Woods",
        level: 3,
        description: `Druids of the Circle of the Shepherd commune with the spirits of nature, especially the spirits of beasts and the fey, and call to those spirits for aid. These druids recognize that all living things play a role in the natural world, yet they focus on protecting animals and fey creatures that have difficulty defending themselves. Shepherds, as they are known, see such creatures as their charges. They ward off monsters that threaten them, rebuke hunters who kill more prey than necessary, and prevent civilization from encroaching on rare animal habitats and on sites sacred to the fey. Many of these druids are happiest far from cities and towns, content to spend their days in the company of animals and the fey creatures of the wilds.
Members of this circle become adventurers to oppose forces that threaten their charges or to seek knowledge and power that will help them safeguard their charges better. Wherever these druids go, the spirits of the wilderness are with them.`,
      },
      {
        name: "Spirit Totem",
        level: 3,
        description: `Starting at 2nd level, you can call forth nature spirits to influence the world around you. As a bonus action, you can magically summon an incorporeal spirit to a point you can see within 60 feet of you. The spirit creates an aura in a 30-foot radius around that point. It counts as neither a creature nor an object, though it has the spectral appearance of the creature it represents.
As a bonus action, you can move the spirit up to 60 feet to a point you can see.
The spirit persists for 1 minute or until you're incapacitated. Once you use this feature, you can't use it again until you finish a short or long rest.
The effect of the spirit's aura depends on the type of spirit you summon from the options below.
Bear Spirit. The bear spirit grants you and your allies its might and endurance. Each creature of your choice in the aura when the spirit appears gains temporary hit points equal to 5 + your druid level. In addition, you and your allies gain advantage on Strength checks and Strength saving throws while in the aura.
Hawk Spirit. The hawk spirit is a consummate hunter, aiding you and your allies with its keen sight. When a creature makes an attack roll against a target in the spirit's aura, you can use your reaction to grant advantage to that attack roll. In addition, you and your allies have advantage on Wisdom (Perception) checks while in the aura.
Unicorn Spirit. The unicorn spirit lends its protection to those nearby. You and your allies gain advantage on all ability checks made to detect creatures in the spirit's aura. In addition, if you cast a spell using a spell slot that restores hit points to any creature inside or outside the aura, each creature of your choice in the aura also regains hit points equal to your druid level.`,
      },
      {
        name: "Mighty Summoner",
        level: 6,
        description: `Starting at 6th level, beasts and fey that you conjure are more resilient than normal. Any beast or fey summoned or created by a spell that you cast gains the following benefits:`,
        list: [
          "The creature appears with more hit points than normal: 2 extra hit points per Hit Die it has.",
          "The damage from its natural weapons is considered magical for the purpose of overcoming immunity and resistance to nonmagical attacks and damage.",
        ],
      },
      {
        name: "Guardian Spirit",
        level: 10,
        description: `Beginning at 10th level, your Spirit Totem safeguards the beasts and fey that you call forth with your magic. When a beast or fey that you summoned or created with a spell ends its turn in your Spirit Totem aura, that creature regains a number of hit points equal to half your druid level.`,
      },
      {
        name: "Faithful Summons",
        level: 14,
        description: `Starting at 14th level, the nature spirits you commune with protect you when you are the most defenseless. If you are reduced to 0 hit points or are incapacitated against your will, you can immediately gain the benefits of conjure animals as if it were cast using a 9th-level spell slot. It summons four beasts of your choice that are challenge rating 2 or lower. The conjured beasts appear within 20 feet of you. If they receive no commands from you, they protect you from harm and attack your foes. The spell lasts for 1 hour, requiring no concentration, or until you dismiss it (no action required).
Once you use this feature, you can't use it again until you finish a long rest.`,
      },
    ],
  },
  {
    key: "spores",
    name: "Circle of Spores",
    source: "TCE",
    features: [
      {
        name: "",
        level: 2,
        description: `Druids of the Circle of Spores find beauty in decay. They see within mold and other fungi the ability to transform lifeless material into abundant, albeit somewhat strange, life.
These druids believe that life and death are parts of a grand cycle, with one leading to the other and then back again. Death isn't the end of life, but instead a change of state that sees life shift into a new form.
Druids of this circle have a complex relationship with the undead. Unlike most other druids, they see nothing inherently wrong with undeath, which they consider to be a companion to life and death. But these druids believe that the natural cycle is healthiest when each segment of it is vibrant and changing. Undead that seek to replace all life with undeath, or that try to avoid passing to a final rest, violate the cycle and must be thwarted.`,
      },
      {
        name: "Circle of Spores Spells",
        level: 3,
        description: `Your symbiotic link to fungus and your ability to tap into the cycle of life and death grants you access to certain spells. Once you gain access to one of these spells, you always have it prepared, and it doesn't count against the number of spells you can prepare each day. If you gain access to a spell that doesn't appear on the druid spell list, the spell is nonetheless a druid spell for you.`,
        table: {
          headers: ["Druid Level", "Circle Spells"],
          rows: [
            ["3rd", "blindness/deafness, gentle repose"],
            ["5th", "animate dead, gaseous form"],
            ["7th", "blight, confusion"],
            ["9th", "cloudkill, contagion"],
          ],
        },
      },
      {
        name: "Halo of Spores",
        level: 3,
        description: `Starting at 2nd level, you are surrounded by invisible, necrotic spores that are harmless until you unleash them on a creature nearby. When a creature you can see moves into a space within 10 feet of you or starts its turn there, you can use your reaction to deal 1d4 necrotic damage to that creature unless it succeeds on a Constitution saving throw against your spell save DC. The necrotic damage increases to 1d6 at 6th level, 1d8 at 10th level, and 1d10 at 14th level.`,
      },
      {
        name: "Symbiotic Entity",
        level: 3,
        description: `You gain the ability to channel magic into your spores. As an action, you can expend a use of your Wild Shape feature to awaken those spores, rather than transforming into a beast form, and you gain 4 temporary hit points for each level you have in this class. While this feature is active, you gain the following benefits:
When you deal your Halo of Spores damage, roll the damage die a second time and add it to the total.
Your melee weapon attacks deal an extra 1d6 necrotic damage to any target they hit.
These benefits last for 10 minutes, until you lose all these temporary hit points, or until you use your Wild Shape again.`,
      },
      {
        name: "Fungal Infestation",
        level: 6,
        description: `Your spores gain the ability to infest a corpse and animate it. If a beast or a humanoid that is Small or Medium dies within 10 feet of you, you can use your reaction to animate it, causing it to stand up immediately with 1 hit point. The creature uses the zombie stat block in the Monster Manual. It remains animate for 1 hour, after which time it collapses and dies.
In combat, the zombie's turn comes immediately after yours. It obeys your mental commands, and the only action it can take is the Attack action, making one melee attack.
You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.`,
      },
      {
        name: "Spreading Spores",
        level: 10,
        description: `You gain the ability to seed an area with deadly spores. As a bonus action while your Symbiotic Entity feature is active, you can hurl spores up to 30 feet away, where they swirl in a 10-foot cube for 1 minute. The spores disappear early if you use this feature again, if you dismiss them as a bonus action, or if your Symbiotic Entity feature is no longer active.
Whenever a creature moves into the cube or starts its turn there, that creature takes your Halo of Spores damage, unless the creature succeeds on a Constitution saving throw against your spell save DC. A creature can take this damage no more than once per turn.
While the cube of spores persists, you can't use your Halo of Spores reaction.`,
      },
      {
        name: "Fungal Body",
        level: 14,
        description: `The fungal spores in your body alter you: you can't be blinded, deafened, frightened, or poisoned, and any critical hit against you counts as a normal hit instead, unless you're incapacitated.`,
      },
    ],
  },
  {
    key: "stars",
    name: "Circle of Stars",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `The Circle of the Stars has tracked heavenly patterns since time immemorial, discovering secrets hidden amid the constellations. By understanding these secrets, the Druids of this circle seek to harness the powers of the cosmos.`,
      },
      {
        name: "Star Map",
        level: 3,
        description: `You've created a star chart as part of your heavenly studies. It is a Tiny object, and you can use it as a Spellcasting Focus for your Druid spells. You determine its form by rolling on the Star Map table or by choosing one.
While holding the map, you have the Guidance and Guiding Bolt spells prepared, and you can cast Guiding Bolt without expending a spell slot. You can cast it in that way a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.
If you lose the map, you can perform a 1-hour ceremony to magically create a replacement. This ceremony can be performed during a Short or Long Rest, and it destroys the previous map.`,
        table: {
          headers: ["1d6", "Map Form"],
          rows: [
            ["1", "A scroll bearing depictions of constellations"],
            ["2", "A stone tablet with fine holes drilled through it"],
            ["3", "An owlbear hide tooled with stellar symbols"],
            ["4", "A collection of maps bound in an ebony cover"],
            ["5", "A crystal engraved with starry patterns"],
            ["6", "A glass disk etched with constellations"],
          ],
        },
      },
      {
        name: "Starry Form",
        level: 3,
        description: `As a Bonus Action, you can expend a use of your Wild Shape feature to take on a starry form rather than shape-shifting.
While in your starry form, you retain your game statistics, but your body becomes luminous, your joints glimmer like stars, and glowing lines connect them as on a star chart. This form sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. The form lasts for 10 minutes. It ends early if you dismiss it (no action required), have the Incapacitated condition, or use this feature again.
Whenever you assume your starry form, choose which of the following constellations glimmers on your body; your choice gives you certain benefits while in the form:
Archer. A constellation of an archer appears on you. When you activate this form and as a Bonus Action on your subsequent turns while it lasts, you can make a ranged spell attack, hurling a luminous arrow that targets one creature within 60 feet of yourself. On a hit, the attack deals Radiant damage equal to 1d8 plus your Wisdom modifier.
Chalice. A constellation of a life-giving goblet appears on you. Whenever you cast a spell using a spell slot that restores Hit Points to a creature, you or another creature within 30 feet of you can regain Hit Points equal to 1d8 plus your Wisdom modifier.
Dragon. A constellation of a wise dragon appears on you. When you make an Intelligence or a Wisdom check or a Constitution saving throw to maintain Concentration, you can treat a roll of 9 or lower on the d20 as a 10.`,
      },
      {
        name: "Cosmic Omen",
        level: 6,
        description: `Whenever you finish a Long Rest, you can consult your Star Map for omens and roll a die. Until you finish your next Long Rest, you gain access to a special Reaction based on whether you rolled an even or an odd number on the die:
Weal (even). Whenever a creature you can see within 30 feet of you is about to make a D20 Test, you can take a Reaction to roll 1d6 and add the number rolled to the total.
Woe (odd). Whenever a creature you can see within 30 feet of you is about to make a D20 Test, you can take a Reaction to roll 1d6 and subtract the number rolled from the total.
You can use this Reaction a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.`,
      },
      {
        name: "Twinkling Constellations",
        level: 10,
        description: `The constellations of your Starry Form improve. The 1d8 of the Archer and the Chalice becomes 2d8, and while the Dragon is active, you have a Fly Speed of 20 feet and can hover.
Moreover, at the start of each of your turns while in your Starry Form, you can change which constellation glimmers on your body.`,
      },
      {
        name: "Full of Stars",
        level: 14,
        description: `While in your Starry Form, you become partially incorporeal, giving you Resistance to Bludgeoning, Piercing, and Slashing damage.`,
      },
    ],
  },
  {
    key: "wildfire",
    name: "Circle of Wildfire",
    source: "TCE",
    features: [
      {
        name: "",
        level: 2,
        description: `Druids within the Circle of Wildfire understand that destruction is sometimes the precursor of creation, such as when a forest fire promotes later growth. These druids bond with a primal spirit that harbors both destructive and creative power, allowing the druids to create controlled flames that burn away one thing but give life to another.`,
      },
      {
        name: "Circle of Wildfire Spells",
        level: 2,
        description: `You have formed a bond with a wildfire spirit, a primal being of creation and destruction. Your link with this spirit grants you access to some spells when you reach certain levels in this class. Once you gain access to one of these spells, you always have it prepared, and it doesn't count against the number of spells you can prepare each day. If you gain access to a spell that doesn't appear on the druid spell list, the spell is nonetheless a druid spell for you.`,
        table: {
          headers: ["Druid Level", "Circle Spells"],
          rows: [
            ["2nd", "burning hands, cure wounds"],
            ["3rd", "flaming sphere, scorching ray"],
            ["5th", "plant growth, revivify"],
            ["7th", "aura of life, fire shield"],
            ["9th", "flame strike, mass cure wounds"],
          ],
        },
      },
      {
        name: "Summon Wildfire Spirit",
        level: 2,
        description: `You can summon the primal spirit bound to your soul. As an action, you can expend one use of your Wild Shape feature to summon your wildfire spirit, rather than assuming a beast form. 
The spirit appears in an unoccupied space of your choice within 30 feet. Each creature within 10 feet of the spirit (other than you) must succeed on a Dexterity saving throw against your spell save DC or take 2d6 fire damage. 
The spirit is friendly to you and your companions and obeys your commands. In combat, the spirit shares your initiative count, taking its turn immediately after yours. The only action it takes on its turn is the Dodge action, unless you command it otherwise. 
The spirit manifests for 1 hour, until it is reduced to 0 hit points, until you use this feature again, or until you die.`,
      },
      {
        name: "Enhanced Bond",
        level: 6,
        description: `The bond with your wildfire spirit enhances your destructive and restorative spells. Whenever you cast a spell that deals fire damage or restores hit points while your wildfire spirit is summoned, roll a d8 and gain a bonus equal to the number rolled to one damage or healing roll of the spell. 
In addition, when you cast a spell with a range other than self, the spell can originate from you or your wildfire spirit.`,
      },
      {
        name: "Cauterizing Flames",
        level: 10,
        description: `You gain the ability to turn death into magical flames that can heal or incinerate. When a Small or larger creature dies within 30 feet of you or your wildfire spirit, a harmless spectral flame springs forth in the dead creature's space for 1 minute. 
When a creature enters that space, you can use your reaction to extinguish the spectral flame and either heal the creature or deal fire damage equal to 2d10 + your Wisdom modifier. 
You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Blazing Revival",
        level: 14,
        description: `The bond with your wildfire spirit can save you from death. If the spirit is within 120 feet when you are reduced to 0 hit points and fall unconscious, you can cause the spirit to drop to 0 hit points. You then regain half your hit points and immediately rise to your feet. 
Once you use this feature, you can't use it again until you finish a long rest.`,
      },
    ],
  },
];

export default druidSubclass;
