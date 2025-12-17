// app/characters/[id]/components/CharacterView.jsx
"use client";

import { useState } from "react";
import LeftChapters from "./LeftChapters";
import RightSidebar from "./RightSidebar";

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
    side_notes = "",
    bio_data = [],
    relationship_data = [],
    details_data = [],
    combat_data = [],
    personality_data = [],
    meta_data = [],
    ability_scores = {},
    incumbency = null,
  } = character || {};

  const token_url =
    tokenFromDb ||
    "http://019a0f6bb5a27dc5b6ab32a19a8ad5d6.phanneldeliver.my.id/characters/ojbOUkwRojYraXc1fK/1765345940856ObRxWaz4.webp";

  const [activeImageTab, setActiveImageTab] = useState("portrait");
  const [activeInfoTab, setActiveInfoTab] = useState("Bio");

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

  const normalizeLabel = (s) =>
    String(s || "")
      .trim()
      .toLowerCase()
      .replace(/[_-]/g, " ")
      .replace(/\s+/g, " ");

  const BIO_LABEL_ALIASES = {
    full_name: ["full name", "fullname"],
    also_known_as: ["also known as", "aka", "nickname", "alias"],
    race: ["race", "spesies/race", "species", "ancestry"],
    gender: ["gender"],
    alignment: ["alignment"],
    birthplace: ["birthplace", "birth place", "place of birth"],
    born: ["born", "birth", "birth year", "born year"],
    dead: ["dead", "died", "death", "death year", "date of death"],
    status: ["status", "life status", "condition"],
    height: ["height"],
    weight: ["weight"],
    skin: ["skin", "skin colour", "skin color"],
    hair: ["hair"],
  };

  const findBioRowByAliases = (aliases = []) => {
    if (!Array.isArray(bio_data) || !bio_data.length) return null;
    return (
      bio_data.find((b) => {
        const lbl = normalizeLabel(b?.label);
        return aliases.some((a) => normalizeLabel(a) === lbl);
      }) || null
    );
  };

  const getBioValueByAliases = (aliases = []) => {
    const row = findBioRowByAliases(aliases);
    if (!row) return "";

    if (row.value !== undefined && row.value !== null) return row.value;

    if (Array.isArray(row.items)) {
      if (
        row.items.every((x) => typeof x === "string" || typeof x === "number")
      )
        return row.items.map(String).join(", ");
      return row.items;
    }

    return "";
  };

  const PROFILE_KEYS = [
    { key: "full_name", left: "Full Name" },
    { key: "also_known_as", left: "Also Known As" },
    { key: "race", left: "Race" },
    { key: "gender", left: "Gender" },
    { key: "alignment", left: "Alignment" },
    { key: "birthplace", left: "Birthplace" },
    { key: "height", left: "Height" },
    { key: "weight", left: "Weight" },
    { key: "skin", left: "Skin" },
    { key: "hair", left: "Hair" },
  ];

  const renderBioProfileTable = () => {
    const rows = PROFILE_KEYS.map(({ key, left }) => ({
      left,
      right: getBioValueByAliases(BIO_LABEL_ALIASES[key]),
    })).filter((r) => {
      const v = r.right;
      if (v === null || v === undefined) return false;
      if (typeof v === "string") return v.trim().length > 0;
      if (typeof v === "number") return true;
      if (typeof v === "boolean") return true;
      if (Array.isArray(v)) return v.length > 0;
      if (isPlainObject(v)) return Object.keys(v).length > 0;
      return String(v).trim().length > 0;
    });

    const statusRaw = getBioValueByAliases(BIO_LABEL_ALIASES.status);
    const status = String(statusRaw || "")
      .trim()
      .toLowerCase();

    const bornVal = getBioValueByAliases(BIO_LABEL_ALIASES.born);
    const deadVal = getBioValueByAliases(BIO_LABEL_ALIASES.dead);

    const lifeRows = [];

    if (String(bornVal || "").trim()) {
      lifeRows.push({ left: "Birth Year", right: String(bornVal) });
    }

    if (status === "unknown" && String(deadVal || "").trim()) {
      lifeRows.push({ left: "Presume Death", right: String(deadVal) });
    } else if (status === "dead" && String(deadVal || "").trim()) {
      lifeRows.push({ left: "Death", right: String(deadVal) });
    }
    if (lifeRows.length) {
      const idxBirthplace = rows.findIndex((r) => r.left === "Birthplace");
      const insertAt = idxBirthplace >= 0 ? idxBirthplace + 1 : 0;
      rows.splice(insertAt, 0, ...lifeRows);
    }

    if (!rows.length) return null;

    return (
      <div className="rounded-lg overflow-hidden">
        {rows.map((r) => (
          <div
            key={r.left}
            className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 py-2"
          >
            <div className="text-[12px] text-slate-400">{r.left}</div>
            <div className="text-[13px] text-slate-100 font-medium">
              {r.right}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const isProfileLabel = (label) => {
    const lbl = normalizeLabel(label);
    const allAliases = Object.values(BIO_LABEL_ALIASES).flat();
    return allAliases.some((a) => normalizeLabel(a) === lbl);
  };

  const bioDataWithoutProfile = (
    Array.isArray(bio_data) ? bio_data : []
  ).filter((b) => !isProfileLabel(b?.label));

  const DETAILS_LABEL_ALIASES = {
    vision: ["vision"],
    disposition: ["disposition", "diposition"],
    nationality: ["nationality"],
    pes: ["previous economical standing", "pes"],
    ces: ["current economical standing", "ces"],
    psc: ["previous social classes", "psc"],
    csc: ["current social classes", "csc"],
  };

  const findDetailsRowByAliases = (aliases = []) => {
    if (!Array.isArray(details_data) || !details_data.length) return null;
    return (
      details_data.find((d) => {
        const lbl = normalizeLabel(d?.label);
        return aliases.some((a) => normalizeLabel(a) === lbl);
      }) || null
    );
  };

  const getDetailsValueByAliases = (aliases = []) => {
    const row = findDetailsRowByAliases(aliases);
    if (!row) return "";

    if (row.value !== undefined && row.value !== null) return row.value;

    if (Array.isArray(row.items)) {
      if (
        row.items.every((x) => typeof x === "string" || typeof x === "number")
      )
        return row.items.map(String).join(", ");
      return row.items;
    }

    return "";
  };

  const DETAILS_PROFILE_KEYS = [
    { key: "vision", left: "Vision" },
    { key: "disposition", left: "Disposition" },
    { key: "nationality", left: "Nationality" },
    { key: "pes", left: "Previous Economical Standing" },
    { key: "ces", left: "Current Economical Standing" },
    { key: "psc", left: "Previous Social Classes" },
    { key: "csc", left: "Current Social Classes" },
  ];

  const renderDetailsProfileTable = () => {
    const rows = DETAILS_PROFILE_KEYS.map(({ key, left }) => ({
      left,
      right: getDetailsValueByAliases(DETAILS_LABEL_ALIASES[key]),
    })).filter((r) => {
      const v = r.right;
      if (v === null || v === undefined) return false;
      if (typeof v === "string") return v.trim().length > 0 && v.trim() !== "-";
      if (typeof v === "number") return true;
      if (typeof v === "boolean") return true;
      if (Array.isArray(v)) return v.length > 0;
      if (isPlainObject(v)) return Object.keys(v).length > 0;
      return String(v).trim().length > 0;
    });

    if (!rows.length) return null;

    return (
      <div className="rounded-lg overflow-hidden">
        {rows.map((r) => (
          <div
            key={r.left}
            className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 py-2"
          >
            <div className="text-[12px] text-slate-400">{r.left}</div>
            <div className="text-[13px] text-slate-100 font-medium">
              {typeof r.right === "string" || typeof r.right === "number"
                ? String(r.right)
                : renderAnyValue(r.right)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const isDetailsProfileLabel = (label) => {
    const lbl = normalizeLabel(label);
    const allAliases = Object.values(DETAILS_LABEL_ALIASES).flat();
    return allAliases.some((a) => normalizeLabel(a) === lbl);
  };

  const detailsDataWithoutProfile = (
    Array.isArray(details_data) ? details_data : []
  ).filter((d) => !isDetailsProfileLabel(d?.label));

  const COMBAT_LABEL_ALIASES = {
    level: ["level"],
    size: ["size"],
    creature_type: ["creature type"],
    damage_type: ["damage type", "damage"],
  };

  const findCombatRowByAliases = (aliases = []) => {
    if (!Array.isArray(combat_data) || !combat_data.length) return null;
    return (
      combat_data.find((c) => {
        const lbl = normalizeLabel(c?.label);
        return aliases.some((a) => normalizeLabel(a) === lbl);
      }) || null
    );
  };

  const getCombatValueByAliases = (aliases = []) => {
    const row = findCombatRowByAliases(aliases);
    if (!row) return "";

    if (row.value !== undefined && row.value !== null) return row.value;

    if (Array.isArray(row.items)) {
      if (
        row.items.every((x) => typeof x === "string" || typeof x === "number")
      )
        return row.items.map(String).join(", ");
      return row.items;
    }

    return "";
  };

  const renderCombatProfileTable = () => {
    const pick = (label) => {
      const row = (Array.isArray(combat_data) ? combat_data : []).find(
        (x) => normalizeLabel(x?.label) === normalizeLabel(label)
      );
      return row?.value ?? "-";
    };

    const rows = [
      { left: "Level", right: pick("Level") },
      { left: "Size", right: pick("Size") },
      { left: "Creature Type", right: pick("Creature Type") },

      // ✅ DAMAGE TYPE TETAP DITAMPILKAN WALAU "-"
      { left: "Damage Type", right: pick("Damage Type") },
    ].filter((r) => {
      // ❗ HANYA buang kalau BENAR-BENAR kosong / undefined
      return r.right !== null && r.right !== undefined;
    });

    return (
      <div className="rounded-lg overflow-hidden">
        {rows.map((r) => (
          <div
            key={r.left}
            className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 py-2"
          >
            <div className="text-[12px] text-slate-400">{r.left}</div>
            <div className="text-[13px] text-slate-100 font-medium">
              {String(r.right || "-")}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const isCombatProfileLabel = (label) => {
    const lbl = normalizeLabel(label);
    return [
      "incumbency",
      "level",
      "size",
      "creature type",
      "damage type",
    ].includes(lbl);
  };

  const combatDataWithoutProfile = (
    Array.isArray(combat_data) ? combat_data : []
  ).filter(
    (b) =>
      normalizeLabel(b?.label) !== "ability scores" && // tetap tampil pakai section khusus
      !isCombatProfileLabel(b?.label)
  );

  const [selectedIncAbility, setSelectedIncAbility] = useState(null);

  const getAbilityImg = (ab) => ab?.image || "";
  const getAbilityName = (ab) =>
    ab?.title || ab?.name || ab?.label || "Ability";
  const getAbilityDesc = (ab) => ab?.description || ab?.desc || ab?.text || "";

  const renderIncumbencySection = () => {

    if (!incumbency || !incumbency.name) {
      return (
        <div className="text-[12px] text-slate-500 italic">
          No combat style (incumbency).
        </div>
      );
    }

    const img = incumbency.image || "";
    const abilities = Array.isArray(incumbency.abilities)
      ? incumbency.abilities.filter((a) => a?.visibility !== false)
      : [];

    const roleText = incumbency.role ? String(incumbency.role) : "";
    const cvMin = incumbency.cv_minimum ?? null;
    const costPercent = incumbency.cv_percent_cost ?? 0;
    const costFlat = incumbency.cv_flat_cost ?? 0;

    return (
      <div className="bg-[#0b1120] border border-slate-800/80 rounded-lg p-4">
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md border border-slate-700 bg-[#050816] overflow-hidden shrink-0">
            {img ? (
              <img
                src={img}
                alt={incumbency.name || "Incumbency"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">
                no img
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              Combat Style
            </div>

            <div className="text-[14px] text-slate-100 font-semibold truncate">
              {incumbency.name}
              {incumbency.version !== undefined && incumbency.version !== null
                ? ` (V${incumbency.version})`
                : ""}
            </div>

            <div className="text-[11px] text-slate-400 mt-0.5 flex flex-wrap gap-x-3 gap-y-1">
              {roleText && <span>Role: {roleText}</span>}
              {cvMin !== null && cvMin !== undefined && (
                <span>CV Min: {cvMin}</span>
              )}
              <span>
                Cost: {Number(costPercent) || 0}%
                {Number(costFlat) ? ` + ${costFlat}` : ""}
              </span>
            </div>
          </div>
        </div>

        {/* ABILITIES GRID */}
        {abilities.length > 0 && (
          <div className="mt-4">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
              Abilities
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {abilities.map((ab, idx) => {
                const src = getAbilityImg(ab);
                const nm = getAbilityName(ab);
                const desc = getAbilityDesc(ab);
                const isActive = selectedIncAbility === idx;

                const metaLine = [
                  ab?.type ? String(ab.type) : "",
                  ab?.cost ? `Cost: ${ab.cost}` : "",
                  ab?.additional_cost ? String(ab.additional_cost) : "",
                  Array.isArray(ab?.type_ability) && ab.type_ability.length
                    ? `Type: ${ab.type_ability.join(", ")}`
                    : "",
                ]
                  .filter(Boolean)
                  .join(" • ");

                return (
                  <div
                    key={`${ab?.name || ab?.id || idx}`}
                    className={[
                      "relative aspect-square rounded-md border border-slate-700 bg-[#050816] cursor-pointer",
                      isActive ? "ring-2 ring-[#f7ce8a]" : "",
                    ].join(" ")}
                    onClick={() => setSelectedIncAbility(isActive ? null : idx)}
                  >
                    <div className="absolute inset-0 rounded-md overflow-hidden">
                      {src ? (
                        <img
                          src={src}
                          alt={nm}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">
                          no img
                        </div>
                      )}
                    </div>

                    {isActive && (
                      <div
                        className={[
                          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]",
                          "w-[520px] max-w-[90vw]",
                          "rounded-xl border border-slate-700",
                          "bg-[#0b1120] text-slate-100",
                          "p-5 shadow-2xl",
                        ].join(" ")}
                      >
                        <div className="font-semibold text-[#f7ce8a] text-lg mb-1">
                          {nm}
                        </div>

                        {metaLine && (
                          <div className="text-[12px] text-slate-400 mb-2">
                            {metaLine}
                          </div>
                        )}

                        {desc && (
                          <div
                            className="text-[14px] text-slate-200 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: desc }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const toYoutubeEmbed = (url = "") => {
    const s = String(url || "").trim();
    if (!s) return "";

    try {
      const u = new URL(s);

      // youtu.be/<id>
      if (u.hostname.includes("youtu.be")) {
        const id = u.pathname.replace("/", "").trim();
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }

      // youtube.com/watch?v=<id>
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;

      // youtube.com/shorts/<id>
      const shortsMatch = u.pathname.match(/\/shorts\/([^/]+)/i);
      if (shortsMatch?.[1])
        return `https://www.youtube.com/embed/${shortsMatch[1]}`;

      // youtube.com/embed/<id>
      const embedMatch = u.pathname.match(/\/embed\/([^/]+)/i);
      if (embedMatch?.[1])
        return `https://www.youtube.com/embed/${embedMatch[1]}`;

      return "";
    } catch {
      // kalau user masukin cuma ID video
      const idLike = s.match(/^[a-zA-Z0-9_-]{8,}$/) ? s : "";
      return idLike ? `https://www.youtube.com/embed/${idLike}` : "";
    }
  };

  const renderMetaData = () => {
    const blocks = Array.isArray(meta_data) ? meta_data : [];

    const voiceIdx = blocks.findIndex(
      (b) => normalizeLabel(b?.label) === "voice style"
    );

    const mainTheme = blocks.find(
      (b) => normalizeLabel(b?.label) === "main theme"
    )?.value;

    const combatTheme = blocks.find(
      (b) => normalizeLabel(b?.label) === "combat theme"
    )?.value;

    const mainEmbed = toYoutubeEmbed(mainTheme);
    const combatEmbed = toYoutubeEmbed(combatTheme);

    return (
      <div className="space-y-5">
        {blocks.map((block, idx) => {
          const labelNorm = normalizeLabel(block?.label);
          const isMain = labelNorm === "main theme";
          const isCombat = labelNorm === "combat theme";

          // ❌ jangan tampilkan row text sama sekali
          if (isMain || isCombat) return null;

          const shouldInject = idx === voiceIdx;

          return (
            <div key={`meta-${idx}`}>
              {block.label && (
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                  {block.label}
                </div>
              )}

              <div className="text-[13px] text-slate-100">
                {renderAnyValue(block.value)}
              </div>

              {/* iframe tetap di sini */}
              {shouldInject && (mainEmbed || combatEmbed) && (
                <div className="mt-4 space-y-4">
                  {mainEmbed && (
                    <div className="bg-[#0b1120] border border-slate-800/80 rounded-lg overflow-hidden">
                      <div className="px-4 py-2 border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                        Main Theme
                      </div>
                      <div className="aspect-video">
                        <iframe
                          src={mainEmbed}
                          title="Main Theme"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {combatEmbed && (
                    <div className="bg-[#0b1120] border border-slate-800/80 rounded-lg overflow-hidden">
                      <div className="px-4 py-2 border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                        Combat Theme
                      </div>
                      <div className="aspect-video">
                        <iframe
                          src={combatEmbed}
                          title="Combat Theme"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const factionsBioBlock = bio_data.find(
    (b) =>
      typeof b?.label === "string" &&
      b.label.toLowerCase() === "factions & affiliations"
  );

  const bioDataWithoutFactions = bioDataWithoutProfile.filter(
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
          const looksLikeEventItems =
            items &&
            items.some(
              (it) =>
                isPlainObject(it) &&
                ("connection" in it || "connection_notes" in it)
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

                    const how =
                      typeof it === "object" && it ? it.how || "" : "";

                    if (!String(text).trim()) return null;

                    return (
                      <div key={i2} className="text-[13px] text-slate-100">
                        <div className="leading-snug">{text}</div>

                        {(from || how) && (
                          <div className="text-[11px] text-slate-400 mt-1 space-y-1">
                            {from && <div>from {from}</div>}
                            {how && <div>how {how}</div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : looksLikeEventItems ? (
                <ul className="space-y-3">
                  {items.map((item, i2) => {
                    if (!item) return null;

                    const name = item.name || "Unknown Event";
                    const connection = item.connection || null;
                    const notes = item.connection_notes || null;

                    return (
                      <li key={i2} className="text-[13px] text-slate-100">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium leading-snug">
                              {name}
                            </span>

                            {connection && (
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full bg-[#111827]
                             border border-slate-700 text-[#f4b974]
                             uppercase tracking-wide"
                              >
                                {connection}
                              </span>
                            )}
                          </div>

                          {notes && (
                            <p className="text-[12px] text-slate-300 leading-snug">
                              {notes}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : items ? (
                <ul className="space-y-1.5">
                  {items.map((item, i2) => {
                    const text =
                      typeof item === "string" || typeof item === "number"
                        ? String(item)
                        : isPlainObject(item)
                        ? item.text ?? item.value ?? item.name ?? ""
                        : String(item);

                    const [titlePart, fromPart] = text.split(/\s+from\s+/i);

                    return (
                      <li
                        key={i2}
                        className="text-[13px] text-slate-100 flex items-start"
                      >
                        <span className="text-[#f4b974] mr-2">•</span>

                        {fromPart ? (
                          <span>
                            <span className="text-slate-100">{titlePart}</span>
                            <span className="text-slate-400">
                              {" "}
                              from {fromPart}
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-100">{text}</span>
                        )}
                      </li>
                    );
                  })}
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
    <main className="min-h-screen bg-[#050816] text-gray-100 w-full max-w-7xl">
      <div className="relative w-full mx-auto px-6 py-8">
        <div className="flex items-center justify-between gap-3 mb-6 text-sm">
          <div className="flex flex-wrap items-center gap-2">
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
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
          <LeftChapters chapters={chapters} side_notes={side_notes} />
          <RightSidebar
            name={name}
            type={type}
            role={role}
            portrait_url={portrait_url}
            token_url={token_url}
            activeImageTab={activeImageTab}
            setActiveImageTab={setActiveImageTab}
            activeInfoTab={activeInfoTab}
            setActiveInfoTab={setActiveInfoTab}
            renderBioProfileTable={renderBioProfileTable}
            renderBlocks={renderBlocks}
            renderRelationshipBlocks={renderRelationshipBlocks}
            renderDetailsProfileTable={renderDetailsProfileTable}
            renderMetaData={renderMetaData}
            renderAbilityScoresSection={renderAbilityScoresSection}
            renderIncumbencySection={renderIncumbencySection}
            renderCombatProfileTable={renderCombatProfileTable}
            bioDataWithoutFactions={bioDataWithoutFactions}
            combinedRelationshipData={combinedRelationshipData}
            detailsDataWithoutProfile={detailsDataWithoutProfile}
            combatDataWithoutProfile={combatDataWithoutProfile}
            personality_data={personality_data}
          />
        </div>
      </div>
    </main>
  );
}
