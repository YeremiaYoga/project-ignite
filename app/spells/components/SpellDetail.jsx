"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Heart } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const RATING_OPTIONS = ["S", "A", "B", "C", "D", "F"];

function safeText(v) {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);

  if (Array.isArray(v)) {
    return v
      .map((x) => safeText(x))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof v === "object") {
    return Object.values(v)
      .map((x) => safeText(x))
      .filter(Boolean)
      .join(", ");
  }

  return "";
}

function cap(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getActivationLabel(spell) {
  const activation =
    spell.activation ||
    spell.format_data?.system?.activation ||
    spell.raw_data?.system?.activation;

  if (!activation) return "";

  if (typeof activation === "string") return activation;

  const value = activation.value;
  const type = activation.type;

  if (!type) return safeText(activation);

  const map = {
    action: "Action",
    bonus: "Bonus Action",
    reaction: "Reaction",
    minute: "Minute",
    hour: "Hour",
  };

  const typeLabel = map[type] || cap(String(type));

  if (value != null && value !== "" && Number(value) !== 0) {
    return `${value} ${typeLabel}`;
  }

  return typeLabel;
}

function getDurationLabel(spell) {
  const dur =
    spell.duration ||
    spell.format_data?.system?.duration ||
    spell.raw_data?.system?.duration;

  if (!dur) return "";

  if (typeof dur === "string") return dur;

  const value = dur.value;
  const units = dur.units || dur.unit;

  if (!units && value == null) return safeText(dur);

  if (value != null && value !== "" && Number(value) !== 0) {
    return `${value} ${units || ""}`.trim();
  }

  return units ? cap(String(units)) : safeText(dur);
}

// range + template
function getRangeLabel(spell) {
  const range =
    spell.range || spell.format_data?.range || spell.raw_data?.system?.range;

  const template =
    spell.template ||
    spell.format_data?.template ||
    spell.raw_data?.system?.target?.template;

  let base = "";

  if (!range) {
    base = "";
  } else if (typeof range === "string") {
    const raw = range.trim().toLowerCase();

    if (raw.includes("self")) {
      return "Self";
    }
    if (raw.includes("touch")) {
      return "Touch";
    }

    const m = raw.match(/^0+\s+([a-z]+.*)$/);
    if (m) {
      return cap(m[1]);
    }

    base = range;
  } else if (typeof range === "object") {
    const units = range.units || range.unit;
    const value = range.value;

    if (!units && (value == null || value === "")) {
      base = "";
    } else if (units === "self") {
      base = "Self";
    } else if (units === "touch") {
      base = "Touch";
    } else if (value != null && Number(value) !== 0) {
      base = `${value} ${units || ""}`.trim();
    } else if (units) {
      base = cap(String(units));
    }
  }

  if (template && typeof template === "object") {
    const size = template.size;
    const tType = template.type;
    const tUnits = template.units || template.unit || "";

    const innerParts = [];
    if (size != null && size !== "") {
      innerParts.push(`${size}${tUnits ? tUnits : ""}`.trim());
    }
    if (tType) innerParts.push(cap(String(tType)));

    const inner = innerParts.join(" ");
    if (inner) {
      if (!base) return inner;
      return `${base} (${inner})`;
    }
  }

  return base || "";
}

function getProperties(spell) {
  const raw =
    spell.properties ||
    spell.format_data?.system?.properties ||
    spell.raw_data?.system?.properties;

  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map((x) => String(x).trim()).filter(Boolean);
  }

  if (typeof raw === "string") {
    return raw
      .replace(/[\[\]"]/g, "")
      .split(/[;,]/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  if (typeof raw === "object") {
    return Object.entries(raw)
      .filter(([, v]) => !!v)
      .map(([k]) => cap(k.replace(/_/g, " ")));
  }

  return [String(raw).trim()].filter(Boolean);
}

export default function SpellDetail({ spell, onSpellUpdate }) {
  const emitUpdate = onSpellUpdate || (() => {});

  // ==== LOGIN STATE (dari cookie) ====
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ==== FAVORITES STATE ====
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  // ==== RATING STATE ====
  const [myRating, setMyRating] = useState(""); // S/A/B/C/D/F atau ""
  const [avgLetter, setAvgLetter] = useState("");
  const [avgScore, setAvgScore] = useState(null); // tidak ditampilkan tapi kita simpan saja
  const [ratingTotal, setRatingTotal] = useState(0); // tidak ditampilkan
  const [ratingLoading, setRatingLoading] = useState(false);

  // ==== PROPERTIES STATE ====
  const [activeProp, setActiveProp] = useState(null);

  // cek login sekali di awal
  useEffect(() => {
    const userCookie = Cookies.get("ignite-user-data");
    setIsLoggedIn(Boolean(userCookie));
  }, []);

  // sinkron dari spell setiap berubah
  useEffect(() => {
    if (!spell) {
      setFavoriteCount(0);
      setIsFavorite(false);
      setMyRating("");
      setAvgLetter("");
      setAvgScore(null);
      setRatingTotal(0);
      setFavLoading(false);
      setRatingLoading(false);
      return;
    }

    setFavoriteCount(spell.favorites_count ?? 0);
    setIsFavorite(Boolean(spell.is_favorite));

    const my = spell.my_rating;
    setMyRating(my?.rating || my?.value || "");

    setAvgLetter(spell.rating_average_letter || "");
    setAvgScore(
      typeof spell.rating_average_score === "number"
        ? spell.rating_average_score
        : null
    );
    setRatingTotal(spell.rating_total ?? 0);

    setFavLoading(false);
    setRatingLoading(false);
  }, [spell?.id, spell?.__global_id, spell?.name]);

  async function handleToggleFavorite() {
    if (!spell?.id) return;
    if (!isLoggedIn) return;
    if (favLoading) return;

    try {
      setFavLoading(true);

      const res = await fetch(`${API_BASE}/ignite/spells/${spell.id}/favorite`, {
        method: "POST",
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        console.error("Favorite error:", json);
        return;
      }

      const action = json.action;
      let nextCount =
        typeof json.favorites_count === "number"
          ? json.favorites_count
          : favoriteCount + (action === "favorite" ? 1 : -1);

      if (nextCount < 0) nextCount = 0;

      const nextIsFavorite = action === "favorite";

      setFavoriteCount(nextCount);
      setIsFavorite(nextIsFavorite);

      // kirim balik ke parent supaya list & selected di parent ikut ke-update
      const updatedForParent = {
        ...spell,
        ...(json.spell || {}),
        favorites_count: nextCount,
        is_favorite: nextIsFavorite,
      };
      emitUpdate(updatedForParent);
    } catch (err) {
      console.error("Favorite request failed:", err);
    } finally {
      setFavLoading(false);
    }
  }

  async function handleChangeRating(e) {
    const val = e.target.value;
    // "" (None) = hapus rating
    const rating = val === "" ? null : val;

    setMyRating(val);

    if (!spell?.id) return;
    if (!isLoggedIn) return;
    if (ratingLoading) return;

    try {
      setRatingLoading(true);

      const res = await fetch(`${API_BASE}/ignite/spells/${spell.id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rating }),
      });

      const json = await res.json();
      if (!res.ok) {
        console.error("Rate error:", json);
        return;
      }

      const newAvgLetter = json.rating_average_letter || "";
      const newAvgScore =
        typeof json.rating_average_score === "number"
          ? json.rating_average_score
          : null;
      const newTotal = json.rating_total ?? 0;

      setAvgLetter(newAvgLetter);
      setAvgScore(newAvgScore);
      setRatingTotal(newTotal);

      const updatedForParent = {
        ...spell,
        ...(json.spell || {}),
        rating_average_letter: newAvgLetter,
        rating_average_score: newAvgScore,
        rating_total: newTotal,
        my_rating: rating ? { rating } : null,
      };
      emitUpdate(updatedForParent);
    } catch (err) {
      console.error("Rate request failed:", err);
    } finally {
      setRatingLoading(false);
    }
  }

  const handlePropClick = (code) => {
    setActiveProp((prev) => (prev === code ? null : code));
  };

  // EARLY RETURN SESUDAH SEMUA HOOK
  if (!spell) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
        Select a spell from the list.
      </div>
    );
  }

  // ====== DATA DISPLAY ======
  const name = spell.name || "Unnamed spell";
  const level = spell.level ?? spell.level_int ?? spell.lvl ?? 0;
  const levelLabel =
    Number(level) === 0 ? "Cantrip" : `Level ${Number(level) || level}`;

  const school = spell.school || spell.school_name || "";

  const activationLabel = getActivationLabel(spell);
  const durationLabel = getDurationLabel(spell);
  const rangeLabel = getRangeLabel(spell);

  const components =
    safeText(spell.components) ||
    safeText(spell.format_data?.system?.components?.value) ||
    safeText(spell.raw_data?.system?.components?.value);

  const imgSrc =
    spell.image ||
    spell.format_data?.img ||
    spell.raw_data?.img ||
    "/assets/example_token.png";

  const descriptionRaw =
    spell.format_data?.system?.description?.value ||
    spell.raw_data?.system?.description?.value ||
    spell.description;

  const descriptionHtml =
    typeof descriptionRaw === "string" && descriptionRaw.trim()
      ? descriptionRaw
      : "<p>No description available.</p>";

  const subtitleParts = [];
  if (levelLabel) subtitleParts.push(levelLabel);
  if (school) subtitleParts.push(school);
  const subtitle = subtitleParts.join(" • ");

  const properties = getProperties(spell);

  return (
    <div className="flex flex-col h-full">
      {/* HEADER UTAMA: GAMBAR + INFO SPELL */}
      <div className="flex items-start gap-4">
        {/* KIRI: GAMBAR */}
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-xl border border-slate-700 overflow-hidden">
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

        {/* KANAN: TITLE + DETAIL */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="lg:text-2xl font-semibold break-words leading-tight">
                {name}
              </h1>

              {rangeLabel && (
                <div className="text-xs text-slate-300 mt-1 break-words">
                  <div>Range : {rangeLabel}</div>
                </div>
              )}

              {activationLabel && (
                <p className="text-[11px] text-slate-300 mt-1">
                  Casting : {activationLabel}
                </p>
              )}

              {durationLabel && (
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Duration : {durationLabel}
                </p>
              )}
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              {subtitle && (
                <p className="text-right text-xs text-slate-300 leading-tight">
                  {subtitle}
                </p>
              )}

              {/* BUTTON FAVORITE & RATING DI POJOK KANAN, BERDAMPINGAN */}
              <div className="flex items-center gap-2">
                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={handleToggleFavorite}
                    disabled={favLoading}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] transition
                      ${
                        isFavorite
                          ? "border-rose-500 bg-rose-500/15 text-rose-300"
                          : "border-slate-600 bg-slate-800/60 text-slate-200 hover:border-rose-400 hover:text-rose-300"
                      } ${favLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFavorite
                          ? "text-rose-500 fill-rose-500"
                          : "text-current"
                      }`}
                    />
                    <span>{isFavorite ? "Favorited" : "Add to favorites"}</span>
                  </button>
                )}

                {isLoggedIn && (
                  <select
                    value={myRating}
                    onChange={handleChangeRating}
                    disabled={ratingLoading}
                    className="bg-slate-900/80 border border-slate-600 text-[11px] rounded-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  >
                    {/* NONE = hapus rating */}
                    <option value="">None</option>
                    {RATING_OPTIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                )}

                {/* HANYA HURUF RATING, PUTIH, TANPA SCORE & JUMLAH VOTE */}
                <div className="min-w-[20px] text-sm font-semibold text-white text-center">
                  {avgLetter || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BAR FAVORITE + LINE */}
      <div className="mt-3 mb-2 flex items-center justify-between text-[11px] text-slate-400">
        {/* LEFT: jumlah favorites (di atas garis) */}
        <div className="flex items-center gap-1">
          <Heart
            className={`w-3.5 h-3.5 ${
              favoriteCount > 0
                ? "text-rose-400 fill-rose-400"
                : "text-slate-500"
            }`}
          />
          <span>
            {favoriteCount > 0
              ? `${favoriteCount} favorites`
              : "No favorites yet"}
          </span>
        </div>
        {/* kanan dibiarkan kosong / bisa dipakai info lain nanti */}
      </div>

      {/* GARIS PEMISAH */}
      <div className="my-2 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

      {/* BODY */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1">
          {components && (
            <div className="mb-3 text-[11px] text-slate-300">
              <span className="font-semibold text-slate-200">Components:</span>{" "}
              {components}
            </div>
          )}

          <p className="text-sm uppercase tracking-wide text-slate-400 mb-1">
            Description
          </p>

          <div
            className="text-sm leading-relaxed text-slate-100/90 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>

        {properties.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-700/60 shrink-0">
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
              Properties
            </p>

            <div className="flex flex-wrap gap-2">
              {properties.map((prop, idx) => {
                const code = String(prop).toLowerCase().trim();
                const isActive = activeProp === code;

                return (
                  <button
                    key={`${code}-${idx}`}
                    type="button"
                    onClick={() => handlePropClick(code)}
                    className={`px-3 py-1 rounded-full border text-[11px] cursor-pointer transition
                      ${
                        isActive
                          ? "border-amber-300 bg-slate-700/90 text-slate-50"
                          : "border-slate-600 bg-slate-800/80 text-slate-100 hover:border-amber-300/70 hover:bg-slate-700/80"
                      }`}
                  >
                    {prop}
                  </button>
                );
              })}
            </div>

            {activeProp && (
              <div className="mt-2 text-[11px] text-slate-100 bg-slate-900/95 border border-slate-700 rounded-lg p-2">
                <div className="font-semibold mb-1">
                  {cap(activeProp.replace(/_/g, " "))}
                </div>
                <p className="leading-snug text-slate-300">
               
                  No additional information.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
