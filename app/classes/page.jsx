"use client";

import { useState, useEffect } from "react";
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
  "blood_hunter",
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
  blood_hunter: {
    title: "Blood Hunter",
    description:
      "Willing to suffer whatever it takes to achieve victory, these adept warriors have forged themselves into a potent force dedicated to protecting the innocent.",
    icon: "/assets/classIcon/blood_hunter_icon.webp",
    primaryAbility: "Strength or Dexterity, & Intelligence or Wisdom",
    hitDie: "d10",
    savingThrows: ["Dexterity", "Intelligence"],
  },
};

export default function ClassesPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredClasses = classList.filter((cls) =>
    classInfo[cls].title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  return (
    <div className="p-6 min-h-screen  text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Classes</h1>
        <input
          type="text"
          placeholder="Search classes..."
          value={search}
         
          className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-64"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredClasses.map((cls) => (
          <ClassCard key={cls} className={cls} info={classInfo[cls]} />
        ))}
      </div>
    </div>
  );
}
