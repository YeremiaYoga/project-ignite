"use client";
import React from "react";
import clericTableData from "@/data/classes/cleric/tableData";
import TableContent from "@/components/TableContent";

export default function ClericTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "channelDivinity", label: "Channel Divinity" },
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
      data={clericTableData}
      columns={columns}
      title="The Cleric"
      slotHeader={slotHeader}
      nameClass="Cleric" 
    />
  );
}
