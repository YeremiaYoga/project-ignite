"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CollapsibleSection from "@/components/CollapseSection";
import FeaturesContent from "@/components/FeaturesContent";
import FeatureTable from "@/components/FeatureTable";
import CoreTraitsDisplay from "@/components/CoreTraitsDisplay";

export default function ClassFeatures({ classId }) {
  const [features, setFeatures] = useState([]);
  const [coreTraits, setCoreTraits] = useState(null);
  const [subclasses, setSubclasses] = useState([]);
  const [activeSubclasses, setActiveSubclasses] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [classFeatures, classData, subclassData] = await Promise.all([
          import(`@/data/classes/${classId}/classFeatures`).then(
            (m) => m.default
          ),
          import(`@/data/classes/${classId}/classData`).then((m) => m.default),
          import(`@/data/classes/${classId}/subclassData`)
            .then((m) => m.default)
            .catch(() => []),
        ]);
        if (!classFeatures) return;
        setFeatures(classFeatures);
        setCoreTraits(classData.coreTraits);
        setSubclasses(subclassData || []);
      } catch (error) {
        console.error("Failed to load class data:", error);
      }
    };

    loadData();
  }, [classId]);

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
    return subclasses
      .filter((sub) => activeSubclasses.includes(sub.key))
      .flatMap((sub) =>
        sub.features
          .filter((feat) => feat.level === level)
          .map((feat) => ({ ...feat, subclass: sub.name, key: sub.key }))
      );
  };

  const capitalizedClass = classId.charAt(0).toUpperCase() + classId.slice(1);
  console.log(subclasses);

  return (
    <div className="text-zinc-100 p-8 rounded-xl mx-auto shadow-lg">
      <h1 className="text-3xl font-bold mb-6">{capitalizedClass} Features</h1>
      <p className="mb-6">
        As a {capitalizedClass}, you gain the following class features.
      </p>

      {subclasses.length > 0 && (
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
              {sub.key
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>
      )}

      {coreTraits && (
        <CollapsibleSection title="Core Traits">
          <CoreTraitsDisplay data={coreTraits} />
        </CollapsibleSection>
      )}

      {Array.isArray(features) &&
        features.length > 0 &&
        features.map((feature) => {
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
