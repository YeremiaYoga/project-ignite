import Image from "next/image";
import Link from "next/link";

export default function ClassCard({ className, info }) {
  const normalized = className.replace(/-/g, "_");
  const capitalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);

  return (
    <div>
      <div className="rounded overflow-hidden flex flex-col w-44  sm:w-100 aspect-[3/2]">
        <div
          className="relative bg-gray-700 rounded-xl flex-shrink-0"
          style={{ flexBasis: "100%" }}
        >
          <Image
            src={`/assets/classes/classImage/${normalized}.webp`}
            alt={`${capitalized} Art`}
            fill
            className="object-cover opacity-70 rounded-xl"
            sizes="(max-width: 640px) 180px, 350px"
            priority
          />
          <div className="absolute h-full right-0 bg-gray-800/50  p-2 rounded-md shadow-md w-[66%] z-10 sm:p-3 sm:w-[66%]">
            <div className="flex items-center gap-2">
              <div className="relative w-3 sm:w-10 aspect-square">
                <Image
                  src={`/assets/classIcon/${normalized}_icon.webp`}
                  alt={`${capitalized} Icon`}
                  fill
                  sizes="(max-width: 640px) 24px, 40px"
                  className="rounded object-cover"
                  priority
                />
              </div>

              <h2 className="text-xs sm:text-base font-bold">
                {info.title || capitalized}
              </h2>
            </div>
            <p className="text-[7px] sm:text-sm text-gray-400 italic mt-1">
              Player’s Handbook
            </p>
            <hr className="my-1 sm:my-2 border-orange-400 w-1/2" />
            <p className="text-[7px] sm:text-sm text-gray-300 mt-1 line-clamp-3">
              {info.description}
            </p>
            <div className="text-[7px] sm:text-sm text-gray-200 space-y-1 mt-2">
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
      </div>
      <div className=" py-2 px-4 mt-2  rounded-b-xl">
        <Link href={`/classes/${className}`}>
          <button className="w-full bg-orange-500 text-white font-bold text-[7px] sm:text-sm py-2 rounded hover:bg-orange-600 transition">
            VIEW {capitalized.toUpperCase()} DETAILS
          </button>
        </Link>
      </div>
    </div>
  );
}
