const paladinSubclass = [
  {
    key: "ancients",
    name: "Oath of the Ancients",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Preserve Life and Light in the World
        The Oath of the Ancients is as old as the first elves. Paladins who swear this oath cherish the light; they love the beautiful and life-giving things of the world more than any principles of honor, courage, and justice. They often adorn their armor and clothing with images of growing things—leaves, antlers, or flowers—to reflect their commitment to preserving life and light.
These paladins share the following tenets:`,
        list: [
          "Kindle the light of hope",
          "Shelter life.",
          "Delight in art and laughter.",
        ],
      },
      {
        name: "Oath Spells",
        level: 3,
        description: `The magic of your oath ensures you always have certain spells ready; when you reach a Paladin level specified in the Oath of the Ancients Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          title: "Oath of the Ancients Spells",
          rows: [
            ["Paladin Level", "Spells"],
            ["3rd", "Ensnaring Strike, Speak with Animals"],
            ["5th", "Misty Step, Moonbeam"],
            ["9th", "Plant Growth, Protection from Energy"],
            ["13th", "Ice Storm, Stoneskin"],
            ["17th", "Commune with Nature, Tree Stride"],
          ],
        },
      },
      {
        name: "Nature's Wrath",
        level: 3,
        description: `As a Magic action, you can expend one use of your Channel Divinity to conjure spectral vines around nearby creatures. Each creature of your choice that you can see within 15 feet of yourself must succeed on a Strength saving throw or have the Restrained condition for 1 minute. A Restrained creature repeats the save at the end of each of its turns, ending the effect on itself on a success.`,
      },
      {
        name: "Aura of Warding",
        level: 7,
        description: `Ancient magic lies so heavily upon you that it forms an eldritch ward, blunting energy from beyond the Material Plane; you and your allies have Resistance to Necrotic, Psychic, and Radiant damage while in your Aura of Protection.`,
      },
      {
        name: "Undying Sentinel",
        level: 15,
        description: `When you are reduced to 0 Hit Points and not killed outright, you can drop to 1 Hit Point instead, and you regain a number of Hit Points equal to three times your Paladin level. Once you use this feature, you can't use it again until you finish a Long Rest.

Additionally, you can't be aged magically, and you cease visibly aging.`,
      },
      {
        name: "Elder Champion",
        level: 20,
        description: `As a Bonus Action, you can imbue your Aura of Protection with primal power, granting the benefits below for 1 minute or until you end them (no action required). Once you use this feature, you can't use it again until you finish a Long Rest. You can also restore your use of it by expending a level 5 spell slot (no action required).
Diminish Defiance. Enemies in the aura have Disadvantage on saving throws against your spells and Channel Divinity options.
Regeneration. At the start of each of your turns, you regain 10 Hit Points.
Swift Spells. Whenever you cast a spell that has a casting time of an action, you can cast it using a Bonus Action instead.`,
      },
    ],
  },
  {
    key: "conquest",
    name: "Oath of Conquest",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `The Oath of Conquest calls to paladins who seek glory in battle and the subjugation of their enemies. It isn't enough for these paladins to establish order. They must crush the forces of chaos. Sometimes called knight tyrants or iron mongers, those who swear this oath gather into grim orders that serve gods or philosophies of war and well-ordered might.
Some of these paladins go so far as to consort with the powers of the Nine Hells, valuing the rule of law over the balm of mercy. The archdevil Bel, warlord of Avernus, counts many of these paladins—called hell knights—as his most ardent supporters. Hell knights cover their armor with trophies taken from fallen enemies, a grim warning to any who dare oppose them and the decrees of their lords. These knights are often most fiercely resisted by other paladins of this oath, who believe that the hell knights have wandered too far into darkness.`,
      },
      {
        name: "Tenets of Conquest",
        level: 3,
        description: `A paladin who takes this oath has the tenets of conquest seared on the upper arm.
Douse the Flame of Hope. It is not enough to merely defeat an enemy in battle. Your victory must be so overwhelming that your enemies' will to fight is shattered forever. A blade can end a life. Fear can end an empire.
Rule with an Iron Fist. Once you have conquered, tolerate no dissent. Your word is law. Those who obey it shall be favored. Those who defy it shall be punished as an example to all who might follow.
Strength Above All. You shall rule until a stronger one arises. Then you must grow mightier and meet the challenge, or fall to your own ruin.`,
      },
      {
        name: "Oath Spells",
        level: 3,
        description: `You gain oath spells at the paladin levels listed.`,
        table: {
          title: "Oath of Conquest Spells",
          rows: [
            ["Paladin Level", "Spells"],
            ["3rd", "armor of Agathys, command"],
            ["5th", "hold person, spiritual weapon"],
            ["9th", "bestow curse, fear"],
            ["13th", "dominate beast, stoneskin"],
            ["17th", "cloudkill, dominate person"],
          ],
        },
      },
      {
        name: "Channel Divinity",
        level: 3,
        description: `When you take this oath at 3rd level, you gain the following two Channel Divinity options.
Conquering Presence. You can use your Channel Divinity to exude a terrifying presence. As an action, you force each creature of your choice that you can see within 30 feet of you to make a Wisdom saving throw. On a failed save, a creature becomes frightened of you for 1 minute. The frightened creature can repeat this saving throw at the end of each of its turns, ending the effect on itself on a success.
Guided Strike. You can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.`,
      },
      {
        name: "Aura of Conquest",
        level: 7,
        description: `Starting at 7th level, you constantly emanate a menacing aura while you're not incapacitated. The aura extends 10 feet from you in every direction, but not through total cover.
If a creature is frightened of you, its speed is reduced to 0 while in the aura, and that creature takes psychic damage equal to half your paladin level if it starts its turn there.
At 18th level, the range of this aura increases to 30 feet.`,
      },
      {
        name: "Scornful Rebuke",
        level: 15,
        description: `Starting at 15th level, those who dare to strike you are psychically punished for their audacity. Whenever a creature hits you with an attack, that creature takes psychic damage equal to your Charisma modifier (minimum of 1) if you're not incapacitated.`,
      },
      {
        name: "Invincible Conqueror",
        level: 20,
        description: `At 20th level, you gain the ability to harness extraordinary martial prowess. As an action, you can magically become an avatar of conquest, gaining the following benefits for 1 minute:`,
        list: [
          "You have resistance to all damage.",
          "When you take the Attack action on your turn, you can make one additional attack as part of that action.",
          "Your melee weapon attacks score a critical hit on a roll of 19 or 20 on the d20.",
        ],
        description2: `Once you use this feature, you can't use it again until you finish a long rest.`,
      },
    ],
  },
  {
    key: "crown",
    name: "Oath of the Crown",
    source: "SCAG",
    features: [
      {
        name: "",
        level: 3,
        description: `The Oath of the Crown is sworn to the ideals of civilization, be it the spirit of a nation, fealty to a sovereign, or service to a deity of law and rulership. The paladins who swear this oath dedicate themselves to serving society and, in particular, the laws that hold society together. These paladins are the watchful guardians on the walls, standing against the chaotic tides of barbarism that threaten to tear down all that civilization has built, and are commonly known as guardians, exemplars, or sentinels. Often, paladins who swear this oath are members of an order of knighthood in service to a nation or sovereign, and undergo their oath as part of their admission to the order's ranks.`,
      },
      {
        name: "Tenets of the Crown",
        level: 3,
        description: `The tenets of the Oath of the Crown are often set by the sovereign to which their oath is sworn, but generally emphasize the following tenets.
Law. The law is paramount. It is the mortar that holds the stones of civilization together, and it must be respected.
Loyalty. Your word is your bond. Without loyalty, oaths and laws are meaningless.
Courage. You must be willing to do what needs to be done for the sake of order, even in the face of overwhelming odds. If you don't act, then who will?
Responsibility. You must deal with the consequences of your actions, and you are responsible for fulfilling your duties and obligations.`,
      },
      {
        name: "Oath of the Crown Spells",
        level: 3,
        description: `You gain oath spells at the paladin levels listed.`,
        table: {
          title: "Oath of the Crown Spells",
          rows: [
            ["Paladin Level", "Spells"],
            ["3rd", "command, compelled duel"],
            ["5th", "warding bond, zone of truth"],
            ["9th", "aura of vitality, spirit guardians"],
            ["13th", "banishment, guardian of faith"],
            ["17th", "circle of power, geas"],
          ],
        },
      },
      {
        name: "Channel Divinity",
        level: 3,
        description: `When you take this oath at 3rd level, you gain the following two Channel Divinity options.
Champion Challenge. As a bonus action, you issue a challenge that compels other creatures to do battle with you. Each creature of your choice that you can see within 30 feet of you must make a Wisdom saving throw. On a failed save, a creature can't willingly move more than 30 feet away from you. This effect ends on the creature if you are incapacitated or die or if the creature is more than 30 feet away from you.
Turn the Tide. As a bonus action, you can bolster injured creatures with your Channel Divinity. Each creature of your choice that can hear you within 30 feet of you regains hit points equal to 1d6 + your Charisma modifier (minimum of 1) if it has no more than half of its hit points.`,
      },
      {
        name: "Divine Allegiance",
        level: 7,
        description: `Starting at 7th level, when a creature within 5 feet of you takes damage, you can use your reaction to magically substitute your own health for that of the target creature, causing that creature not to take the damage. Instead, you take the damage. This damage to you can't be reduced or prevented in any way.`,
      },
      {
        name: "Unyielding Spirit",
        level: 15,
        description: `Starting at 15th level, you have advantage on saving throws to avoid becoming paralyzed or stunned.`,
      },
      {
        name: "Exalted Champion",
        level: 20,
        description: `At 20th level, your presence on the field of battle is an inspiration to those dedicated to your cause. You can use your action to gain the following benefits for 1 hour:`,
        list: [
          "You have resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.",
          "Your allies have advantage on death saving throws while within 30 feet of you.",
          "You have advantage on Wisdom saving throws, as do your allies within 30 feet of you.",
        ],
        description2: `This effect ends early if you are incapacitated or die. Once you use this feature, you can't use it again until you finish a long rest.`,
      },
    ],
  },
  {
    key: "devotion",
    name: "Oath of Devotion",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Uphold the Ideals of Justice and Order
        The Oath of Devotion binds Paladins to the ideals of justice and order. These Paladins meet the archetype of the knight in shining armor. They hold themselves to the highest standards of conduct, and some—for better or worse—hold the rest of the world to the same standards.
Many who swear this oath are devoted to gods of law and good and use their gods' tenets as the measure of personal devotion. Others hold angels as their ideals and incorporate images of angelic wings into their helmets or coats of arms.
These paladins share the following tenets:`,
        list: [
          "Let your word be your promise.",
          "Protect the weak and never fear to act.",
          "Let your honorable deeds be an example.",
        ],
      },
      {
        name: "Oath of Devotion Spells",
        level: 3,
        description: `The magic of your oath ensures you always have certain spells ready; when you reach a Paladin level specified in the Oath of Devotion Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          title: "Oath of Devotion Spells",
          rows: [
            ["Paladin Level", "Spells"],
            ["3rd", "Protection from Evil And Good, Shield of Faith"],
            ["5th", "Aid, Zone of Truth"],
            ["9th", "Beacon of Hope, Dispel Magic"],
            ["13th", "Freedom of Movement, Guardian of Faith"],
            ["17th", "Commune, Flame Strike"],
          ],
        },
      },
      {
        name: "Sacred Weapon",
        level: 3,
        description: `When you take the Attack action, you can expend one use of your Channel Divinity to imbue one Melee weapon that you are holding with positive energy. For 10 minutes or until you use this feature again, you add your Charisma modifier to attack rolls you make with that weapon (minimum bonus of +1), and each time you hit with it, you cause it to deal its normal damage type or Radiant damage.
The weapon also emits Bright Light in a 20-foot radius and Dim Light 20 feet beyond that.
You can end this effect early (no action required). This effect also ends if you aren't carrying the weapon.`,
      },
      {
        name: "Aura of Devotion",
        level: 7,
        description: `You and your allies have Immunity to the Charmed condition while in your Aura of Protection. If a Charmed ally enters the aura, that condition has no effect on that ally while there.`,
      },
      {
        name: "Smite of Protection",
        level: 15,
        description: `Your magical smite now radiates protective energy. Whenever you cast Divine Smite, you and your allies have Half Cover while in your Aura of Protection. The aura has this benefit until the start of your next turn.`,
      },
      {
        name: "Holy Nimbus",
        level: 20,
        description: `As a Bonus Action, you can imbue your Aura of Protection with holy power, granting the benefits below for 10 minutes or until you end them (no action required). Once you use this feature, you can't use it again until you finish a Long Rest. You can also restore your use of it by expending a level 5 spell slot (no action required).
Holy Ward. You have Advantage on any saving throw you are forced to make by a Fiend or an Undead.
Radiant Damage. Whenever an enemy starts its turn in the aura, that creature takes Radiant damage equal to your Charisma modifier plus your Proficiency Bonus.
Sunlight. The aura is filled with Bright Light that is sunlight.`,
      },
    ],
  },
  {
    key: "glory",
    name: "Oath of Glory",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Strive for the Heights of Heroism
        Paladins who take the Oath of Glory believe they and their companions are destined to achieve glory through deeds of heroism. They train diligently and encourage their companions, so they're all ready when destiny calls.
These paladins share the following tenets:`,
        list: [
          "Endeavor to be known by your deeds.",
          "Face hardships with courage.",
          "Inspire others to strive for glory.",
        ],
      },
      {
        name: "Oath of Glory Spells",
        level: 3,
        description: `The magic of your oath ensures you always have certain spells ready; when you reach a Paladin level specified in the Oath of Glory Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          title: "Oath of Glory Spells",
          rows: [
            ["Paladin Level", "Spells"],
            ["3rd", "Guiding Bolt, Heroism"],
            ["5th", "Enhance Ability, Magic Weapon"],
            ["9th", "Haste, Protection from Energy"],
            ["13th", "Compulsion, Freedom of Movement"],
            ["17th", "Legend Lore, Yolande's Regal Presence"],
          ],
        },
      },
      {
        name: "Inspiring Smite",
        level: 3,
        description: `Immediately after you cast Divine Smite, you can expend one use of your Channel Divinity and distribute Temporary Hit Points to creatures of your choice within 30 feet of yourself, which can include you. The total number of Temporary Hit Points equals 2d8 plus your Paladin level, divided among the chosen creatures however you like.`,
      },
      {
        name: "Peerless Athlete",
        level: 3,
        description: `As a Bonus Action, you can expend one use of your Channel Divinity to augment your athleticism. For 1 hour, you have Advantage on Strength (Athletics) and Dexterity (Acrobatics) checks, and the distance of your Long and High Jumps increases by 10 feet (this extra distance costs movement as normal).`,
      },
      {
        name: "Aura of Alacrity",
        level: 7,
        description: `Your Speed increases by 10 feet.
In addition, whenever an ally enters your Aura of Protection for the first time on a turn or starts their turn there, the ally's Speed increases by 10 feet until the end of their next turn.`,
      },
      {
        name: "Glorious Defense",
        level: 15,
        description: `You can turn defense into a sudden strike. When you or another creature you can see within 10 feet of you is hit by an attack roll, you can take a Reaction to grant a bonus to the target's AC against that attack, potentially causing it to miss. The bonus equals your Charisma modifier (minimum of +1). If the attack misses, you can make one attack with a weapon against the attacker as part of this Reaction if the attacker is within your weapon's range.
You can use this feature a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.`,
      },
      {
        name: "Living Legend",
        level: 20,
        description: `You can empower yourself with the legends—whether true or exaggerated—of your great deeds. As a Bonus Action, you gain the benefits below for 10 minutes. Once you use this feature, you can't use it again until you finish a Long Rest. You can also restore your use of it by expending a level 5 spell slot (no action required).
Charismatic. You are blessed with an otherworldly presence and have Advantage on all Charisma checks.
Saving Throw Reroll. If you fail a saving throw, you can take a Reaction to reroll it. You must use this new roll.
Unerring Strike. Once on each of your turns when you make an attack roll with a weapon and miss, you can cause that attack to hit instead.`,
      },
    ],
  },
  {
    key: "oathbreaker",
    name: "Oathbreaker",
    source: "DMG'14",
    features: [
      {
        name: "",
        level: 3,
        description: `An Oathbreaker is a paladin who breaks his or her sacred oaths to pursue some dark ambition or serve an evil power. Whatever light burned in the paladin's heart has been extinguished. Only darkness remains.
A paladin must be evil and at least 3rd level to become an Oathbreaker. The paladin replaces the features specific to his or her Sacred Oath with Oathbreaker features.`,
      },
      {
        name: "Oathbreaker Spells",
        level: 3,
        description: `You gain oathbreaker spells at the paladin levels listed.`,
        table: {
          title: "Oathbreaker Spells",
          rows: [
            ["Paladin Level", "Spells"],
            ["3rd", "hellish rebuke, inflict wounds"],
            ["5th", "crown of madness, darkness"],
            ["9th", "animate dead, bestow curse"],
            ["13th", "blight, confusion"],
            ["17th", "contagion, dominate person"],
          ],
        },
      },
      {
        name: "Channel Divinity",
        level: 3,
        description: `An Oathbreaker paladin of 3rd level or higher gains the following two Channel Divinity options.
Control Undead. As an action, the paladin targets one undead creature he or she can see within 30 feet of him or her. The target must make a Wisdom saving throw. On a failed save, the target must obey the paladin's commands for the next 24 hours, or until the paladin uses this Channel Divinity option again. An undead whose challenge rating is equal to or greater than the paladin's level is immune to this effect.
Dreadful Aspect. As an action, the paladin channels the darkest emotions and focuses them into a burst of magical menace. Each creature of the paladin's choice within 30 feet of the paladin must make a Wisdom saving throw if it can see the paladin. On a failed save, the target is frightened of the paladin for 1 minute. If a creature frightened by this effect ends its turn more than 30 feet away from the paladin, it can attempt another Wisdom saving throw to end the effect on it.`,
      },
      {
        name: "Aura of Hate",
        level: 7,
        description: `Starting at 7th level, the paladin, as well any fiends and undead within 10 feet of the paladin, gains a bonus to melee weapon damage rolls equal to the paladin's Charisma modifier (minimum of +1). A creature can benefit from this feature from only one paladin at a time.
At 18th level, the range of this aura increases to 30 feet.`,
      },
      {
        name: "Supernatural Resistance",
        level: 15,
        description: `At 15th level, the paladin gains resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.`,
      },
      {
        name: "Dread Lord",
        level: 20,
        description: `At 20th level, the paladin can, as an action, surround himself or herself with an aura of gloom that lasts for 1 minute. The aura reduces any bright light in a 30-foot radius around the paladin to dim light. Whenever an enemy that is frightened by the paladin starts its turn in the aura, it takes 4d10 psychic damage. Additionally, the paladin and creatures he or she chooses in the aura are draped in deeper shadow. Creatures that rely on sight have disadvantage on attack rolls against creatures draped in this shadow.
While the aura lasts, the paladin can use a bonus action on his or her turn to cause the shadows in the aura to attack one creature. The paladin makes a melee spell attack against the target. If the attack hits, the target takes necrotic damage equal to 3d10 + the paladin's Charisma modifier.
After activating the aura, the paladin can't do so again until he or she finishes a long rest.`,
      },
    ],
  },
  {
    key: "redemption",
    name: "Oath of Redemption",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `The Oath of Redemption sets a paladin on a difficult path, one that requires a holy warrior to use violence only as a last resort. Paladins who dedicate themselves to this oath believe that any person can be redeemed and that the path of benevolence and justice is one that anyone can walk. These paladins face evil creatures in the hope of turning their foes to the light, and they slay their enemies only when such a deed will clearly save other lives. Paladins who follow this path are known as redeemers.
While redeemers are idealists, they are no fools. Redeemers know that undead, demons, devils, and other supernatural threats can be inherently evil. Against such foes, paladins who swear this oath bring the full wrath of their weapons and spells to bear. Yet the redeemers still pray that, one day, even creatures of wickedness will invite their own redemption.`,
      },
      {
        name: "Tenets of Redemption",
        level: 3,
        description: `The tenets of the Oath of Redemption hold a paladin to a high standard of peace and justice.
Peace. Violence is a weapon of last resort. Diplomacy and understanding are the paths to long-lasting peace.
Innocence. All people begin life in an innocent state, and it is their environment or the influence of dark forces that drives them to evil. By setting the proper example, and working to heal the wounds of a deeply flawed world, you can set anyone on a righteous path.
Patience. Change takes time. Those who have walked the path of the wicked must be given reminders to keep them honest and true. Once you have planted the seed of righteousness in a creature, you must work day after day to allow that seed to survive and flourish.
Wisdom. Your heart and mind must stay clear, for eventually you will be forced to admit defeat. While every creature can be redeemed, some are so far along the path of evil that you have no choice but to end their lives for the greater good. Any such action must be carefully weighed and the consequences fully understood, but once you have made the decision, follow through with it knowing your path is just.`,
      },
      {
        name: "Oath Spells",
        level: 3,
        description: `You gain oath spells at the paladin levels listed.`,
        table: {
          title: "Oath of Redemption Spells",
          rows: [
            ["Paladin Level", "Spells"],
            ["3rd", "sanctuary, sleep"],
            ["5th", "calm emotions, hold person"],
            ["9th", "counterspell, hypnotic pattern"],
            ["13th", "Otiluke's resilient sphere, stoneskin"],
            ["17th", "hold monster, wall of force"],
          ],
        },
      },
      {
        name: "Channel Divinity",
        level: 3,
        description: `When you take this oath at 3rd level, you gain the following two Channel Divinity options.
Emissary of Peace. You can use your Channel Divinity to augment your presence with divine power. As a bonus action, you grant yourself a +5 bonus to Charisma (Persuasion) checks for the next 10 minutes.
Rebuke the Violent. You can use your Channel Divinity to rebuke those who use violence. Immediately after an attacker within 30 feet of you deals damage with an attack against a creature other than you, you can use your reaction to force the attacker to make a Wisdom saving throw. On a failed save, the attacker takes radiant damage equal to the damage it just dealt. On a successful save, it takes half as much damage.`,
      },
      {
        name: "Aura of the Guardian",
        level: 7,
        description: `Starting at 7th level, you can shield others from harm at the cost of your own health. When a creature within 10 feet of you takes damage, you can use your reaction to magically take that damage, instead of that creature taking it. This feature doesn't transfer any other effects that might accompany the damage, and this damage can't be reduced in any way.
At 18th level, the range of this aura increases to 30 feet.`,
      },
      {
        name: "Protective Spirit",
        level: 15,
        description: `Starting at 15th level, a holy presence mends your wounds in battle. You regain hit points equal to 1d6 + half your paladin level if you end your turn in combat with fewer than half of your hit points remaining and you aren't incapacitated.`,
      },
      {
        name: "Emissary of Redemption",
        level: 20,
        description: `At 20th level, you become an avatar of peace, which gives you two benefits:`,
        list: [
          "You have resistance to all damage dealt by other creatures (their attacks, spells, and other effects).",
          "Whenever a creature hits you with an attack, it takes radiant damage equal to half the damage you take from the attack.",
        ],
        description2: `If you attack a creature, cast a spell on it, or deal damage to it by any means but this feature, neither benefit works against that creature until you finish a long rest.`,
      },
    ],
  },
  {
    key: "vengeance",
    name: "Oath of Vengeance",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Punish Evildoers at Any Cost
        The Oath of Vengeance is a solemn commitment to punish those who have committed grievously evil acts. When evil armies slaughter helpless villagers, when a tyrant defies the will of the gods, when a thieves' guild grows too violent, when a dragon rampages through the countryside—at times like these, paladins arise and swear an Oath of Vengeance to set right what has gone wrong.
        These paladins share the following tenets:`,
        list: [
          "Show the wicked no mercy.",
          "Fight injustice and its causes.",
          "Aid those harmed by injustice.",
        ],
      },
      {
        name: "Oath of Vengeance Spells",
        level: 3,
        description: `The magic of your oath ensures you always have certain spells ready; when you reach a Paladin level specified in the Oath of Vengeance Spells table, you thereafter always have the listed spells prepared.`,
        table: {
          title: "Oath of Vengeance Spells",
          rows: [
            ["Paladin Level", "Spells"],
            ["3rd", "Bane, Hunter's Mark"],
            ["5th", "Hold Person, Misty Step"],
            ["9th", "Haste, Protection from Energy"],
            ["13th", "Banishment, Dimension Door"],
            ["17th", "Hold Monster, Scrying"],
          ],
        },
      },
      {
        name: "Vow of Enmity",
        level: 3,
        description: `When you take the Attack action, you can expend one use of your Channel Divinity to utter a vow of enmity against a creature you can see within 30 feet of yourself. You have Advantage on attack rolls against the creature for 1 minute or until you use this feature again.
If the creature drops to 0 Hit Points before the vow ends, you can transfer the vow to a different creature within 30 feet of yourself (no action required).`,
      },
      {
        name: "Relentless Avenger",
        level: 7,
        description: `Your supernatural focus helps you close off a foe's retreat. When you hit a creature with an Opportunity Attack, you can reduce the creature's Speed to 0 until the end of the current turn. You can then move up to half your Speed as part of the same Reaction. This movement doesn't provoke Opportunity Attacks.`,
      },
      {
        name: "Soul of Vengeance",
        level: 15,
        description: `Immediately after a creature under the effect of your Vow of Enmity hits or misses with an attack roll, you can take a Reaction to make a melee attack against that creature if it's within range.`,
      },
      {
        name: "Avenging Angel",
        level: 20,
        description: `As a Bonus Action, you gain the benefits below for 10 minutes or until you end them (no action required). Once you use this feature, you can't use it again until you finish a Long Rest. You can also restore your use of it by expending a level 5 spell slot (no action required).
Flight. You sprout spectral wings on your back, have a Fly Speed of 60 feet, and can hover.
Frightful Aura. Whenever an enemy starts its turn in your Aura of Protection, that creature must succeed on a Wisdom saving throw or have the Frightened condition for 1 minute or until it takes any damage. Attack rolls against the Frightened creature have Advantage.`,
      },
    ],
  },
  {
    key: "watchers",
    name: "Oath of the Watchers",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `The Oath of the Watchers binds paladins to protect mortal realms from the predations of extraplanar creatures, many of which can lay waste to mortal soldiers. Thus, the Watchers hone their minds, spirits, and bodies to be the ultimate weapons against such threats.
Paladins who follow the Watchers' oath are ever vigilant in spotting the influence of extraplanar forces, often establishing a network of spies and informants to gather information on suspected cults. To a Watcher, keeping a healthy suspicion and awareness about one's surroundings is as natural as wearing armor in battle.`,
      },
      {
        name: "Tenets of the Watchers",
        level: 3,
        description: `A paladin who assumes the Oath of the Watchers swears to safeguard mortal realms from otherworldly threats.
Vigilance. The threats you face are cunning, powerful, and subversive. Be ever alert for their corruption.
Loyalty. Never accept gifts or favors from fiends or those who truck with them. Stay true to your order, your comrades, and your duty.
Discipline. You are the shield against the endless terrors that lie beyond the stars. Your blade must be forever sharp and your mind keen to survive what lies beyond.`,
      },
      {
        name: "Oath Spells",
        level: 3,
        description: `3rd-level Oath of the Watchers feature
You gain oath spells at the paladin levels listed in the Oath of the Watchers table. See the Sacred Oath class feature for how oath spells work.`,
        table: {
          title: "Oath of the Watchers Spells",
          rows: [
            ["Paladin Level", "Spells"],
            ["3rd", "alarm, detect magic"],
            ["5th", "moonbeam, see invisibility"],
            ["9th", "counterspell, nondetection"],
            ["13th", "aura of purity, banishment"],
            ["17th", "hold monster, scrying"],
          ],
        },
      },
      {
        name: "Channel Divinity",
        level: 3,
        description: `3rd-level Oath of the Watchers feature
        You gain the following Channel Divinity options:
Watcher's Will. You can use your Channel Divinity to invest your presence with the warding power of your faith. As an action, you can choose a number of creatures you can see within 30 feet of you, up to a number equal to your Charisma modifier (minimum of one creature). For 1 minute, you and the chosen creatures have advantage on Intelligence, Wisdom, and Charisma saving throws.
Abjure the Extraplanar. You can use your Channel Divinity to castigate unworldly beings. As an action, you present your holy symbol and each aberration, celestial, elemental, fey, or fiend within 30 feet of you that can hear you must make a Wisdom saving throw. On a failed save, the creature is turned for 1 minute or until it takes damage.
A turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly end its move in a space within 30 feet of you. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can take the Dodge action.`,
      },
      {
        name: "Aura of the Sentinel",
        level: 7,
        description: `7th-level Oath of the Watchers feature
        You emit an aura of alertness while you aren't incapacitated. When you and any creatures of your choice within 10 feet of you roll initiative, you all gain a bonus to initiative equal to your proficiency bonus.
At 18th level, the range of this aura increases to 30 feet.`,
      },
      {
        name: "Vigilant Rebuke",
        level: 15,
        description: `15th-level Oath of the Watchers feature
        You've learned how to chastise anyone who dares wield beguilements against you and your wards. Whenever you or a creature you can see within 30 feet of you succeeds on an Intelligence, a Wisdom, or a Charisma saving throw, you can use your reaction to deal 2d8 + your Charisma modifier force damage to the creature that forced the saving throw.`,
      },
      {
        name: "Mortal Bulwark",
        level: 20,
        description: `20th-level Oath of the Watchers feature
        You manifest a spark of divine power in defense of the mortal realms. As a bonus action, you gain the following benefits for 1 minute:`,
        list: [
          "You gain truesight with a range of 120 feet.",
          "You have advantage on attack rolls against aberrations, celestials, elementals, fey, and fiends.",
          "When you hit a creature with an attack roll and deal damage to it, you can also force it to make a Charisma saving throw against your spell save DC. On a failed save, the creature is magically banished to its native plane of existence if it's currently not there. On a successful save, the creature can't be banished by this feature for 24 hours.",
        ],
        description2: `Once you use this bonus action, you can't use it again until you finish a long rest, unless you expend a 5th-level spell slot to use it again.`,
      },
    ],
  },
];

export default paladinSubclass;
