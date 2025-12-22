// app/creator/dashboard/page.jsx
"use client";

import { useState } from "react";
import {
  Globe2,
  BookOpenText,
  Map,
  Users,
  Layers,
  Settings,
  Hourglass 
} from "lucide-react";

const MENU_CONFIG = [
  {
    id: "timeline",
    icon: Hourglass ,
    label: "Time Line",
    items: ["Era", "Calender", "Event"],
  },
  //   {
  //     id: "articles",
  //     icon: BookOpenText,
  //     label: "Articles",
  //     items: ["All Articles", "Drafts", "Categories"],
  //   },
  //   {
  //     id: "maps",
  //     icon: Map,
  //     label: "Maps",
  //     items: ["All Maps", "Create Map", "Pins & Layers"],
  //   },
  //   {
  //     id: "characters",
  //     icon: Users,
  //     label: "Characters",
  //     items: ["All Characters", "Organizations"],
  //   },
  //   {
  //     id: "meta",
  //     icon: Layers,
  //     label: "Meta",
  //     items: ["Timelines", "Plots", "Story Arcs"],
  //   },
  //   {
  //     id: "settings",
  //     icon: Settings,
  //     label: "Settings",
  //     items: ["Profile", "World Settings", "Billing"],
  //   },
];

export default function CreatorDashboard() {
  const [activeMenu, setActiveMenu] = useState("world");
  const current = MENU_CONFIG.find((m) => m.id === activeMenu);

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      {/* LEFT ICON BAR */}
      <aside className="w-16 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 gap-4">
        <nav className="flex-1 flex flex-col items-center gap-2">
          {MENU_CONFIG.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.id;

            return (
              <button
                key={menu.id}
                type="button"
                onClick={() => setActiveMenu(menu.id)}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition
                  ${
                    isActive
                      ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-900/60"
                      : "bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -right-[6px] inset-y-1 rounded-l-full w-[3px] bg-indigo-400" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* RIGHT SIDE – MENU PANEL + KONTEN */}
      <div className="flex-1 flex h-full">
        {/* MENU PANEL */}
        <section className="w-64 bg-slate-900/80 border-r border-slate-800 backdrop-blur-sm p-4 flex flex-col">
          <div className="mb-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Creator Panel
            </p>
            <h2 className="text-sm font-semibold text-slate-100 mt-1">
              {current?.label}
            </h2>
          </div>

          <div className="space-y-1 text-sm overflow-y-auto">
            {current?.items.map((item) => (
              <button
                key={item}
                type="button"
                className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white text-xs"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN AREA */}
        <main className="flex-1 p-6 flex">
          <div className="flex-1 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 flex items-center justify-center text-sm text-slate-400">
            <div className="text-center space-y-2 max-w-xl px-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Creator Workspace
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
