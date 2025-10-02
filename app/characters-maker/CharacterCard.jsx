"use client";

import { Copy } from "lucide-react";
import { IBM_Plex_Mono } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function CharacterCard({ char, onEdit, onView, onDelete }) {
  return (
    <div
      key={char.uuid}
      className="relative bg-no-repeat bg-cover w-[350px] h-[220px] flex flex-col justify-between p-4"
      style={{
        backgroundImage: "url('/assets/character_image.png')",
      }}
    >
      {/* UUID + copy */}
      <div className="absolute top-4 right-5 flex items-center gap-1 text-sm text-gray-700">
        <span className={`text-lg ${ibmPlexMono.className}`}>
          {char.uuid ?? "UnknownID"}
        </span>
        <Copy
          size={16}
          className="cursor-pointer hover:text-gray-900"
          onClick={() => navigator.clipboard.writeText(char.uuid ?? "")}
        />
      </div>

      {/* Token image */}
      <div className="absolute top-[27px] left-[11px] flex flex-col items-center w-[120px]">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
          {char.token_art ? (
            <img
              src={char.token_art}
              alt={char.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/assets/example_token.png"
              alt={char.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Name */}
      <div className="absolute top-[110px] left-12">
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-800 w-full">
          {char.name}
        </h2>
      </div>

      {/* Stamp */}
      <div
        className="absolute right-7 top-12"
        style={{
          transform: `rotate(${char.rotation_stamp || 0}deg)`,
        }}
      >
        <img
          src={
            char.stamp_type % 2 === 1
              ? "/assets/stamps/stamp_1.webp"
              : "/assets/stamps/stamp_2.webp"
          }
          alt="Stamp"
          className="w-10 h-auto"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3 mt-auto mb-2">
        <button
          onClick={() => onView?.(char.uuid)}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          View
        </button>
        <button
          onClick={() => onEdit?.(char.uuid)}
          className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(char.uuid)}
          className="px-4 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
