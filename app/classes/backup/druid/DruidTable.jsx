"use client";
import React from "react";
import druidTableData from "@/data/classes/druid/classData";
import TableContent from "@/components/TableContent";

export default function DruidTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "wildShape", label: "Wild Shape" },
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
      data={druidTableData}
      columns={columns}
      title="The Druid"
      slotHeader={slotHeader}
      nameClass="Druid" 
    />
  );
}
