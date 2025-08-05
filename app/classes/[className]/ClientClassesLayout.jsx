"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const classList = [
  "artificer",
  "barbarian",
  "bard",
  "blood-hunter",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
];

export default function ClientClassesLayout({ children, currentClass }) {
  const [showClasses, setShowClasses] = useState(false);
  const [showSubclasses, setShowSubclasses] = useState(false);
  const [subclasses, setSubclasses] = useState([]);
  const [activeSubclasses, setActiveSubclasses] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleToggleSubclass = (key) => {
    setActiveSubclasses((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  useEffect(() => {
    const urlSubclasses = searchParams.get("subclasses");
    if (urlSubclasses) {
      setActiveSubclasses(urlSubclasses.split(","));
    } else {
      setActiveSubclasses([]);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeSubclasses.length > 0) {
      params.set("subclasses", activeSubclasses.join(","));
    } else {
      params.delete("subclasses");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeSubclasses]);

  useEffect(() => {
    if (!currentClass) return;

    import(`@/data/classes/${currentClass}/subclassData.js`)
      .then((mod) => setSubclasses(mod.default || []))
      .catch(() => setSubclasses([]));
  }, [currentClass]);

  const getIconSrc = (name) => {
    const normalized = name.replace(/-/g, "_");
    return `/assets/classIcon/${normalized}_icon.webp`;
  };

  return (
    <div className="relative min-h-screen text-white">
      {children && typeof children === "function"
        ? children({ activeSubclasses, handleToggleSubclass })
        : children}

      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50">
        <button
          onClick={() => {
            setShowSubclasses((prev) => !prev);
            setShowClasses(false);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-4 py-2 rounded-full shadow-lg"
        >
          {showSubclasses ? "Close" : "Subclass"}
        </button>
        <button
          onClick={() => {
            setShowClasses((prev) => !prev);
            setShowSubclasses(false);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-4 py-2 rounded-full shadow-lg"
        >
          {showClasses ? "Close" : "Classes"}
        </button>
      </div>

      {showSubclasses && subclasses.length > 0 && (
        <div className="fixed bottom-36 left-6 w-60 bg-gray-800 border border-gray-700 rounded-xl p-4 z-40 max-h-[60vh] overflow-y-auto shadow-2xl">
          <h3 className="text-sm font-semibold text-orange-400 mb-2 uppercase">
            Subclasses
          </h3>
          <ul className="space-y-2">
            {subclasses.map((sub) => (
              <li key={sub.key}>
                <button
                  onClick={() => handleToggleSubclass(sub.key)}
                  className={`w-full text-left text-sm px-3 py-1 rounded flex items-center gap-2 transition border ${
                    activeSubclasses.includes(sub.key)
                      ? "border-blue-400 text-white"
                      : "border-zinc-700 text-zinc-300"
                  }`}
                >
                  {sub.key
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showClasses && (
        <div className="fixed bottom-36 left-6 w-60 bg-gray-800 border border-gray-700 rounded-xl p-4 z-40 max-h-[60vh] overflow-y-auto shadow-2xl">
          <h3 className="text-sm font-semibold text-orange-400 mb-2 uppercase">
            Classes
          </h3>
          <ul className="space-y-2">
            {classList.map((className) => (
              <li key={className}>
                <Link
                  href={`/classes/${className}`}
                  className="text-blue-400 hover:text-blue-200 flex items-center gap-2 transition capitalize"
                >
                  <img
                    src={getIconSrc(className)}
                    alt={`${className} icon`}
                    className="w-5 h-5 object-contain"
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
