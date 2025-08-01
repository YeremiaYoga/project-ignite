"use client";

import Link from "next/link";
import ClassCard from "./ClassCard";

const classList = [
  "barbarian",
  "bard",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
  "artificer",
  "blood-hunter",
];

const classInfo = {
  barbarian: {
    title: "Barbarian",
    description:
      "Barbarians are mighty warriors who are powered by primal forces of the multiverse that manifest as a Rage.",
    icon: "/assets/classIcon/barbarian_icon.webp",
    primaryAbility: "Strength",
    hitDie: "d12",
    savingThrows: ["Strength", "Constitution"],
  },
  bard: {
    title: "Bard",
    description:
      "Bards are expert at inspiring others, soothing hurts, disheartening foes, and creating illusions.",
    icon: "/assets/classIcon/bard_icon.webp",
    primaryAbility: "Charisma",
    hitDie: "d8",
    savingThrows: ["Dexterity", "Charisma"],
  },
  cleric: {
    title: "Cleric",
    description:
      "Clerics can reach out to the divine magic of the Outer Planes and channel it to bolster people and battle foes.",
    icon: "/assets/classIcon/cleric_icon.webp",
    primaryAbility: "Wisdom",
    hitDie: "d8",
    savingThrows: ["Wisdom", "Charisma"],
  },
  druid: {
    title: "Druid",
    description:
      "Druids call on the forces of nature, harnessing magic to heal, transform into animals, and wield elemental destruction.",
    icon: "/assets/classIcon/druid_icon.webp",
    primaryAbility: "Wisdom",
    hitDie: "d8",
    savingThrows: ["Intelligence", "Wisdom"],
  },
  fighter: {
    title: "Fighter",
    description:
      "Fighters all share an unparalleled prowess with weapons and armor, and are well acquainted with death, both meting it out and defying it.",
    icon: "/assets/classIcon/fighter_icon.webp",
    primaryAbility: "Strength or Dexterity",
    hitDie: "d10",
    savingThrows: ["Strength", "Constitution"],
  },
  monk: {
    title: "Monk",
    description:
      "Monks focus their internal reservoirs of power to create extraordinary, even supernatural, effects.",
    icon: "/assets/classIcon/monk_icon.webp",
    primaryAbility: "Dexterity & Wisdom",
    hitDie: "d8",
    savingThrows: ["Strength", "Dexterity"],
  },
  paladin: {
    title: "Paladin",
    description:
      "Paladins live on the front lines of the cosmic struggle, united by their oaths against the forces of annihilation.",
    icon: "/assets/classIcon/paladin_icon.webp",
    primaryAbility: "Strength & Charisma",
    hitDie: "d10",
    savingThrows: ["Wisdom", "Charisma"],
  },
  ranger: {
    title: "Ranger",
    description:
      "Rangers are honed with deadly focus and harness primal powers to protect the world from the ravages of monsters and tyrants.",
    icon: "/assets/classIcon/ranger_icon.webp",
    primaryAbility: "Dexterity & Wisdom",
    hitDie: "d10",
    savingThrows: ["Strength", "Dexterity"],
  },
  rogue: {
    title: "Rogue",
    description:
      "Rogues have a knack for finding the solution to just about any problem, prioritizing subtle strikes over brute strength.",
    icon: "/assets/classIcon/rogue_icon.webp",
    primaryAbility: "Dexterity",
    hitDie: "d8",
    savingThrows: ["Dexterity", "Intelligence"],
  },
  sorcerer: {
    title: "Sorcerer",
    description:
      "Sorcerers harness and channel the raw, roiling power of innate magic that is stamped into their very being.",
    icon: "/assets/classIcon/sorcerer_icon.webp",
    primaryAbility: "Charisma",
    hitDie: "d6",
    savingThrows: ["Constitution", "Charisma"],
  },
  warlock: {
    title: "Warlock",
    description:
      "Warlocks quest for knowledge that lies hidden in the fabric of the multiverse, piecing together arcane secrets to bolster their own power.",
    icon: "/assets/classIcon/warlock_icon.webp",
    primaryAbility: "Charisma",
    hitDie: "d8",
    savingThrows: ["Wisdom", "Charisma"],
  },
  wizard: {
    title: "Wizard",
    description:
      "Wizards cast spells of explosive fire, arcing lightning, subtle deception, and spectacular transformations.",
    icon: "/assets/classIcon/wizard_icon.webp",
    primaryAbility: "Intelligence",
    hitDie: "d6",
    savingThrows: ["Intelligence", "Wisdom"],
  },
  artificer: {
    title: "Artificer",
    description:
      "Masters of invention, artificers use ingenuity and magic to unlock extraordinary capabilities in objects.",
    icon: "/assets/classIcon/artificer_icon.webp",
    primaryAbility: "Intelligence",
    hitDie: "d8",
    savingThrows: ["Constitution", "Intelligence"],
  },
  "blood-hunter": {
    title: "Blood Hunter",
    description: "-",
    icon: "/assets/classIcon/blood-hunter_icon.webp",
    primaryAbility: "-",
    hitDie: "-",
    savingThrows: [],
  },
};

export default function ClassesPage() {
  return (
    <div className="p-6 min-h-screen  text-white">
      <h1 className="text-3xl font-bold mb-6">Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classList.map((cls) => (
          <ClassCard key={cls} className={cls} info={classInfo[cls]} />
        ))}
      </div>
    </div>
  );
}
