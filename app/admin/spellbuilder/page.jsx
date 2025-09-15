"use client";

import { useState } from "react";
import MultiSelectTags from "./MultipSelectTags";

export default function SpellBuilderPage() {
  const initialForm = {
    name: "",
    level: "0",
    short_source: "",
    source: "",
    school: "",
    casting_time: "",
    range: "feet",
    area: "",
    components: [],
    duration: "",
    concentration: false,
    ritual: false,
    damage_type: [],
    damage_dice: "",
    damage_level: "",
    saving_throw: [],
    material: "",
    classes: [],
    optional_classes: [],
    subclasses: [],
    species: "",
    feats: "",
    other_options_features: "",
    description: "",
    higher_level: "",
  };

  const [form, setForm] = useState(initialForm);

  const classOptions = [
    "artificer",
    "barbarian",
    "bard",
    "blood-hunter",
    "cleric",
    "druid",
    "fighter",
    "monk",
    "paladin",
    "ranger",
    "rogue",
    "sorcerer",
    "warlock",
    "wizard",
  ].map((cls) => ({
    label: cls.charAt(0).toUpperCase() + cls.slice(1).replace("-", " "),
    value: cls,
  }));

  const savingThrowOptions = [
    { label: "Strength", value: "str" },
    { label: "Dexterity", value: "dex" },
    { label: "Constitution", value: "con" },
    { label: "Intelligence", value: "int" },
    { label: "Wisdom", value: "wis" },
    { label: "Charisma", value: "cha" },
  ];

  const componentOptions = [
    { label: "Verbal", value: "V" },
    { label: "Somatic", value: "S" },
    { label: "Material", value: "M" },
  ];

  const damageTypeOptions = [
    "acid",
    "bludgeoning",
    "cold",
    "fire",
    "force",
    "lightning",
    "necrotic",
    "piercing",
    "poison",
    "psychic",
    "radiant",
    "slashing",
    "thunder",
  ].map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1),
    value: type,
  }));

  const schoolOptions = [
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation",
  ];

  const castingTimeOptions = [
    "Action",
    "Bonus Action",
    "Reaction",
    "Round",
    "Minute",
    "Hour",
    "Special",
  ];
  const rangeOptions = ["Self", "Touch", "Point", "Area", "Special"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "level" && type === "number") {
      const numValue = parseInt(value);
      if (isNaN(numValue) || numValue < 0) {
        setForm((prev) => ({ ...prev, [name]: "0" }));
        return;
      } else if (numValue > 9) {
        setForm((prev) => ({ ...prev, [name]: "9" }));
        return;
      }
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddItem = (name, item) => {
    if (!form[name].includes(item)) {
      setForm((prev) => ({
        ...prev,
        [name]: [...prev[name], item],
      }));
    }
  };

  const handleRemoveItem = (name, item) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name].filter((i) => i !== item),
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
      distance: parseInt(form.distance),
      short_source: form.short_source,
      source: form.source,
      area: form.area,

      components: form.components,
      damage_type: form.damage_type,
      saving_throw: form.saving_throw,
      classes: form.classes,

      optional_classes: toArray(form.optional_classes),
      subclasses: toArray(form.subclasses),
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
      alert("Spell created!");
      setForm(initialForm);
    } else {
      alert("Gagal membuat file.");
    }
  };

  return (
    <main className="max-w-5xl w-full mx-auto px-4 py-10 text-white bg-gray-900 min-h-screen m-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Spell Builder</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1  gap-4">
          {[
            { name: "image", label: "Image Url" },
            { name: "name", label: "Name" },
            {
              name: "level",
              label: "Level",
              type: "number",
              min: "0",
              max: "9",
            },
            { name: "short_source", label: "Short Source" },
            { name: "source", label: "Source" },
            { name: "casting_time", label: "Casting Time" },
            { name: "distance", label: "Distance", type: "number" },
            { name: "range", label: "Range" },
            { name: "area", label: "Area" },
            { name: "material", label: "Material Component" },
            { name: "duration", label: "Duration" },
            { name: "damage_dice", label: "Damage Dice" },
            { name: "damage_level", label: "Damage Increase per Level" },
            { name: "subclasses", label: "Subclasses (comma-separated)" },
            { name: "species", label: "Species (comma-separated)" },
            { name: "feats", label: "Feats (comma-separated)" },
            {
              name: "other_options_features",
              label: "Other Options / Features (comma-separated)",
            },
          ].map(({ name, label, type = "text", min, max }) => (
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
                min={min}
                max={max}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="my-4">
          <div>
            <label htmlFor="school" className="block text-sm font-medium mb-1">
              School
            </label>
            <select
              name="school"
              id="school"
              value={form.school}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select School
              </option>
              {schoolOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="my-4">
            <label
              htmlFor="casting_time"
              className="block text-sm font-medium mb-1"
            >
              Casting Time
            </label>
            <select
              name="casting_time"
              id="casting_time"
              value={form.casting_time}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Casting Time
              </option>
              {castingTimeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="my-4">
            <label htmlFor="range" className="block text-sm font-medium mb-1">
              Range Exp
            </label>
            <select
              name="range_exp"
              id="range_exp"
              value={form.range_exp}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Range</option>
              {rangeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <MultiSelectTags
            label="Classes"
            options={classOptions}
            selected={form.classes}
            onSelect={(value) => handleAddItem("classes", value)}
            onDeselect={(value) => handleRemoveItem("classes", value)}
          />
          <MultiSelectTags
            label="Optional/Variant Classes: "
            options={classOptions}
            selected={form.optional_classes}
            onSelect={(value) => handleAddItem("optional_classes", value)}
            onDeselect={(value) => handleRemoveItem("optional_classes", value)}
          />
          <MultiSelectTags
            label="Saving Throw"
            options={savingThrowOptions}
            selected={form.saving_throw}
            onSelect={(value) => handleAddItem("saving_throw", value)}
            onDeselect={(value) => handleRemoveItem("saving_throw", value)}
          />
          <MultiSelectTags
            label="Components"
            options={componentOptions}
            selected={form.components}
            onSelect={(value) => handleAddItem("components", value)}
            onDeselect={(value) => handleRemoveItem("components", value)}
          />
          <MultiSelectTags
            label="Damage Type"
            options={damageTypeOptions}
            selected={form.damage_type}
            onSelect={(value) => handleAddItem("damage_type", value)}
            onDeselect={(value) => handleRemoveItem("damage_type", value)}
          />
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
