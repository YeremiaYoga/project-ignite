"use client";
import React from "react";
import paladinTableData from "@/data/classes/paladin/classData";
import TableContent from "@/components/TableContent";

export default function PaladinTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "channelDivinity", label: "Channel Divinity" },
    { key: "preparedSpells", label: "Prepared Spells" },
  ];
  const slotHeader = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <TableContent
      data={paladinTableData}
      columns={columns}
      title="The Paladin"
      slotHeader={slotHeader}
      nameClass="Paladin" 
    />
  );
}
