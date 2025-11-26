"use client";

const weaponTypeLabelMap = {
  martialR: "Martial Ranged",
  martialM: "Martial Melee",
  simpleR: "Simple Ranged",
  simpleM: "Simple Melee",
};

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
  const weaponTypeRaw = item.weapon_type || "";
  const weaponType = weaponTypeLabelMap[weaponTypeRaw] || weaponTypeRaw || null;
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

  const priceLabel =
    typeof price === "number"
      ? `${price.toLocaleString("en-US")} gp`
      : price || "-";

  const weightLabel = weight ? `${weight} lb` : "-";

  // ====== PARSE DAMAGE TYPES & PROPERTIES ======
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
  }

  // ====== DESCRIPTION (HTML) ======
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

function getTypeLine(item) {
  const type = cap(item.__type || item.type || "");
  const base = cap(item.base_item || "");
  const typeValue = cap(item.type_value || "");
  const subtype = cap(item.subtype || "");
  const toolType = cap(item.tool_type || item.toolType || "");

  switch ((item.__type || item.type || "").toLowerCase()) {
    case "weapon":
      return joinClean([type, base]);

    case "consumable":
      return joinClean([type, typeValue, subtype]);

    case "container":
      return type;

    case "equipment":
      return joinClean([
        type,
        typeValue ? `${typeValue} Armor` : "",
        base,
      ]);

    case "tool":
      return toolType || type;

    case "loot":
      return joinClean(["Loot " + typeValue, base]);

    default:
      return type;
  }
}


  return (
    // border border-rose-500/80 bg-gradient-to-br from-rose-900/50
    <>
      {/* Header: image + title */}
      <div className="flex items-start mb-5 gap-4">
        <div className="shrink-0">
          <div className="w-16 h-14 rounded-xl  to-slate-900 flex items-center justify-center text-[11px] font-semibold text-rose-200 shadow">
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
              <h1 className="text-2xl font-semibold  break-words leading-tight">
                {name}
              </h1>
              <div>
                <p className="text-xs text-slate-300 mt-1 break-words">
                  {getTypeLine(item)}
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-indigo-300 leading-tight shrink-0 w-[160px]">
              <div className="break-words">
                {priceLabel}
                {weight && `, ${weightLabel}`}
              </div>
              {rarity && (
                <div className="mt-1 font-semibold text-violet-300 break-words capitalize">
                  ({rarity})
                </div>
              )}
              {/* {attunement && (
                <div className="mt-1 text-[11px] text-amber-300">
                  Requires Attunement
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Info / tags card */}
      {/* <div className="space-y-2 text-[13px] bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 shadow-sm">
   
        {damageTypes.length > 0 && (
          <p>
            <span className="text-slate-400 mr-1">Damage:</span>
            {damageTypes.map((dt) => (
              <span
                key={dt}
                className="inline-flex items-center px-2 py-0.5 mr-1 rounded-full bg-slate-800 text-amber-200 text-[11px] uppercase tracking-wide"
              >
                {dt}
              </span>
            ))}
          </p>
        )}

  
        {properties.length > 0 && (
          <p className="flex items-start gap-2">
            <span className="text-slate-400 mt-[2px]">Properties:</span>
            <span className="flex flex-wrap gap-1">
              {properties.map((prop) => (
                <span
                  key={prop}
                  className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-100 uppercase tracking-wide"
                >
                  {prop}
                </span>
              ))}
            </span>
          </p>
        )}


        {(sourceBook || compendiumSource) && (
          <p className="text-[11px] text-slate-400">
            {sourceBook && (
              <>
                <span className="font-semibold text-slate-300">
                  Source Book:
                </span>{" "}
                {sourceBook}
              </>
            )}
            {sourceBook && compendiumSource && " • "}
            {compendiumSource && (
              <>
                <span className="font-semibold text-slate-300">
                  Compendium:
                </span>{" "}
                {compendiumSource}
              </>
            )}
          </p>
        )}
      </div> */}

      {/* Divider */}
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

      {/* Description pakai DANGEROUS HTML */}
      <div className="flex-1 overflow-y-auto pr-1">
        <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
          Description
        </p>

        <div
          className="text-sm leading-relaxed text-slate-100/90 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      </div>

      {/* Bottom buttons */}
      <div className="mt-5 flex gap-3">
        {properties.length > 0 && (
          <button className="px-4 py-2 bg-amber-300 text-slate-900 rounded-xl text-sm font-medium hover:bg-amber-200 transition">
            View Properties
          </button>
        )}
        {compendiumSource && (
          <button className="px-4 py-2 bg-slate-800 text-slate-100 rounded-xl border border-slate-700 text-sm hover:bg-slate-700 transition">
            Open Compendium
          </button>
        )}
      </div>
    </>
  );
}
