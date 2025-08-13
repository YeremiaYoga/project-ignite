"use client";

import { useState, useEffect } from "react";
import TraitItem from "./TraitItem";

export default function RaceDetailFormContent({ selectedFolder, onSubmit }) {
  const [formData, setFormData] = useState({
    name: selectedFolder || "",
    asi: "",
    speed: "",
    size: "",
    languages: "",
    description: "",
    traits: [],
  });

  const [traitTitles, setTraitTitles] = useState([]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, name: selectedFolder }));
    if (!selectedFolder) {
      setTraitTitles([]);
      setFormData((prev) => ({ ...prev, traits: [] }));
      return;
    }

    fetch(`/api/races/getracefolder?race=${selectedFolder}`)
      .then((res) => res.json())
      .then((data) => {
        const titles = Array.isArray(data?.traits) ? data.traits : [];
        setTraitTitles(titles);

        setFormData((prev) => {
          const nextTraits = titles.map((_, i) => prev.traits[i] ?? {});
          return { ...prev, traits: nextTraits };
        });
      })
      .catch((err) => console.error("Error fetching race data:", err));
  }, [selectedFolder]);

  const updateTraitByIndex = (idx, value) => {
    setFormData((prev) => {
      const next = [...prev.traits];
      next[idx] = value;
      return { ...prev, traits: next };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4 text-white"
    >
      <input type="hidden" name="name" value={formData.name} />

      {[
        "asi",
        "speed",
        "size",
        "languages",
        "description",
      ].map((field) => (
        <div key={field}>
          <label className="block mb-1 font-medium capitalize">{field}</label>
          {field === "description" ? (
            <textarea
              name={field}
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              rows="4"
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          ) : (
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          )}
        </div>
      ))}

      {traitTitles.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">Traits</h3>

          <div className="space-y-4">
            {traitTitles.map((title, idx) => (
              <TraitItem
                key={`${title}-${idx}`}
                title={title}
                value={formData.traits[idx] || {}}
                onChange={(updated) => updateTraitByIndex(idx, updated)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
        >
          Save
        </button>
      </div>
    </form>
  );
}
