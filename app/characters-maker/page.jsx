"use client";

import { useUser, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CharacterList from "./CharacterList";
import CharacterTrashList from "./CharacterTrashList";
import { Trash2, List, Search } from "lucide-react";

export default function CharactersMakerPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const username = user?.username || user?.fullName || user?.email;

  const [viewTrash, setViewTrash] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreate = () => router.push("/characters-maker/create");
  const toggleView = () => setViewTrash((prev) => !prev);

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
      {/* HEADER */}
      {viewTrash ? (
        <h1 className="text-3xl font-bold mb-6 text-center">Trash Bin</h1>
      ) : (
        <h1 className="text-3xl font-bold mb-6 text-center">
          Characters Maker
        </h1>
      )}

      {/* ACTION BAR */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        {/* Search bar */}
        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md px-3 py-2 w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent flex-1 outline-none text-sm placeholder-gray-400 text-white"
          />
        </div>

        <div className="flex items-center gap-3">
          {!viewTrash && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
            >
              Create Character
            </button>
          )}

          <button
            onClick={toggleView}
            className={`p-2 rounded shadow flex items-center justify-center ${
              viewTrash
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {viewTrash ? <List size={20} /> : <Trash2 size={20} />}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {viewTrash ? (
        <CharacterTrashList searchTerm={searchTerm} />
      ) : (
        <CharacterList username={username} searchTerm={searchTerm} />
      )}
    </main>
  );
}
