const fighterFeatures = [
  {
    id: "fighting-style-1",
    title: "Fighting Style",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "You have honed your martial prowess and gain a Fighting Style feat of your choice. Defense is recommended.",
      },
      {
        type: "paragraph",
        value:
          "Whenever you gain a Fighter level, you can replace the feat you chose with a different Fighting Style feat.",
      },
    ],
  },
  {
    id: "second-wind-1",
    title: "Second Wind",
    level: 1,
    content: [
      {
        type: "paragraph",
        value:
          "You have a pool of physical and mental stamina that you can draw on. As a Bonus action, you can use it to regain Hit Points equal to 1d10 plus your Fighter level.",
      },
      {
        type: "paragraph",
        value:
          "You can use this feature twice. You regain one expended use when you finish a Short Rest, and you regain all expended uses when you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "When you reach certain Fighter levels, you gain more uses of this feature, as shown in the Second Wind column of the Fighter Features table.",
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
          "You are a master of weapons and can use the mastery properties of three kinds of Simple or Martial weapons of your choice. Whenever you finish a Long Rest, you can practice upon drills and change one of those weapon choices.",
      },
      {
        type: "paragraph",
        value:
          "When you reach certain Fighter levels, you gain the ability to use the mastery properties of more kinds of weapons, as shown in the Weapon Mastery column of the Fighter Features table.",
      },
    ],
  },
  {
    id: "action-surge-2",
    title: "Action Surge",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action, except the Magic action.",
      },
      {
        type: "paragraph",
        value:
          "Once you use this feature, you can't do so again until you finish a Short or Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "Starting at level 17, you can use it twice before a rest but only once on a turn.",
      },
    ],
  },
  {
    id: "tactical-mind-2",
    title: "Tactical Mind",
    level: 2,
    content: [
      {
        type: "paragraph",
        value:
          "You have a mind for tactics and on the battlefield. When you fail an ability check, you can expend a use of your Second Wind to push yourself toward success. Rather than regaining Hit Points, you roll 1d10 and add the number rolled to the ability check, potentially turning it into a success. If the check still fails, this use of Second Wind isn't expended.",
      },
    ],
  },
  {
    id: "fighter-subclass-3",
    title: "Fighter Subclass",
    level: 3,
    content: [
      {
        type: "paragraph",
        value:
          "You gain a Fighter subclass of your choice. A subclass is a specialization that grants you features at certain Fighter levels. For the rest of your career, you gain each of your subclass’s features that are of your Fighter level or lower.",
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
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Fighter levels 6, 8, 12, 14, and 16.",
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
    id: "tactical-shift-5",
    title: "Tactical Shift",
    level: 5,
    content: [
      {
        type: "paragraph",
        value:
          "Whenever you activate your Second Wind with a Bonus action, you can move up to half your Speed without provoking Opportunity Attacks.",
      },
    ],
  },
  {
    id: "ability-score-improvement-6",
    title: "Ability Score Improvement",
    level: 6,
    content: [
      {
        type: "paragraph",
        value:
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "subclass-feature-7",
    title: "Subclass Feature",
    level: 7,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Fighter Subclass.",
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
    id: "indomitable-9",
    title: "Indomitable",
    level: 9,
    content: [
      {
        type: "paragraph",
        value:
          "If you fail a saving throw, you can reroll it with a bonus equal to your Fighter level. You must use the new roll, and you can't use this feature again until you finish a Long Rest.",
      },
    ],
  },
  {
    id: "tactical-master-9",
    title: "Tactical Master",
    level: 9,
    content: [
      {
        type: "paragraph",
        value:
          "When you attack with a weapon whose mastery property you can use, you can replace that property with the Push, Sap, or Slow property for that attack.",
      },
    ],
  },
  {
    id: "subclass-feature-10",
    title: "Subclass Feature",
    level: 10,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Fighter Subclass.",
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
    id: "two-extra-attacks-11",
    title: "Two Extra Attacks",
    level: 11,
    content: [
      {
        type: "paragraph",
        value:
          "You can attack three times instead of once whenever you take the Attack action on your turn.",
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
    id: "indomitable-13",
    title: "Indomitable",
    level: 13,
    content: [
      {
        type: "paragraph",
        value:
          "If you fail a saving throw, you can reroll it with a bonus equal to your Fighter level. You must use the new roll, and you can't use this feature again until you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "You can use this feature twice before a Long Rest starting at level 13 and three times before a Long Rest starting at level 17.",
      },
    ],
  },
  {
    id: "studied-attacks-13",
    title: "Studied Attacks",
    level: 13,
    content: [
      {
        type: "paragraph",
        value:
          "You study your opponents and learn from each attack you make. If you make an attack roll against a creature and miss, you have Advantage on your next attack roll against that creature before the end of your next turn.",
      },
    ],
  },
  {
    id: "ability-score-improvement-14",
    title: "Ability Score Improvement",
    level: 14,
    content: [
      {
        type: "paragraph",
        value:
          "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.",
      },
    ],
  },
  {
    id: "subclass-feature-15",
    title: "Subclass Feature",
    level: 15,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Fighter Subclass.",
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
    id: "action-surge-17",
    title: "Action Surge",
    level: 17,
    content: [
      {
        type: "paragraph",
        value:
          "You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action, except the Magic action.",
      },
      {
        type: "paragraph",
        value:
          "Once you use this feature, you can't do so again until you finish a Short or Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "Starting at level 17, you can use it twice before a rest but only once on a turn.",
      },
    ],
  },
  {
    id: "indomitable-17",
    title: "Indomitable",
    level: 17,
    content: [
      {
        type: "paragraph",
        value:
          "If you fail a saving throw, you can reroll it with a bonus equal to your Fighter level. You must use the new roll, and you can't use this feature again until you finish a Long Rest.",
      },
      {
        type: "paragraph",
        value:
          "You can use this feature twice before a Long Rest starting at level 13 and three times before a Long Rest starting at level 17.",
      },
    ],
  },
  {
    id: "subclass-feature-18",
    title: "Subclass Feature",
    level: 18,
    content: [
      {
        type: "paragraph",
        value: "You gain a feature from your Fighter Subclass.",
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
    id: "epic-boon-19",
    title: "Epic Boon",
    level: 19,
    content: [
      {
        type: "paragraph",
        value:
          "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Combat Prowess is recommended.",
      },
    ],
  },
  {
    id: "three-extra-attacks-20",
    title: "Three Extra Attacks",
    level: 20,
    content: [
      {
        type: "paragraph",
        value:
          "You can attack four times instead of once whenever you take the Attack action on your turn.",
      },
    ],
  },
];

export default fighterFeatures;
