// app/feats/page.jsx
import { Suspense } from "react";
import FoundryFeatView from "./FoundryFeatView";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-200">
          Loading feats...
        </div>
      }
    >
      <FoundryFeatView />
    </Suspense>
  );
}
