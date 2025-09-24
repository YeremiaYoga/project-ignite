"use client";

import InputField from "./InputField.jsx";
import MultipleInput from "@/components/MultipleInput.jsx";
import { Eye, EyeOff, Upload } from "lucide-react";

export default function Step3({ data, allData, onChange, mode }) {
  const step3 = data || {};
  const toggleVisibility = (field) => {
    onChange(field, !data[field]);
  };

  const nationalityOptions = [
    { label: "Vallarian Nationality :", value: "", disabled: true },
    { label: "Mondralian", value: "Mondralian" },
    { label: "Delstainvian", value: "Delstainvian" },
    { label: "Istegrian", value: "Istegrian" },
    { label: "Alvavian", value: "Alvavian" },
    { label: "Kastugarian", value: "Kastugarian" },
    { label: "Kolgardian", value: "Kolgardian" },
    { label: "Magusvian", value: "Magusvian" },
    { label: "Prosperian", value: "Prosperian" },
    { label: "Tansarha", value: "Tansarha" },
    { label: "Other Nationality :", value: "", disabled: true },
    { label: "Non-National", value: "Non-National" },
    { label: "Titanfall People", value: "Titanfall People" },
    { label: "The Lost Isles People", value: "The Lost Isles People" },
    { label: "Other Planes", value: "Other Planes" },
    { label: "Astral Planes", value: "Astral Planes" },
    { label: "Unknown", value: "Unknown" },
  ];

  const countryOptions = [
    // Vallarian
    { label: "Vallarian :", value: "", disabled: true },
    { label: "Mondralian", value: "Mondralian" },
    { label: "Delstainvia", value: "Delstainvia" },
    { label: "Istegria", value: "Istegria" },
    { label: "Alvavia", value: "Alvavia" },
    { label: "Kastugar", value: "Kastugar" },
    { label: "Kolgard", value: "Kolgard" },
    { label: "Magusvia", value: "Magusvia" },
    { label: "Prosperian", value: "Prosperian" },
    { label: "Tansarha", value: "Tansarha" },

    // Titanfall Isles (sementara di-comment, belum lengkap)
    /*
  { label: "Titanfall Isles :", value: "", disabled: true },
  { label: "The Titanfall Isle", value: "The Titanfall Isle" },
  { label: "The Isle of Dragons", value: "The Isle of Dragons" },
  { label: "Light & Shadow Isle", value: "Light & Shadow Isle" },
  { label: "Isle of Thorns", value: "Isle of Thorns" },
  { label: "Isle of Acheron", value: "Isle of Acheron" },
  { label: "Isle of Wild-Beast", value: "Isle of Wild-Beast" },
  { label: "Isle of Snow-Warmth", value: "Isle of Snow-Warmth" },
  { label: "Isle of Cinder", value: "Isle of Cinder" },
  { label: "Mythos Isle", value: "Mythos Isle" },
  */

    // Multiversal
    { label: "Multiversal :", value: "", disabled: true },
    { label: "Material Plane (Terra)", value: "Material Plane (Terra)" },
    { label: "Elemental Plane of Water", value: "Elemental Plane of Water" },
    { label: "Elemental Plane of Air", value: "Elemental Plane of Air" },
    { label: "Elemental Plane of Fire", value: "Elemental Plane of Fire" },
    { label: "Elemental Plane of Earth", value: "Elemental Plane of Earth" },
    { label: "Feywild", value: "Feywild" },
    { label: "Shadowfell", value: "Shadowfell" },
    { label: "Celestia (Elysium)", value: "Celestia (Elysium)" },
    { label: "The Nine Hells", value: "The Nine Hells" },

    // Other
    { label: "Other :", value: "", disabled: true },
    { label: "Demiplane", value: "Demiplane" },
    { label: "Astral Planes", value: "Astral Planes" },
    { label: "Unknown", value: "Unknown" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-6">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Appearance</label>
            <button
              type="button"
              onClick={() =>
                onChange("appearance_visibility", !data.appearance_visibility)
              }
              className="text-gray-400 hover:text-white"
            >
              {data.appearance_visibility ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
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
            <label className="block text-sm font-medium mb-1">Main Theme</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={data.main_theme || ""}
                onChange={(e) => onChange("main_theme", e.target.value)}
                className="flex-1 h-10 px-3 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Enter main theme"
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
            <label className="block text-sm font-medium mb-1">
              Combat Theme
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={data.combat_theme || ""}
                onChange={(e) => onChange("combat_theme", e.target.value)}
                className="flex-1 h-10 px-3 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Enter combat theme"
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
            type="select"
            value={step3.nationality || ""}
            onChange={(val) => onChange("nationality", val)}
            placeholder="Select Nationality"
            options={nationalityOptions}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Main Resident
            </label>
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
            labels="Notable Details"
            label="Occupation"
            items={data.notable_details || [""]}
            onChange={(items) => onChange("notable_details", items)}
          />
        </div>
        <div className="col-span-2">
          <MultipleInput
            labels="Current Occupations"
            label="Occupation"
            items={data.current_occupation || [""]}
            onChange={(items) => onChange("current_occupation", items)}
          />
        </div>
        <div className="col-span-2">
          <MultipleInput
            labels="Previous Occupations"
            label="Occupation"
            items={data.previous_occupation || [""]}
            onChange={(items) => onChange("previous_occupation", items)}
          />
        </div>
        <div className="col-span-2">
          <MultipleInput
            labels="Other Resident"
            label="Resident"
            items={data.other_resident || [""]}
            onChange={(items) => onChange("other_resident", items)}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        <div className="mt-1 col-span-3">
          <div className="flex items-center justify-between w-[92%]">
            <label className="text-sm font-medium">Hobbies</label>
            <button
              type="button"
              onClick={() =>
                onChange("hobbies_visibility", !data.hobbies_visibility)
              }
              className="text-gray-400 hover:text-white"
            >
              {data.hobbies_visibility ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          <MultipleInput
            labels=""
            label="Hobbies"
            items={data.hobbies || [""]}
            onChange={(items) => onChange("hobbies", items)}
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium">Signature Object</label>

          <MultipleInput
            labels=""
            label="Object"
            items={data.signature_object || [""]}
            onChange={(items) => onChange("signature_object", items)}
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium">Signature Weapon</label>
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
