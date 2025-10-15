"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import CombatStyleCard from "./CombatStyleCard";
import * as Slider from "@radix-ui/react-slider";

const ROLE_OPTIONS = [
  "support",
  "tank",
  "debuffer",
  "sustain",
  "shielder",
  "utility",
  "specialist",
  "damage dealer",
  "controller",
  "summoner",
  "bruiser",
];

export default function IncumbencyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [allIncumbency, setAllIncumbency] = useState([]);

  const [roleFilters, setRoleFilters] = useState([]);
  const [hpMin, setHpMin] = useState("");
  const [hpMax, setHpMax] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [draftRoles, setDraftRoles] = useState([]);
  const [draftHpMin, setDraftHpMin] = useState(1);
  const [draftHpMax, setDraftHpMax] = useState(20);
  const DEFAULT_MIN = 1;
  const DEFAULT_MAX = 20;

  const [cvMin, setCvMin] = useState("");
  const [cvMax, setCvMax] = useState("");

  const [draftCvMin, setDraftCvMin] = useState(0);
  const [draftCvMax, setDraftCvMax] = useState(40);

  const CV_DEFAULT_MIN = 0;
  const CV_DEFAULT_MAX = 40;

  const [isMobile, setIsMobile] = useState(false);
  const [pane, setPane] = useState("list");
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const [loadingData, setLoadingData] = useState(true);
  const [loadingCard, setLoadingCard] = useState(false); // 🔹 tambahan

  const openFilter = () => {
    setDraftRoles(roleFilters);
    setDraftHpMin(hpMin === "" ? DEFAULT_MIN : Number(hpMin));
    setDraftHpMax(hpMax === "" ? DEFAULT_MAX : Number(hpMax));

    setDraftCvMin(cvMin === "" ? CV_DEFAULT_MIN : Number(cvMin));
    setDraftCvMax(cvMax === "" ? CV_DEFAULT_MAX : Number(cvMax));

    setFilterOpen(true);
  };

  const closeFilter = () => setFilterOpen(false);
  const toggleDraftRole = (role) =>
    setDraftRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  const resetDraft = () => {
    setDraftRoles([]);
    setDraftHpMin(DEFAULT_MIN);
    setDraftHpMax(DEFAULT_MAX);

    setDraftCvMin(CV_DEFAULT_MIN);
    setDraftCvMax(CV_DEFAULT_MAX);
  };

  const applyDraft = () => {
    setRoleFilters(draftRoles);

    // HP
    if (draftHpMin === DEFAULT_MIN && draftHpMax === DEFAULT_MAX) {
      setHpMin("");
      setHpMax("");
    } else {
      setHpMin(draftHpMin);
      setHpMax(draftHpMax);
    }

    // CV Minimum
    if (draftCvMin === CV_DEFAULT_MIN && draftCvMax === CV_DEFAULT_MAX) {
      setCvMin("");
      setCvMax("");
    } else {
      setCvMin(draftCvMin);
      setCvMax(draftCvMax);
    }

    setFilterOpen(false);
  };

  const activeFilterCount =
    (roleFilters.length ? 1 : 0) +
    (hpMin !== "" || hpMax !== "" ? 1 : 0) +
    (cvMin !== "" || cvMax !== "" ? 1 : 0);

  const fetchAllIncumbency = useCallback(async () => {
    try {
      setLoadingData(true);
      const res = await fetch("/api/incumbency/getAllData", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setAllIncumbency(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch incumbency:", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    fetchAllIncumbency();
  }, []);

  // 🔹 restore selected dari hash
  useEffect(() => {
    if (allIncumbency.length > 0) {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const found = allIncumbency.find(
          (i) =>
            i.name?.toLowerCase().replace(/\s+/g, "-") ===
            hash.toLowerCase()
        );
        if (found) {
          setSelected(found);
          return;
        }
      }
      if (selected == null) setSelected(allIncumbency[0]);
    }
  }, [allIncumbency]);

  // 🔹 update hash ketika selected berubah
  useEffect(() => {
    if (selected?.name) {
      const slug = selected.name.toLowerCase().replace(/\s+/g, "-");
      window.history.replaceState(null, "", `#${slug}`);
    }
  }, [selected]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return allIncumbency.filter((style) => {
      const name = (style.name || "").toLowerCase();
      const role = (style.role || "").toLowerCase();
      const hp = Number(style.hp_scale ?? style.hp ?? 0);

      const cv = Number(style.cv_minimum ?? 0);

      const matchesName = term === "" ? true : name.includes(term);
      const matchesRole =
        roleFilters.length === 0 ? true : roleFilters.includes(role);

      const minHPok = hpMin === "" ? true : hp >= Number(hpMin);
      const maxHPok = hpMax === "" ? true : hp <= Number(hpMax);

      const minCVok = cvMin === "" ? true : cv >= Number(cvMin);
      const maxCVok = cvMax === "" ? true : cv <= Number(cvMax);

      return (
        matchesName && matchesRole && minHPok && maxHPok && minCVok && maxCVok
      );
    });
  }, [allIncumbency, searchTerm, roleFilters, hpMin, hpMax, cvMin, cvMax]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onTouchStart = (e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e) => {
    if (!isMobile || touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (!isMobile) return;
    const dx = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;
    const THRESH = 60;
    if (pane === "list" && dx < -THRESH) setPane("detail");
    if (pane === "detail" && dx > THRESH) setPane("list");
  };

  const DesktopList = (
    <aside className="w-1/3 max-w-[300px] border-r border-[#2a2f55] p-4 flex flex-col">
      {/* === SEARCH BAR & FILTER BUTTON === */}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-[#0a1040] text-white placeholder-gray-400 border border-[#2a2f55] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#6670ff]"
        />
        <button
          onClick={openFilter}
          className="relative bg-[#101858] border border-[#2a2f55] hover:bg-[#1c2b7a] text-white px-3 py-2 rounded-md transition flex items-center justify-center"
          title="Filter"
        >
          <span className="text-sm font-semibold">☰</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-[#050b26] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* === LIST === */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {loadingData ? (
          [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="p-3 rounded-md border border-[#2a2f55] bg-[#0a1040] animate-pulse flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#1a1f4f] rounded-md" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-2/3 bg-[#1a1f4f] rounded" />
                <div className="h-2 w-1/3 bg-[#1a1f4f] rounded" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-10">
            No results found.
          </p>
        ) : (
          filtered.map((style) => (
            <div
              key={style.name}
              onClick={() => {
                setLoadingCard(true); 
                setTimeout(() => {
                  setSelected(style);
                  setLoadingCard(false);
                }, 500); 
                if (window.innerWidth < 768) setPane("detail");
              }}
              className={`p-3 rounded-md border border-[#2a2f55] cursor-pointer transition ${
                selected?.name === style.name
                  ? "bg-[#1c2b7a]"
                  : "bg-[#0a1040] hover:bg-[#101858]"
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={style.img || "/assets/example_token.png"}
                  alt={style.name}
                  loading="lazy"
                  onError={(e) => (e.target.src = "/assets/example_token.png")}
                  className="w-10 h-10 rounded-md object-cover border border-[#2a2f55]"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{style.name}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {style.role}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );

  const DesktopDetail = (
    <main className="flex-1 flex justify-center items-start p-10">
      {loadingCard ? (
        <div className="text-gray-400 animate-pulse">Loading...</div>
      ) : selected ? (
        <CombatStyleCard data={selected} folder={selected.name} />
      ) : (
        <p className="text-gray-400 text-lg">Select one</p>
      )}
    </main>
  );

  // === MOBILE & FILTER MODAL ===
  return (
    <div className="min-h-screen bg-[#050b26] text-white w-full max-w-6xl mx-auto">
      <div className="hidden md:flex w-full min-h-screen">
        {DesktopList}
        {DesktopDetail}
      </div>

      <div
        className="md:hidden relative min-h-screen overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between bg-[#050b26]/90 backdrop-blur border-b border-[#2a2f55] px-3 py-2">
          {pane === "detail" ? (
            <button
              onClick={() => setPane("list")}
              className="px-2 py-1 text-sm rounded-md border border-[#2a2f55] bg-[#101858] hover:bg-[#19246e]"
            >
              Back
            </button>
          ) : (
            <span />
          )}
        </div>

        <div
          className={`transition-all duration-300 ease-in-out flex w-[200%] ${
            pane === "detail" ? "opacity-100" : "opacity-95"
          }`}
          style={{
            transform: pane === "list" ? "translateX(0%)" : "translateX(-50%)",
          }}
        >
          <section className="w-1/2 min-w-[50%] px-4 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-[#0a1040] text-white placeholder-gray-400 border border-[#2a2f55] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#6670ff]"
              />
              <button
                onClick={openFilter}
                className="relative bg-[#101858] border border-[#2a2f55] hover:bg-[#1c2b7a] text-white px-3 py-2 rounded-md transition flex items-center justify-center"
                title="Filter"
              >
                <span className="text-sm font-semibold">☰</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-[#050b26] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            <div className="space-y-2">
              {filtered.map((style) => (
                <div
                  key={style.name}
                  onClick={() => {
                    setLoadingCard(true);
                    setTimeout(() => {
                      setSelected(style);
                      setLoadingCard(false);
                    }, 1000);
                    setPane("detail");
                  }}
                  className={`p-3 rounded-md border border-[#2a2f55] cursor-pointer transition ${
                    selected?.name === style.name
                      ? "bg-[#1c2b7a]"
                      : "bg-[#0a1040] hover:bg-[#101858]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={style.img || "/assets/example_token.png"}
                      alt={style.name}
                      className="w-10 h-10 rounded-md object-cover border border-[#2a2f55]"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">{style.name}</p>
                      <p className="text-xs text-gray-400 capitalize">
                        {style.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-gray-500 text-sm text-center mt-10">
                  No results found.
                </p>
              )}
            </div>
          </section>

          <section className="w-1/2 min-w-[50%] p-4">
            <div className="flex justify-center items-start">
              {loadingCard ? (
                <div className="text-gray-400 animate-pulse">Loading...</div>
              ) : selected ? (
                <CombatStyleCard data={selected} folder={selected.name} />
              ) : (
                <p className="text-gray-400 text-sm">Select Incumbency</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {filterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/60" onClick={closeFilter} />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-[#2a2f55] bg-[#0a1040] p-4 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-300 mb-2">
                Roles
              </div>
              <div className="flex flex-wrap gap-2">
                {ROLE_OPTIONS.map((r) => {
                  const active = draftRoles.includes(r);
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => toggleDraftRole(r)}
                      className={`px-2.5 py-1 rounded-md border text-xs capitalize transition
                        ${
                          active
                            ? "border-emerald-700 bg-emerald-600/20 text-emerald-200"
                            : "border-[#2a2f55] bg-[#101858] text-gray-300 hover:bg-[#19246e]"
                        }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-300">
                  HP Range
                </span>
                <span className="text-[11px] text-gray-400">
                  {draftHpMin} – {draftHpMax}
                </span>
              </div>

              <Slider.Root
                className="relative flex items-center select-none w-full h-5"
                min={1}
                max={20}
                step={1}
                value={[draftHpMin, draftHpMax]}
                onValueChange={(val) => {
                  setDraftHpMin(val[0]);
                  setDraftHpMax(val[1]);
                }}
              >
                <Slider.Track className="bg-[#1c2b7a] relative flex-grow rounded-full h-[4px]">
                  <Slider.Range className="absolute bg-emerald-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-4 h-4 bg-emerald-500 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  aria-label="Min HP"
                />
                <Slider.Thumb
                  className="block w-4 h-4 bg-emerald-500 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  aria-label="Max HP"
                />
              </Slider.Root>

              <div className="flex justify-between w-full text-[11px] text-gray-400 mt-2">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-300">
                  CV Minimum
                </span>
                <span className="text-[11px] text-gray-400">
                  {draftCvMin} – {draftCvMax}
                </span>
              </div>

              <Slider.Root
                className="relative flex items-center select-none w-full h-5"
                min={CV_DEFAULT_MIN}
                max={CV_DEFAULT_MAX}
                step={1}
                value={[draftCvMin, draftCvMax]}
                onValueChange={(val) => {
                  setDraftCvMin(val[0]);
                  setDraftCvMax(val[1]);
                }}
              >
                <Slider.Track className="bg-[#1c2b7a] relative flex-grow rounded-full h-[4px]">
                  <Slider.Range className="absolute bg-emerald-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-4 h-4 bg-emerald-500 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  aria-label="Min CV"
                />
                <Slider.Thumb
                  className="block w-4 h-4 bg-emerald-500 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  aria-label="Max CV"
                />
              </Slider.Root>

              <div className="flex justify-between w-full text-[11px] text-gray-400 mt-2">
                <span>0</span>
                <span>40</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={resetDraft}
                className="px-3 py-2 text-sm rounded-md border border-[#2a2f55] bg-[#101858] hover:bg-[#19246e]"
              >
                Reset
              </button>
              <button
                onClick={closeFilter}
                className="px-3 py-2 text-sm rounded-md border border-[#2a2f55] bg-[#101858] hover:bg-[#19246e]"
              >
                Cancel
              </button>
              <button
                onClick={applyDraft}
                className="px-3 py-2 text-sm rounded-md border border-emerald-700 bg-emerald-600/20 text-emerald-200 hover:bg-emerald-600/30"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
