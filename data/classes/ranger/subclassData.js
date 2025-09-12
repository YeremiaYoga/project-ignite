const rangerSubclass = [
  {
    key: "beast-master",
    name: "Beast Master",
    source: "PHB'24",
    features: [
      {
        name: "Beast Master",
        level: 3,
        description: `Bond with a Primal Beast
          A Beast Master forms a mystical bond with a special animal, drawing on primal magic and a deep connection to the natural world.`,
      },
      {
        name: "Primal Companion",
        level: 3,
        description: `You magically summon a primal beast, which draws strength from your bond with nature. Choose its stat block: Beast of the Land, Beast of the Sea, or Beast of the Sky. You also determine the kind of animal it is, choosing a kind appropriate for the stat block. Whatever beast you choose, it bears primal markings indicating its supernatural origin.
The beast is Friendly to you and your allies and obeys your commands. It vanishes if you die.
The Beast in Combat. In combat, the beast acts during your turn. It can move and use its Reaction on its own, but the only action it takes is the Dodge action unless you take a Bonus Action to command it to take an action in its stat block or some other action. You can also sacrifice one of your attacks when you take the Attack action to command the beast to take the Beast's Strike action. If you have the Incapacitated condition, the beast acts on its own and isn't limited to the Dodge action.
Restoring or Replacing the Beast. If the beast has died within the last hour, you can take a Magic action to touch it and expend a spell slot. The beast returns to life after 1 minute with all its Hit Points restored.
Whenever you finish a Long Rest, you can summon a different primal beast, which appears in an unoccupied space within 5 feet of you. You choose its stat block and appearance. If you already have a beast from this feature, the old one vanishes when the new one appears.`,
      },
      {
        name: "Exceptional Training",
        level: 7,
        description: `When you take a Bonus Action to command your Primal Companion beast to take an action, you can also command it to take the Dash, Disengage, Dodge, or Help action using its Bonus Action.
In addition, whenever it hits with an attack roll and deals damage, it can deal your choice of Force damage or its normal damage type.`,
      },
      {
        name: "Bestial Fury",
        level: 11,
        description: `When you command your Primal Companion beast to take the Beast's Strike action, the beast can use it twice.
In addition, the first time each turn it hits a creature under the effect of your Hunter's Mark spell, the beast deals extra Force damage equal to the bonus damage of that spell.`,
      },
      {
        name: "Share Spells",
        level: 15,
        description: `When you cast a spell targeting yourself, you can also affect your Primal Companion beast with the spell if the beast is within 30 feet of you.`,
      },
    ],
  },
  {
    key: "drakewarden",
    name: "Drakewarden",
    source: "FTD",
    features: [
      {
        name: "",
        level: 3,
        description: `Your connection to the natural world takes the form of a draconic spirit, which can manifest in physical form as a drake. As your powers grow, your drake grows as well, blossoming from a small four-legged companion to a majestic winged creature large and strong enough for you to ride. Along the way, you gain an increasing share of the awe-inspiring power of dragons.
Consider the source of the draconic spirit you have bonded with. The Drakewarden Origin table offers examples.`,
      },
      {
        name: "Drakewarden Origin",
        level: 3,
        table: {
          title: "Drakewarden Origin",
          rows: [
            ["d6", "Origin"],
            [
              "1",
              "You studied a dragon's scale or claw, or a trinket from a dragon's hoard, creating your bond through that token's lingering draconic magic.",
            ],
            [
              "2",
              "A secret order of rangers who collect and guard draconic lore taught you their ways.",
            ],
            [
              "3",
              "A dragon gave you a geode or gemstone to care for. To your surprise, the drake hatched from that stone.",
            ],
            [
              "4",
              "You ingested a few drops of dragon blood, forever infusing your nature magic with draconic power.",
            ],
            [
              "5",
              "An ancient Draconic inscription on a standing stone empowered you when you read it aloud.",
            ],
            [
              "6",
              "You had a vivid dream of a mysterious figure accompanied by seven yellow canaries, who warned you of impending doom. When you awoke, your drake was there, watching you.",
            ],
          ],
        },
      },
      {
        name: "Draconic Gift",
        level: 3,
        description: `3rd-level Drakewarden feature
          The bond you share with your drake creates a connection to dragonkind, granting you understanding and empowering your presence. You gain the following benefits:
Thaumaturgy. You learn the thaumaturgy cantrip, which is a ranger spell for you.
Tongue of Dragons. You learn to speak, read, and write Draconic or one other language of your choice.`,
      },
      {
        name: "Drake Companion",
        level: 3,
        description: `3rd-level Drakewarden feature
          As an action, you can magically summon the drake that is bound to you. It appears in an unoccupied space of your choice within 30 feet of you.
The drake is friendly to you and your companions, and it obeys your commands. See its game statistics in the accompanying Drake Companion stat block, which uses your proficiency bonus (PB) in several places. Whenever you summon the drake, choose a damage type listed in its Draconic Essence trait. You can determine the cosmetic characteristics of the drake, such as its color, its scale texture, or any visible effect of its Draconic Essence; your choice has no effect on its game statistics.
In combat, the drake shares your initiative count, but it takes its turn immediately after yours. It can move and use its reaction on its own, but the only action it takes on its turn is the Dodge action, unless you take a bonus action on your turn to command it to take another action. That action can be one in its stat block or some other action. If you are incapacitated, the drake can take any action of its choice, not just Dodge.
The drake remains until it is reduced to 0 hit points, until you use this feature to summon the drake again, or until you die. Anything the drake was wearing or carrying is left behind when the drake vanishes.`,
        description2: `Once you summon the drake, you can't do so again until you finish a long rest, unless you expend a spell slot of 1st level or higher to summon it.`,
      },
      {
        name: "Bond of Fang and Scale",
        level: 7,
        description: `7th-level Drakewarden feature
          The bond you share with your drake intensifies, protecting you and stoking the drake's fury. When you summon your drake, it grows wings on its back and gains a flying speed equal to its walking speed.
In addition, while your drake is summoned, you and the drake gain the following benefits:
Drake Mount. The drake grows to Medium size. Reflecting your special bond, you can use the drake as a mount if your size is Medium or smaller. While you are riding your drake, it can't use the flying speed of this feature.
Magic Fang. The drake's Bite attack deals an extra 1d6 damage of the type chosen for the drake's Draconic Essence.
Resistance. You gain resistance to the damage type chosen for the drake's Draconic Essence.`,
      },
      {
        name: "Drake's Breath",
        level: 11,
        description: `7th-level Drakewarden feature
          As an action, you can exhale a 30-foot cone of damaging breath or cause your drake to exhale it. Choose acid, cold, fire, lightning, or poison damage (your choice doesn't have to match your drake's Draconic Essence). Each creature in the cone must make a Dexterity saving throw against your spell save DC, taking 8d6 damage on a failed save, or half as much damage on a successful one.`,
        description2: `This damage increases to 10d6 when you reach 15th level in this class.
Once you use this feature, you can't do so again until you finish a long rest, unless you expend a spell slot of 3rd level or higher to use it again.`,
      },
      {
        name: "Perfected Bond",
        level: 15,
        description: `7th-level Drakewarden feature
          Your bond to your drake reaches the pinnacle of its power. While your drake is summoned, you and the drake gain the following benefits:
Empowered Bite. The drake's Bite attack deals an extra 1d6 damage of the type chosen for its Draconic Essence (for a total of 2d6 extra damage).
Large Drake. The drake grows to Large size. When you ride your drake, it is no longer prohibited from using the flying speed of Bond of Fang and Scale.
Reflexive Resistance. When either you or the drake takes damage while you're within 30 feet of each other, you can use your reaction to give yourself or the drake resistance to that instance of damage. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
    ],
  },
  {
    key: "fey-wanderer",
    name: "Fey Wanderer",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `A fey mystique surrounds you, thanks to the boon of an archfey or a location in the Feywild that transformed you. However you gained fey magic, you are now a Fey Wanderer. Your joyful laughter brightens the hearts of the downtrodden, and your martial prowess strikes terror in your foes, for great is the mirth of the fey and dreadful is their fury.`,
      },
      {
        name: "Dreadful Strikes",
        level: 3,
        description: `You can augment your weapon strikes with mind-scarring magic drawn from the murky hollows of the Feywild. When you hit a creature with a weapon, you can deal an extra 1d4 Psychic damage to the target, which can take this extra damage only once per turn. The extra damage increases to 1d6 when you reach Ranger level 11.`,
      },
      {
        name: "Fey Wanderer Spells",
        level: 3,
        description: `When you reach a Ranger level specified in the Fey Wanderer Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          title: "Fey Wanderer Spells",
          rows: [
            ["Ranger Level", "Spells"],
            ["3rd", "Charm Person"],
            ["5th", "Misty Step"],
            ["9th", "Summon Fey"],
            ["13th", "Dimension Door"],
            ["17th", "Mislead"],
          ],
        },
        description2: `You also possess a fey blessing. Choose it from the Feywild Gifts table or determine it randomly.`,
      },
      {
        name: "",
        level: 3,
        table: {
          title: "Feywild Gifts",
          rows: [
            ["1d6", "Gift"],
            [
              "1",
              "Illusory butterflies flutter around you while you take a Short or Long Rest.",
            ],
            ["2", "Flowers bloom from your hair each dawn."],
            [
              "3",
              "You faintly smell of cinnamon, lavender, nutmeg, or another comforting herb or spice.",
            ],
            ["4", "Your shadow dances while no one is looking directly at it."],
            ["5", "Horns or antlers sprout from your head."],
            ["6", "Your skin and hair change color each dawn."],
          ],
        },
      },
      {
        name: "Otherworldly Glamour",
        level: 3,
        description: `Whenever you make a Charisma check, you gain a bonus to the check equal to your Wisdom modifier (minimum of +1).
You also gain proficiency in one of these skills of your choice: Deception, Performance, or Persuasion.`,
      },
      {
        name: "Beguiling Twist",
        level: 7,
        description: `The magic of the Feywild guards your mind. You have Advantage on saving throws to avoid or end the Charmed or Frightened condition.
In addition, whenever you or a creature you can see within 120 feet of you succeeds on a saving throw to avoid or end the Charmed or Frightened condition, you can take a Reaction to force a different creature you can see within 120 feet of yourself to make a Wisdom save against your spell save DC. On a failed save, the target is Charmed or Frightened (your choice) for 1 minute. The target repeats the save at the end of each of its turns, ending the effect on itself on a success.`,
      },
      {
        name: "Fey Reinforcements",
        level: 11,
        description: `You can cast Summon Fey without a Material component. You can also cast it once without a spell slot, and you regain the ability to cast it in this way when you finish a Long Rest.
          Whenever you start casting the spell, you can modify it so that it doesn't require Concentration. If you do so, the spell's duration becomes 1 minute for that casting.`,
      },
      {
        name: "Misty Wanderer",
        level: 15,
        description: `You can cast Misty Step without expending a spell slot. You can do so a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.
In addition, whenever you cast Misty Step, you can bring along one willing creature you can see within 5 feet of yourself. That creature teleports to an unoccupied space of your choice within 5 feet of your destination space.`,
      },
    ],
  },
  {
    key: "gloom-stalker",
    name: "Gloom Stalker",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Gloom Stalkers are at home in the darkest places, wielding magic drawn from the Shadowfell to combat enemies that lurk in darkness.`,
      },
      {
        name: "Dread Ambusher",
        level: 3,
        description: `You have mastered the art of creating fearsome ambushes, granting you the following benefits.
Ambusher's Leap. At the start of your first turn of each combat, your Speed increases by 10 feet until the end of that turn.
Dreadful Strike. When you attack a creature and hit it with a weapon, you can deal an extra 2d6 Psychic damage. You can use this benefit only once per turn, you can use it a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.
Initiative Bonus. When you roll Initiative, you can add your Wisdom modifier to the roll.`,
      },
      {
        name: "Gloom Stalker Spells",
        level: 3,
        description: `When you reach a Ranger level specified in the Gloom Stalker Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          title: "Gloom Stalker Spells",
          rows: [
            ["Ranger Level", "Spells"],
            ["3rd", "Disguise Self"],
            ["5th", "Rope Trick"],
            ["9th", "Fear"],
            ["13th", "Greater Invisibility"],
            ["17th", "Seeming"],
          ],
        },
      },
      {
        name: "Umbral Sight",
        level: 3,
        description: `You gain Darkvision with a range of 60 feet. If you already have Darkvision when you gain this feature, its range increases by 60 feet.
You are also adept at evading creatures that rely on Darkvision. While entirely in Darkness, you have the Invisible condition to any creature that relies on Darkvision to see you in that Darkness.`,
      },
      {
        name: "Iron Mind",
        level: 7,
        description: `You have honed your ability to resist mind-altering powers. You gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice).`,
      },
      {
        name: "Stalker's Flurry",
        level: 11,
        description: `The Psychic damage of your Dreadful Strike becomes 2d8. In addition, when you use the Dreadful Strike effect of your Dread Ambusher feature, you can cause one of the following additional effects.
Sudden Strike. You can make another attack with the same weapon against a different creature that is within 5 feet of the original target and that is within the weapon's range.
Mass Fear. The target and each creature within 10 feet of it must make a Wisdom saving throw against your spell save DC. On a failed save, a creature has the Frightened condition until the start of your next turn.`,
      },
      {
        name: "Shadowy Dodge",
        level: 15,
        description: `When a creature makes an attack roll against you, you can take a Reaction to impose Disadvantage on that roll. Whether the attack hits or misses, you can then teleport up to 30 feet to an unoccupied space you can see.`,
      },
    ],
  },
  {
    key: "horizon-walker",
    name: "Horizon Walker",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `Horizon Walkers guard the world against threats that originate from other planes or that seek to ravage the mortal realm with otherworldly magic. They seek out planar portals and keep watch over them, venturing to the Inner Planes and the Outer Planes as needed to pursue their foes. These rangers are also friends to any forces in the multiverse—especially benevolent dragons, fey, and elementals—that work to preserve life and the order of the planes.`,
      },
      {
        name: "Horizon Walker Magic",
        level: 3,
        description: `Starting at 3rd level, you learn an additional spell when you reach certain levels in this class, as shown in the Horizon Walker Spells table. The spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.`,
        table: {
          title: "Horizon Walker Spells",
          rows: [
            ["Ranger Level", "Spells"],
            ["3rd", "Protection from Evil and Good"],
            ["5th", "Misty Step"],
            ["9th", "Haste"],
            ["13th", "Banishment"],
            ["17th", "Teleportation Circle"],
          ],
        },
      },
      {
        name: "Detect Portal",
        level: 3,
        description: `At 3rd level, you gain the ability to magically sense the presence of a planar portal. As an action, you detect the distance and direction to the closest planar portal within 1 mile of you.
Once you use this feature, you can't use it again until you finish a short or long rest.
See the "Planar Travel" section in chapter 2 of the Dungeon Master's Guide for examples of planar portals.`,
      },
      {
        name: "Planar Warrior",
        level: 3,
        description: `At 3rd level, you learn to draw on the energy of the multiverse to augment your attacks.
As a bonus action, choose one creature you can see within 30 feet of you. The next time you hit that creature on this turn with a weapon attack, all damage dealt by the attack becomes force damage, and the creature takes an extra 1d8 force damage from the attack. When you reach 11th level in this class, the extra damage increases to 2d8.`,
      },
      {
        name: "Ethereal Step",
        level: 7,
        description: `At 7th level, you learn to step through the Ethereal Plane. As a bonus action, you can cast the etherealness spell with this feature, without expending a spell slot, but the spell ends at the end of the current turn.
Once you use this feature, you can't use it again until you finish a short or long rest.`,
      },
      {
        name: "Distant Strike",
        level: 11,
        description: `At 11th level, you gain the ability to pass between the planes in the blink of an eye. When you take the Attack action, you can teleport up to 10 feet before each attack to an unoccupied space you can see.
If you attack at least two different creatures with the action, you can make one additional attack with it against a third creature.`,
      },
      {
        name: "Spectral Defense",
        level: 15,
        description: `At 15th level, your ability to move between planes enables you to slip through the planar boundaries to lessen the harm done to you during battle. When you take damage from an attack, you can use your reaction to give yourself resistance to all of that attack's damage on this turn.`,
      },
    ],
  },
  {
    key: "hunter",
    name: "Hunter",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `You stalk prey in the wilds and elsewhere, using your abilities as a Hunter to protect nature and people everywhere from forces that would destroy them.`,
      },
      {
        name: "Hunter's Prey",
        level: 3,
        description: `You gain one of the following feature options of your choice. Whenever you finish a Short or Long Rest, you can replace the chosen option with the other one.
Colossus Slayer. Your tenacity can wear down even the most resilient foes. When you hit a creature with a weapon, the weapon deals an extra 1d8 damage to the target if it's missing any of its Hit Points. You can deal this extra damage only once per turn.
Horde Breaker. Once on each of your turns when you make an attack with a weapon, you can make another attack with the same weapon against a different creature that is within 5 feet of the original target, that is within the weapon's range, and that you haven't attacked this turn.`,
      },
      {
        name: "Hunter's Lore",
        level: 3,
        description: `You can call on the forces of nature to reveal certain strengths and weaknesses of your prey. While a creature is marked by your Hunter's Mark, you know whether that creature has any Immunities, Resistances, or Vulnerabilities, and if the creature has any, you know what they are.`,
      },
      {
        name: "Defensive Tactics",
        level: 7,
        description: `You gain one of the following feature options of your choice. Whenever you finish a Short or Long Rest, you can replace the chosen option with the other one.
Escape the Horde. Opportunity Attacks have Disadvantage against you.
Multiattack Defense. When a creature hits you with an attack roll, that creature has Disadvantage on all other attack rolls against you this turn.`,
      },
      {
        name: "Superior Hunter's Prey",
        level: 11,
        description: `Once per turn when you deal damage to a creature marked by your Hunter's Mark, you can also deal that spell's extra damage to a different creature that you can see within 30 feet of the first creature.`,
      },
      {
        name: "Superior Hunter's Defense",
        level: 15,
        description: `When you take damage, you can take a Reaction to give yourself Resistance to that damage and any other damage of the same type until the end of the current turn.`,
      },
    ],
  },
  {
    key: "monster-slayer",
    name: "Monster Slayer",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `You have dedicated yourself to hunting down creatures of the night and wielders of grim magic. A Monster Slayer seeks out vampires, dragons, evil fey, fiends, and other magical threats. Trained in supernatural techniques to overcome such monsters, slayers are experts at unearthing and defeating mighty, mystical foes.`,
      },
      {
        name: "Monster Slayer Magic",
        level: 3,
        description: `Starting at 3rd level, you learn an additional spell when you reach certain levels in this class, as shown in the Monster Slayer Spells table. The spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.`,
        table: {
          title: "Monster Slayer Spells",
          rows: [
            ["Ranger Level", "Spells"],
            ["3rd", "protection from evil and good"],
            ["5th", "zone of truth"],
            ["9th", "magic circle"],
            ["13th", "banishment"],
            ["17th", "hold monster"],
          ],
        },
      },
      {
        name: "Hunter's Sense",
        level: 3,
        description: `At 3rd level, you gain the ability to peer at a creature and magically discern how best to hurt it. As an action, choose one creature you can see within 60 feet of you. You immediately learn whether the creature has any damage immunities, resistances, or vulnerabilities and what they are. If the creature is hidden from divination magic, you sense that it has no damage immunities, resistances, or vulnerabilities.
You can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses of it when you finish a long rest.`,
      },
      {
        name: "Slayer's Prey",
        level: 3,
        description: `Starting at 3rd level, you can focus your ire on one foe, increasing the harm you inflict on it. As a bonus action, you designate one creature you can see within 60 feet of you as the target of this feature. The first time each turn that you hit that target with a weapon attack, it takes an extra 1d6 damage from the weapon.
This benefit lasts until you finish a short or long rest. It ends early if you designate a different creature.`,
      },
      {
        name: "Supernatural Defense",
        level: 7,
        description: `At 7th level, you gain extra resilience against your prey's assaults on your mind and body. Whenever the target of your Slayer's Prey forces you to make a saving throw and whenever you make an ability check to escape that target's grapple, add 1d6 to your roll.`,
      },
      {
        name: "Magic-User's Nemesis",
        level: 11,
        description: `At 11th level, you gain the ability to thwart someone else's magic. When you see a creature casting a spell or teleporting within 60 feet of you, you can use your reaction to try to magically foil it. The creature must succeed on a Wisdom saving throw against your spell save DC, or its spell or teleport fails and is wasted.
Once you use this feature, you can't use it again until you finish a short or long rest.`,
      },
      {
        name: "Slayer's Counter",
        level: 15,
        description: `At 15th level, you gain the ability to counterattack when your prey tries to sabotage you. If the target of your Slayer's Prey forces you to make a saving throw, you can use your reaction to make one weapon attack against the quarry. You make this attack immediately before making the saving throw. If your attack hits, your save automatically succeeds, in addition to the attack's normal effects.`,
      },
    ],
  },
  {
    key: "swarmkeeper",
    name: "Swarmkeeper",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `Feeling a deep connection to the environment around them, some rangers reach out through their magical connection to the world and bond with a swarm of nature spirits. The swarm becomes a potent force in battle, as well as helpful company for the ranger. Some Swarmkeepers are outcasts or hermits, keeping to themselves and their attendant swarms rather than dealing with the discomfort of others. Other Swarmkeepers enjoy building vibrant communities that work for the mutual benefit of all those they consider part of their swarm.`,
      },
      {
        name: "Gathered Swarm",
        level: 3,
        description: `3rd-level Swarmkeeper feature
        A swarm of intangible nature spirits has bonded itself to you and can assist you in battle. While you're alive, the swarm remains in your space, crawling on you or flying and skittering around you within your space. You determine its appearance, or you generate its appearance by rolling on the Swarm Appearance table.`,
        table: {
          title: "Swarm Appearance",
          rows: [
            ["d4", "Appearance"],
            ["1", "Swarming insects"],
            ["2", "Miniature twig blights"],
            ["3", "Fluttering birds"],
            ["4", "Playful pixies"],
          ],
        },
        description2: `Once on each of your turns, you can cause the swarm to assist you in one of the following ways, immediately after you hit a creature with an attack:`,
        list: [
          "The attack's target takes 1d6 piercing damage from the swarm.",
          "The attack's target must succeed on a Strength saving throw against your spell save DC or be moved by the swarm up to 15 feet horizontally in a direction of your choice.",
          "You are moved by the swarm 5 feet horizontally in a direction of your choice.",
        ],
        note: `It's Your Swarm
A Swarmkeeper's swarm and spells are reflections of the character's bond with nature spirits. Take the opportunity to describe the swarm and the ranger's magic in play. For example, when your ranger casts gaseous form, they might appear to melt into the swarm, instead of a cloud of mist, or the arcane eye spell could create an extension of your swarm that spies for you. Such descriptions don't change the effects of spells, but they are an exciting opportunity to explore your character's narrative through their class abilities. For more guidance on customizing spells, see the "Personalizing Spells" section in chapter 3.
Also, remember that the swarm's appearance is yours to customize, and don't feel confined to a single appearance. Perhaps the spirits' look changes with the ranger's mood or with the seasons. You decide!`,
      },
      {
        name: "Swarmkeeper Magic",
        level: 3,
        description: `3rd-level Swarmkeeper feature
        You learn the mage hand cantrip if you don't already know it. When you cast it, the hand takes the form of your swarming nature spirits.
You also learn an additional spell of 1st level or higher when you reach certain levels in this class, as shown in the Swarmkeeper Spells table. Each spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.`,
        table: {
          title: "Swarmkeeper Spells",
          rows: [
            ["Ranger Level", "Spells"],
            ["3rd", "faerie fire"],
            ["5th", "web"],
            ["9th", "gaseous form"],
            ["13th", "arcane eye"],
            ["17th", "insect plague"],
          ],
        },
      },
      {
        name: "Writhing Tide",
        level: 7,
        description: `7th-level Swarmkeeper feature
        You can condense part of your swarm into a focused mass that lifts you up. As a bonus action, you gain a flying speed of 10 feet and can hover. This effect lasts for 1 minute or until you are incapacitated.
You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Mighty Swarm",
        level: 11,
        description: `11th-level Swarmkeeper feature
        Your Gathered Swarm grows mightier in the following ways:`,
        list: [
          "The damage of Gathered Swarm increases to 1d8.",
          "If a creature fails its saving throw against being moved by Gathered Swarm, you can also cause the swarm to knock the creature prone.",
          "When you are moved by Gathered Swarm, it gives you half cover until the start of your next turn.",
        ],
      },
      {
        name: "Swarming Dispersal",
        level: 15,
        description: `15th-level Swarmkeeper feature
        You can discorporate into your swarm, avoiding danger. When you take damage, you can use your reaction to give yourself resistance to that damage. You vanish into your swarm and then teleport to an unoccupied space that you can see within 30 feet of you, where you reappear with the swarm.
You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
    ],
  },
];

export default rangerSubclass;
