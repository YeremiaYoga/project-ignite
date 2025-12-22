// app/feats/FoundryFeatView.jsx
"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { SlidersHorizontal } from "lucide-react";

import FeatDetail from "./components/FeatDetail";
import FeatFilterModal from "./components/FeatFilterModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// bikin slug /feats?feat=feat-name
function makeSlug(feat) {
  const name = (feat.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `feat-${name || "unknown"}`;
}

export function getFeatSummary(feat) {
  const desc = (feat.description || feat.feat || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!desc) return "No description";
  if (desc.length <= 100) return desc;
  return desc.slice(0, 100) + "…";
}

// ambil level dari prerequisites
function getFeatLevel(feat) {
  const lvl =
    feat?.prerequisites && typeof feat.prerequisites.level === "number"
      ? feat.prerequisites.level
      : null;
  return lvl;
}

// ambil repeatable boolean (masih dipakai di detail/list kalau perlu)
function getFeatRepeatable(feat) {
  return !!(feat?.prerequisites && feat.prerequisites.repeatable === true);
}

// ambil kind / type label (General, Origin, dll)
function getFeatKind(feat) {
  return (feat.subtype || feat.feat_type || "").trim();
}

// SORT OPTIONS – cuma name & level
const SORT_OPTIONS = [
  { value: "name_asc", label: "Name (A → Z)" },
  { value: "name_desc", label: "Name (Z → A)" },
  { value: "level_asc", label: "Level (Low → High)" },
  { value: "level_desc", label: "Level (High → Low)" },
];

export default function FoundryFeatView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [feats, setFeats] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Filter: Feat Type, Level min/max, Repeatable
  const [filters, setFilters] = useState({
    type: [], // ["Epic Boon", "Fighting Style", "General Feat", "Origin Feat"]
    levelMin: null, // 0–20
    levelMax: null, // 0–20
    repeatable: false, // true / false
  });

  const [sortMode, setSortMode] = useState("name_asc");
  const [filterOpen, setFilterOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [pane, setPane] = useState("list");
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  // detect mobile
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

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 600);
    return () => clearTimeout(t);
  }, [search]);

  // === FETCH FEATS – search + filter + sort via API ===
  useEffect(() => {
    async function fetchFeats() {
      try {
        setLoading(true);
        setError("");

        const isLoggedIn = !!Cookies.get("ignite-user-data");
        const baseUrl = isLoggedIn
          ? `${API_BASE}/ignite/feats/all`
          : `${API_BASE}/ignite/feats`;

        const params = new URLSearchParams();

        if (debouncedSearch.trim() !== "") {
          params.set("q", debouncedSearch.trim());
        }


        if (filters.type && filters.type.length > 0) {
  
          params.set("feat_type", filters.type.join(","));
        }


        // 🎯 Level Range
        if (typeof filters.levelMin === "number") {
          params.set("level_min", String(filters.levelMin));
        }
        if (typeof filters.levelMax === "number") {
          params.set("level_max", String(filters.levelMax));
        }

        // 🎯 Repeatable
        if (filters.repeatable) {
          params.set("repeatable", "true");
        }

        // 🎛 Sort: API handle name / created_at, level sort nanti di client
        let sort_by = "created_at";
        let sort_order = "desc";

        switch (sortMode) {
          case "name_asc":
            sort_by = "name";
            sort_order = "asc";
            break;
          case "name_desc":
            sort_by = "name";
            sort_order = "desc";
            break;
          case "level_asc":
          case "level_desc":
          default:
            sort_by = "created_at";
            sort_order = "desc";
            break;
        }

        params.set("sort_by", sort_by);
        params.set("sort_order", sort_order);

        const query = params.toString();
        const url = query ? `${baseUrl}?${query}` : baseUrl;
        console.log(url);
        const res = await fetch(url, {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const arr = Array.isArray(json) ? json : [];

        setFeats(arr);

        // Sinkron selected dari URL / feat lama
        const urlSlug = searchParams.get("feat");
        if (urlSlug) {
          const found = arr.find((ft) => makeSlug(ft) === urlSlug);
          if (found) {
            setSelected(found);
            return;
          }
        }

        if (selected) {
          const still = arr.find(
            (ft) => (ft.id || ft.name) === (selected.id || selected.name)
          );
          if (still) {
            setSelected(still);
            return;
          }
        }

        if (arr.length > 0) setSelected(arr[0]);
        else setSelected(null);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load feats");
        setFeats([]);
        setSelected(null);
      } finally {
        setLoading(false);
      }
    }

    fetchFeats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, sortMode, filters]);

  function handleSelect(feat, fromMobile = false) {
    setSelected(feat);
    const slug = makeSlug(feat);
    const params = new URLSearchParams(searchParams.toString());
    params.set("feat", slug);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    if (isMobile && fromMobile) {
      setPane("detail");
    }
  }

  // === CLIENT-SIDE: hanya untuk LEVEL SORT ===
  const processedFeats = useMemo(() => {
    let arr = Array.isArray(feats) ? [...feats] : [];

    if (sortMode === "level_asc" || sortMode === "level_desc") {
      arr.sort((a, b) => {
        const la = getFeatLevel(a) ?? 0;
        const lb = getFeatLevel(b) ?? 0;
        return sortMode === "level_asc" ? la - lb : lb - la;
      });
    }

    return arr;
  }, [feats, sortMode]);

  const hasActiveFilter =
    (filters.type && filters.type.length > 0) ||
    typeof filters.levelMin === "number" ||
    typeof filters.levelMax === "number" ||
    filters.repeatable === true;

  const ListBlock = (
    <>
      <div className="flex gap-2 mb-4 shrink-0">
        {/* Search by name */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search feats by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-xl pl-3 pr-3 py-2 text-xs outline-none 
              focus:ring-2 focus:ring-indigo-500/70 transition"
          />
          {search !== debouncedSearch && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
              ...
            </span>
          )}
        </div>

        {/* Sort: Name & Level only */}
        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="hidden sm:block px-2 py-2 text-[11px] rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Filter modal button */}
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="relative p-2 text-xs font-medium bg-slate-900 border border-slate-700 rounded-xl 
            hover:bg-slate-800 hover:border-indigo-400 hover:text-indigo-200 transition flex items-center justify-center"
          aria-label="Open feat filter"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {hasActiveFilter && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-[#050b26] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          )}
        </button>
      </div>

      <div className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col min-h-0">
        <div className="flex items-center px-4 py-2 border-b border-slate-800 bg-slate-900/70 text-[11px] uppercase tracking-wide text-slate-400 shrink-0">
          <span className="font-semibold text-slate-100">Feats</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-full px-4 py-3 flex items-center justify-between gap-3 text-xs 
                  border-b border-slate-800/50 bg-slate-950/70 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-slate-800/80 border border-slate-700" />
                  <div className="space-y-1">
                    <div className="h-3 w-24 bg-slate-800 rounded" />
                    <div className="h-2 w-32 bg-slate-800 rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="p-4 text-xs text-rose-300">Error: {error}</div>
          ) : processedFeats.length === 0 ? (
            <div className="p-4 text-xs text-slate-400">No feats found.</div>
          ) : (
            processedFeats.map((feat) => {
              const key = feat.id || feat.name;
              const isActive =
                selected &&
                (selected.id || selected.name) === (feat.id || feat.name);

              const imgSrc = feat.image || "/assets/example_token.png";
              const level = getFeatLevel(feat);
              const kindLabel = getFeatKind(feat) || "";

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(feat, true)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 text-xs 
                    border-b border-slate-800/50 bg-gradient-to-r 
                    ${
                      isActive
                        ? "from-indigo-600/40 to-slate-900/70"
                        : "from-slate-950/80 to-slate-900/40 hover:from-slate-900 hover:to-slate-900/70"
                    }
                    transition`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-md overflow-hidden border border-slate-600">
                      <img
                        src={imgSrc}
                        alt={feat.name || "feat"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/example_token.png";
                        }}
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      {/* Nama feat */}
                      <span className="font-semibold text-slate-100 break-words">
                        {feat.name || "Unnamed feat"}
                      </span>

                      {/* Prereq level di bawah nama */}
                      {typeof level === "number" && (
                        <span className="text-[11px] text-slate-200">
                          Prerequisites: Level {level}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right text-[10px] text-slate-300 leading-tight shrink-0">
                    {kindLabel && (
                      <div className="inline-flex px-2 py-[2px] rounded-full border border-slate-600 bg-slate-900/70">
                        <span className="uppercase tracking-wide">
                          {kindLabel}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen text-slate-50 flex justify-center w-full">
      <div className="w-full max-w-7xl h-[90vh] bg-slate-950/80 border border-slate-700 overflow-hidden">
        {/* DESKTOP */}
        <div className="hidden md:flex gap-4 h-full">
          <div className="w-[30%] h-full bg-slate-900/80 border-slate-800 p-4 flex flex-col min-h-0">
            {ListBlock}
          </div>

          <div className="flex-1 h-full bg-slate-900/80 p-6 flex flex-col overflow-hidden">
            <FeatDetail feat={selected} />
          </div>
        </div>

        {/* MOBILE */}
        <div
          className="md:hidden relative h-full flex flex-col min-h-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex w-[200%] flex-1 min-h-0 transition-all duration-300 ease-in-out"
            style={{
              transform:
                pane === "list" ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            <section className="w-1/2 min-w-[50%] h-full p-4 flex flex-col min-h-0">
              {ListBlock}
            </section>

            <section className="w-1/2 min-w-[50%] h-full p-4 flex flex-col min-h-0">
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-4 overflow-auto">
                {selected ? (
                  <FeatDetail feat={selected} />
                ) : (
                  <p className="text-sm text-slate-400">Select a feat</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {filterOpen && (
        <FeatFilterModal
          value={filters}
          onClose={() => setFilterOpen(false)}
          onApply={(newFilters) => {
            setFilters(newFilters);
            setFilterOpen(false);
          }}
        />
      )}
    </div>
  );
}
