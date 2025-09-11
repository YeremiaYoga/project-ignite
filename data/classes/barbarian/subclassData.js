const barbarianSubclass = [
  {
    key: "ancestral-guardian",
    name: "Path of the Ancestral Guardian",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `This subclass is from a different game edition. For a given subclass feature, you may gain that feature at a different level from the one specified in the subclass feature.
        Some barbarians hail from cultures that revere their ancestors. These tribes teach that the warriors of the past linger in the world as mighty spirits, who can guide and protect the living. When a barbarian who follows this path rages, the barbarian contacts the spirit world and calls on these guardian spirits for aid.
Barbarians who draw on their ancestral guardians can better fight to protect their tribes and their allies. In order to cement ties to their ancestral guardians, barbarians who follow this path cover themselves in elaborate tattoos that celebrate their ancestors' deeds. These tattoos tell sagas of victories against terrible monsters and other fearsome rivals.`,
      },
      {
        name: "Ancestral Protectors",
        level: 3,
        description: `Starting when you choose this path at 3rd level, spectral warriors appear when you enter your rage. While you're raging, the first creature you hit with an attack on your turn becomes the target of the warriors, which hinder its attacks. Until the start of your next turn, that target has disadvantage on any attack roll that isn't against you, and when the target hits a creature other than you with an attack, that creature has resistance to the damage dealt by the attack. The effect on the target ends early if your rage ends.`,
      },
      {
        name: "Spirit Shield",
        level: 6,
        description: `Beginning at 6th level, the guardian spirits that aid you can provide supernatural protection to those you defend. If you are raging and another creature you can see within 30 feet of you takes damage, you can use your reaction to reduce that damage by 2d6.
When you reach certain levels in this class, you can reduce the damage by more: by 3d6 at 10th level and by 4d6 at 14th level.`,
      },
      {
        name: "Consult the Spirits",
        level: 10,
        description: `At 10th level, you gain the ability to consult with your ancestral spirits. When you do so, you cast the augury or clairvoyance spell, without using a spell slot or material components. Rather than creating a spherical sensor, this use of clairvoyance invisibly summons one of your ancestral spirits to the chosen location. Wisdom is your spellcasting ability for these spells.
After you cast either spell in this way, you can't use this feature again until you finish a short or long rest.`,
      },
      {
        name: "Vengeful Ancestors",
        level: 14,
        description: `At 14th level, your ancestral spirits grow powerful enough to retaliate. When you use your Spirit Shield to reduce the damage of an attack, the attacker takes an amount of force damage equal to the damage that your Spirit Shield prevents.`,
      },
    ],
  },
  {
    key: "battlerager",
    name: "Path of the Battlerager",
    source: "SCAG",
    features: [
      {
        name: "",
        level: 3,
        description: `This subclass is from a different game edition. For a given subclass feature, you may gain that feature at a different level from the one specified in the subclass feature.
Known as Kuldjargh (literally "axe idiot") in Dwarvish, battleragers are dwarf followers of the gods of war and take the Path of the Battlerager. They specialize in wearing bulky, spiked armor and throwing themselves into combat, striking with their body itself and giving themselves over to the fury of battle.`,
      },
      {
        name: "Restriction—Dwarves Only",
        level: 3,
        description: `Only dwarves can follow the Path of the Battlerager. The battlerager fills a particular niche in dwarven society and culture.
Your DM can lift this restriction to better suit the campaign. The restriction exists for the Forgotten Realms. It might not apply to your DM's setting or your DM's version of the Realms.`,
      },
      {
        name: "Battlerager Armor",
        level: 3,
        description: `When you choose this path at 3rd level, you gain the ability to use spiked armor as a weapon.
While you are wearing spiked armor and are raging, you can use a bonus action to make one melee weapon attack with your armor spikes at a target within 5 feet of you. If the attack hits, the spikes deal 1d4 piercing damage. You use your Strength modifier for the attack and damage rolls.
Additionally, when you use the Attack action to grapple a creature, the target takes 3 piercing damage if your grapple check succeeds.`,
      },
      {
        name: "Reckless Abandon",
        level: 6,
        description: `Beginning at 6th level, when you use Reckless Attack while raging, you also gain temporary hit points equal to your Constitution modifier (minimum of 1). They vanish if any of them are left when your rage ends.`,
      },
      {
        name: "Battlerager Charge",
        level: 10,
        description: `Beginning at 10th level, you can take the Dash action as a bonus action while you are raging.`,
      },
      {
        name: "Spiked Retribution",
        level: 14,
        description: `Starting at 14th level, when a creature within 5 feet of you hits you with a melee attack, the attacker takes 3 piercing damage if you are raging, aren't incapacitated, and are wearing spiked armor.`,
      },
    ],
  },
  {
    key: "beast",
    name: "Path of the Beast",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `This subclass is from a different game edition. For a given subclass feature, you may gain that feature at a different level from the one specified in the subclass feature.
Barbarians who walk the Path of the Beast draw their rage from a bestial spark burning within their souls. That beast bursts forth in the throes of rage, physically transforming the barbarian.
Such a barbarian might be inhabited by a primal spirit or be descended from shape-shifters. You can choose the origin of your feral might or determine it by rolling on the Origin of the Beast table.
Origin of the Beast
`,
        table: {
          headers: ["d4", "Origin"],
          rows: [
            [
              "1",
              "One of your parents is a lycanthrope, and you've inherited some of their curse.",
            ],
            [
              "2",
              "You are descended from an archdruid and inherited the ability to partially change shape.",
            ],
            [
              "3",
              "A fey spirit gifted you with the ability to adopt different bestial aspects.",
            ],
            [
              "4",
              "An ancient animal spirit dwells within you, allowing you to walk this path.",
            ],
          ],
        },
      },
      {
        name: "Form of the Beast",
        level: 3,
        description: `When you enter your rage, you can transform, revealing the bestial power within you. Until the rage ends, you manifest a natural weapon. It counts as a simple melee weapon for you, and you add your Strength modifier to the attack and damage rolls when you attack with it, as normal.
You choose the weapon's form each time you rage:
Bite. Your mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have less than half your hit points when you hit.
Claws. Each of your hands transforms into a claw, which you can use as a weapon if it's empty. It deals 1d6 slashing damage on a hit. Once on each of your turns when you attack with a claw using the Attack action, you can make one additional claw attack as part of the same action.
Tail. You grow a lashing, spiny tail, which deals 1d8 piercing damage on a hit and has the reach property. If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and roll a d8, applying a bonus to your AC equal to the number rolled, potentially causing the attack to miss you.`,
      },
      {
        name: "Bestial Soul",
        level: 6,
        description: `The feral power within you increases, causing the natural weapons of your Form of the Beast to count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.
You can also alter your form to help you adapt to your surroundings. When you finish a short or long rest, choose one of the following benefits, which lasts until you finish your next short or long rest:`,
        list: [
          "You gain a swimming speed equal to your walking speed, and you can breathe underwater.",
          "You gain a climbing speed equal to your walking speed, and you can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
          "When you jump, you can make a Strength (Athletics) check and extend your jump by a number of feet equal to the check's total. You can make this special check only once per turn.",
        ],
      },
      {
        name: "Infectious Fury",
        level: 10,
        description: `When you hit a creature with your natural weapons while you are raging, the beast within you can curse your target with rabid fury. The target must succeed on a Wisdom saving throw (DC equal to 8 + your Constitution modifier + your proficiency bonus) or suffer one of the following effects (your choice):`,
        list: [
          "The target must use its reaction to make a melee attack against another creature of your choice that you can see.",
          "The target takes 2d12 psychic damage.",
        ],
        description2: `You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Call the Hunt",
        level: 14,
        description: `The beast within you grows so powerful that you can spread its ferocity to others and gain resilience from them joining your hunt. When you enter your rage, you can choose a number of other willing creatures you can see within 30 feet of you equal to your Constitution modifier (minimum of one creature).
You gain 5 temporary hit points for each creature that accepts this feature. Until the rage ends, the chosen creatures can each use the following benefit once on each of their turns: when the creature hits a target with an attack roll and deals damage to it, the creature can roll a d6 and gain a bonus to the damage equal to the number rolled.
You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
    ],
  },
  {
    key: "berserker",
    name: "Path of the Berserker",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Channel Rage into Violent Fury
        Barbarians who walk the Path of the Berserker direct their Rage primarily toward violence. Their path is one of untrammeled fury, and they thrill in the chaos of battle as they allow their Rage to seize and empower them.`,
      },
      {
        name: "Frenzy",
        level: 3,
        description: `If you use Reckless Attack while your Rage is active, you deal extra damage to the first target you hit on your turn with a Strength-based attack. To determine the extra damage, roll a number of d6s equal to your Rage Damage bonus, and add them together. The damage has the same type as the weapon or Unarmed Strike used for the attack.`,
      },
      {
        name: "Mindless Rage",
        level: 6,
        description: `You have Immunity to the Charmed and Frightened conditions while your Rage is active. If you're Charmed or Frightened when you enter your Rage, the condition ends on you.`,
      },
      {
        name: "Retaliation",
        level: 10,
        description: `When you take damage from a creature that is within 5 feet of you, you can take a Reaction to make one melee attack against that creature, using a weapon or an Unarmed Strike.`,
      },
      {
        name: "Intimidating Presence",
        level: 14,
        description: `As a Bonus Action, you can strike terror into others with your menacing presence and primal power. When you do so, each creature of your choice in a 30-foot Emanation originating from you must make a Wisdom saving throw (DC 8 plus your Strength modifier and Proficiency Bonus). On a failed save, a creature has the Frightened condition for 1 minute. At the end of each of the Frightened creature's turns, the creature repeats the save, ending the effect on itself on a success.
Once you use this feature, you can't use it again until you finish a Long Rest unless you expend a use of your Rage (no action required) to restore your use of it.`,
      },
    ],
  },
  {
    key: "giant",
    name: "Path of the Giant",
    source: "BGG",
    features: [
      {
        name: "",
        level: 3,
        description: `Barbarians who walk the Path of the Giant draw strength from the same primal forces as giants. As they rage, these barbarians surge with elemental power and grow in size, taking on forms that evoke the glory of giants. Some barbarians look like oversized versions of themselves, perhaps with a hint of elemental energy flaring in their eyes and around their weapons. Others transform more dramatically, taking on the appearance of an actual giant or a form similar to an Elemental, wreathed in fire, frost, or lightning.`,
      },
      {
        name: "Giant Power",
        level: 3,
        description: `3rd-Level Path of the Giant Feature
        When you choose this path, you learn to speak, read, and write Giant or one other language of your choice if you already know Giant. Additionally, you learn a cantrip of your choice: either druidcraft or thaumaturgy. Wisdom is your spellcasting ability for this spell.`,
      },
      {
        name: "Giant's Havoc",
        level: 3,
        description: `3rd-Level Path of the Giant Feature
        Your rages pull strength from the primal might of giants, transforming you into a hulking force of destruction. While raging, you gain the following benefits:
Crushing Throw. When you make a successful ranged attack with a thrown weapon using Strength, you can add your Rage Damage bonus to the attack's damage roll.
Giant Stature. Your reach increases by 5 feet, and if you are smaller than Large, you become Large, along with anything you are wearing. If there isn't enough room for you to increase your size, your size doesn't change.`,
      },
      {
        name: "Elemental Cleaver",
        level: 6,
        description: `6th-Level Path of the Giant Feature
        Your bond with the elemental might of giants grows, and you learn to infuse weapons with primordial energy.
When you enter your rage, you can choose one weapon that you are holding and infuse it with one of the following damage types: acid, cold, fire, thunder, or lightning. While you wield the infused weapon during your rage, the weapon's damage type changes to the chosen type, it deals an extra 1d6 damage of the chosen type when it hits, and it gains the thrown property, with a normal range of 20 feet and a long range of 60 feet. If you throw the weapon, it reappears in your hand the instant after it hits or misses a target. The infused weapon's benefits are suppressed while a creature other than you wields it.
While raging and holding the infused weapon, you can use a bonus action to change the infused weapon's current damage type to another one from the damage type options above.`,
      },
      {
        name: "Mighty Impel",
        level: 10,
        description: `10th-Level Path of the Giant Feature
        Your connection to giant strength allows you to hurl both allies and enemies on the battlefield. As a bonus action while raging, you can choose one Medium or smaller creature within your reach and move it to an unoccupied space you can see within 30 feet of yourself. An unwilling creature must succeed on a Strength saving throw (DC equals 8 + your proficiency bonus + your Strength modifier) to avoid the effect.
If, at the end of this movement, the thrown creature isn't on a surface or liquid that can support it, the creature falls, taking damage as normal and landing prone.`,
      },
      {
        name: "Demiurgic Colossus",
        level: 14,
        description: `14th-Level Path of the Giant Feature
        The primordial power of your rage intensifies. When you rage, your reach increases by 10 feet, your size can increase to Large or Huge (your choice), and you can use your Mighty Impel to move creatures that are Large or smaller.
In addition, the extra damage dealt by your Elemental Cleaver feature increases to 2d6.`,
      },
    ],
  },
  {
    key: "juggernaut",
    name: "Path of the Juggernaut",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `Barbarians who follow the Path of the Juggernaut stand so resolutely that none can deter them, and they swing their weapons with such force that all who stand against them are flung aside. In might and in spirit, juggernauts are immovable object and unstoppable force all at once.
Juggernaut barbarians can be found all over Tal'Dorei, and are common among the goliath warriors of the Rivermaw herd that wanders the Dividing Plains. Some dwarves and humanoid survivalists of the Cliffkeep Mountains adopt this fighting style as an extension of their rugged determinism. And a number of stalwart juggernauts hail from the jungles of the Rifenmist Peninsula, having cast off the oppressive yoke of the Iron Authority.`,
      },
      {
        name: "Thunderous Blows",
        level: 3,
        description: `
Starting when you choose this path at 3rd level, your rage instills you with the strength to shove and smash your way through your foes, making any battlefield your domain. When you hit a creature with a melee attack while you're raging, you can push that creature up to 5 feet away from you in a direction of your choice. A creature that is Huge or larger makes a Strength saving throw with a DC equal to 8 + your proficiency bonus + your Strength modifier. On a success, the creature is not pushed.`,
      },
      {
        name: "Spirit of the Mountain",
        level: 3,
        description: `At 3rd level, you harness your fury to anchor your feet to the ground, becoming a bulwark of strength. While you are raging, you can't be knocked prone or moved along the ground against your will.`,
      },
      {
        name: "Rules Tip: Forced Movement",
        level: 3,
        notes: `Usually when one creature moves out of a hostile creature's reach, the hostile creature can use its reaction to make an opportunity attack. However, forced movement—such as being pushed by a Path of the Juggernaut barbarian's Thunderous Blows feature—doesn't provoke opportunity attacks.
Likewise, a juggernaut barbarian's Hurricane Strike feature allows an ally to make a melee weapon attack as a reaction only if the foe ends its forced movement within 5 feet of the ally. If a foe is pushed through other spaces within 5 feet of your allies, those allies can't make normal opportunity attacks against the foe.`,
      },
      {
        name: "Demolishing Might",
        level: 6,
        description: `Starting at 6th level, your melee weapon attacks deal an extra 1d8 damage to constructs, and deal double damage to objects and structures.`,
      },
      {
        name: "Resolute Stance",
        level: 6,
        description: `Also at 6th level, you can temporarily refocus your combat ability to make yourself a bulwark of defense. At the start of your turn (no action required), you can assume a defensive stance that lasts until the start of your next turn. While in this stance, you can't be grappled, attack rolls against you have disadvantage, and your weapon attacks are made with disadvantage.`,
      },
      {
        name: "Thunderous Blows (10Th Level)",
        level: 10,
        description: `Starting at 10th level, you can push a creature up to 10 feet when you hit it with a melee attack while you're raging.`,
      },
      {
        name: "Hurricane Strike",
        level: 10,
        description: `Starting at 10th level, your blows can hurl foes through the air and into the attacks of your allies. As a reaction when you push a creature at least 5 feet, you can then leap into an unoccupied space next to the creature. If you do so, the creature must succeed on a Strength saving throw with a DC equal to 8 + your proficiency bonus + your Strength modifier or be knocked prone. This leap costs no movement and does not provoke opportunity attacks.
Additionally, whenever you push a creature into a space within 5 feet of one of your allies, the ally can use its reaction to make a melee weapon attack against that creature.`,
      },
      {
        name: "Unstoppable",
        level: 14,
        description: `At 14th level, your fury in battle makes you unstoppable. While you're raging, your speed cannot be reduced, and you are immune to the frightened, paralyzed, prone, and stunned conditions.
If you are frightened, paralyzed, or stunned, you can still use a bonus action to enter a rage (even if you can't otherwise take actions). You aren't affected by any of these conditions while you're raging.`,
      },
    ],
  },
  {
    key: "storm-herald",
    name: "Path of the Storm Herald",
    source: "XGE",
    features: [
      {
        name: "",
        level: 3,
        description: `All barbarians harbor a fury within. Their rage grants them superior strength, durability, and speed. Barbarians who follow the Path of the Storm Herald learn to transform that rage into a mantle of primal magic, which swirls around them. When in a fury, a barbarian of this path taps into the forces of nature to create powerful magical effects.

Storm heralds are typically elite champions who train alongside druids, rangers, and others sworn to protect nature. Other storm heralds hone their craft in lodges in regions wracked by storms, in the frozen reaches at the world's end, or deep in the hottest deserts.`,
      },
      {
        name: "Storm Aura",
        level: 3,
        description: `Starting at 3rd level, you emanate a stormy, magical aura while you rage. The aura extends 10 feet from you in every direction, but not through total cover.
Your aura has an effect that activates when you enter your rage, and you can activate the effect again on each of your turns as a bonus action. Choose desert, sea, or tundra. Your aura's effect depends on that chosen environment, as detailed below. You can change your environment choice whenever you gain a level in this class.
If your aura's effects require a saving throw, the DC equals 8 + your proficiency bonus + your Constitution modifier.
Desert. When this effect is activated, all other creatures in your aura take 2 fire damage each. The damage increases when you reach certain levels in this class, increasing to 3 at 5th level, 4 at 10th level, 5 at 15th level, and 6 at 20th level.
Sea. When this effect is activated, you can choose one other creature you can see in your aura. The target must make a Dexterity saving throw. The target takes 1d6 lightning damage on a failed save, or half as much damage on a successful one. The damage increases when you reach certain levels in this class, increasing to 2d6 at 10th level, 3d6 at 15th level, and 4d6 at 20th level.
Tundra. When this effect is activated, each creature of your choice in your aura gains 2 temporary hit points, as icy spirits inure it to suffering. The temporary hit points increase when you reach certain levels in this class, increasing to 3 at 5th level, 4 at 10th level, 5 at 15th level, and 6 at 20th level.`,
      },
      {
        name: "Primal Knowledge",
        level: 3,
        description: `At 3rd level, you gain an additional way to express your primal power. You can choose one skill from Animal Handling, Nature, Survival, or Intimidation. You gain proficiency in the chosen skill.`,
      },
      {
        name: "Storm Soul",
        level: 6,
        description: `At 6th level, the storm grants you benefits even when your aura isn't active. The benefits are based on the environment you chose for your Storm Aura.
Desert. You gain resistance to fire damage, and you don't suffer the effects of extreme heat, as described in the Dungeon Master's Guide. Moreover, as an action, you can touch a flammable object that isn't being worn or carried by anyone else and set it on fire.
Sea. You gain resistance to lightning damage, and you can breathe underwater. You also gain a swimming speed of 30 feet.
Tundra. You gain resistance to cold damage, and you don't suffer the effects of extreme cold, as described in the Dungeon Master's Guide. Moreover, as an action, you can touch water and turn a 5-foot cube of it into ice, which melts after 1 minute. This action fails if a creature is in the cube.`,
      },
      {
        name: "Shielding Storm",
        level: 10,
        description: `At 10th level, you learn to use your mastery of the storm to protect others. Each creature of your choice has the damage resistance you gained from the Storm Soul feature while the creature is in your Storm Aura.`,
      },
      {
        name: "Raging Storm",
        level: 14,
        description: `At 14th level, the power of the storm you channel grows mightier, lashing out at your foes. The effect is based on the environment you chose for your Storm Aura.
Desert. Immediately after a creature in your aura hits you with an attack, you can use your reaction to force that creature to make a Dexterity saving throw. On a failed save, the creature takes fire damage equal to half your barbarian level.
Sea. When you hit a creature in your aura with an attack, you can use your reaction to force that creature to make a Strength saving throw. On a failed save, the creature is knocked prone, as if struck by a wave.
Tundra. Whenever the effect of your Storm Aura is activated, you can choose one creature you can see in the aura. That creature must succeed on a Strength saving throw, or its speed is reduced to 0 until the start of your next turn, as magical frost covers it.`,
      },
    ],
  },
  {
    key: "wild-heart",
    name: "Path of the Wild Heart",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Barbarians who follow the Path of the Wild Heart view themselves as kin to animals. These Barbarians learn magical means to communicate with animals, and their Rage heightens their connection to animals as it fills them with supernatural might.`,
      },
      {
        name: "Animal Speaker",
        level: 3,
        description: `You can cast the Beast Sense and Speak with Animals spells but only as Rituals. Wisdom is your spellcasting ability for them.`,
      },
      {
        name: "Rage of the Wilds",
        level: 3,
        description: `Your Rage taps into the primal power of animals. Whenever you activate your Rage, you gain one of the following options of your choice.
Bear. While your Rage is active, you have Resistance to every damage type except Force, Necrotic, Psychic, and Radiant.
Eagle. When you activate your Rage, you can take the Disengage and Dash actions as part of that Bonus Action. While your Rage is active, you can take a Bonus Action to take both of those actions.
Wolf. While your Rage is active, your allies have Advantage on attack rolls against any enemy of yours within 5 feet of you.`,
      },
      {
        name: "Aspect of the Wilds",
        level: 6,
        description: `You gain one of the following options of your choice. Whenever you finish a Long Rest, you can change your choice.
Owl. You have Darkvision with a range of 60 feet. If you already have Darkvision, its range increases by 60 feet.
Panther. You have a Climb Speed equal to your Speed.
Salmon. You have a Swim Speed equal to your Speed.`,
      },
      {
        name: "Nature Speaker",
        level: 10,
        description: `You can cast the Commune with Nature spell but only as a Ritual. Wisdom is your spellcasting ability for it.`,
      },
      {
        name: "Power of the Wilds",
        level: 14,
        description: `Whenever you activate your Rage, you gain one of the following options of your choice.
Falcon. While your Rage is active, you have a Fly Speed equal to your Speed if you aren't wearing any armor.
Lion. While your Rage is active, any of your enemies within 5 feet of you have Disadvantage on attack rolls against targets other than you or another Barbarian who has this option active.
Ram. While your Rage is active, you can cause a Large or smaller creature to have the Prone condition when you hit it with a melee attack.`,
      },
    ],
  },
  {
    key: "wild-magic",
    name: "Path of the Wild Magic",
    source: "TCE",
    features: [
      {
        name: "",
        level: 3,
        description: `Many places in the multiverse abound with beauty, intense emotion, and rampant magic; the Feywild, the Upper Planes, and other realms of supernatural power radiate with such forces and can profoundly influence people. As folk of deep feeling, barbarians are especially susceptible to these wild influences, with some barbarians being transformed by the magic. These magic-suffused barbarians walk the Path of Wild Magic. Elf, tiefling, aasimar, and genasi barbarians often seek this path, eager to manifest the otherworldly magic of their ancestors.`,
      },
      {
        name: "Magic Awareness",
        level: 3,
        description: `As an action, you can open your awareness to the presence of concentrated magic. Until the end of your next turn, you know the location of any spell or magic item within 60 feet of you that isn't behind total cover. When you sense a spell, you learn which school of magic it belongs to.
You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Wild Surge",
        level: 3,
        description: `The magical energy roiling inside you sometimes erupts from you. When you enter your rage, roll on the Wild Magic table to determine the magical effect produced.
If the effect requires a saving throw, the DC equals 8 + your proficiency bonus + your Constitution modifier.`,
        table: {
          headers: ["d8", "Magical Effect"],
          rows: [
            [
              "1",
              "Shadowy tendrils lash around you. Each creature of your choice that you can see within 30 feet of you must succeed on a Constitution saving throw or take 1d12 necrotic damage. You also gain 1d12 temporary hit points.",
            ],
            [
              "2",
              "You teleport up to 30 feet to an unoccupied space you can see. Until your rage ends, you can use this effect again on each of your turns as a bonus action.",
            ],
            [
              "3",
              "An intangible spirit, which looks like a flumph or a pixie (your choice), appears within 5 feet of one creature of your choice that you can see within 30 feet of you. At the end of the current turn, the spirit explodes, and each creature within 5 feet of it must succeed on a Dexterity saving throw or take 1d6 force damage. Until your rage ends, you can use this effect again, summoning another spirit, on each of your turns as a bonus action.",
            ],
            [
              "4",
              "Magic infuses one weapon of your choice that you are holding. Until your rage ends, the weapon's damage type changes to force, and it gains the light and thrown properties, with a normal range of 20 feet and a long range of 60 feet. If the weapon leaves your hand, the weapon reappears in your hand at the end of the current turn.",
            ],
            [
              "5",
              "Whenever a creature hits you with an attack roll before your rage ends, that creature takes 1d6 force damage, as magic lashes out in retribution.",
            ],
            [
              "6",
              "Until your rage ends, you are surrounded by multi colored, protective lights; you gain a +1 bonus to AC, and while within 10 feet of you, your allies gain the same bonus.",
            ],
            [
              "7",
              "Flowers and vines temporarily grow around you. Until your rage ends, the ground within 15 feet of you is difficult terrain for your enemies.",
            ],
            [
              "8",
              "A bolt of light shoots from your chest. Another creature of your choice that you can see within 30 feet of you must succeed on a Constitution saving throw or take 1d6 radiant damage and be blinded until the start of your next turn. Until your rage ends, you can use this effect again on each of your turns as a bonus action.",
            ],
          ],
        },
      },
      {
        name: "Bolstering Magic",
        level: 6,
        description: `You can harness your wild magic to bolster yourself or a companion. As an action, you can touch one creature (which can be yourself) and confer one of the following benefits of your choice to that creature:`,
        list: [
          "For 10 minutes, the creature can roll a d3 whenever making an attack roll or an ability check and add the number rolled to the d20 roll.",
          "Roll a d3. The creature regains one expended spell slot, the level of which equals the number rolled or lower (the creature's choice). Once a creature receives this benefit, that creature can't receive it again until after a long rest.  ",
        ],
        description2: `You can take this action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.`,
      },
      {
        name: "Unstable Backlash",
        level: 10,
        description: `When you are imperiled during your rage, the magic within you can lash out; immediately after you take damage or fail a saving throw while raging, you can use your reaction to roll on the Wild Magic table and immediately produce the effect rolled. This effect replaces your current Wild Magic effect.`,
      },
      {
        name: "Controlled Surge",
        level: 14,
        description: `Whenever you roll on the Wild Magic table, you can roll the die twice and choose which of the two effects to unleash. If you roll the same number on both dice, you can ignore the number and choose any effect on the table.`,
      },
    ],
  },
  {
    key: "world-tree",
    name: "Path of the World Tree",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Barbarians who follow the Path of the World Tree connect with the cosmic tree Yggdrasil through their Rage. This tree grows among the Outer Planes, connecting them to each other and the Material Plane. These Barbarians draw on the tree's magic for vitality and as a means of dimensional travel.`,
      },
      {
        name: "Vitality of the Tree",
        level: 3,
        description: `Your Rage taps into the life force of the World Tree. You gain the following benefits.
Vitality Surge. When you activate your Rage, you gain a number of Temporary Hit Points equal to your Barbarian level.  
Life-Giving Force. At the start of each of your turns while your Rage is active, you can choose another creature within 10 feet of yourself to gain Temporary Hit Points. To determine the number of Temporary Hit Points, roll a number of d6s equal to your Rage Damage bonus, and add them together. If any of these Temporary Hit Points remain when your Rage ends, they vanish.`,
      },
      {
        name: "Branches of the Tree",
        level: 6,
        description: `Whenever a creature you can see starts its turn within 30 feet of you while your Rage is active, you can take a Reaction to summon spectral branches of the World Tree around it. The target must succeed on a Strength saving throw (DC 8 + your Strength modifier + your Proficiency Bonus) or be teleported to an unoccupied space you can see within 5 feet of yourself or in the nearest unoccupied space you can see. After the target teleports, you can reduce its Speed to 0 until the end of the current turn.`,
      },
      {
        name: "Battering Roots",
        level: 10,
        description: `During your turn, your reach is 10 feet greater with any Melee weapon that has the Heavy or Versatile property, as tendrils of the World Tree extend from you. When you hit with such a weapon on your turn, you can activate the Push or Topple mastery property in addition to a different mastery property you're using with that weapon.`,
      },
      {
        name: "Travel Along the Tree",
        level: 14,
        description: `When you activate your Rage and as a Bonus Action while your Rage is active, you can teleport up to 60 feet to an unoccupied space you can see.
In addition, once per Rage, you can increase the range of that teleport to 150 feet. When you do so, you can also bring up to six willing creatures who are within 10 feet of you. Each creature teleports to an unoccupied space of your choice within 10 feet of your destination space.`,
      },
    ],
  },
  {
    key: "zealot",
    name: "Path of the Zealot",
    source: "PHB'24",
    features: [
      {
        name: "",
        level: 3,
        description: `Barbarians who walk the Path of the Zealot receive boons from a god or pantheon. These Barbarians experience their Rage as an ecstatic episode of divine union that infuses them with power. They are often allies to the priests and other followers of their god or pantheon.`,
      },
      {
        name: "Divine Fury",
        level: 3,
        description: `You can channel divine power into your strikes. On each of your turns while your Rage is active, the first creature you hit with a weapon or an Unarmed Strike takes extra damage equal to 1d6 plus half your Barbarian level (round down). The extra damage is Necrotic or Radiant; you choose the type each time you deal the damage.`,
      },
      {
        name: "Warrior of the Gods",
        level: 3,
        description: `A divine entity helps ensure you can continue the fight. You have a pool of four d12s that you can spend to heal yourself. As a Bonus Action, you can expend dice from the pool, roll them, and regain a number of Hit Points equal to the roll's total.
Your pool regains all expended dice when you finish a Long Rest.
The pool's maximum number of dice increases by one when you reach Barbarian levels 6 (5 dice), 12 (6 dice), and 17 (7 dice).`,
      },
      {
        name: "Fanatical Focus",
        level: 6,
        description: `Once per active Rage, if you fail a saving throw, you can reroll it with a bonus equal to your Rage Damage bonus, and you must use the new roll.`,
      },
      {
        name: "Zealous Presence",
        level: 10,
        description: `As a Bonus Action, you unleash a battle cry infused with divine energy. Up to ten other creatures of your choice within 60 feet of you gain Advantage on attack rolls and saving throws until the start of your next turn.
Once you use this feature, you can't use it again until you finish a Long Rest unless you expend a use of your Rage (no action required) to restore your use of it.`,
      },
      {
        name: "Rage of the Gods",
        level: 14,
        description: `When you activate your Rage, you can assume the form of a divine warrior. This form lasts for 1 minute or until you drop to 0 Hit Points. Once you use this feature, you can't do so again until you finish a Long Rest.
While in this form, you gain the benefits below.
Flight. You have a Fly Speed equal to your Speed and can hover.  
Resistance. You have Resistance to Necrotic, Psychic, and Radiant damage.  
Revivification. When a creature within 30 feet of you would drop to 0 Hit Points, you can take a Reaction to expend a use of your Rage to instead change the target's Hit Points to a number equal to your Barbarian level.`,
      },
    ],
  },
];

export default barbarianSubclass;
