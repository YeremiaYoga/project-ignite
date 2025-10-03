"use client";

import { useUser, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CharacterList from "./CharacterList";
import CharacterTrashList from "./CharacterTrashList";
import { Trash2, List } from "lucide-react";

export default function CharactersMakerPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const username = user?.username || user?.fullName || user?.email;

  const [viewTrash, setViewTrash] = useState(false); // false = active, true = trash

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
      {viewTrash ? (
        <h1 className="text-3xl font-bold mb-6 text-center">
          Trash Bin
        </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-6 text-center">
          Characters Maker
        </h1>
      )}

      <div className="flex justify-end mb-6 gap-4">
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
          className={`p-2 rounded shadow flex items-center justify-center 
    ${
      viewTrash
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-red-600 hover:bg-red-700"
    }`}
        >
          {viewTrash ? <List size={20} /> : <Trash2 size={20} />}
        </button>
      </div>

      {viewTrash ? (
        <CharacterTrashList />
      ) : (
        <CharacterList username={username} />
      )}
    </main>
  );
}
