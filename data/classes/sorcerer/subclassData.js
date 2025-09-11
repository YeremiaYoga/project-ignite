const sorcererSubclass = [
  {
    key: "aberrant",
    name: "Aberrant Sorcery",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Wield Unnatural Psionic Power.  
An alien influence has wrapped its tendrils around your mind, giving you psionic power. You can now touch other minds with that power and alter the world around you. Will this power shine from you as a hopeful beacon to others? Or will you be a terror to those who feel the stab of your mind?
Perhaps a psychic wind from the Astral Plane carried psionic energy to you, or you were exposed to the Far Realm's warping influence. Alternatively, you were implanted with a mind flayer tadpole, but your transformation into a mind flayer never occurred; now the tadpole's psionic power is yours. However you acquired this power, your mind is aflame with it.`,
      },
      {
        name: "Psionic Spells",
        level: 3,
        description: `When you reach a Sorcerer level specified in the Psionic Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          headers: ["Sorcerer Level", "Spells"],
          rows: [
            [
              "3rd",
              "Arms of Hadar, Calm Emotions, Detect Thoughts, Dissonant Whispers, Mind Sliver",
            ],
            ["5th", "Hunger of Hadar, Sending"],
            ["7th", "Evard's Black Tentacles, Summon Aberration"],
            ["9th", "Rary's Telepathic Bond, Telekinesis"],
          ],
        },
      },
      {
        name: "Telepathic Speech",
        level: 3,
        description: `You can form a telepathic connection between your mind and the mind of another. As a Bonus Action, choose one creature you can see within 30 feet of yourself. You and the chosen creature can communicate telepathically with each other while the two of you are within a number of miles of each other equal to your Charisma modifier (minimum of 1 mile). To understand each other, you each must mentally use a language the other knows.
The telepathic connection lasts for a number of minutes equal to your Sorcerer level. It ends early if you use this ability to form a connection with a different creature.`,
      },
      {
        name: "Psionic Sorcery",
        level: 6,
        description: `When you cast any level 1+ spell from your Psionic Spells feature, you can cast it by expending a spell slot as normal or by spending a number of Sorcery Points equal to the spell's level. If you cast the spell using Sorcery Points, it requires no Verbal or Somatic components, and it requires no Material components unless they are consumed by the spell or have a cost specified in it.`,
      },
      {
        name: "Psychic Defenses",
        level: 6,
        description: `You have Resistance to Psychic damage, and you have Advantage on saving throws to avoid or end the Charmed or Frightened condition.`,
      },
      {
        name: "Revelation in Flesh",
        level: 14,
        description: `You can unleash the aberrant truth hidden within yourself. As a Bonus Action, you can spend 1 Sorcery Point or more to magically alter your body for 10 minutes. For each Sorcery Point you spend, you gain one of the following benefits of your choice, the effects of which last until the alteration ends.
Aquatic Adaptation. You gain a Swim Speed equal to twice your Speed, and you can breathe underwater. Gills grow from your neck or flare behind your ears, and your fingers become webbed or you grow wriggling cilia.
Glistening Flight. You gain a Fly Speed equal to your Speed, and you can hover. As you fly, your skin glistens with mucus or otherworldly light.
See the Invisible. You can see any Invisible creature within 60 feet of yourself that isn't behind Total Cover. Your eyes also turn black or become writhing sensory tendrils.
Wormlike Movement. Your body, along with any equipment you are wearing or carrying, becomes slimy and pliable. You can move through any space as narrow as 1 inch, and you can spend 5 feet of movement to escape from nonmagical restraints or the Grappled condition.`,
      },
      {
        name: "Warping Implosion",
        level: 18,
        description: `You can unleash a space-warping anomaly. As a Magic action, you teleport to an unoccupied space you can see within 120 feet of yourself. Immediately after you disappear, each creature within 30 feet of the space you left must make a Strength saving throw against your spell save DC. On a failed save, a creature takes 3d10 Force damage and is pulled straight toward the space you left, ending in an unoccupied space as close to your former space as possible. On a successful save, the creature takes half as much damage only.
Once you use this feature, you can't do so again until you finish a Long Rest unless you spend 5 Sorcery Points (no action required) to restore your use of it.`,
      },
    ],
  },
  {
    key: "clockwork",
    name: "Clockwork Sorcery",
    source: "PHB'24",
    features: [
      {
        name: "Clockwork Sorcery",
        level: 3,
        description: `Channel Cosmic Forces of Order.  
The cosmic force of order has suffused you with magic. That power arises from Mechanus or a realm like it—a plane of existence shaped entirely by clockwork efficiency. You or someone from your lineage might have become entangled in the machinations of modrons, the orderly beings who inhabit Mechanus. Perhaps your ancestor even took part in the Great Modron March. Whatever its origin within you, the power of order can seem strange to others, but for you, it's part of a vast and glorious system.`,
      },
      {
        name: "Clockwork Spells",
        level: 3,
        description: `When you reach a Sorcerer level specified in the Clockwork Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          headers: ["Sorcerer Level", "Spells"],
          rows: [
            [
              "3rd",
              "Aid, Alarm, Lesser Restoration, Protection from Evil and Good",
            ],
            ["5th", "Dispel Magic, Protection From Energy"],
            ["7th", "Freedom of Movement, Summon Construct"],
            ["9th", "Greater Restoration, Wall of Force"],
          ],
        },
      },
      {
        name: "Manifestations of Order",
        level: 3,
        description: `Consult the Manifestations of Order table and choose or randomly determine a way your connection to order manifests while you are casting any of your Sorcerer spells.`,
        table: {
          headers: ["1d6", "Manifestation"],
          rows: [
            ["1", "Spectral cogwheels hover behind you."],
            ["2", "The hands of a clock spin in your eyes."],
            ["3", "Your skin glows with a brassy sheen."],
            [
              "4",
              "Floating equations and geometric objects overlay your body.",
            ],
            [
              "5",
              "Your Spellcasting Focus temporarily takes the form of a Tiny clockwork mechanism.",
            ],
            [
              "6",
              "The ticking of gears or ringing of a clock can be heard by you and those affected by your magic.",
            ],
          ],
        },
      },
      {
        name: "Restore Balance",
        level: 3,
        description: `Your connection to the plane of absolute order allows you to equalize chaotic moments. When a creature you can see within 60 feet of yourself is about to roll a d20 with Advantage or Disadvantage, you can take a Reaction to prevent the roll from being affected by Advantage and Disadvantage.
You can use this feature a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.`,
      },
      {
        name: "Bastion of Law",
        level: 6,
        description: `You can tap into the grand equation of existence to imbue a creature with a shimmering shield of order. As a Magic action, you can expend 1 to 5 Sorcery Points to create a magical ward around yourself or another creature you can see within 30 feet of yourself. The ward is represented by a number of d8s equal to the number of Sorcery Points spent to create it. When the warded creature takes damage, it can expend a number of those dice, roll them, and reduce the damage taken by the total rolled on those dice.
The ward lasts until you finish a Long Rest or until you use this feature again.`,
      },
      {
        name: "Trance of Order",
        level: 14,
        description: `You gain the ability to align your consciousness with the endless calculations of Mechanus. As a Bonus Action, you can enter this state for 1 minute. For the duration, attack rolls against you can't benefit from Advantage, and whenever you make a D20 Test, you can treat a roll of 9 or lower on the d20 as a 10.
Once you use this feature, you can't use it again until you finish a Long Rest unless you spend 5 Sorcery Points (no action required) to restore your use of it.`,
      },
      {
        name: "Clockwork Cavalcade",
        level: 18,
        description: `You momentarily summon spirits of order to expunge disorder around you. As a Magic action, you summon the spirits in a 30-foot Cube originating from you. The spirits look like modrons or other Constructs of your choice. The spirits are intangible and invulnerable, and they create the effects below within the Cube before vanishing. Once you use this action, you can't use it again until you finish a Long Rest unless you spend 7 Sorcery Points (no action required) to restore your use of it.
Heal. The spirits restore up to 100 Hit Points, divided as you choose among any number of creatures of your choice in the Cube.
Repair. Any damaged objects entirely in the Cube are repaired instantly.
Dispel. Every spell of level 6 and lower ends on creatures and objects of your choice in the Cube.`,
      },
    ],
  },
  {
    key: "divine-soul",
    name: "Divine Soul",
    source: "XGE",
    features: [
      {
        name: "Divine Soul",
        level: 3,
        description: `Sometimes the spark of magic that fuels a sorcerer comes from a divine source that glimmers within the soul. Having such a blessed soul is a sign that your innate magic might come from a distant but powerful familial connection to a divine being. Perhaps your ancestor was an angel, transformed into a mortal and sent to fight in a god's name.
Or your birth might align with an ancient prophecy, marking you as a servant of the gods or a chosen vessel of divine magic. A Divine Soul, with a natural magnetism, is seen as a threat by some religious hierarchies. As an outsider who commands sacred power, a Divine Soul can undermine an existing order by claiming a direct tie to the divine.
In some cultures, only those who can claim the power of a Divine Soul may command religious power. In these lands, ecclesiastical positions are dominated by a few bloodlines and preserved over generations.`,
      },
      {
        name: "Divine Magic",
        level: 3,
        description: `Your link to the divine allows you to learn spells from the cleric class. When your Spellcasting feature lets you learn or replace a sorcerer cantrip or a sorcerer spell of 1st level or higher, you can choose the new spell from the cleric spell list or the sorcerer spell list. You must otherwise obey all the restrictions for selecting the spell, and it becomes a sorcerer spell for you.
In addition, choose an affinity for the source of your divine power: good, evil, law, chaos, or neutrality. You learn an additional spell based on that affinity. It is a sorcerer spell for you, but it doesn't count against your number of sorcerer spells known. If you later replace this spell, you must replace it with a spell from the cleric spell list.`,
        table: {
          headers: ["Affinity", "Spell"],
          rows: [
            ["Good", "cure wounds"],
            ["Evil", "inflict wounds"],
            ["Law", "bless"],
            ["Chaos", "bane"],
            ["Neutrality", "protection from evil and good"],
          ],
        },
      },
      {
        name: "Favored by the Gods",
        level: 3,
        description: `Starting at 1st level, divine power guards your destiny. If you fail a saving throw or miss with an attack roll, you can roll 2d4 and add it to the total, possibly changing the outcome. Once you use this feature, you can't use it again until you finish a Short or Long Rest.`,
      },
      {
        name: "Empowered Healing",
        level: 6,
        description: `Starting at 6th level, the divine energy coursing through you can empower healing spells. Whenever you or an ally within 5 feet of you rolls dice to determine the number of hit points a spell restores, you can spend 1 Sorcery Point to reroll any number of those dice once, provided you aren't incapacitated. You can use this feature only once per turn.`,
      },
      {
        name: "Otherworldly Wings",
        level: 14,
        description: `Starting at 14th level, you can use a Bonus Action to manifest a pair of spectral wings from your back. While the wings are present, you have a flying speed of 30 feet. The wings last until you're incapacitated, you die, or you dismiss them as a Bonus Action.
The affinity you chose for your Divine Magic feature determines the appearance of the spectral wings: eagle wings for good or law, bat wings for evil or chaos, and dragonfly wings for neutrality.`,
      },
      {
        name: "Unearthly Recovery",
        level: 18,
        description: `At 18th level, you gain the ability to overcome grievous injuries. As a Bonus Action when you have fewer than half of your hit points remaining, you can regain a number of hit points equal to half your hit point maximum.
Once you use this feature, you can't use it again until you finish a Long Rest.`,
      },
    ],
  },
  {
    key: "draconic",
    name: "Draconic Sorcery",
    source: "PHB'24",
    features: [
      {
        name: "Draconic Sorcery",
        level: 3,
        description: `Breathe the Magic of Dragons.  
Your innate magic comes from the gift of a dragon. Perhaps an ancient dragon facing death bequeathed some of its magical power to you or your ancestor. You might have absorbed magic from a site infused with dragons' power. Or perhaps you handled a treasure taken from a dragon's hoard that was steeped in draconic power. Or you might have a dragon for an ancestor.`,
      },
      {
        name: "Draconic Resilience",
        level: 3,
        description: `The magic in your body manifests physical traits of your draconic gift. Your Hit Point maximum increases by 3, and it increases by 1 whenever you gain another Sorcerer level.
Parts of you are also covered by dragon-like scales. While you aren't wearing armor, your base Armor Class equals 10 plus your Dexterity and Charisma modifiers.`,
      },
      {
        name: "Draconic Spells",
        level: 3,
        description: `When you reach a Sorcerer level specified in the Draconic Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          headers: ["Sorcerer Level", "Spells"],
          rows: [
            ["3rd", "Alter Self, Chromatic Orb, Command, Dragon's Breath"],
            ["5th", "Fear, Fly"],
            ["7th", "Arcane Eye, Charm Monster"],
            ["9th", "Legend Lore, Summon Dragon"],
          ],
        },
      },
      {
        name: "Elemental Affinity",
        level: 6,
        description: `Your draconic magic has an affinity with a damage type associated with dragons. Choose one of those types: Acid, Cold, Fire, Lightning, or Poison.
You have Resistance to that damage type, and when you cast a spell that deals damage of that type, you can add your Charisma modifier to one damage roll of that spell.`,
      },
      {
        name: "Dragon Wings",
        level: 14,
        description: `As a Bonus Action, you can cause draconic wings to appear on your back. The wings last for 1 hour or until you dismiss them (no action required). For the duration, you have a Fly Speed of 60 feet.
Once you use this feature, you can't use it again until you finish a Long Rest unless you spend 3 Sorcery Points (no action required) to restore your use of it.`,
      },
      {
        name: "Dragon Companion",
        level: 18,
        description: `You can cast Summon Dragon without a Material component. You can also cast it once without a spell slot, and you regain the ability to cast it in this way when you finish a Long Rest.
Whenever you start casting the spell, you can modify it so that it doesn't require Concentration. If you do so, the spell's duration becomes 1 minute for that casting.`,
      },
    ],
  },
  {
    key: "lunar",
    name: "Lunar Sorcery",
    source: "DSoTDQ",
    features: [
      {
        name: "Lunar Sorcery",
        level: 3,
        description: `1st-Level Lunar Sorcery Feature
        On many worlds, the moon is a revered celestial body with magical properties. On Krynn, the gods of magic are associated with the world's three moons. On the world of Toril, the god Selûne uses the light of the moon to battle darkness. On Eberron, scholars of the Draconic Prophecy decipher ancient secrets from the waxing and waning of that world's twelve moons.
You or someone from your lineage has been exposed to the concentrated magic of the moon (or moons) of your world, imbuing you with lunar magic. Perhaps your ancestor was involved in a druidic ritual involving an eclipse, or maybe a mystical fragment of a moon crashed near you. However you came to have your magic, your connection to the moon is obvious when you cast sorcerer spells—perhaps making your pupils glow with the color of a moon from your world, causing spectral manifestations of lunar phases to orbit you, or some other effect.`,
      },
      {
        name: "Lunar Embodiment",
        level: 3,
        description: `1st-Level Lunar Sorcery Feature
        You learn additional spells when you reach certain levels in this class, as shown on the Lunar Spells table. Each of these spells counts as a sorcerer spell for you, but it doesn't count against the number of sorcerer spells you know.
Whenever you finish a long rest, you can choose what lunar phase manifests its power through your magic: Full Moon, New Moon, or Crescent Moon. While in the chosen phase, you can cast one 1st-level spell of the associated phase in the Lunar Spells table once without expending a spell slot. Once you cast a spell in this way, you can't do so again until you finish a long rest.`,
        table: {
          headers: [
            "Sorcerer Level",
            "Full Moon Spell",
            "New Moon Spell",
            "Crescent Moon Spell",
          ],
          rows: [
            ["1st", "shield", "ray of sickness", "color spray"],
            ["3rd", "lesser restoration", "blindness/deafness", "alter self"],
            ["5th", "dispel magic", "vampiric touch", "phantom steed"],
            ["7th", "death ward", "confusion", "hallucinatory terrain"],
            ["9th", "Rary's telepathic bond", "hold monster", "mislead"],
          ],
        },
      },
      {
        name: "Moon Fire",
        level: 3,
        description: `1st-Level Lunar Sorcery Feature
        You can call down the radiant light of the moon on command. You learn the sacred flame spell, which doesn't count against the number of sorcerer cantrips you know. When you cast the spell, you can target one creature as normal or target two creatures within range that are within 5 feet of each other.`,
      },
      {
        name: "Lunar Boons",
        level: 6,
        description: `6th-Level Lunar Sorcery Feature
        The current phase of your Lunar Embodiment can affect your Metamagic feature. Each Lunar Embodiment phase is associated with certain schools of magic, as shown here:
Full Moon. Abjuration and divination spells  
New Moon. Enchantment and necromancy spells  
Crescent Moon. Illusion and transmutation spells  
Whenever you use Metamagic on a spell of a school of magic associated with your current Lunar Embodiment phase, you can reduce the sorcery points spent by 1 (minimum 0). You can reduce the sorcery points spent for your Metamagic a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Waxing and Waning",
        level: 6,
        description: `6th-Level Lunar Sorcery Featur
        You gain greater control over the phases of your lunar magic. As a bonus action, you can spend 1 sorcery point to change your current Lunar Embodiment phase to a different one.
You can now cast one 1st-level spell from each lunar phase of the Lunar Spells table once without expending a spell slot, provided your current phase is the same as the lunar phase spell. Once you cast a lunar phase spell in this way, you can't do so again until you finish a long rest.`,
      },
      {
        name: "Lunar Empowerment",
        level: 14,
        description: `14th-Level Lunar Sorcery Feature
        The power of a lunar phase saturates your being. While you are in a Lunar Embodiment phase, you also gain the following benefit associated with that phase:
Full Moon. You can use a bonus action to shed bright light in a 10-foot radius and dim light for an additional 10 feet or to douse the light. In addition, you and creatures of your choice have advantage on Intelligence (Investigation) and Wisdom (Perception) checks while within the bright light you shed.  
New Moon. You have advantage on Dexterity (Stealth) checks. In addition, while you are entirely in darkness, attack rolls have disadvantage against you.  
Crescent Moon. You have resistance to necrotic and radiant damage.`,
      },
      {
        name: "Lunar Phenomenon",
        level: 18,
        description: `18th-Level Lunar Sorcery feature
        As a bonus action, you can tap into a special power of your current Lunar Embodiment phase. Alternatively, as part of the bonus action you take to change your lunar phase using the Waxing and Waning feature, you can immediately use the power of the lunar phase you are entering:
Full Moon. You radiate moonlight for a moment. Each creature of your choice within 30 feet of you must succeed on a Constitution saving throw against your spell save DC or be blinded until the end of its next turn. In addition, one creature of your choice in that area regains 3d8 hit points.  
New Moon. You momentarily emanate gloom. Each creature of your choice within 30 feet of you must succeed on a Dexterity saving throw against your spell save DC or take 3d10 necrotic damage and have its speed reduced to 0 until the end of its next turn. In addition, you become invisible until the end of your next turn, or until immediately after you make an attack roll or cast a spell.  
Crescent Moon. You can magically teleport to an unoccupied space you can see within 60 feet of yourself. You can bring along one willing creature you can see within 5 feet of yourself. That creature teleports to an unoccupied space of your choice that you can see within 5 feet of your destination space. In addition, you and that creature gain resistance to all damage until the start of your next turn.
Once you use one of these bonus action benefits, you can't use that benefit again until you finish a long rest, unless you spend 5 sorcery points to use it again.`,
      },
    ],
  },
  {
    key: "shadow",
    name: "Shadow Magic",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `You are a creature of shadow, for your innate magic comes from the Shadowfell itself. You might trace your lineage to an entity from that place, or perhaps you were exposed to its fell energy and transformed by it.
The power of shadow magic casts a strange pall over your physical presence. The spark of life that sustains you is muffled, as if it struggles to remain viable against the dark energy that imbues your soul. At your option, you can pick from or roll on the Shadow Sorcerer Quirks table to create a quirk for your character.`,
      },
      {
        name: "Shadow Sorcerer Quirks",
        level: 1,
        table: {
          headers: ["d6", "Quirk"],
          rows: [
            ["1", "You are always icy cold to the touch."],
            [
              "2",
              "When you are asleep, you don't appear to breathe (though you must still breathe to survive).",
            ],
            ["3", "You barely bleed, even when badly injured."],
            [
              "4",
              "Your heart beats once per minute. This event sometimes surprises you.",
            ],
            [
              "5",
              "You have trouble remembering that living creatures and corpses should be treated differently.",
            ],
            ["6", "You blinked. Once. Last week."],
          ],
        },
      },
      {
        name: "Eyes of the Dark",
        level: 3,
        description: `Starting at 1st level, you have darkvision with a range of 120 feet.
When you reach 3rd level in this class, you learn the darkness spell, which doesn't count against your number of sorcerer spells known. In addition, you can cast it by spending 2 sorcery points or by expending a spell slot. If you cast it with sorcery points, you can see through the darkness created by the spell.`,
      },
      {
        name: "Strength of the Grave",
        level: 3,
        description: `Starting at 1st level, your existence in a twilight state between life and death makes you difficult to defeat. When damage reduces you to 0 hit points, you can make a Charisma saving throw (DC 5 + the damage taken). On a success, you instead drop to 1 hit point. You can't use this feature if you are reduced to 0 hit points by radiant damage or by a critical hit.
After the saving throw succeeds, you can't use this feature again until you finish a long rest.`,
      },
      {
        name: "Hound of Ill Omen",
        level: 6,
        description: `At 6th level, you gain the ability to call forth a howling creature of darkness to harass your foes. As a bonus action, you can spend 3 sorcery points to magically summon a hound of ill omen to target one creature you can see within 120 feet of you. The hound uses the dire wolf's statistics (see the Monster Manual or appendix C in the Player's Handbook), with the following changes:`,
        list: [
          "The hound is size Medium, not Large, and it counts as a monstrosity, not a beast.",
          "It appears with a number of temporary hit points equal to half your sorcerer level.",
          "It can move through other creatures and objects as if they were difficult terrain. The hound takes 5 force damage if it ends its turn inside an object.",
          "At the start of its turn, the hound automatically knows its target's location. If the target was hidden, it is no longer hidden from the hound.",
        ],
        description2: `The hound appears in an unoccupied space of your choice within 30 feet of the target. Roll initiative for the hound. On its turn, it can move only toward its target by the most direct route, and it can use its action only to attack its target. The hound can make opportunity attacks, but only against its target. Additionally, while the hound is within 5 feet of the target, the target has disadvantage on saving throws against any spell you cast. The hound disappears if it is reduced to 0 hit points, if its target is reduced to 0 hit points, or after 5 minutes.`,
      },
      {
        name: "Shadow Walk",
        level: 14,
        description: `At 14th level, you gain the ability to step from one shadow into another. When you are in dim light or darkness, as a bonus action, you can magically teleport up to 120 feet to an unoccupied space you can see that is also in dim light or darkness.`,
      },
      {
        name: "Umbral Form",
        level: 18,
        description: `Starting at 18th level, you can spend 6 sorcery points as a bonus action to magically transform yourself into a shadowy form. In this form, you have resistance to all damage except force and radiant damage, and you can move through other creatures and objects as if they were difficult terrain. You take 5 force damage if you end your turn inside an object.
You remain in this form for 1 minute. It ends early if you are incapacitated, if you die, or if you dismiss it as a bonus action.`,
      },
    ],
  },
  {
    key: "storm",
    name: "Storm Sorcery",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `Your innate magic comes from the power of elemental air. Many with this power can trace their magic back to a near-death experience caused by the Great Rain, but perhaps you were born during a howling gale so powerful that folk still tell stories of it, or your lineage might include the influence of potent air creatures such as djinn. Whatever the case, the magic of the storm permeates your being.
Storm sorcerers are invaluable members of a ship's crew. Their magic allows them to exert control over wind and weather in their immediate area. Their abilities also prove useful in repelling attacks by sahuagin, pirates, and other waterborne threats.`,
      },
      {
        name: "Wind Speaker",
        level: 3,
        description: `The arcane magic you command is infused with elemental air. You can speak, read, and write Primordial. Knowing this language allows you to understand and be understood by those who speak its dialects: Aquan, Auran, Ignan, and Terran.`,
      },
      {
        name: "Tempestuous Magic",
        level: 3,
        description: `Starting at 1st level, you can use a bonus action on your turn to cause whirling gusts of elemental air to briefly surround you, immediately before or after you cast a spell of 1st level or higher. Doing so allows you to fly up to 10 feet without provoking opportunity attacks.`,
      },
      {
        name: "Heart of the Storm",
        level: 6,
        description: `At 6th level, you gain resistance to lightning and thunder damage. In addition, whenever you start casting a spell of 1st level or higher that deals lightning or thunder damage, stormy magic erupts from you. This eruption causes creatures of your choice that you can see within 10 feet of you to take lightning or thunder damage (choose each time this ability activates) equal to half your sorcerer level.`,
      },
      {
        name: "Storm Guide",
        level: 6,
        description: `At 6th level, you gain the ability to subtly control the weather around you.
If it is raining, you can use an action to cause the rain to stop falling in a 20-foot-radius sphere centered on you. You can end this effect as a bonus action.
If it is windy, you can use a bonus action each round to choose the direction that the wind blows in a 100-foot-radius sphere centered on you. The wind blows in that direction until the end of your next turn. This feature doesn't alter the speed of the wind.`,
      },
      {
        name: "Storm's Fury",
        level: 14,
        description: `Starting at 14th level, when you are hit by a melee attack, you can use your reaction to deal lightning damage to the attacker. The damage equals your sorcerer level. The attacker must also make a Strength saving throw against your sorcerer spell save DC. On a failed save, the attacker is pushed in a straight line up to 20 feet away from you.`,
      },
      {
        name: "Wind Soul",
        level: 18,
        description: `At 18th level, you gain immunity to lightning and thunder damage.
You also gain a magical flying speed of 60 feet. As an action, you can reduce your flying speed to 30 feet for 1 hour and choose a number of creatures within 30 feet of you equal to 3 + your Charisma modifier. The chosen creatures gain a magical flying speed of 30 feet for 1 hour. Once you reduce your flying speed in this way, you can't do so again until you finish a short or long rest.`,
      },
    ],
  },
  {
    key: "wild-magic",
    name: "Wild Magic Sorcery",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Unleash Chaotic Magic
          Your innate magic stems from the forces of chaos that underlie the order of creation. You or an ancestor might have endured exposure to raw magic, perhaps through a planar portal leading to Limbo or the Elemental Planes. Perhaps you were blessed by a fey being or marked by a demon. Or your magic could be a fluke with no apparent cause. Whatever its source, this magic churns within you, waiting for any outlet.`,
      },
      {
        name: "Wild Magic Surge",
        level: 3,
        description: `Your spellcasting can unleash surges of untamed magic. Once per turn, immediately after you cast a Sorcerer spell with a spell slot, roll 1d20. On a 20, roll on the Wild Magic Surge table to create a magical effect.
If the magical effect is a spell, it is too wild to be affected by your Metamagic.`,
        table: {
          headers: ["1d100", "Effect"],
          rows: [
            [
              "01-04",
              "Roll again at the start of each of your turns for the next minute, ignoring this result on subsequent rolls.",
            ],
            [
              "05-08",
              "A friendly creature appears in a random space within 60 ft (Duodrone, Flumph, Monodrone, or Unicorn). Disappears after 1 minute.",
            ],
            [
              "09-12",
              "For the next minute, you regain 5 Hit Points at the start of each of your turns.",
            ],
            [
              "13-16",
              "Creatures have Disadvantage on saving throws against the next spell you cast in the next minute that involves a saving throw.",
            ],
            [
              "17-20",
              "Random whimsical effect (ethereal music, size increase, feather beard, shouting, butterflies, third eye, pink bubbles, or blue skin).",
            ],
            [
              "21-24",
              "For the next minute, all your spells with a casting time of an action have a casting time of a Bonus Action.",
            ],
            [
              "25-28",
              "You are transported to the Astral Plane until the end of your next turn, then return to the nearest unoccupied space.",
            ],
            [
              "29-32",
              "The next time you cast a damaging spell within the next minute, it deals maximum damage.",
            ],
            ["33-36", "You have Resistance to all damage for the next minute."],
            [
              "37-40",
              "You turn into a potted plant until the start of your next turn. While a plant, you are Incapacitated and Vulnerable to all damage.",
            ],
            [
              "41-44",
              "For the next minute, you can teleport up to 20 feet as a Bonus Action on each of your turns.",
            ],
            [
              "45-48",
              "You and up to three creatures you choose within 30 feet of you gain Invisibility for 1 minute. Ends if a creature attacks, deals damage, or casts a spell.",
            ],
            [
              "49-52",
              "A spectral shield hovers near you for the next minute, granting +2 AC and immunity to Magic Missile.",
            ],
            ["53-56", "You can take one extra action on this turn."],
            [
              "57-60",
              "You cast a random spell (Confusion, Fireball, Fog Cloud, Fly, Grease, Levitate, Magic Missile L5, Mirror Image, Polymorph, See Invisibility). It doesn’t require Concentration.",
            ],
            [
              "61-64",
              "For the next minute, any flammable nonmagical object you touch ignites.",
            ],
            [
              "65-68",
              "If you die within the next hour, you immediately revive as if by the Reincarnate spell.",
            ],
            [
              "69-72",
              "You have the Frightened condition until the end of your next turn.",
            ],
            [
              "73-76",
              "You teleport up to 60 feet to an unoccupied space you can see.",
            ],
            [
              "77-80",
              "A random creature within 60 feet of you has the Poisoned condition for 1d4 hours.",
            ],
            [
              "81-84",
              "You radiate bright light in a 30 ft radius for 1 minute. Any creature ending its turn within 5 ft of you is Blinded until end of next turn.",
            ],
            [
              "85-88",
              "Up to three creatures you choose within 30 feet take 1d10 Necrotic damage. You regain Hit Points equal to the total damage dealt.",
            ],
            [
              "89-92",
              "Up to three creatures you choose within 30 feet take 4d10 Lightning damage.",
            ],
            [
              "93-96",
              "You and all creatures within 30 feet of you have Vulnerability to Piercing damage for the next minute.",
            ],
            [
              "97-00",
              "Roll 1d6: (1) regain 2d10 HP, (2) ally regains 2d10 HP, (3) regain lowest-level expended spell slot, (4) ally regains lowest-level expended spell slot, (5) regain all Sorcery Points, (6) all results of row 17–20 happen simultaneously.",
            ],
          ],
        },
      },
      {
        name: "Tides of Chaos",
        level: 3,
        description: `You can manipulate chaos itself to give yourself Advantage on one D20 Test before you roll the d20. Once you do so, you must cast a Sorcerer spell with a spell slot or finish a Long Rest before you can use this feature again.
If you do cast a Sorcerer spell with a spell slot before you finish a Long Rest, you automatically roll on the Wild Magic Surge table.`,
      },
      {
        name: "Bend Luck",
        level: 6,
        description: `Immediately after another creature you can see rolls the d20 for a D20 Test, you can take a Reaction and spend 1 Sorcery Point to roll 1d4 and apply the number rolled as a bonus or penalty (your choice) to the d20 roll.`,
      },
      {
        name: "Controlled Chaos",
        level: 14,
        description: `Whenever you roll on the Wild Magic Surge table, you can roll twice and use either number.`,
      },
      {
        name: "Tamed Surge",
        level: 18,
        description: `Immediately after you cast a Sorcerer spell with a spell slot, you can create an effect of your choice from the Wild Magic Surge table instead of rolling on that table. You can choose any effect in the table except for the final row, and if the chosen effect involves a roll, you must make it.
Once you use this feature, you can't do so again until you finish a Long Rest.`,
      },
    ],
  },
];

export default sorcererSubclass;
