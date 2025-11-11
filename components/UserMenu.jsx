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
  const [patreonData, setPatreonData] = useState(null);

  const menuRef = useRef(null);
  const { user } = useUser();
  const { signOut } = useClerk();
  const localPassword = process.env.NEXT_PUBLIC_LOCAL_MODE_PASSWORD;

  // 🔹 Logout universal
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Logout failed");

      // Hapus semua data lokal
      Cookies.remove("ignite_access_token");
      Cookies.remove("ignite-tales-mode");
      Cookies.remove("ignite-local-mode");
      localStorage.removeItem("patreon_full_name");
      localStorage.removeItem("patreon_avatar");

      setPatreonData(null);
      setUserData(null);

      window.location.href = "/";
    } catch (err) {
      console.error("💥 Logout failed:", err);
    }
  };

  // 🔹 Cek login via cookie Patreon
  useEffect(() => {
    const checkPatreonLogin = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.user) setUserData(data.user);
      } catch (err) {
        console.error("❌ Error checking Patreon login:", err);
      }
    };

    checkPatreonLogin();
  }, []);

  // 🔹 Handle click outside menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Initialize color theme
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

  // 🔹 Fetch Patreon link (optional)
  useEffect(() => {
    if (!userData?.id) return;
    const fetchPatreonData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/patreon/user/${userData.id}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.full_name) setPatreonData(data);
      } catch (err) {
        console.error("❌ Failed to fetch Patreon data:", err);
      }
    };
    fetchPatreonData();
  }, [userData?.id]);

  // 🔹 Connect Patreon
  const handleConnectPatreon = () => {
    if (!userData?.id)
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/patreon/auth`;
    else
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/patreon/auth?user_id=${userData.id}`;
  };

  // 🔹 Disconnect local
  const handleDisconnectPatreon = () => {
    setPatreonData(null);
  };

  // 🔹 CSS color updates
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

  // 🔹 Mode toggles
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
    userData?.email ||
    "Unknown User";

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* Avatar */}
        <button
          className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-gray-500 hover:border-white transition"
          aria-label="User Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {userData?.profile_picture ? (
            <img
              src={
                userData.profile_picture.startsWith("http")
                  ? userData.profile_picture
                  : `${process.env.NEXT_PUBLIC_MEDIA_URL}${userData.profile_picture}`
              }
              alt="User avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-300">
              <CircleUserRound size={22} />
            </div>
          )}
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50 p-4 space-y-3 text-sm">
            {!userData ? (
              <>
                {/* Login Options */}
                <SignInButton mode="modal">
                  <button
                    className="block w-full text-left font-semibold text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60"
                    disabled
                  >
                    Login with Clerk
                  </button>
                </SignInButton>
                <button
                  onClick={handleConnectPatreon}
                  className="block w-full text-left font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                >
                  Connect Patreon
                </button>
              </>
            ) : (
              <>
                {/* Logged In Menu */}
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

                {/* Patreon Linked */}
                {/* {patreonData && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-500 font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="w-4 h-4 fill-[#ff9100]"
                      >
                        <path d="M554 217.8C553.9 152.4 503 98.8 443.3 79.5C369.1 55.5 271.3 59 200.4 92.4C114.6 132.9 87.6 221.7 86.6 310.2C85.8 383 93 574.6 201.2 576C281.5 577 293.5 473.5 330.7 423.7C357.1 388.2 391.2 378.2 433.1 367.8C505.1 350 554.2 293.1 554.1 217.8z" />
                      </svg>
                      <span className="text-gray-200">
                        {patreonData.full_name || "Patreon Linked"}
                      </span>
                    </div>
                    <button
                      onClick={handleDisconnectPatreon}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Disconnect
                    </button>
                  </div>
                )} */}

                {/* Profile */}
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

                {/* Tales Mode */}
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

                {/* Other Options */}
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
              </>
            )}

            <hr className="my-2 border-gray-300 dark:border-gray-700" />

            {/* Theme color section */}
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
