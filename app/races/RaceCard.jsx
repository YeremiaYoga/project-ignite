import Image from "next/image";
import Link from "next/link";

export default function RaceCard({ race }) {
  const { raceName, image, description, source, traits } = race;
  const capitalized = raceName.charAt(0).toUpperCase() + raceName.slice(1);
  const linkPath = `/races/${raceName.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      <div className="rounded overflow-hidden flex flex-col w-44 sm:w-100 aspect-[3/2]">
        <div className="relative w-full h-full bg-gray-700 rounded-xl overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={`${capitalized} Image`}
              fill
              className="object-cover"
            />
          )}

          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-gray-800/80 p-2 sm:p-3 rounded-md shadow-md w-[66%] sm:w-[66%] z-10 overflow-y-auto h-25 sm:h-60">
            <h2 className="text-xs sm:text-base font-bold">{capitalized}</h2>
            <p className="text-[7px] sm:text-sm text-gray-400 italic mt-1">
              {source || "Unknown Handbook"}
            </p>
            <hr className="my-1 sm:my-2 border-orange-400 w-1/2" />

            <p className="text-[7px] sm:text-sm text-gray-300 mt-1 line-clamp-3">
              {description}
            </p>
            <p className="text-[7px] sm:text-sm">{capitalized} Traits:</p>
            {traits?.length > 0 && (
              <div className="text-[7px] sm:text-sm text-gray-400">
                {traits.join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-2 sm:py-3 px-2 sm:px-4 mt-auto">
        <Link href={linkPath}>
          <button className="w-full bg-orange-500 text-white font-bold text-[8px] sm:text-sm py-1.5 sm:py-2 rounded hover:bg-orange-600 transition">
            VIEW {capitalized.toUpperCase()} DETAILS
          </button>
        </Link>
      </div>
    </div>
  );
}
