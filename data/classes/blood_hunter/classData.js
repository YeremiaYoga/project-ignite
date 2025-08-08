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
      hemocraftDie: "1d4",
      bloodCurses: 1,
      profane_soul: {
        cantripsKnown: "—",
        spellsKnown: "—",
        spellSlot: "—",
        spellLevel: "—",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["Fighting Style", "Crimson Rite"],
      hemocraftDie: "1d4",
      bloodCurses: 1,
      profane_soul: {
        cantripsKnown: "—",
        spellsKnown: "—",
        spellSlot: "—",
        spellLevel: "—",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: ["Blood Hunter Order"],
      hemocraftDie: "1d4",
      bloodCurses: 1,
      profane_soul: {
        cantripsKnown: 2,
        spellsKnown: 2,
        spellSlot: 1,
        spellLevel: "1st",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["Ability Score Improvement"],
      hemocraftDie: "1d4",
      bloodCurses: 1,
      profane_soul: {
        cantripsKnown: 2,
        spellsKnown: 2,
        spellSlot: 1,
        spellLevel: "1st",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: ["Extra Attack"],
      hemocraftDie: "1d6",
      bloodCurses: 1,
      profane_soul: {
        cantripsKnown: 2,
        spellsKnown: 3,
        spellSlot: 1,
        spellLevel: "1st",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["Brand of Castigation", "Blood Maledict Improvement"],
      hemocraftDie: "1d6",
      bloodCurses: 2,
      profane_soul: {
        cantripsKnown: 2,
        spellsKnown: 3,
        spellSlot: 2,
        spellLevel: "1st",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: ["Order feature", "Crimson Rite Improvement"],
      hemocraftDie: "1d6",
      bloodCurses: 2,
      profane_soul: {
        cantripsKnown: 2,
        spellsKnown: 4,
        spellSlot: 2,
        spellLevel: "2nd",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["Ability Score Improvement"],
      hemocraftDie: "1d6",
      bloodCurses: 2,
      profane_soul: {
        cantripsKnown: 2,
        spellsKnown: 4,
        spellSlot: 2,
        spellLevel: "2nd",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: ["Grim Psychometry"],
      hemocraftDie: "1d6",
      bloodCurses: 2,
      profane_soul: {
        cantripsKnown: 2,
        spellsKnown: 5,
        spellSlot: 2,
        spellLevel: "2nd",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["Dark Augmentation"],
      hemocraftDie: "1d6",
      bloodCurses: 3,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 5,
        spellSlot: 2,
        spellLevel: "2nd",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: ["Order feature"],
      hemocraftDie: "1d8",
      bloodCurses: 3,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 6,
        spellSlot: 2,
        spellLevel: "2nd",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["Ability Score Improvement"],
      hemocraftDie: "1d8",
      bloodCurses: 3,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 6,
        spellSlot: 2,
        spellLevel: "2nd",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: ["Brand of Tethering", "Blood Maledict Improvement"],
      hemocraftDie: "1d8",
      bloodCurses: 3,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 7,
        spellSlot: 2,
        spellLevel: "3rd",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["Hardened Soul", "Crimson Rite Improvement"],
      hemocraftDie: "1d8",
      bloodCurses: 4,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 7,
        spellSlot: 2,
        spellLevel: "3rd",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: ["Order feature"],
      hemocraftDie: "1d8",
      bloodCurses: 4,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 8,
        spellSlot: 2,
        spellLevel: "3rd",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["Ability Score Improvement"],
      hemocraftDie: "1d10",
      bloodCurses: 4,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 8,
        spellSlot: 2,
        spellLevel: "3rd",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: ["Blood Maledict Improvement"],
      hemocraftDie: "1d10",
      bloodCurses: 4,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 9,
        spellSlot: 2,
        spellLevel: "3rd",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["Order feature"],
      hemocraftDie: "1d10",
      bloodCurses: 5,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 9,
        spellSlot: 2,
        spellLevel: "3th",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["Ability Score Improvement"],
      hemocraftDie: "1d10",
      bloodCurses: 5,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 10,
        spellSlot: 2,
        spellLevel: "4th",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["Sanguine Mastery"],
      hemocraftDie: "1d10",
      bloodCurses: 5,
      profane_soul: {
        cantripsKnown: 3,
        spellsKnown: 11,
        spellSlot: 2,
        spellLevel: "4th",
      },
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
