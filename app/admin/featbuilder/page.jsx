"use client";

import { useState } from "react";
import optionsData from "@/data/featsOptions.json"; // masih bisa dipakai untuk tags
import MultipleSelectInput from "./MultipleSelectInput";

export default function FeatForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    feat: "",
    notes: "",
    description: [""],
    tags: [],
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDescriptionChange = (idx, value) => {
    const updated = [...formData.description];
    updated[idx] = value;
    setFormData((prev) => ({
      ...prev,
      description: updated,
    }));
  };

  const addDescriptionLine = () => {
    setFormData((prev) => ({
      ...prev,
      description: [...prev.description, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/feats/createFeatData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("Submitted Feat:", result);

      if (!res.ok) {
        alert("Gagal menyimpan feat: " + result.message);
        return;
      }

      if (onSubmit) {
        onSubmit(result.data);
      }

      alert("Feat berhasil disimpan!");
    } catch (error) {
      console.error("Error submitting feat:", error);
      alert("Terjadi error saat menyimpan feat.");
    }
  };

  return (
    <div className="max-w-3xl w-full mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-6"
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

        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Feat (contoh: Origin Feat)"
          value={formData.feat}
          onChange={(e) => handleChange("feat", e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />

        <div>
          <label className="block mb-2 font-bold">Description:</label>
          {formData.description.map((line, idx) => (
            <input
              key={idx}
              className="w-full p-2 rounded bg-gray-700 mt-1"
              placeholder={`Line ${idx + 1}`}
              value={line}
              onChange={(e) => handleDescriptionChange(idx, e.target.value)}
            />
          ))}
          <button
            type="button"
            className="px-2 py-1 bg-blue-600 rounded mt-2"
            onClick={addDescriptionLine}
          >
            + Add Line
          </button>
        </div>

        <MultipleSelectInput
          label="Tags"
          field="tags"
          options={optionsData.tagsOptions}
          values={formData.tags}
          onAdd={(field, value) =>
            handleChange("tags", [...formData.tags, value])
          }
          onRemove={(field, value) =>
            handleChange(
              "tags",
              formData.tags.filter((v) => v !== value)
            )
          }
        />

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
