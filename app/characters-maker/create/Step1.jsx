"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import InputField from "./InputField";
export default function Step1({ data, onChange }) {
  const [artPreview, setArtPreview] = useState(null);
  const [tokenPreview, setTokenPreview] = useState(null);
  const [raceOptions, setRaceOptions] = useState([]);
  const [backgroundOptions, setBackgroundOptions] = useState([]);
  const { user } = useUser();
  const creatorName = user?.fullName || user?.username || "";
  const creatorEmail = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const resRaces = await fetch("/api/races/getAllRace");
        if (!resRaces.ok) throw new Error("Failed to fetch races");
        const races = await resRaces.json();
        setRaceOptions(races.map((r) => ({ label: r, value: r })));

        const resBackgrounds = await fetch("/api/backgrounds/getAllBackground");
        if (!resBackgrounds.ok) throw new Error("Failed to fetch backgrounds");
        const backgrounds = await resBackgrounds.json();
        setBackgroundOptions(backgrounds.map((b) => ({ label: b, value: b })));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const handleFile = (file, type) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "art") {
        setArtPreview(reader.result);
        onChange("art", file.name);
      }
      if (type === "token") {
        setTokenPreview(reader.result);
        onChange("token_art", file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-4 col-span-2">
          <input
            type="hidden"
            name="creator_name"
            value={creatorName}
            onChange={() => onChange("creator_name", creatorName)}
          />
          <input
            type="hidden"
            name="creator_email"
            value={creatorEmail}
            onChange={() => onChange("creator_email", creatorEmail)}
          />
          <InputField
            label="Nickname"
            value={data.name}
            onChange={(val) => onChange("name", val)}
            placeholder="Please Input The Character Nickname"
          />
          <InputField
            label="Full Name"
            value={data.fullname}
            onChange={(val) => onChange("fullname", val)}
            placeholder="Please Input The Character Fullname"
          />
          <div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">Art :</span>
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-gray-300 text-sm truncate max-w-[200px]">
                  {data.artFile ? data.artFile.name : "No file chosen"}
                </span>
                <label className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                  Upload
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) => handleFile(e.target.files[0], "art")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <span className="text-xs text-gray-400 ml-auto block text-right">
              (JPG/WEBP/etc, max 5MB)
            </span>
          </div>
          <div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">Token :</span>
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-gray-300 text-sm truncate max-w-[200px]">
                  {data.tokenFile ? data.tokenFile.name : "No file chosen"}
                </span>

                <label className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                  Upload
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) => handleFile(e.target.files[0], "token")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <span className="text-xs text-gray-400 ml-auto block text-right">
              (JPG/WEBP/etc, max 5MB)
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 w-[230px] h-[230px] overflow-hidden">
            {artPreview ? (
              <Image
                src={artPreview}
                alt="Preview"
                width={250}
                height={250}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <span className="text-gray-500 text-sm">[ Art Preview ]</span>
            )}
          </div>
          <div className="text-center mt-2">Art</div>
        </div>
        <div>
          <div className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 w-[230px] h-[230px] overflow-hidden">
            {tokenPreview ? (
              <Image
                src={tokenPreview}
                alt="Preview"
                width={250}
                height={250}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <span className="text-gray-500 text-sm">[ Token Preview ]</span>
            )}
          </div>
          <div className="text-center mt-2">Token</div>
        </div>
      </div>
      <hr className="border-gray-700" />

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <InputField
            label="Race"
            type="selectSearch" // <-- ganti menjadi selectSearch
            value={data.race}
            onChange={(val) => onChange("race", val)}
            placeholder={raceOptions.length ? "Select Race" : "Loading..."}
            options={raceOptions}
          />

          <InputField
            label="Sub Race"
            value={data.subrace}
            onChange={(val) => onChange("subrace", val)}
            placeholder="Please Input The Subrace"
          />
        </div>

        <div className="space-y-4">
          <InputField
            label="Alignment"
            type="select"
            value={data.alignment}
            onChange={(val) => onChange("alignment", val)}
            placeholder="Please Choose Your Alignment"
            options={[
              { label: "Lawful Good", value: "Lawful Good" },
              { label: "Neutral Good", value: "Neutral Good" },
              { label: "Chaotic Good", value: "Chaotic Good" },
              { label: "Lawful Neutral", value: "Lawful Neutral" },
              { label: "True Neutral", value: "True Neutral" },
              { label: "Chaotic Neutral", value: "Chaotic Neutral" },
              { label: "Lawful Evil", value: "Lawful Evil" },
              { label: "Neutral Evil", value: "Neutral Evil" },
              { label: "Chaotic Evil", value: "Chaotic Evil" },
              { label: "Unknown", value: "Unknown" },
            ]}
          />

          <InputField
            label="Character Type"
            type="buttonGroup"
            value={data.character_type}
            onChange={(val) => onChange("character_type", val)}
            options={["Player", "NPC"]}
          />
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* Status + Bio */}
      <div className="grid grid-cols-5 gap-6">
        {/* Status */}
        <div className="space-y-4 col-span-2">
          <InputField
            label="Status"
            type="buttonGroup"
            value={data.status}
            onChange={(val) => onChange("status", val)}
            options={["Alive", "Unknown", "Dead"]}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Birth Year</label>
            <div className="flex gap-2 items-end">
              <input
                type="number"
                value={data.birthYear || ""}
                onChange={(e) => onChange("birthYear", e.target.value)}
                className="flex-1 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 
          focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <input
                type="text"
                placeholder="Era"
                className="w-24 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 
          focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          {data.status === "Dead" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Death Year
              </label>
              <div className="flex gap-2 items-end">
                <input
                  type="number"
                  value={data.deathYear || ""}
                  onChange={(e) => onChange("deathYear", e.target.value)}
                  className="flex-1 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 
        focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Era"
                  className="w-24 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 
        focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Birth Place
            </label>
            <input
              type="text"
              value={data.birthPlace || ""}
              onChange={(e) => onChange("birthPlace", e.target.value)}
              className="w-full h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 
        focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
        </div>

        {/* Gender + Physical */}
        <div className="space-y-4 col-span-3">
          <div className="grid grid-cols-2 gap-4 items-start">
            <InputField
              label="Gender"
              type="select"
              value={data.gender}
              onChange={(val) => onChange("gender", val)}
              placeholder="Select Gender"
              options={["Male", "Female", "Nonbinary", "Undefined"]}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Height</label>
              <div className="flex gap-2 items-end">
                {data.heightUnit === "imperial" ? (
                  <div className="flex gap-2 flex-1">
                    <input
                      type="number"
                      placeholder="Feet"
                      value={data.heightFeet || ""}
                      onChange={(e) => onChange("heightFeet", e.target.value)}
                      className="w-1/2 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Inches"
                      value={data.heightInches || ""}
                      onChange={(e) => onChange("heightInches", e.target.value)}
                      className="w-1/2 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                ) : (
                  <input
                    type="number"
                    placeholder="Cm"
                    value={data.heightCm || ""}
                    onChange={(e) => onChange("heightCm", e.target.value)}
                    className="flex-1 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                )}
                <select
                  value={data.heightUnit || ""}
                  onChange={(e) => onChange("heightUnit", e.target.value)}
                  className="w-20 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="">M/I</option>
                  <option value="metric">Cm</option>
                  <option value="imperial">Ft/In</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-start">
            <InputField
              label="Pronoun"
              type="select"
              value={data.pronoun}
              onChange={(val) => onChange("pronoun", val)}
              placeholder="Select Pronoun"
              options={[
                "He/Him",
                "She/Her",
                "They/Them",
                "It/Its",
                "No Pronouns",
              ]}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Weight</label>
              <div className="flex gap-2 items-end">
                <input
                  type="text"
                  placeholder={data.weightUnit === "imperial" ? "Lb" : "Kg"}
                  value={
                    data.weightUnit === "imperial"
                      ? data.weight?.pounds || ""
                      : data.weight?.kilogram || ""
                  }
                  onChange={(e) => onChange("weight", e.target.value)}
                  className="flex-1 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />

                <select
                  value={data.weightUnit || ""}
                  onChange={(e) => onChange("weightUnit", e.target.value)}
                  className="w-20 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="">M/I</option>
                  <option value="metric">Kg</option>
                  <option value="imperial">Lb</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Skin Colour"
              type="text"
              value={data.skin_colour}
              onChange={(val) => onChange("skin_colour", val)}
            />
            <InputField
              label="Hair"
              type="text"
              value={data.hair}
              onChange={(val) => onChange("hair", val)}
            />
          </div>

          {data.character_type === "Player" && (
            <InputField
              label="Backgrounds"
              type="selectSearch"
              value={data.backgrounds}
              onChange={(val) => onChange("backgrounds", val)}
              placeholder={
                backgroundOptions.length ? "Select Background" : "Loading..."
              }
              options={backgroundOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
}
