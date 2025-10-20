"use client";

import { linkifyText } from "@/utils/linkifyText";

export default function RaceSubrace({ data }) {
  if (!data || data.length === 0) {
    return (
      <section>
        <h1 className="text-2xl font-bold mb-2">Subraces</h1>
        <p className="text-gray-300">No subraces available.</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4 text-orange-400">
        {data[0].race_name} Subraces
      </h1>

      <div className="space-y-6">
        {data.map((subrace, idx) => (
          <article
            key={subrace.id || idx}
            id={subrace.name.toLowerCase().replace(/\s+/g, "_")}
            className="bg-gray-800 p-5 rounded-lg shadow border border-gray-700"
          >
            <h2 className="text-xl font-bold text-orange-400 mb-2">
              {subrace.name}
            </h2>

            {subrace.description && (
              <p
                className="text-gray-200 mb-3 leading-relaxed universalLink racesLink"
                dangerouslySetInnerHTML={{
                  __html: linkifyText(
                    subrace.description,
                    "universalLink racesLink"
                  ),
                }}
              />
            )}

            {/* {subrace.image && (
              <img
                src={subrace.image}
                alt={subrace.name}
                className="w-full max-w-md rounded-lg border border-gray-600 mt-3"
              />
            )} */}
          </article>
        ))}
      </div>
    </section>
  );
}
