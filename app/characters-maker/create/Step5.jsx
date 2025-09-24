"use client";
import InputField from "./InputField.jsx";
import { attributesOptions, combatValueOptions } from "../characterOptions";

export default function Step5({ data, allData, onChange }) {
  const step5 = data || {};

  const baseValuesFor = (combatValue) => {
    const val = parseInt(combatValue, 10) || 0;

    if (val === 0) {
      return [10, 10, 10, 10, 10, 10];
    }

    return [15, 14, 13, 12, 10, 8];
  };
  const baseValues = baseValuesFor(step5.combat_value);

  const maxSkillPoints = Number(step5.combat_value) || 0;
  const usedSkillPoints = step5.usedSkillPoints || 0;

  const calcModifier = (val) => {
    if (!val || isNaN(val)) return 0;
    const mod = Math.floor((val - 10) / 2);
    return mod > 0 ? `+${mod}` : mod;
  };

  const cycle = ["empty", "filled", "half", "center"];

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

  const getSkillState = (skill) => {
    return step5.skills?.[skill] || "empty";
  };

  const handleSkillClick = (skill) => {
    const current = getSkillState(skill);
    const nextIndex = (cycle.indexOf(current) + 1) % cycle.length;
    const next = cycle[nextIndex];

    onChange("skills", {
      ...step5.skills,
      [skill]: next,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-gray-100 space-y-8 rounded-xl shadow-xl">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow-md">
          <label className="text-sm font-semibold mb-2">Combat Value</label>
          <InputField
            type="number"
            value={step5.combat_value || ""}
            onChange={(val) => {
              if (val >= 0 && val <= 40) {
                onChange("combat_value", val);
                onChange("usedSkillPoints", 0);
              }
            }}
            placeholder="0"
          />
          <p className="text-xs text-gray-400 mt-2">
            {step5.combat_value
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
          {step5.combat_value ? (
            <>
              <p className="text-xs text-gray-400 mb-2">
                (Value Base On Combat Value)
              </p>
              <div className="flex gap-3 font-bold text-lg">
                {baseValues.map((val, idx) => (
                  <span key={idx}>{val}</span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-500 italic">
              (Value Base On Combat Value)
            </p>
          )}
        </div>

        <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow-md">
          {step5.combat_value ? (
            <>
              <p className="text-xs text-gray-400 mb-2">Skill Points Left</p>
              <div className="text-3xl font-bold">
                {maxSkillPoints - (step5.usedSkillPoints || 0)}/{maxSkillPoints}
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
              style={{ backgroundImage: "url('/Ability_score.webp')" }}
            >
              <div className="absolute inset-x-0 top-1/3 text-center text-lg font-bold text-white">
                {calcModifier(step5[attr.key])}
              </div>

              <div className="absolute inset-x-0 bottom-1/4 flex justify-center ml-1 -mb-1.5">
                <select
                  value={step5[attr.key] || ""}
                  onChange={(e) => onChange(attr.key, e.target.value)}
                  className=" text-[12px] text-center text-white  rounded-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -
                  </option>
                  {step5.combat_value !== undefined &&
                    step5.combat_value !== "" &&
                    baseValuesFor(step5.combat_value).map((val, idx) => (
                      <option
                        key={idx}
                        value={val}
                        className="bg-gray-800 text-white"
                      >
                        {val}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {attr.skills.length > 0 && (
              <ul className="pb-3 px-2 text-xs space-y-1 text-left text-gray-400 w-full">
                {attr.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 cursor-pointer hover:text-white"
                    onClick={() => handleSkillClick(skill)}
                  >
                    {skillIcons[getSkillState(skill)]}
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-4  shadow-md">
          <InputField
            label="Damage Type"
            type="select"
            value={step5.damageType || ""}
            onChange={(val) => onChange("damageType", val)}
            options={["Fire", "Cold", "Lightning", "Poison", "Radiant"]}
            placeholder="Select Damage"
          />
        </div>

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
            options={["Good", "Neutral", "Evil"]}
            placeholder="Select Disposition"
          />
        </div>
      </div>
    </div>
  );
}
