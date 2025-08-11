import Image from "next/image";
import Link from "next/link";

export default function ClassCard({ className, info }) {
  const normalized = className.replace(/-/g, "_");
  const capitalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);

  return (
    <div className="rounded overflow-hidden max-w-[160px] sm:max-w-xs flex flex-col">
      {/* Gambar background */}
      <div className="relative h-40 sm:h-72 bg-gray-700 rounded-xl">
        <Image
          src={`/assets/classIcon/${normalized}_icon.webp`}
          alt={`${capitalized} Art`}
          fill
          className="object-cover opacity-20"
        />
        {/* Konten overlay */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gray-800 bg-opacity-90 p-2 sm:p-3 rounded-md shadow-md w-[80%] sm:w-[75%] z-10">
          <div className="flex items-center gap-1 sm:gap-2">
            <Image
              src={`/assets/classIcon/${normalized}_icon.webp`}
              alt={`${capitalized} Icon`}
              width={20}
              height={20}
              className="sm:w-7 sm:h-7"
            />
            <h2 className="text-xs sm:text-base font-bold">
              {info.title || capitalized}
            </h2>
          </div>
          <p className="text-[10px] sm:text-sm text-gray-400 italic mt-1">
            Player’s Handbook
          </p>
          <hr className="my-1 sm:my-2 border-orange-400 w-1/2" />

          <p className="text-[7px] sm:text-xs text-gray-300 mt-1 line-clamp-3">
            {info.description}
          </p>
          <div className="text-[7px] sm:text-sm text-gray-200 space-y-0.5 sm:space-y-1 mt-2 sm:mt-3">
            <p>
              <strong>Primary Ability:</strong>{" "}
              {info.primaryAbility || "Strength"}
            </p>
            <p>
              <strong>Hit Point Die:</strong> {info.hitDie || "D12"}
            </p>
            <p>
              <strong>Saves:</strong>{" "}
              {info.savingThrows?.join(" & ") || "Strength & Constitution"}
            </p>
          </div>
        </div>
      </div>
      <div className="py-2 sm:py-3 px-2 sm:px-4 mt-auto">
        <Link href={`/classes/${className}`}>
          <button className="w-full bg-orange-500 text-white font-bold text-[8px] sm:text-sm py-1.5 sm:py-2 px-2 sm:px-4 rounded hover:bg-orange-600 transition">
            VIEW {capitalized.toUpperCase()} DETAILS
          </button>
        </Link>
      </div>
    </div>
  );
}
