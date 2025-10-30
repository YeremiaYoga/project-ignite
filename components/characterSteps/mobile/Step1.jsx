"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import InputField from "@/components/InputField";
import Cookies from "js-cookie";
import { Link, FileKey, Clipboard, Eye, EyeOff } from "lucide-react";
import { countryOptions, alignmentOptions } from "@/data/characterOptions";
import LabelWithHint from "@/components/LabelWithHint";

export default function Step1({ data = {}, onChange }) {
  const [artPreview, setArtPreview] = useState(null);
  const [tokenPreview, setTokenPreview] = useState(null);
  const [raceOptions, setRaceOptions] = useState([]);
  const [backgroundOptions, setBackgroundOptions] = useState([]);
  const [subraceOptions, setSubraceOptions] = useState([]);
  const [noSubrace, setNoSubrace] = useState(false);
  const [talesMode, setTalesMode] = useState(false);
  const [privateId, setPrivateId] = useState("");
  const [publicId, setPublicId] = useState("");
  const [showPrivate, setShowPrivate] = useState(false);

  useEffect(() => {
    const mode = Cookies.get("ignite-tales-mode");
    setTalesMode(mode === "true");
  }, []);

  useEffect(() => {
    if (!artPreview && data.art_image) {
      setArtPreview(data.art_image);
    }
    if (!tokenPreview && data.token_image) {
      setTokenPreview(data.token_image);
    }

    if (data.art_image && !data.art) onChange("art", data.art_image);
    if (data.token_image && !data.token_art)
      onChange("token_art", data.token_image);

    if (data.main_theme_ogg && typeof data.main_theme_ogg === "string") {
      const mainUrl = data.main_theme_ogg.startsWith("http")
        ? data.main_theme_ogg
        : `${process.env.NEXT_PUBLIC_API_URL}${data.main_theme_ogg}`;
      onChange("main_theme_ogg", mainUrl);
    }

    if (data.combat_theme_ogg && typeof data.combat_theme_ogg === "string") {
      const combatUrl = data.combat_theme_ogg.startsWith("http")
        ? data.combat_theme_ogg
        : `${process.env.NEXT_PUBLIC_API_URL}${data.combat_theme_ogg}`;
      onChange("combat_theme_ogg", combatUrl);
    }
  }, [
    data.art_image,
    data.token_image,
    data.main_theme_ogg,
    data.combat_theme_ogg,
  ]);

  useEffect(() => {
    if (data.private_id || data.public_id) return;

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const randomString = (len) => {
      let s = "";
      for (let i = 0; i < len; i++) {
        s += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return s;
    };

    const privateId = randomString(22);
    const publicId = randomString(18);

    setPrivateId(privateId);
    setPublicId(publicId);

    onChange("private_id", privateId);
    onChange("public_id", publicId);
  }, [data.private_id, data.public_id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resRaces = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/races`
        );
        if (!resRaces.ok) throw new Error("Failed to fetch races");
        const races = await resRaces.json();

        setRaceOptions(
          races.map((r) => ({
            label: r.name,
            value: r.id,
            id: r.id,
            description: r.description,
          }))
        );

        const resBackgrounds = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/backgrounds`
        );
        if (!resBackgrounds.ok)
          throw new Error(
            `Failed to fetch backgrounds: ${resBackgrounds.status}`
          );

        const backgrounds = await resBackgrounds.json();

        setBackgroundOptions(
          backgrounds.map((b) => ({
            label: b.name,
            value: b.id,
            id: b.id,
            description: b.description || "",
          }))
        );
      } catch (err) {
        console.error("Fetch data error:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!data.race_id) {
      setSubraceOptions([]);
      setNoSubrace(false);
      return;
    }

    const fetchSubraces = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/subraces/race/${data.race_id}`
        );
        if (!res.ok) throw new Error("Failed to fetch subraces");

        const subs = await res.json();
        if (subs.length === 0) {
          setNoSubrace(true);
          setSubraceOptions([]);
        } else {
          setNoSubrace(false);
          setSubraceOptions(
            subs.map((s) => ({
              label: s.name,
              value: s.id,
              id: s.id,
              description: s.description || "",
            }))
          );
        }
      } catch (err) {
        console.error("Fetch subraces error:", err);
        setNoSubrace(true);
        setSubraceOptions([]);
      }
    };

    fetchSubraces();
  }, [data.race_id]);

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    alert("ID copied to clipboard!");
  };

  const handleFile = (file, type) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "art") {
        setArtPreview(reader.result);
        onChange("art", file);
      }
      if (type === "token") {
        setTokenPreview(reader.result);
        onChange("token_art", file);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 sm:p-6  mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg space-y-6">
      {/* ================= HEADER & ID SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* LEFT SIDE */}
        <div className="space-y-4 lg:col-span-2">
          <InputField
            label="Nickname"
            value={data.name}
            onChange={(val) => onChange("name", val)}
            placeholder="Please input your character’s nickname"
            hint={{
              icon: "id-card",
              text: "The name your character is commonly known by.",
            }}
          />

          {/* FULL NAME */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <LabelWithHint
                label="Fullname"
                icon="id-card-lanyard"
                text="Your character’s complete name."
              />
              <InputField
                type="toggleIcon"
                value={data.full_name_visibility}
                onChange={(v) => onChange("full_name_visibility", v)}
              />
            </div>
            <InputField
              label=""
              value={data.full_name}
              onChange={(val) => onChange("full_name", val)}
              placeholder="Please input your character’s full name"
            />
          </div>
          <div className="order-2 lg:order-3 flex flex-col items-center gap-3">
            <div className="rounded-lg border border-gray-700 bg-gray-800 w-[160px] h-[160px] flex items-center justify-center overflow-hidden">
              {artPreview ? (
                <img
                  src={artPreview}
                  alt="Art Preview"
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="text-gray-500 text-sm">[ Art Preview ]</span>
              )}
            </div>
          </div>

          {/* ART UPLOAD */}
          <div>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <span className="font-medium">Art :</span>
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-gray-300 text-sm truncate max-w-[150px] sm:max-w-[200px]">
                  {data.art ? data.art.name : "No file chosen"}
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
          {/* TOKEN PREVIEW */}
          <div className="order-2 lg:order-3 flex flex-col items-center gap-3">
            <div className="rounded-lg border border-gray-700 bg-gray-800 w-[160px] h-[160px] flex items-center justify-center overflow-hidden">
              {tokenPreview ? (
                <img
                  src={tokenPreview}
                  alt="Token Preview"
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="text-gray-500 text-sm">[ Token Preview ]</span>
              )}
            </div>
          </div>

          {/* TOKEN UPLOAD */}
          <div>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <span className="font-medium">Token :</span>
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-gray-300 text-sm truncate max-w-[150px] sm:max-w-[200px]">
                  {data.token_art ? data.token_art.name : "No file chosen"}
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

        {/* CENTER PREVIEW + ID */}
        <div className="order-3 lg:order-2 flex flex-col items-center gap-3">
          <div className="bg-gray-800 rounded-lg p-3 text-sm space-y-2 w-full sm:w-[200px]">
            {/* PUBLIC ID */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                <span className="text-xs break-all">{data.public_id}</span>
              </div>
              <button
                onClick={() => copyToClipboard(data.public_id)}
                className="text-gray-400 hover:text-gray-200"
              >
                <Clipboard className="w-4 h-4" />
              </button>
            </div>

            {/* PRIVATE ID */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileKey className="w-4 h-4" />
                <span className="font-mono text-xs">
                  {showPrivate
                    ? data.private_id
                    : "•".repeat(Math.min(data.private_id?.length || 8, 12))}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPrivate(!showPrivate)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  {showPrivate ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  onClick={() => copyToClipboard(data.private_id)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <Clipboard className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mb-2 text-sm font-medium text-gray-200 w-full">
          <InputField
            type="toggleIcon"
            value={data.wiki_visibility}
            toggleLabel="Wiki Visibility"
            onChange={(v) => {
              if (!data.wiki_visibility && v === true) {
                const confirmOpen = window.confirm(
                  "Are you certain you wish to make this your character public?"
                );
                if (!confirmOpen) return;
              }
              onChange("wiki_visibility", v);
            }}
          />
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* ============ RACE / ALIGNMENT SECTION ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InputField
            label="Race"
            type="selectSearch"
            value={data.race_name}
            onChange={(val) => {
              const selected = raceOptions.find(
                (r) => r.id === val || r.value === val
              );
              onChange("race_id", selected?.id || "");
              onChange("race_name", selected?.label || "");
              onChange("subrace_id", "");
              onChange("subrace_name", "");
            }}
            placeholder={raceOptions.length ? "Select Race" : "Loading..."}
            options={raceOptions}
            hint={{
              icon: "baby",
              text: "The species or ancestry your character belongs to.",
            }}
          />

          <InputField
            label="Subrace"
            type="selectSearch"
            value={data.subrace_name}
            onChange={(val) => {
              const selected = subraceOptions.find(
                (s) => s.id === val || s.value === val
              );
              onChange("subrace_id", selected?.id || "");
              onChange("subrace_name", selected?.label || "");
            }}
            placeholder={
              !data.race_id
                ? "Select race first"
                : noSubrace
                ? "No subrace available"
                : subraceOptions.length
                ? "Select Subrace"
                : "Loading..."
            }
            options={subraceOptions}
            disabled={!data.race_id || noSubrace}
            hint={{
              icon: "users-round",
              text: "A branch or lineage within your main race.",
            }}
          />
          {data.race_id && noSubrace && (
            <p className="text-xs text-gray-400 italic mt-1">
              ⚠️ This race does not have any subrace.
            </p>
          )}
        </div>

        <div className="space-y-4">
          <InputField
            label="Alignment"
            type="select"
            value={data.alignment}
            onChange={(val) => onChange("alignment", val)}
            placeholder="Please Choose Your Alignment"
            options={alignmentOptions}
            hint={{
              icon: "scale",
              text: "A reflection of your character’s moral and ethical outlook.",
            }}
          />

          <InputField
            label="Character Type"
            type="selectButton"
            value={data.character_type}
            onChange={(val) => onChange("character_type", val)}
            options={["Player", "NPC"]}
            hint={{
              icon: "user-cog",
              text: "Defines whether this character is a Player Character or NPC.",
            }}
          />
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* ============ STATUS / BIRTH / GENDER SECTION ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="space-y-4 lg:col-span-2">
          <InputField
            label="Status"
            type="selectButton"
            value={data.status}
            onChange={(val) => onChange("status", val)}
            options={["Alive", "Unknown", "Dead"]}
            hint={{
              icon: "activity",
              text: "Indicates whether the character is Alive, Dead, or Unknown.",
            }}
          />

          {/* Birth Year */}
          <div>
            <LabelWithHint
              label="Birth Year"
              icon="calendar"
              text="The year your character was born."
            />
            <div className="flex gap-2 items-end">
              <input
                type="number"
                value={data.birth_year || ""}
                onChange={(e) => onChange("birth_year", e.target.value)}
                className="flex-1 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              {talesMode ? (
                <select
                  value={data.birth_year_type || ""}
                  onChange={(e) => onChange("birth_year_type", e.target.value)}
                  className="w-24 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="">Select</option>
                  <option value="AC">AC</option>
                  <option value="CE">CE</option>
                  <option value="AV">AV</option>
                  <option value="AL">AL</option>
                  <option value="AF">AF</option>
                  <option value="BC">BC</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={data.birth_year_type || ""}
                  onChange={(e) => onChange("birth_year_type", e.target.value)}
                  placeholder="Type"
                  className="w-24 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              )}
            </div>
          </div>

          {(data.status === "Dead" || data.status === "Unknown") && (
            <div>
              <LabelWithHint
                label={
                  data.status === "Unknown"
                    ? "Presume Death Year"
                    : "Death Year"
                }
                icon="clock"
                text="Year character died or presumed dead."
              />
              <div className="flex gap-2 items-end">
                <input
                  type="number"
                  value={data.death_year || ""}
                  onChange={(e) => onChange("death_year", e.target.value)}
                  className="flex-1 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                {talesMode ? (
                  <select
                    value={data.death_year_type || ""}
                    onChange={(e) =>
                      onChange("death_year_type", e.target.value)
                    }
                    className="w-24 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  >
                    <option value="">Select</option>
                    <option value="AC">AC</option>
                    <option value="CE">CE</option>
                    <option value="AV">AV</option>
                    <option value="AL">AL</option>
                    <option value="AF">AF</option>
                    <option value="BC">BC</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={data.death_year_type || ""}
                    onChange={(e) =>
                      onChange("death_year_type", e.target.value)
                    }
                    placeholder="Type"
                    className="w-24 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                )}
              </div>
            </div>
          )}

          {/* Birthplace */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <InputField
              label="Birth Place"
              value={data.birth_place}
              onChange={(val) => onChange("birth_place", val)}
              placeholder=""
              hint={{
                icon: "activity",
                text: "The town, city, or location where your character was born.",
              }}
            />
            {talesMode ? (
              <InputField
                label="Birth Country"
                type="select"
                value={data.birth_country}
                onChange={(val) => onChange("birth_country", val)}
                placeholder="Select Country"
                options={countryOptions}
              />
            ) : (
              <InputField
                label="Birth Country"
                value={data.birth_country}
                onChange={(val) => onChange("birth_country", val)}
                placeholder=""
              />
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4 lg:col-span-3">
          {/* Gender & Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <InputField
              label="Gender"
              type="select"
              value={data.gender}
              onChange={(val) => onChange("gender", val)}
              placeholder="Select Gender"
              options={["Male", "Female", "Nonbinary", "Undefined"]}
              hint={{
                icon: "venus-and-mars",
                text: "Character’s gender for narrative reference.",
              }}
            />

            {/* Height */}
            <div>
              <LabelWithHint
                label="Height"
                icon="ruler"
                text="Character height detail."
              />
              <div className="flex gap-2 items-end">
                {data.height_unit === "imperial" ? (
                  <div className="flex gap-2 flex-1">
                    <input
                      type="number"
                      placeholder="Feet"
                      value={data.height?.feet || ""}
                      min={0}
                      onChange={(e) =>
                        onChange("height", {
                          ...data.height,
                          feet: e.target.value,
                        })
                      }
                      className="w-1/2 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Inch"
                      value={data.height?.inch || ""}
                      min={0}
                      max={11}
                      onChange={(e) =>
                        onChange("height", {
                          ...data.height,
                          inch: e.target.value,
                        })
                      }
                      className="w-1/2 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                ) : (
                  <input
                    type="number"
                    placeholder="Cm"
                    value={data.height?.centimeter || ""}
                    onChange={(e) =>
                      onChange("height", {
                        ...data.height,
                        centimeter: e.target.value,
                      })
                    }
                    className="flex-1 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                )}

                <select
                  value={data.height_unit || ""}
                  onChange={(e) => {
                    const newUnit = e.target.value;
                    onChange("height_unit", newUnit);
                    const newHeight = { feet: "", inch: "", centimeter: "" };
                    onChange("height", newHeight);
                  }}
                  className="w-20 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="metric">Cm</option>
                  <option value="imperial">Ft/In</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pronoun & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
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
              hint={{
                icon: "quote",
                text: "Pronouns your character uses.",
              }}
            />

            {/* Weight */}
            <div>
              <LabelWithHint
                label="Weight"
                icon="scale"
                text="Character’s weight value."
              />
              <div className="flex gap-2 items-end">
                <input
                  type="number"
                  placeholder={data.weight_unit === "imperial" ? "Lb" : "Kg"}
                  value={
                    data.weight_unit === "imperial"
                      ? data.weight?.pounds ?? ""
                      : data.weight?.kilogram ?? ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    const newWeight =
                      data.weight_unit === "imperial"
                        ? { ...(data.weight || {}), pounds: val }
                        : { ...(data.weight || {}), kilogram: val };
                    onChange("weight", newWeight);
                  }}
                  className="flex-1 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />

                <select
                  value={data.weight_unit || ""}
                  onChange={(e) => {
                    const unit = e.target.value;
                    const newWeight =
                      unit === "imperial"
                        ? { pounds: data.weight?.pounds ?? "", kilogram: "" }
                        : { pounds: "", kilogram: data.weight?.kilogram ?? "" };
                    onChange("weight_unit", unit);
                    onChange("weight", newWeight);
                  }}
                  className="w-20 h-12 px-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                >
                  <option value="imperial">Lb</option>
                  <option value="metric">Kg</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skin & Hair */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Skin Colour"
              type="text"
              value={data.skin_colour}
              onChange={(val) => onChange("skin_colour", val)}
              hint={{
                icon: "palette",
                text: "Describes character’s skin tone.",
              }}
            />
            <InputField
              label="Hair"
              type="text"
              value={data.hair}
              onChange={(val) => onChange("hair", val)}
              hint={{
                icon: "scissors",
                text: "Describes hair color or style.",
              }}
            />
          </div>

          {data.character_type === "Player" && (
            <InputField
              label="Background"
              type="selectSearch"
              value={data.background_name}
              onChange={(val) => {
                const selected = backgroundOptions.find(
                  (r) => r.id === val || r.value === val
                );
                onChange("background_id", selected?.id || "");
                onChange("background_name", selected?.label || "");
              }}
              placeholder={
                backgroundOptions.length ? "Select Background" : "Loading..."
              }
              options={backgroundOptions}
              hint={{
                icon: "book-open",
                text: "Your character’s background or origin.",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
