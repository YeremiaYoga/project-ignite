"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Heart } from "lucide-react";
import {
  SCHOOL_MAP,
  PROPERTY_LABELS,
  PROPERTY_DESCRIPTIONS,
} from "../spellData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const RATING_OPTIONS = ["S", "A", "B", "C", "D", "F"];

// ICONS
const ICON_CONCENTRATION =
  "https://019a0f6bb5a27dc5b6ab32a19a8ad5d6.phanneldeliver.my.id/foundryvtt/systems/dnd5e/icons/svg/statuses/concentrating.svg";

const ICON_RITUAL =
  "https://019a0f6bb5a27dc5b6ab32a19a8ad5d6.phanneldeliver.my.id/foundryvtt/systems/dnd5e/icons/svg/facilities/empower.svg";

// 🔹 ICON MAP untuk classes
const CLASS_ICON_DATA = {
  artificer: {
    src: "/assets/classIcon/artificer_icon.webp",
    label: "Artificer",
  },
  barbarian: {
    src: "/assets/classIcon/barbarian_icon.webp",
    label: "Barbarian",
  },
  bard: {
    src: "/assets/classIcon/bard_icon.webp",
    label: "Bard",
  },
  blood_hunter: {
    src: "/assets/classIcon/blood_hunter_icon.webp",
    label: "Blood Hunter",
  },
  cleric: {
    src: "/assets/classIcon/cleric_icon.webp",
    label: "Cleric",
  },
  druid: {
    src: "/assets/classIcon/druid_icon.webp",
    label: "Druid",
  },
  fighter: {
    src: "/assets/classIcon/fighter_icon.webp",
    label: "Fighter",
  },
  illriger: {
    src: "/assets/classIcon/illriger_icon.webp",
    label: "Illriger",
  },
  monk: {
    src: "/assets/classIcon/monk_icon.webp",
    label: "Monk",
  },
  paladin: {
    src: "/assets/classIcon/paladin_icon.webp",
    label: "Paladin",
  },
  ranger: {
    src: "/assets/classIcon/ranger_icon.webp",
    label: "Ranger",
  },
  rogue: {
    src: "/assets/classIcon/rogue_icon.webp",
    label: "Rogue",
  },
  sorcerer: {
    src: "/assets/classIcon/sorcerer_icon.webp",
    label: "Sorcerer",
  },
  ua: {
    src: "/assets/classIcon/UA_icon.webp",
    label: "Unearthed Arcana",
  },
  warlock: {
    src: "/assets/classIcon/warlock_icon.webp",
    label: "Warlock",
  },
  wizard: {
    src: "/assets/classIcon/wizard_icon.webp",
    label: "Wizard",
  },
};

// 🔹 ICON MAP untuk damage type
const DAMAGE_ICON_DATA = {
  acid: {
    src: "/assets/damageType_icon/acid.webp",
    label: "Acid",
  },
  cold: {
    src: "/assets/damageType_icon/cold.webp",
    label: "Cold",
  },
  fire: {
    src: "/assets/damageType_icon/fire.webp",
    label: "Fire",
  },
  force: {
    src: "/assets/damageType_icon/force.webp",
    label: "Force",
  },
  lightning: {
    src: "/assets/damageType_icon/lightning.webp",
    label: "Lightning",
  },
  necrotic: {
    src: "/assets/damageType_icon/necrotic.webp",
    label: "Necrotic",
  },
  poison: {
    src: "/assets/damageType_icon/poison.webp",
    label: "Poison",
  },
  radiant: {
    src: "/assets/damageType_icon/radiant.webp",
    label: "Radiant",
  },
  thunder: {
    src: "/assets/damageType_icon/thunder.webp",
    label: "Thunder",
  },
  physical: {
    src: "/assets/damageType_icon/physical.webp",
    label: "Physical",
  },
  physic: {
    src: "/assets/damageType_icon/physic.webp",
    label: "Psychic",
  },
};

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

