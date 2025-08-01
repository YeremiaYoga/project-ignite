"use client";

import Link from "next/link";
import { useState } from "react";

const classList = [
  "artificer",
  "barbarian",
  "bard",
  "blood-hunter",
  "cleric",
  "druid",
  "fighter",
  "monk",
  //   "mystic",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
];

export default function ClassesLayout({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const getIconSrc = (className) => {
    const normalized = className.replace("-", "_"); // blood-hunter → blood_hunter
    return `/assets/classIcon/${normalized}_icon.webp`;
  };
  return (
    <div className="relative min-h-screen text-white ">
      <div className="">{children}</div>

      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed bottom-6 left-6 bg-blue-600 hover:bg-blue-700 text-white text-lg px-4 py-2 rounded-full shadow-lg z-50"
      >
        {showMenu ? "Close" : "Classes"}
      </button>

      {showMenu && (
        <div className="fixed bottom-20 left-6 w-50 bg-gray-800 border border-gray-700 rounded-xl p-4 z-40 max-h-[60vh] overflow-y-auto shadow-2xl">
          <ul className="space-y-3">
            {classList.map((className) => (
              <li key={className}>
                <Link
                  href={`/classes/${className}`}
                  className="text-blue-400 hover:text-blue-200 transition capitalize flex gap-2"
                >
                  <img
                    src={getIconSrc(className)}
                    alt={`${className} icon`}
                    className="w-6 h-6 object-contain flex-shrink-0"
                  />
                  {className.replace("-", " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
