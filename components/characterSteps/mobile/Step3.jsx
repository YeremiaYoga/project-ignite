"use client";

import { useEffect } from "react";
import { Upload } from "lucide-react";
import InputField from "@/components/InputField";
import MultipleInput from "@/components/MultipleInput";
import { nationalityOptions, countryOptions } from "@/data/characterOptions";
import LabelWithHint from "@/components/LabelWithHint";

export default function Step3({ data, allData, onChange, mode }) {
  useEffect(() => {
    if (data.main_theme_ogg && typeof data.main_theme_ogg === "string") {
      const mainUrl = data.main_theme_ogg.startsWith("http")
        ? data.main_theme_ogg
        : `${process.env.NEXT_PUBLIC_API_URL}${data.main_theme_ogg}`;
      onChange("main_theme_ogg", mainUrl);
    }

    if (data.combat_theme_ogg && typeof data.combat_theme_ogg === "string") {
      const combatUrl = data.combat_theme_ogg.startsWith("http")
        ? data.combat_theme_ogg
        : `${process.env.NEXT_PUBLIC_API_URL}${data.combat_theme_ogg}`;
      onChange("combat_theme_ogg", combatUrl);
    }
  }, [data.main_theme_ogg, data.combat_theme_ogg]);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-8">
      {/* === APPEARANCE === */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <LabelWithHint
            label="Appearance"
            icon="user-square"
            text="Describe the character’s general look, body type, and demeanor."
          />
          <InputField
            type="toggleIcon"
            value={data.appearance_visibility}
            onChange={(v) => onChange("appearance_visibility", v)}
          />
        </div>
        <InputField
          type="textarea"
          value={data.appearance || ""}
          onChange={(val) => onChange("appearance", val)}
          placeholder="Describe appearance here..."
          rows={8}
        />
      </div>

      {/* === THEMES === */}
      <div className="space-y-6">
        {/* MAIN THEME */}
        <div>
          <LabelWithHint
            label="Main Theme"
            icon="music"
            text="Musical or emotional theme representing your character’s essence."
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={data.main_theme || ""}
              onChange={(e) => onChange("main_theme", e.target.value)}
              className="flex-1 h-10 px-3 rounded-lg bg-gray-800 border border-gray-700 
               focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              placeholder="Enter YouTube link"
            />

            <input
              type="file"
              accept=".ogg"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) onChange("main_theme_ogg", file);
              }}
              className="hidden"
              id="mainThemeUpload"
            />

            <label
              htmlFor="mainThemeUpload"
              className="flex items-center justify-center w-10 h-10 rounded-lg 
               bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="w-5 h-5 text-white" />
            </label>
          </div>
          {data.main_theme_ogg && (
            <p className="text-xs text-gray-400 mt-1 truncate">
              {data.main_theme_ogg.name || data.main_theme_ogg}
            </p>
          )}
        </div>

        {/* COMBAT THEME */}
        <div>
          <LabelWithHint
            label="Combat Theme"
            icon="file-audio"
            text="Theme that embodies your character’s battle energy or mindset."
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={data.combat_theme || ""}
              onChange={(e) => onChange("combat_theme", e.target.value)}
              className="flex-1 h-10 px-3 rounded-lg bg-gray-800 border border-gray-700 
               focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              placeholder="Enter YouTube link"
            />

            <input
              type="file"
              accept=".ogg"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) onChange("combat_theme_ogg", file);
              }}
              className="hidden"
              id="combatThemeUpload"
            />

            <label
              htmlFor="combatThemeUpload"
              className="flex items-center justify-center w-10 h-10 rounded-lg 
               bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="w-5 h-5 text-white" />
            </label>
          </div>
          {data.combat_theme_ogg && (
            <p className="text-xs text-gray-400 mt-1 truncate">
              {data.combat_theme_ogg.name || data.combat_theme_ogg}
            </p>
          )}
        </div>
      </div>

      {/* === NATIONALITY & RESIDENCE === */}
      <div className="space-y-4">
        <InputField
          label="Nationality"
          type={mode ? "select" : "text"}
          placeholder={mode ? "Select Nationality" : "Enter Nationality"}
          value={data.nationality || ""}
          onChange={(val) => onChange("nationality", val)}
          options={mode ? nationalityOptions : undefined}
          hint={{
            icon: "flag",
            text: "Country, empire, or faction your character belongs to.",
          }}
        />

        <div>
          <LabelWithHint
            label="Main Resident"
            icon="home"
            text="Primary place your character lives — city, region, or home."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label=""
              type="text"
              placeholder="Resident"
              value={data.main_resident?.resident || ""}
              onChange={(val) =>
                onChange("main_resident", {
                  ...data.main_resident,
                  resident: val,
                })
              }
            />
            <InputField
              label=""
              type={mode ? "select" : "text"}
              placeholder={mode ? "Select Country" : "Country"}
              value={data.main_resident?.country || ""}
              onChange={(val) =>
                onChange("main_resident", {
                  ...data.main_resident,
                  country: val,
                })
              }
              options={mode ? countryOptions : undefined}
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* === DETAILS / OCCUPATION / RESIDENT === */}
      <div className="space-y-6">
        <MultipleInput
          labels="Notable Details (Appearance)"
          label="Appearance Detail"
          btnLabel="Add Detail"
          items={data.notable_details || [""]}
          onChange={(items) => onChange("notable_details", items)}
          hint={{
            icon: "eye",
            text: "Distinct visual traits: scars, tattoos, or unique features.",
          }}
        />

        <MultipleInput
          labels="Current Occupations"
          label="Occupation"
          items={data.current_occupation || [""]}
          onChange={(items) => onChange("current_occupation", items)}
        />

        <MultipleInput
          labels="Previous Occupations"
          label="Occupation"
          items={data.previous_occupation || [""]}
          onChange={(items) => onChange("previous_occupation", items)}
        />

        <MultipleInput
          labels="Other Resident"
          label="Resident"
          items={data.other_resident || [""]}
          onChange={(items) => onChange("other_resident", items)}
        />
      </div>

      <hr className="border-gray-700" />

      {/* === HOBBIES & SIGNATURES === */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <LabelWithHint
              label="Hobbies"
              icon="gamepad-2"
              text="Personal interests or recreational activities."
            />
            <InputField
              type="toggleIcon"
              value={data.hobbies_visibility}
              onChange={(v) => onChange("hobbies_visibility", v)}
            />
          </div>
          <MultipleInput
            label="Hobbies"
            items={data.hobbies || [""]}
            onChange={(items) => onChange("hobbies", items)}
          />
        </div>

        <MultipleInput
          labels="Signature Object"
          label="Object"
          items={data.signature_object || [""]}
          onChange={(items) => onChange("signature_object", items)}
        />

        <MultipleInput
          labels="Signature Weapon / Focus"
          label="Weapon or Focus"
          items={data.signature_weapon || [""]}
          onChange={(items) => onChange("signature_weapon", items)}
        />
      </div>
    </div>
  );
}
