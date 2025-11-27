// app/items/page.jsx
import { Suspense } from "react";
import FoundryItemView from "./FoundryItemView";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-200">
          Loading items...
        </div>
      }
    >
      <FoundryItemView />
    </Suspense>
  );
}
