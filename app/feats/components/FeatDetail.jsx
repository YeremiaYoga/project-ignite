// app/feats/components/FeatDetail.jsx
"use client";

import { useMemo } from "react";

function formatDate(val) {
  if (!val) return "";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

// parse prerequisites jsonb -> array string rapi
function normalizePrerequisites(prereq) {
  if (!prereq) return [];

  // kalau sudah array of string
  if (Array.isArray(prereq)) {
    return prereq
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") return item.trim() || null;
        if (typeof item === "object") {
          const name =
            item.label ||
            item.name ||
            item.title ||
            item.type ||
            "Prerequisite";
          const level =
            item.level ?? item.min_level ?? item.level_required ?? null;
          const extra = item.detail || item.desc || "";
          let s = name;
          if (level != null && level !== "") {
            s += ` (Level ${level})`;
          }
          if (extra) {
            s += ` – ${extra}`;
          }
          return s.trim() || null;
        }
        return String(item).trim() || null;
      })
      .filter(Boolean);
  }

  // kalau object tunggal
  if (typeof prereq === "object") {
    const name =
      prereq.label ||
      prereq.name ||
      prereq.title ||
      prereq.type ||
      "Prerequisite";
    const level =
      prereq.level ?? prereq.min_level ?? prereq.level_required ?? null;
    const extra = prereq.detail || prereq.desc || "";
    let s = name;
    if (level != null && level !== "") {
      s += ` (Level ${level})`;
    }
    if (extra) {
      s += ` – ${extra}`;
    }
    return s.trim() ? [s.trim()] : [];
  }

  // fallback string / lainnya
  return String(prereq)
    .split(/[;\n]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

// ringkasan singkat untuk di top bar (ambil 1–2 prereq saja)
function getPrereqSummary(prereqList) {
  if (!prereqList || prereqList.length === 0) return "";
  if (prereqList.length === 1) return prereqList[0];
  return `${prereqList[0]}, ${prereqList[1]}${
    prereqList.length > 2 ? "…" : ""
  }`;
}

function isRepeatableFromProperties(properties) {
  if (!properties) return false;
  const text =
    typeof properties === "string" ? properties : JSON.stringify(properties);
  return /repeatable/i.test(text);
}

export default function FeatDetail({ feat }) {
  if (!feat) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
        Select a feat from the list.
      </div>
    );
  }

  const name = feat.name || "Unnamed feat";

  // source_book dari tabel foundry_feats
  const source = feat.source_book || feat.source || "";
  const createdAt = formatDate(feat.created_at);

  const image = feat.image || "/assets/example_token.png";

  // text description
  const description =
    typeof feat.description === "string" && feat.description.trim()
      ? feat.description
      : "";

  // text requirements
  const requirementsText =
    typeof feat.requirements === "string" && feat.requirements.trim()
      ? feat.requirements.trim()
      : "";

  // prerequisites jsonb
  const prereqList = useMemo(
    () => normalizePrerequisites(feat.prerequisites),
    [feat.prerequisites]
  );

  const prereqSummary = getPrereqSummary(prereqList);

  // type / feat_type / subtype
  const featType = feat.feat_type || feat.type || "";
  const subtype = feat.subtype || "";

  // repeatable info dari properties
  const isRepeatable = isRepeatableFromProperties(feat.properties);

  return (
    <div className="flex flex-col h-full">
      {/* ===== TOP BAR ===== */}
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-slate-700 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/assets/example_token.png";
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0 space-y-0.5">
              {/* Name */}
              <h1 className="text-base sm:text-lg lg:text-2xl font-semibold break-words leading-tight">
                {name}
              </h1>

              {/* Requirements (prereq summary & level) */}
              {(requirementsText || prereqSummary) && (
                <p className="text-[11px] text-slate-200 break-words">
                  <span className="font-semibold text-slate-300">
                    Requirements:
                  </span>{" "}
                  {requirementsText}
                  {requirementsText && prereqSummary ? " – " : ""}
                  {prereqSummary && (
                    <span className="text-slate-200">{prereqSummary}</span>
                  )}
                </p>
              )}

              {/* Type (value) (type(subtype)) */}
              {(featType || subtype) && (
                <p className="text-[11px] text-slate-200 break-words">
                  <span className="font-semibold text-slate-300">Type:</span>{" "}
                  {featType || "-"}
                  {subtype ? ` (${subtype})` : ""}
                </p>
              )}

              {/* Source */}
              {source && (
                <p className="text-[11px] text-slate-300 break-words">
                  <span className="font-semibold text-slate-300">Source:</span>{" "}
                  {source}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="my-3 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-[13px] leading-relaxed text-slate-100/90">
          {/* Description */}
          {description && (
            <section>
              <h2 className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Description
              </h2>
              <p className="whitespace-pre-line text-slate-100/90">
                {description}
              </p>
            </section>
          )}

          {/* Prerequisites */}
          {feat.prerequisites && (
            <section>
              <h2 className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Prerequisites
              </h2>

              <p className="text-[12px] text-slate-200">
                <span className="font-semibold text-slate-300">Level:</span>{" "}
                {feat.prerequisites.level ?? 0}
              </p>

              <p className="text-[12px] text-slate-200">
                <span className="font-semibold text-slate-300">
                  Repeatable:
                </span>{" "}
                {String(feat.prerequisites.repeatable)}
              </p>
            </section>
          )}

          {!description && !feat.prerequisites && (
            <p className="text-sm text-slate-400">No additional information.</p>
          )}
        </div>
      </div>
    </div>
  );
}
