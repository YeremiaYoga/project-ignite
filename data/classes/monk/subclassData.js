const monkSubclass = [
  {
    key: "ascendant-dragon",
    name: "Way of the Ascendant Dragon",
    source: "FTD",
    features: [
      {
        name: "",
        level: 3,
        description: `The dragon god Bahamut is known to travel the Material Plane in the guise of a young monk, and legend says that he founded the first monastery of the Way of the Ascendant Dragon in this guise. The fundamental teaching of this tradition holds that by emulating dragons, a monk becomes a more integrated part of the world and its magic. By altering their spirit to resonate with draconic might, monks who follow this tradition augment their prowess in battle, bolster their allies, and can even soar through the air on draconic wings. But all this power is in service of a greater goal: achieving a spiritual unity with the essence of the Material Plane.
As a follower of the Way of the Ascendant Dragon, you decide how you unlocked the power of dragons within yourself. The Ascendant Dragon Origin table offers a number of possibilities.`,
      },
      {
        name: "Ascendant Dragon Origin",
        level: 3,
        table: {
          title: "Ascendant Dragon Origin",
          rows: [
            ["d6", "Origin"],
            [
              "1",
              "You honed your abilities by aligning your spirit with a dragon's world-altering power.",
            ],
            [
              "2",
              "A dragon personally took an active role in shaping your inner energy.",
            ],
            [
              "3",
              "You studied at a monastery that traces its teachings back centuries or more to a single dragon's instruction, or one that is devoted to a dragon god.",
            ],
            [
              "4",
              "You spent long stretches meditating in the region around an ancient dragon's lair, absorbing that lair's ambient magic.",
            ],
            [
              "5",
              "You found a scroll written in Draconic that contained inspiring new techniques.",
            ],
            [
              "6",
              "After a dream featuring a five-handed dragonborn, you awoke with the mystical breath of dragons.",
            ],
          ],
        },
      },
      {
        name: "Draconic Disciple",
        level: 3,
        description: `You can channel draconic power to magnify your presence and imbue your unarmed strikes with the essence of a dragon's breath. You gain the following benefits:
Draconic Presence. If you fail a Charisma (Intimidation) or Charisma (Persuasion) check, you can use your reaction to reroll the check, as you tap into the mighty presence of dragons. Once this feature turns a failure into a success, you can't use it again until you finish a long rest.
Draconic Strike. When you damage a target with an unarmed strike, you can change the damage type to acid, cold, fire, lightning, or poison.
Tongue of Dragons. You learn to speak, read, and write Draconic or one other language of your choice.`,
      },
      {
        name: "Breath of the Dragon",
        level: 3,
        description: `You can channel destructive waves of energy, like those created by the dragons you emulate. When you take the Attack action on your turn, you can replace one of the attacks with an exhalation of draconic energy in either a 20-foot cone or a 30-foot line that is 5 feet wide (your choice). Choose a damage type: acid, cold, fire, lightning, or poison. Each creature in that area must make a Dexterity saving throw against your ki save DC, taking damage of the chosen type equal to two rolls of your Martial Arts die on a failed save, or half as much damage on a successful one.
At 11th level, the damage of this feature increases to three rolls of your Martial Arts die.
You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest. While you have no uses available, you can spend 2 ki points to use this feature again.`,
      },
      {
        name: "Wings Unfurled",
        level: 6,
        description: `When you use your Step of the Wind, you can unfurl spectral draconic wings from your back that vanish at the end of your turn. While the wings exist, you have a flying speed equal to your walking speed.
You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Aspect of the Wyrm",
        level: 11,
        description: `The power of your draconic spirit now radiates from you, warding your allies or inspiring fear in your enemies. As a bonus action, you can create an aura of draconic power that radiates 10 feet from you for 1 minute. For the duration, you gain one of the following effects of your choice:
Frightful Presence. When you create this aura, and as a bonus action on subsequent turns, you can choose a creature within the aura. The target must succeed on a Wisdom saving throw against your ki save DC or become frightened of you for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a successful save.
Resistance. Choose a damage type when you activate this aura: acid, cold, fire, lightning, or poison. You and your allies within the aura have resistance to that damage.
Once you create this aura, you can't create it again until you finish a long rest, unless you expend 3 ki points to create it again.`,
      },
      {
        name: "Ascendant Aspect",
        level: 17,
        description: `Your draconic spirit reaches its peak. You gain the following benefits:
Augment Breath. When you use your Breath of the Dragon, you can spend 1 ki point to augment its shape and power. The exhalation of draconic energy becomes either a 60-foot cone or a 90-foot line that is 5 feet wide (your choice), and each creature in that area takes damage equal to four rolls of your Martial Arts die on a failed save, or half as much damage on a successful one.
Blindsight. You gain blindsight out to 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you.
Explosive Fury. When you activate your Aspect of the Wyrm, draconic fury explodes from you. Choose any number of creatures you can see in your aura. Each of those creatures must succeed on a Dexterity saving throw against your ki save DC or take 3d10 acid, cold, fire, lightning, or poison damage (your choice).`,
      },
    ],
  },
  {
    key: "astral-self",
    name: "Way of the Astral Self",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `A monk who follows the Way of the Astral Self believes their body is an illusion. They see their ki as a representation of their true form, an astral self. This astral self has the capacity to be a force of order or disorder, with some monasteries training students to use their power to protect the weak and other instructing aspirants in how to manifest their true selves in service to the mighty.`,
      },
      {
        name: "Forms of Your Astral Self",
        level: 3,
        description: `The astral self is a translucent embodiment of the monk's soul. As a result, an astral self can reflect aspects of a monk's background, ideals, flaws, and bonds, and an astral self doesn't necessarily look anything like the monk. For example, the astral self of a lanky human might be reminiscent of a minotaur-the strength of which the monk feels within. Similarly, an orc monk might manifest gossamer arms and a delicate visage, representing the gentle beauty of the orc's soul. Each astral self is unique, and some of the monks of this monastic tradition are known more for the appearance of their astral self than for their physical appearance.
When choosing this path, consider the quirks that define your monk. Are you obsessed with something? Are you driven by justice or a selfish desire? Any of these motivations could manifest in the form of your astral self.`,
      },
      {
        name: "Arms of the Astral Self",
        level: 3,
        description: `3rd-level Way of the Astral Self feature
Your mastery of your ki allows you to summon a portion of your astral self. As a bonus action, you can spend 1 ki point to summon the arms of your astral self. When you do so, each creature of your choice that you can see within 10 feet of you must succeed on a Dexterity saving throw or take force damage equal to two rolls of your Martial Arts die.
For 10 minutes, these spectral arms hover near your shoulders or surround your arms (your choice). You determine the arms' appearance, and they vanish early if you are incapacitated or die.
While the spectral arms are present, you gain the following benefits:`,
        list: [
          "You can use your Wisdom modifier in place of your Strength modifier when making Strength checks and Strength saving throws.",
          "You can use the spectral arms to make unarmed strikes.",
          "When you make an unarmed strike with the arms on your turn, your reach for it is 5 feet greater than normal.",
          "The unarmed strikes you make with the arms can use your Wisdom modifier in place of your Strength or Dexterity modifier for the attack and damage rolls, and their damage type is force.",
        ],
      },
      {
        name: "Visage of the Astral Self",
        level: 6,
        description: `6th-level Way of the Astral Self feature
You can summon the visage of your astral self. As a bonus action, or as part of the bonus action you take to activate Arms of the Astral Self, you can spend 1 ki point to summon this visage for 10 minutes. It vanishes early if you are incapacitated or die.
The spectral visage covers your face like a helmet or mask. You determine its appearance.
While the spectral visage is present, you gain the following benefits.
Astral Sight. You can see normally in darkness, both magical and nonmagical, to a distance of 120 feet.
Wisdom of the Spirit. You have advantage on Wisdom (Insight) and Charisma (Intimidation) checks.
Word of the Spirit. When you speak, you can direct your words to a creature of your choice that you can see within 60 feet of you, making it so only that creature can hear you. Alternatively, you can amplify your voice so that all creatures within 600 feet can hear you.`,
      },
      {
        name: "Body of the Astral Self",
        level: 11,
        description: `11th-level Way of the Astral Self feature
When you have both your astral arms and visage summoned, you can cause the body of your astral self to appear (no action required). This spectral body covers your physical form like a suit of armor, connecting with the arms and visage. You determine its appearance.
While the spectral body is present, you gain the following benefits.
Deflect Energy. When you take acid, cold, fire, force, lightning, or thunder damage, you can use your reaction to deflect it. When you do so, the damage you take is reduced by 1d10 + your Wisdom modifier (minimum reduction of 1).
Empowered Arms. Once on each of your turns when you hit a target with the Arms of the Astral Self, you can deal extra damage to the target equal to your Martial Arts die.`,
      },
      {
        name: "Awakened Astral Self",
        level: 17,
        description: `17th-level Way of the Astral Self feature
Your connection to your astral self is complete, allowing you to unleash its full potential. As a bonus action, you can spend 5 ki points to summon the arms, visage, and body of your astral self and awaken it for 10 minutes. This awakening ends early if you are incapacitated or die.
While your astral self is awakened, you gain the following benefits.
Armor of the Spirit. You gain a +2 bonus to Armor Class.
Astral Barrage. Whenever you use the Extra Attack feature to attack twice, you can instead attack three times if all the attacks are made with your astral arms.`,
      },
    ],
  },
  {
    key: "drunken-master",
    name: "Way of the Drunken Master",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `The Way of the Drunken Master teaches its students to move with the jerky, unpredictable movements of a drunkard. A drunken master sways, tottering on unsteady feet, to present what seems like an incompetent combatant who proves frustrating to engage. The drunken master's erratic stumbles conceal a carefully executed dance of blocks, parries, advances, attacks, and retreats.
A drunken master often enjoys playing the fool to bring gladness to the despondent or to demonstrate humility to the arrogant, but when battle is joined, the drunken master can be a maddening, masterful foe.`,
      },
      {
        name: "Bonus Proficiencies",
        level: 3,
        description: `When you choose this tradition at 3rd level, you gain proficiency in the Performance skill if you don't already have it. Your martial arts technique mixes combat training with the precision of a dancer and the antics of a jester. You also gain proficiency with brewer's supplies if you don't already have it.`,
      },
      {
        name: "Drunken Technique",
        level: 3,
        description: `At 3rd level, you learn how to twist and turn quickly as part of your Flurry of Blows. Whenever you use Flurry of Blows, you gain the benefit of the Disengage action, and your walking speed increases by 10 feet until the end of the current turn.`,
      },
      {
        name: "Tipsy Sway",
        level: 6,
        description: `Starting at 6th level, you can move in sudden, swaying ways. You gain the following benefits.
Leap to Your Feet. When you're prone, you can stand up by spending 5 feet of movement, rather than half your speed.
Redirect Attack. When a creature misses you with a melee attack roll, you can spend 1 ki point as a reaction to cause that attack to hit one creature of your choice, other than the attacker, that you can see within 5 feet of you.`,
      },
      {
        name: "Drunkard's Luck",
        level: 11,
        description: `Starting at 11th level, you always seem to get a lucky bounce at the right moment. When you make an ability check, an attack roll, or a saving throw and have disadvantage on the roll, you can spend 2 ki points to cancel the disadvantage for that roll.`,
      },
      {
        name: "Intoxicated Frenzy",
        level: 17,
        description: `At 17th level, you gain the ability to make an overwhelming number of attacks against a group of enemies. When you use your Flurry of Blows, you can make up to three additional attacks with it (up to a total of five Flurry of Blows attacks), provided that each Flurry of Blows attack targets a different creature this turn.`,
      },
    ],
  },
  {
    key: "elements",
    name: "Warrior of the Elements",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Wield Strikes and Bursts of Elemental Power
Warriors of the Elements tap into the power of the Elemental Planes. Harnessing their supernatural focus, these Monks momentarily tame the energy of the Elemental Chaos to empower themselves in and out of battle.`,
      },
      {
        name: "Elemental Attunement",
        level: 3,
        description: `At the start of your turn, you can expend 1 Focus Point to imbue yourself with elemental energy. The energy lasts for 10 minutes or until you have the Incapacitated condition. You gain the following benefits while this feature is active.
Reach. When you make an Unarmed Strike, your reach is 10 feet greater than normal, as elemental energy extends from you.
Elemental Strikes. Whenever you hit with your Unarmed Strike, you can cause it to deal your choice of Acid, Cold, Fire, Lightning, or Thunder damage rather than its normal damage type. When you deal one of these types with it, you can also force the target to make a Strength saving throw. On a failed save, you can move the target up to 10 feet toward or away from you, as elemental energy swirls around it.`,
      },
      {
        name: "Manipulate Elements",
        level: 3,
        description: `You know the Elementalism spell. Wisdom is your spellcasting ability for it.`,
      },
      {
        name: "Elemental Burst",
        level: 6,
        description: `As a Magic action, you can expend 2 Focus Points to cause elemental energy to burst in a 20-foot-radius Sphere centered on a point within 120 feet of yourself. Choose a damage type: Acid, Cold, Fire, Lightning, or Thunder.
Each creature in the Sphere must make a Dexterity saving throw. On a failed save, a creature takes damage of the chosen type equal to three rolls of your Martial Arts die. On a successful save, a creature takes half as much damage.`,
      },
      {
        name: "Stride of the Elements",
        level: 11,
        description: `While your Elemental Attunement is active, you also have a Fly Speed and a Swim Speed equal to your Speed.`,
      },
      {
        name: "Elemental Epitome",
        level: 17,
        description: `While your Elemental Attunement is active, you also gain the following benefits.
Damage Resistance. You gain Resistance to one of the following damage types of your choice: Acid, Cold, Fire, Lightning, or Thunder. At the start of each of your turns, you can change this choice.
Destructive Stride. When you use your Step of the Wind, your Speed increases by 20 feet until the end of the turn. For that duration, any creature of your choice takes damage equal to one roll of your Martial Arts die when you enter a space within 5 feet of it. The damage type is your choice of Acid, Cold, Fire, Lightning, or Thunder. A creature can take this damage only once per turn.
Empowered Strikes. Once on each of your turns, you can deal extra damage to a target equal to one roll of your Martial Arts die when you hit it with an Unarmed Strike. The extra damage is the same type dealt by that strike.`,
      },
    ],
  },
  {
    key: "kensei",
    name: "Way of the Kensei",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `Monks of the Way of the Kensei train relentlessly with their weapons, to the point where the weapon becomes an extension of the body. Founded on a mastery of sword fighting, the tradition has expanded to include many different weapons.
A kensei sees a weapon in much the same way a calligrapher or painter regards a pen or brush. Whatever the weapon, the kensei views it as a tool used to express the beauty and precision of the martial arts. That such mastery makes a kensei a peerless warrior is but a side effect of intense devotion, practice, and study.`,
      },
      {
        name: "Path of the Kensei",
        level: 3,
        description: `When you choose this tradition at 3rd level, your special martial arts training leads you to master the use of certain weapons. This path also includes instruction in the deft strokes of calligraphy or painting. You gain the following benefits.
Kensei Weapons. Choose two types of weapons to be your kensei weapons: one melee weapon and one ranged weapon. Each of these weapons can be any simple or martial weapon that lacks the heavy and special properties. The longbow is also a valid choice. You gain proficiency with these weapons if you don't already have it. Weapons of the chosen types are monk weapons for you. Many of this tradition's features work only with your kensei weapons. When you reach 6th, 11th, and 17th level in this class, you can choose another type of weapon—either melee or ranged—to be a kensei weapon for you, following the criteria above.
Agile Parry. If you make an unarmed strike as part of the Attack action on your turn and are holding a kensei weapon, you can use it to defend yourself if it is a melee weapon. You gain a +2 bonus to AC until the start of your next turn, while the weapon is in your hand and you aren't incapacitated.
Kensei's Shot. You can use a bonus action on your turn to make your ranged attacks with a kensei weapon more deadly. When you do so, any target you hit with a ranged attack using a kensei weapon takes an extra 1d4 damage of the weapon's type. You retain this benefit until the end of the current turn.
Way of the Brush. You gain proficiency with your choice of calligrapher's supplies or painter's supplies.`,
      },
      {
        name: "One with the Blade",
        level: 6,
        description: `At 6th level, you extend your ki into your kensei weapons, granting you the following benefits.
Magic Kensei Weapons. Your attacks with your kensei weapons count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.
Deft Strike. When you hit a target with a kensei weapon, you can spend 1 ki point to cause the weapon to deal extra damage to the target equal to your Martial Arts die. You can use this feature only once on each of your turns.`,
      },
      {
        name: "Sharpen the Blade",
        level: 11,
        description: `At 11th level, you gain the ability to augment your weapons further with your ki. As a bonus action, you can expend up to 3 ki points to grant one kensei weapon you touch a bonus to attack and damage rolls when you attack with it. The bonus equals the number of ki points you spent. This bonus lasts for 1 minute or until you use this feature again. This feature has no effect on a magic weapon that already has a bonus to attack and damage rolls.`,
      },
      {
        name: "Unerring Accuracy",
        level: 17,
        description: `At 17th level, your mastery of weapons grants you extraordinary accuracy. If you miss with an attack roll using a monk weapon on your turn, you can reroll it. You can use this feature only once on each of your turns.`,
      },
    ],
  },
  {
    key: "long-death",
    name: "Way of the Long Death",
    source: "SCAG",
    features: [
      {
        name: "",
        level: 3,
        description: `Monks of the Way of the Long Death are obsessed with the meaning and mechanics of dying. They capture creatures and prepare elaborate experiments to capture, record, and understand the moments of their demise. They use this knowledge to guide their understanding of martial arts, yielding a deadly fighting style.`,
      },
      {
        name: "Touch of Death",
        level: 3,
        description: `Starting when you choose this tradition at 3rd level, your study of death allows you to extract vitality from another creature as it nears its demise. When you reduce a creature within 5 feet of you to 0 hit points, you gain temporary hit points equal to your Wisdom modifier + your monk level (minimum of 1 temporary hit point).`,
      },
      {
        name: "Hour of Reaping",
        level: 6,
        description: `At 6th level, you gain the ability to unsettle or terrify those around you as an action, for your soul has been touched by the shadow of death. When you take this action, each creature within 30 feet of you that can see you must succeed on a Wisdom saving throw or be frightened of you until the end of your next turn.`,
      },
      {
        name: "Mastery of Death",
        level: 11,
        description: `Beginning at 11th level, you use your familiarity with death to escape its grasp. When you are reduced to 0 hit points, you can expend 1 ki point (no action required) to have 1 hit point instead.`,
      },
      {
        name: "Touch of the Long Death",
        level: 17,
        description: `Starting at 17th level, your touch can channel the energy of death into a creature. As an action, you touch one creature within 5 feet of you, and you expend 1 to 10 ki points. The target must make a Constitution saving throw, and it takes 2d10 necrotic damage per ki point spent on a failed save, or half as much damage on a successful one.`,
      },
    ],
  },
  {
    key: "mercy",
    name: "Way of Mercy",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Manipulate Forces of Life and Death
Warriors of Mercy manipulate the life force of others. These Monks are wandering physicians, but they bring a swift end to their enemies. They often wear masks, presenting themselves as faceless bringers of life and death.`,
      },
      {
        name: "Hand of Harm",
        level: 3,
        description: `Once per turn when you hit a creature with an Unarmed Strike and deal damage, you can expend 1 Focus Point to deal extra Necrotic damage equal to one roll of your Martial Arts die plus your Wisdom modifier.`,
      },
      {
        name: "Hand of Healing",
        level: 3,
        description: `As a Magic action, you can expend 1 Focus Point to touch a creature and restore a number of Hit Points equal to a roll of your Martial Arts die plus your Wisdom modifier. When you use your Flurry of Blows, you can replace one of the Unarmed Strikes with a use of this feature without expending a Focus Point for the healing.`,
      },
      {
        name: "Implements of Mercy",
        level: 3,
        description: `You gain proficiency in the Insight and Medicine skills and proficiency with the Herbalism Kit.`,
      },
      {
        name: "Physician's Touch",
        level: 6,
        description: `Your Hand of Harm and Hand of Healing improve, as detailed below.
Hand of Harm. When you use Hand of Harm on a creature, you can also give that creature the Poisoned condition until the end of your next turn.
Hand of Healing. When you use Hand of Healing, you can also end one of the following conditions on the creature you heal: Blinded, Deafened, Paralyzed, Poisoned, or Stunned.`,
      },
      {
        name: "Flurry of Healing and Harm",
        level: 11,
        description: `When you use Flurry of Blows, you can replace each of the Unarmed Strikes with a use of Hand of Healing without expending Focus Points for the healing.
In addition, when you make an Unarmed Strike with Flurry of Blows and deal damage, you can use Hand of Harm with that strike without expending a Focus Point for Hand of Harm. You can still use Hand of Harm only once per turn.
You can use these benefits a total number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a Long Rest.`,
      },
      {
        name: "Hand of Ultimate Mercy",
        level: 17,
        description: `Your mastery of life energy opens the door to the ultimate mercy. As a Magic action, you can touch the corpse of a creature that died within the past 24 hours and expend 5 Focus Points. The creature then returns to life with a number of Hit Points equal to 4d10 plus your Wisdom modifier. If the creature died with any of the following conditions, the creature revives with the conditions removed: Blinded, Deafened, Paralyzed, Poisoned, and Stunned.
Once you use this feature, you can't use it again until you finish a Long Rest.`,
      },
    ],
  },
  {
    key: "open-hand",
    name: "Way of the Open Hand",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Master Unarmed Combat Techniques
Warriors of the Open Hand are masters of unarmed combat. They learn techniques to push and trip their opponents and manipulate their own energy to protect themselves from harm.`,
      },
      {
        name: "Open Hand Technique",
        level: 3,
        description: `Whenever you hit a creature with an attack granted by your Flurry of Blows, you can impose one of the following effects on that target.
Addle. The target can't make Opportunity Attacks until the start of its next turn.
Push. The target must succeed on a Strength saving throw or be pushed up to 15 feet away from you.
Topple. The target must succeed on a Dexterity saving throw or have the Prone condition.`,
      },
      {
        name: "Wholeness of Body",
        level: 6,
        description: `You gain the ability to heal yourself. As a Bonus Action, you can roll your Martial Arts die. You regain a number of Hit Points equal to the number rolled plus your Wisdom modifier (minimum of 1 Hit Point regained).
You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.`,
      },
      {
        name: "Fleet Step",
        level: 11,
        description: `When you take a Bonus Action other than Step of the Wind, you can also use Step of the Wind immediately after that Bonus Action.`,
      },
      {
        name: "Quivering Palm",
        level: 17,
        description: `You gain the ability to set up lethal vibrations in someone's body. When you hit a creature with an Unarmed Strike, you can expend 4 Focus Points to start these imperceptible vibrations, which last for a number of days equal to your Monk level. The vibrations are harmless unless you take an action to end them. Alternatively, when you take the Attack action on your turn, you can forgo one of the attacks to end the vibrations. To end them, you and the target must be on the same plane of existence. When you end them, the target must make a Constitution saving throw, taking 10d12 Force damage on a failed save or half as much damage on a successful one.
You can have only one creature under the effect of this feature at a time. You can end the vibrations harmlessly (no action required).`,
      },
    ],
  },
  {
    key: "shadow",
    name: "Way of Shadow",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Harness Shadow Power for Stealth and Subterfuge
Warriors of Shadow practice stealth and subterfuge, harnessing the power of the Shadowfell. They are at home in darkness, able to draw gloom around themselves to hide, leap from shadow to shadow, and take on a wraithlike form.`,
      },
      {
        name: "Shadow Arts",
        level: 3,
        description: `You have learned to draw on the power of the Shadowfell, gaining the following benefits.
Darkness. You can expend 1 Focus Point to cast the Darkness spell without spell components. You can see within the spell's area when you cast it with this feature. While the spell persists, you can move its area of Darkness to a space within 60 feet of yourself at the start of each of your turns.
Darkvision. You gain Darkvision with a range of 60 feet. If you already have Darkvision, its range increases by 60 feet.
Shadowy Figments. You know the Minor Illusion spell. Wisdom is your spellcasting ability for it.`,
      },
      {
        name: "Shadow Step",
        level: 6,
        description: `While entirely within Dim Light or Darkness, you can use a Bonus Action to teleport up to 60 feet to an unoccupied space you can see that is also in Dim Light or Darkness. You then have Advantage on the next melee attack you make before the end of the current turn.`,
      },
      {
        name: "Improved Shadow Step",
        level: 11,
        description: `You can draw on your Shadowfell connection to empower your teleportation. When you use your Shadow Step, you can expend 1 Focus Point to remove the requirement that you must start and end in Dim Light or Darkness for that use of the feature. As part of this Bonus Action, you can make an Unarmed Strike immediately after you teleport.`,
      },
      {
        name: "Cloak of Shadows",
        level: 17,
        description: `As a Magic action while entirely within Dim Light or Darkness, you can expend 3 Focus Points to shroud yourself with shadows for 1 minute, until you have the Incapacitated condition, or until you end your turn in Bright Light. While shrouded by these shadows, you gain the following benefits.
Invisibility. You have the Invisible condition.
Partially Incorporeal. You can move through occupied spaces as if they were Difficult Terrain. If you end your turn in such a space, you are shunted to the last unoccupied space you were in.
Shadow Flurry. You can use your Flurry of Blows without expending any Focus Points.`,
      },
    ],
  },
  {
    key: "sun-soul",
    name: "Way of the Sun Soul",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `Monks of the Way of the Sun Soul learn to channel their life energy into searing bolts of light. They teach that meditation can unlock the ability to unleash the indomitable light shed by the soul of every living creature.`,
      },
      {
        name: "Radiant Sun Bolt",
        level: 3,
        description: `Starting when you choose this tradition at 3rd level, you can hurl searing bolts of magical radiance.
You gain a new attack option that you can use with the Attack action. The special attack is a ranged spell attack with a range of 30 feet. You are proficient with it, and you add your Dexterity modifier to its attack and damage rolls. Its damage is radiant, and its damage die is a d4. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.
When you take the Attack action on your turn and use this special attack as part of it, you can spend 1 ki point to make the special attack twice as a bonus action. When you gain the Extra Attack feature, this special attack can be used for any of the attacks you make as part of the Attack action.`,
      },
      {
        name: "Searing Arc Strike",
        level: 6,
        description: `At 6th level, you gain the ability to channel your ki into searing waves of energy. Immediately after you take the Attack action on your turn, you can spend 2 ki points to cast the burning hands spell as a bonus action.
You can spend additional ki points to cast burning hands as a higher-level spell. Each additional ki point you spend increases the spell's level by 1. The maximum number of ki points (2 plus any additional points) that you can spend on the spell equals half your monk level.`,
      },
      {
        name: "Searing Sunburst",
        level: 11,
        description: `At 11th level, you gain the ability to create an orb of light that erupts into a devastating explosion. As an action, you magically create an orb and hurl it at a point you choose within 150 feet, where it erupts into a sphere of radiant light for a brief but deadly instant.
Each creature in that 20-foot-radius sphere must succeed on a Constitution saving throw or take 2d6 radiant damage. A creature doesn't need to make the save if the creature is behind total cover that is opaque.
You can increase the sphere's damage by spending ki points. Each point you spend, to a maximum of 3, increases the damage by 2d6.`,
      },
      {
        name: "Sun Shield",
        level: 17,
        description: `At 17th level, you become wreathed in a luminous, magical aura. You shed bright light in a 30-foot radius and dim light for an additional 30 feet. You can extinguish or restore the light as a bonus action.
If a creature hits you with a melee attack while this light shines, you can use your reaction to deal radiant damage to the creature. The radiant damage equals 5 + your Wisdom modifier.`,
      },
    ],
  },
];

export default monkSubclass;
