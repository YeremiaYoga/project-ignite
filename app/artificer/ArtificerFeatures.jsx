"use client";
import CollapsibleSection from "./CollapseSection";
import FeaturesContent from "@/components/FeaturesContent";
import artificerFeatures from "@/data/classes/artificer/classFeatures";
export default function ArtificerFeatures() {
  return (
    <div className="text-zinc-100 p-8 rounded-xl mx-auto shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Class Features</h1>
      <p className="mb-6">
        As an artificer, you gain the following class features.
      </p>
      {artificerFeatures.map((feature) => (
        <section
          key={feature.id}
          id={feature.id}
          className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
        >
          <CollapsibleSection title={feature.title} level={feature.level}>
            <FeaturesContent content={feature.content} />
          </CollapsibleSection>
        </section>
      ))}
    </div>
  );
}
