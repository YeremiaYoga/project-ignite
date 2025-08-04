"use client";
import React from "react";
import wizardTableData from "@/data/classes/wizard/tableData";
import TableContent from "@/components/TableContent";

export default function WizardTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
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
      data={wizardTableData}
      columns={columns}
      title="The Wizard"
      slotHeader={slotHeader}
      nameClass="Wizard"
    />
  );
}
