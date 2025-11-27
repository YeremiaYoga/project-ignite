"use client";

// urutan properties
const PROPERTY_ORDER = [
  "mgc",
  "fin",
  "ver",
  "hvy",
  "lgt",
  "two",
  "rch",
  "sil",
  "thr",
  "amm",
  "foc",
  "lod",
  "rel",
  "ada",
  "fir",
  "spc",
];

const PROPERTY_META = {
  mgc: { label: "✨Magical✨", description: "✨Magical✨" },
  fin: { label: "Finesse", description: "Finesse" },
  ver: { label: "Versatile", description: "Versatile" },
  hvy: { label: "Heavy", description: "Heavy" },
  lgt: { label: "Light", description: "Light" },
  two: { label: "Two-handed Weapon", description: "Two-handed Weapon" },
  rch: { label: "Reach", description: "Reach" },
  sil: { label: "Silvered", description: "Silvered" },
  thr: { label: "Thrown", description: "Thrown" },
  amm: { label: "Ammunition", description: "Ammunition" },
  foc: { label: "Focus", description: "Focus" },
  lod: { label: "Loading", description: "Loading" },
  rel: { label: "Reloading", description: "Reloading" },
  ada: { label: "Adamantine", description: "Adamantine" },
  fir: { label: "Firearm", description: "Firearm" },
  spc: { label: "Special", description: "Special" },
};

// mapping warna rarity
const RARITY_COLORS = {
  common: "#b5bda6",
  uncommon: "#78c178",
  rare: "#6464bd",
  "very rare": "#62c1ad",
  legendary: "#bb9348",
  artifact: "#a46b43",
};
function normalizeRarityKey(r) {
  if (!r) return "";

  let key = r.toLowerCase().trim();

  key = key.replace(/[-_]/g, " ");

  key = key.replace(/\s+/g, " ");

  if (key.replace(/\s+/g, "") === "veryrare") {
    key = "very rare";
  }

  return key;
}

const MASTERY_DESCRIPTIONS = {};

export default function ItemDetail({ item }) {
  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
        Select an item from the list.
      </div>
    );
  }

  // ====== BASIC FIELDS ======
  const name = item.name || "Unnamed item";
  const type = item.__type || item.type || "";
  const rarity = item.rarity || item.rarity_name || "";
  const rarityKey = normalizeRarityKey(item.rarity);
  const rarityColor = RARITY_COLORS[rarityKey] || "#e5e7eb";

  const weaponTypeRaw = item.weapon_type || "";
  const mastery = item.mastery || "";
  const attunement = item.attunement || "";
  const sourceBook = item.source_book || "";
  const compendiumSource = item.compendium_source || "";

  const price = item.price ?? item.cost ?? "";
  const weight = item.weight ?? "";

  const imgSrc =
    item.image ||
    item.format_data?.img ||
    item.raw_data?.img ||
    "/assets/example_token.png";

  // slug untuk anchor / share link
  const slugBase = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const slug =
    item.id != null ? `${slugBase}-${String(item.id).slice(-6)}` : slugBase;

  function formatNumber(value) {
    return value.toLocaleString("de-DE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  function formatPriceLabel(value) {
    if (value == null || isNaN(value)) return "-";

    if (value < 10) {
      return `${formatNumber(value)} Cp`;
    }

    if (value < 100) {
      const sp = value / 10;
      return `${formatNumber(sp)} Sp`;
    }

    const gp = value / 100;
    return `${formatNumber(gp)} Gp`;
  }

  const rawPrice = typeof price === "number" ? price : Number(price ?? NaN);
  const priceLabel =
    typeof rawPrice === "number" && !Number.isNaN(rawPrice)
      ? formatPriceLabel(rawPrice)
      : "-";

  const weightLabel = weight ? `${weight} lb` : "-";

  let damageTypes = [];
  if (Array.isArray(item.damage_type)) {
    damageTypes = item.damage_type;
  } else if (typeof item.damage_type === "string" && item.damage_type.trim()) {
    try {
      damageTypes = JSON.parse(item.damage_type);
    } catch {
      damageTypes = [item.damage_type];
    }
  }

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
    // handle bentuk { mgc: true, fin: true, ... }
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
    const type = cap(item.__type || item.type || "");
    const base = cap(item.base_item || "");
    const typeValueRaw = item.type_value || "";
    const typeValue = cap(typeValueRaw);
    const subtype = cap(item.subtype || "");
    const toolType = cap(item.tool_type || item.toolType || "");

    switch ((item.__type || item.type || "").toLowerCase()) {
      case "weapon": {
        const mapped = mapWeaponTypeValue(typeValueRaw);
        return joinClean([type, base, mapped]);
      }

      case "consumable":
        return joinClean([type, typeValue, subtype]);

      case "container":
        return type;

      case "equipment":
        return joinClean([type, typeValue ? `${typeValue} Armor` : "", base]);

      case "tool":
        return toolType || type;

      case "loot":
        return joinClean(["Loot " + typeValue, base]);

      default:
        return type;
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
    <>
      {/* HEADER */}
      <div className="flex items-start mb-5 gap-4">
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
                className="text-2xl font-semibold break-words leading-tight"
                style={{ color: rarityColor }}
              >
                {name}
              </h1>

              <p className="text-xs text-slate-300 mt-1 break-words">
                {getTypeLine(item)}
              </p>
            </div>

            <div className="text-right text-xs text-indigo-300 leading-tight shrink-0 w-[160px]">
              <div className="break-words">
                {priceLabel}
                {weight && `, ${weightLabel}`}
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

      <div className="my-4 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

      {/* DESCRIPTION */}
      <div className="flex-1">
        <div className=" overflow-y-auto pr-1">
          <p className="text-sm uppercase tracking-wide text-slate-400 mb-1">
            Description
          </p>

          <div
            className="text-sm leading-relaxed text-slate-100/90 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
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

      {/* PROPERTIES BAR */}
      {orderedDisplayProperties.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {orderedDisplayProperties.map((code) => {
              const meta = PROPERTY_META[code] || {
                label: code.toUpperCase(),
              };
              const tooltip = meta.label;

              return (
                <div
                  key={code}
                  className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-600 text-[11px] text-slate-100 cursor-default hover:border-amber-300/70 hover:bg-slate-700/80 transition"
                  // title={tooltip}
                >
                  {meta.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
