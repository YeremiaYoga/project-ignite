"use client";
import { useState } from "react";
import React from "react";
import AbilityCard from "./AbilityCard";
import { Heart, Sword, Shield, Diamond } from "lucide-react";

export default function CombatStyleCard({ data }) {
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
        <span className={`w-4 h-4 rounded-full inline-block ${color}`} />

        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1
                    bg-slate-800 text-white text-xs px-2 py-1 rounded shadow
                    whitespace-nowrap z-10
                    transition-opacity duration-200
                    ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
        <Icon className={`w-4 h-4 ${color}`} />
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
          bg-slate-800 text-white text-xs px-2 py-1 rounded shadow 
          whitespace-nowrap z-10 transition-opacity duration-200
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {label}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="bg-[#0b1230] text-gray-100 p-6 rounded-lg shadow-xl w-full max-w-3xl mx-auto border border-[#1f2d5a] transition-all duration-300 ease-in-out min-h-[600px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img src={data.img} alt={data.name} className="w-10 h-10" />

          <div>
            <h1 className="text-2xl font-bold ">{data.name}</h1>
            <div className="flex gap-2 items-center">
              <div className="text-gray-400 capitalize">{data.role}</div>
              <div className="flex items-center gap-2 mb-2">
                {data.good && <Dot color="bg-green-400" label="Good" />}
                {data.neutral && <Dot color="bg-yellow-400" label="Neutral" />}
                {data.evil && <Dot color="bg-red-400" label="Evil" />}
                {data.unknown && <Dot color="bg-purple-400" label="Unknown" />}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right border p-2">
          <span className="text-lg text-gray-400">V{data.version}</span>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <TooltipIcon icon={Heart} label="HP Scale"></TooltipIcon>
              <span>{data.hp_scale}</span>
            </div>

            <div className="flex items-center gap-1">
              <TooltipIcon icon={Sword} label="Initiative Bonus"></TooltipIcon>
              <span>+{data.intivative_bonus}</span>
            </div>

            <div className="flex items-center gap-1">
              <TooltipIcon icon={Shield} label="Armor Class"></TooltipIcon>
              <span>{data.ac_calc}</span>
            </div>

            {data.cv_minimum > 0 && (
              <div className="flex items-center gap-1">
                <TooltipIcon
                  icon={Diamond}
                  label="Combat Value Minimum"
                  color="text-teal-400"
                ></TooltipIcon>
                <span>{data.cv_minimum}</span>
              </div>
            )}

            {data.cv_flat_cost > 0 && (
              <div className="flex items-center gap-1">
                <TooltipIcon
                  icon={Diamond}
                  label="Combat Value Flat Cost"
                  color="text-teal-400"
                ></TooltipIcon>
                <span>{data.cv_flat_cost}</span>
              </div>
            )}

            {data.cv_percent_cost > 0 && (
              <div className="flex items-center gap-1">
                <TooltipIcon
                  icon={Diamond}
                  label="Combat Value Percent Cost"
                  color="text-teal-400"
                ></TooltipIcon>
                <span>{data.cv_percent_cost}%</span>
              </div>
            )}
          </div>
          <div className="w-[2px] h-full bg-[#2c3a6a] mr-4" />
        </div>

        <div className="flex gap-2 overflow-y-auto h-40">
          <div className="flex-1 min-w-0">
            <div>Detail roles:</div>
            <div
              className="text-xs whitespace-pre-line break-words"
              dangerouslySetInnerHTML={{
                __html: data.description.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        </div>
      </div>

      <hr className="border-[#2c3a6a] my-3" />

      {data.abilities?.map((a, idx) => (
        <AbilityCard key={idx} {...a} />
      ))}
    </div>
  );
}
