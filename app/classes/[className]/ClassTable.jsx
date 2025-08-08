"use client";
import React from "react";
import TableContent from "@/components/TableContent";
import { useSearchParams } from "next/navigation";

export default function ClassTable({ tableData, nameClass }) {
  const searchParams = useSearchParams();
  const subclassParam = searchParams.get("subclasses") || "";

  const selectedSubclasses = subclassParam
    .split(",")
    .map((s) => s.trim().replace(/-/g, "_").toLowerCase())
    .filter(Boolean);

  const sample = tableData.dataTable?.[0] || {};
  const capitalizedName =
    nameClass.charAt(0).toUpperCase() + nameClass.slice(1);

  const labelMap = {
    level: "Level",
    proficiencyBonus: "Proficiency Bonus",
    features: "Features",
    hemocraftDie: "Hemocraft Die",
    bloodCurses: "Blood Curses",
  };

  const baseColumns = Object.keys(sample)
    .filter((key) => key !== "featuresId" && typeof sample[key] !== "object")
    .map((key) => ({
      key,
      label:
        labelMap[key] ||
        key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
      isArray: Array.isArray(sample[key]),
    }));

  let slotHeader = null;
  let spellSlotSubclassKey = null;

  if (!slotHeader && Array.isArray(sample.spellSlots)) {
    slotHeader = sample.spellSlots.map((_, i) => {
      const level = i + 1;
      const suffix = ["st", "nd", "rd"];
      return `${level}${suffix[i] || "th"}`;
    });
  }

  const subclassColumns = selectedSubclasses.flatMap((subKey) => {
    const subclassData = sample[subKey];
    if (!subclassData || typeof subclassData !== "object") return [];

    return Object.keys(subclassData)
      .filter((field) => {
        if (field === "spellSlots" && Array.isArray(subclassData[field])) {
          if (!slotHeader) {
            spellSlotSubclassKey = subKey;
            slotHeader = subclassData[field].map((_, i) => {
              const level = i + 1;
              const suffix = ["st", "nd", "rd"];
              return `${level}${suffix[i] || "th"}`;
            });
          }
          return false;
        }
        return true;
      })
      .map((field) => ({
        key: `${subKey}.${field}`,
        label: field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
        isArray: Array.isArray(subclassData[field]),
      }));
  });

  const columns = [...baseColumns, ...subclassColumns];

  const enrichedData = tableData.dataTable.map((row) => {
    if (spellSlotSubclassKey && row[spellSlotSubclassKey]?.spellSlots) {
      return {
        ...row,
        spellSlots: row[spellSlotSubclassKey].spellSlots,
      };
    } else if (Array.isArray(row.spellSlots)) {
      return {
        ...row,
        spellSlots: row.spellSlots,
      };
    }
    return row;
  });

  return (
    <TableContent
      data={enrichedData}
      columns={columns}
      title=""
      slotHeader={slotHeader}
      nameClass={capitalizedName}
    />
  );
}
