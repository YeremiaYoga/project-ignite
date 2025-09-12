const fighterSubclass = [
  {
    key: "arcane-archer",
    name: "Arcane Archer",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects. Arcane Archers are some of the most elite warriors among the elves. They stand watch over the fringes of elven domains, keeping a keen eye out for trespassers and using magic-infused arrows to defeat monsters and invaders before they can reach elven settlements. Over the centuries, the methods of these elf archers have been learned by members of other races who can also balance arcane aptitude with archery.`,
      },
      {
        name: "Arcane Archer Lore",
        level: 3,
        description: `At 3rd level, you learn magical theory or some of the secrets of nature—typical for practitioners of this elven martial tradition. You choose to gain proficiency in either the Arcana or the Nature skill, and you choose to learn either the prestidigitation or the druidcraft cantrip.`,
      },
      {
        name: "Arcane Shot",
        level: 3,
        description: `At 3rd level, you learn to unleash special magical effects with some of your shots. When you gain this feature, you learn two Arcane Shot options of your choice (see "Arcane Shot Options" below).
Once per turn when you fire an arrow from a shortbow or longbow as part of the Attack action, you can apply one of your Arcane Shot options to that arrow. You decide to use the option when the arrow hits a creature, unless the option doesn't involve an attack roll. You have two uses of this ability, and you regain all expended uses of it when you finish a short or long rest.
You gain an additional Arcane Shot option of your choice when you reach certain levels in this class: 7th, 10th, 15th, and 18th level. Each option also improves when you become an 18th-level fighter.`,
      },
      {
        name: "Arcane Shot Options",
        level: 3,
        description: `The Arcane Shot feature lets you choose options for it at certain levels. The options are presented here in alphabetical order. They are all magical effects, and each one is associated with one of the schools of magic.
If an option requires a saving throw, your Arcane Shot save DC is calculated as follows:
Arcane Shot save DC = 8 + Intelligence modifier + Proficiency Bonus
Banishing Arrow. You use abjuration magic to try to temporarily banish your target to a harmless location in the Feywild. The creature hit by the arrow must also succeed on a Charisma saving throw or be banished. While banished in this way, the target's speed is 0, and it is incapacitated. At the end of its next turn, the target reappears in the space it vacated or in the nearest unoccupied space if that space is occupied.
After you reach 18th level in this class, a target also takes 2d6 force damage when the arrow hits it.
Beguiling Arrow. Your enchantment magic causes this arrow to temporarily beguile its target. The creature hit by the arrow takes an extra 2d6 psychic damage, and choose one of your allies within 30 feet of the target. The target must succeed on a Wisdom saving throw, or it is charmed by the chosen ally until the start of your next turn. This effect ends early if the chosen ally attacks the charmed target, deals damage to it, or forces it to make a saving throw.
The psychic damage increases to 4d6 when you reach 18th level in this class.
Bursting Arrow. You imbue your arrow with force energy drawn from the school of evocation. The energy detonates after your attack. Immediately after the arrow hits the creature, the target and all other creatures within 10 feet of it take 2d6 force damage each.
The force damage increases to 4d6 when you reach 18th level in this class.
Enfeebling Arrow. You weave necromantic magic into your arrow. The creature hit by the arrow takes an extra 2d6 necrotic damage. The target must also succeed on a Constitution saving throw, or the damage dealt by its weapon attacks is halved until the start of your next turn.
The necrotic damage increases to 4d6 when you reach 18th level in this class.
Grasping Arrow. When this arrow strikes its target, conjuration magic creates grasping, poisonous brambles, which wrap around the target. The creature hit by the arrow takes an extra 2d6 poison damage, its speed is reduced by 10 feet, and it takes 2d6 slashing damage the first time on each turn it moves 1 foot or more without teleporting. The target or any creature that can reach it can use its action to remove the brambles with a successful Strength (Athletics) check against your Arcane Shot save DC. Otherwise, the brambles last for 1 minute or until you use this option again.
The poison damage and slashing damage both increase to 4d6 when you reach 18th level in this class.
Piercing Arrow. You use transmutation magic to give your arrow an ethereal quality. When you use this option, you don't make an attack roll for the attack. Instead, the arrow shoots forward in a line, which is 1 foot wide and 30 feet long, before disappearing. The arrow passes harmlessly through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw. On a failed save, a creature takes damage as if it were hit by the arrow, plus an extra 1d6 piercing damage. On a successful save, a target takes half as much damage.
The piercing damage increases to 2d6 when you reach 18th level in this class.
Seeking Arrow. Using divination magic, you grant your arrow the ability to seek out a target. When you use this option, you don't make an attack roll for the attack. Instead, choose one creature you have seen in the past minute. The arrow flies toward that creature, moving around corners if necessary and ignoring three-quarters cover and half cover. If the target is within the weapon's range and there is a path large enough for the arrow to travel to the target, the target must make a Dexterity saving throw. Otherwise, the arrow disappears after traveling as far as it can. On a failed save, the target takes damage as if it were hit by the arrow, plus an extra 1d6 force damage, and you learn the target's current location. On a successful save, the target takes half as much damage, and you don't learn its location.
The force damage increases to 2d6 when you reach 18th level in this class.
Shadow Arrow. You weave illusion magic into your arrow, causing it to occlude your foe's vision with shadows. The creature hit by the arrow takes an extra 2d6 psychic damage, and it must succeed on a Wisdom saving throw or be unable to see anything farther than 5 feet away until the start of your next turn.
The psychic damage increases to 4d6 when you reach 18th level in this class.`,
      },

      {
        name: "Magic Arrow",
        level: 7,
        description: `At 7th level, you gain the ability to infuse arrows with magic. Whenever you fire a nonmagical arrow from a shortbow or longbow, you can make it magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. The magic fades from the arrow immediately after it hits or misses its target.`,
      },
      {
        name: "Curving Shot",
        level: 7,
        description: `At 7th level, you learn how to direct an errant arrow toward a new target. When you make an attack roll with a magic arrow and miss, you can use a bonus action to reroll the attack roll against a different target within 60 feet of the original target.`,
      },
      {
        name: "Additional Arcane Shot Option",
        level: 7,
        description: `You gain an additional Arcane Shot option of your choice when you reach 7th level.`,
      },
      {
        name: "Additional Arcane Shot Option",
        level: 10,
        description: `You gain an additional Arcane Shot option of your choice when you reach 10th level.`,
      },
      {
        name: "Ever-Ready Shot",
        level: 15,
        description: `Starting at 15th level, your magical archery is available whenever battle starts. If you roll initiative and have no uses of Arcane Shot remaining, you regain one use of it.`,
      },
      {
        name: "Additional Arcane Shot Option",
        level: 15,
        description: `You gain an additional Arcane Shot option of your choice when you reach 15th level.`,
      },
      {
        name: "Additional Arcane Shot Option",
        level: 18,
        description: `You gain an additional Arcane Shot option of your choice when you reach 18th level. Each option also improves when you become an 18th-level fighter.`,
      },
    ],
  },
  {
    key: "battle-master",
    name: "Battle Master",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Battle Masters are students of the art of battle, learning martial techniques passed down through generations. The most accomplished Battle Masters are well-rounded figures who combine their carefully honed combat skills with academic study in the fields of history, theory, and the arts.`,
      },
      {
        name: "Combat Superiority",
        level: 3,
        description: `Your experience on the battlefield has refined your fighting techniques. You learn maneuvers that are fueled by special dice called Superiority Dice.
Maneuvers. You learn three maneuvers of your choice from the "Maneuver Options" section below. Many maneuvers enhance an attack in some way. You can use only one maneuver per attack.
You learn two additional maneuvers of your choice when you reach Fighter levels 7, 10, and 15. Each time you learn new maneuvers, you can also replace one maneuver you know with a different one.
Superiority Dice. You have four Superiority Dice, which are d8s. A Superiority Die is expended when you use it. You regain all expended Superiority Dice when you finish a Short or Long Rest.
You gain an additional Superiority Die when you reach Fighter levels 7 (five dice total) and 15 (six dice total).
Saving Throws. If a maneuver requires a saving throw, the DC equals 8 plus your Strength or Dexterity modifier (your choice) and Proficiency Bonus.`,
      },
      {
        name: "Student of War",
        level: 3,
        description: `You gain proficiency with one type of Artisan's Tools of your choice, and you gain proficiency in one skill of your choice from the skills available to Fighters at level 1.`,
      },
      {
        name: "Maneuver Options",
        level: 3,
        description: `The maneuvers are presented here in alphabetical order.
Ambush. When you make a Dexterity (Stealth) check or an Initiative roll, you can expend one Superiority Die and add the die to the roll, unless you have the Incapacitated condition.
Bait and Switch. When you're within 5 feet of a creature on your turn, you can expend one Superiority Die and switch places with that creature, provided you spend at least 5 feet of movement and the creature is willing and doesn't have the Incapacitated condition. This movement doesn't provoke Opportunity Attacks.
Roll the Superiority Die. Until the start of your next turn, you or the other creature (your choice) gains a bonus to AC equal to the number rolled.
Commander's Strike. When you take the Attack action on your turn, you can replace one of your attacks to direct one of your companions to strike. When you do so, choose a willing creature who can see or hear you and expend one Superiority Die. That creature can immediately use its Reaction to make one attack with a weapon or an Unarmed Strike, adding the Superiority Die to the attack's damage roll on a hit.
Commanding Presence. When you make a Charisma (Intimidation, Performance, or Persuasion) check, you can expend one Superiority Die and add that die to the roll.
Disarming Attack. When you hit a creature with an attack roll, you can expend one Superiority Die to attempt to disarm the target. Add the Superiority Die roll to the attack's damage roll. The target must succeed on a Strength saving throw or drop one object of your choice that it's holding, with the object landing in its space.
Distracting Strike. When you hit a creature with an attack roll, you can expend one Superiority Die to distract the target. Add the Superiority Die roll to the attack's damage roll. The next attack roll against the target by an attacker other than you has Advantage if the attack is made before the start of your next turn.
Evasive Footwork. As a Bonus Action, you can expend one Superiority Die and take the Disengage action. You also roll the die and add the number rolled to your AC until the start of your next turn.
Feinting Attack. As a Bonus Action, you can expend one Superiority Die to feint, choosing one creature within 5 feet of yourself as your target. You have Advantage on your next attack roll against that target this turn. If that attack hits, add the Superiority Die to the attack's damage roll.
Goading Attack. When you hit a creature with an attack roll, you can expend one Superiority Die to attempt to goad the target into attacking you. Add the Superiority Die to the attack's damage roll. The target must succeed on a Wisdom saving throw or have Disadvantage on attack rolls against targets other than you until the end of your next turn.
Lunging Attack. As a Bonus Action, you can expend one Superiority Die and take the Dash action. If you move at least 5 feet in a straight line immediately before hitting with a melee attack as part of the Attack action on this turn, you can add the Superiority Die to the attack's damage roll.
Maneuvering Attack. When you hit a creature with an attack roll, you can expend one Superiority Die to maneuver one of your comrades into another position. Add the Superiority Die roll to the attack's damage roll, and choose a willing creature who can see or hear you. That creature can use its Reaction to move up to half its Speed without provoking an Opportunity Attack from the target of your attack.
Menacing Attack. When you hit a creature with an attack roll, you can expend one Superiority Die to attempt to frighten the target. Add the Superiority Die to the attack's damage roll. The target must succeed on a Wisdom saving throw or have the Frightened condition until the end of your next turn.
Parry. When another creature damages you with a melee attack roll, you can take a Reaction and expend one Superiority Die to reduce the damage by the number you roll on your Superiority Die plus your Strength or Dexterity modifier (your choice).
Precision Attack. When you miss with an attack roll, you can expend one Superiority Die, roll that die, and add it to the attack roll, potentially causing the attack to hit.
Pushing Attack. When you hit a creature with an attack roll using a weapon or an Unarmed Strike, you can expend one Superiority Die to attempt to drive the target back. Add the Superiority Die to the attack's damage roll. If the target is Large or smaller, it must succeed on a Strength saving throw or be pushed up to 15 feet directly away from you.
Rally. As a Bonus Action, you can expend one Superiority Die to bolster the resolve of a companion. Choose an ally of yours within 30 feet of yourself who can see or hear you. That creature gains Temporary Hit Points equal to the Superiority Die roll plus half your Fighter level (round down).
Riposte. When a creature misses you with a melee attack roll, you can take a Reaction and expend one Superiority Die to make a melee attack roll with a weapon or an Unarmed Strike against the creature. If you hit, add the Superiority Die to the attack's damage.
Sweeping Attack. When you hit a creature with a melee attack roll using a weapon or an Unarmed Strike, you can expend one Superiority Die to attempt to damage another creature. Choose another creature within 5 feet of the original target and within your reach. If the original attack roll would hit the second creature, it takes damage equal to the number you roll on your Superiority Die. The damage is of the same type dealt by the original attack.
Tactical Assessment. When you make an Intelligence (History or Investigation) check or a Wisdom (Insight) check, you can expend one Superiority Die and add that die to the ability check.
Trip Attack. When you hit a creature with an attack roll using a weapon or an Unarmed Strike, you can expend one Superiority Die and add the die to the attack's damage roll. If the target is Large or smaller, it must succeed on a Strength saving throw or have the Prone condition.`,
      },
      {
        name: "Know Your Enemy",
        level: 7,
        description: `As a Bonus Action, you can discern certain strengths and weaknesses of a creature you can see within 30 feet of yourself; you know whether that creature has any Immunities, Resistances, or Vulnerabilities, and if the creature has any, you know what they are.
Once you use this feature, you can't do so again until you finish a Long Rest. You can also restore a use of the feature by expending one Superiority Die (no action required).`,
      },
      {
        name: "Improved Combat Superiority",
        level: 10,
        description: `Your Superiority Die becomes a d10.`,
      },
      {
        name: "Relentless",
        level: 15,
        description: `Once per turn, when you use a maneuver, you can roll 1d8 and use the number rolled instead of expending a Superiority Die.`,
      },
      {
        name: "Ultimate Combat Superiority",
        level: 18,
        description: `Your Superiority Die becomes a d12.`,
      },
    ],
  },
  {
    key: "cavalier",
    name: "Cavalier",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `The archetypal Cavalier excels at mounted combat. Usually born among the nobility and raised at court, a Cavalier is equally at home leading a cavalry charge or exchanging repartee at a state dinner. Cavaliers also learn how to guard those in their charge from harm, often serving as the protectors of their superiors and of the weak. Compelled to right wrongs or earn prestige, many of these fighters leave their lives of comfort to embark on glorious adventure.`,
      },
      {
        name: "Bonus Proficiency",
        level: 3,
        description: `When you choose this archetype at 3rd level, you gain proficiency in one of the following skills of your choice: Animal Handling, History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice.`,
      },
      {
        name: "Born to the Saddle",
        level: 3,
        description: `Starting at 3rd level, your mastery as a rider becomes apparent. You have advantage on saving throws made to avoid falling off your mount. If you fall off your mount and descend no more than 10 feet, you can land on your feet if you're not incapacitated.
Finally, mounting or dismounting a creature costs you only 5 feet of movement, rather than half your speed.`,
      },
      {
        name: "Unwavering Mark",
        level: 3,
        description: `Starting at 3rd level, you can menace your foes, foiling their attacks and punishing them for harming others. When you hit a creature with a melee weapon attack, you can mark the creature until the end of your next turn. This effect ends early if you are incapacitated or you die, or if someone else marks the creature.
While it is within 5 feet of you, a creature marked by you has disadvantage on any attack roll that doesn't target you.
In addition, if a creature marked by you deals damage to anyone other than you, you can make a special melee weapon attack against the marked creature as a bonus action on your next turn. You have advantage on the attack roll, and if it hits, the attack's weapon deals extra damage to the target equal to half your fighter level.
Regardless of the number of creatures you mark, you can make this special attack a number of times equal to your Strength modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.`,
      },
      {
        name: "Warding Maneuver",
        level: 7,
        description: `At 7th level, you learn to fend off strikes directed at you, your mount, or other creatures nearby. If you or a creature you can see within 5 feet of you is hit by an attack, you can roll 1d8 as a reaction if you're wielding a melee weapon or a shield. Roll the die, and add the number rolled to the target's AC against that attack. If the attack still hits, the target has resistance against the attack's damage.
You can use this feature a number of times equal to your Constitution modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.`,
      },
      {
        name: "Hold the Line",
        level: 10,
        description: `At 10th level, you become a master of locking down your enemies. Creatures provoke an opportunity attack from you when they move 5 feet or more while within your reach, and if you hit a creature with an opportunity attack, the target's speed is reduced to 0 until the end of the current turn.`,
      },
      {
        name: "Ferocious Charger",
        level: 15,
        description: `Starting at 15th level, you can run down your foes, whether you're mounted or not. If you move at least 10 feet in a straight line right before attacking a creature and you hit it with the attack, that target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone. You can use this feature only once on each of your turns.`,
      },
      {
        name: "Vigilant Defender",
        level: 18,
        description: `Starting at 18th level, you respond to danger with extraordinary vigilance. In combat, you get a special reaction that you can take once on every creature's turn, except your turn. You can use this special reaction only to make an opportunity attack, and you can't use it on the same turn that you take your normal reaction.`,
      },
    ],
  },
  {
    key: "champion",
    name: "Champion",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Pursue Physical Excellence in Combat
        A Champion focuses on the development of martial prowess in a relentless pursuit of victory. Champions combine rigorous training with physical excellence to deal devastating blows, withstand peril, and garner glory. Whether in athletic contests or bloody battle, Champions strive for the crown of the victor.`,
      },
      {
        name: "Improved Critical",
        level: 3,
        description: `Your attack rolls with weapons and Unarmed Strikes can score a Critical Hit on a roll of 19 or 20 on the d20.`,
      },
      {
        name: "Remarkable Athlete",
        level: 3,
        description: `Thanks to your athleticism, you have Advantage on Initiative rolls and Strength (Athletics) checks.
In addition, immediately after you score a Critical Hit, you can move up to half your Speed without provoking Opportunity Attacks.`,
      },
      {
        name: "Additional Fighting Style",
        level: 7,
        description: `You gain another Fighting Style feat of your choice.`,
      },
      {
        name: "Heroic Warrior",
        level: 10,
        description: `The thrill of battle drives you toward victory. During combat, you can give yourself Heroic Inspiration whenever you start your turn without it.`,
      },
      {
        name: "Superior Critical",
        level: 15,
        description: `Your attack rolls with weapons and Unarmed Strikes can now score a Critical Hit on a roll of 18–20 on the d20.`,
      },
      {
        name: "Survivor",
        level: 18,
        description: `You attain the pinnacle of resilience in battle, giving you these benefits.
Defy Death. You have Advantage on Death Saving Throws. Moreover, when you roll 18–20 on a Death Saving Throw, you gain the benefit of rolling a 20 on it.
Heroic Rally. At the start of each of your turns, you regain Hit Points equal to 5 plus your Constitution modifier if you are Bloodied and have at least 1 Hit Point.`,
      },
    ],
  },
  {
    key: "eldritch-knight",
    name: "Eldritch Knight",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Support Combat Skills with Arcane Magic
          Eldritch Knights combine the martial mastery common to all Fighters with a careful study of magic. Their spells both complement and extend their combat skills, providing additional protection to shore up their armor and also allowing them to engage many foes at once with explosive magic.`,
      },
      {
        name: "Spellcasting",
        level: 3,
        description: `You have learned to cast spells. See chapter 7 for the rules on spellcasting. The information below details how you use those rules as an Eldritch Knight.
Cantrips. You know two cantrips of your choice from the Wizard spell list. Ray of Frost and Shocking Grasp are recommended. Whenever you gain a Fighter level, you can replace one of these cantrips with another cantrip of your choice from the Wizard spell list. When you reach Fighter level 10, you learn another Wizard cantrip of your choice.
Spell Slots. You regain all expended spell slots when you finish a Long Rest.
Prepared Spells of Level 1+. You prepare a list of Wizard spells you can cast. Start with three level 1 spells (Burning Hands, Jump, Shield recommended). You can increase the number of prepared spells as you gain Fighter levels, choosing spells for which you have spell slots. Whenever you gain a Fighter level, you can replace one spell on your list with another Wizard spell for which you have spell slots.
Spellcasting Ability. Intelligence.
Spellcasting Focus. You can use an Arcane Focus as a Spellcasting Focus for your Wizard spells.`,
      },
      {
        name: "War Bond",
        level: 3,
        description: `You learn a ritual that creates a magical bond between yourself and one weapon, performed over 1 hour during a Short Rest. The weapon must be within reach throughout the ritual. The bond fails if another Fighter is bonded to the weapon or if it is a magic item attuned to someone else.

Once bonded, you can't be disarmed unless Incapacitated. You can summon the weapon as a Bonus Action. You can bond up to two weapons, summoning only one at a time. Attempting a third bond requires breaking one of the existing bonds.`,
      },
      {
        name: "War Magic",
        level: 7,
        description: `When you take the Attack action on your turn, you can replace one of the attacks with a casting of one of your Wizard cantrips that has a casting time of an action.`,
      },
      {
        name: "Eldritch Strike",
        level: 10,
        description: `When you hit a creature with an attack using a weapon, that creature has Disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn.`,
      },
      {
        name: "Arcane Charge",
        level: 15,
        description: `When you use your Action Surge, you can teleport up to 30 feet to an unoccupied space you can see. You can teleport before or after the additional action.`,
      },
      {
        name: "Improved War Magic",
        level: 18,
        description: `When you take the Attack action on your turn, you can replace two of the attacks with a casting of one of your level 1 or level 2 Wizard spells that has a casting time of an action.`,
      },
    ],
  },
  {
    key: "psi-warrior",
    name: "Psi Warrior",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Augment Physical Might with Psionic Power
        Psi Warriors awaken the power of their minds to augment their physical might. They harness this psionic power to infuse their weapon strikes, lash out with telekinetic energy, and create barriers of mental force.`,
      },
      {
        name: "Psionic Power",
        level: 3,
        description: `You harbor a wellspring of psionic energy within yourself. It is represented by your Psionic Energy Dice, which fuel powers you have from this subclass. The Psi Warrior Energy Dice table shows the die size and number of these dice you have when you reach certain Fighter levels.`,
        table: {
          headers: ["Fighter Level", "Die Size", "Number"],
          rows: [
            ["3", "D6", "4"],
            ["5", "D8", "6"],
            ["9", "D8", "8"],
            ["11", "D10", "8"],
            ["13", "D10", "10"],
            ["17", "D12", "12"],
          ],
        },
        description2: `Any features in this subclass that use a Psionic Energy Die use only the dice from this subclass. Some of your powers expend the Psionic Energy Die, as specified in a power's description, and you can't use a power if it requires you to use a die when all your Psionic Energy Dice are expended.
          You regain one of your expended Psionic Energy Dice when you finish a Short Rest, and you regain all of them when you finish a Long Rest.
Protective Field. When you or another creature you can see within 30 feet of you takes damage, you can take a Reaction to expend one Psionic Energy Die, roll the die, and reduce the damage taken by the number rolled plus your Intelligence modifier (minimum reduction of 1), as you create a momentary shield of telekinetic force.
Psionic Strike. Once on each of your turns, immediately after you hit a target within 30 feet of yourself with an attack and deal damage to it with a weapon, you can expend one Psionic Energy Die, rolling it and dealing Force damage to the target equal to the number rolled plus your Intelligence modifier.
Telekinetic Movement. You can move an object or a creature with your mind. As a Magic action, choose one target you can see within 30 feet of yourself; the target must be a loose object that is Large or smaller or one willing creature other than you. You transport the target up to 30 feet to an unoccupied space you can see. Alternatively, if the target is a Tiny object, you can transport it to or from your hand.
Once you take this action, you can't do so again until you finish a Short or Long Rest unless you expend a Psionic Energy Die (no action required) to restore your use of it.`,
      },
      {
        name: "Telekinetic Adept",
        level: 7,
        description: `You have mastered new ways to use your telekinetic abilities.
Psi-Powered Leap. As a Bonus Action, you gain a Fly Speed equal to twice your Speed until the end of the current turn. Once you take this Bonus Action, you can't do so again until you finish a Short or Long Rest unless you expend a Psionic Energy Die (no action required) to restore your use of it.
Telekinetic Thrust. When you deal damage to a target with your Psionic Strike, you can force the target to make a Strength saving throw (DC 8 plus your Intelligence modifier and Proficiency Bonus). On a failed save, you can give the target the Prone condition or transport it up to 10 feet horizontally.`,
      },
      {
        name: "Guarded Mind",
        level: 10,
        description: `You have Resistance to Psychic damage. Moreover, if you start your turn with the Charmed or Frightened condition, you can expend a Psionic Energy Die (no action required) and end every effect on yourself giving you those conditions.`,
      },
      {
        name: "Bulwark of Force",
        level: 15,
        description: `You can shield yourself and others with telekinetic force. As a Bonus Action, you can choose creatures, including yourself, within 30 feet of yourself, up to a number of creatures equal to your Intelligence modifier (minimum of one creature). Each of the chosen creatures has Half Cover for 1 minute or until you have the Incapacitated condition.
Once you use this feature, you can't do so again until you finish a Long Rest unless you expend a Psionic Energy Die (no action required) to restore your use of it.`,
      },
      {
        name: "Telekinetic Master",
        level: 18,
        description: `You always have the Telekinesis spell prepared. With this feature, you can cast it without a spell slot or components, and your spellcasting ability for it is Intelligence. On each of your turns while you maintain Concentration on it, including the turn when you cast it, you can make one attack with a weapon as a Bonus Action.
Once you cast the spell with this feature, you can't do so in this way again until you finish a Long Rest unless you expend a Psionic Energy Die (no action required) to restore your use of it.`,
      },
    ],
  },
  {
    key: "purple-dragon-knight",
    name: "Purple Dragon Knight (Banneret)",
    source: "SCAG",
    features: [
      {
        name: "",
        level: 3,
        description: `Purple Dragon Knights are warriors who hail from the kingdom of Cormyr. Pledged to protect the crown, they take the fight against evil beyond the kingdom's borders. They are tasked with wandering the land as knights errant, relying on their judgment, bravery, and fidelity to guide them in defeating evildoers.
A Purple Dragon Knight inspires greatness in others by committing brave deeds in battle. The mere presence of a knight in a hamlet is enough to cause some orcs and bandits to seek easier prey. A lone knight is a skilled warrior, but a knight leading a band of allies can transform even the most poorly equipped militia into a ferocious war band.
A knight prefers to lead through deeds, not words. As a knight spearheads an attack, the knight's actions can awaken reserves of courage and conviction in allies that they never suspected they had.`,
      },
      {
        name: "Restriction: Knighthood",
        level: 3,
        description: `Purple Dragon Knights are tied to a specific order of Cormyrean knighthood.
Banneret serves as the generic name for this archetype if you use it in other campaign settings or to model warlords other than the Purple Dragon Knights.`,
      },
      {
        name: "Rallying Cry",
        level: 3,
        description: `When you use your Second Wind feature, you can choose up to three creatures within 60 feet of you that are allied with you. Each one regains hit points equal to your fighter level, provided that the creature can see or hear you.`,
      },
      {
        name: "Royal Envoy",
        level: 7,
        description: `A Purple Dragon Knight serves as an envoy of the Cormyrean crown. Knights of high standing are expected to conduct themselves with grace.
At 7th level, you gain proficiency in the Persuasion skill. If you are already proficient in it, you gain proficiency in one of the following skills of your choice: Animal Handling, Insight, Intimidation, or Performance.
Your proficiency bonus is doubled for any ability check you make that uses Persuasion. You receive this benefit regardless of the skill proficiency you gain from this feature.`,
      },
      {
        name: "Inspiring Surge",
        level: 10,
        description: `Starting at 10th level, when you use your Action Surge feature, you can choose one creature within 60 feet of you that is allied with you. That creature can make one melee or ranged weapon attack with its reaction, provided that it can see or hear you.
Starting at 18th level, you can choose two allies within 60 feet of you, rather than one.`,
      },
      {
        name: "Bulwark",
        level: 15,
        description: `Beginning at 15th level, you can extend the benefit of your Indomitable feature to an ally. When you decide to use Indomitable to reroll an Intelligence, a Wisdom, or a Charisma saving throw and you aren't incapacitated, you can choose one ally within 60 feet of you that also failed its saving throw against the same effect. If that creature can see or hear you, it can reroll its saving throw and must use the new roll.`,
      },
      {
        name: "Inspiring Surge",
        level: 18,
        description: `Starting at 18th level, you can choose two allies within 60 feet of you, rather than one.`,
      },
    ],
  },
  {
    key: "rune-knight",
    name: "Rune Knight",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `Rune Knights enhance their martial prowess using the supernatural power of runes, an ancient practice that originated with giants. Rune cutters can be found among any family of giants, and you likely learned your methods first or second hand from such a mystical artisan. Whether you found the giant's work carved into a hill or cave, learned of the runes from a sage, or met the giant in person, you studied the giant's craft and learned how to apply magic runes to empower your equipment.`,
      },
      {
        name: "Bonus Proficiencies",
        level: 3,
        description: `3rd-level Rune Knight feature
        You gain proficiency with smith's tools, and you learn to speak, read, and write Giant.`,
      },
      {
        name: "Rune Carver",
        level: 3,
        description: `3rd-level Rune Knight feature
        You can use magic runes to enhance your gear. You learn two runes of your choice, from among the runes described below, and each time you gain a level in this class, you can replace one rune you know with a different one from this feature. When you reach certain levels in this class, you learn additional runes, as shown in the Runes Known table.
Whenever you finish a long rest, you can touch a number of objects equal to the number of runes you know, and you inscribe a different rune onto each of the objects. To be eligible, an object must be a weapon, a suit of armor, a shield, a piece of jewelry, or something else you can wear or hold in a hand. Your rune remains on an object until you finish a long rest, and an object can bear only one of your runes at a time.`,
        table: {
          headers: ["Fighter Level", "Number of Runes"],
          rows: [
            ["3rd", "2"],
            ["7th", "3"],
            ["10th", "4"],
            ["15th", "5"],
          ],
        },
        description2: `The following runes are available to you when you learn a rune. If a rune has a level requirement, you must be at least that level in this class to learn the rune. If a rune requires a saving throw, your Rune Magic save DC equals 8 + your proficiency bonus + your Constitution modifier.
Cloud Rune. This rune emulates the deceptive magic used by some cloud giants. While wearing or carrying an object inscribed with this rune, you have advantage on Dexterity (Sleight of Hand) checks and Charisma (Deception) checks.
In addition, when you or a creature you can see within 30 feet of you is hit by an attack roll, you can use your reaction to invoke the rune and choose a different creature within 30 feet of you, other than the attacker. The chosen creature becomes the target of the attack, using the same roll. This magic can transfer the attack's effects regardless of the attack's range. Once you invoke this rune, you can't do so again until you finish a short or long rest.
Fire Rune. This rune's magic channels the masterful craftsmanship of great smiths. While wearing or carrying an object inscribed with this rune, your proficiency bonus is doubled for any ability check you make that uses your proficiency with a tool.
In addition, when you hit a creature with an attack using a weapon, you can invoke the rune to summon fiery shackles: the target takes an extra 2d6 fire damage, and it must succeed on a Strength saving throw or be restrained for 1 minute. While restrained by the shackles, the target takes 2d6 fire damage at the start of each of its turns. The target can repeat the saving throw at the end of each of its turns, banishing the shackles on a success. Once you invoke this rune, you can't do so again until you finish a short or long rest.
Frost Rune. This rune's magic evokes the might of those who survive in the wintry wilderness, such as frost giants. While wearing or carrying an object inscribed with this rune, you have advantage on Wisdom (Animal Handling) checks and Charisma (Intimidation) checks.
In addition, you can invoke the rune as a bonus action to increase your sturdiness. For 10 minutes, you gain a +2 bonus to all ability checks and saving throws that use Strength or Constitution. Once you invoke this rune, you can't do so again until you finish a short or long rest.
Hill Rune (7th Level or Higher). This rune's magic bestows a resilience reminiscent of a hill giant. While wearing or carrying an object that bears this rune, you have advantage on saving throws against being poisoned, and you have resistance against poison damage.
In addition, you can invoke the rune as a bonus action, gaining resistance to bludgeoning, piercing, and slashing damage for 1 minute. Once you invoke this rune, you can't do so again until you finish a short or long rest.
Stone Rune. This rune's magic channels the judiciousness associated with stone giants. While wearing or carrying an object inscribed with this rune, you have advantage on Wisdom (Insight) checks, and you have darkvision out to a range of 120 feet.
In addition, when a creature you can see ends its turn within 30 feet of you, you can use your reaction to invoke the rune and force the creature to make a Wisdom saving throw. Unless the save succeeds, the creature is charmed by you for 1 minute. While charmed in this way, the creature has a speed of 0 and is incapacitated, descending into a dreamy stupor. The creature repeats the saving throw at the end of each of its turns, ending the effect on a success. Once you invoke this rune, you can't do so again until you finish a short or long rest.
Storm Rune (7th Level or Higher). Using this rune, you can glimpse the future like a storm giant seer. While wearing or carrying an object inscribed with this rune, you have advantage on Intelligence (Arcana) checks, and you can't be surprised as long as you aren't incapacitated.
In addition, you can invoke the rune as a bonus action to enter a prophetic state for 1 minute or until you're incapacitated. Until the state ends, when you or another creature you can see within 60 feet of you makes an attack roll, a saving throw, or an ability check, you can use your reaction to cause the roll to have advantage or disadvantage. Once you invoke this rune, you can't do so again until you finish a short or long rest.`,
      },
      {
        name: "Giant's Might",
        level: 3,
        description: `3rd-level Rune Knight feature
        You have learned how to imbue yourself with the might of giants. As a bonus action, you magically gain the following benefits, which last for 1 minute:`,
        list: [
          "If you are smaller than Large, you become Large, along with anything you are wearing. If you lack the room to become Large, your size doesn't change.",
          "You have advantage on Strength checks and Strength saving throws.",
          "Once on each of your turns, one of your attacks with a weapon or an unarmed strike can deal an extra 1d6 damage to a target on a hit.",
        ],
        description2: `You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses of it when you finish a long rest.`,
      },
      {
        name: "Runic Shield",
        level: 7,
        description: `7th-level Rune Knight feature
        You learn to invoke your rune magic to protect your allies. When another creature you can see within 60 feet of you is hit by an attack roll, you can use your reaction to force the attacker to reroll the d20 and use the new roll.
You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Additional Rune Known",
        level: 7,
        description: `7th-level Rune Knight feature
        You learn an additional Rune.`,
      },
      {
        name: "Great Stature",
        level: 10,
        description: `10th-level Rune Knight feature
        The magic of your runes permanently alters you. When you gain this feature, roll 3d4. You grow a number of inches in height equal to the roll.
Moreover, the extra damage you deal with your Giant's Might feature increases to 1d8.`,
      },
      {
        name: "Additional Rune Known",
        level: 10,
        description: `10th-level Rune Knight feature
        You learn an additional Rune.`,
      },
      {
        name: "Master of Runes",
        level: 15,
        description: `15th-level Rune Knight feature
        You can invoke each rune you know from your Rune Carver feature twice, rather than once, and you regain all expended uses when you finish a short or long rest.`,
      },
      {
        name: "Additional Rune Known",
        level: 15,
        description: `15th-level Rune Knight feature
        You learn an additional Rune.`,
      },
      {
        name: "Runic Juggernaut",
        level: 18,
        description: `18th-level Rune Knight feature
        You learn how to amplify your rune-powered transformation. As a result, the extra damage you deal with the Giant's Might feature increases to 1d10. Moreover, when you use that feature, your size can increase to Huge, and while you are that size, your reach increases by 5 feet.`,
      },
    ],
  },
  {
    key: "samurai",
    name: "Samurai",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `The Samurai is a fighter who draws on an implacable fighting spirit to overcome enemies. A Samurai's resolve is nearly unbreakable, and the enemies in a Samurai's path have two choices: yield or die fighting.`,
      },
      {
        name: "Bonus Proficiency",
        level: 3,
        description: `When you choose this archetype at 3rd level, you gain proficiency in one of the following skills of your choice: History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice.`,
      },
      {
        name: "Fighting Spirit",
        level: 3,
        description: `Starting at 3rd level, your intensity in battle can shield you and help you strike true. As a bonus action on your turn, you can give yourself advantage on weapon attack rolls until the end of the current turn. When you do so, you also gain 5 temporary hit points. The number of temporary hit points increases when you reach certain levels in this class, increasing to 10 at 10th level and 15 at 15th level.
You can use this feature three times, and you regain all expended uses of it when you finish a long rest.`,
      },
      {
        name: "Elegant Courtier",
        level: 7,
        description: `Starting at 7th level, your discipline and attention to detail allow you to excel in social situations. Whenever you make a Charisma (Persuasion) check, you gain a bonus to the check equal to your Wisdom modifier.
Your self-control also causes you to gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice).`,
      },
      {
        name: "Tireless Spirit",
        level: 10,
        description: `Starting at 10th level, when you roll initiative and have no uses of Fighting Spirit remaining, you regain one use.`,
      },
      {
        name: "Rapid Strike",
        level: 15,
        description: `Starting at 15th level, you learn to trade accuracy for swift strikes. If you take the Attack action on your turn and have advantage on an attack roll against one of the targets, you can forgo the advantage for that roll to make an additional weapon attack against that target, as part of the same action. You can do so no more than once per turn.`,
      },
      {
        name: "Strength before Death",
        level: 18,
        description: `Starting at 18th level, your fighting spirit can delay the grasp of death. If you take damage that reduces you to 0 hit points and doesn't kill you outright, you can use your reaction to delay falling unconscious, and you can immediately take an extra turn, interrupting the current turn. While you have 0 hit points during that extra turn, taking damage causes death saving throw failures as normal, and three death saving throw failures can still kill you. When the extra turn ends, you fall unconscious if you still have 0 hit points.
Once you use this feature, you can't use it again until you finish a long rest.`,
      },
    ],
  },
];

export default fighterSubclass;
