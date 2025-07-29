"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CollapsibleSection from "../../../components/CollapseSection";
import FeaturesContent from "@/components/FeaturesContent";
import FeatureTable from "@/components/FeatureTable";
import barbarianFeatures from "@/data/classes/barbarian/classFeatures";
import barbarianCoreTraits from "@/data/classes/barbarian/coreTraits";
import CoreTraitsDisplay from "@/components/CoreTraitsDisplay";
import { barbarianSubclasses } from "@/data/classes/barbarian/subclassData";

const subclasses = [
  { key: "ancestral-guardian", label: "Ancestral Guardian (XGE)" },
  { key: "battlerager", label: "Battlerager (SCAG)" },
  { key: "beast", label: "Beast (TCE)" },
  { key: "berserker", label: "Berserker (PHB'24)" },
  { key: "giant", label: "Giant (BGG)" },
  { key: "juggernaut", label: "Juggernaut (TDCSR)" },
  { key: "storm-herald", label: "Storm Herald (XGE)" },
  { key: "wild-heart", label: "Wild Heart (PHB'24)" },
  { key: "wild-magic", label: "Wild Magic (TCE)" },
  { key: "world-tree", label: "World Tree (PHB'24)" },
  { key: "zealot", label: "Zealot (PHB'24)" },
];

export default function BarbarianFeatures() {
  const [activeSubclasses, setActiveSubclasses] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlSubclasses = searchParams.get("subclasses");
    if (urlSubclasses) {
      setActiveSubclasses(urlSubclasses.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeSubclasses.length > 0) {
      params.set("subclasses", activeSubclasses.join(","));
    } else {
      params.delete("subclasses");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeSubclasses]);
  const handleToggleSubclass = (key) => {
    setActiveSubclasses((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const getSubclassFeaturesForLevel = (level) => {
    return barbarianSubclasses
      .filter((sub) => activeSubclasses.includes(sub.key))
      .flatMap((sub) =>
        sub.features
          .filter((feat) => feat.level === level)
          .map((feat) => ({
            ...feat,
            subclass: sub.name,
            key: sub.key,
          }))
      );
  };

  return (
    <div className="text-zinc-100 p-8 rounded-xl mx-auto shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Class Features</h1>
      <p className="mb-6">
        As an barbarian, you gain the following class features.
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {subclasses.map((sub) => (
          <button
            key={sub.key}
            className={`px-3 py-1 rounded border text-sm ${
              activeSubclasses.includes(sub.key)
                ? "bg-blue-700 border-blue-400 text-white"
                : "bg-zinc-900 border-zinc-700 text-zinc-300"
            }`}
            onClick={() => handleToggleSubclass(sub.key)}
          >
            {sub.label}
          </button>
        ))}
      </div>
      <CollapsibleSection title="Core Traits">
        <CoreTraitsDisplay data={barbarianCoreTraits} />
      </CollapsibleSection>

      {barbarianFeatures.map((feature) => {
        const subclassFeatures = getSubclassFeaturesForLevel(feature.level);

        return (
          <section
            key={feature.id}
            id={feature.id}
            className="border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
          >
            <CollapsibleSection title={feature.title} level={feature.level}>
              <FeaturesContent
                content={feature.content}
                subclass={activeSubclasses}
              />

              {feature.title.toLowerCase().includes("specialist") && (
                <div className="mt-4 space-y-4">
                  {subclassFeatures.length > 0 ? (
                    subclassFeatures.map((subFeat, idx) => (
                      <div
                        key={subFeat.key + subFeat.title + idx}
                        className="ml-4 border-l-2 border-blue-700 pl-4 space-y-2"
                      >
                        <div className="font-semibold text-blue-400">
                          {subFeat.subclass} Feature: {subFeat.title}
                        </div>
                        <div className="text-zinc-300 whitespace-pre-line">
                          {subFeat.description}
                        </div>

                        {subFeat.table && (
                          <FeatureTable table={subFeat.table} />
                        )}

                        {subFeat.note && (
                          <div className="text-sm text-zinc-500 italic mt-2">
                            {subFeat.note}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="ml-4 text-zinc-500 italic">
                      No subclass features available at this level.
                    </div>
                  )}
                </div>
              )}
            </CollapsibleSection>
          </section>
        );
      })}
    </div>
  );
}
