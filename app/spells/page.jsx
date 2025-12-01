// app/spells/page.jsx
import { Suspense } from "react";
import FoundrySpellView from "./FoundrySpellView";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-200">
          Loading spells...
        </div>
      }
    >
      <FoundrySpellView />
    </Suspense>
  );
}
