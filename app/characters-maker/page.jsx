"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, SignedOut, SignInButton } from "@clerk/nextjs";
import CharacterCard from "./CharacterCard";
import Cookies from "js-cookie";

export default function CharactersMakerPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [characters, setCharacters] = useState([]);
  const [apiMode, setApiMode] = useState(false);
  const username = user?.username || user?.fullName || user?.email;
  useEffect(() => {
    const mode = Cookies.get("ignite-api-mode");
    setApiMode(mode === "true");
  }, []);
  useEffect(() => {
    const fetchChars = async () => {
      try {
        let res;
        if (apiMode) {
          res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/characters/user`,
            { credentials: "include" }
          );
        } else {
          res = await fetch("/api/characters/getAll");
        }

        const data = await res.json();

        console.log(data);
        if (!apiMode) {
          const filtered = data.filter(
            (char) => char.creator_name === username
          );
          setCharacters(filtered);
        } else {
          setCharacters(data);
        }
      } catch (err) {
        console.error("Failed to fetch characters:", err);
      }
    };

    if (username) {
      fetchChars();
    }
  }, [username, apiMode]);

  const handleCreate = () => router.push("/characters-maker/create");
  const handleEdit = (id) => router.push(`/characters-maker/edit/${id}`);

  if (!isSignedIn) {
    return (
      <main className="max-w-6xl w-full mx-auto px-4 py-8 text-white bg-gray-900 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Characters Maker</h1>
        <p className="text-gray-400 mb-4">
          You must be logged in to access the Characters Maker.
        </p>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded shadow">
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </main>
    );
  }

  return (
    <main className="max-w-7xl w-full mx-auto px-4 py-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Characters Maker</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
        >
          Create Character
        </button>
      </div>

      {characters.length === 0 ? (
        <p className="text-gray-400 text-center">No characters created yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {characters.map((char) => (
            <CharacterCard
              key={char.uuid}
              char={char}
              onEdit={(id) => handleEdit(id)}
              onView={(id) => router.push(`/characters-maker/view/${id}`)}
              onDelete={(id) => console.log("Delete character", id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
