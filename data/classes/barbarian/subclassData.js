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
  
    ],
  },
  {
    key: "giant",
    name: "Path of the Giant",
    source: "BGG",
    features: [
  
    ],
  },
  {
    key: "juggernaut",
    name: "Path of the Juggernaut",
    source: "TCE",
    features: [
   
    ],
  },
  {
    key: "storm-herald",
    name: "Path of the Storm Herald",
    source: "XGE",
    features: [],
  },
  {
    key: "wild-heart",
    name: "Path of the Wild Heart",
    source: "PHB'24",
    features: [],
  },
  {
    key: "wild-magic",
    name: "Path of the Wild Magic",
    source: "TCE",
    features: [],
  },
  {
    key: "world-tree",
    name: "Path of the World Tree",
    source: "PHB'24",
    features: [],
  },
  {
    key: "zealot",
    name: "Path of the Zealot",
    source: "PHB'24",
    features: [],
  },
];

export default barbarianSubclass;
