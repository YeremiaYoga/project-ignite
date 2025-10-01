"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, SignedOut, SignInButton } from "@clerk/nextjs";
import { Copy } from "lucide-react";
import { IBM_Plex_Mono } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
});
export default function CharactersMakerPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [characters, setCharacters] = useState([]);
  const username = user?.username || user?.fullName || user?.email;

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const res = await fetch("/api/characters/getAll");
        const data = await res.json();

        const filtered = data.filter((char) => char.creator_name === username);

        setCharacters(filtered);
      } catch (err) {
        console.error("Failed to fetch characters:", err);
      }
    };

    if (username) {
      fetchChars();
    }
  }, [username]);

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
              key={char.uuid}
              className="relative bg-no-repeat bg-cover w-[350px] h-[220px] flex flex-col justify-between p-4"
              style={{
                backgroundImage: "url('/assets/character_image.png')",
              }}
            >
              {/* UUID + Copy */}
              <div className="absolute top-4 right-5 flex items-center gap-1 text-sm text-gray-700">
                <span className={`text-lg ${ibmPlexMono.className}`}>
                  {char.uuid ?? "UnknownID"}
                </span>
                <Copy
                  size={16}
                  className="cursor-pointer hover:text-gray-900"
                  onClick={() => navigator.clipboard.writeText(char.uuid ?? "")}
                />
              </div>

              {/* Token art */}
              <div className="absolute top-[27px] left-[11px] flex flex-col items-center w-[120px]">
                <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
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
              </div>

              {/* Nama */}
              <div className="absolute top-[110px] left-12">
                <h2 className="mt-2 text-center text-2xl font-bold text-gray-800 w-full">
                  {char.name}
                </h2>
              </div>

              <div
                className="absolute right-7 top-12"
                style={{
                  transform: `rotate(${char.rotation_stamp || 0}deg)`,
                }}
              >
                <img
                  src={
                    char.stamp_type % 2 === 1
                      ? "/assets/stamps/stamp_1.webp"
                      : "/assets/stamps/stamp_2.webp"
                  }
                  alt="Stamp"
                  className="w-10 h-auto"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-3 mt-auto mb-2">
                <button className="px-4 py-1 bg-blue-600 text-white rounded">
                  View
                </button>
                <button
                  onClick={() => handleEdit(char.randomid)}
                  className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button className="px-4 py-1 bg-red-600 text-white rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
