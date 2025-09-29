"use client";
import { useState } from "react";
import InputField from "@/components/InputField";
import MultipleInput from "@/components/MultipleInput.jsx";
import { Eye, EyeOff } from "lucide-react";
import {
  allTraitsOptions,
  economicalOptions,
  socialClassOptions,
} from "@/app/characters-maker/characterOptions";
export default function data({ data, allData, onChange }) {
  const step2 = data || {};

  const allTraitsWithImages = allTraitsOptions.map((trait) => ({
    value: trait.toLowerCase(),
    label: trait,
    image: `/assets/personality_icon/${trait.toLowerCase()}.webp`,
  }));

  let traits = (data.personality_traits || []).map((t) => t.toLowerCase());

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9 flex items-center">
          <p className="text-lg font-semibold">
            {data.name || "Unknown"}'s Profile
          </p>
        </div>

        {data.character_type === "NPC" && (
          <div className="col-span-3">
            <label className="block text-sm font-medium mb-1">
              Personality Traits
            </label>
            <div className="grid grid-cols-2 gap-2">
              <InputField
                type="selectImage"
                value={traits[0] || ""}
                onChange={(val) => {
                  const updated = [...(data.personality_traits || [])];
                  updated[0] = val;
                  onChange("personality_traits", updated);
                }}
                options={allTraitsWithImages.filter(
                  (t) => t.value !== traits[1]
                )}
                placeholder="Select Trait"
              />

              <InputField
                type="selectImage"
                value={traits[1] || ""}
                onChange={(val) => {
                  const updated = [...(data.personality_traits || [])];
                  updated[1] = val;
                  onChange("personality_traits", updated);
                }}
                options={allTraitsWithImages.filter(
                  (t) => t.value !== traits[0]
                )}
                placeholder="Select Trait"
              />
            </div>
          </div>
        )}

        <div className="col-span-9">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Backstory</label>
            <button
              type="button"
              onClick={() =>
                onChange("backstory_visibiliy", !data.backstory_visibiliy)
              }
              className="text-gray-400 hover:text-white"
            >
              {data.backstory_visibiliy ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          <InputField
            label=""
            type="textarea"
            value={data.backstory || ""}
            onChange={(val) => onChange("backstory", val)}
            placeholder="Write backstory here..."
            rows={22}
          />
        </div>

        <div className="col-span-3 space-y-4">
          {allData?.step1?.character_type === "NPC" && (
            <InputField
              label="Voice Style"
              value={data.voice_style || ""}
              onChange={(val) => onChange("voice_style", val)}
              placeholder="Enter voice style"
              rows={4}
            />
          )}
          <InputField
            label="Main Personality"
            value={data.main_personality || ""}
            onChange={(val) => onChange("main_personality", val)}
            placeholder="Enter main personality"
          />
          <InputField
            label="Previous Economical Standing"
            type="select"
            value={data.previous_economical_standing}
            onChange={(val) => onChange("previous_economical_standing", val)}
            placeholder="Select Economical Standing"
            options={economicalOptions}
          />
          <InputField
            label="Current Economical Standing"
            type="select"
            value={data.current_economical_standing}
            onChange={(val) =>
              onChange("current_last_economical_standing", val)
            }
            placeholder="Select Economical Standing"
            options={economicalOptions}
          />
          <InputField
            label="Previous Social Classes"
            type="select"
            value={data.previous_social_classes}
            onChange={(val) => onChange("previous_social_classes", val)}
            placeholder="Select Sosial Classes"
            options={socialClassOptions}
          />
          <InputField
            label="Current Social Classes"
            type="select"
            value={data.current_social_classes}
            onChange={(val) => onChange("current_social_classes", val)}
            placeholder="Select Sosial Classes"
            options={socialClassOptions}
          />
        </div>

        <hr className="col-span-12 border-t border-gray-700 my-2" />

        <div className="col-span-12 grid grid-cols-12 gap-4 items-start">
          <div className="col-span-3">
            <MultipleInput
              labels="Wayfarer (Path)"
              label="Path"
              items={data.wayfarer || [""]}
              onChange={(vals) => onChange("wayfarer", vals)}
              selectOptions={[
                { label: "Test1", value: "Test1" },
                { label: "Test2", value: "Test2" },
                { label: "Test3", value: "Test3" },
              ]}
            />
          </div>

          <div className="col-span-5">
            <MultipleInput
              labels="Titles"
              label="Title"
              type="object"
              fields={["name", "from"]}
              items={
                data.titles && data.titles.length
                  ? data.titles
                  : [{ name: "", from: "" }]
              }
              onChange={(vals) => onChange("titles", vals)}
            />
          </div>

          <div className="col-span-4">
            <MultipleInput
              labels="Detailed Personality"
              label="Detail"
              items={
                data.detailed_personality && data.detailed_personality.length
                  ? data.detailed_personality
                  : [""]
              }
              onChange={(vals) => onChange("detailed_personality", vals)}
            />
          </div>
        </div>

        <hr className="col-span-12 border-t border-gray-700 my-2" />

        <div className="col-span-6">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Fear / Weakness</label>
            <button
              type="button"
              onClick={() =>
                onChange(
                  "fear_weakness_visibility",
                  !data.fear_weakness_visibility
                )
              }
              className="text-gray-400 hover:text-white"
            >
              {data.fear_weakness_visibility ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          <MultipleInput
            labels=""
            label="Fear or Weakness"
            type="object"
            fields={["fear_weak", "from"]}
            items={
              data.fear_weakness && data.fear_weakness.length
                ? data.fear_weakness
                : [{ fear_weak: "", from: "" }]
            }
            onChange={(vals) => onChange("fear_weakness", vals)}
          />
        </div>

        <div className="col-span-6">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Motivation</label>
            <button
              type="button"
              onClick={() =>
                onChange("motivation_visibility", !data.motivation_visibility)
              }
              className="text-gray-400 hover:text-white"
            >
              {data.motivation_visibility ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          <MultipleInput
            labels=""
            label="Motivation Item"
            type="object"
            fields={["motivation", "from", "how"]}
            items={
              data.motivation && data.motivation.length
                ? data.motivation
                : [{ motivation: "", from: "", how: "" }]
            }
            onChange={(vals) => onChange("motivation", vals)}
          />
        </div>
      </div>
    </div>
  );
}
