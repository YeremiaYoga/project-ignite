"use client";
import { useState, useEffect } from "react";
import React from "react";
import AbilityCard from "./AbilityCard";
import {
  Heart,
  Sword,
  Shield,
  Diamond,
  DiamondPercent,
  DiamondMinus,
} from "lucide-react";

export default function CombatStyleCard({ data }) {
  const folderName = data?.name?.toLowerCase()?.replace(/\s+/g, "_") || "";
  const [dataVersions, setDataVersions] = useState([]);
  const [selectedData, setSelectedData] = useState(data);
  const [selectedVersion, setSelectedVersion] = useState(
    `v${data?.version || 1}`
  );

  const loadVersions = async () => {
    try {
      const res = await fetch(`/api/incumbency/${folderName}`, {
        cache: "no-store",
      });
      const arr = await res.json();

      if (Array.isArray(arr) && arr.length > 0) {
        const sorted = [...arr].sort(
          (a, b) => (a.version || 0) - (b.version || 0)
        );
        setDataVersions(sorted);
        const current =
          sorted.find((x) => x.version === data.version) || sorted.at(-1);
        setSelectedVersion(`v${current.version}`);
        setSelectedData(current);
      } else {
        setDataVersions([]);
        setSelectedVersion(`v${data?.version || 1}`);
        setSelectedData(data);
      }
    } catch (err) {
      console.error("Failed to load versions:", err);
      setDataVersions([]);
      setSelectedVersion(`v${data?.version || 1}`);
      setSelectedData(data);
    }
  };

  useEffect(() => {
    if (folderName) loadVersions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderName]);

  const handleChangeVersion = (e) => {
    const vnum = Number(String(e.target.value).replace(/^v/i, ""));
    const found = dataVersions.find((d) => Number(d.version) === vnum);
    if (found) {
      setSelectedVersion(`v${vnum}`);
      setSelectedData(found);
    }
  };

  const safeDesc = (selectedData?.description || "").replace(/\n/g, "<br/>");

  return (
    <div className="bg-[#0b1230] text-gray-100 p-4 md:p-6 rounded-lg shadow-xl w-full max-w-3xl mx-auto border border-[#1f2d5a] transition-all duration-300 ease-in-out min-h-[560px]">
      {/* Header: mobile stack, desktop row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-3">
        {/* Left: avatar + title */}
        <div className="flex items-center gap-3">
          <img
            src={selectedData?.img}
            alt={selectedData?.name}
            className="w-12 h-12 md:w-10 md:h-10 rounded-sm object-contain"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight">
              {selectedData?.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-gray-400 capitalize">
                {selectedData?.role}
              </div>
              <div className="flex items-center gap-2 mb-1 md:mb-0">
                {selectedData?.good && (
                  <Dot color="bg-green-400" label="Good" />
                )}
                {selectedData?.neutral && (
                  <Dot color="bg-yellow-400" label="Neutral" />
                )}
                {selectedData?.evil && <Dot color="bg-red-400" label="Evil" />}
                {selectedData?.unknown && (
                  <Dot color="bg-purple-400" label="Unknown" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Version select (full width on mobile) */}
        <div className="md:text-right md:p-2 md:rounded-md md:bg-transparent">
          <div className="text-[10px] text-gray-400 mb-1 md:block hidden">
            Version
          </div>
          <select
            value={selectedVersion}
            onChange={handleChangeVersion}
            className="w-full md:w-auto bg-[#0b1230] border border-[#2c3a6a] rounded px-3 py-2 md:py-1 text-base md:text-lg focus:outline-none"
          >
            {dataVersions.map((item) => (
              <option
                key={item.filename || `v${item.version}`}
                value={`v${item.version}`}
              >
                V{item.version}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
        <div className="flex md:justify-between">
          <div className="space-y-2 md:space-y-1">
            <div className="flex items-center gap-2">
              <TooltipIcon icon={Heart} label="HP Scale" />
              <span className="text-sm md:text-base">
                {selectedData?.hp_scale}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <TooltipIcon icon={Sword} label="Initiative Bonus" />
              <span className="text-sm md:text-base">
                +{selectedData?.intivative_bonus}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <TooltipIcon icon={Shield} label="Armor Class" />
              <span className="text-sm md:text-base">
                {selectedData?.ac_calc}
              </span>
            </div>

            {Number(selectedData?.cv_minimum) > 0 && (
              <div className="flex items-center gap-2">
                <TooltipIcon
                  icon={Diamond}
                  label="Combat Value Minimum"
                  color="text-teal-400"
                />
                <span className="text-sm md:text-base">
                  {selectedData?.cv_minimum}
                </span>
              </div>
            )}

            {Number(selectedData?.cv_flat_cost) > 0 && (
              <div className="flex items-center gap-2">
                <TooltipIcon
                  icon={DiamondMinus}
                  label="Combat Value Flat Cost"
                  color="text-teal-400"
                />
                <span className="text-sm md:text-base">
                  {selectedData?.cv_flat_cost}
                </span>
              </div>
            )}

            {Number(selectedData?.cv_percent_cost) > 0 && (
              <div className="flex items-center gap-2">
                <TooltipIcon
                  icon={DiamondPercent}
                  label="Combat Value Percent Cost"
                  color="text-teal-400"
                />
                <span className="text-sm md:text-base">
                  {selectedData?.cv_percent_cost}%
                </span>
              </div>
            )}
          </div>

          <div className="hidden md:block w-[2px] h-full bg-[#2c3a6a] mr-4" />
        </div>

        <div className="flex gap-2">
          <div className="flex-1 min-w-0">
            <div className="text-sm md:text-base mb-1">Detail roles:</div>
            <div
              className="text-xs md:text-xs whitespace-pre-line break-words md:h-40 md:overflow-y-auto
                         max-h-48 overflow-y-auto pr-1"
              dangerouslySetInnerHTML={{ __html: safeDesc }}
            />
          </div>
        </div>
      </div>

      <hr className="border-[#2c3a6a] my-4 md:my-3" />

      {Array.isArray(selectedData?.abilities) &&
        selectedData.abilities.map((a, idx) => (
          <AbilityCard key={idx} {...a} />
        ))}
    </div>
  );
}

/* === Helpers === */
function Dot({ color = "bg-green-400", label = "Good" }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      <span
        className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full inline-block ${color}`}
      />
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-800 text-white
                    text-[10px] md:text-xs px-2 py-1 rounded shadow whitespace-nowrap z-10
                    transition-opacity duration-200 ${
                      open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
      >
        {label}
      </div>
    </div>
  );
}

function TooltipIcon({ icon: Icon, label, children, color = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      role="button"
      tabIndex={0}
    >
      <Icon className={`w-4 h-4 md:w-4 md:h-4 ${color}`} />
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-800 text-white
                    text-[10px] md:text-xs px-2 py-1 rounded shadow whitespace-nowrap z-10
                    transition-opacity duration-200 ${
                      open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
