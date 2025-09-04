"use client";
import { linkifyText } from "@/utils/linkifyText";
export default function FeatureContent({ content, level }) {
  return (
    <>
      {content.map((item, idx) => {
        if (item.type === "paragraph") {
          return (
            <p
              key={idx}
              className="text-zinc-300 mb-2 leading-relaxed text-base"
              dangerouslySetInnerHTML={{
                __html: linkifyText(item.value, "universalLink classesLink"),
              }}
            />
          );
        }
        if (item.type === "list") {
          if (
            item.items.length > 0 &&
            typeof item.items[0] === "object" &&
            item.items[0].label
          ) {
            return (
              <ul
                key={idx}
                className="list-disc list-inside text-zinc-300 space-y-2 break-words"
              >
                {item.items.map((li, i) => (
                  <li key={i}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: linkifyText(li, "universalLink classesLink"),
                      }}
                    />
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <ul
              key={idx}
              className="list-disc list-inside text-zinc-300 space-y-2"
            >
              {item.items.map((li, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: linkifyText(li, "universalLink classesLink"),
                  }}
                ></li>
              ))}
            </ul>
          );
        }
        if (item.type === "note") {
          return (
            <div key={idx} className="text-zinc-400 italic">
              <div className=" p-3 my-3 rounded">
                <div className="font-bold mb-1">{item.value}</div>
                {item.content &&
                  item.content.map((text, i) => (
                    <div key={i} className="text-sm">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: linkifyText(
                            text,
                            "universalLink classesLink"
                          ),
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          );
        }
        if (item.type === "heading") {
          return (
            <h3 key={idx} className="text-xl font-semibold text-blue-300 mb-2">
              {item.value}
            </h3>
          );
        }
        if (item.type === "table") {
          return (
            <div key={idx} className="overflow-x-auto mb-6">
              <table className="min-w-full border border-zinc-700 text-base text-left">
                <thead className="bg-blue-900 text-blue-200">
                  <tr>
                    {item.headers.map((header, i) => (
                      <th
                        key={i}
                        className="py-2 px-4 border-b border-zinc-700"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.rows.map((row, i) => {
                    if (row[0] === "Archived Unearthed Arcana") {
                      return (
                        <tr key={i} className="bg-zinc-800 text-zinc-400">
                          <td
                            className="py-2 px-4 bg-blue-900 text-blue-200"
                            colSpan={item.headers.length}
                          >
                            <p
                              dangerouslySetInnerHTML={{
                                __html: linkifyText(
                                  row[0],
                                  "universalLink classesLink"
                                ),
                              }}
                            />
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={i} className="border-b border-zinc-700">
                        {row.map((cell, j) => (
                          <td key={j} className="py-2 px-4">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: linkifyText(
                                  cell,
                                  "universalLink classesLink"
                                ),
                              }}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
