"use client";

import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import {
  CircleUserRound,
  UserPen,
  UsersRound,
  BookUser,
  Earth,
  HeartPlus,
  LogOut,
  Copy,
  Check,
} from "lucide-react";
import ProfileModal from "./ProfileModal";
import FriendListModal from "./FriendListModal"; // 🔹 NEW
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFriends, setShowFriends] = useState(false); // 🔹 NEW
  const [talesMode, setTalesMode] = useState(false);
  const [showThemeColors, setShowThemeColors] = useState(false);
  const [colors, setColors] = useState({});
  const [userData, setUserData] = useState(null);
  const [patreonData, setPatreonData] = useState(null);
  const [usePatreonAvatar, setUsePatreonAvatar] = useState(false);
  const [copied, setCopied] = useState(false);

  const menuRef = useRef(null);

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

      Cookies.remove("ignite_access_token");
      Cookies.remove("ignite-tales-mode");
      Cookies.remove("ignite-user-data");
      localStorage.removeItem("patreon_full_name");
      localStorage.removeItem("patreon_avatar");

      setPatreonData(null);
      setUserData(null);

      window.location.href = "/";
    } catch (err) {
      console.error("💥 Logout failed:", err);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          Cookies.remove("ignite-user-data");
          setUserData(null);
          return;
        }

        const data = await res.json();

        if (data?.user) {
          setUserData(data.user);

          const safeUser = {
            username: data.user.username,
            email: data.user.email,
            role: data.user.role,
            friend_code: data.user.friend_code,
            profile_picture: data.user.profile_picture,
          };

          Cookies.set("ignite-user-data", JSON.stringify(safeUser), {
            expires: 1,
            sameSite: "lax",
          });
        }
      } catch (err) {
        console.error("❌ Error checking login:", err);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setColors({
      sub1: Cookies.get("ignite-hyperlink-color-sub1") || "#3b82f6",
      sub2: Cookies.get("ignite-hyperlink-color-sub2") || "#10b981",
      bgTop: Cookies.get("ignite-bg-top-color") || "#1f2937",
      bgMiddle: Cookies.get("ignite-bg-middle-color") || "#1f1f1f",
      bgBottom: Cookies.get("ignite-bg-bottom-color") || "#111827",
    });

    setTalesMode(Cookies.get("ignite-tales-mode") === "true");
  }, []);

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

  const handleConnectPatreon = () => {
    if (!userData?.id)
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/patreon/auth`;
    else
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/patreon/auth?user_id=${userData.id}`;
  };

  const handleSupportPatreon = () => {
    window.open(
      "https://www.patreon.com/cw/heraldentertainment/membership",
      "_blank",
      "noopener,noreferrer"
    );
  };

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

  const toggleTalesMode = () => {
    const newVal = !talesMode;
    setTalesMode(newVal);
    Cookies.set("ignite-tales-mode", newVal.toString(), { expires: 365 });
  };

  const handleUsePatreonAvatar = async () => {
    try {
      if (!userData?.id) {
        console.warn("⚠️ No user id found");
        return;
      }

      let avatar = null;

      // Ambil dari patreonData dulu
      if (patreonData) {
        avatar =
          patreonData.avatar ||
          patreonData.image_url ||
          patreonData.avatar_url ||
          null;
      }

      // Fallback: localStorage
      if (!avatar && typeof window !== "undefined") {
        avatar = window.localStorage.getItem("patreon_avatar");
      }

      if (!avatar) {
        console.warn("⚠️ No Patreon avatar found.");
        return;
      }

      // 🔹 Sama seperti handleSave: PATCH /users/:id
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            profile_picture: avatar,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("❌ Failed to update avatar in DB:", errData);
        return;
      }

      const updated = await res.json();

      // Struktur sama kayak handleSave → updated.user
      const updatedUser = updated.user || updated;

      // Update state userData biar langsung ke-refresh di UI
      setUserData((prev) => ({
        ...prev,
        ...(updatedUser || {}),
        profile_picture: avatar,
      }));

      // Optional: kalau mau tetap pakai toggle ini
      setUsePatreonAvatar(true);
    } catch (err) {
      console.error("❌ Failed to use Patreon avatar:", err);
    }
  };

  const handleUseIgniteAvatar = () => {
    setUsePatreonAvatar(false);
  };

  const handleCopyFriendCode = async () => {
    if (!userData?.friend_code) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(userData.friend_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (err) {
      console.error("❌ Failed to copy friend code:", err);
    }
  };

  const displayName =
    (userData?.username && userData.username.trim()) ||
    (userData?.name && userData.name.trim()) ||
    userData?.email ||
    "Unknown User";

  let patreonAvatar = null;
  if (typeof window !== "undefined") {
    patreonAvatar =
      (patreonData &&
        (patreonData.avatar ||
          patreonData.image_url ||
          patreonData.avatar_url)) ||
      window.localStorage.getItem("patreon_avatar") ||
      null;
  }

  const effectiveAvatar =
    usePatreonAvatar && patreonAvatar
      ? patreonAvatar
      : userData?.profile_picture || null;

  const resolveAvatarSrc = (src) => {
    if (!src) return null;
    return src.startsWith("http")
      ? src
      : `${process.env.NEXT_PUBLIC_MEDIA_URL}${src}`;
  };

  const avatarSrc = resolveAvatarSrc(effectiveAvatar);

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* Avatar button kanan atas */}
        <button
          className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-gray-500 hover:border-white transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {avatarSrc ? (
            <img
              src={avatarSrc}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-300">
              <CircleUserRound size={22} />
            </div>
          )}
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-slate-900 text-gray-100 border border-slate-700 rounded-2xl shadow-xl z-50 p-4 space-y-4 text-sm">
            {/* ===== HEADER USER ===== */}
            {userData ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-600 flex items-center justify-center bg-slate-800">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CircleUserRound className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{displayName}</p>

                  {/* Friend Code di bawah nama */}
                  {userData?.friend_code && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[11px] text-slate-300 font-mono truncate">
                        {userData.friend_code}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyFriendCode}
                        className="p-0.5 rounded hover:bg-slate-800 transition flex items-center justify-center"
                        title={copied ? "Copied!" : "Copy friend code"}
                      >
                        {copied ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-300" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <CircleUserRound className="w-8 h-8" />
                <div>
                  <p className="font-semibold">Welcome</p>
                </div>
              </div>
            )}

            {/* ===== MENU UTAMA ===== */}
            {userData ? (
              <div className="space-y-1 pt-1">
                {/* 1. Profile */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowProfile(true);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 transition text-left"
                >
                  <UserPen className="w-4 h-4" />
                  <span>Profile</span>
                </button>

                {patreonAvatar && (
                  <div className="ml-7 flex gap-2 mt-0.5">
                    <button
                      onClick={handleUsePatreonAvatar}
                      className="text-[11px] text-orange-300 hover:text-orange-200 hover:underline"
                    >
                      Use Patreon Profile Picture
                    </button>
                  </div>
                )}

                {/* 🔹 Friends List → buka modal */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowFriends(true);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left hover:bg-slate-800 transition"
                >
                  <UsersRound className="w-4 h-4" />
                  <span>Friends</span>
                </button>

                <button
                  onClick={handleSupportPatreon}
                  className="w-full  px-3 py-2 rounded-lg  transition mt-1"
                >
                  <img
                    src="/assets/patreon_button.png"
                    alt="Patreon"
                    className="w-44 h-auto object-contain"
                  />
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/characters-maker");
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 transition text-left"
                >
                  <BookUser className="w-4 h-4" />
                  <span>Characters</span>
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left opacity-60 cursor-not-allowed"
                >
                  <Earth className="w-4 h-4" />
                  <span>Campaigns / Worlds</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left opacity-60 cursor-not-allowed"
                >
                  <HeartPlus className="w-4 h-4" />
                  <span>Support &amp; Legal</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg mt-1 text-left text-white hover:bg-red-600/80 hover:text-white transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleConnectPatreon}
                  className="w-full text-left font-semibold text-orange-400 hover:text-orange-300 hover:underline"
                >
                  Connect Patreon
                </button>
              </div>
            )}

            <hr className="border-slate-700" />

            {/* ===== TALES MODE + CUSTOMIZE BACKGROUND ===== */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-100 font-semibold">Tales Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={talesMode}
                    onChange={toggleTalesMode}
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer-checked:bg-blue-600 transition" />
                  <div className="absolute left-0.5 top-0.5 bg-white h-5 w-5 rounded-full transition-transform peer-checked:translate-x-5" />
                </label>
              </div>

              <button
                onClick={() => setShowThemeColors(!showThemeColors)}
                className="w-full text-left font-semibold text-gray-100 hover:underline"
              >
                {showThemeColors ? "Back" : "Customize Background"}
              </button>

              {showThemeColors && (
                <div className="space-y-3 mt-1">
                  {[
                    ["Hyperlink Sub1", "sub1"],
                    ["Hyperlink Sub2", "sub2"],
                    ["Background Top", "bgTop"],
                    ["Background Middle", "bgMiddle"],
                    ["Background Bottom", "bgBottom"],
                  ].map(([label, key]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-100 text-xs">{label}</span>
                      <input
                        type="color"
                        value={colors[key] || "#000000"}
                        onChange={(e) => handleColorChange(e, key)}
                        className="w-8 h-8 bg-transparent border-none cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showProfile && userData && (
        <ProfileModal
          userData={userData}
          onClose={() => setShowProfile(false)}
          onSave={(updated) => setUserData(updated)}
        />
      )}

      {/* 🔹 Friends Modal */}
      {showFriends && userData && (
        <FriendListModal
          userId={userData.id}
          friendCode={userData.friend_code}
          onClose={() => setShowFriends(false)}
        />
      )}
    </>
  );
}
