// app/characters/[id]/page.jsx
import { Suspense } from "react";
import CharacterView from "./components/CharacterView";

// Komponen async yang pakai params + siapkan DUMMY data
async function CharacterDetailContent({ params }) {
  // Sesuai warning Next: params diperlakukan async
  const { id } = await params;

  // === DUMMY DATA SEMENTARA ===
  const character = {
    id,
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

    // ====== ABILITY SCORES (DETAILS TAB) ======
    ability_scores: {
      STR: { score: 8, mod: -1 },
      DEX: { score: 10, mod: 0 },
      CON: { score: 12, mod: 1 },
      INT: { score: 14, mod: 2 },
      WIS: { score: 14, mod: 2 },
      CHA: { score: 15, mod: 2 },
    },

    // ====== CHAPTERS (LEFT SIDE) ======
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

    // =====================================================================
    // ============================ TAB BIO ================================
    // =====================================================================

    // grid kiri-kanan
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

    // blok tambahan bio di bawah basic_info
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

    // meta info bio (Type, Status, Titles, dll + Created / Created By)
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
        label: "Deity",
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

    // =====================================================================
    // ========================= TAB RELATIONSHIP ==========================
    // =====================================================================

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

    // =====================================================================
    // ============================ TAB DETAILS ============================
    // =====================================================================

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
        label: "Quotes About Her",
        items: [
          `"That girl sees things others don't. Always staring at patterns like they're talking to her." – Village elder`,
          `"If the world is fraying, then mend it where you can, my love. Even a single stitch can save a pattern." – Liebhaberin Endenria (mother)`,
          `"Please stay safe..." – Astaria Edenria (father)`,
        ],
      },
    ],
  };

  return <CharacterView character={character} />;
}

// Page utama pakai Suspense
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
