"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CharacterCard from "./CharacterCard";

export default function CharacterList({ username }) {
  const router = useRouter();
  const [characters, setCharacters] = useState([]);
  const [localMode, setLocalMode] = useState(false);

  const fetchRemoteChars = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters/user`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setCharacters(data);
    } catch (err) {
      console.error("Failed to fetch remote characters:", err);
    }
  }, [setCharacters]);

  const fetchLocalChars = useCallback(async () => {
    try {
      const res = await fetch("/api/characters/getAll");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const filtered = data.filter((char) => char.creator_name === username);
      console.log(filtered);
      setCharacters(filtered);
    } catch (err) {
      console.error("Failed to fetch local characters:", err);
    }
  }, [setCharacters, username]);


  useEffect(() => {
    const modeFromCookie = Cookies.get("ignite-local-mode");

    setLocalMode(modeFromCookie); 

    const isLocalModeActive = modeFromCookie === "true";

    if (isLocalModeActive) {
      if (username) {
        fetchLocalChars();
      }
    } else {
      fetchRemoteChars();
    }

    console.log(
      `Username: ${username}, Local Mode Active: ${isLocalModeActive}`
    );

  }, [username, setLocalMode, fetchLocalChars, fetchRemoteChars]);


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
