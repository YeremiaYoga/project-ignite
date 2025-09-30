"use client";
import InputField from "@/components/InputField";
import {
  attributesOptions,
  combatValueOptions,
  sizeOptions,
  creatureTypeOptions,
  personalityCombatStyleOptions,
  damageTypesWithImages,
} from "@/app/characters-maker/characterOptions";

import { useState, useEffect } from "react";

export default function Step5({ data, allData, onChange }) {
  const step5 = data || {};
  const skillCost = { empty: 0, half: 1, filled: 3, center: 9 };

  const stateToValue = { empty: 0, half: 0.5, filled: 1, center: 2 };

  const valueToState = { 0: "empty", 0.5: "half", 1: "filled", 2: "center" };

  const cycle = ["empty", "half", "filled", "center"];

  const baseValuesFor = (combatValue) => {
    const val = parseInt(combatValue, 10) || 0;
    const data = combatValueOptions.find((r) => r.value == val);
    return data?.baseValues || [];
  };

  const [assignedValues, setAssignedValues] = useState({
    str: step5.str,
    dex: step5.dex,
    con: step5.con,
    int: step5.int,
    wis: step5.wis,
    cha: step5.cha,
  });

  const [localSkillProf, setLocalSkillProf] = useState([]);

  useEffect(() => {
    if (data?.skill_prof) {
      setLocalSkillProf([...data.skill_prof]);
    }
  }, [data]);

  const baseValues = baseValuesFor(step5.combat_value);

  const usedValues = Object.values(assignedValues).filter(Boolean);

  let availableValues = [...baseValues];

  usedValues.forEach((val) => {
    const idx = availableValues.indexOf(val);
    if (idx !== -1) {
      availableValues.splice(idx, 1);
    }
  });

  const maxSkillPoints = Number(step5.combat_value) || 0;

  const calcModifier = (val) => {
    if (!val || isNaN(val)) return 0;
    const mod = Math.floor((val - 10) / 2);

    return mod > 0 ? `+${mod}` : mod;
  };

  const skillIcons = {
    empty: <div className="w-4 h-4 rounded-full border border-gray-400"></div>,
    filled: <div className="w-4 h-4 rounded-full bg-gray-400"></div>,
    half: (
      <div className="w-4 h-4 rounded-full border border-gray-400 overflow-hidden">
        <div className="w-1/2 h-full bg-gray-400"></div>
      </div>
    ),
    center: (
      <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
      </div>
    ),
  };

  const getSkillState = (skillName) => {
    const skill = localSkillProf.find(
      (s) => s.name.toLowerCase() === skillName.toLowerCase()
    );
    return skill ? valueToState[skill.value] || "empty" : "empty";
  };

  const calculateUsedSkillPoints = (skills = []) => {
    return skills.reduce((acc, s) => {
      switch (s.value) {
        case 0.5:
          return acc + 1;
        case 1:
          return acc + 3;
        case 2:
          return acc + 9;
        default:
          return acc;
      }
    }, 0);
  };
  const initialUsedPoints = calculateUsedSkillPoints(step5.skill_prof || []);

  const handleSkillClick = (skillName) => {
    const currentState = getSkillState(skillName);
    const usedPointsExcludingThis = (localSkillProf || []).reduce((acc, s) => {
      if (s.name.toLowerCase() === skillName.toLowerCase()) return acc;
      return acc + (skillCost[valueToState[s.value]] || 0);
    }, 0);

    const remainingPoints = maxSkillPoints - usedPointsExcludingThis;
    if (remainingPoints <= 0) return;

    let cycle;
    if (remainingPoints >= 9) cycle = ["empty", "half", "filled", "center"];
    else if (remainingPoints >= 3) cycle = ["empty", "half", "filled"];
    else cycle = ["empty", "half"];

    const currentIndex = cycle.indexOf(currentState);
    const nextIndex = (currentIndex + 1) % cycle.length;
    const nextState = cycle[nextIndex];
    const nextValue = stateToValue[nextState];

    let updated = [...localSkillProf];
    const existingIndex = updated.findIndex(
      (s) => s.name.toLowerCase() === skillName.toLowerCase()
    );

    if (existingIndex !== -1) {
      updated[existingIndex].value = nextValue;
    } else {
      updated.push({ name: skillName, value: nextValue });
    }
    const newUsedPoints = updated.reduce(
      (acc, s) => acc + (skillCost[valueToState[s.value]] || 0),
      0
    );

    setLocalSkillProf(updated);
    onChange("skill_prof", updated);
    onChange("usedSkillPoints", newUsedPoints);
  };

  const calcPB = (combatValue) => {
    const val = Number(combatValue) || 0;
    if (val >= 0 && val <= 9) return "+2";
    if (val >= 10 && val <= 17) return "+3";
    if (val >= 18 && val <= 25) return "+4";
    if (val >= 26 && val <= 33) return "+5";
    if (val >= 34 && val <= 40) return "+6";
    return "+0";
  };

  const getPB = (combatValue) => {
    const val = Number(combatValue) || 0;
    if (val >= 0 && val <= 9) return 2;
    if (val >= 10 && val <= 17) return 3;
    if (val >= 18 && val <= 25) return 4;
    if (val >= 26 && val <= 33) return 5;
    if (val >= 34 && val <= 40) return 6;
    return 0;
  };

  const calcSkillValue = (abilityKey, skill) => {
    const abilityValue = assignedValues[abilityKey] ?? step5[abilityKey];
    const abilityMod = calcModifier(abilityValue);
    const pb = getPB(step5.combat_value);

    const found = localSkillProf.find(
      (s) => s.name.toLowerCase() === skill.toLowerCase()
    );
    const profState = found ? valueToState[found.value] : "empty";

    let profValue = 0;
    switch (profState) {
      case "filled":
        profValue = 1;
        break;
      case "half":
        profValue = 0.5;
        break;
      case "center":
        profValue = 2;
        break;
      default:
        profValue = 0;
    }

    const total = Number(abilityMod) + pb * profValue;
    return total >= 0 ? `+${total}` : `${total}`;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-gray-100 space-y-8 rounded-xl shadow-xl">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow-md">
          <label className="text-sm font-semibold mb-2">Combat Value</label>
          <InputField
            type="number"
            value={step5.combat_value !== undefined ? step5.combat_value : ""}
            onChange={(val) => {
              const numberVal = Number(val);
              if (numberVal >= 0 && numberVal <= 40) {
                onChange("combat_value", numberVal);

                onChange("skill_prof", []);
                onChange("usedSkillPoints", 0);

                onChange("str", 0);
                onChange("dex", 0);
                onChange("con", 0);
                onChange("int", 0);
                onChange("wis", 0);
                onChange("cha", 0);

                setAssignedValues({
                  str: 0,
                  dex: 0,
                  con: 0,
                  int: 0,
                  wis: 0,
                  cha: 0,
                });
              }
            }}
            placeholder="0"
          />

          <p className="text-xs text-gray-400 mt-2">
            {step5.combat_value !== undefined && step5.combat_value !== null
              ? combatValueOptions.find(
                  (r) => r.value === Number(step5.combat_value)
                )?.label
              : "(Statement Base Upon Value)"}
          </p>
        </div>

        {/* Work in progress: Combat Style */}
        {/* 
<div className="bg-gray-800 rounded-xl p-4 shadow-md">
  <InputField
    label="Combat Style"
    type="select"
    value={step5.combatStyle || ""}
    onChange={(val) => onChange("combatStyle", val)}
    options={["Melee", "Ranged", "Magic"]}
    placeholder="Select Style"
  />
</div>
*/}
        <div className="bg-gray-800 rounded-xl p-4 shadow-md flex items-center justify-center">
          <p className="text-gray-400 italic">Work in progress</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow-md">
          {step5.combat_value !== undefined && step5.combat_value !== null ? (
            <>
              <p className="text-lg ">Ability Score</p>
              <div className="flex gap-3 font-bold text-lg">
                {baseValues.map((val, idx) => (
                  <span key={idx}>{val}</span>
                ))}
              </div>
              <p className="text-lg my-2">(PB: {calcPB(step5.combat_value)})</p>

              <p className="text-xs text-gray-400 mb-2">
                (Value Base On Combat Value)
              </p>
            </>
          ) : (
            <p className="text-xs text-gray-500 italic">
              (Value Base On Combat Value)
            </p>
          )}
        </div>

        <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow-md">
          {step5.combat_value !== undefined && step5.combat_value !== null ? (
            <>
              <p className="text-xs text-gray-400 mb-1">Skill Points Left</p>
              <div className="text-3xl font-bold">
                {maxSkillPoints - (initialUsedPoints || 0)}/{maxSkillPoints}
              </div>
              <hr className="w-full border-t border-gray-400 my-2" />
              <div className="grid grid-cols-3 mt-2 gap-1">
                <div className="flex flex-col items-center text-[9px] text-center">
                  {skillIcons.filled}
                  <span className="mt-1">Proficient</span>
                  <span>(Cost: 3)</span>
                </div>
                <div className="flex flex-col items-center text-[9px] text-center">
                  {skillIcons.half}
                  <span className="mt-1">Half Proficient</span>
                  <span>(Cost: 1)</span>
                </div>
                <div className="flex flex-col items-center text-[9px] text-center">
                  {skillIcons.center}
                  <span className="mt-1">Expertise</span>
                  <span>(Cost: 9)</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-500 italic">
              (No Combat Value Selected)
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {attributesOptions.map((attr) => (
          <div
            key={attr.key}
            className="bg-gray-800 rounded-lg shadow-md flex flex-col items-center"
          >
            <div
              className="relative w-40 h-40 bg-center bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url("/assets/abilityScore_icon/${attr.key}_ability_score.webp")`,
              }}
            >
              <div className="absolute inset-x-0 top-1/3 text-center text-lg font-bold text-white mt-2 ml-1">
                {calcModifier(assignedValues[attr.key] ?? step5[attr.key])}
              </div>

              <div className="absolute inset-x-0 bottom-1/4 flex justify-center ml-1 -mb-1.5">
                <select
                  value={assignedValues[attr.key] || ""}
                  onChange={(e) => {
                    const newVal = parseInt(e.target.value, 10);
                    setAssignedValues((prev) => ({
                      ...prev,
                      [attr.key]: newVal,
                    }));
                    onChange(attr.key, newVal);
                  }}
                  className="text-[12px] text-center text-white rounded-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -
                  </option>

                  {assignedValues[attr.key] && (
                    <option
                      value={assignedValues[attr.key]}
                      className="bg-gray-800 text-white"
                    >
                      {assignedValues[attr.key]}
                    </option>
                  )}

                  {availableValues.map((val, idx) => (
                    <option
                      key={`${val}-${idx}`}
                      value={val}
                      className="bg-gray-800 text-white"
                    >
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {attr.skills.map((skill) => {
              const current = getSkillState(skill);

              return (
                <li
                  key={`${attr.key}-${skill}`}
                  className="flex justify-between items-center gap-2 px-2 py-1 rounded w-full cursor-pointer hover:bg-gray-700"
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className="flex items-center gap-2">
                    {skillIcons[current]}
                    <span className="text-sm">{skill}</span>
                  </div>

                  <span className="text-sm font-semibold">
                    {calcSkillValue(attr.key, skill)}
                  </span>
                </li>
              );
            })}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <InputField
          type="selectImage"
          label="Damage Type"
          value={(step5.damage_type || "").toLowerCase()} 
          onChange={(val) => onChange("damage_type", val)} 
          options={damageTypesWithImages}
          placeholder="Select Damage"
        />

        <div className="bg-gray-800 rounded-xl p-4  shadow-md">
          <InputField
            label="Vision"
            type="select"
            value={step5.vision || ""}
            onChange={(val) => onChange("vision", val)}
            options={[
              "Normal Vision",
              "Darkvision-60",
              "Darkvision-120",
              "Darkvision-300",
            ]}
            placeholder="Select Vision"
          />
        </div>

        <div className="bg-gray-800 rounded-xl p-4  shadow-md">
          <InputField
            label="Disposition"
            type="select"
            value={step5.disposition || ""}
            onChange={(val) => onChange("disposition", val)}
            options={["Friendly", "Nuetral", "Hostile", "Unknown"]}
            placeholder="Select Disposition"
          />
        </div>
      </div>
      <div className="grid grid-cols-10 gap-6">
        <div className="bg-gray-800 rounded-xl p-4  shadow-md col-span-3">
          <InputField
            label="Size"
            type="select"
            value={step5.size?.vtt_size || "med"}
            onChange={(val) =>
              onChange("size", {
                general:
                  sizeOptions.find((s) => s.vtt === val)?.label || "Medium",
                vtt_size: val,
              })
            }
            options={sizeOptions.map((s) => ({ label: s.label, value: s.vtt }))}
            placeholder="Select Type"
          />
        </div>

        <div className="bg-gray-800 rounded-xl p-4  shadow-md col-span-2">
          <InputField
            label="Creature Type"
            type="select"
            value={step5.creature_type || "Humanoid"}
            onChange={(val) => onChange("creature_type", val)}
            options={creatureTypeOptions}
            placeholder="Select Type"
          />
        </div>

        <div className="bg-gray-800 rounded-xl p-4  shadow-md col-span-5">
          <InputField
            label="Personality Combat Style"
            type="select"
            value={step5.personality_combat_style || ""}
            onChange={(val) => onChange("personality_combat_style", val)}
            options={personalityCombatStyleOptions}
            placeholder="Select Personality Combat Style"
          />
        </div>
      </div>
    </div>
  );
}
