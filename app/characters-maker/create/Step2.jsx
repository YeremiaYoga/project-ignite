"use client";
import { useState } from "react";
import InputField from "./InputField.jsx";
import MultipleInput from "@/components/MultipleInput.jsx";

export default function Step2({ data, allData, onChange }) {
  const step2 = data || {};

  const allTraits = [
    "Innocent",
    "Sage",
    "Explorer",
    "Outlaw",
    "Magician",
    "Hero",
    "Lover",
    "Jester",
    "Everyman",
    "Caregiver",
    "Ruler",
    "Creator",
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9">
          <InputField
            label="Nickname"
            type="text"
            value={allData?.step1?.name || ""}
            onChange={() => {}}
            disabled
          />
        </div>

        <div className="col-span-3">
          <label className="block text-sm font-medium mb-1">
            Personality Traits
          </label>
          <div className="grid grid-cols-2 gap-2">
            <InputField
              type="select"
              value={step2.personality_traits?.[0] || ""}
              onChange={(val) => {
                const updated = [...(step2.personality_traits || [])];
                updated[0] = val;
                onChange("personality_traits", updated);
              }}
              options={allTraits.filter(
                (t) => t !== step2.personality_traits?.[1]
              )}
              placeholder="Trait"
            />

            <InputField
              type="select"
              value={step2.personality_traits?.[1] || ""}
              onChange={(val) => {
                const updated = [...(step2.personality_traits || [])];
                updated[1] = val;
                onChange("personality_traits", updated);
              }}
              options={allTraits.filter(
                (t) => t !== step2.personality_traits?.[0]
              )}
              placeholder="Trait"
            />
          </div>
        </div>

        <div className="col-span-9">
          <InputField
            label="Backstory"
            type="textarea"
            value={step2.backstory || ""}
            onChange={(val) => onChange("backstory", val)}
            placeholder="Write backstory here..."
            rows={14}
          />
        </div>

        <div className="col-span-3 space-y-4">
          <InputField
            label="Voice Style"
            type="textarea"
            value={step2.voice_style || ""}
            onChange={(val) => onChange("voice_style", val)}
            placeholder="Enter voice style"
            rows={4}
          />

          <InputField
            label="Main Personality"
            type="textarea"
            value={step2.main_personality || ""}
            onChange={(val) => onChange("main_personality", val)}
            placeholder="Enter main personality"
          />
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-4 items-start">
          <div className="col-span-3">
            <MultipleInput
              labels="Wayfarer (Path)"
              label="Path"
              items={step2.wayfarer || [""]}
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
                step2.titles && step2.titles.length
                  ? step2.titles
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
                step2.detailed_personality && step2.detailed_personality.length
                  ? step2.detailed_personality
                  : [""]
              }
              onChange={(vals) => onChange("detailed_personality", vals)}
            />
          </div>
        </div>

        <div className="col-span-6">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Fear / Weakness</label>
            <button
              type="button"
              onClick={() =>
                onChange(
                  "fear_weakness_visibility",
                  !step2.fear_weakness_visibility
                )
              }
              className={`w-4 h-4 rounded-sm transform rotate-45 ${
                step2.fear_weakness_visibility ? "bg-red-600" : "bg-gray-600"
              }`}
            />
          </div>

          <MultipleInput
            labels=""
            label="Fear or Weakness"
            type="object"
            fields={["fear/weak", "from"]}
            items={
              step2.fear_weakness && step2.fear_weakness.length
                ? step2.fear_weakness
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
                onChange("motivation_visible", !step2.motivation_visible)
              }
              className={`w-4 h-4 rounded-sm transform rotate-45 ${
                step2.motivation_visible ? "bg-red-600" : "bg-gray-600"
              }`}
            />
          </div>

      
        </div>
      </div>
    </div>
  );
}
