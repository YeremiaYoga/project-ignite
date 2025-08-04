import Image from "next/image";
import Link from "next/link";

export default function ClassCard({ className, info }) {
  const normalized = className.replace(/-/g, "_");
  const capitalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);

  return (
    <div className="rounded overflow-hidden max-w-xs flex flex-col ">
      <div className="relative h-75 bg-gray-700 rounded-xl">
        <Image
          src={`/assets/classIcon/${normalized}_icon.webp`}
          alt={`${capitalized} Art`}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 p-3 rounded-md shadow-md w-[75%] z-10">
          <div className="flex items-center gap-2">
            <Image
              src={`/assets/classIcon/${normalized}_icon.webp`}
              alt={`${capitalized} Icon`}
              width={28}
              height={28}
            />
            <h2 className="text-white font-bold">
              {info.title || capitalized}
            </h2>
          </div>
          <p className="text-sm text-gray-400 italic mt-1">Player’s Handbook</p>
          <hr className="my-2 border-orange-400 w-1/2" />

          <p className="text-xs text-gray-300 mt-1">{info.description}</p>
          <div className="text-sm text-gray-200 space-y-1 mt-3">
            <p>
              <strong>Primary Ability:</strong> {info.primary || "Strength"}
            </p>
            <p>
              <strong>Hit Point Die:</strong> {info.hp || "D12"}
            </p>
            <p>
              <strong>Saves:</strong> {info.saves || "Strength & Constitution"}
            </p>
          </div>
        </div>
      </div>
      <div className="py-3 px-4 mt-auto">
        <Link href={`/classes/${className}`}>
          <button className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition">
            VIEW {capitalized.toUpperCase()} DETAILS
          </button>
        </Link>
      </div>
    </div>
  );
}
