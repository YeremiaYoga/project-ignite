"use client";

import { useState, useRef, useEffect } from "react";
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
  const localPassword = process.env.NEXT_PUBLIC_LOCAL_MODE_PASSWORD;

  // 🔹 Universal Logout
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

      // Bersihkan data lokal
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

  // 🔹 Cek login backend (cookie access_token)
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          credentials: "include",
        });
        if (!res.ok) return;

        const data = await res.json();
        if (data?.user) setUserData(data.user);
      } catch (err) {
        console.error("❌ Error checking login:", err);
      }
    };

    checkLogin();
  }, []);

  // 🔹 Close menu on click outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 🔹 Theme init
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

  // 🔹 Fetch Patreon data
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
        console.error("❌ Failed to fetch Patreon:", err);
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

  // 🔹 Disconnect local patreon view
  const handleDisconnectPatreon = () => {
    setPatreonData(null);
  };

  // 🔹 CSS Color updates
  const applyCSSVariables = (obj) => {
    Object.entries(obj).forEach(([key, val]) => {
      let varName =
        key === "sub1" || key === "sub2"
          ? `--hyperlink-${key}`
          : key === "bgTop"
          ? "--bg-top"
          : key === "bgMiddle"
          ? "--bg-middle"
          : "--bg-bottom";

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

  // 🔹 Tales Mode
  const toggleTalesMode = () => {
    const newVal = !talesMode;
    setTalesMode(newVal);
    Cookies.set("ignite-tales-mode", newVal.toString(), { expires: 365 });
  };

  // 🔹 Discovery Vault (local mode)
  const toggleLocalMode = () => {
    const newVal = !localMode;
    if (newVal) {
      const input = prompt("Enter password:");
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
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {userData?.profile_picture ? (
            <img
              src={
                userData.profile_picture.startsWith("http")
                  ? userData.profile_picture
                  : `${process.env.NEXT_PUBLIC_MEDIA_URL}${userData.profile_picture}`
              }
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-300">
              <CircleUserRound size={22} />
            </div>
          )}
        </button>

        {/* MENU */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50 p-4 space-y-3 text-sm">

            {!userData ? (
              <>
                <button
                  onClick={handleConnectPatreon}
                  className="block w-full text-left font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                >
                  Connect Patreon
                </button>
              </>
            ) : (
              <>
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
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition"></div>
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
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-600 transition"></div>
                        <div className="absolute left-0.5 top-0.5 bg-white h-5 w-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                )}
              </>
            )}

            <hr className="my-2 border-gray-300 dark:border-gray-700" />

            {/* Theme section */}
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

      {/* Profile Modal */}
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
