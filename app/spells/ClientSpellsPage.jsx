"use client";

import { Suspense } from "react";
import SpellsContent from "./SpellsContent";

export default function ClientSpellsPage({ spells }) {
  return (
    <Suspense fallback={<div className="text-gray-400 p-6">Loading spells...</div>}>
      <SpellsContent spells={spells} />
    </Suspense>
  );
}
