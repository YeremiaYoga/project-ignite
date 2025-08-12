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
    { label: "Races", icon: <Users size={64} />, link: "/races" },
    { label: "Classes", icon: <GraduationCap size={64} />, link: "/classes" },
    { label: "Feats", icon: <Scroll size={64} />, link: "/feats" },
    { label: "Backgrounds", icon: <Users2 size={64} />, link: "/backgrounds" },
    { label: "Items", icon: <Package size={64} />, link: "/items" },
    { label: "Spells", icon: <Sparkles size={64} />, link: "/spells" },
  ];

  return (
    <main className="min-h-screen mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {playersMenu.map((item) => (
            <a
              key={item.label}
              href={item.link}
              className="flex flex-col items-center justify-center  p-8 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-gray-700 transition-transform transform hover:-translate-y-2"
            >
              <div className="mb-4 text-orange-400">{item.icon}</div>
              <span className="text-lg font-semibold">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
