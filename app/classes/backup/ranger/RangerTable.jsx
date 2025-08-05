"use client";
import React from "react";
import rangerTableData from "@/data/classes/ranger/classData";
import TableContent from "@/components/TableContent";

export default function RangerTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "favoredEnemy", label: "Favored Enemy" },
    { key: "preparedSpells", label: "Prepared Spells" },
  ];
  const slotHeader = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <TableContent
      data={rangerTableData}
      columns={columns}
      title="The Ranger"
      slotHeader={slotHeader}
      nameClass="Ranger" 
    />
  );
}
