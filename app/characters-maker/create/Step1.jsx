"use client";

import Image from "next/image";
import { useState } from "react";

export default function Step1({ data, onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFile = (file) => {
    onChange("artFile", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const statusOptions = ["Alive", "Unknown", "Dead"];
  const typeOptions = ["Player", "NPC"];

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-6">
      {/* Top Section: Name + Image */}
      <div className="grid grid-cols-[1fr_250px] gap-6">
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Nickname</label>
            <input
              type="text"
              placeholder="Please Input The Character Nickname/Name"
              value={data.name || ""}
              onChange={(e) => onChange("nickname", e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Please Input The Character's Full Name"
              value={data.fullName || ""}
              onChange={(e) => onChange("fullName", e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Art Upload */}
          <div className="flex items-center gap-4 text-sm">
            <span className="font-medium">Art :</span>

            <div className="flex items-center gap-3 ml-auto">
              {/* Nama file */}
              <span className="text-gray-300 text-sm truncate max-w-[200px]">
                {data.artFile ? data.artFile.name : "No file chosen"}
              </span>

              {/* Tombol Upload */}
              <label className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                Upload
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => handleFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <span className="text-xs text-gray-400 ml-auto block text-right">
            (JPG/WEBP/etc, max 5MB)
          </span>
        </div>

        {/* Image Preview */}
        <div className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 w-[250px] h-[250px] overflow-hidden">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={250}
              height={250}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <span className="text-gray-500 text-sm">[ Image Preview ]</span>
          )}
        </div>
      </div>

      {/* Upload */}

      <hr className="border-gray-700" />

      {/* Race + Alignment */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Race</label>
            <select
              value={data.race || ""}
              onChange={(e) => onChange("race", e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Race</option>
              <option value="Human">Human</option>
              <option value="Elf">Elf</option>
              <option value="Dwarf">Dwarf</option>
              <option value="Orc">Orc</option>
              <option value="Tiefling">Tiefling</option>
              <option value="Dragonborn">Dragonborn</option>
              <option value="Halfling">Halfling</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sub-race</label>
            <input
              type="text"
              value={data.subRace || ""}
              onChange={(e) => onChange("subRace", e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Alignment</label>
            <select
              value={data.alignment || ""}
              onChange={(e) => onChange("alignment", e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Please Choose Your Alignment</option>
              <option>Lawful Good</option>
              <option>Neutral Good</option>
              <option>Chaotic Good</option>
              <option>Lawful Neutral</option>
              <option>True Neutral</option>
              <option>Chaotic Neutral</option>
              <option>Lawful Evil</option>
              <option>Neutral Evil</option>
              <option>Chaotic Evil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Character Type
            </label>
            <div className="flex gap-2">
              {typeOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onChange("characterType", t)}
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    data.characterType === t
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* Status + Bio */}
      <div className="grid grid-cols-5 gap-6">
        {/* Status */}
        <div className="space-y-4 col-span-2">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <div className="flex gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange("status", s)}
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    data.status === s
                      ? "bg-green-600 border-green-500 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Birth Year</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={data.birthYear || ""}
                onChange={(e) => onChange("birthYear", e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Era"
                className="w-24 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Death Year</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={data.deathYear || ""}
                onChange={(e) => onChange("deathYear", e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Era"
                className="w-24 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Birth Place
            </label>
            <input
              type="text"
              value={data.birthPlace || ""}
              onChange={(e) => onChange("birthPlace", e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Gender + Physical */}
        <div className="space-y-4 col-span-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                value={data.gender || ""}
                onChange={(e) => onChange("gender", e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Nonbinary">Nonbinary</option>
                <option value="Undefined">Undefined</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Height</label>
              <div className="flex gap-2">
                {data.heightUnit === "imperial" ? (
                  <div className="flex gap-2 flex-1">
                    <input
                      type="number"
                      placeholder="Feet"
                      value={data.heightFeet || ""}
                      onChange={(e) => onChange("heightFeet", e.target.value)}
                      className="w-1/2 p-3 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Inches"
                      value={data.heightInches || ""}
                      onChange={(e) => onChange("heightInches", e.target.value)}
                      className="w-1/2 p-3 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                ) : (
                  <input
                    type="number"
                    placeholder="Cm"
                    value={data.heightCm || ""}
                    onChange={(e) => onChange("heightCm", e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 
               focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                )}

                <select
                  value={data.heightUnit || ""}
                  onChange={(e) => onChange("heightUnit", e.target.value)}
                  className="w-12 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="">M/I</option>
                  <option value="metric">Metric (cm)</option>
                  <option value="imperial">Imperial (ft/in)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pronoun</label>
              <select
                value={data.pronoun || ""}
                onChange={(e) => onChange("pronoun", e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 
               focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Pronoun</option>
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
                <option value="It/Its">It/Its</option>
                <option value="No Pronouns">No Pronouns</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Weight</label>
              <div className="flex gap-2">
                {/* Input berat */}
                <input
                  type="text"
                  placeholder={data.weightUnit === "imperial" ? "Lb" : "Kg"}
                  value={data.weight || ""}
                  onChange={(e) => onChange("weight", e.target.value)}
                  className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 
                 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* Select satuan */}
                <select
                  value={data.weightUnit || ""}
              
                  onChange={(e) => onChange("weightUnit", e.target.value)}
                  className="w-12 rounded-lg bg-gray-800 border border-gray-700 
             focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="">M/I</option>
                  <option value="metric">Metric (Kg)</option>
                  <option value="imperial">Imperial (Lb)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Skin Colour
              </label>
              <input
                type="text"
                value={data.skinColor || ""}
                onChange={(e) => onChange("skinColor", e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hair</label>
              <input
                type="text"
                value={data.hair || ""}
                onChange={(e) => onChange("hair", e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
