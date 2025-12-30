"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import ItemDetail from "./components/ItemDetail";
import ItemFilterModal from "./components/ItemFilterModal";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const RARITY_COLORS = {
  common: "#b5bda6",
  uncommon: "#78c178",
  rare: "#6464bd",
  "very rare": "#62c1ad",
  legendary: "#bb9348",
  artifact: "#a46b43",
};

const TYPE_OPTIONS = [
  { key: "weapon", label: "Weapon" },
  { key: "consumable", label: "Consumable" },
  { key: "container", label: "Container" },
  { key: "equipment", label: "Equipment" },
  { key: "loot", label: "Loot" },
  { key: "tool", label: "Tool" },
];

const RARITY_OPTIONS = [
  { key: "null", label: "None" },
  { key: "common", label: "Common" },
  { key: "uncommon", label: "Uncommon" },
  { key: "rare", label: "Rare" },
  { key: "very rare", label: "Very Rare" },
  { key: "legendary", label: "Legendary" },
  { key: "artifact", label: "Artifact" },
];

// ✅ Sorting UI (tiru SpellView)
const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A → Z)" },
  { value: "name-desc", label: "Name (Z → A)" },
  { value: "price-asc", label: "Price (Low → High)" },
  { value: "price-desc", label: "Price (High → Low)" },
  { value: "rarity-asc", label: "Rarity (A → Z)" },
  { value: "rarity-desc", label: "Rarity (Z → A)" },
];

// ================== HELPERS ==================
function uniq(arr) {
  return Array.from(
    new Set((arr || []).filter((x) => x !== null && x !== undefined && x !== ""))
  );
}

function normalizeRarityKey(r) {
  if (!r) return "";
  let key = String(r).toLowerCase().trim();
  key = key.replace(/[\-_]/g, " ");
  key = key.replace(/\s+/g, " ");
  if (key.replace(/\s+/g, "") === "veryrare") key = "very rare";
  return key;
}

function getRarityColor(r) {
  const key = normalizeRarityKey(r);
  if (!key) return "#e5e7eb";
  return RARITY_COLORS[key] || "#e5e7eb";
}

