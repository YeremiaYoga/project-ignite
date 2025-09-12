const rogueSubclass = [
  {
    key: "arcane-trickster",
    name: "Arcane Trickster",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Some Rogues enhance their fine-honed skills of stealth and agility with spells, learning magical tricks to aid them in their trade. Some Arcane Tricksters use their talents as pickpockets and burglars, while others are pranksters.`,
      },
      {
        name: "Spellcasting",
        level: 3,
        description: `You have learned to cast spells. See chapter 7 for the rules on spellcasting. The information below details how you use those rules as an Arcane Trickster.
Cantrips. You know three cantrips: Mage Hand and two other cantrips of your choice from the Wizard spell list (see that class's section for its list). Mind Sliver and Minor Illusion are recommended.
Whenever you gain a Rogue level, you can replace one of your cantrips, except Mage Hand, with another Wizard cantrip of your choice.
When you reach Rogue level 10, you learn another Wizard cantrip of your choice.
Spell Slots. The Arcane Trickster Spellcasting table shows how many spell slots you have to cast your level 1+ spells. You regain all expended spell slots when you finish a Long Rest.
Prepared Spells of 1st+ Level. You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose three level 1 Wizard spells. Charm Person, Disguise Self, and Fog Cloud are recommended.
The number of spells on your list increases as you gain Rogue levels, as shown in the Prepared Spells column of the Arcane Trickster Spellcasting table. Whenever that number increases, choose additional Wizard spells until the number of spells on your list matches the number in the Arcane Trickster Spellcasting table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 7 Rogue, your list of prepared spells can include five Wizard spells of level 1 or 2 in any combination.
Changing Your Prepared Spells. Whenever you gain a Rogue level, you can replace one spell on your list with another Wizard spell for which you have spell slots.
Spellcasting Ability. Intelligence is your spellcasting ability for your Wizard spells.
Spellcasting Focus. You can use an Arcane Focus as a Spellcasting Focus for your Wizard spells.`,
      },
      {
        name: "Mage Hand Legerdemain",
        level: 3,
        description: `When you cast Mage Hand, you can cast it as a Bonus Action, and you can make the spectral hand Invisible. You can control the hand as a Bonus Action, and through it, you can make Dexterity (Sleight of Hand) checks.`,
      },
      {
        name: "Magical Ambush",
        level: 9,
        description: `If you have the Invisible condition when you cast a spell on a creature, it has Disadvantage on any saving throw it makes against the spell on the same turn.`,
      },
      {
        name: "Versatile Trickster",
        level: 13,
        description: `You gain the ability to distract targets with your Mage Hand. When you use the Trip option of your Cunning Strike on a creature, you can also use that option on another creature within 5 feet of the spectral hand.`,
      },
      {
        name: "Spell Thief",
        level: 17,
        description: `You gain the ability to magically steal the knowledge of how to cast a spell from another spellcaster.
Immediately after a creature casts a spell that targets you or includes you in its area of effect, you can take a Reaction to force the creature to make an Intelligence saving throw. The DC equals your spell save DC. On a failed save, you negate the spell's effect against you, and you steal the knowledge of the spell if it is at least level 1 and of a level you can cast (it doesn't need to be a Wizard spell). For the next 8 hours, you have the spell prepared. The creature can't cast it until the 8 hours have passed.
Once you steal a spell with this feature, you can't use this feature again until you finish a Long Rest.`,
      },
    ],
  },
  {
    key: "assassin",
    name: "Assassin",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Practice the Grim Art of Death
        An Assassin's training focuses on using stealth, poison, and disguise to eliminate foes with deadly efficiency. While some Rogues who follow this path are hired killers, spies, or bounty hunters, the capabilities of this subclass are equally useful for adventurers facing a variety of monstrous enemies.`,
      },
      {
        name: "Assassinate",
        level: 3,
        description: `You're adept at ambushing a target, granting you the following benefits.
Initiative. You have Advantage on Initiative rolls.
Surprising Strikes. During the first round of each combat, you have Advantage on attack rolls against any creature that hasn't taken a turn. If your Sneak Attack hits any target during that round, the target takes extra damage of the weapon's type equal to your Rogue level.`,
      },
      {
        name: "Assassin's Tools",
        level: 3,
        description: `You gain a Disguise Kit and a Poisoner's Kit, and you have proficiency with them.`,
      },
      {
        name: "Infiltration Expertise",
        level: 9,
        description: `You are expert at the following techniques that aid your infiltrations.
Masterful Mimicry. You can unerringly mimic another person's speech, handwriting, or both if you have spent at least 1 hour studying them.
Roving Aim. Your Speed isn't reduced to 0 by using Steady Aim.`,
      },
      {
        name: "Envenom Weapons",
        level: 13,
        description: `When you use the Poison option of your Cunning Strike, the target also takes 2d6 Poison damage whenever it fails the saving throw. This damage ignores Resistance to Poison damage.`,
      },
      {
        name: "Death Strike",
        level: 17,
        description: `When you hit with your Sneak Attack on the first round of a combat, the target must succeed on a Constitution saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus), or the attack's damage is doubled against the target.`,
      },
    ],
  },
  {
    key: "inquisitive",
    name: "Inquisitive",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `As an archetypal Inquisitive, you excel at rooting out secrets and unraveling mysteries. You rely on your sharp eye for detail, but also on your finely honed ability to read the words and deeds of other creatures to determine their true intent. You excel at defeating creatures that hide among and prey upon ordinary folk, and your mastery of lore and your keen deductions make you well equipped to expose and end hidden evils.`,
      },
      {
        name: "Ear for Deceit",
        level: 3,
        description: `When you choose this archetype at 3rd level, you develop a talent for picking out lies. Whenever you make a Wisdom (Insight) check to determine whether a creature is lying, treat a roll of 7 or lower on the d20 as an 8.`,
      },
      {
        name: "Eye for Detail",
        level: 3,
        description: `Starting at 3rd level, you can use a bonus action to make a Wisdom (Perception) check to spot a hidden creature or object or to make an Intelligence (Investigation) check to uncover or decipher clues.`,
      },
      {
        name: "Insightful Fighting",
        level: 3,
        description: `At 3rd level, you gain the ability to decipher an opponent's tactics and develop a counter to them. As a bonus action, you can make a Wisdom (Insight) check against a creature you can see that isn't incapacitated, contested by the target's Charisma (Deception) check. If you succeed, you can use your Sneak Attack against that target even if you don't have advantage on the attack roll, but not if you have disadvantage on it.
This benefit lasts for 1 minute or until you successfully use this feature against a different target.`,
      },
      {
        name: "Steady Eye",
        level: 9,
        description: `Starting at 9th level, you have advantage on any Wisdom (Perception) or Intelligence (Investigation) check if you move no more than half your speed on the same turn.`,
      },
      {
        name: "Unerring Eye",
        level: 13,
        description: `Beginning at 13th level, your senses are almost impossible to foil. As an action, you sense the presence of illusions, shapechangers not in their original form, and other magic designed to deceive the senses within 30 feet of you, provided you aren't blinded or deafened. You sense that an effect is attempting to trick you, but you gain no insight into what is hidden or into its true nature.
You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.`,
      },
      {
        name: "Eye for Weakness",
        level: 17,
        description: `At 17th level, you learn to exploit a creature's weaknesses by carefully studying its tactics and movement. While your Insightful Fighting feature applies to a creature, your Sneak Attack damage against that creature increases by 3d6.`,
      },
    ],
  },
  {
    key: "mastermind",
    name: "Mastermind",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `Your focus is on people and on the influence and secrets they have. Many spies, courtiers, and schemers follow this archetype, leading lives of intrigue. Words are your weapons as often as knives or poison, and secrets and favors are some of your favorite treasures.`,
      },
      {
        name: "Master of Intrigue",
        level: 3,
        description: `When you choose this archetype at 3rd level, you gain proficiency with the disguise kit, the forgery kit, and one gaming set of your choice. You also learn two languages of your choice.
Additionally, you can unerringly mimic the speech patterns and accent of a creature that you hear speak for at least 1 minute, enabling you to pass yourself off as a native speaker of a particular land, provided that you know the language.`,
      },
      {
        name: "Master of Tactics",
        level: 3,
        description: `Starting at 3rd level, you can use the Help action as a bonus action. Additionally, when you use the Help action to aid an ally in attacking a creature, the target of that attack can be within 30 feet of you, rather than within 5 feet of you, if the target can see or hear you.`,
      },
      {
        name: "Insightful Manipulator",
        level: 9,
        description: `Starting at 9th level, if you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own. The DM tells you if the creature is your equal, superior, or inferior in regard to two of the following characteristics of your choice:`,
        list: [
          "Intelligence score  ",
          "Wisdom score",
          "Charisma score",
          "Class levels (if any)",
        ],
        description2: `At the DM's option, you might also realize you know a piece of the creature's history or one of its personality traits, if it has any.`,
      },
      {
        name: "Misdirection",
        level: 13,
        description: `Beginning at 13th level, you can sometimes cause another creature to suffer an attack meant for you. When you are targeted by an attack while a creature within 5 feet of you is granting you cover against that attack, you can use your reaction to have the attack target that creature instead of you.`,
      },
      {
        name: "Soul of Deceit",
        level: 17,
        description: `Starting at 17th level, your thoughts can't be read by telepathy or other means, unless you allow it. You can present false thoughts by succeeding on a Charisma (Deception) check contested by the mind reader's Wisdom (Insight) check.
Additionally, no matter what you say, magic that would determine if you are telling the truth indicates you are being truthful if you so choose, and you can't be compelled to tell the truth by magic.`,
      },
    ],
  },
  {
    key: "phantom",
    name: "Phantom",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `Many rogues walk a fine line between life and death, risking their own lives and taking the lives of others. While adventuring on that line, some rogues discover a mystical connection to death itself. These rogues take knowledge from the dead and become immersed in negative energy, eventually becoming like ghosts. Thieves' guilds value them as highly effective information gatherers and spies.
Many shadar-kai of the Shadowfell are masters of these macabre techniques, and some are willing to teach this path. In places like Thay in the Forgotten Realms and Karrnath in Eberron, where many necromancers practice their craft, a Phantom can become a wizard's confidant and right hand. In temples of gods of death, the Phantom might work as an agent to track down those who try to cheat death and to recover knowledge that might otherwise be lost to the grave.
How did you discover this grim power? Did you sleep in a graveyard and awaken to your new abilities? Or did you cultivate them in a temple or thieves' guild dedicated to a deity of death?`,
      },
      {
        name: "Whispers of the Dead",
        level: 3,
        description: `3rd-level Phantom feature
        Echoes of those who have died cling to you. Whenever you finish a short or long rest, you can choose one skill or tool proficiency that you lack and gain it, as a ghostly presence shares its knowledge with you. You lose this proficiency when you use this feature to choose a different proficiency that you lack.`,
      },
      {
        name: "Wails from the Grave",
        level: 3,
        description: `3rd-level Phantom feature
        As you nudge someone closer to the grave, you can channel the power of death to harm someone else as well. Immediately after you deal your Sneak Attack damage to a creature on your turn, you can target a second creature that you can see within 30 feet of the first creature. Roll half the number of Sneak Attack dice for your level (round up), and the second creature takes necrotic damage equal to the roll's total, as wails of the dead sound around them for a moment.
        You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Tokens of the Departed",
        level: 9,
        description: `9th-level Phantom feature
        When a life ends in your presence, you're able to snatch a token from the departing soul, a sliver of its life essence that takes physical form: as a reaction when a creature you can see dies within 30 feet of you, you can open your free hand and cause a Tiny trinket to appear there, a soul trinket. The DM determines the trinket's form or has you roll on the Trinkets table in the Player's Handbook to generate it. You can have a maximum number of soul trinkets equal to your proficiency bonus, and you can't create one while at your maximum.`,
        list: [
          "While a soul trinket is on your person, you have advantage on death saving throws and Constitution saving throws, for your vitality is enhanced by the life essence within the object.",
          "When you deal Sneak Attack damage on your turn, you can destroy one of your soul trinkets that's on your person and then immediately use Wails from the Grave, without expending a use of that feature.",
          "As an action, you can destroy one of your soul trinkets, no matter where it's located. When you do so, you can ask the spirit associated with the trinket one question. The spirit appears to you and answers in a language it knew in life. It's under no obligation to be truthful, and it answers as concisely as possible, eager to be free. The spirit knows only what it knew in life, as determined by the DM.",
        ],
      },
      {
        name: "Ghost Walk",
        level: 13,
        description: `13th-level Phantom feature
        You can phase partially into the realm of the dead, becoming like a ghost. As a bonus action, you assume a spectral form. While in this form, you have a flying speed of 10 feet, you can hover, and attack rolls have disadvantage against you. You can also move through creatures and objects as if they were difficult terrain, but you take 1d10 force damage if you end your turn inside a creature or an object.
        You stay in this form for 10 minutes or until you end it as a bonus action. To use this feature again, you must finish a long rest or destroy one of your soul trinkets as part of the bonus action you use to activate Ghost Walk.`,
      },
      {
        name: "Death's Friend",
        level: 17,
        description: `17th-level Phantom feature
        Your association with death has become so close that you gain the following benefits:`,
        list: [
          "When you use your Wails from the Grave, you can deal the necrotic damage to both the first and the second creature.",
          "At the end of a long rest, a soul trinket appears in your hand if you don't have any soul trinkets, as the spirits of the dead are drawn to you.",
        ],
      },
    ],
  },
  {
    key: "scout",
    name: "Scout",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `You are skilled in stealth and surviving far from the streets of a city, allowing you to scout ahead of your companions during expeditions. Rogues who embrace this archetype are at home in the wilderness and among barbarians and rangers, and many Scouts serve as the eyes and ears of war bands. Ambusher, spy, bounty hunter—these are just a few of the roles that Scouts assume as they range the world.`,
      },
      {
        name: "Skirmisher",
        level: 3,
        description: `Starting at 3rd level, you are difficult to pin down during a fight. You can move up to half your speed as a reaction when an enemy ends its turn within 5 feet of you. This movement doesn't provoke opportunity attacks.`,
      },
      {
        name: "Survivalist",
        level: 3,
        description: `When you choose this archetype at 3rd level, you gain proficiency in the Nature and Survival skills if you don't already have it. Your proficiency bonus is doubled for any ability check you make that uses either of those proficiencies.`,
      },
      {
        name: "Superior Mobility",
        level: 9,
        description: `At 9th level, your walking speed increases by 10 feet. If you have a climbing or swimming speed, this increase applies to that speed as well.`,
      },
      {
        name: "Ambush Master",
        level: 13,
        description: `Starting at 13th level, you excel at leading ambushes and acting first in a fight.
You have advantage on initiative rolls. In addition, the first creature you hit during the first round of a combat becomes easier for you and others to strike; attack rolls against that target have advantage until the start of your next turn.`,
      },
      {
        name: "Sudden Strike",
        level: 17,
        description: `Starting at 17th level, you can strike with deadly speed. If you take the Attack action on your turn, you can make one additional attack as a bonus action. This attack can benefit from your Sneak Attack even if you have already used it this turn, but you can't use your Sneak Attack against the same target more than once in a turn.`,
      },
    ],
  },
  {
    key: "soulknife",
    name: "Soulknife",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Strike Foes with Psionic Blades
        A Soulknife strikes with the mind, cutting through barriers both physical and psychic. These Rogues discover psionic power within themselves and channel it to do their roguish work. As a Soulknife, your psionic abilities might have haunted you since childhood, revealing their full potential only as you experienced the stress of adventure. Or you might have sought out an order of psychic adepts and spent years learning how to manifest your power.`,
      },
      {
        name: "Psionic Power",
        level: 3,
        description: `You harbor a wellspring of psionic energy within yourself. It is represented by your Psionic Energy Dice, which fuel certain powers you have from this subclass. The Soulknife Energy Dice table shows the number of these dice you have when you reach certain Rogue levels, and the table shows the die size.`,
        table: {
          title: "Soulknife Energy Dice",
          rows: [
            ["Rogue Level", "Die Size", "Number"],
            ["3", "D6", "4"],
            ["5", "D8", "6"],
            ["9", "D8", "8"],
            ["11", "D10", "8"],
            ["13", "D10", "10"],
            ["17", "D12", "12"],
          ],
        },
        description2: `Any features in this subclass that use a Psionic Energy Die use only the dice from this subclass. Some of your powers expend a Psionic Energy Die, as specified in a power's description, and you can't use a power if it requires you to use a die when your Psionic Energy Dice are all expended.
You regain one of your expended Psionic Energy Dice when you finish a Short Rest, and you regain all of them when you finish a Long Rest.
Psi-Bolstered Knack. If you fail an ability check using a skill or tool with which you have proficiency, you can roll one Psionic Energy Die and add the number rolled to the check, potentially turning failure into success. The die is expended only if the roll then succeeds.
Psychic Whispers. You can establish telepathic communication between yourself and others. As a Magic action, choose one or more creatures you can see, up to a number of creatures equal to your Proficiency Bonus, and then roll one Psionic Energy Die. For a number of hours equal to the number rolled, the chosen creatures can speak telepathically with you, and you can speak telepathically with them. To send or receive a message (no action required), you and the other creature must be within 1 mile of each other. A creature can end the telepathic connection at any time (no action required).
The first time you use this power after each Long Rest, you don't expend the Psionic Energy Die. All other times you use the power, you expend the die.`,
      },
      {
        name: "Psychic Blades",
        level: 3,
        description: `You can manifest shimmering blades of psychic energy. Whenever you take the Attack action or make an Opportunity Attack, you can manifest a Psychic Blade in your free hand and make the attack with that blade. The magic blade has the following traits:`,
      },
      {
        name: "Soul Blades",
        level: 9,
        description: `You can now use the following powers with your Psychic Blades.
Homing Strikes. If you make an attack roll with your Psychic Blade and miss the target, you can roll one Psionic Energy Die and add the number rolled to the attack roll. If this causes the attack to hit, the die is expended.
Psychic Teleportation. As a Bonus Action, you manifest a Psychic Blade, expend one Psionic Energy Die and roll it, and throw the blade at an unoccupied space you can see up to a number of feet away equal to 10 times the number rolled. You then teleport to that space, and the blade vanishes.`,
      },
      {
        name: "Psychic Veil",
        level: 13,
        description: `You can weave a veil of psychic static to mask yourself. As a Magic action, you gain the Invisible condition for 1 hour or until you dismiss this effect (no action required). This invisibility ends early immediately after you deal damage to a creature or you force a creature to make a saving throw.
Once you use this feature, you can't do so again until you finish a Long Rest unless you expend a Psionic Energy Die (no action required) to restore your use of it.`,
      },
      {
        name: "Rend Mind",
        level: 17,
        description: `You can sweep your Psychic Blades through a creature's mind. When you use your Psychic Blades to deal Sneak Attack damage to a creature, you can force that target to make a Wisdom saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus). If the save fails, the target has the Stunned condition for 1 minute. The Stunned target repeats the save at the end of each of its turns, ending the effect on itself on a success.
Once you use this feature, you can't do so again until you finish a Long Rest unless you expend three Psionic Energy Dice (no action required) to restore your use of it.`,
      },
    ],
  },
  {
    key: "swashbuckler",
    name: "Swashbuckler",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `You focus your training on the art of the blade, relying on speed, elegance, and charm in equal parts. While some warriors are brutes clad in heavy armor, your method of fighting looks almost like a performance. Duelists and pirates typically belong to this archetype.
A Swashbuckler excels in single combat, and can fight with two weapons while safely darting away from an opponent.`,
      },
      {
        name: "Fancy Footwork",
        level: 3,
        description: `When you choose this archetype at 3rd level, you learn how to land a strike and then slip away without reprisal. During your turn, if you make a melee attack against a creature, that creature can't make opportunity attacks against you for the rest of your turn.`,
      },
      {
        name: "Rakish Audacity",
        level: 3,
        description: `Starting at 3rd level, your confidence propels you into battle. You can give yourself a bonus to your initiative rolls equal to your Charisma modifier.
You also gain an additional way to use your Sneak Attack; you don't need advantage on your attack roll to use Sneak Attack against a creature if you are within 5 feet of it, no other creatures are within 5 feet of you, and you don't have disadvantage on the attack roll. All the other rules for Sneak Attack still apply to you.`,
      },
      {
        name: "Panache",
        level: 9,
        description: `At 9th level, your charm becomes extraordinarily beguiling. As an action, you can make a Charisma (Persuasion) check contested by a creature's Wisdom (Insight) check. The creature must be able to hear you, and the two of you must share a language.
If you succeed on the check and the creature is hostile to you, it has disadvantage on attack rolls against targets other than you and can't make opportunity attacks against targets other than you. This effect lasts for 1 minute, until one of your companions attacks the target or affects it with a spell, or until you and the target are more than 60 feet apart.
If you succeed on the check and the creature isn't hostile to you, it is charmed by you for 1 minute. While charmed, it regards you as a friendly acquaintance. This effect ends immediately if you or your companions do anything harmful to it.`,
      },
      {
        name: "Elegant Maneuver",
        level: 13,
        description: `Starting at 13th level, you can use a bonus action on your turn to gain advantage on the next Dexterity (Acrobatics) or Strength (Athletics) check you make during the same turn.`,
      },
      {
        name: "Master Duelist",
        level: 17,
        description: `Beginning at 17th level, your mastery of the blade lets you turn failure into success in combat. If you miss with an attack roll, you can roll it again with advantage. Once you do so, you can't use this feature again until you finish a short or long rest.`,
      },
    ],
  },
  {
    key: "thief",
    name: "Thief",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Hunt for Treasure as a Classic Adventurer
          A mix of burglar, treasure hunter, and explorer, you are the epitome of an adventurer. In addition to improving your agility and stealth, you gain abilities useful for delving into ruins and getting maximum benefit from the magic items you find there.`,
      },
      {
        name: "Fast Hands",
        level: 3,
        description: `As a Bonus Action, you can do one of the following.
Sleight of Hand. Make a Dexterity (Sleight of Hand) check to pick a lock or disarm a trap with Thieves' Tools or to pick a pocket.
Use an Object. Take the Utilize action, or take the Magic action to use a magic item that requires that action.`,
      },
      {
        name: "Second-Story Work",
        level: 3,
        description: `You've trained to get into especially hard-to-reach places, granting you these benefits.
Climber. You gain a Climb Speed equal to your Speed.
Jumper. You can determine your jump distance using your Dexterity rather than your Strength.`,
      },
      {
        name: "Supreme Sneak",
        level: 9,
        description: `You gain the following Cunning Strike option.
Stealth Attack (Cost: 1d6). If you have the Hide action's Invisible condition, this attack doesn't end that condition on you if you end the turn behind Three-Quarters Cover or Total Cover.`,
      },
      {
        name: "Use Magic Device",
        level: 13,
        description: `You've learned how to maximize use of magic items, granting you the following benefits.
Attunement. You can attune to up to four magic items at once.
Charges. Whenever you use a magic item property that expends charges, roll 1d6. On a roll of 6, you use the property without expending the charges.
Scrolls. You can use any Spell Scroll, using Intelligence as your spellcasting ability for the spell. If the spell is a cantrip or a level 1 spell, you can cast it reliably. If the scroll contains a higher-level spell, you must first succeed on an Intelligence (Arcana) check (DC 10 plus the spell's level). On a successful check, you cast the spell from the scroll. On a failed check, the scroll disintegrates.`,
      },
      {
        name: "Thief's Reflexes",
        level: 17,
        description: `You are adept at laying ambushes and quickly escaping danger. You can take two turns during the first round of any combat. You take your first turn at your normal Initiative and your second turn at your Initiative minus 10.`,
      },
    ],
  },
];

export default rogueSubclass;
