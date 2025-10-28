"use client";

import { useState, useRef, useEffect } from "react";
import {
  useUser,
  useClerk,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import Cookies from "js-cookie";
import { CircleUserRound } from "lucide-react";
import ProfileModal from "./ProfileModal";

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [talesMode, setTalesMode] = useState(false);
  const [localMode, setLocalMode] = useState(false);
  const [showThemeColors, setShowThemeColors] = useState(false);
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [colors, setColors] = useState({});
  const [userData, setUserData] = useState(null);
  const menuRef = useRef(null);
  const { user } = useUser();
  const { signOut } = useClerk();
  const localPassword = process.env.NEXT_PUBLIC_LOCAL_MODE_PASSWORD;

  // ✅ Logout: hapus cookie di server
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
        method: "POST",
        credentials: "include", // ⬅️ penting agar cookie bisa dihapus
      });

      // sign out dari Clerk lalu redirect ke home
      await signOut(() => {
        window.location.href = "/";
      });
    } catch (err) {
      console.error("💥 Logout failed:", err);
    }
  };

  // ✅ Login sync ke backend (buat cookie)
  useEffect(() => {
    const syncAndFetchUser = async () => {
      if (!user) return;

      try {
        // 🔥 login ke backend: cookie akan otomatis diset
        const loginRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              username: user.username || user.fullName || "",
            }),
            credentials: "include", // ⬅️ penting untuk simpan cookie httpOnly
          }
        );

        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.error || "Login failed");

        // 🔎 Ambil data user dari backend menggunakan cookie
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
          { credentials: "include" } // ⬅️ cookie dikirim otomatis
        );

        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUserData(data.user);
      } catch (err) {
        console.error("❌ Error syncing/fetching user:", err.message);
      }
    };

    syncAndFetchUser();
  }, [user]);

  // ✅ Tutup menu kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Load color preferences
  useEffect(() => {
    setColors({
      sub1: Cookies.get("ignite-hyperlink-color-sub1") || "#3b82f6",
      sub2: Cookies.get("ignite-hyperlink-color-sub2") || "#10b981",
      bgTop: Cookies.get("ignite-bg-top-color") || "#1f2937",
      bgMiddle: Cookies.get("ignite-bg-middle-color") || "#1f1f1f",
      bgBottom: Cookies.get("ignite-bg-bottom-color") || "#111827",
    });
    setTalesMode(Cookies.get("ignite-tales-mode") === "true");
    setLocalMode(Cookies.get("ignite-local-mode") === "true");
  }, []);

  const applyCSSVariables = (obj) => {
    Object.entries(obj).forEach(([key, val]) => {
      let varName;
      if (key === "sub1" || key === "sub2") varName = `--hyperlink-${key}`;
      else if (key === "bgTop") varName = "--bg-top";
      else if (key === "bgMiddle") varName = "--bg-middle";
      else if (key === "bgBottom") varName = "--bg-bottom";
      document.documentElement.style.setProperty(varName, val);
    });
  };

  const handleColorChange = (e, key) => {
    const newColor = e.target.value;
    const updated = { ...colors, [key]: newColor };
    setColors(updated);
    const cookieKey =
      key === "bgMiddle"
        ? "ignite-bg-middle-color"
        : key === "bgTop"
        ? "ignite-bg-top-color"
        : key === "bgBottom"
        ? "ignite-bg-bottom-color"
        : `ignite-hyperlink-color-${key}`;
    Cookies.set(cookieKey, newColor, { expires: 365 });
    applyCSSVariables(updated);
  };

  const toggleTalesMode = () => {
    const newVal = !talesMode;
    setTalesMode(newVal);
    Cookies.set("ignite-tales-mode", newVal.toString(), { expires: 365 });
  };

  const toggleLocalMode = () => {
    const newVal = !localMode;
    if (newVal) {
      const input = prompt("Enter password to enable API Mode:");
      if (input !== localPassword) {
        alert("Incorrect password!");
        return;
      }
    }
    setLocalMode(newVal);
    Cookies.set("ignite-local-mode", newVal.toString(), { expires: 365 });
    window.location.reload();
  };

  const displayName =
    userData?.username?.trim() ||
    userData?.name?.trim() ||
    user?.primaryEmailAddress?.emailAddress ||
    "Unknown User";

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          className="text-gray-300 hover:text-white"
          aria-label="User Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <CircleUserRound size={28} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50 p-4 space-y-3 text-sm">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="block w-full text-left font-semibold text-gray-800 dark:text-gray-200 hover:underline">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                    {displayName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Sign Out
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowProfile(true);
                  }}
                  className="w-full text-left font-semibold text-gray-800 dark:text-gray-200 hover:underline"
                >
                  Profile
                </button>

                <hr className="my-2 border-gray-300 dark:border-gray-700" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-100 font-semibold">
                    Tales Mode
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={talesMode}
                      onChange={toggleTalesMode}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition"></div>
                    <div className="absolute left-0.5 top-0.5 bg-white h-5 w-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>

                <button
                  onClick={() => setShowOtherOptions(!showOtherOptions)}
                  className="w-full text-left font-semibold text-gray-800 dark:text-gray-200 hover:underline"
                >
                  {showOtherOptions ? "Back" : "Other Options"}
                </button>

                {showOtherOptions && (
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-100 font-semibold">
                        Discovery Vault
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={localMode}
                          onChange={toggleLocalMode}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-600 transition"></div>
                        <div className="absolute left-0.5 top-0.5 bg-white h-5 w-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </SignedIn>

            <hr className="my-2 border-gray-300 dark:border-gray-700" />

            <button
              onClick={() => setShowThemeColors(!showThemeColors)}
              className="w-full text-left font-semibold text-gray-800 dark:text-gray-200 hover:underline"
            >
              {showThemeColors ? "Back" : "Customize Background"}
            </button>

            {showThemeColors && (
              <div className="space-y-3 mt-2">
                {[
                  ["Hyperlink Sub1", "sub1"],
                  ["Hyperlink Sub2", "sub2"],
                  ["Background Top", "bgTop"],
                  ["Background Middle", "bgMiddle"],
                  ["Background Bottom", "bgBottom"],
                ].map(([label, key]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-100">
                      {label}
                    </span>
                    <input
                      type="color"
                      value={colors[key]}
                      onChange={(e) => handleColorChange(e, key)}
                      className="w-8 h-8 bg-transparent border-none cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ✅ Profile Modal */}
      {showProfile && userData && (
        <ProfileModal
          userData={userData}
          onClose={() => setShowProfile(false)}
          onSave={(updated) => setUserData(updated)}
        />
      )}
    </>
  );
}
