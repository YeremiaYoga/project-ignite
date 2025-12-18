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

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean);
  if (typeof tags === "string") {
    // handle format "{tag1,tag2}" dari postgres
    const cleaned = tags.replace(/[{}"]/g, "");
    return cleaned
      .split(/[;,]/)
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
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
  const source = feat.source || "";
  const createdAt = formatDate(feat.created_at);
  const image = feat.image || "/assets/example_token.png";

  const description =
    feat.description && feat.description.trim()
      ? feat.description
      : "";
  const featText =
    feat.feat && feat.feat.trim()
      ? feat.feat
      : "";
  const notes =
    feat.notes && feat.notes.trim()
      ? feat.notes
      : "";

  const tags = useMemo(() => normalizeTags(feat.tags), [feat.tags]);

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
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
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg lg:text-2xl font-semibold break-words leading-tight">
                {name}
              </h1>

              {source && (
                <p className="text-[11px] text-slate-300 mt-1 break-words">
                  Source: {source}
                </p>
              )}

              {createdAt && (
                <p className="text-[11px] text-slate-400 mt-0.5 break-words">
                  Added: {createdAt}
                </p>
              )}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-start sm:justify-end mt-1 sm:mt-0">
                {tags.map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-600 text-[10px] text-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="my-3 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

      {/* BODY */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-[13px] leading-relaxed text-slate-100/90">
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

          {featText && (
            <section>
              <h2 className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Feat Details
              </h2>
              <p className="whitespace-pre-line text-slate-100/90">
                {featText}
              </p>
            </section>
          )}

          {notes && (
            <section>
              <h2 className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Notes
              </h2>
              <p className="whitespace-pre-line text-slate-100/90">
                {notes}
              </p>
            </section>
          )}

          {!description && !featText && !notes && (
            <p className="text-sm text-slate-400">
              No additional information for this feat.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
