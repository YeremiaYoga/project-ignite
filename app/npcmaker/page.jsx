"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, SignedOut, SignInButton } from "@clerk/nextjs";

export default function NPCMakerPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const [npcs, setNpcs] = useState([]);

  const handleCreate = () => {
    router.push("/npcmaker/create");
  };

  const handleEdit = (id) => {
    router.push(`/npcmaker/edit/${id}`);
  };

  if (!isSignedIn) {
    return (
      <main className="max-w-6xl w-full mx-auto px-4 py-8 text-white bg-gray-900 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">NPC Maker</h1>
        <p className="text-gray-400 mb-4">
          ⚠️ You must be logged in to access the NPC Maker.
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
    <main className="max-w-6xl w-full mx-auto px-4 py-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">NPC Maker</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
        >
          Create NPC
        </button>
      </div>

 
      {npcs.length === 0 ? (
        <p className="text-gray-400 text-center">No NPCs created yet.</p>
      ) : (
        <ul className="space-y-2">
          {npcs.map((npc, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center p-3 bg-gray-800 rounded"
            >
              <span>{npc.name}</span>
              <button
                onClick={() => handleEdit(idx)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
