"use client";
import React from "react";
import sorcererTableData from "@/data/classes/sorcerer/tableData";
import TableContent from "@/components/TableContent";

export default function SorcererTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "sorceryPoints", label: "Sorcery Points" },
    { key: "cantrips", label: "Cantrips" },
    { key: "preparedSpells", label: "Prepared Spells" },
  ];
  const slotHeader = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
  ];

  return (
    <TableContent
      data={sorcererTableData}
      columns={columns}
      title="The Sorcerer"
      slotHeader={slotHeader}
      nameClass="Sorcerer" 
    />
  );
}
