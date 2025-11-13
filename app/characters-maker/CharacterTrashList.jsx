"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CharacterCard from "./CharacterCard";

export default function CharacterTrashList({ searchTerm = "" }) {
  const router = useRouter();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchTrash();
  }, []);

  const fetchTrash = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters/trash`,
        { credentials: "include" }
      );
      const data = await res.json();

      const chars = Array.isArray(data)
        ? data
        : data.characters || data.data || [];

      setCharacters(chars);
    } catch (err) {
      console.error("Failed to fetch trash characters:", err);
      setCharacters([]);
    }
  };

  const handleRestore = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to restore "${name}" ?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters/${id}/restore`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to restore character");

      alert(`✅ "${name}" has been restored.`);
      fetchTrash();
    } catch (err) {
      console.error(err);
      alert(`❌ Failed to restore "${name}".`);
    }
  };

  const handleDeletePermanent = async (id, name) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to permanently delete "${name}"?\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to permanently delete");

      alert(`🗑️ "${name}" has been permanently deleted.`);
      fetchTrash(); 
    } catch (err) {
      console.error(err);
      alert(`❌ Failed to permanently delete "${name}".`);
    }
  };

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredCharacters.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-10">
        {characters.length === 0
          ? "Trash bin is empty."
          : "No matching characters found in trash."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center">
      {filteredCharacters.map((char) => (
        <CharacterCard
          key={char.uuid}
          char={char}
          isTrash={true}
          onRestore={() => handleRestore(char.id, char.name)}
          onDeletePermanent={() => handleDeletePermanent(char.id, char.name)}
        />
      ))}
    </div>
  );
}
