"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CharacterCard from "./CharacterCard";

export default function CharacterList({ username, searchTerm = "" }) {
  const router = useRouter();
  const [characters, setCharacters] = useState([]); // hanya yang active
  const [allCharacters, setAllCharacters] = useState([]); // semua, untuk slot
  const [characterLimit, setCharacterLimit] = useState(5);
  const [localMode, setLocalMode] = useState(false);

  // 🧩 Ambil karakter aktif (untuk ditampilkan)
  const fetchActiveChars = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters/user`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setCharacters(data);
    } catch (err) {
      console.error("❌ Failed to fetch active characters:", err);
    }
  }, []);

  // 🧩 Ambil semua karakter user (untuk slot count)
  const fetchAllChars = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters/user/all`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setAllCharacters(data);
    } catch (err) {
      console.error("❌ Failed to fetch all characters:", err);
    }
  }, []);

  // 💾 Ambil karakter lokal
  const fetchLocalChars = useCallback(async () => {
    try {
      const res = await fetch("/api/characters/getAll");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const filtered = data.filter((char) => char.creator_name === username);
      setCharacters(filtered);
      setAllCharacters(filtered);
    } catch (err) {
      console.error("Failed to fetch local characters:", err);
    }
  }, [username]);

  // 🧮 Ambil info user (character_limit)
  const fetchUserData = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      if (json?.user?.character_limit !== undefined) {
        setCharacterLimit(json.user.character_limit ?? 5);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  }, []);

  useEffect(() => {
    const modeFromCookie = Cookies.get("ignite-local-mode");
    const isLocalModeActive = modeFromCookie === "true";
    setLocalMode(isLocalModeActive);

    fetchUserData();

    if (isLocalModeActive) {
      if (username) fetchLocalChars();
    } else {
      fetchActiveChars();
      fetchAllChars(); // hitung semua karakter
    }
  }, [
    username,
    fetchLocalChars,
    fetchActiveChars,
    fetchAllChars,
    fetchUserData,
  ]);

  // ✏️ Edit karakter
  const handleEdit = (id) => router.push(`/characters-maker/edit/${id}`);

  // 🗑️ Move to trash
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
      if (!res.ok)
        throw new Error(data.error || "Failed to move character to trash");

      await fetchActiveChars();
      await fetchAllChars();
      alert(`"${name}" has been moved to trash.`);
    } catch (err) {
      console.error(err);
      alert(`Failed to move "${name}" to trash.`);
    }
  };

  // 🔍 Filter nama
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Hitung slot: semua karakter dihitung
  const usedSlots = allCharacters.length;
  const totalSlots = characterLimit ?? 5;
  const remainingSlots = Math.max(totalSlots - usedSlots, 0);

  return (
    <div className="flex flex-col items-center">
      {/* === Slot Info === */}
      <div className="flex flex-col items-center mb-6">
        <h3 className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">
          Character Slots ({usedSlots}/{totalSlots})
        </h3>
        <div className="flex gap-2 flex-wrap justify-center">
          {[...Array(totalSlots)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                i < usedSlots
                  ? "bg-emerald-600 border-emerald-600"
                  : "bg-transparent border-gray-400 dark:border-gray-600"
              }`}
              title={i < usedSlots ? "Used" : "Available"}
            />
          ))}
        </div>
        {remainingSlots <= 0 && (
          <p className="text-xs text-red-500 mt-2">
            You have reached your character limit.
          </p>
        )}
      </div>

      {/* === Character Cards (hanya active) === */}
      {filteredCharacters.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          {characters.length === 0
            ? "No characters created yet."
            : "No matching characters found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center">
          {filteredCharacters.map((char) => (
            <CharacterCard
              key={char.public_id}
              char={char}
              onEdit={() => handleEdit(char.private_id)}
              onView={() =>
                router.push(`/characters-maker/view/${char.private_id}`)
              }
              onDelete={() => handleDelete(char.id, char.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
