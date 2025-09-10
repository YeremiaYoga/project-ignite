"use client";
import Image from "next/image";
import { useTalesMode } from "@/context/TalesModeContext";
import { linkifyText } from "@/utils/linkifyText";

export default function RaceDetail({ data }) {
  const { talesMode } = useTalesMode();

  if (!data) return <p>No race data available.</p>;

  return (
    <section>
      <section
        key={data.name.toLowerCase()}
        id={data.name.toLowerCase()}
        className="scroll-mt-100"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0 order-1 lg:order-2 flex justify-center items-center">
            <div className="relative w-full max-w-[500px]">
              {data.image && (
                <Image
                  src={data.image}
                  alt={data.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="rounded-lg w-full h-auto object-contain"
                  priority
                />
              )}
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
                <strong>Source:</strong> {data.source}{" "}
              </p>
            </div>

            <div className="text-gray-200">
              {/* {talesMode && data.tales_details && (
                <div className="mb-6">
                  <p
                    className="whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: linkifyText(data.tales_details, "universalLink"),
                    }}
                  />
                  <hr className="my-4 h-0.5 border-t-0 bg-gray-600 opacity-50" />
                </div>
              )} */}

              {data.details &&
                data.details.map((detail, index) => {
                  if (detail.type === "description" && detail.content) {
                    return (
                      <p
                        key={index}
                        className="whitespace-pre-line mb-4"
                        dangerouslySetInnerHTML={{
                          __html: linkifyText(detail.content, "universalLink"),
                        }}
                      />
                    );
                  }

                  if (detail.type === "table" && detail.table) {
                    return (
                      <div key={index} className="overflow-x-auto mb-4">
                        <table className="min-w-full table-auto border-collapse border border-gray-600">
                          <thead className="bg-gray-800">
                            <tr>
                              {detail.table.headers.map((header, hIndex) => (
                                <th
                                  key={hIndex}
                                  className="px-4 py-2 border-b-2 border-gray-600 text-left text-sm font-semibold text-gray-400"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-gray-900">
                            {detail.table.rows.map((row, rIndex) => (
                              <tr key={rIndex}>
                                {row.map((cell, cIndex) => (
                                  <td
                                    key={cIndex}
                                    className="px-4 py-2 border-b border-gray-700 text-sm"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  if (detail.type === "list" && detail.list) {
                    return (
                      <ul key={index} className="list-disc list-inside mb-4">
                        {detail.list.map((item, lIndex) => (
                          <li key={lIndex} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
            </div>
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
              {data.name.charAt(0).toUpperCase() + data.name.slice(1)} Traits
            </h2>
            {data.features.map((feature, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold text-orange-400 mb-2">
                  {feature.title}
                </h3>

                {/* description */}
                {feature.description && (
                  <p
                    className="text-gray-200 mb-3 universalLink racesLink"
                    dangerouslySetInnerHTML={{
                      __html: linkifyText(
                        feature.description,
                        "universalLink racesLink"
                      ),
                    }}
                  />
                )}

                {/* table */}
                {feature.table && (
                  <div className="overflow-x-auto mb-3">
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
                                className="border border-gray-600 px-3 py-1 text-gray-200 universalLink racesLink"
                                dangerouslySetInnerHTML={{
                                  __html: linkifyText(
                                    cell,
                                    "universalLink racesLink"
                                  ),
                                }}
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* list */}
                {feature.list &&
                  Array.isArray(feature.list) &&
                  feature.list.length > 0 && (
                    <ul className="list-disc list-inside text-gray-200">
                      {feature.list.map((item, i) => (
                        <li
                          key={i}
                          className="universalLink racesLink"
                          dangerouslySetInnerHTML={{
                            __html: linkifyText(
                              item,
                              "universalLink racesLink"
                            ),
                          }}
                        />
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
