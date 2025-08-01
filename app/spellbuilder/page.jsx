"use client";

import { useState } from "react";

export default function SpellBuilderPage() {
  const initialForm = {
    name: "",
    level: "0",
    short_source: "",
    source: "",
    school: "",
    casting_time: "",
    range: "",
    measurement: "feet",
    area: "",
    components: "",
    duration: "",
    concentration: false,
    ritual: false,
    damage_type: "",
    damage_dice: "",
    damage_level: "",
    saving_throw: "",
    material: "",
    classes: "",
    additional_classes: "",
    species: "",
    feats: "",
    other_options_features: "",
    description: "",
    higher_level: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toArray = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      ...form,
      level: parseInt(form.level),
      range:
        !isNaN(form.range) && form.range.trim() !== ""
          ? parseInt(form.range)
          : form.range.trim().toLowerCase(),

      classes: toArray(form.classes),
      additional_classes: toArray(form.additional_classes),
      species: toArray(form.species),
      feats: toArray(form.feats),
      other_options_features: toArray(form.other_options_features),
    };

    const res = await fetch("/api/spellbuilder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Spell berhasil dibuat!");
      setForm(initialForm);
    } else {
      alert("Gagal membuat file.");
    }
  };

  const input = ({ type = "text", ...props }) => (
    <input
      type={type}
      {...props}
      className="w-full p-2 bg-gray-800 text-white rounded"
    />
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Spell Builder</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "name", label: "Name" },
            { name: "level", label: "Level", type: "number" },
            { name: "short_source", label: "Short Source" },
            { name: "source", label: "Source" },
            { name: "school", label: "School" },
            { name: "casting_time", label: "Casting Time" },
            { name: "range", label: "Range" },
            { name: "measurement", label: "Measurement" },
            { name: "area", label: "Area" },
            { name: "components", label: "Components" },
            { name: "material", label: "Material Component" },
            { name: "duration", label: "Duration" },
            { name: "damage_type", label: "Damage Type" },
            { name: "damage_dice", label: "Damage Dice" },
            { name: "damage_level", label: "Damage Increase per Level" },
            { name: "saving_throw", label: "Saving Throw" },
            { name: "classes", label: "Classes (comma-separated)" },
            {
              name: "additional_classes",
              label: "Additional Classes (comma-separated)",
            },
            { name: "species", label: "Species (comma-separated)" },
            { name: "feats", label: "Feats (comma-separated)" },
            {
              name: "other_options_features",
              label: "Other Options / Features (comma-separated)",
            },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div>
          <label
            htmlFor="higher_level"
            className="block text-sm font-medium mb-1"
          >
            Higher Level Description
          </label>
          <textarea
            name="higher_level"
            id="higher_level"
            value={form.higher_level}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="concentration"
              checked={form.concentration}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <span>Concentration</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="ritual"
              checked={form.ritual}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <span>Ritual</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
        >
          Simpan Spell
        </button>
      </form>
    </main>
  );
}
