const bloodHunterClassData = {
  descriptionClass: [
    {
      color: "white",
      text: `   Blood hunters are clever warriors driven by an unending
            determination to destroy evils old and new. Armed with rites of
            secretive blood magic and a willingness to sacrifice their own
            vitality and humanity for their cause, they protect the realms from
            the shadows — even as they remain ever vigilant against being drawn
            to the darkness that consumes the monsters they hunt.`,
    },
    {
      color: "gray",
      text: `Source: DND Beyond`,
    },

    {
      color: "gray",
      text: `You must have an Intelligence score of 13 or higher and a Strength
              or Dexterity score of 13 or higher in order to multiclass in or
              out of this class.`,
    },
    {
      color: "gray",
      text: ` If your blood hunter is part of the Order of the Profane Soul and
              also has warlock levels, add one-third of your blood hunter levels
              (rounded down) to your warlock level and consult the warlock
              progression table for total spell slots, cantrips known, and spell
              slot level. You should consider aligning your Otherworldly Patron
              feature between both classes, but your DM might allow you to have
              two different patrons at their discretion.`,
    },
    {
      color: "gray",
      text: ` Variant Hemocraft Ability Score: <br/>
              As a blood hunter, you use your Intelligence modifier for some of
              your class and subclass features. However, with your DM’s
              permission, you can choose to instead use your Wisdom modifier for
              all your blood hunter features that use your Intelligence modifier
              by default.`,
    },
  ],
  dataTable: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: ["Hunter's Bane", "Blood Maledict"],
      featuresId: ["hunters-bane-1", "blood-maledict-1"],
      hemocraftDie: "1d4",
      bloodCurses: 1,
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["Fighting Style", "Crimson Rite"],
      featuresId: ["fighting-style-2", "crimson-rite-2"],
      hemocraftDie: "1d4",
      bloodCurses: 1,
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: ["Blood Hunter Order"],
      featuresId: ["blood-hunter-order-3"],
      hemocraftDie: "1d4",
      bloodCurses: 1,
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-4"],
      hemocraftDie: "1d4",
      bloodCurses: 1,
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: ["Extra Attack"],
      featuresId: ["extra-attack-5"],
      hemocraftDie: "1d6",
      bloodCurses: 1,
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["Brand of Castigation", "Blood Maledict Improvement"],
      featuresId: ["brand-of-castigation-6", "blood-maledict-improvement-6"],
      hemocraftDie: "1d6",
      bloodCurses: 2,
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: ["Order feature", "Crimson Rite Improvement"],
      featuresId: ["order-feature-7", "crimson-rite-improvement-7"],
      hemocraftDie: "1d6",
      bloodCurses: 2,
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-8"],
      hemocraftDie: "1d6",
      bloodCurses: 2,
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: ["Grim Psychometry"],
      featuresId: ["grim-psychometry-9"],
      hemocraftDie: "1d6",
      bloodCurses: 2,
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["Dark Augmentation"],
      featuresId: ["dark-augmentation-10"],
      hemocraftDie: "1d6",
      bloodCurses: 3,
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: ["Order feature"],
      featuresId: ["order-feature-11"],
      hemocraftDie: "1d8",
      bloodCurses: 3,
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-12"],
      hemocraftDie: "1d8",
      bloodCurses: 3,
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: ["Brand of Tethering", "Blood Maledict Improvement"],
      featuresId: ["brand-of-tethering-13", "blood-maledict-improvement-13"],
      hemocraftDie: "1d8",
      bloodCurses: 3,
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["Hardened Soul", "Crimson Rite Improvement"],
      featuresId: ["hardened-soul-14", "crimson-rite-improvement-14"],
      hemocraftDie: "1d8",
      bloodCurses: 4,
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: ["Order feature"],
      featuresId: ["order-feature-15"],
      hemocraftDie: "1d8",
      bloodCurses: 4,
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-16"],
      hemocraftDie: "1d10",
      bloodCurses: 4,
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: ["Blood Maledict Improvement"],
      featuresId: ["blood-maledict-improvement-17"],
      hemocraftDie: "1d10",
      bloodCurses: 4,
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["Order feature"],
      featuresId: ["order-feature-18"],
      hemocraftDie: "1d10",
      bloodCurses: 5,
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["Ability Score Improvement"],
      featuresId: ["ability-score-improvement-19"],
      hemocraftDie: "1d10",
      bloodCurses: 5,
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["Sanguine Mastery"],
      featuresId: ["sanguine-mastery-20"],
      hemocraftDie: "1d10",
      bloodCurses: 5,
    },
  ],
  coreTraits: {
    class: "Blood Hunter",
    primaryAbility: "",
    hitDie: "D10 per Blood Hunter level",
    hitPointsAtLevel1: "10 + Con. modifier",
    hitPointsAtHigherLevels:
      "D10 + your Con. modifier, or, 6 + your Con. modifier",
    savingThrowProficiencies: ["Dexterity", "Intelligence"],
    skillProficiencies: {
      choose: 3,
      options: [
        "Athletics",
        "Acrobatics",
        "Arcana",
        "History",
        "Insight",
        "Investigation",
        "Religion",
        "Survival",
      ],
    },
    weaponProficiencies: ["Simple weapons", "Martial weapons"],
    toolProficiencies: ["alchemist's supplies"],
    armorTraining: ["Light and Medium armor", "Shields"],
    startingEquipment: {},
    optionalEquipment: {
      instruction:
        "You start with the following items, plus anything provided by your background.",
      items: [
        "(a) a martial weapon or (b) two simple weapons",
        "a light crossbow and 20 bolts",
        "(a) studded leather armor or (b) scale mail armor",
        "an explorer's pack and alchemist's supplies",
      ],
      alternativeInstruction: "Alternatively, you may start with",
      alternativeValue: "4d4 × 10 gp to buy your own equipment.",
    },
  },
};
export default bloodHunterClassData;
