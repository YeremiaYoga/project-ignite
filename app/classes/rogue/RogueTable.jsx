"use client";
import React from "react";
import rogueTableData from "@/data/classes/rogue/tableData";
import TableContent from "@/components/TableContent";

export default function RogueTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "sneakAttack", label: "Sneak Attack" },
  ];
  const slotHeader = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <TableContent
      data={rogueTableData}
      columns={columns}
      title="The Rogue"
      slotHeader={""}
      nameClass="Rogue" 
    />
  );
}
