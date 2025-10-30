"use client";
import { useState } from "react";
import InputField from "@/components/InputField";
import MultipleInput from "@/components/MultipleInput.jsx";
import { Eye, EyeOff } from "lucide-react";
import {
  allTraitsOptions,
  economicalOptions,
  socialClassOptions,
} from "../../data/characterOptions";
import LabelWithHint from "@/components/LabelWithHint";
import RichTextEditor from "@/components/RichTextEditor";
export default function Step2({ data, allData, onChange }) {
  const allTraitsWithImages = allTraitsOptions.map((trait) => ({
    value: trait.toLowerCase(),
    label: trait,
    image: `/assets/personality_icon/${trait.toLowerCase()}.webp`,
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9 flex items-center">
          <p className="text-lg font-semibold">
            {allData?.name || "Unknown"}'s Profile
          </p>
        </div>

        {allData?.character_type === "NPC" && (
          <div className="col-span-3">
            <LabelWithHint
              label="Personality Traits"
              icon="brain"
              text="Highlights defining aspects of your character’s personality — including habits, virtues, flaws, or mental tendencies. These traits can influence decision-making, behavior, and serve as the foundation for the character, affecting how they respond under stress or emotional strain."
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

        <div className="col-span-9">
          <div className="flex items-center justify-between mb-1">
            <LabelWithHint
              label="Backstory"
              icon="album"
              text="The written history of your character’s past — detailing their origins, defining moments, relationships, and experiences that shaped who they are today.
"
            />
            <InputField
              type="toggleIcon"
              value={data.backstory_visibility}
              onChange={(v) => onChange("backstory_visibility", v)}
            />
          </div>
          <RichTextEditor
            value={data.backstory || ""}
            onChange={(html) => onChange("backstory", html)}
            placeholder="backstory"
            rows={22}
          />
        </div>

        <div className="col-span-3 space-y-4">
          {allData?.character_type === "NPC" && (
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
            hint={{
              icon: "user",
              text: "A general summary of your character’s temperament, attitude, and core behavior. Describes how they usually act, think, and respond to the world around them.",
            }}
          />
          <InputField
            label="Previous Economical Standing"
            type="select"
            value={data.previous_economical_standing}
            onChange={(val) => onChange("previous_economical_standing", val)}
            placeholder="Select Economical Standing"
            options={economicalOptions}
            hint={{
              icon: "coins",
              text: "Represents your character’s past financial or material condition — whether they came from poverty, modest means, or great wealth before the story began.",
            }}
          />
          <InputField
            label="Current Economical Standing"
            type="select"
            value={data.current_last_economical_standing}
            onChange={(val) =>
              onChange("current_last_economical_standing", val)
            }
            placeholder="Select Economical Standing"
            options={economicalOptions}
            hint={{
              icon: "wallet",
              text: "Reflects your character’s present wealth or resources.",
            }}
          />
          <InputField
            label="Previous Social Classes"
            type="select"
            value={data.previous_social_classes}
            onChange={(val) => onChange("previous_social_classes", val)}
            placeholder="Select Sosial Classes"
            options={socialClassOptions}
            hint={{
              icon: "building-2",
              text: "Your character’s former position or reputation within society — such as peasant, noble, scholar, or outcast — before major life changes or events.",
            }}
          />
          <InputField
            label="Current Social Classes"
            type="select"
            value={data.current_social_classes}
            onChange={(val) => onChange("current_social_classes", val)}
            placeholder="Select Sosial Classes"
            options={socialClassOptions}
            hint={{
              icon: "building",
              text: "Your character’s current status or standing in society. May differ from their origins based on achievements, failures, or world events.",
            }}
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
              hint={{
                icon: "compass",
                text: "Represents the entity, philosophy, or figure your character places their faith or belief in. It could be a god, cosmic force, or ideology — shaping their worldview, purpose, and moral compass. Although they could have left their Wayfarer path.",
              }}
            />
          </div>

          <div className="col-span-5">
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
              hint={{
                icon: "medal",
                text: "Names or epithets your character has earned or been given — whether formal honors, infamous aliases, or affectionate monikers used by allies and foes alike.",
              }}
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
              hint={{
                icon: "brain-circuit",
                text: "An in-depth analysis of your character’s mindset — describing emotional layers, decision patterns, quirks, and internal conflicts that extend beyond their main personality summary.",
              }}
            />
          </div>
        </div>

        <hr className="col-span-12 border-t border-gray-700 my-2" />

        <div className="col-span-6">
          <div className="flex items-center justify-between mb-1">
            <LabelWithHint
              label="Fear / Weakness"
              icon="ghost"
              text="The specific fear, trauma, or vulnerability your character possesses.
Name: The term or concept defining this fear.
From: The origin — what caused or instilled this fear."
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
            fields={["fear/weak", "from"]}
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
            <LabelWithHint
              label="Motivation"
              icon="flame"
              text="The driving force behind your character’s actions and ambitions.
Name: The defined goal or ideal they pursue.
From: The event, person, or memory that sparked this drive.
How Gained: The process or realization that turned it into a lasting conviction.
"
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
