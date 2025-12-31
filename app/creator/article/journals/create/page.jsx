"use client";

import JournalFormFVTT from "../components/JournalFormVTT";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function CreateJournalPage() {
  async function onSubmit(payload) {
    const res = await fetch(`${API_BASE}/ignite/journals`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || "Failed to create journal");
    }
  }

  return <JournalFormFVTT mode="create" onSubmit={onSubmit} />;
}
