"use client";

import { useState, useEffect } from "react";

export default function RaceDataForm() {
  const [mode, setMode] = useState("new"); // "new" atau "edit"
  const [folders, setFolders] = useState([]); // list race dari API
  const [selectedFolder, setSelectedFolder] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    description: "",
    traits: [],
    image: null,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  useEffect(() => {
    fetch("/api/races/getAllRace")
      .then((res) => res.json())
      .then((data) => setFolders(data))
      .catch((err) => console.error("Error loading race folders:", err));
  }, []);

  useEffect(() => {
    if (!selectedFolder) {
      setFormData({
        name: "",
        source: "",
        description: "",
        traits: [],
        image: null,
      });
      return;
    }

    fetch(`/api/races/getracefolder?race=${selectedFolder}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: selectedFolder,
          source: data.source || "",
          description: data.description || "",
          traits: Array.isArray(data.traits) ? data.traits : [],
          image: data.image || null,
        });
      })
      .catch((err) => console.error("Error fetching race data:", err));
  }, [selectedFolder]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("raceName", formData.name);
    fd.append("handbook", formData.source);
    fd.append("description", formData.description);
    fd.append("traits", formData.traits.join(", "));
    if (formData.image) fd.append("image", formData.image);

    try {
      const res = await fetch("/api/races/createRace", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const errText = await res.text();
        setError(`Error: ${errText}`);
        setMessage("");
        return;
      }

      const data = await res.json();
      setMessage(data.message || "Race saved/replaced successfully.");
      setError("");

      if (mode === "new") {
        setFormData({
          name: "",
          source: "",
          description: "",
          traits: [],
          image: null,
        });
        setSelectedFolder("");
      }
    } catch (err) {
      console.error(err);
      setError("Network or server error");
      setMessage("");
    }
  };

  const addTrait = () => {
    setFormData((prev) => ({ ...prev, traits: [...prev.traits, ""] }));
  };

  const updateTrait = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.traits];
      updated[index] = value;
      return { ...prev, traits: updated };
    });
  };

  const removeTrait = (index) => {
    setFormData((prev) => {
      const updated = [...prev.traits];
      updated.splice(index, 1);
      return { ...prev, traits: updated };
    });
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-4">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={() => setMode("new")}
          className={`px-4 py-2 rounded ${
            mode === "new" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          New
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("edit");
            fetch("/api/races/getAllRace")
              .then((res) => res.json())
              .then((data) => setFolders(data))
              .catch((err) =>
                console.error("Error loading race folders:", err)
              );
          }}
          className={`px-4 py-2 rounded ${
            mode === "edit" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          Edit
        </button>
      </div>

      {mode === "edit" && (
        <div>
          <label className="block font-semibold mb-1">
            Select Race to Edit
          </label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">-- Select Race --</option>
            {folders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {message && (
          <div className="bg-green-500 text-white p-2 rounded-md fixed top-20 right-4 z-50">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white p-2 rounded-md fixed top-20 right-4 z-50">
            {error}
          </div>
        )}

        <div>
          <label className="block font-semibold mb-1">Race Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Source</label>
          <input
            type="text"
            value={formData.source}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, source: e.target.value }))
            }
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Traits</label>
          {formData.traits.map((trait, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={trait}
                onChange={(e) => {
                  const updated = [...formData.traits];
                  updated[index] = e.target.value;
                  setFormData((prev) => ({ ...prev, traits: updated }));
                }}
                className="flex-1 p-2 rounded bg-gray-700 border border-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => {
                  const updated = [...formData.traits];
                  updated.splice(index, 1);
                  setFormData((prev) => ({ ...prev, traits: updated }));
                }}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                x
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTrait}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Trait
          </button>
        </div>

        <div>
          <label className="block font-semibold mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Save Race
        </button>
      </form>
    </div>
  );
}
