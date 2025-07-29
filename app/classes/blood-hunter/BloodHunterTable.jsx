"use client";
import React from "react";
import bloodhunterTableData from "@/data/classes/bloodhunter/tableData";
import TableContent from "@/components/TableContent";

export default function BloodHunterTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "hemocraftDie", label: "Hemocraft Die" },
    { key: "bloodCurses", label: "Blood Curses" },
  ];
  const slotHeader = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <TableContent
      data={bloodhunterTableData}
      columns={columns}
      title="The Blood Hunter"
      slotHeader={""}
      nameClass="Blood Hunter" 
    />
  );
}