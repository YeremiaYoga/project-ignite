"use client";

import { useState, useEffect } from "react";
import TraitItem from "./TraitItem";

export default function RaceDetailFormContent({ selectedFolder, onSubmit }) {
  const [formData, setFormData] = useState({
    name: selectedFolder || "",
    asi: "",
    speed: "",
    size: "",
    creature_type: "",
    details: "",
    tales_details: "",
    source: "",
    age: "",
    languages: "",
    traits: [],
  });

  const [traitTitles, setTraitTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

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

  const updateTraitByIndex = (idx, value, title) => {
    setFormData((prev) => {
      const next = [...prev.traits];
      next[idx] = { ...value, title: title };
      return { ...prev, traits: next };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataUpload = new FormData();

      for (const [key, value] of Object.entries(formData)) {
        formDataUpload.append(key, value);
      }

      if (imageFile) {
        formDataUpload.append("image", imageFile);
      }

      console.log(formDataUpload);
      const response = await fetch("/api/races/saveRaceDetail", {
        method: "POST",
        body: formDataUpload,
      });

      if (response.ok) {
        const dataSaved = await response.json();
        if (onSubmit) onSubmit(dataSaved);
      } else {
        const errorData = await response.json();
        alert(`failed ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan detail ras:", error);
      alert("Terjadi kesalahan saat menyimpan detail ras.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4 text-white"
    >
      <input type="hidden" name="name" value={formData.name} />

      <div>
        <label className="block mb-1 font-medium">Race Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
        />
      </div>

      {[
        "creature_type",
        "size",
        "speed",
        "asi",
        "source",
        "details",
        "tales_details",
        "age",
        "languages",
      ].map((field) => (
        <div key={field}>
          <label className="block mb-1 font-medium capitalize">
            {field.replace(/_/g, " ")}
          </label>
          {field === "details" || field === "tales_details" ? (
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
                onChange={(updated) => updateTraitByIndex(idx, updated, title)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
