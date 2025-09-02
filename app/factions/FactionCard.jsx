"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function FactionCard({ faction }) {
  return (
    <div className="flex items-start border border-gray-700 rounded-2xl p-4 shadow-md bg-gray-900 relative">
      <div className="w-24 h-24 relative mr-4 flex-shrink-0">
        {faction.logo ? (
          <Image
            src={faction.logo}
            alt={`${faction.faction_name} logo`}
            fill
            className="object-contain rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            No Logo
          </div>
        )}
      </div>

      <div className="flex-1 pr-14">
        <div className="flex justify-between items-start text-white">
          <h2 className="text-xl font-bold ">
            {faction.faction_name}
          </h2>
          <span className=" font-bold">
            {faction.alignment}
          </span>
        </div>

        <p className=" font-semibold">
          {faction.faction_motto}
        </p>

        <p className=" text-sm mt-2">{faction.primary}</p>
      </div>

      <Link
        href={`/factions/${faction.faction_name
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
        className="absolute top-1/2 right-4 -translate-y-1/2 border border-gray-600 rounded-xl w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white transition"
      >
        <Plus size={20} />
      </Link>
    </div>
  );
}
