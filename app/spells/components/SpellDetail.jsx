"use client";

import { useMemo } from "react";

const SCHOOL_COLORS = {
  abjuration: "#60a5fa",
  conjuration: "#34d399",
  divination: "#facc15",
  enchantment: "#f97316",
  evocation: "#ef4444",
  illusion: "#a855f7",
  necromancy: "#6b7280",
  transmutation: "#22c55e",
};

function normalizeSchool(school) {
  if (!school) return "";
  return String(school).toLowerCase().trim();
}

// -------- helpers biar nggak ngasih object ke JSX --------
function safeText(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value
      .map((v) => safeText(v))
      .filter(Boolean)
      .join(", ");
  }
  if (typeof value === "object") {
    return Object.values(value)
      .map((v) => safeText(v))
      .filter(Boolean)
      .join(", ");
  }
  return "";
}

function stringifySource(src) {
  if (!src) return "";
  if (typeof src === "string" || typeof src === "number") {
    return String(src);
  }
  if (typeof src === "object") {
    // khusus format { book, page, rules, custom, license, revision, ... }
    const { book, page, rules, custom, license, revision, ...rest } = src;
    const parts = [];

    if (book) parts.push(String(book));
    if (page) parts.push(`p. ${page}`);
    if (rules) parts.push(String(rules));
    if (custom) parts.push(String(custom));
    if (license) parts.push(`(${license})`);
    if (revision) parts.push(`rev. ${revision}`);

    const other = Object.values(rest)
      .map((v) => safeText(v))
      .filter(Boolean)
      .join(", ");

    if (other) parts.push(other);

    return parts.join(" – ");
  }
  return String(src);
}

export default function SpellDetail({ spell }) {
  if (!spell) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
        Select a spell from the list.
      </div>
    );
  }

  const name = spell.name || "Unnamed spell";
  const level = spell.level ?? spell.level_int ?? spell.lvl ?? 0;
  const schoolRaw = spell.school || spell.school_name || "";
  const schoolKey = normalizeSchool(schoolRaw);
  const schoolColor = SCHOOL_COLORS[schoolKey] || null;

  const castingTime = safeText(
    spell.activation ||
      spell.casting_time ||
      spell.cast_time ||
      spell.format_data?.system?.activation?.value ||
      spell.raw_data?.system?.activation?.value
  );

  const range = safeText(
    spell.range ||
      spell.format_data?.system?.range?.value ||
      spell.raw_data?.system?.range?.value
  );

  const duration = safeText(
    spell.duration ||
      spell.format_data?.system?.duration?.value ||
      spell.raw_data?.system?.duration?.value
  );

  const components = safeText(
    spell.components ||
      spell.format_data?.system?.components?.value ||
      spell.raw_data?.system?.components?.value
  );

  const material = safeText(
    spell.material ||
      spell.materials ||
      spell.format_data?.system?.materials?.value ||
      spell.raw_data?.system?.materials?.value
  );

  const source = stringifySource(
    spell.source ||
      spell.sourcebook ||
      spell.compendium_source ||
      spell.format_data?.system?.source ||
      spell.raw_data?.system?.source
  );

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

  const levelLabel =
    Number(level) === 0
      ? "Cantrip"
      : `Level ${Number.isNaN(Number(level)) ? level : Number(level)}`;

  const subtitle = useMemo(() => {
    const parts = [];
    if (levelLabel) parts.push(levelLabel);
    if (schoolRaw) parts.push(schoolRaw);
    return parts.join(" • ");
  }, [levelLabel, schoolRaw]);

  const titleStyle = schoolColor ? { color: schoolColor } : {};
  const borderStyle = schoolColor ? { borderColor: schoolColor } : {};

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-start mb-3 gap-4">
        <div className="shrink-0">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-[11px] font-semibold text-slate-200 shadow border"
            style={borderStyle}
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
                className="lg:text-2xl font-semibold break-words leading-tight"
                style={titleStyle}
              >
                {name}
              </h1>

              <p className="text-xs text-slate-300 mt-1 break-words">
                {subtitle}
              </p>
            </div>

            <div className="text-right text-[11px] text-indigo-300 leading-tight shrink-0 space-y-1">
              {castingTime && <div>Casting: {castingTime}</div>}
              {range && <div>Range: {range}</div>}
              {duration && <div>Duration: {duration}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="my-2 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

      {/* BODY */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1">
          {/* Quick meta */}
          <div className="mb-3 text-[11px] text-slate-300 space-y-1">
            {components && (
              <div>
                <span className="font-semibold text-slate-200">
                  Components:
                </span>{" "}
                {components}
              </div>
            )}
            {material && (
              <div>
                <span className="font-semibold text-slate-200">
                  Material:
                </span>{" "}
                {material}
              </div>
            )}
            {source && (
              <div>
                <span className="font-semibold text-slate-200">Source:</span>{" "}
                {source}
              </div>
            )}
          </div>

          <p className="text-sm uppercase tracking-wide text-slate-400 mb-1">
            Description
          </p>

          <div
            className="text-sm leading-relaxed text-slate-100/90 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      </div>
    </div>
  );
}
