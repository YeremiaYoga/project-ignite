"use client";

import React from "react";
import AbilityCard from "./AbilityCard";
import { Heart, Sword, Shield } from "lucide-react"; // 🪄 ikon dari lucide-react

export default function CombatStyleCard({ data }) {
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
                {data.good && (
                  <span className="w-4 h-4 bg-green-400 rounded-full" />
                )}
                {data.neutral && (
                  <span className="w-4 h-4 bg-yellow-400 rounded-full" />
                )}
                {data.evil && (
                  <span className="w-4 h-4 bg-red-400 rounded-full" />
                )}
                {data.unknown && (
                  <span className="w-4 h-4 bg-purple-400 rounded-full" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right border p-2">
          <span className="text-lg text-gray-400">V{data.version}</span>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 " />
            <span>{data.hp_scale}</span>
          </div>
          <div className="flex items-center gap-1">
            <Sword className="w-4 h-4 " />
            <span>+{data.intivative_bonus}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4 " />
            <span>{data.ac_calc}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4 " />
            <span>Combat Value Minimum : {data.cv_minimum}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4 " />
            <span>Combat Value Flat Cost : {data.cv_flat_cost}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4 " />
            <span>Combat Value Percent Cost : {data.cv_percent_cost}%</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[2px] h-full bg-[#2c3a6a]" />
          <div>
            <div>Detail roles:</div>
            <div className="text-xs">{data.description}</div>
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
