"use client";

import { useState } from "react";

export default function RaceDataForm() {
  const [raceName, setRaceName] = useState("");
  const [handbook, setHandbook] = useState("");
  const [description, setDescription] = useState("");
  const [traitsInput, setTraitsInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("raceName", raceName);
    formData.append("handbook", handbook);
    formData.append("description", description);
    formData.append("traits", traitsInput);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch("/api/races/createRace", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        setError(`Error: ${errText}`);
        setMessage("");
        return;
      }

      const data = await res.json();
      setMessage(data.message || "Race saved successfully.");
      setError("");

      setRaceName("");
      setHandbook("");
      setDescription("");
      setTraitsInput("");
      setImageFile(null);
    } catch (err) {
      setError("Network or server error");
      setMessage("");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mx-auto"
      encType="multipart/form-data"
    >
      <div>
        <label className="block font-semibold mb-1">Race Name</label>
        <input
          type="text"
          value={raceName}
          onChange={(e) => setRaceName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Source</label>
        <input
          type="text"
          value={handbook}
          onChange={(e) => setHandbook(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Traits</label>
        <input
          type="text"
          value={traitsInput}
          onChange={(e) => setTraitsInput(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition"
      >
        Save Race
      </button>
    </form>
  );
}
