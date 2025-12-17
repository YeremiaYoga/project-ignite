"use client";

import { useEffect, useState } from "react";
import { Copy, Eye, EyeOff, Share2, Link, Lock } from "lucide-react";
import { IBM_Plex_Mono } from "next/font/google";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import { stamps_images } from "../../data/characterOptions";
dayjs.extend(utc);
dayjs.extend(duration);

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["700"],
});

export default function CharacterCard({
  char,
  onEdit,
  onView,
  onDelete,
  onRestore,
  onDeletePermanent, // ✅ baru ditambahkan
  isTrash,
}) {
  const [remaining, setRemaining] = useState("");
  const [showPrivate, setShowPrivate] = useState(false);

  // ✅ SHARE state
  const [shareOpen, setShareOpen] = useState(false);

  console.log(char);

  useEffect(() => {
    if (!isTrash || !char.deleted_at) return;

    const calculateRemaining = () => {
      if (!char.deleted_at) return;
      const deletedAt = dayjs.utc(char.deleted_at);
      const expiry = deletedAt.add(1, "day"); // contoh: expired 1 hari
      const now = dayjs.utc();
      const diff = expiry.diff(now);
      if (diff <= 0) {
        setRemaining("Expired");
        return;
      }

      const dur = dayjs.duration(diff);
      const formatted = `${dur.hours().toString().padStart(2, "0")}:${dur
        .minutes()
        .toString()
        .padStart(2, "0")}:${dur
        .seconds()
        .toString()
        .padStart(2, "0")} remaining`;
      setRemaining(formatted);
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);
    return () => clearInterval(interval);
  }, [char.deleted_at, isTrash]);

  // ✅ Share URL helper (public/private)
  const shareUrl = async (mode) => {
    const base = typeof window !== "undefined" ? window.location.origin : "";

    const publicId = char?.public_id || char?.publicId || "";
    const privateId = char?.private_id || char?.privateId || "";

    const url =
      mode === "public"
        ? publicId
          ? `${base}/characters/${publicId}`
          : ""
        : privateId
        ? `${base}/characters/private/${privateId}`
        : "";

    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }

    setShareOpen(false);
  };

  const publicDisabled = !(char?.public_id || char?.publicId);
  const privateDisabled = !(char?.private_id || char?.privateId);

  return (
    <div
      key={char.uuid}
      className="relative bg-no-repeat bg-cover w-[350px] h-[220px] flex flex-col justify-between p-4"
      style={{
        backgroundImage: "url('/assets/character_image.png')",
      }}
    >
      {/* 🔹 ID dan tombol salin */}
      <div className="absolute top-5 right-5 flex items-center gap-2 text-sm text-gray-700 font-bold">
        <span className={`text-xs ${ibmPlexMono.className}`}>
          {showPrivate
            ? char.private_id ?? "UnknownID"
            : "•".repeat(Math.min((char.private_id ?? "").length || 8, 12))}
        </span>

        <button
          onClick={() => setShowPrivate((prev) => !prev)}
          className="text-gray-500 hover:text-blue-500 transition-colors"
          title={showPrivate ? "Hide ID" : "Show ID"}
        >
          {showPrivate ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>

        <Copy
          size={16}
          className="cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => navigator.clipboard.writeText(char.private_id ?? "")}
          title="Copy Private ID"
        />
      </div>

      {/* 🔹 Public ID */}
      <div className="absolute top-10 right-5 flex items-center gap-1 text-sm text-gray-700">
        <span className={`text-xs ${ibmPlexMono.className}`}>
          {char.public_id ?? "UnknownID"}
        </span>
        <Copy
          size={16}
          className="cursor-pointer hover:text-gray-900"
          onClick={() => navigator.clipboard.writeText(char.public_id ?? "")}
        />
      </div>

      {/* 🔹 Avatar */}
      <div className="absolute top-[27px] left-[11px] flex flex-col items-center w-[120px]">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
          {char.token_image ? (
            <img
              src={char.token_image}
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

      {/* 🔹 Nama */}
      <div className="absolute top-[110px] left-12">
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-800 w-full">
          {char.name}
        </h2>
      </div>

      {/* 🔹 Stamp */}
      <div
        className="absolute right-7 top-16"
        style={{
          transform: `rotate(${char.rotation_stamp || 0}deg)`,
        }}
      >
        <img
          src={
            stamps_images[(char.stamp_type - 1) % stamps_images.length] ||
            stamps_images[0]
          }
          alt="Stamp"
          className="w-10 h-auto"
        />
      </div>

      {/* 🔹 Tombol Aksi */}
      <div className="flex justify-center gap-3 mt-auto mb-2 items-center">
        {isTrash ? (
          <>
            <span className="text-sm text-gray-600">{remaining}</span>
            <button
              onClick={() => onRestore?.(char.id)}
              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Restore
            </button>

            <button
              onClick={() => onDeletePermanent?.(char.id)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onView?.(char.private_id)}
              className="px-4 py-1 bg-blue-600 text-white rounded"
            >
              View
            </button>

            {/* ✅ SHARE di sebelah View */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShareOpen((v) => !v)}
                className="p-2 bg-slate-800 text-white rounded hover:bg-slate-900 inline-flex items-center gap-2"
              >
                <Share2 size={18} />
              </button>

              {shareOpen && (
                <>
                  {/* click-outside overlay */}
                  <button
                    type="button"
                    onClick={() => setShareOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                    aria-label="Close share menu"
                  />

                  <div className="absolute left-0 z-50 mt-2 w-52 overflow-hidden rounded-md border border-slate-700 bg-white shadow-xl">
                    <button
                      type="button"
                      onClick={() => shareUrl("public")}
                      disabled={publicDisabled}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs ${
                        publicDisabled
                          ? "cursor-not-allowed text-gray-400"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      title={
                        publicDisabled
                          ? "No public_id available"
                          : "Copy Public Link"
                      }
                    >
                      <Link size={14} />
                      Copy Public Link
                    </button>

                    <button
                      type="button"
                      onClick={() => shareUrl("private")}
                      disabled={privateDisabled}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs ${
                        privateDisabled
                          ? "cursor-not-allowed text-gray-400"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      title={
                        privateDisabled
                          ? "No private_id available"
                          : "Copy Private Link"
                      }
                    >
                      <Lock size={14} />
                      Copy Private Link
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => onEdit?.(char.uuid)}
              className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(char.uuid)}
              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
