const monkFeatures = [
  {
    id: "martial-arts-1",
    title: "Martial Arts",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "Your practice of martial arts gives you mastery of combat styles that use your Unarmed Strike and Monk weapons, which are the following:",
      },
      {
        type: "list",
        items: [
          "Simple Melee Weapons",
          "Martial Melee Weapons that have the Light property",
        ],
      },
      {
        type: "paragraph",
        value:
          "You gain the following benefits while you are unarmed or wielding only Monk weapons and you aren’t wearing armor or wielding a Shield.",
      },
      {
        type: "heading",
        value: "Bonus Unarmed Strike",
      },
      {
        type: "paragraph",
        value: "You can use an Unarmed Strike as a Bonus action.",
      },
      {
        type: "heading",
        value: "Martial Arts Die",
      },
      {
        type: "paragraph",
        value:
          "You can roll 1d6 in place of the normal damage of your Unarmed Strike or Monk weapons. This die changes as you gain Monk levels, as shown in the Martial Arts column of the Monk Features table.",
      },
      {
        type: "heading",
        value: "Dexterous Attacks",
      },
      {
        type: "paragraph",
        value:
          "You can use your Dexterity modifier instead of your Strength modifier for the attack and damage rolls of your Unarmed Strikes and Monk weapons. In addition, when you use the Grapple or Shove option of your Unarmed Strike, you can use your Dexterity modifier instead of your Strength modifier to determine the move’s DC.",
      },
    ],
  },
  {
    id: "unarmored-defense-1",
    title: "Unarmored Defense",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "While you aren’t wearing armor or wielding a Shield, your base Armor Class equals 10 + your Dexterity and Wisdom modifiers.",
      },
    ],
  },
  {
    id: "monks-focus-2",
    title: "Monk's Focus",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "Your focus and martial training allow you to harness a well of extraordinary energy within yourself. This energy is represented by Focus Points. Your Monk level determines the number of points you have, as shown in the Focus Points column of the Monk Features table.",
      },
      {
        type: "paragraph",
        value:
          "You can expend these points to enhance or fuel certain Monk features. You start knowing three such features: Flurry of Blows, Patient Defense, and Step of the Wind, each of which is detailed below.",
      },
      {
        type: "paragraph",
        value:
          "When you expend a Focus Point, it is unavailable until you finish a Short or Long Rest, at the end of which you regain all expended points. Some features that use Focus Points require your target to make a saving throw. The save DC equals 8 plus your Wisdom modifier and Proficiency Bonus.",
      },
      {
        type: "heading",
        value: "Flurry of Blows",
      },
      {
        type: "paragraph",
        value:
          "You can expend 1 Focus Point to make two Unarmed Strikes as a Bonus action.",
      },
      {
        type: "heading",
        value: "Patient Defense",
      },
      {
        type: "paragraph",
        value:
          "You can take the Disengage action as a Bonus action. Alternatively, you can expend 1 Focus Point to take both the Disengage and the Dodge actions as a Bonus action.",
      },
      {
        type: "heading",
        value: "Step of the Wind",
      },
      {
        type: "paragraph",
        value:
          "You can take the Dash action as a Bonus action. Alternatively, you can expend 1 Focus Point to take both the Disengage and Dash actions as a Bonus action, and your jump distance is doubled for the turn.",
      },
    ],
  },
  {
    id: "unarmored-movement-2",
    title: "Unarmored Movement",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "Your speed increases by 10 feet while you aren’t wearing armor or wielding a Shield. This bonus increases when you reach certain Monk levels, as shown on the Monk Features table.",
      },
    ],
  },
  {
    id: "uncanny-movement-2",
    title: "Uncanny Movement",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "When you roll initiative, you can regain all expended Focus Points. When you do so, roll your Martial Arts die, and regain a number of Hit Points equal to the number rolled.",
      },
      {
        type: "paragraph",
        value:
          "Once you use this feature, you can’t use it again until you finish a Long Rest.",
      },
    ],
  },
  {
    id: "deflect-attacks-3",
    title: "Deflect Attacks",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "When an attack roll hits you and its damage includes Bludgeoning, Piercing, or Slashing damage, you can take a Reaction to reduce the attack’s total damage against you. The reduction equals 1d10 plus your Dexterity modifier and Monk level.",
      },
      {
        type: "paragraph",
        value:
          "If you reduce the damage to 0, you can expend 1 Focus Point to redirect some of the attack’s force. If you do so, choose a creature you can see within 5 feet of yourself if the attack was a melee attack or a creature you can see within 60 feet of yourself that isn’t behind Total Cover if the attack was a ranged attack. You make a ranged attack roll with your Unarmed Strike against the chosen creature, and the damage is the same type dealt by the attack.",
      },
    ],
  },
  {
    id: "monk-subclass-3",
    title: "Monk Subclass",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "You gain a Monk subclass of your choice. A subclass is a specialization that grants you features at certain Monk levels. For the rest of your career, you gain each of your subclass’s features that are of your Monk level or lower.",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
      {
        type: "paragraph",
        value: "Select a subclass to view its feature(s) here.",
      },
    ],
  },
  {
    id: "ability-score-improvement-4",
    title: "Ability Score Improvement",
    level: 4,
    content: [
      {
        type: "paragraph",
        value:
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Monk levels 8, 12, and 16.",
      },
    ],
  },
  {
    id: "slow-fall-4",
    title: "Slow Fall",
    level: 4,
    content: [
      {
        type: "paragraph",
        value:
          "You can take a Reaction when you fall to reduce any damage you take from the fall by an amount equal to five times your Monk level.",
      },
    ],
  },
  {
    id: "extra-attack-5",
    title: "Extra Attack",
    level: 5,
    content: [
      {
        type: "paragraph",
        value:
          "You can attack twice instead of once whenever you take the Attack action on your turn.",
      },
    ],
  },
  {
    id: "stunning-strike-5",
    title: "Stunning Strike",
    level: 5,
    content: [
      {
        type: "paragraph",
        value:
          "Once per turn when you hit a creature with a Monk weapon or an Unarmed Strike, you can expend 1 Focus Point to attempt a stunning strike. The target must make a Constitution saving throw. On a failed save, the target has the Stunned condition until the start of your next turn. On a successful save, the target’s Speed is halved until the start of your next turn, and the next attack roll made against the target before then has Advantage.",
      },
    ],
  },
  {
    id: "empowered-strikes-6",
    title: "Empowered Strikes",
    level: 6,
    content: [
      {
        type: "paragraph",
        value:
          "Whenever you deal damage with your Unarmed Strike, it can deal your choice of Force damage or its normal damage type.",
      },
    ],
  },
  {
    id: "subclass-feature-6",
    title: "Subclass Feature",
    level: 6,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Monk subclass.",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
      {
        type: "paragraph",
        value: "Select a subclass to view its feature(s) here.",
      },
    ],
  },
  {
    id: "evasion-7",
    title: "Evasion",
    level: 7,
    content: [
      {
        type: "paragraph",
        value:
          "When you’re subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw and only half damage if you fail.",
      },
      {
        type: "paragraph",
        value:
          "You don't benefit from this feature if you have the Incapacitated condition.",
      },
    ],
  },
  {
    id: "ability-score-improvement-8",
    title: "Ability Score Improvement",
    level: 8,
    content: [
      {
        type: "paragraph",
        value:
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "acrobatic-movement-9",
    title: "Acrobatic Movement",
    level: 9,
    content: [
      {
        type: "paragraph",
        value:
          "While you aren’t wearing armor or wielding a Shield, you gain the ability to move along vertical surfaces and across liquids on your turn without falling during the movement.",
      },
    ],
  },
  {
    id: "heightened-focus-9",
    title: "Heightened Focus",
    level: 9,
    content: [
      {
        type: "paragraph",
        value:
          "Your Flurry of Blows, Patient Defense, and Step of the Wind gain the following benefits.",
      },
      {
        type: "heading",
        value: "Flurry of Blows",
      },
      {
        type: "paragraph",
        value:
          "You can expend 1 Focus Point to use Flurry of Blows and make three Unarmed Strikes with it instead of two.",
      },
      {
        type: "heading",
        value: "Patient Defense",
      },
      {
        type: "paragraph",
        value:
          "You can expend 1 Focus Point to use Patient Defense, you gain a number of Temporary Hit Points equal to two rolls of your Martial Arts die.",
      },
      {
        type: "heading",
        value: "Step of the Wind",
      },
      {
        type: "paragraph",
        value:
          "When you expend a Focus Point to use Step of the Wind, you can choose a willing creature within 5 feet of yourself that is Large or smaller. You move the creature with you until the end of your turn. The creature's movement doesn't provoke Opportunity Attacks.",
      },
    ],
  },
  {
    id: "self-restoration-10",
    title: "Self-Restoration",
    level: 10,
    content: [
      {
        type: "paragraph",
        value:
          "Through sheer force of will, you can remove one of the following conditions from yourself at the end of each of your turns: Charmed, Frightened, or Poisoned.",
      },
      {
        type: "paragraph",
        value:
          "In addition, forgoing food and drink doesn’t give you levels of Exhaustion.",
      },
    ],
  },
  {
    id: "subclass-feature-11",
    title: "Subclass Feature",
    level: 11,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Monk subclass.",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
      {
        type: "paragraph",
        value: "Select a subclass to view its feature(s) here.",
      },
    ],
  },
  {
    id: "ability-score-improvement-12",
    title: "Ability Score Improvement",
    level: 12,
    content: [
      {
        type: "paragraph",
        value:
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "deflect-energy-13",
    title: "Deflect Energy",
    level: 13,
    content: [
      {
        type: "paragraph",
        value:
          "You can now use your Deflect Attacks feature against attacks that deal any damage type, not just Bludgeoning, Piercing, or Slashing.",
      },
    ],
  },
  {
    id: "disciplined-survivor-14",
    title: "Disciplined Survivor",
    level: 14,
    content: [
      {
        type: "paragraph",
        value:
          "Your physical and mental discipline grant you proficiency in all saving throws.",
      },
      {
        type: "paragraph",
        value:
          "Additionally, whenever you make a saving throw and fail, you can expend 1 Focus Point to reroll it, and you must use the new roll.",
      },
    ],
  },
  {
    id: "perfect-focus-15",
    title: "Perfect Focus",
    level: 15,
    content: [
      {
        type: "paragraph",
        value:
          "When you roll initiative and don’t use Uncanny Metabolism, you regain expended Focus Points until you have 4 if you have 3 or fewer.",
      },
    ],
  },
  {
    id: "ability-score-improvement-16",
    title: "Ability Score Improvement",
    level: 16,
    content: [
      {
        type: "paragraph",
        value:
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "subclass-feature-17",
    title: "Subclass Feature",
    level: 17,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Monk subclass.",
      },
      {
        type: "subclass",
        value: "No Subclass Selected",
      },
      {
        type: "paragraph",
        value: "Select a subclass to view its feature(s) here.",
      },
    ],
  },
  {
    id: "superior-defense-18",
    title: "Superior Defense",
    level: 18,
    content: [
      {
        type: "paragraph",
        value:
          "At the start of your turn, you can expend 3 Focus Points to bolster yourself against harm for 1 minute or until you have the Incapacitated condition.",
      },
      {
        type: "paragraph",
        value:
          "During that time, you have Resistance to all damage except Force damage.",
      },
    ],
  },
  {
    id: "epic-boon-19",
    title: "Epic Boon",
    level: 19,
    content: [
      {
        type: "paragraph",
        value:
          "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Irresistible Offense is recommended.",
      },
    ],
  },
  {
    id: "body-and-mind-20",
    title: "Body and Mind",
    level: 20,
    content: [
      {
        type: "paragraph",
        value:
          "You have developed your body and mind to new heights. Your Dexterity and Wisdom scores increase by 4, to a maximum of 25.",
      },
    ],
  },
];

export default monkFeatures;
