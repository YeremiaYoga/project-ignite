"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CollapsibleSection from "@/components/CollapseSection";
import FeaturesContent from "@/components/FeaturesContent";
import FeatureTable from "@/components/FeatureTable";
import CoreTraitsDisplay from "@/components/CoreTraitsDisplay";
import { linkifyText } from "@/utils/linkifyText";

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
      const list = urlSubclasses.split(",");
      setActiveSubclasses(list);
    } else {
      setActiveSubclasses([]);
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

  const capitalizedClass = classId
    .replace(/_/g, " ")
    .replace(/^./, (char) => char.toUpperCase());

  return (
    <div className="text-zinc-100 p-8 rounded-xl mx-auto shadow-lg">
      <h1 className="text-3xl font-bold mb-6">{capitalizedClass} Features</h1>
      <p className="mb-6">
        As a {capitalizedClass}, you gain the following class features.
      </p>

      {subclasses.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {subclasses.map((sub) => {
            const imageSrc = `/assets/subclassIcon/${classId}/${sub.key.replace(
              /-/g,
              "_"
            )}_icon.png`;
            const displayName = sub.key
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <button
                key={sub.key}
                className={`px-3 py-1 rounded border text-sm flex items-center gap-2 ${
                  activeSubclasses.includes(sub.key)
                    ? "bg-blue-700 border-blue-400 text-white"
                    : "bg-zinc-900 border-zinc-700 text-zinc-300"
                }`}
                onClick={() => handleToggleSubclass(sub.key)}
              >
                <img
                  src={imageSrc}
                  alt={`${displayName} icon`}
                  className="w-5 h-5 object-contain"
                />
                {displayName}
              </button>
            );
          })}
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
              className="scroll-mt-20 border-b border-zinc-700 pb-6 mb-6 last:border-b-0 last:mb-0"
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
                            <p
                              dangerouslySetInnerHTML={{
                                __html: linkifyText(
                                  subFeat.description,
                                  "universalLink classesLink"
                                ),
                              }}
                            />

                            {Array.isArray(subFeat.list) &&
                              subFeat.list.length > 0 && (
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                  {subFeat.list.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              )}
                          </div>
                          {subFeat.table && (
                            <FeatureTable table={subFeat.table} />
                          )}
                          {subFeat.note && (
                            <div className="text-sm text-zinc-500 italic mt-2">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: linkifyText(
                                    subFeat.note,
                                    "universalLink classesLink"
                                  ),
                                }}
                              />
                            </div>
                          )}
                          {subFeat.subfeatures &&
                            subFeat.subfeatures.length > 0 && (
                              <div className="mt-4 space-y-4">
                                {subFeat.subfeatures.map((sub, idx) => (
                                  <div
                                    key={sub.title + idx}
                                    className="ml-4 border-l border-blue-600 pl-4 space-y-2"
                                  >
                                    <div className="font-semibold text-blue-400">
                                      {sub.title}
                                    </div>

                                    {sub.description && (
                                      <div className="text-zinc-300 whitespace-pre-line">
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: linkifyText(
                                              sub.description,
                                              "universalLink classesLink"
                                            ),
                                          }}
                                        />
                                      </div>
                                    )}

                                    {Array.isArray(sub.list) &&
                                      sub.list.length > 0 && (
                                        <ul className="list-disc list-inside text-zinc-300 space-y-1">
                                          {sub.list.map((item, i) => (
                                            <li
                                              key={i}
                                              dangerouslySetInnerHTML={{
                                                __html: linkifyText(
                                                  item,
                                                  "universalLink classesLink"
                                                ),
                                              }}
                                            ></li>
                                          ))}
                                        </ul>
                                      )}

                                    {sub.note && (
                                      <div className="text-sm text-zinc-500 italic">
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: linkifyText(
                                              sub.note,
                                              "universalLink classesLink"
                                            ),
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}
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
