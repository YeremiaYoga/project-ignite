// app/creator/journals/components/journalUtils.js

export function genShareId(len = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/**
 * pages column: [{ name, content }]
 * fvtt_format: full FVTT object
 */
export function buildFvttFormat({ name, pages }) {
  const safeName = (name || "").trim() || "Untitled Journal";

  const fvttPages = (pages || []).map((p, idx) => {
    const pageName = (p?.name || "").trim() || `Page ${idx + 1}`;
    const content = p?.content ?? "";

    return {
      name: pageName,
      type: "text",
      text: {
        format: 1,
        content: content, // boleh plain text / html string
      },
      _id: String(idx + 1).padStart(16, "0"), // konsisten, seperti contoh
      title: {
        show: true,
        level: 1, // default (kamu bisa bikin input level nanti)
      },
    };
  });

  return {
    name: safeName,
    pages: fvttPages,
  };
}

/**
 * normalize data dari backend untuk form
 * - pages kolom bisa null, fallback dari fvtt_format.pages
 */
export function normalizeJournalToForm(journal) {
  const name = journal?.name ?? journal?.fvtt_format?.name ?? "";
  const description = journal?.description ?? "";
  const isPrivate = typeof journal?.private === "boolean" ? journal.private : true;

  let pages = Array.isArray(journal?.pages) ? journal.pages : null;

  // fallback dari fvtt_format kalau pages kolom belum ada
  if (!pages && Array.isArray(journal?.fvtt_format?.pages)) {
    pages = journal.fvtt_format.pages.map((p, idx) => ({
      name: p?.name ?? `Page ${idx + 1}`,
      content: p?.text?.content ?? "",
    }));
  }

  if (!pages) pages = [{ name: "Page 1", content: "" }];

  return {
    name,
    description,
    private: isPrivate,
    pages,
  };
}
