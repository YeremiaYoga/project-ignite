"use client";
import React from "react";
import monkTableData from "@/data/classes/monk/classData";
import TableContent from "@/components/TableContent";

export default function MonkTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "martialArts", label: "Martial Arts" },
    { key: "focusPoints", label: "Focus Points" },
    { key: "unarmoredMovement", label: "Unarmored Movement" },
  ];
  const slotHeader = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <TableContent
      data={monkTableData}
      columns={columns}
      title="The Monk"
      slotHeader={""}
      nameClass="Monk" 
    />
  );
}
