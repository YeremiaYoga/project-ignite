import fs from "fs";
import path from "path";

export default function RaceSubrace({ data }) {
  if (!data || !data.name) return null;

  const subraceDir = path.join(
    process.cwd(),
    "data",
    "races",
    data.name.toLowerCase(),
    "subrace"
  );

  let subraces = [];
  if (fs.existsSync(subraceDir)) {
    const files = fs
      .readdirSync(subraceDir)
      .filter((file) => file.endsWith(".json"));
    subraces = files.map((file) => {
      const filePath = path.join(subraceDir, file);
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">
        {data.name.charAt(0).toUpperCase() + data.name.slice(1)} Subraces
      </h1>
      {subraces.length > 0 ? (
        <div className="mt-8 space-y-6">
          {subraces.map((subrace, idx) => (
            <section
              key={subrace.name.toLowerCase().replace(/\s+/g, "_")}
              id={subrace.name.toLowerCase().replace(/\s+/g, "_")}
            >
              <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold text-orange-400 mb-2">
                  {subrace.name}
                </h3>

                {/* description */}
                {subrace.description && (
                  <p
                    className="text-gray-200 mb-3 universalLink racesLink"
                    dangerouslySetInnerHTML={{
                      __html: linkifyText(
                        subrace.description,
                        "universalLink racesLink"
                      ),
                    }}
                  />
                )}

                {/* table */}
                {subrace.table && subrace.table.headers && (
                  <div className="overflow-x-auto mb-3">
                    <table className="table-auto border-collapse border border-gray-600 w-full text-sm">
                      <thead>
                        <tr>
                          {subrace.table.headers.map((header, hIdx) => (
                            <th
                              key={hIdx}
                              className="border border-gray-600 px-3 py-1 bg-gray-700 text-gray-100"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {subrace.table.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
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
                {subrace.list && subrace.list.length > 0 && (
                  <ul className="list-disc list-inside text-gray-200">
                    {subrace.list.map((item, lIdx) => (
                      <li
                        key={lIdx}
                        className="universalLink racesLink"
                        dangerouslySetInnerHTML={{
                          __html: linkifyText(item, "universalLink racesLink"),
                        }}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-gray-200">No subraces available.</p>
      )}
    </section>
  );
}
