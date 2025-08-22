"use client";

import { useState } from "react";
import optionsData from "@/data/bgoptions.json";
import MultipleSelectInput from "./MultipleSelectInput";

export default function BackgroundForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    description: "",
    ability_scores: [],
    feat: "",
    skill_proficiencies: [],
    tool_proficiencies: [],
    tags: [],
    equipment_options: {},
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addUniqueValue = (field, value) => {
    if (!value) return;
    setFormData((prev) => {
      if (prev[field].includes(value)) return prev;
      return {
        ...prev,
        [field]: [...prev[field], value],
      };
    });
  };

  const removeSelected = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((v) => v !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/backgrounds/createBackgroundData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("Submitted Background:", result);

      if (!res.ok) {
        alert("Gagal menyimpan background: " + result.message);
        return;
      }

      if (onSubmit) {
        onSubmit(result.data);
      }

      alert("Background berhasil disimpan!");
    } catch (error) {
      console.error("Error submitting background:", error);
      alert("Terjadi error saat menyimpan background.");
    }
  };

  return (
    <div className="max-w-5xl w-full mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full space-y-6"
      >
        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Source"
          value={formData.source}
          onChange={(e) => handleChange("source", e.target.value)}
        />

        <textarea
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700 "
          placeholder="Feat"
          value={formData.feat}
          onChange={(e) => handleChange("feat", e.target.value)}
        />

        <MultipleSelectInput
          label="Ability Scores"
          field="ability_scores"
          options={optionsData.abilityScoresOptions}
          values={formData.ability_scores}
          onAdd={addUniqueValue}
          onRemove={removeSelected}
        />

        <MultipleSelectInput
          label="Skill Proficiencies"
          field="skill_proficiencies"
          options={optionsData.skillsOptions}
          values={formData.skill_proficiencies}
          onAdd={addUniqueValue}
          onRemove={removeSelected}
        />

        <div>
          <label className="block mb-1 font-bold">Tool Proficiencies:</label>
          {formData.tool_proficiencies.map((tool, i) => (
            <input
              key={i}
              className="w-full p-2 rounded bg-gray-700 mt-1"
              placeholder="Tool Proficiency"
              value={tool}
              onChange={(e) => {
                const arr = [...formData.tool_proficiencies];
                arr[i] = e.target.value;
                setFormData((prev) => ({ ...prev, tool_proficiencies: arr }));
              }}
            />
          ))}
          <button
            type="button"
            className="px-2 py-1 bg-blue-600 rounded mt-2"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                tool_proficiencies: [...prev.tool_proficiencies, ""],
              }))
            }
          >
            + Add Tool
          </button>
        </div>

        <MultipleSelectInput
          label="Tags"
          field="tags"
          options={optionsData.tagsOptions}
          values={formData.tags}
          onAdd={addUniqueValue}
          onRemove={removeSelected}
        />
        <div>
          <label className="block mb-2 font-bold">Equipment Options:</label>
          {Object.entries(formData.equipment_options).map(([key, option]) => (
            <div key={key} className="border p-3 mb-3 rounded bg-gray-800">
              <h3 className="font-bold mb-2">Option {key}</h3>
              {option.items.map((item, idx) => (
                <input
                  key={idx}
                  className="w-full p-2 rounded bg-gray-700 mt-1"
                  placeholder="Item"
                  value={item}
                  onChange={(e) => {
                    const updated = { ...formData.equipment_options };
                    updated[key].items[idx] = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      equipment_options: updated,
                    }));
                  }}
                />
              ))}
              <button
                type="button"
                className="px-2 py-1 bg-blue-600 rounded mt-2"
                onClick={() => {
                  const updated = { ...formData.equipment_options };
                  updated[key].items.push("");
                  setFormData((prev) => ({
                    ...prev,
                    equipment_options: updated,
                  }));
                }}
              >
                + Add Item
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-3 py-1 bg-purple-600 rounded"
            onClick={() => {
              const nextLetter = String.fromCharCode(
                65 + Object.keys(formData.equipment_options).length
              ); // A, B, C ...
              setFormData((prev) => ({
                ...prev,
                equipment_options: {
                  ...prev.equipment_options,
                  [nextLetter]: { items: [] },
                },
              }));
            }}
          >
            + Add Option
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 rounded font-bold"
        >
          Save
        </button>
      </form>
    </div>
  );
}
