"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center relative">
        {/* Mobile menu */}
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

        {/* Logo */}
        <Link href="/" className="flex items-stretch space-x-2 p-2">
          <Image
            src="/assets/project_ignite_logo.webp"
            alt="Ignite Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* User menu */}
        <UserMenu />
      </div>
    </nav>
  );
}
