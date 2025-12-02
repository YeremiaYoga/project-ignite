"use client";

import { useState } from "react";

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

function getRangeLabel(spell) {
  const range =
    spell.range ||
    spell.format_data?.system?.range ||
    spell.raw_data?.system?.range;

  if (!range) return "";

  if (typeof range === "string") return range;

  const value = range.value;
  const units = range.units || range.unit;

  if (!units && value == null) return safeText(range);

  if (units === "self" || units === "Self") return "Self";
  if (units === "touch" || units === "Touch") return "Touch";

  if (value != null && Number(value) !== 0 && units) {
    return `${value} ${units}`;
  }

  if (units) return cap(String(units));

  return safeText(range);
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

export default function SpellDetail({ spell }) {
  const [activeProp, setActiveProp] = useState(null);

  if (!spell) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
        Select a spell from the list.
      </div>
    );
  }

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

  // SESUAI REQUEST: material & source TIDAK ditampilkan
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
  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-start mb-3 gap-4">
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

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="lg:text-2xl font-semibold break-words leading-tight">
                {name}
              </h1>

              {rangeLabel && (
                <div className="text-xs text-slate-300 mt-1 break-words">
                  <div>Range : {getRangeLabel(spell)}</div>
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

            {subtitle && (
              <p className="text-right text-xs text-slate-300 leading-tight shrink-0">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="my-2 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

      {/* BODY */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1">
          {/* Components saja (material & source dihapus) */}
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

        {/* PROPERTIES PALING BAWAH SEPERTI "BAR" */}
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
                    onClick={() =>
                      setActiveProp((prev) => (prev === code ? null : code))
                    }
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

            {/* {activeProp && (
              <div className="mt-2 text-[11px] text-slate-100 bg-slate-900/95 border border-slate-700 rounded-lg p-2">
                <div className="font-semibold mb-1">
                  {cap(activeProp.replace(/_/g, " "))}
                </div>
                <p className="leading-snug text-slate-300">
            
                  No additional description configured.
                </p>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}
