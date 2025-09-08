const rogueFeatures = [
  {
    id: "expertise-1",
    title: "Expertise",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "You gain Expertise in two of your skill proficiencies of your choice. Sleight of Hand and Stealth are recommended if you have proficiency in them.",
      },
      {
        type: "paragraph",
        value:
          "At Rogue level 6, you gain Expertise in two more of your skill proficiencies of your choice.",
      },
    ],
  },
  {
    id: "sneak-attack-1",
    title: "Sneak Attack",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "You know how to strike subtly and exploit a foe's distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack roll if you have Advantage on the roll and the attack uses a Finesse or a Ranged weapon. The extra damage's type is the same as the weapon's type.",
      },
      {
        type: "paragraph",
        value:
          "You don't need Advantage on the attack roll if at least one of your allies is within 5 feet of the target, the ally doesn't have the Incapacitated condition, and you don't have Disadvantage on the attack roll.",
      },
      {
        type: "paragraph",
        value:
          "The extra damage increases as you gain Rogue levels, as shown in the Sneak Attack column of the Rogue Features table.",
      },
    ],
  },
  {
    id: "thieves-cant-1",
    title: "Thieves' Cant",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "You picked up various languages in the communities where you plied your roguish talents. You know Thieves' Cant and one other language of your choice, which you choose from the language tables in chapter 2.",
      },
    ],
  },
  {
    id: "weapon-mastery-1",
    title: "Weapon Mastery",
    level: 1,

    content: [
      {
        type: "paragraph",
        value:
          "Your training with weapons allows you to use the mastery properties of two kinds of weapons of your choice with which you have proficiency, such as Daggers and Shortbows.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you finish a Long Rest, you can change the kinds of weapons you chose. For example, you could switch to using the mastery properties of Scimitars and Shortswords.",
      },
    ],
  },
  {
    id: "cunning-action-2",
    title: "Cunning Action",
    level: 2,

    content: [
      {
        type: "paragraph",
        value:
          "Your quick thinking and agility allow you to move and act quickly. On your turn, you can take one of the following actions as a Bonus Action: Dash, Disengage, or Hide.",
      },
    ],
  },
  {
    id: "rogue-subclass-3",
    title: "Rogue Subclass",
    level: 3,

    content: [
      {
        type: "paragraph",
        value:
          "You gain a Rogue subclass of your choice. A subclass is a specialization that grants you features at certain Rogue levels. For the rest of your career, you gain each of your subclass's features that are of your Rogue level or lower.",
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
    id: "steady-aim-3",
    title: "Steady Aim",
    level: 3,

    content: [
      {
        type: "paragraph",
        value:
          "As a Bonus Action, you give yourself Advantage on your next attack roll on the current turn. You can use this feature only if you haven't moved during this turn, and after you use it, your Speed is 0 until the end of the current turn.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Rogue levels 8, 10, 12, and 16.",
      },
    ],
  },
  {
    id: "cunning-strike-5",
    title: "Cunning Strike",
    level: 5,

    content: [
      {
        type: "paragraph",
        value:
          "You've developed cunning ways to use your Sneak Attack. When you deal Sneak Attack damage, you can add one of the following Cunning Strike effects. Each effect has a die cost, which is the number of Sneak Attack damage dice you must forgo to add the effect. You remove the die before rolling, and the effect occurs immediately after the attack's damage is dealt. For example, if you add the Poison effect, remove 1d6 from the Sneak Attack's damage before rolling.",
      },
      {
        type: "paragraph",
        value:
          "If a Cunning Strike effect requires a saving throw, the DC equals 8 plus your Dexterity modifier and Proficiency Bonus.",
      },
      {
        type: "heading",
        value: "Poison (Cost: 1d6)",
      },
      {
        type: "paragraph",
        value:
          "You add a toxin to your strike, forcing the target to make a Constitution saving throw. On a failed save, the target has the Poisoned condition for 1 minute. At the end of each of its turns, the Poisoned target repeats the save, ending the effect on itself on a success.",
      },
      {
        type: "paragraph",
        value:
          "To use this effect, you must have a Poisoner's Kit on your person.",
      },
      {
        type: "heading",
        value: "Trip (Cost: 1d6)",
      },
      {
        type: "paragraph",
        value:
          "If the target is Large or smaller, it must succeed on a Dexterity saving throw or have the Prone condition.",
      },
      {
        type: "heading",
        value: "Withdraw (Cost: 1d6)",
      },
      {
        type: "paragraph",
        value:
          "Immediately after the attack, you move up to half your Speed without provoking Opportunity Attacks.",
      },
    ],
  },
  {
    id: "uncanny-dodge-5",
    title: "Uncanny Dodge",
    level: 5,

    content: [
      {
        type: "paragraph",
        value:
          "When an attacker that you can see hits you with an attack roll, you can take a Reaction to halve the attack's damage against you (round down).",
      },
    ],
  },
  {
    id: "expertise-6",
    title: "Expertise",
    level: 6,

    content: [
      {
        type: "paragraph",
        value:
          "You gain Expertise in two of your Skill Proficiencies of your choice.",
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
          "You can nimbly dodge out of the way of certain dangers. When you're subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw and only half damage if you fail. You can't use this feature if you have the Incapacitated condition.",
      },
    ],
  },
  {
    id: "reliable-talent-7",
    title: "Reliable Talent",
    level: 7,

    content: [
      {
        type: "paragraph",
        value:
          "Whenever you make an ability check that uses one of your skill or tool proficiencies, you can treat a d20 roll of 9 or lower as a 10.",
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
    id: "subclass-feature-9",
    title: "Subclass Feature",
    level: 9,

    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Rogue Subclass.",
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
    id: "ability-score-improvement-10",
    title: "Ability Score Improvement",
    level: 10,

    content: [
      {
        type: "paragraph",
        value:
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "improved-cunning-strike-11",
    title: "Improved Cunning Strike",
    level: 11,

    content: [
      {
        type: "paragraph",
        value:
          "You can use up to two Cunning Strike effects when you deal Sneak Attack damage, paying the die cost for each effect.",
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
    id: "subclass-feature-13",
    title: "Subclass Feature",
    level: 13,

    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Rogue Subclass.",
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
    id: "devious-strikes-14",
    title: "Devious Strikes",
    level: 14,

    content: [
      {
        type: "paragraph",
        value:
          "You've practiced new ways to use your Sneak Attack deviously. The following effects are now among your Cunning Strike options.",
      },
      {
        type: "heading",
        value: "Daze (Cost: 2d6)",
      },
      {
        type: "paragraph",
        value:
          "The target must succeed on a Constitution saving throw, or on its next turn, it can do only one of the following: move or take an action or a Bonus Action.",
      },
      {
        type: "heading",
        value: "Knock Out (Cost: 6d6)",
      },
      {
        type: "paragraph",
        value:
          "The target must succeed on a Constitution saving throw, or it has the Unconscious condition for 1 minute or until it takes any damage. The Unconscious target repeats the save at the end of each of its turns, ending the effect on itself on a success.",
      },
      {
        type: "heading",
        value: "Obscure (Cost: 3d6)",
      },
      {
        type: "paragraph",
        value:
          "The target must succeed on a Dexterity saving throw, or it has the Blinded condition until the end of its next turn.",
      },
    ],
  },
  {
    id: "slippery-mind-15",
    title: "Slippery Mind",
    level: 15,

    content: [
      {
        type: "paragraph",
        value:
          "Your cunning mind is exceptionally difficult to control. You gain proficiency in Wisdom and Charisma saving throws.",
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
        value: "You gain a feature from your Rogue Subclass.",
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
    id: "elusive-18",
    title: "Elusive",
    level: 18,

    content: [
      {
        type: "paragraph",
        value:
          "You're so evasive that attackers rarely gain the upper hand against you. No attack roll can have Advantage against you unless you have the Incapacitated condition.",
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
          "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of the Night Spirit is recommended.",
      },
    ],
  },
  {
    id: "stroke-of-luck-20",
    title: "Stroke of Luck",
    level: 20,

    content: [
      {
        type: "paragraph",
        value:
          "You have a marvelous knack for succeeding when you need to. If you fail a D20 Test, you can turn the roll into a 20.",
      },
      {
        type: "paragraph",
        value:
          "Once you use this feature, you can't use it again until you finish a Short or Long Rest.",
      },
    ],
  },
];

export default rogueFeatures;
