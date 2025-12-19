// app/characters-maker/view/[privateId]/page.jsx
import { Suspense } from "react";
import CharacterDetailClient from "./CharacterDetailClient";

export default async function CharacterDetailPage(props) {
  const { privateId } = await props.params;
  
  return (
    <Suspense
      fallback={
        <div className="p-6 text-gray-200 text-sm">Loading character…</div>
      }
    >
      <CharacterDetailClient privateId={privateId} />
    </Suspense>
  );
}
