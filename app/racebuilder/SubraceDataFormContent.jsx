// components/SubraceDataFormContent.jsx
"use client";

import { useState } from "react";

export default function SubraceDataFormContent({ selectedFolder, onSubmit }) {
  const [subraceNameInput, setSubraceNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subraceNameInput.trim() === "") {
      alert("Subrace name cannot be empty.");
      return;
    }

    setIsLoading(true);

    const dataToSave = {
      name: subraceNameInput.trim(),
      raceName: selectedFolder,
    };

    console.log(dataToSave);
    // try {
    //   const response = await fetch("/api/races/saveSubrace", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(dataToSave),
    //   });

    //   if (response.ok) {
    //     alert(`Subrace name '${subraceNameInput.trim()}' saved successfully!`);

    //     if (onSubmit) onSubmit(dataToSave);
    //     setSubraceNameInput("");
    //   } else {
    //     const errorData = await response.json();
    //     alert(
    //       `Failed to save subrace name: ${
    //         errorData.message || response.statusText
    //       }`
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error saving subrace name:", error);
    //   alert("An error occurred while saving the subrace name.");
    // } finally {
    //   setIsLoading(false);
    // }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-4 text-white"
    >
      <h3 className="text-xl font-bold mb-4">Create New Subrace</h3>
      {isLoading && <p className="text-center text-gray-400">Saving...</p>}

      {!isLoading && (
        <>
          <div>
            <label htmlFor="subrace-name" className="block mb-1 font-medium">
              Subrace Name
            </label>
            <input
              id="subrace-name"
              type="text"
              name="subraceName"
              value={subraceNameInput}
              onChange={(e) => setSubraceNameInput(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              placeholder="Enter subrace name (e.g., Hill Dwarf)"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Create Subrace"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
