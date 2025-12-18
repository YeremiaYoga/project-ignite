// app/feats/FoundryFeatView.jsx
"use client";

import { useEffect, useState, useRef } from "react";
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

function getFeatSummary(feat) {
  const desc = (feat.description || feat.feat || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!desc) return "No description";
  if (desc.length <= 100) return desc;
  return desc.slice(0, 100) + "…";
}

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

  const [filters, setFilters] = useState({
    type: "",
    category: "",
  });

  const [sortMode, setSortMode] = useState("created_desc");
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

  // === FETCH FEATS (public vs private) ===
  useEffect(() => {
    async function fetchFeats() {
      try {
        setLoading(true);
        setError("");

        // 🔹 sama seperti spells: cek cookie
        const isLoggedIn = !!Cookies.get("ignite-user-data");
        const baseUrl = isLoggedIn
          ? `${API_BASE}/ignite/feats/all`
          : `${API_BASE}/ignite/feats`;

        const params = new URLSearchParams();

        if (debouncedSearch.trim() !== "") {
          params.set("q", debouncedSearch.trim());
        }
        if (filters.type) params.set("type", filters.type);
        if (filters.category) params.set("category", filters.category);

        // mapping sort mode ke sort_by + sort_order (sesuai controller)
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
          case "source_asc":
            sort_by = "source";
            sort_order = "asc";
            break;
          case "source_desc":
            sort_by = "source";
            sort_order = "desc";
            break;
          case "created_asc":
            sort_by = "created_at";
            sort_order = "asc";
            break;
          case "created_desc":
          default:
            sort_by = "created_at";
            sort_order = "desc";
            break;
        }

        params.set("sort_by", sort_by);
        params.set("sort_order", sort_order);

        const query = params.toString();
        const url = query ? `${baseUrl}?${query}` : baseUrl;

        const res = await fetch(url, {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const arr = Array.isArray(json) ? json : [];

        setFeats(arr);

        // sync feat dari URL ?feat=...
        const urlSlug = searchParams.get("feat");
        if (urlSlug) {
          const found = arr.find((ft) => makeSlug(ft) === urlSlug);
          if (found) {
            setSelected(found);
            return;
          }
        }

        // kalau sebelumnya sudah pilih, sinkron ke data baru
        if (selected) {
          const still = arr.find(
            (ft) => (ft.id || ft.name) === (selected.id || selected.name)
          );
          if (still) {
            setSelected(still);
            return;
          }
        }

        // default pilih pertama
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
  }, [debouncedSearch, filters.type, filters.category, sortMode]);

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

  const ListBlock = (
    <>
      <div className="flex gap-2 mb-4 shrink-0">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search feats..."
            value={search}
            // onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-xl pl-3 pr-3 py-2 text-xs outline-none 
              focus:ring-2 focus:ring-indigo-500/70 transition"
          />
          {search !== debouncedSearch && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
              ...
            </span>
          )}
        </div>

        {/* Sort */}
        {/* <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="hidden sm:block px-2 py-2 text-[11px] rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800"
        >
          <option value="created_desc">Newest</option>
          <option value="created_asc">Oldest</option>
          <option value="name_asc">Name (A → Z)</option>
          <option value="name_desc">Name (Z → A)</option>
          <option value="source_asc">Source (A → Z)</option>
          <option value="source_desc">Source (Z → A)</option>
        </select> */}

        {/* Filter modal button */}
        <button
          type="button"
        //   onClick={() => setFilterOpen(true)}
          className="relative p-2 text-xs font-medium bg-slate-900 border border-slate-700 rounded-xl 
            hover:bg-slate-800 hover:border-indigo-400 hover:text-indigo-200 transition flex items-center justify-center"
          aria-label="Open feat filter"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {(filters.type || filters.category) && (
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
          ) : feats.length === 0 ? (
            <div className="p-4 text-xs text-slate-400">No feats found.</div>
          ) : (
            feats.map((feat) => {
              const key = feat.id || feat.name;
              const isActive =
                selected &&
                (selected.id || selected.name) === (feat.id || feat.name);

              const imgSrc = feat.image || "/assets/example_token.png";
              const summary = getFeatSummary(feat);

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
                      <span className="font-semibold text-slate-100 break-words">
                        {feat.name || "Unnamed feat"}
                      </span>
                      <span className="text-[11px] text-slate-300 break-words">
                        {summary}
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-[10px] text-slate-400 leading-tight shrink-0">
                    {feat.source && (
                      <div className="line-clamp-2">{feat.source}</div>
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
      <div className="w-full max-w-7xl h-[90vh] bg-slate-950/80 border border-slate-700 rounded-none shadow-xl backdrop-blur-md overflow-hidden">
        {/* DESKTOP VIEW */}
        <div className="hidden md:flex gap-4 h-full">
          <div className="w-[30%] h-full bg-slate-900/80 border-slate-800 p-4 flex flex-col min-h-0">
            {ListBlock}
          </div>

          <div className="flex-1 h-full bg-slate-900/80 p-6 flex flex-col overflow-hidden">
            <FeatDetail feat={selected} />
          </div>
        </div>

        {/* MOBILE VIEW */}
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
