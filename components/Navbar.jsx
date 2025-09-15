"use client";

import Link from "next/link";
import { Menu, X, CircleUserRound } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useTalesMode } from "@/context/TalesModeContext";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useUser,
  useClerk,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showThemeColors, setShowThemeColors] = useState(false);
  const [talesMode, setTalesMode] = useState(false);
  const [colors, setColors] = useState({
    sub1: "#3b82f6",
    sub2: "#10b981",
    bgTop: "#1f2937",
    bgMiddle: "#1f1f1f",
    bgBottom: "#111827",
  });

  const { user } = useUser();
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { signOut } = useClerk();

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

    const storedTales = Cookies.get("ignite-tales-mode");
    setTalesMode(storedTales === "true");
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
        setShowThemeColors(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyCSSVariables = (colorObj) => {
    Object.entries(colorObj).forEach(([key, val]) => {
      let varName;
      if (key === "sub1" || key === "sub2") {
        varName = `--hyperlink-${key}`;
      } else if (key === "bgTop") {
        varName = "--bg-top";
      } else if (key === "bgMiddle") {
        varName = "--bg-middle";
      } else if (key === "bgBottom") {
        varName = "--bg-bottom";
      }
      document.documentElement.style.setProperty(varName, val);
    });
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

  const toggleTalesMode = () => {
    const newValue = !talesMode;
    setTalesMode(newValue);
    Cookies.set("ignite-tales-mode", newValue.toString(), { expires: 365 });
  };

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center relative">
        <div className="md:hidden" ref={mobileMenuRef}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          {isMobileMenuOpen && (
            <div className="absolute left-1 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50 p-3 space-y-2">
              {["Spells", "Classes", "Races"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block text-gray-800 dark:text-gray-200 hover:underline"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/" className="flex items-stretch space-x-2 p-2">
          <Image
            src="/assets/ignite_logo.webp"
            alt="Ignite Logo"
            width={44}
            height={44}
            className="object-contain"
          />

          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold">Project Ignite</span>
            <span className="text-xs text-teal-400 self-end p-(-2)">
              Firefly
            </span>
          </div>
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            className="text-gray-300 hover:text-white"
            aria-label="User Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <CircleUserRound size={28} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50 p-4 space-y-3 text-sm">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="block w-full text-left font-semibold text-gray-800 dark:text-gray-200 hover:underline">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                    {user?.fullName || user?.primaryEmailAddress?.emailAddress}
                  </span>
                  <button
                    onClick={() => signOut(() => (window.location.href = "/"))}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              </SignedIn>

              {/* Tales Mode Slider */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-100 font-semibold">
                  Tales Mode
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={talesMode}
                    onChange={toggleTalesMode}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition"></div>
                  <div className="absolute left-0.5 top-0.5 bg-white dark:bg-gray-300 h-5 w-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>

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