function mapRangeUnits(units) {
  if (!units) return "";
  const u = String(units).toLowerCase();
  if (u === "mi" || u === "mile" || u === "miles") return "mile";
  if (u === "spec" || u === "special") return "Special";
  return units;
}

function mapDurationUnits(units) {
  if (!units) return "";
  const u = String(units).toLowerCase();
  if (u === "inst") return "Instantaneous";
  if (u === "perm") return "Permanent";
  return units;
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
  const rawUnits = dur.units || dur.unit;
  const units = mapDurationUnits(rawUnits);

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

    if (raw.includes("self")) return "Self";
    if (raw.includes("touch")) return "Touch";

    const m = raw.match(/^0+\s+([a-z]+.*)$/);
    if (m) return cap(m[1]);

    if (raw === "mi" || raw === "mile" || raw === "miles") return "Mile";
    if (raw === "spec" || raw === "special") return "Special";

    base = range;
  } else if (typeof range === "object") {
    const rawUnits = range.units || range.unit;
    const value = range.value;
    const units = mapRangeUnits(rawUnits);

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

  let base = [];

  if (Array.isArray(raw)) {
    base = raw.map((x) => String(x).trim()).filter(Boolean);
  } else if (typeof raw === "string") {
    base = raw
      .replace(/[\[\]"]/g, "")
      .split(/[;,]/)
      .map((x) => x.trim())
      .filter(Boolean);
  } else if (typeof raw === "object") {
    base = Object.entries(raw)
      .filter(([, v]) => !!v)
      .map(([k]) => k.replace(/_/g, " "));
  } else {
    base = [String(raw).trim()].filter(Boolean);
  }

  return base.map((p) => {
    const key = String(p).toLowerCase().trim();
    if (PROPERTY_LABELS[key]) return PROPERTY_LABELS[key];
    return cap(p);
  });
}

function getSchoolLabel(spell) {
  const raw =
    spell.school ||
    spell.school_name ||
    spell.format_data?.system?.school ||
    spell.raw_data?.system?.school;

  if (!raw) return "";

  const code = String(raw).toLowerCase();
  if (SCHOOL_MAP[code]) return SCHOOL_MAP[code];

  return cap(String(raw));
}

function getMaterialLabel(spell) {
  const mat =
    spell.materials ||
    spell.format_data?.system?.materials ||
    spell.raw_data?.system?.materials;

  if (!mat) return "";

  if (typeof mat === "string") return mat.trim();

  if (typeof mat === "object" && mat.value != null) {
    return String(mat.value).trim();
  }

  return "";
}

function getSourceBook(spell) {
  return (
    spell.source_book ||
    spell.format_data?.system?.source?.book ||
    spell.raw_data?.system?.source?.book ||
    ""
  );
}

// 🔹 Normalisasi nama class ke key icon
function normalizeClassKey(name) {
  if (!name) return "";
  const n = String(name).trim().toLowerCase().replace(/[_-]+/g, " ");

  if (n.includes("artificer")) return "artificer";
  if (n.includes("barbarian")) return "barbarian";
  if (n.includes("bard")) return "bard";
  if (n.includes("blood") && n.includes("hunter")) return "blood_hunter";
  if (n.includes("cleric")) return "cleric";
  if (n.includes("druid")) return "druid";
  if (n.includes("fighter")) return "fighter";
  if (n.includes("illriger") || n.includes("illrigger")) return "illriger";
  if (n.includes("monk")) return "monk";
  if (n.includes("paladin")) return "paladin";
  if (n.includes("ranger")) return "ranger";
  if (n.includes("rogue")) return "rogue";
  if (n.includes("sorcerer")) return "sorcerer";
  if (n === "ua" || n.includes("unearthed")) return "ua";
  if (n.includes("warlock")) return "warlock";
  if (n.includes("wizard")) return "wizard";

  return "";
}

// 🔹 Ambil daftar class yang punya icon
function getClassEntries(spell) {
  const raw =
    spell.classes ||
    spell.class ||
    spell.format_data?.system?.classes ||
    spell.raw_data?.system?.classes;

  if (!raw) return [];

  let list = [];

  if (Array.isArray(raw)) {
    list = raw;
  } else if (typeof raw === "string") {
    list = raw
      .split(/[;,/]/)
      .map((s) => s.trim())
      .filter(Boolean);
  } else if (typeof raw === "object") {
    list = Object.entries(raw)
      .filter(([, v]) => !!v)
      .map(([k]) => k);
  }

  const seen = new Set();
  const result = [];

  for (const item of list) {
    const key = normalizeClassKey(item);
    if (!key || seen.has(key)) continue;
    const iconData = CLASS_ICON_DATA[key];
    if (!iconData) continue;
    seen.add(key);
    result.push({ key, ...iconData });
  }

  return result;
}

// 🔹 Normalisasi nama damage ke key icon
function normalizeDamageKey(name) {
  if (!name) return "";
  const n = String(name).trim().toLowerCase();

  if (n.includes("acid")) return "acid";
  if (n.includes("cold") || n.includes("frost") || n.includes("ice"))
    return "cold";
  if (n.includes("fire")) return "fire";
  if (n.includes("force")) return "force";
  if (n.includes("lightning") || n.includes("electric")) return "lightning";
  if (n.includes("necrotic")) return "necrotic";
  if (n.includes("poison")) return "poison";
  if (n.includes("radiant")) return "radiant";
  if (n.includes("thunder")) return "thunder";
  if (n.includes("psychic")) return "physic";
  if (n.includes("physical") || n.includes("bludgeon") || n.includes("slash") || n.includes("pierc"))
    return "physical";

  return "";
}

// 🔹 Ambil daftar damage type yang punya icon
function getDamageEntries(spell) {
  const raw =
    spell.damage_type ||
    spell.damageTypes ||
    spell.format_data?.system?.damage?.damageType ||
    spell.raw_data?.system?.damage?.damageType;

  if (!raw) return [];

  let list = [];

  if (Array.isArray(raw)) {
    list = raw;
  } else if (typeof raw === "string") {
    list = raw
      .split(/[;,/]/)
      .map((s) => s.trim())
      .filter(Boolean);
  } else if (typeof raw === "object") {
    list = Object.entries(raw)
      .filter(([, v]) => !!v)
      .map(([k]) => k);
  }

  const seen = new Set();
  const result = [];

  for (const item of list) {
    const key = normalizeDamageKey(item);
    if (!key || seen.has(key)) continue;
    const iconData = DAMAGE_ICON_DATA[key];
    if (!iconData) continue;
    seen.add(key);
    result.push({ key, ...iconData });
  }

  return result;
}

export default function SpellDetail({ spell, onSpellUpdate }) {
  const emitUpdate = onSpellUpdate || (() => {});

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const [myRating, setMyRating] = useState("");
  const [avgLetter, setAvgLetter] = useState("");
  const [avgScore, setAvgScore] = useState(null);
  const [ratingTotal, setRatingTotal] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);

  const [activeProp, setActiveProp] = useState(null);
  const [activeClassKey, setActiveClassKey] = useState(null);
  const [activeDamageKey, setActiveDamageKey] = useState(null);

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
      setActiveClassKey(null);
      setActiveDamageKey(null);
      return;
    }

    // FAVORITES
    setFavoriteCount(spell.favorites_count ?? 0);
    setIsFavorite(Boolean(spell.is_favorite));

    // RATINGS
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
    setActiveClassKey(null);
    setActiveDamageKey(null);
  }, [spell?.id, spell?.__global_id, spell?.name]);

  async function handleToggleFavorite() {
    if (!spell?.id) return;
    if (!isLoggedIn) return;
    if (favLoading) return;

    try {
      setFavLoading(true);

      const res = await fetch(
        `${API_BASE}/ignite/spells/${spell.id}/favorite`,
        {
          method: "POST",
          credentials: "include",
        }
      );

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
    const rating = val === "" ? null : val; // "" = NONE → hapus rating

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

  const schoolLabel = getSchoolLabel(spell);
  const activationRaw = getActivationLabel(spell);
  const durationRaw = getDurationLabel(spell);
  const rangeLabel = getRangeLabel(spell);
  const materialLabel = getMaterialLabel(spell);
  const sourceBook = getSourceBook(spell);

  const components =
    safeText(spell.components) ||
    safeText(spell.format_data?.system?.components?.value) ||
    safeText(spell.raw_data?.system?.components?.value);

  const classEntries = getClassEntries(spell);
  const damageEntries = getDamageEntries(spell);

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

  const properties = getProperties(spell);
  const propertiesLower = properties.map((p) => p.toLowerCase());

  // fallback ke components jika ada
  const compFlags =
    spell.format_data?.system?.components ||
    spell.raw_data?.system?.components ||
    {};

  const hasConcentration =
    propertiesLower.includes("concentration") || !!compFlags.concentration;

  const hasRitual = propertiesLower.includes("ritual") || !!compFlags.ritual;

  // Subtitle: Level • School
  const subtitleParts = [];
  if (levelLabel) subtitleParts.push(levelLabel);
  if (schoolLabel) subtitleParts.push(schoolLabel);
  const subtitle = subtitleParts.join(" • ");

  // Activation + Ritual text
  let activationLabel = activationRaw;
  if (activationLabel && hasRitual && !/ritual/i.test(activationLabel)) {
    activationLabel = `${activationLabel} or Ritual`;
  }

  // Duration + Concentration text
  let durationLabel = durationRaw;
  if (
    durationLabel &&
    hasConcentration &&
    !/^concentration/i.test(durationLabel)
  ) {
    durationLabel = `Concentration, up to ${durationLabel}`;
  }

  // ACTIVE PROPERTY PANEL
  const activePropKey = activeProp ? activeProp.toLowerCase() : "";
  const activeTitle =
    PROPERTY_LABELS[activePropKey] ||
    (activeProp ? cap(activeProp.replace(/_/g, " ")) : "");
  const activeDescription =
    PROPERTY_DESCRIPTIONS[activePropKey] || "No additional information.";

  return (
    <div className="flex flex-col h-full">
      {/* HEADER UTAMA */}
      <div className="flex items-start gap-3 sm:gap-4">
        {/* KIRI: GAMBAR */}
        <div className="shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-slate-700 overflow-hidden">
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

        {/* KANAN: INFO SPELL */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg lg:text-2xl font-semibold break-words leading-tight">
                  {name}
                </h1>

                {hasConcentration && (
                  <img
                    src={ICON_CONCENTRATION}
                    alt="Concentration"
                    className="w-5 h-5"
                    title="Concentration"
                  />
                )}

                {hasRitual && (
                  <img
                    src={ICON_RITUAL}
                    alt="Ritual"
                    className="w-5 h-5"
                    title="Ritual"
                  />
                )}
              </div>

              {rangeLabel && (
                <div className="text-[11px] text-slate-300 mt-1 break-words">
                  <div>Range : {rangeLabel}</div>
                </div>
              )}

              {activationLabel && (
                <p className="text-[11px] text-slate-300 mt-1 break-words">
                  Casting : {activationLabel}
                </p>
              )}

              {durationLabel && (
                <p className="text-[11px] text-slate-300 mt-0.5 break-words">
                  Duration : {durationLabel}
                </p>
              )}

              {materialLabel && (
                <p className="text-[11px] text-slate-300 mt-0.5 break-words">
                  Material : {materialLabel}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 mt-1 sm:mt-0">
              {subtitle && (
                <p className="text-[12px] sm:text-sm text-slate-300 leading-tight">
                  {subtitle}
                </p>
              )}
              {sourceBook && (
                <p className="text-[10px] text-slate-400 leading-tight">
                  {sourceBook}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BAR FAVORITES + AVG LETTER */}
      <div className="mt-3 mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Heart
              className={`w-3.5 h-3.5 ${
                favoriteCount > 0
                  ? "text-rose-400 fill-rose-400"
                  : "text-slate-500"
              }`}
            />
            <span className="truncate max-w-[180px]">
              {favoriteCount > 0
                ? `${favoriteCount} favorites`
                : "No favorites yet"}
            </span>
          </div>

          <div className="px-2 py-0.5 rounded-full border border-slate-600 text-xs font-semibold text-white min-w-[28px] text-center">
            {avgLetter || "-"}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end">
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
                  isFavorite ? "text-rose-500 fill-rose-500" : "text-current"
                }`}
              />
              <span className="whitespace-nowrap">
                {isFavorite ? "Favorited" : "Add to favorites"}
              </span>
            </button>
          )}

          {isLoggedIn && (
            <select
              value={myRating}
              onChange={handleChangeRating}
              disabled={ratingLoading}
              className="bg-slate-900/80 border border-slate-600 text-[11px] rounded-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-300 min-w-[72px]"
            >
              <option value="">None</option>
              {RATING_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* GARIS PEMISAH */}
      <div className="my-2 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

      {/* BODY */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1">
          {components && (
            <div className="mb-2 text-[11px] text-slate-300 break-words">
              <span className="font-semibold text-slate-200">Components:</span>{" "}
              {components}
            </div>
          )}

          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Description
          </p>

          <div
            className="text-[13px] leading-relaxed text-slate-100/90 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />

          <div className="my-2 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

          {classEntries.length > 0 && (
            <div className="mb-3 text-[11px] text-slate-300 ">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Classes
              </p>
              <div className="flex flex-wrap gap-2">
                {classEntries.map((cls) => {
                  const isActive = activeClassKey === cls.key;
                  return (
                    <button
                      key={cls.key}
                      type="button"
                      onClick={() =>
                        setActiveClassKey((prev) =>
                          prev === cls.key ? null : cls.key
                        )
                      }
                      className={`relative w-7 h-7 rounded-md flex items-center justify-center bg-slate-900/60 border border-slate-700 hover:border-amber-300/70 transition ${
                        isActive ? "ring-1 ring-amber-300" : ""
                      }`}
                    >
                      <img
                        src={cls.src}
                        alt={cls.label}
                        className="w-6 h-6 object-contain"
                      />

                      {isActive && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-100 border border-slate-600 whitespace-nowrap shadow-lg">
                          {cls.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {damageEntries.length > 0 && (
            <div className="mb-3 text-[11px] text-slate-300 ">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Damage Type
              </p>
              <div className="flex flex-wrap gap-2">
                {damageEntries.map((dmg) => {
                  const isActive = activeDamageKey === dmg.key;
                  return (
                    <button
                      key={dmg.key}
                      type="button"
                      onClick={() =>
                        setActiveDamageKey((prev) =>
                          prev === dmg.key ? null : dmg.key
                        )
                      }
                      className={`relative w-7 h-7 rounded-md flex items-center justify-center bg-slate-900/60 border border-slate-700 hover:border-amber-300/70 transition ${
                        isActive ? "ring-1 ring-amber-300" : ""
                      }`}
                    >
                      <img
                        src={dmg.src}
                        alt={dmg.label}
                        className="w-6 h-6 object-contain"
                      />

                      {isActive && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-100 border border-slate-600 whitespace-nowrap shadow-lg">
                          {dmg.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
                <div className="font-semibold mb-1">{activeTitle}</div>
                <div
                  className="leading-snug text-slate-300 prose prose-invert prose-xs max-w-none"
                  dangerouslySetInnerHTML={{ __html: activeDescription }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
