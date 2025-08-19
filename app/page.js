"use client";

import {
  Users,
  GraduationCap,
  Scroll,
  Users2,
  Package,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const playersMenu = [
    { label: "Races", icon: <Users className="w-12 h-12 sm:w-16 sm:h-16" />, link: "/races" },
    { label: "Classes", icon: <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16" />, link: "/classes" },
    { label: "Feats", icon: <Scroll className="w-12 h-12 sm:w-16 sm:h-16" />, link: "/feats" },
    { label: "Backgrounds", icon: <Users2 className="w-12 h-12 sm:w-16 sm:h-16" />, link: "/backgrounds" },
    { label: "Items", icon: <Package className="w-12 h-12 sm:w-16 sm:h-16" />, link: "/items" },
    { label: "Spells", icon: <Sparkles className="w-12 h-12 sm:w-16 sm:h-16" />, link: "/spells" },
  ];

  return (
    <main className="min-h-screen mt-6 sm:mt-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {playersMenu.map((item) => (
            <a
              key={item.label}
              href={item.link}
              className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-gray-700 transition-transform transform hover:-translate-y-2"
            >
              <div className="mb-3 sm:mb-4 text-orange-400">{item.icon}</div>
              <span className="text-sm sm:text-lg font-semibold text-center">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
