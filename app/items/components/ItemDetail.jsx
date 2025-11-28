"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

import {
  PROPERTY_ORDER,
  PROPERTY_META,
  RARITY_COLORS,
  normalizeRarityKey,
  MASTERY_DESCRIPTIONS,
  formatPriceLabel,
} from "../itemData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function ItemDetail({ item, onFavoriteChange }) {
  const noop = () => {};
  const emitFavoriteChange = onFavoriteChange || noop;

  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
        Select an item from the list.
      </div>
    );
  }

  const name = item.name || "Unnamed item";
  const type = item.__type || item.type || "";
  const rarity = item.rarity || item.rarity_name || "";
  const rarityKey = normalizeRarityKey(rarity);
  const rarityColor = RARITY_COLORS[rarityKey] || "#e5e7eb";

  const mastery = item.mastery || "";
  const price = item.price ?? item.cost ?? "";
  const weight = item.weight ?? "";

  const imgSrc =
    item.image ||
    item.format_data?.img ||
    item.raw_data?.img ||
    "/assets/example_token.png";

  const slugBase = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const slug =
    item.id != null ? `${slugBase}-${String(item.id).slice(-6)}` : slugBase;

  const rawPrice = typeof price === "number" ? price : Number(price ?? NaN);
  const priceLabel =
    typeof rawPrice === "number" && !Number.isNaN(rawPrice)
      ? formatPriceLabel(rawPrice)
      : "-";

  const weightLabel = weight ? `${weight} lb` : "-";

  // ==== FAVORITE STATE ====
  const [favCount, setFavCount] = useState(item.favorites_count ?? 0);
  const [isFavorite, setIsFavorite] = useState(Boolean(item.is_favorite));
  const [favLoading, setFavLoading] = useState(false);

  // reset state favorite tiap kali item berubah
  useEffect(() => {
    setFavCount(item.favorites_count ?? 0);
    setIsFavorite(Boolean(item.is_favorite));
    setFavLoading(false);
  }, [item.__global_id, item.id, item.__type]);

  async function handleToggleFavorite() {
    if (!item?.id || !item.__type) return;
    if (favLoading) return;

    try {
      setFavLoading(true);

      const res = await fetch(
        `${API_BASE}/foundry/items/${item.__type}/${item.id}/favorite`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        console.error("❌ toggle favorite failed:", res.status);
        return;
      }

      const data = await res.json();

      let nextCount = favCount;
      let nextIsFavorite = isFavorite;

      if (typeof data.favorites_count === "number") {
        nextCount = data.favorites_count;
      } else {
        // fallback kalau backend belum kirim favorites_count
        nextCount = favCount + (data.action === "favorite" ? 1 : -1);
      }

      if (data.action === "favorite") {
        nextIsFavorite = true;
      } else if (data.action === "unfavorite") {
        nextIsFavorite = false;
      }

      if (nextCount < 0) nextCount = 0;

      setFavCount(nextCount);
      setIsFavorite(nextIsFavorite);

      // 🔁 push ke parent supaya items list & selected ikut update
      emitFavoriteChange({
        type: item.__type,
        id: item.id,
        isFavorite: nextIsFavorite,
        favoritesCount: nextCount,
      });
    } catch (err) {
      console.error("❌ toggle favorite error:", err);
    } finally {
      setFavLoading(false);
    }
  }

  // ===== PROPERTY / DESCRIPTION =====

  let properties = [];
  if (Array.isArray(item.properties)) {
    properties = item.properties;
  } else if (typeof item.properties === "string" && item.properties.trim()) {
    try {
      properties = JSON.parse(item.properties);
    } catch {
      properties = [item.properties];
    }
  } else if (
    item.properties &&
    typeof item.properties === "object" &&
    !Array.isArray(item.properties)
  ) {
    properties = Object.entries(item.properties)
      .filter(([, v]) => !!v)
      .map(([k]) => k);
  }

  const descriptionHtml =
    item.format_data?.system?.description?.value ||
    item.raw_data?.system?.description?.value ||
    item.description ||
    "<p>No description available.</p>";

  function cap(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function joinClean(arr) {
    return arr.filter((x) => x && x.trim() !== "").join(" - ");
  }

  function mapWeaponTypeValue(v) {
    if (!v) return "";

    const key = v.toLowerCase();

    const map = {
      martialm: "Martial Melee",
      martialr: "Martial Range",
      simplem: "Simple Melee",
      simpler: "Simple Range",
      natural: "Natural",
      siege: "Siege Weapon",
      improv: "Improvise",
    };

    return map[key] || cap(v);
  }

  function getTypeLine(item) {
    const typeCap = cap(item.__type || item.type || "");
    const base = cap(item.base_item || "");
    const typeValueRaw = item.type_value || "";
    const typeValue = cap(typeValueRaw);
    const subtype = cap(item.subtype || "");
    const toolType = cap(item.tool_type || item.toolType || "");

    switch ((item.__type || item.type || "").toLowerCase()) {
      case "weapon": {
        const mapped = mapWeaponTypeValue(typeValueRaw);
        return joinClean([typeCap, base, mapped]);
      }

      case "consumable":
        return joinClean([typeCap, typeValue, subtype]);

      case "container":
        return typeCap;

      case "equipment":
        return joinClean([
          typeCap,
          typeValue ? `${typeValue} Armor` : "",
          base,
        ]);

      case "tool":
        return toolType || typeCap;

      case "loot":
        return joinClean(["Loot " + typeValue, base]);

      default:
        return typeCap;
    }
  }

  const propertyCodesNormalized = new Set(
    properties
      .map((p) => String(p).toLowerCase())
      .filter((p) => PROPERTY_ORDER.includes(p))
  );

  const orderedDisplayProperties = PROPERTY_ORDER.filter((code) =>
    propertyCodesNormalized.has(code)
  );

  const masteryKey = mastery ? String(mastery).toLowerCase() : null;
  const masteryDescription = masteryKey
    ? MASTERY_DESCRIPTIONS[masteryKey] || ""
    : "";

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-start mb-3 gap-4">
        <div className="shrink-0">
          <div
            className="w-16 h-14 rounded-xl flex items-center justify-center text-[11px] font-semibold text-rose-200 shadow border"
            style={{ borderColor: rarityColor }}
          >
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/assets/example_token.png";
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1
                id={slug}
                className="lg:text-2xl font-semibold break-words leading-tight"
                style={{ color: rarityColor }}
              >
                {name}
              </h1>

              <p className="text-xs text-slate-300 mt-1 break-words">
                {getTypeLine(item)}
              </p>
            </div>

            <div className="text-right text-xs text-indigo-300 leading-tight shrink-0 ">
              <div className="break-words">
                {priceLabel}
                {Number(weight) > 0 ? `, ${weightLabel}` : ""}
              </div>
              {rarity && (
                <div
                  className="mt-1 font-semibold break-words capitalize"
                  style={{ color: rarityColor }}
                >
                  ({rarityKey})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BAR FAVORITE – di atas garis amber */}
      <div className="mb-3 flex items-center justify-between text-[11px] text-slate-400">
        {/* kiri: total favorites */}
        <div className="flex items-center gap-1">
          <Heart
            className={`w-4 h-4 ${
              favCount > 0 ? "text-rose-400 fill-rose-400" : "text-slate-500"
            }`}
          />
          <span>{favCount || 0} favorites</span>
        </div>

        {/* kanan: tombol toggle favorite */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          disabled={favLoading}
          className={`inline-flex items-center justify-center rounded-full border px-2 py-1
            ${
              isFavorite
                ? "border-rose-500 bg-rose-500/15 text-rose-300"
                : "border-slate-600 bg-slate-800/60 text-slate-200 hover:border-rose-400 hover:text-rose-300"
            }
            ${favLoading ? "opacity-60 cursor-not-allowed" : ""}
            transition text-[11px] gap-1`}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "text-rose-500 fill-rose-500" : "text-current"
            }`}
          />
          <span>{isFavorite ? "Favorited" : "Add to favorites"}</span>
        </button>
        {/* <button
          type="button"
          onClick={handleToggleFavorite}
          disabled={favLoading}
          className={`p-1.5 rounded-md border transition
    ${
      isFavorite
        ? "border-rose-500 bg-rose-500/10"
        : "border-slate-600 bg-slate-800/40 hover:bg-slate-700"
    }
    ${favLoading ? "opacity-50 cursor-not-allowed" : ""}
  `}
        >
          <Heart
            className={`w-4 h-4 transition
      ${isFavorite ? "text-rose-500 fill-rose-500" : "text-slate-300"}
    `}
          />
        </button> */}
      </div>

      <div className="my-2 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

      {/* BODY: atas scroll, bawah properties nempel */}
      <div className="flex-1 flex flex-col">
        {/* Atas: description + mastery (scroll) */}
        <div className="flex-1 overflow-y-auto pr-1">
          <p className="text-sm uppercase tracking-wide text-slate-400 mb-1">
            Description
          </p>

          <div
            className="text-sm leading-relaxed text-slate-100/90 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />

          {mastery && (
            <div className="mt-4">
              <p className="text-sm uppercase tracking-wide text-slate-400 mb-1">
                Mastery : <span className="text-slate-400">{cap(mastery)}</span>
              </p>
              {masteryDescription && (
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                  {masteryDescription}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bawah: PROPERTIES ditempel ke bawah panel */}
        {orderedDisplayProperties.length > 0 && (
          <div className="mt-4 pt-2 border-t border-slate-700/60 shrink-0">
            <div className="flex flex-wrap gap-2">
              {orderedDisplayProperties.map((code) => {
                const meta = PROPERTY_META[code] || {
                  label: code.toUpperCase(),
                };
                const tooltip = meta.description;

                return (
                  <div
                    key={code}
                    className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-600 text-[11px] text-slate-100 cursor-default hover:border-amber-300/70 hover:bg-slate-700/80 transition"
                    title={tooltip}
                  >
                    {meta.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
