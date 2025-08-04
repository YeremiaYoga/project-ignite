"use client";
import React from "react";
import barbarianTableData from "@/data/classes/barbarian/classData";
import TableContent from "@/components/TableContent";

export default function BarbarianTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "rages", label: "Rages" },
    { key: "rageDamage", label: "Rage Damage" },
    { key: "weaponMastery", label: "Weapon Mastery" },
  ];
  const slotHeader = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <TableContent
      data={barbarianTableData}
      columns={columns}
      title="The Barbarian"
      slotHeader={""}
      nameClass="Barbarian" 
    />
  );
}