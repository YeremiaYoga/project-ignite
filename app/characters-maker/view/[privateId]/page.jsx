// app/characters-maker/view/[privateId]/page.jsx
import { Suspense } from "react";
import CharacterView from "./components/CharacterView";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

/* ================= TEMPLATE fallback PENUH (kalau DB NOT FOUND) ================ */
const TEMPLATE_CHARACTER = {
  name: "Elyra Mondralin",
  subtitle: "Human Artisan from Takao",
  quote:
    "“If every life is a thread, then maybe Talia doesn't just weave us forward and protect us. Maybe She listens to us, too.”",
  portrait_url:
    "http://019a0f6bb5a27dc5b6ab32a19a8ad5d6.phanneldeliver.my.id/characters/ojbOUkwRojYraXc1fK/1762759335406MjhCwvb8.png",
  token_url:
    "http://019a0f6bb5a27dc5b6ab32a19a8ad5d6.phanneldeliver.my.id/characters/ojbOUkwRojYraXc1fK/1765345940856ObRxWaz4.webp",
  type: "NPC",
  role: "Artisan",
  ability_scores: {
    STR: { score: 8, mod: -1 },
    DEX: { score: 10, mod: 0 },
    CON: { score: 12, mod: 1 },
    INT: { score: 14, mod: 2 },
    WIS: { score: 14, mod: 2 },
    CHA: { score: 15, mod: 2 },
  },
  chapters: [
    {
      title: "Chapter I: Early Life & Takao",
      body: `In the quiet valley of Takao of the Country Delstainvia, among its hills stood a small cloth and clothes shop, owned by two kind souls Astaria Edenria (Father) and Liebhaberin Endenria (Mother) from the distant land of Mondral.

Their daughter, Elyra Edenria, grew up among threads and laughter. Hands always dusted with dye, hair smelling faintly of lavender and smoke. Her parents taught her the art of weaving, but also its patience. "A good cloth," her mother would say, "isn't made by force. It listens. It waits." Elyra believed her mother was talking about more than fabric.

Sometimes, as she worked the loom, she'd pause to watch how a single misplaced thread could change the whole pattern. "Maybe people are like that too," she thought. "Each one changes the world, even just a little."`,
    },
    {
      title: "Chapter II: The Pathstrider of Talia",
      body: `The Edenria family kept a small shrine above their hearth. A polished silver mirror, framed with brass. It was a humble altar to Talia, the Weaver, the goddess who bound past, present, and future through her eternal loom.

"If every life is a thread," she often wondered, "then maybe Talia doesn't just weave us forward and protect us. Maybe She listens to us, too.... Although she is the Silent Goddess, hard for me to tell haha" Which she laugh nervously to.

On still evenings whenever she is alone, the candle burned low, Elyra sometimes thought she saw her reflection blink a moment too late, or smile just before she did. It frightened her once. Then it comforted her now. She doesn't know why it does, but it makes her feel safe.`,
    },
    {
      title: "Chapter III: The Plagues Which Pull Her Threads",
      body: `The peace of Takao rarely changed, which is until several travelers from the East came. They spoke of a strange magical plague spreading through Delstainvia's borderlands: spells failing, reflections moving on their own, and people losing whole days of memory as if time itself had skipped.

Most in the village dismissed it as distant rumor as there are only a couple of folks who bestow this tale. But when Elyra prayed that night, the flame before Talia's mirror bent sideways, and for an instant, she saw the reflection of her own hands, unraveling into light. "Something is off... This is not just a simple rumor... This is something else," she whispered.

No voice answered her, but she felt it. A gentle pull, like the tug of a thread asking to be followed. That quiet, patient feeling she'd always known at the loom was now inside her, urging her to move.`,
    },
    {
      title: "Chapter IV: The Reason She Walks",
      body: `Elyra left Takao at dawn. The sky was pale and the river mist low. She carried only what she could: a travel cloak, her prayer mirror wrapped in cloth, a spool of blue silk tied around her wrist, and her mother's quiet blessing. "If the world is fraying," Liebhaberin told her, "then mend it where you can, my love. Even a single stitch can save a pattern."

Her father, Astaria, pressed a hand to her shoulder. "Please stay safe..." he said softly although trying to act tough as he doesn't want to show weakness towards his own daughter in this uncertain time, but he knew there is high chance she might get hurt if she head East.

She then walk forward towards the direction East heading towards a meeting place where she may meet with someone who have been searching for Adventurer to help out the situation of the Magical Plague which many dismiss, but she wish to give it a try.`,
    },
  ],
  basic_info: [
    { label: "Full Name", value: "Elyra Mondralin" },
    { label: "Also Known As", value: "Elyra Edenria" },
    { label: "Race", value: "Human" },
    { label: "Gender", value: "Female (She/Her)" },
    { label: "Alignment", value: "Lawful Good" },
    { label: "Birthplace", value: "Takao, Delstainvia" },
    { label: "Born", value: "1620 AC" },
    { label: "Height", value: `5'6"` },
    { label: "Weight", value: "121 lbs" },
    { label: "Skin", value: "Pale Fair White" },
    { label: "Hair", value: "Black" },
  ],
  bio_info: [
    {
      label: "Core Identity",
      items: [
        "Gentle artisan raised in a family-run cloth and dye shop.",
        "Devoted follower of Talia, the Weaver.",
        "Guided by visions and subtle omens from mirrors and threads.",
      ],
    },
    {
      label: "Faith & Devotion",
      items: [
        "Maintains a personal shrine to Talia using a silver mirror framed with brass.",
        "Often interprets small coincidences as guidance from the Silent Goddess.",
      ],
    },
  ],
  meta_info: [
    { label: "NPC Info", value: "NPC, currently alive." },
    { label: "Type", value: "NPC" },
    { label: "Status", value: "Alive" },
    {
      label: "Titles",
      items: [
        "Pathstrider of Talia",
        "Daughter of the Loom",
        "Threadweaver of Takao",
        "The Mirror's Friend",
      ],
    },
    { label: "Background", value: "Artisan" },
    {
      label: "Weaver",
      value: "Talia, the Weaver (The Silent Goddess)",
    },
    {
      label: "Factions & Affiliations",
      items: ["Follower of Talia, the Weaver"],
    },
    { label: "World", value: "Delstainvia" },
    { label: "Campaign", value: "The Magical Plague" },
    { label: "Level", value: "Commoner (Level 1)" },
    {
      label: "Current Occupation",
      value: "Wandering Pilgrim and Adventurer",
    },
    {
      label: "Previous Occupation",
      value: "Weaver and Cloth Shop Assistant",
    },
    {
      label: "Residence",
      value: "Takao, Delstainvia (former)",
    },
    {
      label: "Economic Standing",
      value: "Modest / Working Class",
    },
    {
      label: "Social Class",
      value: "Commoners / Workers",
    },
    {
      label: "Personality",
      items: [
        "Kind, patient, and contemplative.",
        "Friendly and gentle in disposition.",
        "Curious about the mysteries of magic and reality.",
      ],
    },
    { label: "Created", value: "November 10, 2024" },
    { label: "Created By", value: "Candle Note" },
  ],
  relationship_info: [
    {
      label: "Parents",
      items: [
        "Astaria Edenria (Father) – Cloth merchant from Mondral.",
        "Liebhaberin Endenria (Mother) – Master weaver and dyer.",
      ],
    },
    {
      label: "Family Members",
      items: [
        "Astaria Edenria (Father) – Manages trade and travelling routes.",
        "Liebhaberin Endenria (Mother) – Designer of unique dyed fabrics.",
      ],
    },
    {
      label: "Friends",
      items: [
        "Mirabel Thornweave – Childhood friend in Takao.",
        "Archivist Valindra – Mentor figure who nurtured Elyra's curiosity about magic and history.",
      ],
    },
    {
      label: "Allies",
      items: [
        "The Harpers – Potential contacts encountered during her journey.",
        "Local priests of Talia in various temples across Delstainvia.",
      ],
    },
    {
      label: "Enemies",
      items: [
        "Unknown forces behind the Magical Plague.",
        "Those who would exploit the weakening of reality for personal gain.",
      ],
    },
  ],
  details_info: [
    {
      label: "Size",
      value: "Medium",
    },
    {
      label: "Creature Type",
      value: "Humanoid",
    },
    {
      label: "Skills",
      items: [
        "Investigation (trained)",
        "Persuasion (proficient)",
        "Medicine (proficient)",
        "Athletics (trained)",
      ],
    },
    {
      label: "Signature Object",
      value: "Silver prayer mirror framed in brass, dedicated to Talia.",
    },
    {
      label: "Signature Weapon",
      value: "Simple quarterstaff (for travel).",
    },
    {
      label: "Notable Items",
      items: [
        "Prayer mirror of Talia (heirloom).",
        "Spool of blue silk (tied around her wrist).",
        "Travel cloak (gift from parents).",
        "Weaver's toolkit.",
      ],
    },
    {
      label: "Motivation",
      items: [
        "To understand the magical plague threatening Delstainvia and prevent the unraveling of reality itself.",
        "To prove that even common folk can mend what has been broken.",
      ],
    },
    {
      label: "Fears & Weaknesses",
      items: [
        "Losing control of the thread visions she experiences.",
        "Failing to stop the plague and watching her homeland suffer.",
        "Being unable to interpret Talia's silent guidance.",
        "The possibility that fate cannot be changed.",
      ],
    },
    {
      label: "Hobbies",
      items: [
        "Weaving intricate patterns and tapestries.",
        "Studying ancient texts about fate and divination.",
        "Mirror meditation and prayer.",
        "Collecting unusual threads and dyes.",
      ],
    },
    {
      label: "Notable Accomplishments",
      items: [
        "Successfully predicted a minor magical disturbance through thread divination.",
        "Left home to pursue a greater calling despite her fears.",
        "Recognized by Talia through visions in the mirror.",
      ],
    },
    {
      label: "Notable Quotes",
      items: [
        `"A good cloth isn't made by force. It listens. It waits."`,
        `"Maybe people are like threads too. Each one changes the world, even just a little."`,
        `"Something is off... This is not just a simple rumor... This is something else."`,
      ],
    },
    {
      label: "Quotes About Them",
      items: [
        `"That girl sees things others don't. Always staring at patterns like they're talking to her." – Village elder`,
        `"If the world is fraying, then mend it where you can, my love. Even a single stitch can save a pattern." – Liebhaberin Endenria (mother)`,
        `"Please stay safe..." – Astaria Endrenia (father)`,
      ],
    },
  ],
};

