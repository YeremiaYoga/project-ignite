"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { MENU_CONFIG } from "../menuConfig";

function getMenuBase(href) {
  return href.split("/").slice(0, 3).join("/");
}

export default function CreatorSideNav() {
  const pathname = usePathname();

  // sheet mobile open/close
  const [open, setOpen] = useState(false);

  // menu aktif berdasar URL (default saat load / pindah halaman)
  const routeMenu = useMemo(() => {
    return (
      MENU_CONFIG.find((m) => pathname.startsWith(getMenuBase(m.href))) ||
      MENU_CONFIG[0]
    );
  }, [pathname]);

  // menu yang dipilih user via icon (desktop & mobile)
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  // saat pindah halaman: reset sheet & selection -> balik mengikuti URL
  useEffect(() => {
    setOpen(false);
    setSelectedMenuId(null);
  }, [pathname]);

  const selectedMenu =
    MENU_CONFIG.find((m) => m.id === selectedMenuId) || routeMenu;

  const isRouteActive = (menu) => pathname.startsWith(getMenuBase(menu.href));
  const isSelected = (menu) => selectedMenu?.id === menu.id;

  // klik icon = switch content (NO NAVIGATE)
  const onPickMenu = (menuId) => setSelectedMenuId(menuId);

  return (
    <>
      {/* ================= DESKTOP (md+) ================= */}
      <div className="hidden md:flex h-full">
        {/* Left Icon Bar (NO LINK, ONLY BUTTON) */}
        <aside className="w-16 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 gap-4 shrink-0">
          <nav className="flex-1 flex flex-col items-center gap-2">
            {MENU_CONFIG.map((menu) => {
              const Icon = menu.icon;
              const routeActive = isRouteActive(menu);
              const picked = isSelected(menu);

              return (
                <button
                  key={menu.id}
                  type="button"
                  onClick={() => onPickMenu(menu.id)}
                  className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition
                    ${
                      picked
                        ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-900/60"
                        : "bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  title={menu.label}
                  aria-label={menu.label}
                >
                  <Icon className="w-5 h-5" />
                  {/* indikator route active (biar tau posisi URL sekarang) */}
                  {routeActive && (
                    <span className="absolute -right-[6px] inset-y-1 w-[3px] rounded-l-full bg-indigo-300" />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Panel (items ikut selectedMenu) */}
        <section className="w-64 bg-slate-900/80 border-r border-slate-800 backdrop-blur-sm p-4 flex flex-col overflow-hidden">
          <div className="mb-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Creator Panel
            </p>
            <h2 className="text-sm font-semibold text-slate-100 mt-1">
              {selectedMenu?.label}
            </h2>
          </div>

          <div className="space-y-1 text-sm overflow-y-auto">
            {selectedMenu?.items?.map((item) => {
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
      </div>

      {/* ================= MOBILE ================= */}

      {/* overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Bottom sheet (di atas tombol) */}
      <section
        className={[
          "md:hidden fixed left-0 right-0 z-50",
          "bottom-[84px]",
          "transition-transform duration-200 ease-out",
          open ? "translate-y-2" : "translate-y-[140%]",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-[560px] px-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-sm shadow-2xl overflow-hidden">
            {/* header */}
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                {selectedMenu?.label}
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg border border-slate-700 bg-slate-900/60 flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-slate-300" />
              </button>
            </div>

            {/* icon switcher row (NO NAVIGATE) */}
            <div className="px-3 py-3 border-b border-slate-800">
              <div className="flex items-center gap-2 overflow-x-auto">
                {MENU_CONFIG.map((menu) => {
                  const Icon = menu.icon;
                  const picked = isSelected(menu);

                  return (
                    <button
                      key={menu.id}
                      type="button"
                      onClick={() => onPickMenu(menu.id)}
                      className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center transition
                        ${
                          picked
                            ? "bg-indigo-600/20 text-white border border-indigo-500/30"
                            : "bg-slate-950/40 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                        }`}
                      title={menu.label}
                      aria-label={menu.label}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* items (NAVIGATE) */}
            <div className="max-h-[50vh] overflow-y-auto p-2">
              <div className="space-y-1 text-sm">
                {selectedMenu?.items?.map((item) => {
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
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
            </div>
          </div>
        </div>
      </section>

      {/* Floating Button: always MENU icon */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden fixed z-[60] left-3 bottom-6 w-12 h-12 rounded-full
          bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-900/50
          flex items-center justify-center border border-indigo-500/30"
        aria-label={open ? "Close menu" : "Open menu"}
        title={open ? "Close menu" : "Open menu"}
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
}
