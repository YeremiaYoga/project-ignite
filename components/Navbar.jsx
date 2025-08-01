"use client";

import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeColors, setShowThemeColors] = useState(false);
  const [colors, setColors] = useState({
    sub1: "#3b82f6",
    sub2: "#10b981",
    bgTop: "#1f2937",
    bgMiddle: "#1f1f1f",
    bgBottom: "#111827",
  });

  const menuRef = useRef(null);

  useEffect(() => {
    const storedColors = {
      sub1: Cookies.get("ignite-hyperlink-color-sub1") || "#3b82f6",
      sub2: Cookies.get("ignite-hyperlink-color-sub2") || "#10b981",
      bgTop: Cookies.get("ignite-bg-top-color") || "#1f2937",
      bgMiddle: Cookies.get("ignite-bg-middle-color") || "#1f1f1f",
      bgBottom: Cookies.get("ignite-bg-bottom-color") || "#111827",
    };
    setColors(storedColors);
    applyCSSVariables(storedColors);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
        setShowThemeColors(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyCSSVariables = (colorObj) => {
    document.documentElement.style.setProperty(
      "--hyperlink-sub1",
      colorObj.sub1
    );
    document.documentElement.style.setProperty(
      "--hyperlink-sub2",
      colorObj.sub2
    );
    document.documentElement.style.setProperty("--bg-top", colorObj.bgTop);
    document.documentElement.style.setProperty(
      "--bg-middle",
      colorObj.bgMiddle
    );
    document.documentElement.style.setProperty(
      "--bg-bottom",
      colorObj.bgBottom
    );
  };

  const handleColorChange = (e, type) => {
    const newColor = e.target.value;
    const updatedColors = { ...colors, [type]: newColor };
    setColors(updatedColors);

    const cookieKey =
      type === "bgMiddle"
        ? "ignite-bg-middle-color"
        : type === "bgTop"
        ? "ignite-bg-top-color"
        : type === "bgBottom"
        ? "ignite-bg-bottom-color"
        : `ignite-hyperlink-color-${type}`;

    Cookies.set(cookieKey, newColor, { expires: 365 });
    applyCSSVariables(updatedColors);
  };

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center relative">
        <Link href="/" className="text-xl font-bold">
          Home
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            className="text-gray-300 hover:text-white"
            aria-label="Settings"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <CircleUserRound size={28} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50 p-4 space-y-3 text-sm">
              <button
                onClick={() => setShowThemeColors(!showThemeColors)}
                className="w-full text-left font-semibold text-gray-800 dark:text-gray-200 hover:underline"
              >
                {showThemeColors ? "Back" : "Customize Theme"}
              </button>

              {showThemeColors && (
                <div className="space-y-3 mt-2">
                  {[
                    ["Hyperlink Sub1", "sub1"],
                    ["Hyperlink Sub2", "sub2"],
                    ["Background Top", "bgTop"],
                    ["Background Middle", "bgMiddle"],
                    ["Background Bottom", "bgBottom"],
                  ].map(([label, key]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700 dark:text-gray-100">
                        {label}
                      </span>
                      <input
                        type="color"
                        value={colors[key]}
                        onChange={(e) => handleColorChange(e, key)}
                        className="w-8 h-8 bg-transparent border-none cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
