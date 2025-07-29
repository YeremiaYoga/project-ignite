"use client";
import React from "react";
import fighterTableData from "@/data/classes/fighter/tableData";
import TableContent from "@/components/TableContent";

export default function FighterTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "secondWind", label: "Second Wind" },
    { key: "weaponMastery", label: "Weapon Mastery" },
  ];
  const slotHeader = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <TableContent
      data={fighterTableData}
      columns={columns}
      title="The Fighter"
      slotHeader={""}
      nameClass="Fighter" 
    />
  );
}
