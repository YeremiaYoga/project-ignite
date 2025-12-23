"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_CONFIG } from "../menuConfig";

export default function LeftIconBar() {
  const pathname = usePathname();

  const isMenuActive = (menu) => {
    // aktif kalau sedang berada di subtree yg sama
    // contoh: /creator/timeline/*
    const base = menu.href.split("/").slice(0, 3).join("/"); // "/creator/timeline"
    return pathname.startsWith(base);
  };

  return (
    <aside className="w-16 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 gap-4">
      <nav className="flex-1 flex flex-col items-center gap-2">
        {MENU_CONFIG.map((menu) => {
          const Icon = menu.icon;
          const active = isMenuActive(menu);

          return (
            <Link
              key={menu.id}
              href={menu.href}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition
                ${
                  active
                    ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-900/60"
                    : "bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              title={menu.label}
              aria-label={menu.label}
            >
              <Icon className="w-5 h-5" />
              {active && (
                <span className="absolute -right-[6px] inset-y-1 rounded-l-full w-[3px] bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
