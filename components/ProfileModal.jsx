"use client";

import { useState } from "react";
import ImagePicker from "@/components/ImagePicker"; // ✅ pastikan kamu punya komponen ini

export default function ProfileModal({ userData, onClose, onSave }) {
  const [username, setUsername] = useState(userData?.username || "");
  const [profilePicture, setProfilePicture] = useState(
    userData?.profile_picture || ""
  );
  const [saving, setSaving] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleSave = async () => {
    if (!username.trim()) {
      alert("Username cannot be empty!");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, profile_picture: profilePicture }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save user data.");
      }

      const updated = await res.json();
      onSave(updated.user);
      onClose();
    } catch (err) {
      console.error("❌ handleSave error:", err);
      alert("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4">
        <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-lg p-6 space-y-5 relative">
          <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-3">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              User Profile
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 font-bold text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center space-y-2 mt-3">
            <img
              src={
                profilePicture ||
                `${process.env.NEXT_PUBLIC_MEDIA_URL}/profile_picture/Candle.webp`
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
            />
            <button
              onClick={() => setShowImagePicker(true)} // ✅ benar
              className="text-sm px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Change Picture
            </button>
          </div>

          <div className="space-y-3 text-gray-700 dark:text-gray-200">
            <ProfileRow label="Name" value={userData.name} />
            <ProfileRow label="Email" value={userData.email} />

            <div className="flex flex-col">
              <label className="text-sm font-semibold">Username</label>
              <input
                type="text"
                className="bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Set username"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-300 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {showImagePicker && (
        <ImagePicker
          isOpen={showImagePicker}
          baseUrl={`${process.env.NEXT_PUBLIC_MEDIA_URL}/profile/list`}
          title="Select Profile Picture"
          onSelect={(url) => {
            setProfilePicture(url);
            setShowImagePicker(false);
          }}
          onClose={() => setShowImagePicker(false)}
        />
      )}
    </>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-sm bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2 mt-1 break-all">
        {value || "-"}
      </p>
    </div>
  );
}
