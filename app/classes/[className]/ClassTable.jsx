"use client";
import React from "react";
import TableContent from "@/components/TableContent";

export default function ClassTable({ tableData, nameClass }) {
  const sample = tableData.dataTable?.[0] || {};
const capitalizedName =
  nameClass.charAt(0).toUpperCase() + nameClass.slice(1);
  const labelMap = {
    level: "Level",
    proficiencyBonus: "Proficiency Bonus",
    features: "Features",
    bardicDie: "Bardic Die",
    cantrips: "Cantrips",
    preparedSpells: "Prepared Spells",
  };

  const spellSlotKey = Object.keys(sample).find(
    (key) => key.toLowerCase().includes("spellslots")
  );

  const dynamicColumns = Object.keys(sample)
    .filter((key) => key !== "featuresId" && key !== spellSlotKey) 
    .map((key) => ({
      key,
      label: labelMap[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
      isArray: Array.isArray(sample[key]),
    }));

  const slotHeader = sample[spellSlotKey]?.map((_, i) => {
    const level = i + 1;
    const suffix = ["st", "nd", "rd"];
    return `${level}${suffix[i] || "th"}`;
  });

  return (
    <TableContent
      data={tableData.dataTable}
      columns={dynamicColumns}
      title=""
      slotHeader={slotHeader}
      nameClass={capitalizedName}
    />
  );
}
