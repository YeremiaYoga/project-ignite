"use client";

import React from "react";

export default function CoreTraitsDisplay({ data }) {
  if (!data) return null;
  console.log(data);
  const Row = ({ label, content }) => {
    if (content === null || (Array.isArray(content) && content.length === 0)) {
      return null;
    }
    if (label === "Primary Ability" && content === "") {
      return null;
    }

    return (
      <div className="grid grid-cols-12 gap-4 items-start py-2 border-b border-gray-700 last:border-b-0">
        <div className="col-span-5 md:col-span-4 font-semibold text-blue-300">
          {label}
        </div>
        <div className="col-span-7 md:col-span-8 text-gray-200">{content}</div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-2  text-white rounded-xl shadow-lg  ">
      <Row label="Primary Ability" content={data.primaryAbility} />

      <Row
        label="Hit Point Die"
        content={
          <span className="text-gray-300">
            {data.hitDie} per {data.class} level
          </span>
        }
      />

      <Row
        label={`Hit Points at Level 1`}
        content={
          <span className="text-gray-300">{data.hitPointsAtLevel1}</span>
        }
      />

      <Row
        label={`Hit Points per additional ${data.class} Level`}
        content={
          <span className="text-gray-300">{data.hitPointsAtHigherLevels}</span>
        }
      />

      <Row
        label="Saving Throw Proficiencies"
        content={
          <span className="text-gray-300">
            {data.savingThrowProficiencies.join(", ")}
          </span>
        }
      />

      <Row
        label="Skill Proficiencies"
        content={
          <>
            <p className="text-gray-300 mb-1">
              <span className="underline">
                {`Choose ${data.skillProficiencies.choose ?? ""}`}
              </span>
            </p>

            {Array.isArray(data.skillProficiencies.options) &&
              data.skillProficiencies.options.length > 0 && (
                <ul className="list-disc ml-5 text-gray-300">
                  {data.skillProficiencies.options.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              )}
          </>
        }
      />

      {data.weaponProficiencies && data.weaponProficiencies.length > 0 && (
        <Row
          label="Weapon Proficiencies"
          content={
            <span className="text-gray-300">
              {data.weaponProficiencies.join(" and ")}
            </span>
          }
        />
      )}

      {data.toolProficiencies && data.toolProficiencies.length > 0 && (
        <Row
          label="Tool Proficiencies"
          content={
            <span className="text-gray-300">
              {data.toolProficiencies.join(", ")}
            </span>
          }
        />
      )}

      {data.armorTraining && data.armorTraining.length > 0 && (
        <Row
          label="Armor Training"
          content={
            <span className="text-gray-300">
              {data.armorTraining.join(" and ")}
            </span>
          }
        />
      )}

      {data.startingEquipment &&
        Object.keys(data.startingEquipment).length > 0 && (
          <Row
            label="Starting Equipment"
            content={
              <>
                {data.startingEquipment.instruction && (
                  <p className="text-gray-300 mb-2">
                    {data.startingEquipment.instruction}
                  </p>
                )}
                {data.startingEquipment.options &&
                  data.startingEquipment.options.length > 0 && (
                    <ul className="list-disc ml-5 space-y-1 text-gray-300">
                      {data.startingEquipment.options.map((option, idx) => (
                        <li key={idx}>
                          <strong>{option.label}:</strong>{" "}
                          {option.items.join(", ")}
                        </li>
                      ))}
                    </ul>
                  )}
                {data.startingEquipment.items &&
                  data.startingEquipment.items.length > 0 && (
                    <ul className="list-disc ml-5 space-y-1 text-gray-300">
                      {data.startingEquipment.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
              </>
            }
          />
        )}

      {data.optionalEquipment &&
        Object.keys(data.optionalEquipment).length > 0 && (
          <>
            <div className="mt-6">
              {" "}
              <p className="text-gray-300 mb-2">
                {data.optionalEquipment.instruction}
              </p>
              <ul className="list-disc ml-5 space-y-1 text-gray-300">
                {data.optionalEquipment.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              {data.optionalEquipment.alternativeInstruction && (
                <p className="text-gray-300 mt-4">
                  {data.optionalEquipment.alternativeInstruction}{" "}
                  {data.optionalEquipment.alternativeValue}
                </p>
              )}
            </div>
          </>
        )}
    </div>
  );
}
