"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_CONFIG } from "../menuConfig";

export default function CreatorMenuPanel() {
  const pathname = usePathname();

  const current =
    MENU_CONFIG.find((m) => {
      const base = m.href.split("/").slice(0, 3).join("/"); // "/creator/timeline"
      return pathname.startsWith(base);
    }) || MENU_CONFIG[0];

  return (
    <section className="w-64 bg-slate-900/80 border-r border-slate-800 backdrop-blur-sm p-4 flex flex-col overflow-hidden">
      <div className="mb-3">
        <p className="text-[11px] uppercase tracking-wide text-slate-400">
          Creator Panel
        </p>
        <h2 className="text-sm font-semibold text-slate-100 mt-1">
          {current?.label}
        </h2>
      </div>

      <div className="space-y-1 text-sm overflow-y-auto">
        {current?.items?.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block w-full text-left px-3 py-2 rounded-lg text-xs transition
                ${
                  active
                    ? "bg-indigo-600/20 text-white border border-indigo-500/30"
                    : "text-slate-200 hover:bg-slate-800/80 hover:text-white"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
