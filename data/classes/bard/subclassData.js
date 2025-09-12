const bardSubclass = [
  {
    key: "creation",
    name: "College of Creation",
    source: "TCE",
    features: [
      {
        level: 3,
        title: "",
        description: `This subclass is from a different game edition. For a given subclass feature, you may gain that feature at a different level from the one specified in the subclass feature.
Bards believe the cosmos is a work of art-the creation of the first dragons and gods. That creative work included harmonies that continue to resound through existence today, a power known as the Song of Creation. The bards of the College of Creation draw on that primeval song through dance, music, and poetry, and their teachers share this lesson:
"Before the sun and the moon, there was the Song, and its music awoke the first dawn. Its melodies so delighted the stones and trees that some of them gained a voice of their own. And now they sing too. Learn the Song, students, and you too can teach the mountains to sing and dance."
Dwarves and gnomes often encourage their bards to become students of the Song of Creation. And among dragonborn, the Song of Creation is revered, for legends portray Bahamut and Tiamat-the greatest of dragons-as two of the song's first singers.`,
      },
      {
        level: 3,
        title: "Mote of Potential",
        description: `3rd-level College of Creation feature
Whenever you give a creature a Bardic Inspiration die, you can utter a note from the Song of Creation to create a Tiny mote of potential, which orbits within 5 feet of that creature. The mote is intangible and invulnerable, and it lasts until the Bardic Inspiration die is lost. The mote looks like a musical note, a star, a flower, or another symbol of art or life that you choose.
When the creature uses the Bardic Inspiration die, the mote provides an additional effect based on whether the die benefits an ability check, an attack roll, or a saving throw, as detailed below:
Ability Check. When the creature rolls the Bardic Inspiration die to add it to an ability check, the creature can roll the Bardic Inspiration die again and choose which roll to use, as the mote pops and emits colorful, harmless sparks for a moment.
Attack Roll. Immediately after the creature rolls the Bardic Inspiration die to add it to an attack roll against a target, the mote thunderously shatters. The target and each creature of your choice that you can see within 5 feet of it must succeed on a Constitution saving throw against your spell save DC or take thunder damage equal to the number rolled on the Bardic Inspiration die.
Saving Throw. Immediately after the creature rolls the Bardic Inspiration die and adds it to a saving throw, the mote vanishes with the sound of soft music, causing the creature to gain temporary hit points equal to the number rolled on the Bardic Inspiration die plus your Charisma modifier (minimum of 1 temporary hit point).`,
      },
      {
        level: 3,
        title: "Performance of Creation",
        description: `3rd-level College of Creation feature
As an action, you can channel the magic of the Song of Creation to create one nonmagical item of your choice in an unoccupied space within 10 feet of you. The item must appear on a surface or in a liquid that can support it. The gp value of the item can't be more than 20 times your bard level, and the item must be Medium or smaller. The item glimmers softly, and a creature can faintly hear music when touching it. The created item disappears after a number of hours equal to your proficiency bonus. For examples of items you can create, see the equipment chapter of the Player's Handbook.
Once you create an item with this feature, you can't do so again until you finish a long rest, unless you expend a spell slot of 2nd level or higher to use this feature again. You can have only one item created by this feature at a time; if you use this action and already have an item from this feature, the first one immediately vanishes.
The size of the item you can create with this feature increases by one size category when you reach 6th level (Large) and 14th level (Huge).`,
      },
      {
        level: 6,
        title: "Animating Performance",
        description: `6th-level College of Creation feature
As an action, you can animate one Large or smaller nonmagical item within 30 feet of you that isn't being worn or carried. The animate item uses the Dancing Item stat block, which uses your proficiency bonus (PB). The item is friendly to you and your companions and obeys your commands. It lives for 1 hour, until it is reduced to 0 hit points, or until you die.
In combat, the item shares your initiative count, but it takes its turn immediately after yours. It can move and use its reaction on its own, but the only action it takes on its turn is the Dodge action, unless you take a bonus action on your turn to command it to take another action. That action can be one in its stat block or some other action. If you are incapacitated, the item can take any action of its choice, not just Dodge.
When you use your Bardic Inspiration feature, you can command the item as part of the same bonus action you use for Bardic Inspiration.
Once you animate an item with this feature, you can't do so again until you finish a long rest, unless you expend a spell slot of 3rd level or higher to use this feature again. You can have only one item animated by this feature at a time; if you use this action and already have a dancing item from this feature, the first one immediately becomes inanimate.`,
      },
      {
        level: 14,
        title: "Creative Crescendo",
        description: `14th-level College of Creation feature
When you use your Performance of Creation feature, you can create more than one item at once. The number of items equals your Charisma modifier (minimum of two items). If you create an item that would exceed that number, you choose which of the previously created items disappears. Only one of these items can be of the maximum size you can create; the rest must be Small or Tiny.
You are no longer limited by gp value when creating items with Performance of Creation.`,
      },
    ],
  },
  {
    key: "dance",
    name: "College of Dance",
    source: "PHB'24",
    features: [
      {
        level: 3,
        title: "",
        description: `Bards of the College of Dance know that the Words of Creation can't be contained within speech or song; the words are uttered by the movements of celestial bodies and flow through the motions of the smallest creatures. These Bards practice a way of being in harmony with the whirling cosmos that emphasizes agility, speed, and grace.`,
      },
      {
        level: 3,
        title: "Dazzling Footwork",
        description: `3rd-level College of Dance feature.
While you aren't wearing armor or wielding a Shield, you gain the following benefits.
Dance Virtuoso. You have Advantage on any Charisma (Performance) check you make that involves you dancing.
Unarmored Defense. Your base Armor Class equals 10 plus your Dexterity and Charisma modifiers.
Agile Strikes. When you expend a use of your Bardic Inspiration as part of an action, a Bonus Action, or a Reaction, you can make one Unarmed Strike as part of that action, Bonus Action, or Reaction.
Bardic Damage. You can use Dexterity instead of Strength for the attack rolls of your Unarmed Strikes. When you deal damage with an Unarmed Strike, you can deal Bludgeoning damage equal to a roll of your Bardic Inspiration die plus your Dexterity modifier, instead of the strike's normal damage. This roll doesn't expend the die.`,
      },
      {
        level: 6,
        title: "Inspiring Movement",
        description: `6th-level College of Dance feature. 
  When an enemy you can see ends its turn within 5 feet of you, you can take a Reaction and expend one use of your Bardic Inspiration to move up to half your Speed. Then one ally of your choice within 30 feet of you can also move up to half their Speed using their Reaction. None of this feature's movement provokes Opportunity Attacks.`,
      },
      {
        level: 6,
        title: "Tandem Footwork",
        description: `6th-level College of Dance feature. 
  When you roll Initiative, you can expend one use of your Bardic Inspiration if you don't have the Incapacitated condition. When you do so, roll your Bardic Inspiration die; you and each ally within 30 feet of you who can see or hear you gains a bonus to Initiative equal to the number rolled.`,
      },
      {
        level: 14,
        title: "Leading Evasion",
        description: `14th-level College of Dance feature. 
  When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw and only half damage if you fail. If any creatures within 5 feet of you are making the same Dexterity saving throw, you can share this benefit with them for that save. You can't use this feature if you have the Incapacitated condition.`,
      },
    ],
  },
  {
    key: "eloquence",
    name: "College of Eloquence",
    source: "TCE",
    features: [
      {
        level: 3,
        title: "",
        description: `Adherents of the College of Eloquence master the art of oratory. Persuasion is regarded as a high art, and a well-reasoned, well-spoken argument often proves more persuasive than facts. These bards wield a blend of logic and theatrical wordplay, winning over skeptics and detractors with logical arguments and plucking at heartstrings to appeal to the emotions of audiences.`,
      },
      {
        level: 3,
        title: "Silver Tongue",
        description: `3rd-level College of Eloquence feature
You are a master at saying the right thing at the right time. When you make a Charisma (Persuasion) or Charisma (Deception) check, you can treat a d20 roll of 9 or lower as a 10.`,
      },
      {
        level: 3,
        title: "Unsettling Words",
        description: `3rd-level College of Eloquence feature
You can spin words laced with magic that unsettle a creature and cause it to doubt itself. As a bonus action, you can expend one use of your Bardic Inspiration and choose one creature you can see within 60 feet of you. Roll the Bardic Inspiration die. The creature must subtract the number rolled from the next saving throw it makes before the start of your next turn.`,
      },
      {
        level: 6,
        title: "Unfailing Inspiration",
        description: `6th-level College of Eloquence feature
Your inspiring words are so persuasive that others feel driven to succeed. When a creature adds one of your Bardic Inspiration dice to its ability check, attack roll, or saving throw and the roll fails, the creature can keep the Bardic Inspiration die.`,
      },
      {
        level: 6,
        title: "Universal Speech",
        description: `6th-level College of Eloquence feature
You have gained the ability to make your speech intelligible to any creature. As an action, choose one or more creatures within 60 feet of you, up to a number equal to your Charisma modifier (minimum of one creature). The chosen creatures can magically understand you, regardless of the language you speak, for 1 hour.
Once you use this feature, you can't use it again until you finish a long rest, unless you expend a spell slot to use it again.`,
      },
      {
        level: 14,
        title: "Infectious Inspiration",
        description: `14th-level College of Eloquence feature
When you successfully inspire someone, the power of your eloquence can now spread to someone else. When a creature within 60 feet of you adds one of your Bardic Inspiration dice to its ability check, attack roll, or saving throw and the roll succeeds, you can use your reaction to encourage a different creature (other than yourself) that can hear you within 60 feet of you, giving it a Bardic Inspiration die without expending any of your Bardic Inspiration uses.
You can use this reaction a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a long rest.`,
      },
    ],
  },
  {
    key: "glamour",
    name: "College of Glamour",
    source: "PHB'24",
    features: [
      {
        level: 3,
        title: "",
        description: `Weave Beguiling Fey Magic
        The College of Glamour traces its origins to the beguiling magic of the Feywild. Bards who study this magic weave threads of beauty and terror into their songs and stories, and the mightiest among them can cloak themselves in otherworldly majesty. Their performances stir up wistful longing for forgotten innocence, evoke unconscious memories of long-held fears, and tug at the emotions of even the most hard-hearted listeners.`,
      },
      {
        level: 3,
        title: "Beguiling Magic",
        description: `You always have the Charm Person and Mirror Image spells prepared.
In addition, immediately after you cast an Enchantment or Illusion spell using a spell slot, you can cause a creature you can see within 60 feet of yourself to make a Wisdom saving throw against your spell save DC. On a failed save, the target has the Charmed or Frightened condition (your choice) for 1 minute. The target repeats the save at the end of each of its turns, ending the effect on itself on a success.
Once you use this benefit, you can't use it again until you finish a Long Rest. You can also restore your use of it by expending one use of your Bardic Inspiration (no action required).`,
      },
      {
        level: 3,
        title: "Mantle of Inspiration",
        description: `You can weave fey magic into a song or dance to fill others with vigor. As a Bonus Action, you can expend a use of Bardic Inspiration, rolling a Bardic Inspiration die. When you do so, choose a number of other creatures within 60 feet of yourself, up to a number equal to your Charisma modifier (minimum of one creature). Each of those creatures gains a number of Temporary Hit Points equal to two times the number rolled on the Bardic Inspiration die, and then each can use its Reaction to move up to its Speed without provoking Opportunity Attacks.`,
      },
      {
        level: 6,
        title: "Mantle of Majesty",
        description: `You always have the Command spell prepared.
As a Bonus Action, you cast Command without expending a spell slot, and you take on an unearthly appearance for 1 minute or until your Concentration ends. During this time, you can cast Command as a Bonus Action without expending a spell slot.
Any creature Charmed by you automatically fails its saving throw against the Command you cast with this feature.
Once you use this feature, you can't use it again until you finish a Long Rest. You can also restore your use of it by expending a level 3+ spell slot (no action required).`,
      },
      {
        level: 14,
        title: "Unbreakable Majesty",
        description: `As a Bonus Action, you can assume a magically majestic presence for 1 minute or until you have the Incapacitated condition. For the duration, whenever any creature hits you with an attack roll for the first time on a turn, the attacker must succeed on a Charisma saving throw against your spell save DC, or the attack misses instead, as the creature recoils from your majesty.
Once you assume this majestic presence, you can't do so again until you finish a Short or Long Rest.`,
      },
    ],
  },
  {
    key: "lore",
    name: "College of Lore",
    source: "PHB'24",
    features: [
      {
        level: 3,
        title: "",
        description: `Plumb the Depths of Magical Knowledge
        Bards of the College of Lore collect spells and secrets from diverse sources, such as scholarly tomes, mystical rites, and peasant tales. The college's members gather in libraries and universities to share their lore with one another. They also meet at festivals or affairs of state, where they can expose corruption, unravel lies, and poke fun at self-important figures of authority.`,
      },
      {
        level: 3,
        title: "Bonus Proficiencies",
        description: `You gain proficiency with three skills of your choice.`,
      },
      {
        level: 3,
        title: "Cutting Words",
        description: `You learn to use your wit to supernaturally distract, confuse, and otherwise sap the confidence and competence of others. When a creature that you can see within 60 feet of yourself makes a damage roll or succeeds on an ability check or attack roll, you can take a Reaction to expend one use of your Bardic Inspiration; roll your Bardic Inspiration die, and subtract the number rolled from the creature's roll, reducing the damage or potentially turning the success into a failure.`,
      },
      {
        level: 6,
        title: "Magical Discoveries",
        description: `You learn two spells of your choice. These spells can come from the Cleric, Druid, or Wizard spell list or any combination thereof (see a class's section for its spell list). A spell you choose must be a cantrip or a spell for which you have spell slots, as shown in the Bard Features table.
You always have the chosen spells prepared, and whenever you gain a Bard level, you can replace one of the spells with another spell that meets these requirements.`,
      },
      {
        level: 14,
        title: "Peerless Skill",
        description: `When you make an ability check or attack roll and fail, you can expend one use of Bardic Inspiration; roll the Bardic Inspiration die, and add the number rolled to the d20, potentially turning a failure into a success. On a failure, the Bardic Inspiration isn't expended.`,
      },
    ],
  },
  {
    key: "spirits",
    name: "College of Spirits",
    source: "VRGR",
    features: [
      [
        {
          level: 3,
          title: "",
          description: `Bards of the College of Spirits seek tales with inherent power—be they legends, histories, or fictions—and bring their subjects to life. Using occult trappings, these bards conjure spiritual embodiments of powerful forces to change the world once more. Such spirits are capricious, though, and what a bard summons isn't always entirely under their control.`,
        },
        {
          level: 3,
          title: "Guiding Whispers",
          description: `3rd-level College of Spirits feature
          You can reach out to spirits to guide you and others. You learn the guidance cantrip, which doesn't count against the number of bard cantrips you know. For you, it has a range of 60 feet when you cast it. `,
        },
        {
          level: 3,
          title: "Spiritual Focus",
          description: `3rd-level College of Spirits feature
          You employ tools that aid you in channeling spirits, be they historical figures or fictional archetypes. You can use the following objects as a spellcasting focus for your bard spells: a candle, crystal ball, skull, spirit board, or tarokka deck.

Starting at 6th level, when you cast a bard spell that deals damage or restores hit points through the Spiritual Focus, roll a d6, and you gain a bonus to one damage or healing roll of the spell equal to the number rolled. `,
        },
        {
          level: 3,
          title: "Tales from Beyond",
          description: `3rd-level College of Spirits feature
          You reach out to spirits who tell their tales through you. While you are holding your Spiritual Focus, you can use a bonus action to expend one use of your Bardic Inspiration and roll on the Spirit Tales table using your Bardic Inspiration die to determine the tale the spirits direct you to tell. You retain the tale in mind until you bestow the tale's effect or you finish a short or long rest.

You can use an action to choose one creature you can see within 30 feet of you (this can be you) to be the target of the tale's effect. Once you do so, you can't bestow the tale's effect again until you roll it again.

You can retain only one of these tales in mind at a time, and rolling on the Spirit Tales table immediately ends the effect of the previous tale.

If the tale requires a saving throw, the DC equals your spell save DC. `,
          table: {
            headers: ["Bardic Insp. Die", "Tale Told Through You"],
            rows: [
              [
                "1",
                "Tale of the Clever Animal. For the next 10 minutes, whenever the target makes an Intelligence, a Wisdom, or a Charisma check, the target can roll an extra die immediately after rolling the d20 and add the extra die's number to the check. The extra die is the same type as your Bardic Inspiration die.",
              ],
              [
                "2",
                "Tale of the Renowned Duelist. You make a melee spell attack against the target. On a hit, the target takes force damage equal to two rolls of your Bardic Inspiration die + your Charisma modifier.",
              ],
              [
                "3",
                "Tale of the Beloved Friends. The target and another creature of its choice it can see within 5 feet of it gains temporary hit points equal to a roll of your Bardic Inspiration die + your Charisma modifier.",
              ],
              [
                "4",
                "Tale of the Runaway. The target can immediately use its reaction to teleport up to 30 feet to an unoccupied space it can see. When the target teleports, it can choose a number of creatures it can see within 30 feet of it up to your Charisma modifier (minimum of 0) to immediately use the same reaction.",
              ],
              [
                "5",
                "Tale of the Avenger. For 1 minute, any creature that hits the target with a melee attack takes force damage equal to a roll of your Bardic Inspiration die.",
              ],
              [
                "6",
                "Tale of the Traveler. The target gains temporary hit points equal to a roll of your Bardic Inspiration die + your bard level. While it has these temporary hit points, the target's walking speed increases by 10 feet and it gains a +1 bonus to its AC.",
              ],
              [
                "7",
                "Tale of the Beguiler. The target must succeed on a Wisdom saving throw or take psychic damage equal to two rolls of your Bardic Inspiration die, and the target is incapacitated until the end of its next turn.",
              ],
              [
                "8",
                "Tale of the Phantom. The target becomes invisible until the end of its next turn or until it hits a creature with an attack. If the target hits a creature with an attack during this invisibility, the creature it hits takes necrotic damage equal to a roll of your Bardic Inspiration die and is frightened of the target until the end of the frightened creature's next turn.",
              ],
              [
                "9",
                "Tale of the Brute. Each creature of the target's choice it can see within 30 feet of it must make a Strength saving throw. On a failed save, a creature takes thunder damage equal to three rolls of your Bardic Inspiration die and is knocked prone. A creature that succeeds on its saving throw takes half as much damage and isn't knocked prone.",
              ],
              [
                "10",
                "Tale of the Dragon. The target spews fire from the mouth in a 30-foot cone. Each creature in that area must make a Dexterity saving throw, taking fire damage equal to four rolls of your Bardic Inspiration die on a failed save, or half as much damage on a successful one.",
              ],
              [
                "11",
                "Tale of the Angel. The target regains hit points equal to two rolls of your Bardic Inspiration die + your Charisma modifier, and you end one condition from the following list affecting the target: blinded, deafened, paralyzed, petrified, or poisoned.",
              ],
              [
                "12",
                "Tale of the Mind-Bender. You evoke an incomprehensible fable from an otherworldly being. The target must succeed on an Intelligence saving throw or take psychic damage equal to three rolls of your Bardic Inspiration die and be stunned until the end of its next turn.",
              ],
            ],
          },
        },
        {
          level: 6,
          title: "Spirit Session",
          description: `6th-level College of Spirits feature
          Spirits provide you with supernatural insights. You can conduct an hour-long ritual channeling spirits (which can be done during a short or long rest) using your Spiritual Focus. You can conduct the ritual with a number of willing creatures equal to your proficiency bonus (including yourself). At the end of the ritual, you temporarily learn one spell of your choice from any class.
The spell you choose must be of a level equal to the number of creatures that conducted the ritual or less, the spell must be of a level you can cast, and it must be in the school of divination or necromancy. The chosen spell counts as a bard spell for you but doesn't count against the number of bard spells you know.
Once you perform the ritual, you can't do so again until you start a long rest, and you know the chosen spell until you start a long rest. `,
        },
        {
          level: 14,
          title: "Mystical Connection",
          description: `14th-level College of Spirits feature
          You now have the ability to nudge the spirits of Tales from Beyond toward certain tales. Whenever you roll on the Spirit Tales table, you can roll the die twice and choose which of the two effects to bestow. If you roll the same number on both dice, you can ignore the number and choose any effect on the table. `,
        },
        {
          level: 14,
          title: "Spirit Tales",
          note: `Storytellers, like bards of the College of Spirits, often give voice to tales inspired by some greater theme or body of work. When determining what stories you tell, consider what unites them. Do they all feature characters from a specific group, like archetypes from the tarokka deck, figures from constellations, childhood imaginary friends, or characters in a particular storybook? Or are your inspirations more general, incorporating historic champions, mythological heroes, or urban legends? Use the tales you tell to define your niche as a storytelling adventurer.`,
        },
      ],
    ],
  },
  {
    key: "swords",
    name: "College of Swords",
    source: "XGE",
    features: [
      {
        level: 3,
        title: "",
        description: `Bards of the College of Swords are called blades, and they entertain through daring feats of weapon prowess. Blades perform stunts such as sword swallowing, knife throwing and juggling, and mock combats. Though they use their weapons to entertain, they are also highly trained and skilled warriors in their own right.
Their talent with weapons inspires many blades to lead double lives. One blade might use a circus troupe as cover for nefarious deeds such as assassination, robbery, and blackmail. Other blades strike at the wicked, bringing justice to bear against the cruel and powerful. Most troupes are happy to accept a blade's talent for the excitement it adds to a performance, but few entertainers fully trust a blade in their ranks.
Blades who abandon their lives as entertainers have often run into trouble that makes maintaining their secret activities impossible. A blade caught stealing or engaging in vigilante justice is too great a liability for most troupes. With their weapon skills and magic, these blades either take up work as enforcers for thieves' guilds or strike out on their own as adventurers.
`,
      },
      {
        level: 3,
        title: "Bonus Proficiencies",
        description: `When you join the College of Swords at 3rd level, you gain proficiency with medium armor and the scimitar.
If you're proficient with a simple or martial melee weapon, you can use it as a spellcasting focus for your bard spells. (XGE p15)`,
      },
      {
        level: 3,
        title: "Fighting Style",
        description: `At 3rd level, you adopt a style of fighting as your specialty. Choose one of the following options. You can't take a Fighting Style option more than once, even if something in the game lets you choose again. (XGE p15)
Dueling. When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.
Two-Weapon Fighting. When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.`,
      },
      {
        level: 3,
        title: "Blade Flourish",
        description: `At 3rd level, you learn to perform impressive displays of martial prowess and speed.
Whenever you take the Attack action on your turn, your walking speed increases by 10 feet until the end of the turn, and if a weapon attack that you make as part of this action hits a creature, you can use one of the following Blade Flourish options of your choice. You can use only one Blade Flourish option per turn. (XGE p15)
Defensive Flourish. You can expend one use of your Bardic Inspiration to cause the weapon to deal extra damage to the target you hit. The damage equals the number you roll on the Bardic Inspiration die. You also add the number rolled to your AC until the start of your next turn.
Mobile Flourish. You can expend one use of your Bardic Inspiration to cause the weapon to deal extra damage to the target you hit. The damage equals the number you roll on the Bardic Inspiration die. You can also push the target up to 5 feet away from you, plus a number of feet equal to the number you roll on that die. You can then immediately use your reaction to move up to your walking speed to an unoccupied space within 5 feet of the target.
Slashing Flourish. You can expend one use of your Bardic Inspiration to cause the weapon to deal extra damage to the target you hit and to any other creature of your choice that you can see within 5 feet of you. The damage equals the number you roll on the Bardic Inspiration die.`,
      },
      {
        level: 6,
        title: "Extra Attack",
        description: `Starting at 6th level, you can attack twice, instead of once, whenever you take the Attack action on your turn. (XGE p15)`,
      },
      {
        level: 14,
        title: "Master's Flourish",
        description: `Starting at 14th level, whenever you use a Blade Flourish option, you can roll a d6 and use it instead of expending a Bardic Inspiration die. (XGE p15)`,
      },
    ],
  },
  {
    key: "valor",
    name: "College of Valor",
    source: "PHB'24",
    features: [
      {
        level: 3,
        title: "",
        description: `Sing the Deeds of Ancient Heroes
Bards of the College of Valor are daring storytellers whose tales preserve the memory of the great heroes of the past. These Bards sing the deeds of the mighty in vaulted halls or to crowds gathered around great bonfires. They travel to witness great events firsthand and to ensure that the memory of these events doesn't pass away. With their songs, they inspire new generations to reach the same heights of accomplishment as the heroes of old.`,
      },
      {
        level: 3,
        title: "Combat Inspiration",
        description: `You can use your wit to turn the tide of battle. A creature that has a Bardic Inspiration die from you can use it for one of the following effects.
Defense. When the creature is hit by an attack roll, that creature can use its Reaction to roll the Bardic Inspiration die and add the number rolled to its AC against that attack, potentially causing the attack to miss.
Offense. Immediately after the creature hits a target with an attack roll, the creature can roll the Bardic Inspiration die and add the number rolled to the attack's damage against the target.`,
      },
      {
        level: 3,
        title: "Martial Training",
        description: `You gain proficiency with Martial weapons and training with Medium armor and Shields.
In addition, you can use a Simple or Martial weapon as a Spellcasting Focus to cast spells from your Bard spell list.`,
      },
      {
        level: 6,
        title: "Extra Attack",
        description: `You can attack twice instead of once whenever you take the Attack action on your turn.
In addition, you can cast one of your cantrips that has a casting time of an action in place of one of those attacks.`,
      },
      {
        level: 14,
        title: "Battle Magic",
        description: `After you cast a spell that has a casting time of an action, you can make one attack with a weapon as a Bonus Action.`,
      },
    ],
  },
  {
    key: "whispers",
    name: "College of Whispers",
    source: "XGE",
    features: [
      {
        level: 3,
        title: "",
        description: `Most folk are happy to welcome a bard into their midst. Bards of the College of Whispers use this to their advantage. They appear to be like other bards, sharing news, singing songs, and telling tales to the audiences they gather. In truth, the College of Whispers teaches its students that they are wolves among sheep. These bards use their knowledge and magic to uncover secrets and turn them against others through extortion and threats.
Many other bards hate the College of Whispers, viewing it as a parasite that uses a bard's reputation to acquire wealth and power. For this reason, members of this college rarely reveal their true nature. They typically claim to follow some other college, or they keep their actual calling secret in order to infiltrate and exploit royal courts and other settings of power.`,
      },
      {
        level: 3,
        title: "Psychic Blades",
        description: `When you hit a creature with a weapon attack, you can expend one use of your Bardic Inspiration to deal an extra 2d6 psychic damage to that target. You can do so only once per round on your turn.
The psychic damage increases when you reach certain levels in this class, increasing to 3d6 at 5th level, 5d6 at 10th level, and 8d6 at 15th level.`,
      },
      {
        level: 3,
        title: "Words of Terror",
        description: `If you speak to a humanoid alone for at least 1 minute, you can attempt to seed paranoia in its mind. At the end of the conversation, the target must succeed on a Wisdom saving throw against your spell save DC or be frightened of you or another creature of your choice. The target is frightened in this way for 1 hour, until it is attacked or damaged, or until it witnesses its allies being attacked or damaged.
If the target succeeds on its saving throw, the target has no hint that you tried to frighten it.
Once you use this feature, you can't use it again until you finish a short or long rest.`,
      },
      {
        level: 6,
        title: "Mantle of Whispers",
        description: `When a humanoid dies within 30 feet of you, you can magically capture its shadow using your reaction. You retain this shadow until you use it or you finish a long rest.
You can use the shadow as an action. When you do so, it vanishes, magically transforming into a disguise that appears on you. You now look like the dead person, but healthy and alive. This disguise lasts for 1 hour or until you end it as a bonus action.
While you're in the disguise, you gain access to all information that the humanoid would freely share with a casual acquaintance. Such information includes general details on its background and personal life, but doesn't include secrets. The information is enough that you can pass yourself off as the person by drawing on its memories.
Another creature can see through this disguise by succeeding on a Wisdom (Insight) check contested by your Charisma (Deception) check. You gain a +5 bonus to your check.
Once you capture a shadow with this feature, you can't capture another one with it until you finish a short or long rest.`,
      },
      {
        level: 14,
        title: "Shadow Lore",
        description: `As an action, you magically whisper a phrase that only one creature of your choice within 30 feet of you can hear. The target must make a Wisdom saving throw against your spell save DC. It automatically succeeds if it doesn't share a language with you or if it can't hear you. On a successful saving throw, your whisper sounds like unintelligible mumbling and has no effect.
On a failed saving throw, the target is charmed by you for the next 8 hours or until you or your allies attack it, damage it, or force it to make a saving throw. It interprets the whispers as a description of its most mortifying secret. You gain no knowledge of this secret, but the target is convinced you know it.
The charmed creature obeys your commands for fear that you will reveal its secret. It won't risk its life for you or fight for you, unless it was already inclined to do so. It grants you favors and gifts it would offer to a close friend.
When the effect ends, the creature has no understanding of why it held you in such fear.
Once you use this feature, you can't use it again until you finish a long rest.`,
      },
    ],
  },
];

export default bardSubclass;
