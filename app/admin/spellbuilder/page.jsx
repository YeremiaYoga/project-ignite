"use client";

import { useState, useEffect } from "react";
import MultiSelectTags from "./MultipSelectTags";
import MultipleInput from "./MultipleInput";

import spellsOptions from "@/data/spellsOptions.json";

export default function SpellBuilderPage() {
  const initialForm = {
    name: "",
    level: "0",
    short_source: "",
    source: "",
    school: "",
    casting_time: "",
    range: "feet",
    range_exp: "",
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
    species: [],
    feats: [],
    other_options_features: [],
    description: "",
    higher_level: "",
    backgrounds: [],
    image: null,
  };

  const [form, setForm] = useState(initialForm);
  const [mode, setMode] = useState("new");
  const [levels, setLevels] = useState([]);
  const [spells, setSpells] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSpell, setSelectedSpell] = useState("");
  const [reviewMode, setReviewMode] = useState(false);
  const [originalName, setOriginalName] = useState("");

  const {
    classOptions,
    savingThrowOptions,
    componentOptions,
    damageTypeOptions,
    schoolOptions,
    castingTimeOptions,
    rangeOptions,
  } = spellsOptions;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) setForm((prev) => ({ ...prev, [name]: file }));
      return;
    }

    if (name === "level" && type === "number") {
      let num = parseInt(value);
      if (isNaN(num) || num < 0) num = 0;
      if (num > 9) num = 9;
      setForm((prev) => ({ ...prev, level: String(num) }));
      return;
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
        [name]: [...new Set([...prev[name], item])],
      }));
    }
  };

  const handleRemoveItem = (name, item) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name].filter((i) => i !== item),
    }));
  };

  const ensureArray = (val) =>
    Array.isArray(val)
      ? [...new Set(val)]
      : typeof val === "string"
      ? [val]
      : [];

  useEffect(() => {
    if (form.range_exp === "Self" || form.range_exp === "Touch") {
      setForm((prev) => ({ ...prev, distance: "" }));
    }
  }, [form.range_exp]);

  useEffect(() => {
    if (mode === "edit") {
      fetch("/api/spells/levels")
        .then((r) => r.json())
        .then((d) => setLevels(d))
        .catch(console.error);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "edit" && selectedLevel) {
      fetch(`/api/spells/levels/${selectedLevel}`)
        .then((r) => r.json())
        .then((d) => setSpells(d))
        .catch(console.error);
    } else {
      setSpells([]);
      setSelectedSpell("");
    }
  }, [mode, selectedLevel]);

  useEffect(() => {
    if (mode === "edit" && selectedLevel && selectedSpell) {
      fetch(`/api/spells/levels/${selectedLevel}/${selectedSpell}`)
        .then((r) => r.json())
        .then((data) => {
          setForm({ ...initialForm, ...data });
          setOriginalName(data.name); // simpan nama lama
        })
        .catch(console.error);
    }
  }, [mode, selectedLevel, selectedSpell]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setReviewMode(true);
  };

  const handleSave = async () => {
    const normalized = { ...form, level: parseInt(form.level || "0") };

    const method = mode === "edit" ? "PUT" : "POST";
    const url =
      mode === "edit"
        ? `/api/spellbuilder?originalName=${encodeURIComponent(originalName)}`
        : "/api/spellbuilder";

    let res;
    if (normalized.image instanceof File) {
      const fd = new FormData();
      Object.entries(normalized).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        if (v instanceof File) fd.append(k, v);
        else if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
        else fd.append(k, String(v));
      });
      res = await fetch(url, { method, body: fd });
    } else {
      res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
      });
    }

    if (res.ok) {
      alert("Spell saved!");
      setForm(initialForm);
      setReviewMode(false);
      setMode("new");
    } else {
      alert("Gagal menyimpan spell.");
    }
  };

  return (
    <main className="max-w-5xl w-full mx-auto px-4 py-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Spell Builder</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          type="button"
          onClick={() => setMode("new")}
          className={`px-4 py-2 rounded ${
            mode === "new" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          New
        </button>
        <button
          type="button"
          onClick={() => setMode("edit")}
          className={`px-4 py-2 rounded ${
            mode === "edit" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Edit
        </button>
      </div>

      {mode === "edit" && (
        <div className="mb-6">
          <div className="mb-3">
            <label className="block mb-1">Select Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="p-2 bg-gray-800 rounded w-full"
            >
              <option value="">-- Select Level --</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
          {selectedLevel && (
            <div>
              <label className="block mb-1">Select Spell</label>
              <select
                value={selectedSpell}
                onChange={(e) => setSelectedSpell(e.target.value)}
                className="p-2 bg-gray-800 rounded w-full"
              >
                <option value="">-- Select Spell --</option>
                {spells.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
          />
          {mode === "edit" && form.image && typeof form.image === "string" && (
            <p className="text-sm mt-1 text-gray-400">Current: {form.image}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "name", label: "Name" },
            { name: "level", label: "Level (level 0 = Cantrips)", type: "number", min: 0, max: 9 },
            { name: "short_source", label: "Short Source" },
            { name: "source", label: "Source" },
          ].map(({ name, label, type = "text", min, max }) => (
            <div key={name}>
              <label className="block mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                min={min}
                max={max}
                className="w-full p-2 bg-gray-800 rounded border border-gray-700"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block mb-1">School</label>
          <select
            name="school"
            value={form.school}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          >
            <option value="">Select School</option>
            {schoolOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Casting Time</label>
          <select
            name="casting_time"
            value={form.casting_time}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          >
            <option value="">Select Casting Time</option>
            {castingTimeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Distance</label>
            <input
              type="number"
              name="distance"
              value={form.distance || ""}
              onChange={handleChange}
              disabled={form.range_exp === "Self" || form.range_exp === "Touch"}
              className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1">Range</label>
            <input
              type="text"
              name="range"
              value={form.range}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1">Range Exp</label>
            <select
              name="range_exp"
              value={form.range_exp}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            >
              <option value="">Select Range</option>
              {rangeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1">Area</label>
          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          />
        </div>

        <MultiSelectTags
          label="Components"
          options={componentOptions}
          selected={form.components}
          onSelect={(v) => handleAddItem("components", v)}
          onDeselect={(v) => handleRemoveItem("components", v)}
        />

        {[
          { name: "material", label: "Material" },
          { name: "duration", label: "Duration" },
          { name: "damage_level", label: "Damage Increase per Level" },
          { name: "damage_dice", label: "Damage Dice" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            />
          </div>
        ))}

        <MultiSelectTags
          label="Saving Throw"
          options={savingThrowOptions}
          selected={form.saving_throw}
          onSelect={(v) => handleAddItem("saving_throw", v)}
          onDeselect={(v) => handleRemoveItem("saving_throw", v)}
        />

        <MultiSelectTags
          label="Damage Type"
          options={damageTypeOptions}
          selected={form.damage_type}
          onSelect={(v) => handleAddItem("damage_type", v)}
          onDeselect={(v) => handleRemoveItem("damage_type", v)}
        />

        <MultiSelectTags
          label="Classes"
          options={classOptions}
          selected={form.classes}
          onSelect={(v) => handleAddItem("classes", v)}
          onDeselect={(v) => handleRemoveItem("classes", v)}
        />
        <MultiSelectTags
          label="Optional/Variant Classes"
          options={classOptions}
          selected={form.optional_classes}
          onSelect={(v) => handleAddItem("optional_classes", v)}
          onDeselect={(v) => handleRemoveItem("optional_classes", v)}
        />

        <MultipleInput
          labels="Subclasses"
          label="Subclass"
          items={form.subclasses}
          onChange={(u) =>
            setForm((p) => ({ ...p, subclasses: [...new Set(u)] }))
          }
          simple
        />
        <MultipleInput
          labels="Species"
          label="Species"
          items={form.species}
          onChange={(u) => setForm((p) => ({ ...p, species: [...new Set(u)] }))}
          simple
        />
        <MultipleInput
          labels="Feats"
          label="Feat"
          items={form.feats}
          onChange={(u) => setForm((p) => ({ ...p, feats: [...new Set(u)] }))}
          simple
        />
        <MultipleInput
          labels="Other Options / Features"
          label="Option/Feature"
          items={form.other_options_features}
          onChange={(u) =>
            setForm((p) => ({ ...p, other_options_features: [...new Set(u)] }))
          }
          simple
        />
        <MultipleInput
          labels="Backgrounds"
          label="Background"
          items={form.backgrounds}
          onChange={(u) =>
            setForm((p) => ({ ...p, backgrounds: [...new Set(u)] }))
          }
          simple
        />

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          />
        </div>

        <div>
          <label className="block mb-1">Higher Level</label>
          <textarea
            name="higher_level"
            value={form.higher_level}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          />
        </div>

        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="concentration"
              checked={form.concentration}
              onChange={handleChange}
            />
            <span>Concentration</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="ritual"
              checked={form.ritual}
              onChange={handleChange}
            />
            <span>Ritual</span>
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-medium"
        >
          Save Spell
        </button>
      </form>
      {reviewMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-4xl w-full text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Review Spell
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2 text-sm">
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {form.name}
                </p>
                <p>
                  <strong>Level:</strong> {form.level}
                </p>
                <p>
                  <strong>School:</strong> {form.school}
                </p>
                <p>
                  <strong>Casting Time:</strong> {form.casting_time}
                </p>
                <p>
                  <strong>Range:</strong> {form.range} {form.range_exp}{" "}
                  {form.distance ? `(${form.distance} ft)` : ""}
                </p>
                <p>
                  <strong>Area:</strong> {form.area}
                </p>
                <p>
                  <strong>Duration:</strong> {form.duration}
                </p>
                <p>
                  <strong>Concentration:</strong>{" "}
                  {form.concentration ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Ritual:</strong> {form.ritual ? "Yes" : "No"}
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <strong>Short Source:</strong> {form.short_source}
                </p>
                <p>
                  <strong>Source:</strong> {form.source}
                </p>
                <p>
                  <strong>Damage Type:</strong> {form.damage_type.join(", ")}
                </p>
                <p>
                  <strong>Damage Dice:</strong> {form.damage_dice}
                </p>
                <p>
                  <strong>Damage Level:</strong> {form.damage_level}
                </p>
                <p>
                  <strong>Saving Throw:</strong> {form.saving_throw.join(", ")}
                </p>
                <p>
                  <strong>Material:</strong> {form.material}
                </p>
                <p>
                  <strong>Components:</strong> {form.components.join(", ")}
                </p>
              </div>

              <div className="col-span-2 space-y-2">
                <p>
                  <strong>Classes:</strong> {form.classes.join(", ")}
                </p>
                <p>
                  <strong>Optional Classes:</strong>{" "}
                  {form.optional_classes.join(", ")}
                </p>
                <p>
                  <strong>Subclasses:</strong> {form.subclasses.join(", ")}
                </p>
                <p>
                  <strong>Species:</strong> {form.species.join(", ")}
                </p>
                <p>
                  <strong>Feats:</strong> {form.feats.join(", ")}
                </p>
                <p>
                  <strong>Other Options / Features:</strong>{" "}
                  {form.other_options_features.join(", ")}
                </p>
                <p>
                  <strong>Backgrounds:</strong> {form.backgrounds.join(", ")}
                </p>
              </div>

              <div className="col-span-2">
                <p className="font-semibold">Description:</p>
                <p className="text-gray-300 whitespace-pre-line">
                  {form.description}
                </p>
              </div>

              {form.higher_level && (
                <div className="col-span-2">
                  <p className="font-semibold">Higher Level:</p>
                  <p className="text-gray-300 whitespace-pre-line">
                    {form.higher_level}
                  </p>
                </div>
              )}

              {form.image && (
                <div className="col-span-2 flex flex-col items-center mt-4">
                  <p className="font-semibold mb-2">Image Preview:</p>
                  <img
                    src={
                      form.image instanceof File
                        ? URL.createObjectURL(form.image)
                        : form.image
                    }
                    alt="Spell"
                    className="max-h-60 rounded-lg border border-gray-700 shadow-md"
                  />
                  {form.image instanceof File && (
                    <p className="text-xs text-gray-400 mt-1">
                      {form.image.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium shadow"
              >
                ✅ Confirm Save
              </button>
              <button
                onClick={() => setReviewMode(false)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium shadow"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
