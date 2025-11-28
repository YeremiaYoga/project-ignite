"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import UserMenu from "./UserMenu";
import AnnouncementPill from "./AnnouncementPill";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-2 grid grid-cols-3 items-center relative">
        <div className="flex items-center gap-2">
          <div className="md:hidden relative" ref={mobileMenuRef}>
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
          <div className="md:hidden">
            <AnnouncementPill
              position="left"
              variant="icon"
              iconPxOverride={16}
              imagePxOverride={20}
            />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/" className="flex items-stretch space-x-2 p-2">
              <Image
                src="/assets/project_ignite_logo2.webp"
                alt="Ignite Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <AnnouncementPill
              position="left"
              variant="pill"
              iconPxOverride={20}
              imagePxOverride={24}
            />
          </div>
        </div>


        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-stretch space-x-2 p-2 md:hidden"
          >
            <Image
              src="/assets/project_ignite_logo2.webp"
              alt="Ignite Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>


        <div className="flex justify-end items-center gap-3">
          <AnnouncementPill
            position="right"
            variant="icon"
            className="md:hidden"
            iconPxOverride={16}
            imagePxOverride={20}
          />

          <AnnouncementPill
            position="right"
            variant="pill"
            className="hidden md:inline-flex"
            iconPxOverride={20}
            imagePxOverride={24}
          />

          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
