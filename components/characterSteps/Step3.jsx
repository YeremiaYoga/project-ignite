"use client";

import InputField from "@/components/InputField";
import MultipleInput from "@/components/MultipleInput.jsx";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Upload } from "lucide-react";
import {
  nationalityOptions,
  countryOptions,
} from "../../data/characterOptions";
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

    console.log(data.main_theme_ogg, data.combat_theme_ogg);
  }, [data.main_theme_ogg, data.combat_theme_ogg]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-6">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="flex items-center justify-between mb-1">
            <LabelWithHint
              label="Apperance"
              icon="user-square"
              text="A summary of your character’s general look and demeanor — posture, body type, presence, and the overall impression they give. This section gives readers a first visual sense of who the character is."
            />
            <InputField
              type="toggleIcon"
              value={data.appearance_visibility}
              onChange={(v) => onChange("appearance_visibility", v)}
            />
          </div>
          <InputField
            label=""
            type="textarea"
            value={data.appearance || ""}
            onChange={(val) => onChange("appearance", val)}
            placeholder="Write apperance here..."
            rows={15}
          />
        </div>

        <div className="space-y-3 col-span-2">
          <div>
            <LabelWithHint
              label="Main Theme"
              icon="music"
              text="The central musical or emotional theme that embodies your character’s spirit. Often used in storytelling or media to represent their essence or emotional state."
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={data.main_theme || ""}
                onChange={(e) => onChange("main_theme", e.target.value)}
                className="flex-1 h-10 px-3 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Enter Main Theme (www.youtube.com link)"
              />

              <input
                type="file"
                accept=".ogg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    onChange("main_theme_ogg", file);
                  }
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

            <div className="flex justify-end items-center gap-2 mt-2">
              <p className="text-xs text-gray-400">
                {data.main_theme_ogg ? data.main_theme_ogg.name : "\u00A0"}
              </p>
              <p className="text-xs text-gray-400">(OGG File Only)</p>
            </div>
          </div>

          <div>
            <LabelWithHint
              label="Combat Theme"
              icon="file-audio"
              text="A theme that represents your character’s energy and mindset in battle — whether it’s a calm duel rhythm or a chaotic storm of emotion and sound."
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={data.combat_theme || ""}
                onChange={(e) => onChange("combat_theme", e.target.value)}
                className="flex-1 h-10 px-3 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Enter Combat Theme (www.youtube.com link)"
              />

              <input
                type="file"
                accept=".ogg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    onChange("combat_theme_ogg", file);
                  }
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

            <div className="flex justify-end items-center gap-2 mt-2">
              <p className="text-xs text-gray-400">
                {data.combat_theme_ogg ? data.combat_theme_ogg.name : "\u00A0"}
              </p>
              <p className="text-xs text-gray-400">(OGG File Only)</p>
            </div>
          </div>

          <InputField
            label="Nationality"
            type={mode ? "select" : "text"}
            placeholder={mode ? "Select Nationality" : "Country"}
            value={data.nationality || ""}
            onChange={(val) => onChange("nationality", val)}
            options={mode ? nationalityOptions : undefined}
            hint={{
              icon: "flag",
              text: "The country, empire, or faction your character originates from. It helps define cultural identity, traditions, and historical context.",
            }}
          />

          <div>
            <LabelWithHint
              label="Main Resident"
              icon="home"
              text="Your character’s current primary place of living — the region, city, or environment they consider home. It may influence their lifestyle and resources."
            />
            <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="grid grid-cols-9 gap-4">
        <div className="col-span-3">
          <MultipleInput
            labels="Notable details (Appearance)"
            label="details of thou appearance (Exp : A very tall woman)"
            btnLabel="Add Details"
            items={data.notable_details || [""]}
            onChange={(items) => onChange("notable_details", items)}
            hint={{
              icon: "eye",
              text: "Specific visual traits or markings that stand out — scars, tattoos, jewelry, unusual eye colors, or other defining physical details that make your character recognizable.",
            }}
          />
        </div>
        <div className="col-span-2">
          <MultipleInput
            labels="Current Occupations"
            label="Occupation"
            items={data.current_occupation || [""]}
            onChange={(items) => onChange("current_occupation", items)}
            hint={{
              icon: "briefcase-business",
              text: "Your character’s present career, role, or profession. Defines their main activity or source of livelihood within the world’s setting.",
            }}
          />
        </div>
        <div className="col-span-2">
          <MultipleInput
            labels="Previous Occupations"
            label="Occupation"
            items={data.previous_occupation || [""]}
            onChange={(items) => onChange("previous_occupation", items)}
            hint={{
              icon: "briefcase",
              text: "Professions, duties, or societal roles your character held before their current path. This helps record their skills, history, and life experience.",
            }}
          />
        </div>
        <div className="col-span-2">
          <MultipleInput
            labels="Other Resident"
            label="Resident"
            items={data.other_resident || [""]}
            onChange={(items) => onChange("other_resident", items)}
            hint={{
              icon: "map-pin-house",
              text: "Additional notable locations your character has lived in or maintains ties with — secondary homes, safehouses, or places of memory and significance.",
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        <div className="mt-1 col-span-3">
          <div className="flex items-center justify-between w-[92%]">
            <LabelWithHint
              label="Hobbies"
              icon="gamepad-2"
              text="Recreational or personal interests pursued during downtime. Hobbies can reflect a character’s softer side, coping habits, or hidden talents.
"
            />
            <InputField
              type="toggleIcon"
              value={data.hobbies_visibility}
              onChange={(v) => onChange("hobbies_visibility", v)}
            />
          </div>
          <MultipleInput
            labels=""
            label="Hobbies"
            items={data.hobbies || [""]}
            onChange={(items) => onChange("hobbies", items)}
          />
        </div>
        <div className="col-span-2">
          <LabelWithHint
            label="Signature Object"
            icon="star"
            text="A personal or symbolic item your character is rarely seen without. It may carry emotional value, heritage, or magical properties tied to their story."
          />

          <MultipleInput
            labels=""
            label="Object"
            items={data.signature_object || [""]}
            onChange={(items) => onChange("signature_object", items)}
          />
        </div>
        <div className="col-span-2">
          <LabelWithHint
            label="Signature Weapon/Spellcasting Focus"
            icon="wand"
            text="The main weapon, magical implement, or channeling focus your character wields. Often customized, named, or uniquely bound to them, reflecting their style and power."
          />
          <MultipleInput
            labels=""
            label="Weapon"
            items={data.signature_weapon || [""]}
            onChange={(items) => onChange("signature_weapon", items)}
          />
        </div>
      </div>
    </div>
  );
}
