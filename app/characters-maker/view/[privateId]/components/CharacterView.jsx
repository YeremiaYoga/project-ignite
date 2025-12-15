// app/characters/[id]/components/CharacterView.jsx
"use client";

import { useState } from "react";

export default function CharacterView({ character }) {
  const {
    name,
    subtitle,
    quote,
    portrait_url,
    token_url: tokenFromDb,
    type,
    role,
    chapters = [],
    bio_data = [],
    relationship_data = [],
    details_data = [],
    combat_data = [],
    personality_data = [],
    meta_data = [],
    ability_scores = {},
  } = character || {};

  const token_url =
    tokenFromDb ||
    "http://019a0f6bb5a27dc5b6ab32a19a8ad5d6.phanneldeliver.my.id/characters/ojbOUkwRojYraXc1fK/1765345940856ObRxWaz4.webp";

  const [activeImageTab, setActiveImageTab] = useState("portrait");
  const [activeInfoTab, setActiveInfoTab] = useState("Bio");

  // ---------- Helpers ----------
  const isPlainObject = (v) => v && typeof v === "object" && !Array.isArray(v);

  const renderAnyValue = (v) => {
    if (v === null || v === undefined) return "-";
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (typeof v === "boolean") return v ? "Yes" : "No";

    if (Array.isArray(v)) {
      // array of primitives
      if (v.every((x) => typeof x === "string" || typeof x === "number")) {
        return v.map(String).join(", ");
      }

      return JSON.stringify(v, null, 2);
    }

    // object -> stringify
    return JSON.stringify(v, null, 2);
  };

  const renderKeyValueObject = (obj) => {
    const entries = Object.entries(obj || {});
    if (!entries.length) {
      return <div className="text-[12px] text-slate-500 italic">No data.</div>;
    }

    return (
      <div className="space-y-2">
        {entries.map(([k, v]) => (
          <div key={k} className="text-[13px] text-slate-100">
            <span className="text-slate-400 capitalize">{k}:</span>{" "}
            <span className="text-slate-100">{renderAnyValue(v)}</span>
          </div>
        ))}
      </div>
    );
  };

  // ---------- Factions injector (tetap) ----------
  const factionsBioBlock = bio_data.find(
    (b) =>
      typeof b?.label === "string" &&
      b.label.toLowerCase() === "factions & affiliations"
  );

  const bioDataWithoutFactions = bio_data.filter(
    (b) =>
      !(
        typeof b?.label === "string" &&
        b.label.toLowerCase() === "factions & affiliations"
      )
  );

  let factionsRelationshipBlock = null;
  if (factionsBioBlock) {
    const rawItems = Array.isArray(factionsBioBlock.items)
      ? factionsBioBlock.items
      : factionsBioBlock.value
      ? [factionsBioBlock.value]
      : [];

    const relItems = rawItems.filter(Boolean).map((item) =>
      typeof item === "string" || typeof item === "number"
        ? {
            name: String(item),
            relationship: "Affiliation",
            status: null,
            notes: null,
          }
        : {
            name: item.name ?? item.label ?? "Unknown",
            relationship: item.relationship ?? "Affiliation",
            status: item.status ?? null,
            notes: item.notes ?? null,
          }
    );

    factionsRelationshipBlock = {
      label: factionsBioBlock.label || "Factions & Affiliations",
      items: relItems,
    };
  }

  const combinedRelationshipData = factionsRelationshipBlock
    ? [...relationship_data, factionsRelationshipBlock]
    : relationship_data;

  // ---------- Ability grid (tetap) ----------
  const renderAbilityScoresSection = () => {
    if (!ability_scores || Object.keys(ability_scores).length === 0) {
      return (
        <div className="text-[12px] text-slate-500 italic">
          No ability scores.
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {["STR", "DEX", "CON", "INT", "WIS", "CHA"].map((key) => {
            const score = ability_scores[key]?.score ?? "-";
            const mod = ability_scores[key]?.mod ?? 0;
            const modText =
              typeof mod === "number" ? (mod >= 0 ? `+${mod}` : `${mod}`) : mod;

            return (
              <div
                key={key}
                className="bg-[#111827] border border-slate-800 rounded-lg px-3 py-3 flex flex-col items-center"
              >
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                  {key}
                </div>
                <div className="text-xl text-slate-50 font-semibold leading-none">
                  {score}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{modText}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBlocks = (blocks = []) => {
    if (!blocks || !blocks.length) {
      return <div className="text-[12px] text-slate-500 italic">No data.</div>;
    }

    return (
      <div className="space-y-5">
        {blocks.map((block, idx) => {
          const labelLower =
            typeof block?.label === "string" ? block.label.toLowerCase() : "";

          const isNotableQuotes =
            labelLower === "notable quotes" && Array.isArray(block.items);

          const isAbilityScores = labelLower === "ability scores";

          const items = Array.isArray(block.items) ? block.items : null;
          const looksLikeRelationshipItems =
            items &&
            items.some(
              (it) =>
                isPlainObject(it) &&
                ("name" in it ||
                  "relationship" in it ||
                  "notes" in it ||
                  "status" in it)
            );

          const looksLikeQuoteObjects =
            items &&
            items.some(
              (it) => isPlainObject(it) && ("quote" in it || "author" in it)
            );
          const isFearsWeakness =
            labelLower === "fears & weakness" ||
            labelLower === "fears & weaknesses";
          const isMotivation = labelLower === "motivation";

          return (
            <div key={idx}>
              {block.label && (
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                  {block.label}
                </div>
              )}

              {isAbilityScores ? (
                renderAbilityScoresSection()
              ) : isNotableQuotes ? (
                <div className="space-y-2">
                  {block.items.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="bg-[#0b1120] border border-slate-800/80 border-l-4 border-l-[#d4a574] px-4 py-3 rounded-md text-[13px] text-slate-100 italic"
                    >
                      {q}
                    </div>
                  ))}
                </div>
              ) : looksLikeQuoteObjects ? (
                <div className="space-y-2">
                  {items.map((q, qIdx) => {
                    if (!q) return null;
                    const quoteText =
                      typeof q === "string" ? q : q.quote || q.text || "";
                    const author = typeof q === "object" ? q.author : null;

                    return (
                      <div
                        key={qIdx}
                        className="bg-[#0b1120] border border-slate-800/80 border-l-4 border-l-[#d4a574] px-4 py-3 rounded-md"
                      >
                        <div className="text-[13px] text-slate-100 italic">
                          {quoteText || "-"}
                        </div>
                        {author && (
                          <div className="text-[11px] text-slate-400 mt-1">
                            — {author}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : isFearsWeakness && items ? (
                <ul className="space-y-2">
                  {items.map((it, i2) => {
                    if (!it) return null;

                    // normalize: string atau object
                    const text =
                      typeof it === "string"
                        ? it
                        : it.name ||
                          it.fear ||
                          it["fear/weak"] ||
                          it.text ||
                          "";

                    const from =
                      typeof it === "object" && it
                        ? it.from || it.source || ""
                        : "";

                    if (!String(text).trim()) return null;

                    return (
                      <li key={i2} className="text-[13px] text-slate-100">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-start gap-2">
                            <span className="text-[#f4b974] mt-[2px]">•</span>
                            <span className="leading-snug">{text}</span>
                          </div>

                          {from && (
                            <div className="text-[11px] text-slate-400 ml-5">
                              from {from}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : isMotivation && items ? (
                <div className="space-y-3">
                  {items.map((it, i2) => {
                    if (!it) return null;

                    const text =
                      typeof it === "string"
                        ? it
                        : it.motivation || it.text || it.description || "";

                    const from =
                      typeof it === "object" && it ? it.from || "" : "";

                    if (!String(text).trim()) return null;

                    return (
                      <div key={i2} className="text-[13px] text-slate-100">
                        <div className="leading-snug">{text}</div>
                        {from && (
                          <div className="text-[11px] text-slate-400 mt-1">
                            from {from}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : looksLikeRelationshipItems ? (
                <ul className="space-y-2">
                  {items.map((item, i2) => {
                    if (!item) return null;
                    const { name, status, notes, relationship } = item || {};
                    const displayName =
                      name || item.label || item.title || "Unknown";

                    return (
                      <li key={i2} className="text-[13px] text-slate-100">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium">{displayName}</span>

                            {(relationship || item.relationship) && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#111827] border border-slate-700 text-[#f4b974] uppercase tracking-wide">
                                {relationship || item.relationship}
                              </span>
                            )}

                            {(status || item.status) && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 uppercase tracking-wide">
                                {status || item.status}
                              </span>
                            )}
                          </div>

                          {(notes || item.notes) && (
                            <p className="text-[12px] text-slate-300 leading-snug">
                              {notes || item.notes}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : items ? (
                <ul className="space-y-1.5">
                  {items.map((item, i2) => (
                    <li
                      key={i2}
                      className="text-[13px] text-slate-100 flex items-start"
                    >
                      <span className="text-[#f4b974] mr-2">•</span>
                      <span>
                        {typeof item === "string" || typeof item === "number"
                          ? item
                          : isPlainObject(item)
                          ? item.text ??
                            item.value ??
                            item.name ??
                            JSON.stringify(item)
                          : String(item)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : isPlainObject(block.value) ? (
                renderKeyValueObject(block.value)
              ) : (
                <div className="text-[13px] text-slate-100">
                  {renderAnyValue(block.value)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderRelationshipBlocks = (blocks = []) => {
    if (!blocks || !blocks.length) {
      return (
        <div className="text-[12px] text-slate-500 italic">
          No relationship data.
        </div>
      );
    }

    return (
      <div className="space-y-5">
        {blocks.map((block, idx) => (
          <div key={idx}>
            {block.label && (
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                {block.label}
              </div>
            )}

            {Array.isArray(block.items) && block.items.length > 0 ? (
              <ul className="space-y-2">
                {block.items.map((item, i2) => {
                  if (!item) return null;
                  const { name, status, notes, relationship } = item || {};
                  const displayName =
                    name || item.label || item.title || "Unknown";

                  return (
                    <li key={i2} className="text-[13px] text-slate-100">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{displayName}</span>

                          {(relationship || item.relationship) && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#111827] border border-slate-700 text-[#f4b974] uppercase tracking-wide">
                              {relationship || item.relationship}
                            </span>
                          )}

                          {(status || item.status) && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 uppercase tracking-wide">
                              {status || item.status}
                            </span>
                          )}
                        </div>

                        {(notes || item.notes) && (
                          <p className="text-[12px] text-slate-300 leading-snug">
                            {notes || item.notes}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-[12px] text-slate-500 italic">
                No entries.
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#050816] text-gray-100">
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
          {["Overview"].map((tab, idx) => {
            const isActive = idx === 0;
            return (
              <button
                key={tab}
                type="button"
                className={
                  isActive
                    ? "px-4 py-1.5 rounded-full border border-[#d4a574]/70 bg-[#d4a574]/15 text-[#f7ce8a] font-medium shadow-sm"
                    : "px-4 py-1.5 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent transition"
                }
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* TITLE + QUOTE */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#f7ce8a] mb-1">
            {name}
          </h1>

          <div className="text-sm md:text-base text-slate-400 mb-4">
            {subtitle}
          </div>

          {quote && (
            <div className="bg-[#0f1420] border-l-4 border-[#d4a574] px-6 py-4 rounded-r-lg shadow-sm">
              <div className="text-[#c49b6a] italic text-sm md:text-[15px] leading-relaxed">
                {quote}
              </div>
            </div>
          )}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
          {/* LEFT – CHAPTERS */}
          <div className="space-y-4">
            {chapters.map((ch, idx) => (
              <section
                key={idx}
                className="bg-[#0b1120] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm"
              >
                <header className="bg-[#121829] border-b border-slate-800 px-6 py-2.5">
                  <h2 className="text-sm md:text-[15px] font-semibold text-[#f4b974]">
                    {ch.title}
                  </h2>
                </header>
                <div className="px-6 py-4">
                  <p className="text-[13px] md:text-[14px] text-slate-200 whitespace-pre-line leading-relaxed">
                    {ch.body}
                  </p>
                </div>
              </section>
            ))}
          </div>

          {/* RIGHT – SIDEBAR CARD */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="bg-[#0b1120] border border-slate-800 rounded-lg overflow-hidden shadow-lg">
                {/* HEADER CARD */}
                <div className="bg-gradient-to-b from-[#151a2b] to-[#0b1120] border-b border-slate-800 px-4 py-3 text-center">
                  <div className="text-[11px] text-slate-400 mb-1 uppercase tracking-[0.2em]">
                    {type || "NPC"}
                  </div>
                  <div className="text-2xl text-[#f7ce8a] leading-tight">
                    {name}
                  </div>
                  {role && (
                    <div className="text-xs text-[#f4b974] mt-1">{role}</div>
                  )}
                </div>

                {/* PORTRAIT / TOKEN TABS */}
                <div className="flex border-b border-slate-800 bg-[#050816]">
                  <button
                    className={
                      activeImageTab === "portrait"
                        ? "flex-1 px-3 py-2.5 text-xs md:text-sm font-medium bg-[#151a2b] text-[#f7ce8a]"
                        : "flex-1 px-3 py-2.5 text-xs md:text-sm text-slate-400 hover:text-slate-100 hover:bg-[#101323] transition"
                    }
                    onClick={() => setActiveImageTab("portrait")}
                  >
                    Portrait
                  </button>
                  <div className="w-px bg-slate-800" />
                  <button
                    className={
                      activeImageTab === "token"
                        ? "flex-1 px-3 py-2.5 text-xs md:text-sm font-medium bg-[#151a2b] text-[#f7ce8a]"
                        : "flex-1 px-3 py-2.5 text-xs md:text-sm text-slate-400 hover:text-slate-100 hover:bg-[#101323] transition"
                    }
                    onClick={() => setActiveImageTab("token")}
                  >
                    Token
                  </button>
                </div>

                {/* IMAGE CONTENT */}
                <div className="p-4 bg-[#050816]">
                  <div className="bg-[#0b1120] rounded-lg border border-slate-800/80 p-1 shadow-inner">
                    {activeImageTab === "portrait" && portrait_url && (
                      <img
                        src={portrait_url}
                        alt={name}
                        className="w-full rounded-md border border-slate-900 object-cover"
                      />
                    )}
                    {activeImageTab === "token" && token_url && (
                      <img
                        src={token_url}
                        alt={`${name} token`}
                        className="w-full rounded-md border border-slate-900 object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* INFO TABS */}
                <div className="border-t border-slate-800 bg-[#050816]">
                  <div className="flex border-b border-slate-800">
                    {["Bio", "Relationship", "Details"].map((t) => {
                      const isActive = activeInfoTab === t;
                      return (
                        <button
                          key={t}
                          className={
                            isActive
                              ? "flex-1 px-3 py-2.5 text-xs md:text-sm font-medium bg-[#151a2b] text-[#f7ce8a]"
                              : "flex-1 px-3 py-2.5 text-xs md:text-sm text-slate-400 hover:text-slate-100 hover:bg-[#101323] transition"
                          }
                          onClick={() => setActiveInfoTab(t)}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex border-b border-slate-800">
                    {["Combat", "Personality", "Meta-Data"].map((t) => {
                      const isActive = activeInfoTab === t;
                      return (
                        <button
                          key={t}
                          className={
                            isActive
                              ? "flex-1 px-3 py-2.5 text-xs md:text-sm font-medium bg-[#151a2b] text-[#f7ce8a]"
                              : "flex-1 px-3 py-2.5 text-xs md:text-sm text-slate-400 hover:text-slate-100 hover:bg-[#101323] transition"
                          }
                          onClick={() => setActiveInfoTab(t)}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>

                  {/* TAB CONTENT */}
                  <div className="p-5 space-y-5 bg-[#050816]">
                    {activeInfoTab === "Bio" && (
                      <>{renderBlocks(bioDataWithoutFactions)}</>
                    )}

                    {activeInfoTab === "Relationship" &&
                      renderRelationshipBlocks(combinedRelationshipData)}

                    {activeInfoTab === "Details" && (
                      <>{renderBlocks(details_data)}</>
                    )}

                    {activeInfoTab === "Combat" && renderBlocks(combat_data)}
                    {activeInfoTab === "Personality" &&
                      renderBlocks(personality_data)}
                    {activeInfoTab === "Meta-Data" && renderBlocks(meta_data)}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
