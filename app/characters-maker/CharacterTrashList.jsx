"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CharacterCard from "./CharacterCard";

export default function CharacterTrashList() {
  const router = useRouter();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchTrash();

    // fetchExpired();

    // const interval = setInterval(() => {
    //   fetchExpired();
    // }, 5 * 60 * 1000);

    // return () => clearInterval(interval);
  }, []);

const fetchTrash = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/characters/trash`,
      { credentials: "include" }
    );

    const data = await res.json();

    // Sesuaikan tergantung struktur respons
    const chars = Array.isArray(data)
      ? data
      : data.characters || data.data || [];

    setCharacters(chars);
  } catch (err) {
    console.error("Failed to fetch trash characters:", err);
    setCharacters([]); // fallback biar gak error di map()
  }
};


  const fetchExpired = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters/trash/expired`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("Expired characters (>5 hari):", data);

      fetchTrash();
    } catch (err) {
      console.error("Failed to fetch expired trash characters:", err);
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

      if (!res.ok) {
        throw new Error(data.error || "Failed to move character to restore");
      }

      fetchTrash();
      alert(`"${name}" has been restore.`);
    } catch (err) {
      console.error(err);
      alert(`Failed to move "${name}" restore.`);
    }
  };

  if (characters.length === 0) {
    return <p className="text-gray-400 text-center">Trash bin is empty.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {characters.map((char) => (
        <CharacterCard
          key={char.uuid}
          char={char}
          isTrash={true}
          onRestore={(id) => handleRestore(char.id, char.name)}
        />
      ))}
    </div>
  );
}
