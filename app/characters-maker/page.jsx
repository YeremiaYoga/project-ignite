"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, SignedOut, SignInButton } from "@clerk/nextjs";
import { Copy } from "lucide-react";

export default function CharactersMakerPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const res = await fetch("/api/characters/getAll");
        const data = await res.json();
        setCharacters(data);
      } catch (err) {
        console.error("Failed to fetch characters:", err);
      }
    };
    fetchChars();
  }, []);

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
            <div
              key={char.randomid}
              className="flex  bg-gray-800 rounded shadow p-2"
            >
              <div className="flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
                  {char.token_art ? (
                    <img
                      src={char.token_art}
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="/assets/example_token.png"
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="ml-5">
                  <h2 className="text-xl font-bold">{char.name}</h2>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    {char.randomid ?? "UnknownID"}
                    <Copy
                      size={16}
                      className="cursor-pointer hover:text-white"
                      onClick={() =>
                        navigator.clipboard.writeText(char.randomid ?? "")
                      }
                    />
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="flex-1 px-3 py-2 bg-blue-600 rounded text-sm opacity-50 cursor-not-allowed "
                      disabled
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(char.randomid)}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 px-3 py-2 bg-red-600 rounded text-sm opacity-50 cursor-not-allowed "
                      disabled
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
