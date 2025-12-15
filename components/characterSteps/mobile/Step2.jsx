"use client";
import { useState } from "react";
import InputField from "@/components/InputField";
import MultipleInput from "@/components/MultipleInput";
import { Eye, EyeOff } from "lucide-react";
import {
  allTraitsOptions,
  economicalOptions,
  socialClassOptions,
} from "@/data/characterOptions";
import LabelWithHint from "@/components/LabelWithHint";
import RichTextEditor from "@/components/RichTextEditor";
import RichTextAdvanced from "@/components/RichTextAdvanced";
export default function Step2Mobile({ data, allData, onChange }) {
  const allTraitsWithImages = allTraitsOptions.map((trait) => ({
    value: trait.toLowerCase(),
    label: trait,
    image: `/assets/personality_icon/${trait.toLowerCase()}.webp`,
  }));

  return (
    <div className="p-6  w-full  bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-6">
      {/* CHARACTER NAME */}
      <p className="text-lg font-semibold text-center">
        {allData?.name || "Unknown"}'s Profile
      </p>

      {/* PERSONALITY TRAITS (NPC Only) */}
      {allData?.character_type === "NPC" && (
        <div className="space-y-2">
          <LabelWithHint
            label="Personality Traits"
            icon="brain"
            text="Highlights defining aspects of your character’s personality — habits, virtues, flaws, or mental tendencies."
          />
          <div className="grid grid-cols-2 gap-2">
            <InputField
              type="selectImage"
              value={data.personality_traits?.[0] || ""}
              onChange={(val) => {
                const updated = [...(data.personality_traits || [])];
                updated[0] = val;
                onChange("personality_traits", updated);
              }}
              options={allTraitsWithImages.filter(
                (t) => t.value !== data.personality_traits?.[1]
              )}
              placeholder="Select Trait"
            />
            <InputField
              type="selectImage"
              value={data.personality_traits?.[1] || ""}
              onChange={(val) => {
                const updated = [...(data.personality_traits || [])];
                updated[1] = val;
                onChange("personality_traits", updated);
              }}
              options={allTraitsWithImages.filter(
                (t) => t.value !== data.personality_traits?.[0]
              )}
              placeholder="Select Trait"
            />
          </div>
        </div>
      )}

      {/* BACKSTORY */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <LabelWithHint
            label="Backstory"
            icon="album"
            text="The written history of your character’s past — origins, defining moments, and experiences."
          />
          <InputField
            type="toggleIcon"
            value={data.backstory_visibility}
            onChange={(v) => onChange("backstory_visibility", v)}
          />
        </div>

        <RichTextAdvanced
          value={data.backstory}
          onChange={(v) => onChange("backstory", v)}
          placeholder="backstory"
          rows={10}
        />
        {/* <RichTextEditor
          value={data.backstory || ""}
          onChange={(html) => onChange("backstory", html)}
          placeholder="Write your backstory here..."
          rows={10}
        /> */}
      </div>

      {/* VOICE STYLE & PERSONALITY */}
      {allData?.character_type === "NPC" && (
        <InputField
          label="Voice Style"
          value={data.voice_style || ""}
          onChange={(val) => onChange("voice_style", val)}
          placeholder="Enter voice style"
        />
      )}

      <InputField
        label="Main Personality"
        value={data.main_personality || ""}
        onChange={(val) => onChange("main_personality", val)}
        placeholder="Enter main personality"
        hint={{
          icon: "user",
          text: "General temperament, attitude, and behavior pattern.",
        }}
      />

      {/* ECONOMICAL & SOCIAL STANDING */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputField
          label="Previous Economical Standing"
          type="select"
          value={data.previous_economical_standing}
          onChange={(val) => onChange("previous_economical_standing", val)}
          options={economicalOptions}
          placeholder="Select Previous Standing"
        />
        <InputField
          label="Current Economical Standing"
          type="select"
          value={data.current_last_economical_standing}
          onChange={(val) => onChange("current_last_economical_standing", val)}
          options={economicalOptions}
          placeholder="Select Current Standing"
        />
        <InputField
          label="Previous Social Classes"
          type="select"
          value={data.previous_social_classes}
          onChange={(val) => onChange("previous_social_classes", val)}
          options={socialClassOptions}
          placeholder="Select Previous Class"
        />
        <InputField
          label="Current Social Classes"
          type="select"
          value={data.current_social_classes}
          onChange={(val) => onChange("current_social_classes", val)}
          options={socialClassOptions}
          placeholder="Select Current Class"
        />
      </div>

      <hr className="border-gray-700" />

      {/* WAYFARER / TITLES / PERSONALITY DETAIL */}
      <div className="space-y-6">
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

        <MultipleInput
          labels="Titles / Nicknames"
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

      <hr className="border-gray-700" />

      {/* FEAR / WEAKNESS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <LabelWithHint
            label="Fear / Weakness"
            icon="ghost"
            text="Specific fear, trauma, or vulnerability your character has."
          />
          <InputField
            type="toggleIcon"
            value={data.fear_weakness_visibility}
            onChange={(v) => onChange("fear_weakness_visibility", v)}
          />
        </div>
        <MultipleInput
          labels=""
          label="Fear or Weakness"
          type="object"
          fields={["fear_weak", "from"]}
          textareaFields={["from"]}
          textareaRows={2}
          textareaPlaceholder="From..."
          items={
            data.fear_weakness?.length
              ? data.fear_weakness
              : [{ fear_weak: "", from: "" }]
          }
          onChange={(vals) => onChange("fear_weakness", vals)}
        />
      </div>

      {/* MOTIVATION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <LabelWithHint
            label="Motivation"
            icon="flame"
            text="The driving force behind your character’s actions and ambitions."
          />
          <InputField
            type="toggleIcon"
            value={data.motivation_visibility}
            onChange={(v) => onChange("motivation_visibility", v)}
          />
        </div>
        <MultipleInput
          labels=""
          label="Motivation Item"
          type="object"
          fields={["motivation", "from", "how"]}
          textareaFields={["from", "how"]}
          textareaRows={2}
          items={
            data.motivation && data.motivation.length
              ? data.motivation
              : [{ motivation: "", from: "", how: "" }]
          }
          onChange={(vals) => onChange("motivation", vals)}
        />
      </div>
    </div>
  );
}
