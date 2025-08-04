"use client";
import React from "react";
import artificerTableData from "@/data/classes/artificer/classData";
import TableContent from "@/components/TableContent";

export default function ArtificerTable() {
  const columns = [
    { key: "level", label: "Level" },
    { key: "proficiencyBonus", label: "Proficiency Bonus" },
    { key: "features", label: "Features", isArray: true },
    { key: "infusionsKnown", label: "Infusions Known" },
    { key: "infusedItems", label: "Infused Items" },
    { key: "cantripsKnown", label: "Cantrips Known" },
  ];
  const slotHeader = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <TableContent
      data={artificerTableData.dataTable}
      columns={columns}
      title="The Artificer"
      slotHeader={slotHeader}
      nameClass="Artificer" 
    />
  );
}