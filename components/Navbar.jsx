"use client";

import Link from "next/link";
import { UserCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [linkColor, setLinkColor] = useState("#3b82f6"); // default: blue-500
  const menuRef = useRef(null);

  // Ambil warna dari cookie saat pertama kali mount
  useEffect(() => {
    const savedColor = Cookies.get("ignite-hyperlink-color");
    if (savedColor) {
      setLinkColor(savedColor);
      document.documentElement.style.setProperty(
        "--hyperlink-color",
        savedColor
      );
    }
  }, []);

  // Tutup menu jika klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler ubah warna dan simpan ke cookie
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setLinkColor(newColor);
    Cookies.set("ignite-hyperlink-color", newColor, { expires: 365 });
    document.documentElement.style.setProperty("--hyperlink-color", newColor);
  };

  return (
    <nav className="w-full bg-gray-950 border-b border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center relative">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Home
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            className="text-gray-300 hover:text-white"
            aria-label="Profile"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <UserCircle size={32} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50 p-2">
              <div className="flex justify-between items-center">
                <Link
                  href="/settings/hyperlink-color"
                  className="text-sm text-gray-800 dark:text-gray-100 hover:underline"
                >
                  Hyperlink Color
                </Link>
                <input
                  type="color"
                  value={linkColor}
                  onChange={handleColorChange}
                  className="w-8 h-8 border-none cursor-pointer bg-transparent"
                  title="Pick hyperlink color"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
