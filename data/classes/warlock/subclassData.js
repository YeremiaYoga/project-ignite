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
    features: [
      {
        name: "",
        level: 3,
        description: `Make a Deal with the Lower Planes
          Your pact draws on the Lower Planes, the realms of perdition. You might forge a bargain with a demon lord such as Demogorgon or Orcus; an archdevil such as Asmodeus; or a pit fiend, balor, yugoloth, or night hag that is especially mighty. That patron's aims are evil—the corruption or destruction of all things, ultimately including you—and your path is defined by the extent to which you strive against those aims.`,
      },
      {
        name: "Fiend Spells",
        level: 3,
        description: `The magic of your patron ensures you always have certain spells ready; when you reach a Warlock level specified in the Fiend Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          headers: ["Warlock Level", "Spells"],
          rows: [
            ["3", "Burning Hands, Command, Scorching Ray, Suggestion"],
            ["5", "Fireball, Stinking Cloud"],
            ["7", "Fire Shield, Wall of Fire"],
            ["9", "Geas, Insect Plague"],
          ],
        },
      },
      {
        name: "Dark One's Blessing",
        level: 3,
        description: `When you reduce an enemy to 0 Hit Points, you gain Temporary Hit Points equal to your Charisma modifier plus your Warlock level (minimum of 1 Temporary Hit Point). You also gain this benefit if someone else reduces an enemy within 10 feet of you to 0 Hit Points.`,
      },
      {
        name: "Dark One's Own Luck",
        level: 6,
        description: `You can call on your fiendish patron to alter fate in your favor. When you make an ability check or a saving throw, you can use this feature to add 1d10 to your roll. You can do so after seeing the roll but before any of the roll's effects occur.
You can use this feature a number of times equal to your Charisma modifier (minimum of once), but you can use it no more than once per roll. You regain all expended uses when you finish a Long Rest.`,
      },
      {
        name: "Fiendish Resilience",
        level: 10,
        description: `Choose one damage type, other than Force, whenever you finish a Short or Long Rest. You have Resistance to that damage type until you choose a different one with this feature.`,
      },
      {
        name: "Hurl Through Hell",
        level: 14,
        description: `Once per turn when you hit a creature with an attack roll, you can try to instantly transport the target through the Lower Planes. The target must succeed on a Charisma saving throw against your spell save DC, or the target disappears and hurtles through a nightmare landscape. The target takes 8d10 Psychic damage if it isn't a Fiend, and it has the Incapacitated condition until the end of your next turn, when it returns to the space it previously occupied or the nearest unoccupied space.
Once you use this feature, you can't use it again until you finish a Long Rest unless you expend a Pact Magic spell slot (no action required) to restore your use of it.`,
      },
    ],
  },
  {
    key: "genie",
    name: "The Genie",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `You have made a pact with one of the rarest kinds of genie, a noble genie. Such entities rule vast fiefs on the Elemental Planes and have great influence over lesser genies and elemental creatures. Noble genies are varied in their motivations, but most are arrogant and wield power that rivals that of lesser deities. They delight in turning the table on mortals, who often bind genies into servitude, and readily enter into pacts that expand their reach.
You choose your patron's kind or determine it randomly, using the Genie Kind table.`,
      },
      {
        name: "Genie Kind",
        level: 3,
        table: {
          headers: ["d4", "Kind", "Element"],
          rows: [
            ["1", "Dao", "Earth"],
            ["2", "Djinni", "Air"],
            ["3", "Efreeti", "Fire"],
            ["4", "Marid", "Water"],
          ],
        },
      },
      {
        name: "Expanded Spell List",
        level: 3,
        description: `The Genie lets you choose from an expanded list of spells when you learn a warlock spell. The Genie Expanded Spells table shows the genie spells that are added to the warlock spell list for you, along with the spells associated in the table with your patron's kind: dao, djinni, efreeti, or marid.`,
        table: {
          headers: [
            "Spell Level",
            "Genie Spells",
            "Dao Spells",
            "Djinni Spells",
            "Efreeti Spells",
            "Marid Spells",
          ],
          rows: [
            [
              "1st",
              "detect evil and good",
              "sanctuary",
              "thunderwave",
              "burning hands",
              "fog cloud",
            ],
            [
              "2nd",
              "phantasmal force",
              "spike growth",
              "gust of wind",
              "scorching ray",
              "blur",
            ],
            [
              "3rd",
              "create food and water",
              "meld into stone",
              "wind wall",
              "fireball",
              "sleet storm",
            ],
            [
              "4th",
              "phantasmal killer",
              "stone shape",
              "greater invisibility",
              "fire shield",
              "control water",
            ],
            [
              "5th",
              "creation",
              "wall of stone",
              "seeming",
              "flame strike",
              "cone of cold",
            ],
            ["9th", "wish", "—", "—", "—", "—"],
          ],
        },
      },
      {
        name: "Genie's Vessel",
        level: 3,
        description: `Your patron gifts you a magical vessel that grants you a measure of the genie's power. The vessel is a Tiny object, and you can use it as a spellcasting focus for your warlock spells. You decide what the object is, or you can determine what it is randomly by rolling on the Genie's Vessel table.`,
        table: {
          headers: ["d6", "Vessel"],
          rows: [
            ["1", "Oil lamp"],
            ["2", "Urn"],
            ["3", "Ring with a compartment"],
            ["4", "Stoppered bottle"],
            ["5", "Hollow statuette"],
            ["6", "Ornate lantern"],
          ],
        },
        description2: `While you are touching the vessel, you can use it in the following ways:
Bottled Respite. As an action, you can magically vanish and enter your vessel, which remains in the space you left. The interior of the vessel is an extradimensional space in the shape of a 20-foot-radius cylinder, 20 feet high, and resembles your vessel. The interior is appointed with cushions and low tables and is a comfortable temperature. While inside, you can hear the area around your vessel as if you were in its space. You can remain inside the vessel up to a number of hours equal to twice your proficiency bonus. You exit the vessel early if you use a bonus action to leave, if you die, or if the vessel is destroyed. When you exit the vessel, you appear in the unoccupied space closest to it. Any objects left in the vessel remain there until carried out, and if the vessel is destroyed, every object stored there harmlessly appears in the unoccupied spaces closest to the vessel's former space. Once you enter the vessel, you can't enter again until you finish a long rest.
Genie's Wrath. Once during each of your turns when you hit with an attack roll, you can deal extra damage to the target equal to your proficiency bonus. The type of this damage is determined by your patron: bludgeoning (dao), thunder (djinni), fire (efreeti), or cold (marid).
The vessel's AC equals your spell save DC. Its hit points equal your warlock level plus your proficiency bonus, and it is immune to poison and psychic damage.
If the vessel is destroyed or you lose it, you can perform a 1-hour ceremony to receive a replacement from your patron. This ceremony can be performed during a short or long rest, and the previous vessel is destroyed if it still exists. The vessel vanishes in a flare of elemental power when you die.`,
      },
      {
        name: "Elemental Gift",
        level: 6,
        description: `You begin to take on characteristics of your patron's kind. You now have resistance to a damage type determined by your patron's kind: bludgeoning (dao), thunder (djinni), fire (efreeti), or cold (marid).
In addition, as a bonus action, you can give yourself a flying speed of 30 feet that lasts for 10 minutes, during which you can hover. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Sanctuary Vessel",
        level: 10,
        description: `When you enter your Genie's Vessel via the Bottled Respite feature, you can now choose up to five willing creatures that you can see within 30 feet of you, and the chosen creatures are drawn into the vessel with you.
As a bonus action, you can eject any number of creatures from the vessel, and everyone is ejected if you leave or die or if the vessel is destroyed.
In addition, anyone (including you) who remains within the vessel for at least 10 minutes gains the benefit of finishing a short rest, and anyone can add your proficiency bonus to the number of hit points they regain if they spend any Hit Dice as part of a short rest there.`,
      },
      {
        name: "Limited Wish",
        level: 14,
        description: `You entreat your patron to grant you a small wish. As an action, you can speak your desire to your Genie's Vessel, requesting the effect of one spell that is 6th level or lower and has a casting time of 1 action. The spell can be from any class's spell list, and you don't need to meet the requirements in that spell, including costly components; the spell simply takes effect as part of this action.
Once you use this feature, you can't use it again until you finish 1d4 long rests.`,
      },
    ],
  },
  {
    key: "great-old-one",
    name: "Great Old One Patron",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Unearth Forbidden Lore of Ineffable Beings
          When you choose this subclass, you might bind yourself to an unspeakable being from the Far Realm or an elder god—a being such as Tharizdun, the Chained God; Zargon, the Returner; Hadar, the Dark Hunger; or Great Cthulhu. Or you might invoke several entities without yoking yourself to one. The motives of these beings are incomprehensible, and the Great Old One might be indifferent to your existence. But the secrets you've learned nevertheless allow you to draw strange magic from it.`,
      },
      {
        name: "Great Old One Spells",
        level: 3,
        description:
          "The magic of your patron ensures you always have certain spells ready; when you reach a Warlock level specified in the Great Old One Spells table, you thereafter always have the listed spells prepared.",
        table: {
          headers: ["Warlock Level", "Spells"],
          rows: [
            [
              "3",
              "Detect Thoughts, Dissonant Whispers, Phantasmal Force, Tasha's Hideous Laughter",
            ],
            ["5", "Clairvoyance, Hunger of Hadar"],
            ["7", "Confusion, Summon Aberration"],
            ["9", "Modify Memory, Telekinesis"],
          ],
        },
      },
      {
        name: "Awakened Mind",
        level: 3,
        description: `You can form a telepathic connection between your mind and the mind of another. As a Bonus Action, choose one creature you can see within 30 feet of yourself. You and the chosen creature can communicate telepathically with each other while the two of you are within a number of miles of each other equal to your Charisma modifier (minimum of 1 mile). To understand each other, you each must mentally use a language the other knows.
The telepathic connection lasts for a number of minutes equal to your Warlock level. It ends early if you use this feature to connect with a different creature.`,
      },
      {
        name: "Psychic Spells",
        level: 3,
        description: `When you cast a Warlock spell that deals damage, you can change its damage type to Psychic. In addition, when you cast a Warlock spell that is an Enchantment or Illusion, you can do so without Verbal or Somatic components.`,
      },
      {
        name: "Clairvoyant Combatant",
        level: 6,
        description: `When you form a telepathic bond with a creature using your Awakened Mind, you can force that creature to make a Wisdom saving throw against your spell save DC. On a failed save, the creature has Disadvantage on attack rolls against you, and you have Advantage on attack rolls against that creature for the duration of the bond.
Once you use this feature, you can't use it again until you finish a Short or Long Rest unless you expend a Pact Magic spell slot (no action required) to restore your use of it.`,
      },
      {
        name: "Eldritch Hex",
        level: 10,
        description: `Your alien patron grants you a powerful curse. You always have the Hex spell prepared. When you cast Hex and choose an ability, the target also has Disadvantage on saving throws of the chosen ability for the duration of the spell.`,
      },
      {
        name: "Thought Shield",
        level: 10,
        description: `Your thoughts can't be read by telepathy or other means unless you allow it. You also have Resistance to Psychic damage, and whenever a creature deals Psychic damage to you, that creature takes the same amount of damage that you take.`,
      },
      {
        name: "Create Thrall",
        level: 14,
        description: `When you cast Summon Aberration, you can modify it so that it doesn't require Concentration. If you do so, the spell's duration becomes 1 minute for that casting, and when summoned, the Aberration has a number of Temporary Hit Points equal to your Warlock level plus your Charisma modifier.
In addition, the first time each turn the Aberration hits a creature under the effect of your Hex, the Aberration deals extra Psychic damage to the target equal to the bonus damage of that spell.`,
      },
    ],
  },
  {
    key: "hexblade",
    name: "The Hexblade",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `You have made your pact with a mysterious entity from the Shadowfell—a force that manifests in sentient magic weapons carved from the stuff of shadow. The mighty sword Blackrazor is the most notable of these weapons, which have been spread across the multiverse over the ages. The shadowy force behind these weapons can offer power to warlocks who form pacts with it. Many Hexblade warlocks create weapons that emulate those formed in the Shadowfell. Others forgo such arms, content to weave the dark magic of that plane into their spellcasting.
Because the Raven Queen is known to have forged the first of these weapons, many sages speculate that she and the force are one and that the weapons, along with Hexblade warlocks, are tools she uses to manipulate events on the Material Plane to her inscrutable ends.`,
      },
      {
        name: "Expanded Spell List",
        level: 3,
        description:
          "The Hexblade lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.",
        table: {
          headers: ["Spell Level", "Spells"],
          rows: [
            ["1st", "Shield, Wrathful Smite"],
            ["2nd", "Blur, Branding Smite"],
            ["3rd", "Blink, Elemental Weapon"],
            ["4th", "Phantasmal Killer, Staggering Smite"],
            ["5th", "Banishing Smite, Cone of Cold"],
          ],
        },
      },
      {
        name: "Hexblade's Curse",
        level: 3,
        description: `Starting at 1st level, you gain the ability to place a baleful curse on someone. As a Bonus Action, choose one creature you can see within 30 feet of you. The target is cursed for 1 minute. The curse ends early if the target dies, you die, or you are incapacitated. Until the curse ends, you gain the following benefits:`,
        list: [
          "You gain a bonus to damage rolls against the cursed target. The bonus equals your proficiency bonus.  ",
          "Any attack roll you make against the cursed target is a critical hit on a roll of 19 or 20 on the d20.  ",
          "If the cursed target dies, you regain hit points equal to your warlock level + your Charisma modifier (minimum of 1 hit point).",
        ],
        description2: `You can't use this feature again until you finish a Short or Long Rest.`,
      },
      {
        name: "Hex Warrior",
        level: 3,
        description: `At 1st level, you acquire the training necessary to effectively arm yourself for battle. You gain proficiency with medium armor, shields, and martial weapons.
The influence of your patron also allows you to mystically channel your will through a particular weapon. Whenever you finish a Long Rest, you can touch one weapon that you are proficient with and that lacks the two-handed property. When you attack with that weapon, you can use your Charisma modifier, instead of Strength or Dexterity, for the attack and damage rolls. This benefit lasts until you finish a Long Rest.
If you later gain the Pact of the Blade feature, this benefit extends to every pact weapon you conjure with that feature, no matter the weapon's type.`,
      },
      {
        name: "Accursed Specter",
        level: 6,
        description: `Starting at 6th level, you can curse the soul of a person you slay, temporarily binding it to your service. When you slay a humanoid, you can cause its spirit to rise from its corpse as a specter, the statistics for which are in the Monster Manual. When the specter appears, it gains Temporary Hit Points equal to half your warlock level. Roll initiative for the specter, which has its own turns. It obeys your verbal commands, and it gains a special bonus to its attack rolls equal to your Charisma modifier (minimum of +0).
The specter remains in your service until the end of your next Long Rest, at which point it vanishes to the afterlife.
Once you bind a specter with this feature, you can't use the feature again until you finish a Long Rest.`,
      },
      {
        name: "Armor of Hexes",
        level: 10,
        description: `At 10th level, your hex grows more powerful. If the target cursed by your Hexblade's Curse hits you with an attack roll, you can use your Reaction to roll a d6. On a 4 or higher, the attack instead misses you, regardless of its roll.`,
      },
      {
        name: "Master of Hexes",
        level: 14,
        description: `Starting at 14th level, you can spread your Hexblade's Curse from a slain creature to another creature. When the creature cursed by your Hexblade's Curse dies, you can apply the curse to a different creature you can see within 30 feet of you, provided you aren't incapacitated.
When you apply the curse in this way, you don't regain hit points from the death of the previously cursed creature.`,
      },
    ],
  },
  {
    key: "undead",
    name: "The Undead",
    source: "VRGR",
    features: [
      {
        name: "",
        level: 3,
        description: `You've made a pact with a deathless being, a creature that defies the cycle of life and death, forsaking its mortal shell so it might eternally pursue its unfathomable ambitions. For such beings, time and morality are fleeting things, the concerns of those for whom grains of sand still rush through life's hourglass. Having once been mortal themselves, these ancient undead know firsthand the paths of ambition and the routes past the doors of death. They eagerly share this profane knowledge, along with other secrets, with those who work their will among the living.
Beings of this type include the demilich Acererak, the vampire tyrant Kas the Bloody-Handed, the githyanki lich-queen Vlaakith, the dracolich Dragotha, the undead pharaoh Ankhtepot, and the elusive Darklord, Azalin Rex.`,
      },
      {
        name: "Expanded Spell List",
        level: 3,
        description: `1st-level Undead feature
          The Undead lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.`,
        table: {
          headers: ["Spell Level", "Spells"],
          rows: [
            ["1st", "Bane, False Life"],
            ["2nd", "Blindness/Deafness, Phantasmal Force"],
            ["3rd", "Phantom Steed, Speak with Dead"],
            ["4th", "Death Ward, Greater Invisibility"],
            ["5th", "Antilife Shell, Cloudkill"],
          ],
        },
      },
      {
        name: "Form of Dread",
        level: 3,
        description: `1st-level Undead feature
        You manifest an aspect of your patron's dreadful power. As a Bonus Action, you transform for 1 minute. You gain the following benefits while transformed:`,
        list: [
          "You gain Temporary Hit Points equal to 1d10 + your warlock level. ",
          "Once during each of your turns, when you hit a creature with an attack roll, you can force it to make a Wisdom saving throw, and if the saving throw fails, the target is frightened of you until the end of your next turn.",
          "You are immune to the frightened condition.  ",
        ],
        description2: `You can transform a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a Long Rest.
The appearance of your Form of Dread reflects some aspect of your patron. For example, your form could be a shroud of shadows forming the crown and robes of your lich patron, or your body might glow with glyphs from ancient funerary rites and be surrounded by desert winds, suggesting your mummy patron.`,
      },
      {
        name: "Grave Touched",
        level: 6,
        description: `6th-level Undead feature
        Your patron's powers have a profound effect on your body and magic. You don't need to eat, drink, or breathe.
In addition, once during each of your turns, when you hit a creature with an attack roll and roll damage against the creature, you can replace the damage type with necrotic damage. While you are using your Form of Dread, you can roll one additional damage die when determining the necrotic damage the target takes.`,
      },
      {
        name: "Necrotic Husk",
        level: 10,
        description: `10th-level Undead feature
        Your connection to undeath and necrotic energy now saturates your body. You have resistance to necrotic damage. If you are transformed using your Form of Dread, you instead become immune to necrotic damage.
In addition, when you would be reduced to 0 hit points, you can use your Reaction to drop to 1 hit point instead and cause your body to erupt with deathly energy. Each creature of your choice that is within 30 feet of you takes necrotic damage equal to 2d10 + your warlock level. You then gain 1 level of exhaustion.
Once you use this reaction, you can't do so again until you finish 1d4 Long Rests.`,
      },
      {
        name: "Spirit Projection",
        level: 14,
        description: `14th-level Undead feature
        Your spirit can become untethered from your physical form. As an Action, you can project your spirit from your body. The body you leave behind is unconscious and in a state of suspended animation.
Your spirit resembles your mortal form in almost every way, replicating your game statistics but not your possessions. Any damage or other effects that apply to your spirit or physical body affects the other. Your spirit can remain outside your body for up to 1 hour or until your concentration is broken (as if concentrating on a spell). When your projection ends, your spirit returns to your body or your body magically teleports to your spirit's space (your choice).
While projecting your spirit, you gain the following benefits:`,
        list: [
          "Your spirit and body gain resistance to bludgeoning, piercing, and slashing damage.",
          "When you cast a spell of the conjuration or necromancy school, the spell doesn't require verbal or somatic components or material components that lack a gold cost.",
          "You have a flying speed equal to your walking speed and can hover. You can move through creatures and objects as if they were difficult terrain, but you take 1d10 force damage if you end your turn inside a creature or an object.  You have a flying speed equal to your walking speed and can hover. You can move through creatures and objects as if they were difficult terrain, but you take 1d10 force damage if you end your turn inside a creature or an object.",
          "While you are using your Form of Dread, once during each of your turns when you deal necrotic damage to a creature, you regain hit points equal to half the amount of necrotic damage dealt.",
        ],
        description2: `Once you use this feature, you can't do so again until you finish a Long Rest.`,
      },
    ],
  },
  {
    key: "undying",
    name: "The Undying",
    source: "SCAG",
    features: [
      {
        name: "",
        level: 3,
        description: `Death holds no sway over your patron, who has unlocked the secrets of everlasting life, although such a prize—like all power—comes at a price. Once mortal, the Undying has seen mortal lifetimes pass like the seasons, like the flicker of endless days and nights. It has the secrets of the ages to share, secrets of life and death. Beings of this sort include Vecna, Lord of the Hand and the Eye; the dread Iuz; the lich-queen Vol; the Undying Court of Aerenal; Vlaakith, lich-queen of the githyanki; and the deathless wizard Fistandantilus.
In the Realms, Undying patrons include Larloch the Shadow King, legendary master of Warlock's Crypt, and Gilgeam, the God-King of Unther.`,
      },
      {
        name: "Expanded Spell List",
        level: 3,
        description:
          "The Undying lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.",
        table: {
          headers: ["Spell Level", "Spells"],
          rows: [
            ["1st", "False Life, Ray of Sickness"],
            ["2nd", "Blindness/Deafness, Silence"],
            ["3rd", "Feign Death, Speak with Dead"],
            ["4th", "Aura of Life, Death Ward"],
            ["5th", "Contagion, Legend Lore"],
          ],
        },
      },
      {
        name: "Among the Dead",
        level: 3,
        description: `Starting at 1st level, you learn the Spare the Dying cantrip, which counts as a Warlock cantrip for you. You also have Advantage on saving throws against any disease.
Additionally, undead have difficulty harming you. If an undead targets you directly with an attack or a harmful spell, that creature must make a Wisdom saving throw against your spell save DC (an undead needn't make the save when it includes you in an area effect, such as the explosion of Fireball). On a failed save, the creature must choose a new target or forfeit targeting someone instead of you, potentially wasting the attack or spell. On a successful save, the creature is immune to this effect for 24 hours. An undead is also immune to this effect for 24 hours if you target it with an attack or a harmful spell.`,
      },
      {
        name: "Defy Death",
        level: 6,
        description: `Starting at 6th level, you can give yourself vitality when you cheat death or when you help someone else cheat it. You can regain hit points equal to 1d8 + your Constitution modifier (minimum of 1 hit point) when you succeed on a death saving throw or when you stabilize a creature with Spare the Dying.
Once you use this feature, you can't use it again until you finish a Long Rest.`,
      },
      {
        name: "Undying Nature",
        level: 10,
        description: `Beginning at 10th level, you can hold your breath indefinitely, and you don't require food, water, or sleep, although you still require rest to reduce exhaustion and still benefit from finishing Short and Long Rests.
In addition, you age at a slower rate. For every 10 years that pass, your body ages only 1 year, and you are immune to being magically aged.`,
      },
      {
        name: "Indestructible Life",
        level: 14,
        description: `When you reach 14th level, you partake some of the true secrets of the Undying. On your turn, you can use a Bonus Action to regain hit points equal to 1d8 + your Warlock level. Additionally, if you put a severed body part of yours back in place when you use this feature, the part reattaches.
Once you use this feature, you can't use it again until you finish a Short or Long Rest.`,
      },
    ],
  },
];

export default warlockSubclass;