function makeSlug(item) {
  const type = (item.__type || item.type || "item").toLowerCase();
  const name = (item.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${type}-${name}`;
}

function formatNumber(value) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function formatPriceLabel(value) {
  if (value == null || isNaN(value)) return "-";
  // cp -> sp/gp (sesuai logic kamu)
  if (value < 10) return `${formatNumber(value)} Cp`;
  if (value < 100) return `${formatNumber(value / 10)} Sp`;
  return `${formatNumber(value / 100)} Gp`;
}

// --- helper serialize query ---
function appendList(params, key, arr) {
  const a = Array.isArray(arr) ? arr : [];
  const cleaned = a
    .map((x) => (x === null ? "null" : String(x)))
    .map((s) => s.trim())
    .filter(Boolean);
  if (cleaned.length) params.set(key, cleaned.join(","));
}
function appendBool(params, key, val) {
  if (typeof val === "boolean") params.set(key, val ? "true" : "false");
}
function appendNum(params, key, val) {
  if (val === null || val === undefined || val === "") return;
  const n = Number(val);
  if (!Number.isNaN(n)) params.set(key, String(n));
}

// DEFAULT FILTER STATE (shape harus sama dengan modal)
const DEFAULT_FILTERS = {
  typesOnly: [],
  typesBlacklist: [],
  raritiesOnly: [],
  raritiesBlacklist: [],

  weaponTypeOnly: [],
  weaponTypeBlacklist: [],
  baseWeaponOnly: [],
  baseWeaponBlacklist: [],
  masteryOnly: [],
  masteryBlacklist: [],
  propertiesOnly: [],
  propertiesBlacklist: [],

  priceMin: 0,
  priceMax: 200000,
  priceIncludeInfinity: true,

  favoritesOnly: false,

  sortBy: "name",
  sortDir: "asc",
};

export default function FoundryItemView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  // search
  const [search, setSearch] = useState("");

  // filters
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // ✅ sorting UI mode (tiru SpellView)
  const [sortMode, setSortMode] = useState("name-asc");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);

  // ===== Mobile state =====
  const [isMobile, setIsMobile] = useState(false);
  const [pane, setPane] = useState("list");
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

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

  // ✅ sync sortMode -> filters.sortBy/sortDir (backend param tetap dari filters)
  useEffect(() => {
    const [field, dir] = String(sortMode || "name-asc").split("-");
    const sortBy =
      field === "price" ? "price" : field === "rarity" ? "rarity" : "name";
    const sortDir = dir === "desc" ? "desc" : "asc";

    setFilters((p) => ({
      ...p,
      sortBy,
      sortDir,
    }));
  }, [sortMode]);

  // ===== Fetch (refetch tiap search/filters berubah) =====
  useEffect(() => {
    let alive = true;

    async function fetchItems() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        // search -> backend support name/search
        if (search.trim()) params.set("search", search.trim());

        // tri-state types/rarities
        appendList(params, "typesOnly", filters.typesOnly);
        appendList(params, "typesBlacklist", filters.typesBlacklist);
        appendList(params, "raritiesOnly", filters.raritiesOnly);
        appendList(params, "raritiesBlacklist", filters.raritiesBlacklist);

        // weapon
        appendList(params, "weaponTypeOnly", filters.weaponTypeOnly);
        appendList(params, "weaponTypeBlacklist", filters.weaponTypeBlacklist);
        appendList(params, "baseWeaponOnly", filters.baseWeaponOnly);
        appendList(params, "baseWeaponBlacklist", filters.baseWeaponBlacklist);
        appendList(params, "masteryOnly", filters.masteryOnly);
        appendList(params, "masteryBlacklist", filters.masteryBlacklist);
        appendList(params, "propertiesOnly", filters.propertiesOnly);
        appendList(params, "propertiesBlacklist", filters.propertiesBlacklist);

        // price
        appendNum(params, "priceMin", filters.priceMin);
        appendNum(params, "priceMax", filters.priceMax);
        appendBool(params, "priceIncludeInfinity", !!filters.priceIncludeInfinity);

        // favorites
        appendBool(params, "favoritesOnly", !!filters.favoritesOnly);

        // sort
        if (filters.sortBy) params.set("sortBy", String(filters.sortBy));
        if (filters.sortDir) params.set("sortDir", String(filters.sortDir));

        const url = `${API_BASE}/foundry/items/all?${params.toString()}`;

        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const arr = Array.isArray(json.items) ? json.items : [];

        if (!alive) return;

        setItems(arr);

        // keep selected: dari query param "item" kalau ada
        const urlSlug = searchParams.get("item");
        if (urlSlug) {
          const found = arr.find((it) => makeSlug(it) === urlSlug);
          if (found) {
            setSelected(found);
            return;
          }
        }

        // keep selected if still exists
        if (selected) {
          const still = arr.find(
            (it) =>
              (it.__global_id || it.id) === (selected.__global_id || selected.id)
          );
          if (still) {
            setSelected(still);
            return;
          }
        }

        // fallback: pilih pertama
        if (arr.length > 0) setSelected(arr[0]);
        else setSelected(null);
      } catch (err) {
        if (!alive) return;
        setError(err.message || "Failed to load items");
        setItems([]);
        setSelected(null);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    fetchItems();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters]);

  function handleSelect(item, fromMobile = false) {
    setSelected(item);
    const slug = makeSlug(item);
    const params = new URLSearchParams(searchParams.toString());
    params.set("item", slug);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    if (isMobile && fromMobile) setPane("detail");
  }

  // realtime update favorites (optimistic update)
  function handleFavoriteChange({ type, id, isFavorite, favoritesCount }) {
    setItems((prev) =>
      prev.map((it) => {
        if (it.__type === type && String(it.id) === String(id)) {
          return {
            ...it,
            is_favorite: isFavorite,
            favorites_count: favoritesCount,
          };
        }
        return it;
      })
    );

    setSelected((prev) => {
      if (!prev) return prev;
      if (prev.__type === type && String(prev.id) === String(id)) {
        return {
          ...prev,
          is_favorite: isFavorite,
          favorites_count: favoritesCount,
        };
      }
      return prev;
    });
  }

  // badge count (indikator)
  const activeFilterCount = useMemo(() => {
    const f = filters || {};
    const listKeys = [
      "typesOnly",
      "typesBlacklist",
      "raritiesOnly",
      "raritiesBlacklist",
      "weaponTypeOnly",
      "weaponTypeBlacklist",
      "baseWeaponOnly",
      "baseWeaponBlacklist",
      "masteryOnly",
      "masteryBlacklist",
      "propertiesOnly",
      "propertiesBlacklist",
    ];
    let n = 0;
    for (const k of listKeys) if ((f[k] || []).length) n++;
    if ((f.priceMin ?? 0) > 0) n++;
    if (!f.priceIncludeInfinity) n++; // max berperan
    if (f.favoritesOnly) n++;
    return n;
  }, [filters]);

  const ListBlock = (
    <>
      {/* TOP CONTROLS (tiru SpellView) */}
      <div className="flex gap-2 mb-4 shrink-0">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-xl pl-3 pr-3 py-2 text-xs outline-none
              focus:ring-2 focus:ring-indigo-500/70 transition"
          />
        </div>

        {/* <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="hidden sm:block px-2 py-2 text-[11px] rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select> */}

        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="relative p-2 text-xs font-medium bg-slate-900 border border-slate-700 rounded-xl
            hover:bg-slate-800 hover:border-indigo-400 hover:text-indigo-200 transition flex items-center justify-center"
          aria-label="Open item filter"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-[#050b26] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* LIST */}
      <div className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col min-h-0">
        <div className="flex items-center px-4 py-2 border-b border-slate-800 bg-slate-900/70 text-[11px] uppercase tracking-wide text-slate-400 shrink-0">
          <div className="w-7 h-7 rounded-md border border-slate-600 mr-3 flex items-center justify-center text-[9px]">
            #
          </div>
          <span className="font-semibold text-slate-100">Name</span>
          <div className="flex-1" />
          <div className="text-right text-[10px] text-slate-400">
            <div>Type</div>
            <div>Price / Wt</div>
          </div>
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
                    <div className="h-2 w-16 bg-slate-800 rounded" />
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <div className="h-2 w-10 bg-slate-800 rounded" />
                  <div className="h-2 w-8 bg-slate-800 rounded" />
                </div>
              </div>
            ))
          ) : error ? (
            <div className="p-4 text-xs text-rose-300">Error: {error}</div>
          ) : items.length === 0 ? (
            <div className="p-4 text-xs text-slate-400">No items found.</div>
          ) : (
            items.map((item) => {
              const key = item.__global_id || item.id || item.name;
              const isActive =
                selected &&
                (selected.__global_id || selected.id) ===
                  (item.__global_id || item.id);

              const rawPrice = item.price ?? item.cost ?? null;
              const priceLabel =
                typeof rawPrice === "number" ? formatPriceLabel(rawPrice) : "-";

              const itemWeight = item.weight ?? "";
              const weightLabel = itemWeight ? `${itemWeight} lb` : "-";

              const imgSrc =
                item.image ||
                item.format_data?.img ||
                item.raw_data?.img ||
                "/assets/example_token.png";

              const rarityColor = getRarityColor(item.rarity || item.rarity_name);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(item, true)}
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
                    <div
                      className="w-9 h-9 rounded-md overflow-hidden border"
                      style={{ borderColor: rarityColor }}
                    >
                      <img
                        src={imgSrc}
                        alt={item.name || "item"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/example_token.png";
                        }}
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-slate-100 break-words">
                        {item.name || "Unnamed item"}
                      </span>
                      <span className="text-[11px] text-slate-400 capitalize break-words">
                        {item.__type || item.type || "item"}
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-[10px] text-slate-400 leading-tight shrink-0">
                    <div>{priceLabel}</div>
                    <div>{weightLabel}</div>
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
            <ItemDetail item={selected} onFavoriteChange={handleFavoriteChange} />
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div
          className="md:hidden relative h-full flex flex-col min-h-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* top bar */}
          <div className="shrink-0 sticky top-0 z-20 flex items-center justify-between bg-[#050b26]/90 backdrop-blur border-b border-slate-800 px-3 py-2">
            {pane === "detail" ? (
              <button
                onClick={() => setPane("list")}
                className="px-2 py-1 text-xs rounded-md border border-[#2a2f55] bg-[#101858] hover:bg-[#19246e]"
              >
                Back
              </button>
            ) : (
              <span className="text-xs text-slate-400">Items</span>
            )}
          </div>

          {/* slider list/detail */}
          <div
            className="flex w-[200%] flex-1 min-h-0 transition-all duration-300 ease-in-out"
            style={{
              transform: pane === "list" ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            {/* LIST PANE */}
            <section className="w-1/2 min-w-[50%] h-full p-4 flex flex-col min-h-0">
              {ListBlock}
            </section>

            {/* DETAIL PANE */}
            <section className="w-1/2 min-w-[50%] h-full p-4 flex flex-col min-h-0">
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-4 overflow-auto">
                {selected ? (
                  <ItemDetail item={selected} onFavoriteChange={handleFavoriteChange} />
                ) : (
                  <p className="text-sm text-slate-400">Select an item</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FILTER MODAL */}
      {filterOpen && (
        <ItemFilterModal
          typeOptions={TYPE_OPTIONS}
          rarityOptions={RARITY_OPTIONS}
          value={filters}
          onClose={() => setFilterOpen(false)}
          onApply={(next) => {
            // ✅ ambil object full dari modal
            setFilters(next);
            setFilterOpen(false);
          }}
        />
      )}
    </div>
  );
}
