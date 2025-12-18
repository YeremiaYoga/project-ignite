// app/characters-maker/view/[privateId]/page.jsx
import { Suspense } from "react";
import CharacterView from "./components/CharacterView";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
function htmlToPlainText(html = "") {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractChaptersFromBackstory(html = "") {
  if (!html) return [];
  const chapters = [];
  const regex = /<h1[^>]*>([\s\S]*?)<\/h1>([\s\S]*?)(?=<h1|\s*$)/gi;

  let match;
  while ((match = regex.exec(html)) !== null) {
    const rawTitle = match[1] || "";
    const bodyHtml = match[2] || "";
    const title = htmlToPlainText(rawTitle).replace(/\n+/g, " ").trim();
    const body = htmlToPlainText(bodyHtml).trim();
    if (title || body) chapters.push({ title: title || "Chapter", body });
  }

  if (!chapters.length) {
    const body = htmlToPlainText(html);
    if (body) return [{ title: "Backstory", body }];
  }

  return chapters;
}

function mkAbility(val) {
  const num = typeof val === "number" ? val : 10;
  return { score: num, mod: Math.floor((num - 10) / 2) };
}

function safeArr(v) {
  return Array.isArray(v) ? v : [];
}

function fmtDate(v) {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function joinWithAnd(arr = []) {
  const a = safeArr(arr)
    .map((x) => String(x).trim())
    .filter(Boolean);

  if (a.length === 0) return "-";
  if (a.length === 1) return a[0];
  if (a.length === 2) return `${a[0]}, and ${a[1]}`;
  return `${a.slice(0, -1).join(", ")}, and ${a[a.length - 1]}`;
}

function cmToFtIn(cm) {
  const totalIn = Number(cm) / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inch = Math.round(totalIn - ft * 12);
  return { ft, inch };
}
function ftInToCm(ft, inch) {
  const totalIn = (Number(ft) || 0) * 12 + (Number(inch) || 0);
  return Math.round(totalIn * 2.54);
}
function kgToLbs(kg) {
  return Math.round((Number(kg) || 0) * 2.20462);
}
function lbsToKg(lbs) {
  return Math.round((Number(lbs) || 0) / 2.20462);
}

function mapDbCharacterToViewModel(db, idFromRoute) {
  if (!db) {
    return {
      id: idFromRoute,
      name: "Unknown Name",
      subtitle: "-",
      quote: "",
      portrait_url: "",
      token_url: "",
      type: "NPC",
      role: "",
      chapters: [],
      ability_scores: {
        STR: mkAbility(10),
        DEX: mkAbility(10),
        CON: mkAbility(10),
        INT: mkAbility(10),
        WIS: mkAbility(10),
        CHA: mkAbility(10),
      },
      incumbency: null,
      bio_data: [],
      relationship_data: [],
      details_data: [],
      combat_data: [],
      personality_data: [],
      meta_data: [],
    };
  }

  console.log(db);

  const name =
    (db.full_name_visibility ? db.full_name : null) ||
    db.full_name ||
    db.name ||
    "Unknown Name";
  const subtitle = `${db.race_name || "Unknown Race"} ${
    db.background_name || ""
  }`.trim()
    ? `${db.race_name || "Unknown Race"} ${db.background_name || ""} from ${
        db.main_resident?.resident || db.birth_place || "-"
      }`
    : TEMPLATE_CHARACTER.subtitle;

  const quote =
    typeof db.notable_quotes === "string" ? db.notable_quotes.trim() : "";

  const portrait_url = db.art_image || "";
  const token_url = db.token_image || "";

  const type = db.character_type || "NPC";

  const role = `${db.background_name || "-"} • ${db.status || "-"}`;
  const ability_scores = {
    STR: mkAbility(db.str),
    DEX: mkAbility(db.dex),
    CON: mkAbility(db.con),
    INT: mkAbility(db.int),
    WIS: mkAbility(db.wis),
    CHA: mkAbility(db.cha),
  };

  const chapters =
    typeof db.backstory === "string" && db.backstory.trim()
      ? extractChaptersFromBackstory(db.backstory)
      : [];
  const side_notes =
    typeof db.side_notes === "string" && db.side_notes.trim()
      ? db.side_notes.trim()
      : "";

  const hFt = db.height?.feet;
  const hIn = db.height?.inch;
  const hCm = db.height?.centimeter;

  let heightVal = "-";
  if (hCm && Number(hCm) > 0) {
    const { ft, inch } = cmToFtIn(hCm);
    heightVal = `${hCm} cm (${ft}' ${inch}")`;
  } else if (hFt || hIn) {
    const cm = ftInToCm(hFt, hIn);
    heightVal = `${hFt || 0}' ${hIn || 0}" (${cm} cm)`;
  }

  // Weight convert kg ↔ lbs
  const wKg = db.weight?.kilogram;
  const wLbs = db.weight?.pounds;

  let weightVal = "-";
  if (wKg && Number(wKg) > 0) {
    const lbs = kgToLbs(wKg);
    weightVal = `${wKg} kg (${lbs} lbs)`;
  } else if (wLbs) {
    const kg = lbsToKg(wLbs);
    weightVal = `${wLbs} lbs (${kg} kg)`;
  }

  const birthPlace =
    db.birth_place || db.birth_country
      ? `${db.birth_place || ""}${
          db.birth_country ? `, ${db.birth_country}` : ""
        }`.trim()
      : "-";

  const bornVal = db.birth_year
    ? `${db.birth_year}${
        db.birth_year_type ? ` ${db.birth_year_type}` : ""
      }`.trim()
    : "-";

  const deathVal = db.death_year
    ? `${db.death_year}${
        db.death_year_type ? ` ${db.death_year_type}` : ""
      }`.trim()
    : "";

  const titlesList = safeArr(db.titles)
    .map((t) =>
      t?.name ? `${t.name}${t.from ? ` from ${t.from}` : ""}` : null
    )
    .filter(Boolean);

  const mainRes = db.main_resident;
  const mainResVal =
    mainRes?.resident && mainRes?.country
      ? `${mainRes.resident}, ${mainRes.country}`
      : "-";
  const otherResList = safeArr(db.other_resident);

  const bio_data = [
    { label: "Full Name", value: name },
    { label: "Also Known As", value: db.name || "-" },

    { label: "Spesies/Race", value: db.race_name || "-" },

    {
      label: "Gender",
      value:
        db.gender && db.pronoun
          ? `${db.gender} (${db.pronoun})`
          : db.gender || "-",
    },
    { label: "Alignment", value: db.alignment || "-" },

    { label: "Birthplace", value: birthPlace },
    { label: "Status", value: db.status || "-" },
    { label: "Born", value: bornVal },
    ...(deathVal ? [{ label: "Death", value: deathVal }] : []),

    { label: "Height", value: heightVal },
    { label: "Weight", value: weightVal },

    { label: "Skin", value: db.skin_colour || "-" },
    { label: "Hair", value: db.hair || "-" },

    ...(titlesList.length ? [{ label: "Titles", items: titlesList }] : []),

    { label: "Wayfarer (Path)", value: db.wayfarer || "-" },

    { label: "Current Residents", value: mainResVal },
    ...(otherResList.length
      ? [{ label: "Other Resident", items: otherResList }]
      : []),

    // Occupations with and-rule
    {
      label: "Current Occupation",
      value: joinWithAnd(safeArr(db.current_occupation)),
    },
    {
      label: "Previous Occupation",
      value: joinWithAnd(safeArr(db.previous_occupation)),
    },

    ...(db.apperance ? [{ label: "Appearance", value: db.apperance }] : []),

    ...(safeArr(db.notable_details).length
      ? [{ label: "Notable Details", items: safeArr(db.notable_details) }]
      : []),
  ];

  const familyItems = safeArr(db.family);
  const parentItems = familyItems.filter((item) => {
    if (!item) return false;
    const rel = String(item.relationship || "").toLowerCase();
    return rel === "mother" || rel === "father" || rel === "parent";
  });

  const relationship_data = [
    ...(parentItems.length ? [{ label: "Parents", items: parentItems }] : []),
    { label: "Family", items: familyItems },
    { label: "Friends", items: safeArr(db.friends) },
    { label: "Allies", items: safeArr(db.allies) },
    { label: "Enemies", items: safeArr(db.enemies) },
    { label: "Subordinates", items: safeArr(db.subordinates) },
    { label: "Affiliations", items: safeArr(db.affiliations) },
    { label: "Special Relationships", items: safeArr(db.special_relationship) },
  ];

  // ================= SHARED (for Combat) =================
  const skills =
    safeArr(db.skill_prof).length > 0
      ? db.skill_prof
          .map((s) => {
            const name = s?.name ? String(s.name) : "";
            const v = typeof s?.value === "number" ? s.value : 0;
            const suffix = v > 0 ? " (trained)" : v < 0 ? " (penalty)" : "";
            return `${name}${suffix}`.trim();
          })
          .filter(Boolean)
      : [];

  const signatureWeaponList = safeArr(db.signature_weapon);

  const signatureObjectList = safeArr(db.signature_object);
  const accomplishmentsList = safeArr(db.notable_accomplishments);

  const quotesOthersList = safeArr(db.quotes_from_others)
    .map((q) => ({
      quote: q?.quote || "",
      author: q?.author || "Unknown",
    }))
    .filter((x) => x.quote);

  const connectionEvents = Array.isArray(db.connection_towards_events)
    ? db.connection_towards_events
    : [];

  const details_data = [
    { label: "Vision", value: db.vision || "-" },
    { label: "Disposition", value: db.disposition || "-" },

    { label: "Nationality", value: db.nationality || db.birth_country || "-" },

    {
      label: "Previous Economical Standing",
      value: db.previous_economical_standing || "-",
    },
    {
      label: "Current Economical Standing",
      value: db.current_last_economical_standing || "-",
    },
    {
      label: "Previous Social Classes",
      value: db.previous_social_classes || "-",
    },
    {
      label: "Current Social Classes",
      value: db.current_social_classes || "-",
    },

    { label: "Notable Quotes", items: quote ? [quote] : [] },
    { label: "Quotes About Them", items: quotesOthersList },

    // ✅ INI YANG BARU
    ...(connectionEvents.length
      ? [
          {
            label: "Connections Towards Events",
            items: connectionEvents,
          },
        ]
      : []),

    { label: "Signature Objects", items: signatureObjectList },
    { label: "Notable Accomplishments", items: accomplishmentsList },
  ];

  const isNpc = String(db.character_type || "").toLowerCase() === "npc";

  const cv = Number(db.combat_value ?? db.level ?? 0);
  const crVal = cv ? cv / 2 : null;
  const levelVal = isNpc
    ? crVal !== null
      ? `CR ${Number.isInteger(crVal) ? crVal : crVal.toFixed(1)}`
      : "-"
    : db.level ?? "-";

  const combat_data = [
    { label: "Ability Scores" },
    { label: "Level", value: levelVal },
    { label: "Size", value: db.size?.general || "-" },
    { label: "Creature Type", value: db.creature_type || "-" },

    { label: "Damage Type", value: db.damage_type || "-" },

    { label: "Skills", items: skills },
    { label: "Signature Weapons", items: signatureWeaponList },
  ];

  const fearsItems = safeArr(db.fear_weakness)
    .map((fw) => ({
      name: fw?.fear_weak || fw?.["fear/weak"] || "",
      from: fw?.from || "",
    }))
    .filter((x) => String(x.name).trim().length > 0);

  const motivationItems = safeArr(db.motivation)
    .map((m) => ({
      motivation: m?.motivation || "",
      from: m?.from || "",
      how: m?.how || "",
    }))
    .filter((x) => String(x.motivation).trim().length > 0);

  const personality_data = [
    // { label: "Main Personality", value: db.main_personality },
    { label: "Main Personality", value: db.main_personality },
    { label: "Personality", items: safeArr(db.detailed_personality) },
    { label: "Fears & Weakness", items: fearsItems },
    { label: "Motivation", items: motivationItems },
    { label: "Hobbies", items: safeArr(db.hobbies) },
  ];

  // ================= META DATA (dipindah dari Bio) =================
  const meta_data = [
    { label: "Voice Style", value: db.voice_style },

    // ✅ NEW: youtube links
    { label: "Main Theme", value: db.main_theme || "" },
    { label: "Combat Theme", value: db.combat_theme || "" },

    { label: "Created", value: fmtDate(db.created_at) },
    { label: "Created By", value: db.creator_name || "-" },
    { label: "Modified At", value: fmtDate(db.updated_at) },
  ];

  return {
    id: db.id || idFromRoute,
    name,
    subtitle: subtitle || "-",
    quote,
    portrait_url,
    token_url,
    type,
    role,
    chapters,
    side_notes,
    ability_scores,
    incumbency: db.incumbency || null,
    // split tetap
    bio_data,
    relationship_data,
    details_data,
    combat_data,
    personality_data,
    meta_data,
    private_id: db.private_id || idFromRoute,
    public_id: db.public_id || db.publicId || "",
  };
}

/* ================= SERVER COMPONENT ================= */

async function CharacterDetailContent(props) {
  const { privateId } = await props.params;

  const res = await fetch(`${API_BASE}/characters/private/${privateId}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    const character = mapDbCharacterToViewModel(null, privateId);
    return <CharacterView character={character} />;
  }

  const json = await res.json();
  const dbChar = json?.data || null;

  const character = mapDbCharacterToViewModel(dbChar, privateId);
  return <CharacterView character={character} />;
}

export default function CharacterDetailPage(props) {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-gray-200 text-sm">Loading character…</div>
      }
    >
      <CharacterDetailContent {...props} />
    </Suspense>
  );
}
