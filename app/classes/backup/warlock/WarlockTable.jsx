"use client";
import React from "react";
import warlockTableData from "@/data/classes/warlock/classData";
import TableContent from "@/components/TableContent";

export default function WarlockTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "invocations", label: "Invocations" },
    { key: "cantrips", label: "Cantrips" },
    { key: "preparedSpells", label: "Prepared Spells" },
    { key: "spellSlots", label: "Spell Slots" },
    { key: "slotLevel", label: "Slot Level" },
  ];
  const slotHeader = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <TableContent
      data={warlockTableData}
      columns={columns}
      title="The Warlock"
      slotHeader={""}
      nameClass="Warlock" 
    />
  );
}
