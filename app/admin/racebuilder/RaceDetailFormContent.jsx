"use client";

import { useState, useEffect } from "react";
import TraitItem from "./TraitItem";

export default function RaceDetailFormContent({ selectedFolder, onSubmit }) {
  const [formData, setFormData] = useState({
    name: selectedFolder || "",
    asi: "",
    speed: "",
    details: [],
    tales_details: "",
    source: "",
    age: "",
    languages: "",
    traits: [],
  });

  const [traitTitles, setTraitTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, name: selectedFolder }));
    if (!selectedFolder) {
      setTraitTitles([]);
      setFormData((prev) => ({ ...prev, traits: [], details: [] }));
      return;
    }

    fetch(`/api/races/getracefolder?race=${selectedFolder}`)
      .then((res) => res.json())
      .then((data) => {
        const titles = Array.isArray(data?.traits) ? data.traits : [];
        setTraitTitles(titles);

        const loadedDetails = Array.isArray(data?.details) ? data.details : [];

        setFormData((prev) => {
          const nextTraits = titles.map((_, i) => prev.traits[i] ?? {});
          return {
            ...prev,
            traits: nextTraits,
            details:
              loadedDetails.length > 0
                ? loadedDetails
                : [{ type: "description", content: "" }],
          };
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

  const addDetailBlock = (type) => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { type, content: "" }],
    }));
  };

  const removeDetailBlock = (index) => {
    setFormData((prev) => {
      const nextDetails = prev.details.filter((_, i) => i !== index);
      return { ...prev, details: nextDetails };
    });
  };

  const updateDetailBlock = (index, newContent) => {
    setFormData((prev) => {
      const nextDetails = [...prev.details];
      nextDetails[index] = { ...nextDetails[index], content: newContent };
      return { ...prev, details: nextDetails };
    });
  };

  const updateDetailTable = (index, newTable) => {
    setFormData((prev) => {
      const nextDetails = [...prev.details];
      nextDetails[index] = { ...nextDetails[index], table: newTable };
      return { ...prev, details: nextDetails };
    });
  };

  const updateDetailList = (index, newList) => {
    setFormData((prev) => {
      const nextDetails = [...prev.details];
      nextDetails[index] = { ...nextDetails[index], list: newList };
      return { ...prev, details: nextDetails };
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
        if (
          typeof value === "object" &&
          value !== null &&
          !(value instanceof File)
        ) {
          formDataUpload.append(key, JSON.stringify(value));
        } else {
          formDataUpload.append(key, value);
        }
      }

      if (imageFile) {
        formDataUpload.append("image", imageFile);
      }

      const response = await fetch("/api/races/saveRaceDetail", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || response.statusText);
      }

      const dataSaved = await response.json();
      if (onSubmit) onSubmit(dataSaved);

      setNotification({
        type: "success",
        message: "Race detail saved successfully.!",
      });
      setTimeout(() => setNotification(null), 2000);
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan detail ras:", error);
      setNotification({
        type: "error",
        message: "Gagal menyimpan detail ras.",
      });
      setTimeout(() => setNotification(null), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4 text-white"
    >
      {notification && (
        <div
          className={`fixed top-20 right-4 px-4 py-2 rounded shadow-lg text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

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
        "tales_details",
        "age",
        "languages",
      ].map((field) => (
        <div key={field}>
          <label className="block mb-1 font-medium capitalize">
            {field.replace(/_/g, " ")}
          </label>
          {field === "tales_details" ? (
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

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-3">Details</h3>
        <div className="space-y-4">
          {formData.details.map((detail, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <label className="block font-medium capitalize">
                  {detail.type.replace(/_/g, " ")}
                </label>
                <button
                  type="button"
                  onClick={() => removeDetailBlock(index)}
                  className="text-red-500 hover:text-red-600 font-bold"
                  aria-label="Remove detail block"
                >
                  &times;
                </button>
              </div>

              {detail.type === "description" && (
                <textarea
                  value={detail.content}
                  onChange={(e) => updateDetailBlock(index, e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600"
                />
              )}

              {detail.type === "table" && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {detail.table?.headers?.map((h, i) => (
                      <input
                        key={i}
                        type="text"
                        value={h}
                        onChange={(e) => {
                          const newHeaders = detail.table.headers.map(
                            (val, idx) => (idx === i ? e.target.value : val)
                          );
                          const newRows = detail.table.rows.map((row) => {
                            const newRow = [...row];
                            if (!newRow[i]) newRow[i] = "";
                            return newRow;
                          });
                          updateDetailTable(index, {
                            headers: newHeaders,
                            rows: newRows,
                          });
                        }}
                        className="px-2 py-1 rounded bg-gray-700 border border-gray-600"
                        placeholder={`Header ${i + 1}`}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newHeaders = [
                          ...(detail.table?.headers || []),
                          "",
                        ];
                        const newRows = detail.table?.rows?.map((row) => [
                          ...row,
                          "",
                        ]) || [[""]];
                        updateDetailTable(index, {
                          headers: newHeaders,
                          rows: newRows,
                        });
                      }}
                      className="bg-blue-600 hover:bg-blue-700 px-2 rounded text-sm"
                    >
                      + Header
                    </button>
                  </div>
                  {detail.table?.rows?.map((row, rIdx) => (
                    <div key={rIdx} className="flex flex-wrap gap-2 mb-2">
                      {row.map((cell, cIdx) => (
                        <input
                          key={cIdx}
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            const newRows = detail.table.rows.map((r, ri) =>
                              ri === rIdx
                                ? r.map((c, ci) =>
                                    ci === cIdx ? e.target.value : c
                                  )
                                : r
                            );
                            updateDetailTable(index, {
                              headers: detail.table.headers,
                              rows: newRows,
                            });
                          }}
                          className="px-2 py-1 rounded bg-gray-700 border border-gray-600"
                          placeholder={`R${rIdx + 1}C${cIdx + 1}`}
                        />
                      ))}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const colCount = detail.table?.headers?.length || 0;
                      const newRows = [
                        ...(detail.table?.rows || []),
                        Array(colCount).fill(""),
                      ];
                      updateDetailTable(index, {
                        headers: detail.table.headers,
                        rows: newRows,
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-2 rounded text-sm"
                  >
                    + Row
                  </button>
                </div>
              )}

              {detail.type === "list" && (
                <div>
                  {detail.list?.map((item, i) => (
                    <input
                      key={i}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newList = detail.list.map((it, idx) =>
                          idx === i ? e.target.value : it
                        );
                        updateDetailList(index, newList);
                      }}
                      className="w-full px-3 py-1 rounded-md bg-gray-700 border border-gray-600 mb-1"
                      placeholder={`List Item ${i + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newList = [...(detail.list || []), ""];
                      updateDetailList(index, newList);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-2 rounded text-sm"
                  >
                    + Item
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4 ">
          <button
            type="button"
            onClick={() => addDetailBlock("description")}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-semibold text-sm"
          >
            Add Description
          </button>
          <button
            type="button"
            onClick={() => addDetailBlock("table")}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md font-semibold text-sm"
          >
            Add Table
          </button>
          <button
            type="button"
            onClick={() => addDetailBlock("list")}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold text-sm "
          >
            Add List
          </button>
        </div>
      </div>

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
