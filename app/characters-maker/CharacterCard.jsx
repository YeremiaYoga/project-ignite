"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { IBM_Plex_Mono } from "next/font/google";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(duration);

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function CharacterCard({
  char,
  onEdit,
  onView,
  onDelete,
  onRestore,
  isTrash,
}) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    if (!isTrash || !char.deleted_at) return;

    const calculateRemaining = () => {
      if (!char.deleted_at) return;
      const deletedAt = dayjs.utc(char.deleted_at);
      const expiry = deletedAt.add(1, "day");
      const now = dayjs.utc();
      const diff = expiry.diff(now);
      if (diff <= 0) {
        setRemaining("Expired");
        return;
      }

      const dur = dayjs.duration(diff);

      const formatted = `${dur.days()}:${String(dur.hours()).padStart(
        2,
        "0"
      )}:${String(dur.minutes()).padStart(2, "0")}:${String(
        dur.seconds()
      ).padStart(2, "0")} remaining`;

      setRemaining(formatted);
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);

    return () => clearInterval(interval);
  }, [char.deleted_at, isTrash]);

  return (
    <div
      key={char.uuid}
      className="relative bg-no-repeat bg-cover w-[350px] h-[220px] flex flex-col justify-between p-4"
      style={{
        backgroundImage: "url('/assets/character_image.png')",
      }}
    >
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

      <div className="absolute top-[110px] left-12">
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-800 w-full">
          {char.name}
        </h2>
      </div>

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

      <div className="flex justify-center gap-3 mt-auto mb-2 items-center">
        {isTrash ? (
          <>
            <span className="text-sm text-gray-600">{remaining}</span>

            <button
              onClick={() => onRestore?.(char.uuid)}
              className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Restore
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onView?.(char.uuid)}
              className="px-4 py-1 bg-blue-600 text-white rounded opacity-50 cursor-not-allowed"
              disabled
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
          </>
        )}
      </div>
    </div>
  );
}
