import Image from "next/image";
import RaceSubrace from "./RaceSubrace";
export default function RaceDetail({ data }) {
  if (!data) return <p>No race data available.</p>;

  return (
    <section className="">
      <section
        key={data.name.toLowerCase()}
        id={data.name.toLowerCase()}
        className="scroll-mt-100"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0 order-1 lg:order-2 flex justify-center items-center">
            <div className="relative w-full max-w-[500px]">
              <Image
                src={data.image}
                alt={data.name}
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-lg w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex-1 order-2 lg:order-1">
            <h1 className="text-3xl font-bold mb-2">
        
              {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
            </h1>

            <div className="text-gray-300 space-y-1 mb-4 text-sm">
              <p>
                <strong>Creature Type:</strong> {data.creature_type}
              </p>
              <p>
                <strong>Size:</strong> {data.size}
              </p>
              <p>
                <strong>Speed:</strong> {data.speed}
              </p>
              {data.asi && (
                <p>
                  <strong>ASI:</strong> {data.asi}
                </p>
              )}
              {data.age && (
                <p>
                  <strong>Age:</strong> {data.age}
                </p>
              )}
              {data.languages && (
                <p>
                  <strong>Languages:</strong> {data.languages}
                </p>
              )}
              <p>
                <strong>Source:</strong> {data.source}
              </p>
            </div>

            <p className="text-gray-200 whitespace-pre-line">{data.details}</p>
          </div>
        </div>
      </section>

      <section
        key={data.name.toLowerCase() + "_traits"}
        id={data.name.toLowerCase() + "_traits"}
        className="scroll-mt-20"
      >
        {data.features?.length > 0 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">
              {" "}
              {data.name.charAt(0).toUpperCase() + data.name.slice(1)} Traits
            </h2>
            {data.features.map((feature, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold text-orange-400 mb-2">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-gray-200 mb-3">{feature.description}</p>
                )}

                {feature.table && (
                  <div className="overflow-x-auto mb-3">
                    {" "}
                    <table className="table-auto border-collapse border border-gray-600 w-full text-sm">
                      <thead>
                        <tr>
                          {feature.table.headers.map((header, i) => (
                            <th
                              key={i}
                              className="border border-gray-600 px-3 py-1 bg-gray-700 text-gray-100"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {feature.table.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className="border border-gray-600 px-3 py-1 text-gray-200"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {feature.list &&
                  Array.isArray(feature.list) &&
                  feature.list.length > 0 && (
                    <ul className="list-disc list-inside text-gray-200">
                      {feature.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
