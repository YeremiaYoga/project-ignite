"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CharacterCard from "./CharacterCard";

export default function CharacterList({ username }) {
  const router = useRouter();
  const [characters, setCharacters] = useState([]);
  const [localMode, setLocalMode] = useState(false);

  useEffect(() => {
    const mode = Cookies.get("ignite-local-mode");
    setLocalMode(mode);
  }, []);

  const fetchChars = async () => {
    try {
      let res;
      if (!localMode) {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/characters/user`,
          {
            credentials: "include",
          }
        );
      } else {
        res = await fetch("/api/characters/getAll");
      }

      const data = await res.json();

      if (localMode) {
        const filtered = data.filter((char) => char.creator_name === username);
        console.log(filtered);
        setCharacters(filtered);
      } else {
        setCharacters(data);
      }
    } catch (err) {
      console.error("Failed to fetch characters:", err);
    }
  };

  useEffect(() => {
    if (username) fetchChars();
  }, [username, localMode]);

  const handleEdit = (id) => router.push(`/characters-maker/edit/${id}`);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to move "${name}" to trash?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters/${id}/trash`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to move character to trash");
      }

      setCharacters((prev) => prev.filter((char) => char.uuid !== id));
      fetchChars();
      alert(`"${name}" has been moved to trash.`);
    } catch (err) {
      console.error(err);
      alert(`Failed to move "${name}" to trash.`);
    }
  };

  if (characters.length === 0) {
    return (
      <p className="text-gray-400 text-center">No characters created yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {characters.map((char) => (
        <CharacterCard
          key={char.uuid}
          char={char}
          onEdit={(id) => handleEdit(id)}
          onView={(id) => router.push(`/characters-maker/view/${id}`)}
          onDelete={() => handleDelete(char.id, char.name)}
        />
      ))}
    </div>
  );
}
