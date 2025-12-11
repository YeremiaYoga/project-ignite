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

    // BIO
    basic_info = [],
    bio_info = [],
    meta_info = [],

    // RELATIONSHIP
    relationship_info = [],

    // DETAILS
    details_info = [],
    ability_scores = {},
  } = character;

  const token_url =
    tokenFromDb ||
    "http://019a0f6bb5a27dc5b6ab32a19a8ad5d6.phanneldeliver.my.id/characters/ojbOUkwRojYraXc1fK/1765345940856ObRxWaz4.webp";

  const [activeImageTab, setActiveImageTab] = useState("portrait"); // "portrait" | "token"
  const [activeInfoTab, setActiveInfoTab] = useState("Bio"); // "Bio" | "Relationship" | "Details"

  // utility untuk render blok (Core Identity, Titles, dll)
  const renderBlocks = (blocks = []) => {
    if (!blocks || !blocks.length) return null;

    return (
      <div className="space-y-5">
        {blocks.map((block, idx) => {
          const isNotableQuotes =
            block.label?.toLowerCase() === "notable quotes" &&
            Array.isArray(block.items);

          return (
            <div key={idx}>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                {block.label}
              </div>

              {/* KHUSUS Notable Quotes: card gelap dengan garis kiri emas */}
              {isNotableQuotes ? (
                <div className="space-y-2">
                  {block.items.map((quote, qIdx) => (
                    <div
                      key={qIdx}
                      className="bg-[#0b1120] border border-slate-800/80 border-l-4 border-l-[#d4a574] px-4 py-3 rounded-md text-[13px] text-slate-100 italic"
                    >
                      {quote}
                    </div>
                  ))}
                </div>
              ) : Array.isArray(block.items) ? (
                <ul className="space-y-1.5">
                  {block.items.map((item, i2) => (
                    <li
                      key={i2}
                      className="text-[13px] text-slate-100 flex items-start"
                    >
                      <span className="text-[#f4b974] mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-[13px] text-slate-100">{block.value}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#050816] text-gray-100">
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* ===== TOP NAV (Overview, dll – sementara cuma Overview yang aktif) ===== */}
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

        {/* ===== MAIN GRID ===== */}
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

                  {/* TAB CONTENT */}
                  <div className="p-5 space-y-5 bg-[#050816]">
                    {/* ========= BIO ========= */}
                    {activeInfoTab === "Bio" && (
                      <>
                        {/* basic info grid */}
                        <div className="space-y-3">
                          {basic_info.map((row, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 text-[13px]"
                            >
                              <div className="text-slate-400">{row.label}</div>
                              <div className="text-slate-100">{row.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* tambahan bio_info + meta_info di bawahnya */}
                        {renderBlocks([...bio_info, ...meta_info])}
                      </>
                    )}

                    {/* ========= RELATIONSHIP ========= */}
                    {activeInfoTab === "Relationship" &&
                      renderBlocks(relationship_info)}

                    {/* ========= DETAILS ========= */}
                    {activeInfoTab === "Details" && (
                      <>
                        {/* Ability Scores di atas */}
                        {ability_scores &&
                          Object.keys(ability_scores).length > 0 && (
                            <div>
                              <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                                Ability Scores
                              </div>
                              <div className="grid grid-cols-3 gap-2 mb-4">
                                {["STR", "DEX", "CON", "INT", "WIS", "CHA"].map(
                                  (key) => {
                                    const score =
                                      ability_scores[key]?.score ?? "-";
                                    const mod = ability_scores[key]?.mod ?? 0;
                                    const modText =
                                      typeof mod === "number"
                                        ? mod >= 0
                                          ? `+${mod}`
                                          : `${mod}`
                                        : mod;

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
                                        <div className="text-[11px] text-slate-400 mt-1">
                                          {modText}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}

                        {/* detail lainnya */}
                        {renderBlocks(details_info)}
                      </>
                    )}
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