/* ================= HELPERS ================= */

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

    const title = htmlToPlainText(rawTitle);
    const body = htmlToPlainText(bodyHtml);

    if (title || body) {
      chapters.push({ title, body });
    }
  }

  if (!chapters.length) {
    return [
      {
        title: "Backstory",
        body: htmlToPlainText(html),
      },
    ];
  }

  return chapters;
}

function mapDbCharacterToViewModel(db, idFromRoute) {
  if (!db) {
    return { ...TEMPLATE_CHARACTER, id: idFromRoute };
  }
  const name = db.full_name || db.name || "Unknown Name";
  const subtitle = `${db.race_name || "Unknown Race"} ${
    db.background_name || ""
  }`.trim()
    ? `${db.race_name || "Unknown Race"} ${db.background_name || ""} from ${
        db.main_resident?.resident || db.birth_place || "-"
      }`
    : TEMPLATE_CHARACTER.subtitle;

  const quote =
    typeof db.notable_quotes === "string" && db.notable_quotes.trim().length
      ? db.notable_quotes
      : TEMPLATE_CHARACTER.quote;

  const portrait_url = db.art_image || TEMPLATE_CHARACTER.portrait_url;
  const token_url = db.token_image || TEMPLATE_CHARACTER.token_url;
  const type = db.character_type || TEMPLATE_CHARACTER.type;
  const role = db.background_name || TEMPLATE_CHARACTER.role;
  const mkScore = (val) => {
    const num = typeof val === "number" ? val : 10;
    return { score: num, mod: Math.floor((num - 10) / 2) };
  };
  const ability_scores = {
    STR: mkScore(db.str),
    DEX: mkScore(db.dex),
    CON: mkScore(db.con),
    INT: mkScore(db.int),
    WIS: mkScore(db.wis),
    CHA: mkScore(db.cha),
  };

  const chapters =
    db.backstory && db.backstory.length
      ? extractChaptersFromBackstory(db.backstory)
      : TEMPLATE_CHARACTER.chapters;

  const heightFeet = db.height?.feet;
  const heightInch = db.height?.inch;
  const heightVal =
    heightFeet || heightInch
      ? `${heightFeet || "0"}'${heightInch || "0"}"`
      : "-";

  const weightLbs = db.weight?.pounds;
  const weightVal = weightLbs ? `${weightLbs} lbs` : "-";

  const basic_info = [
    { label: "Full Name", value: name },
    { label: "Also Known As", value: db.name || "-" },
    { label: "Race", value: db.race_name || "-" },
    {
      label: "Gender",
      value:
        db.gender && db.pronoun ? `${db.gender} (${db.pronoun})` : "Unknown",
    },
    { label: "Alignment", value: db.alignment || "-" },
    {
      label: "Birthplace",
      value:
        db.birth_place || db.birth_country
          ? `${db.birth_place || ""}${
              db.birth_country ? `, ${db.birth_country}` : ""
            }`.trim()
          : "-",
    },
    {
      label: "Born",
      value: db.birth_year
        ? `${db.birth_year} ${db.birth_year_type || ""}`.trim()
        : "-",
    },
    { label: "Height", value: heightVal },
    { label: "Weight", value: weightVal },
    { label: "Skin", value: db.skin_colour || "-" },
    { label: "Hair", value: db.hair || "-" },
  ];

  // BIO INFO: pakai field personality & notable_details kalau ada, kalau kosong biarin empty
  const bio_info = [
    {
      label: "Core Identity",
      items:
        Array.isArray(db.detailed_personality) &&
        db.detailed_personality.length > 0
          ? db.detailed_personality
          : [],
    },
    {
      label: "Faith & Devotion",
      items:
        Array.isArray(db.notable_details) && db.notable_details.length > 0
          ? db.notable_details
          : [],
    },
  ];

  // META INFO – semua langsung dari DB, gak pakai template lore kalau DB gak punya
  const titlesList =
    Array.isArray(db.titles) && db.titles.length > 0
      ? db.titles.map((t) => t.name || "").filter(Boolean)
      : [];

  const meta_info = [
    { label: "Type", value: db.character_type || "NPC" },
    { label: "Status", value: db.status || "-" },
    { label: "Titles", items: titlesList },
    { label: "Background", value: db.background_name || "-" },
    {
      label: "Weaver",
      value: db.deity || "-", // kalau nanti ada field deity
    },
    {
      label: "Factions & Affiliations",
      items: Array.isArray(db.affiliations) ? db.affiliations : [],
    },
    {
      label: "World",
      value:
        db.main_resident?.country || db.birth_country || db.nationality || "-",
    },
    { label: "Campaign", value: db.campaign || "-" },
    { label: "Level", value: db.level || "-" },
    {
      label: "Current Occupation",
      value:
        Array.isArray(db.current_occupation) && db.current_occupation.length > 0
          ? db.current_occupation.join(", ")
          : "-",
    },
    {
      label: "Previous Occupation",
      value:
        Array.isArray(db.previous_occupation) &&
        db.previous_occupation.length > 0
          ? db.previous_occupation.join(", ")
          : "-",
    },
    {
      label: "Residence",
      value:
        db.main_resident?.resident ||
        db.birth_place ||
        db.other_resident?.[0] ||
        "-",
    },
    {
      label: "Economic Standing",
      value: db.current_last_economical_standing || "-",
    },
    {
      label: "Social Class",
      value: db.current_social_classes || "-",
    },
    {
      label: "Personality",
      items:
        Array.isArray(db.detailed_personality) &&
        db.detailed_personality.length > 0
          ? db.detailed_personality
          : [],
    },
    {
      label: "Created",
      value: db.created_at ? new Date(db.created_at).toLocaleDateString() : "-",
    },
    { label: "Created By", value: db.creator_name || "-" },
  ];

  // RELATIONSHIP TAB – PAKAI DB APA ADANYA
  // Family base
  const familyItems = Array.isArray(db.family) ? db.family : [];

  // Parents = subset dari Family dengan relationship mother/father/parent
  const parentItems = familyItems.filter((item) => {
    if (!item) return false;
    const rel = (item.relationship || "").toLowerCase();
    return rel === "mother" || rel === "father" || rel === "parent";
  });

  const relationship_info = [
    // Parents di atas Family
    ...(parentItems.length
      ? [
          {
            label: "Parents",
            items: parentItems,
          },
        ]
      : []),

    // Family tetap utuh (tidak diubah)
    { label: "Family", items: familyItems },

    // Lainnya sama seperti sebelumnya
    { label: "Friends", items: Array.isArray(db.friends) ? db.friends : [] },
    { label: "Allies", items: Array.isArray(db.allies) ? db.allies : [] },
    { label: "Enemies", items: Array.isArray(db.enemies) ? db.enemies : [] },
    {
      label: "Subordinates",
      items: Array.isArray(db.subordinates) ? db.subordinates : [],
    },
    {
      label: "Special Relationships",
      items: Array.isArray(db.special_relationship)
        ? db.special_relationship
        : [],
    },
  ];

  // DETAILS TAB – PAKAI DB
  const skills =
    Array.isArray(db.skill_prof) && db.skill_prof.length > 0
      ? db.skill_prof.map(
          (s) =>
            `${s.name}${
              s.value > 0 ? " (trained)" : s.value < 0 ? " (penalty)" : ""
            }`
        )
      : [];

  const signatureObjectList = Array.isArray(db.signature_object)
    ? db.signature_object
    : [];
  const signatureWeaponList = Array.isArray(db.signature_weapon)
    ? db.signature_weapon
    : [];
  const hobbiesList = Array.isArray(db.hobbies) ? db.hobbies : [];
  const accomplishmentsList = Array.isArray(db.notable_accomplishments)
    ? db.notable_accomplishments
    : [];

  const quotesOthersList = Array.isArray(db.quotes_from_others)
    ? db.quotes_from_others.map(
        (q) => `"${q.quote}" – ${q.author || "Unknown"}`
      )
    : [];

  const details_info = [
    {
      label: "Size",
      value: db.size?.general || "-",
    },
    {
      label: "Creature Type",
      value: db.creature_type || "-",
    },
    {
      label: "Skills",
      items: skills,
    },
    {
      label: "Signature Object",
      value: signatureObjectList[0] || "-",
    },
    {
      label: "Signature Weapon",
      value: signatureWeaponList[0] || "-",
    },
    {
      label: "Notable Items",
      items: signatureObjectList,
    },
    {
      label: "Motivation",
      items: Array.isArray(db.motivation)
        ? db.motivation
            .map((m) => m.motivation || "")
            .filter((m) => m.trim().length > 0)
        : [],
    },
    {
      label: "Fears & Weaknesses",
      items: Array.isArray(db.fear_weakness)
        ? db.fear_weakness
            .map((fw) => fw.fear_weak || fw["fear/weak"] || "")
            .filter((f) => f.trim().length > 0)
        : [],
    },
    {
      label: "Hobbies",
      items: hobbiesList,
    },
    {
      label: "Notable Accomplishments",
      items: accomplishmentsList,
    },
    {
      label: "Notable Quotes",
      items: db.notable_quotes ? [db.notable_quotes] : [],
    },
    {
      label: "Quotes About Them",
      items: quotesOthersList,
    },
  ];

  return {
    id: db.id || idFromRoute,
    name,
    subtitle,
    quote,
    portrait_url,
    token_url,
    type,
    role,
    ability_scores,
    chapters,
    basic_info,
    bio_info,
    meta_info,
    relationship_info,
    details_info,
  };
}

/* ================= SERVER COMPONENT ================= */

async function CharacterDetailContent(props) {
  // 👉 ikuti warning Next: params perlu di-await
  const { privateId } = await props.params;

  const res = await fetch(`${API_BASE}/characters/private/${privateId}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    // kalau gagal total → tampilin template aja
    const character = { ...TEMPLATE_CHARACTER, id: privateId };
    return <CharacterView character={character} />;
  }

  const json = await res.json();
  const dbChar = json.data;
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
