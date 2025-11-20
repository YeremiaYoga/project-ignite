"use client";

import { useEffect, useState } from "react";
import {
  X,
  UserPlus,
  ShieldBan,
  Trash2,
  Users,
  Copy,
  Check,
  ThumbsUp,
  XCircle,
  Clock,
  Unlock,
} from "lucide-react";

const API_BASE =
  (typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "")) ||
  "";

const MEDIA_BASE =
  (typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_MEDIA_URL || "").replace(/\/$/, "")) ||
  "";

const resolveAvatar = (src) => {
  if (!src) return null;
  return src.startsWith("http") ? src : `${MEDIA_BASE}${src}`;
};

export default function FriendListModal({ userId, friendCode, onClose }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const [copySelf, setCopySelf] = useState(false);

  // Friend Requests
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestError, setRequestError] = useState("");

  // Blocked users
  const [blockedFriends, setBlockedFriends] = useState([]);
  const [loadingBlocked, setLoadingBlocked] = useState(false);
  const [blockedError, setBlockedError] = useState("");

  useEffect(() => {
    if (!userId) return;
    fetchFriends();
    fetchRequests();
    fetchBlockedFriends();
  }, [userId]);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/friends`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to fetch friends (${res.status})`);
      const data = await res.json();

      const flat = (data.friends || []).map((f) => ({
        friendshipId: f.friendship_id,
        userId: f.friend?.id,
        // username first, fallback to name, then email
        name:
          f.friend?.username || f.friend?.name || f.friend?.email || "Unknown",
        email: f.friend?.email || null,
        username: f.friend?.username || null,
        friendCode: f.friend?.friend_code || null,
        profilePicture: f.friend?.profile_picture || null,
        createdAt: f.created_at,
        status: "accepted",
      }));

      setFriends(flat);
    } catch (err) {
      console.error("❌ Failed to fetch friends:", err);
      setError("Failed to load friends. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      setRequestError("");
      const res = await fetch(`${API_BASE}/friends/requests`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch requests (${res.status})`);
      }
      const data = await res.json();

      const normalize = (arr = []) =>
        arr.map((r) => ({
          friendshipId: r.friendship_id,
          requesterId: r.requester_id,
          userId: r.friend_user?.id,
          // username first
          name:
            r.friend_user?.username ||
            r.friend_user?.name ||
            r.friend_user?.friend_code ||
            "Unknown",
          friendCode: r.friend_user?.friend_code || null,
          username:
            r.friend_user?.username || r.friend_user?.friend_code || "Unknown",
          profilePicture: r.friend_user?.profile_picture || null,
          createdAt: r.created_at,
        }));

      setIncoming(normalize(data.incoming));
      setOutgoing(normalize(data.outgoing));
      console.log(data);
    } catch (err) {
      console.error("❌ Failed to fetch friend requests:", err);
      setRequestError("Failed to load friend requests.");
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchBlockedFriends = async () => {
    try {
      setLoadingBlocked(true);
      setBlockedError("");
      const res = await fetch(`${API_BASE}/friends/blocked`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch blocked (${res.status})`);
      }
      const data = await res.json();

      const flat = (data.blocked || []).map((f) => ({
        friendshipId: f.friendship_id,
        userId: f.friend?.id,
        // username first
        name:
          f.friend?.username || f.friend?.name || f.friend?.email || "Unknown",
        email: f.friend?.email || null,
        username: f.friend?.username || null,
        friendCode: f.friend?.friend_code || null,
        profilePicture: f.friend?.profile_picture || null,
        createdAt: f.created_at,
      }));

      setBlockedFriends(flat);
    } catch (err) {
      console.error("❌ Failed to fetch blocked friends:", err);
      setBlockedError("Failed to load blocked users.");
    } finally {
      setLoadingBlocked(false);
    }
  };

  const handleAddFriend = async () => {
    if (!inputCode.trim()) return;
    try {
      setAdding(true);
      setError("");
      const res = await fetch(`${API_BASE}/friends/add-by-code`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friend_code: inputCode.trim(),
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to send friend request");
      }
      setInputCode("");
      await fetchRequests();
    } catch (err) {
      console.error("❌ Failed to add friend:", err);
      setError(err.message || "Failed to add friend.");
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (friend) => {
    if (!friend?.userId) return;

    try {
      const ok = confirm(`Remove ${friend.name || "this friend"}?`);
      if (!ok) return;

      const res = await fetch(`${API_BASE}/friends/${friend.userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to remove friend");

      setFriends((prev) => prev.filter((f) => f.userId !== friend.userId));
    } catch (err) {
      console.error("❌ Failed to remove friend:", err);
      alert("Failed to remove friend.");
    }
  };

  const handleBlock = async (friend) => {
    if (!friend?.userId) return;

    try {
      const ok = confirm(
        `Block ${
          friend.name || "this friend"
        }?\nThey won't be able to interact with you.`
      );
      if (!ok) return;

      const res = await fetch(`${API_BASE}/friends/block`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_user_id: friend.userId,
        }),
      });
      if (!res.ok) throw new Error("Failed to block user");

      await Promise.all([fetchFriends(), fetchBlockedFriends()]);
    } catch (err) {
      console.error("❌ Failed to block friend:", err);
      alert("Failed to block friend.");
    }
  };

  const handleUnblock = async (friend) => {
    if (!friend?.friendshipId) return;

    try {
      const ok = confirm(
        `Unblock ${
          friend.name || "this user"
        }?\nThey will be your friend again.`
      );
      if (!ok) return;

      const res = await fetch(`${API_BASE}/friends/unblock`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendship_id: friend.friendshipId,
        }),
      });
      if (!res.ok) throw new Error("Failed to unblock user");

      await Promise.all([fetchBlockedFriends(), fetchFriends()]);
    } catch (err) {
      console.error("❌ Failed to unblock friend:", err);
      alert("Failed to unblock user.");
    }
  };

  const handleRespondRequest = async (reqItem, action) => {
    try {
      const res = await fetch(`${API_BASE}/friends/respond`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendship_id: reqItem.friendshipId,
          action,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to respond request");
      }

      setIncoming((prev) =>
        prev.filter((r) => r.friendshipId !== reqItem.friendshipId)
      );

      if (action === "accept") {
        fetchFriends();
      }
    } catch (err) {
      console.error("❌ Failed to respond friend request:", err);
      alert(err.message || "Failed to respond friend request.");
    }
  };

  const handleCopySelfCode = async () => {
    if (!friendCode) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(friendCode);
        setCopySelf(true);
        setTimeout(() => setCopySelf(false), 1500);
      }
    } catch (err) {
      console.error("❌ Copy friend code failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-slate-900 text-gray-100 rounded-2xl shadow-2xl border border-slate-700 p-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-slate-800 border border-slate-700">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Friends</h2>
              <p className="text-xs text-slate-300">
                Add new friends or manage your existing list.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Your Friend Code */}
        <div className="mb-4 rounded-xl border border-slate-700 bg-slate-800/60 p-3">
          <p className="text-xs text-slate-300 mb-1">Your Friend Code</p>
          {friendCode ? (
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-sm truncate">{friendCode}</span>
              <button
                type="button"
                onClick={handleCopySelfCode}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-slate-700 hover:bg-slate-600"
              >
                {copySelf ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-400">
              No friend code assigned yet.
            </p>
          )}
        </div>

        {/* Add Friend */}
        <div className="mb-4 rounded-xl border border-slate-700 bg-slate-800/60 p-3">
          <p className="text-xs text-slate-300 mb-2">Add Friend</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter friend code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-sm text-gray-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddFriend}
              disabled={adding || !inputCode.trim()}
              className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <UserPlus className="w-4 h-4" />
              {adding ? "Adding..." : "Add"}
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        </div>

        {/* Friends List */}
        <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-700 bg-slate-800/40 p-2 mb-4">
          <div className="flex items-center justify-between mb-2 px-1">
            <p className="text-xs text-slate-300 uppercase tracking-wide">
              Friends
            </p>
            {loading && (
              <span className="text-[11px] text-slate-400">Loading...</span>
            )}
          </div>

          {!loading && friends.length === 0 && (
            <p className="text-xs text-slate-400 px-1 pb-1">
              You don&apos;t have any friends yet. Add someone using their
              friend code.
            </p>
          )}

          <div className="space-y-2">
            {friends.map((f) => (
              <div
                key={f.userId}
                className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg bg-slate-900/60 border border-slate-700"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-xs font-semibold border border-slate-600">
                    {f.profilePicture ? (
                      <img
                        src={resolveAvatar(f.profilePicture)}
                        className="w-full h-full object-cover"
                        alt="avatar"
                      />
                    ) : (
                      (f.name || "?").substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{f.username}</p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {f.friendCode || f.email || f.username || ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleBlock(f)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-700/80"
                    title="Block"
                  >
                    <ShieldBan className="w-4 h-4 text-red-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(f)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600/80"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4 text-red-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friend Requests */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
              Friend Requests
            </p>
            {loadingRequests && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Loading...
              </span>
            )}
          </div>

          {requestError && (
            <p className="text-xs text-red-400 mb-2">{requestError}</p>
          )}

          {/* Incoming */}
          <div className="mb-3">
            <p className="text-[11px] text-slate-300 mb-1">Incoming Requests</p>
            {incoming.length === 0 ? (
              <p className="text-[11px] text-slate-500">
                No incoming requests.
              </p>
            ) : (
              <div className="space-y-2">
                {incoming.map((r) => (
                  <div
                    key={r.friendshipId}
                    className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg bg-slate-900/70 border border-slate-700"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-xs font-semibold border border-slate-600">
                        {r.profilePicture ? (
                          <img
                            src={resolveAvatar(r.profilePicture)}
                            className="w-full h-full object-cover"
                            alt="avatar"
                          />
                        ) : (
                          (r.name || "?").substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">
                          {r.username}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {r.friendCode || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleRespondRequest(r, "accept")}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-emerald-600 hover:bg-emerald-500"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRespondRequest(r, "reject")}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-slate-700 hover:bg-red-600"
                      >
                        <XCircle className="w-3 h-3" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Outgoing */}
          <div>
            <p className="text-[11px] text-slate-300 mb-1">Outgoing Requests</p>
            {outgoing.length === 0 ? (
              <p className="text-[11px] text-slate-500">
                No outgoing requests.
              </p>
            ) : (
              <div className="space-y-2">
                {outgoing.map((r) => (
                  <div
                    key={r.friendshipId}
                    className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg bg-slate-900/70 border border-slate-700"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-xs font-semibold border border-slate-600">
                        {r.profilePicture ? (
                          <img
                            src={resolveAvatar(r.profilePicture)}
                            className="w-full h-full object-cover"
                            alt="avatar"
                          />
                        ) : (
                          (r.name || "?").substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">
                          {r.username}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {r.friendCode || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-300">
                      <Clock className="w-3 h-3" />
                      Pending
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Blocked Users */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
              Blocked Users
            </p>
            {loadingBlocked && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Loading...
              </span>
            )}
          </div>

          {blockedError && (
            <p className="text-xs text-red-400 mb-2">{blockedError}</p>
          )}

          {blockedFriends.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              You don&apos;t have any blocked users.
            </p>
          ) : (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {blockedFriends.map((b) => (
                <div
                  key={b.friendshipId}
                  className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg bg-slate-900/70 border border-red-700/60"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center text-xs font-semibold border border-red-500/70">
                      {b.profilePicture ? (
                        <img
                          src={resolveAvatar(b.profilePicture)}
                          className="w-full h-full object-cover"
                          alt="avatar"
                        />
                      ) : (
                        (b.name || "?").substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">
                        {b.username}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {b.friendCode || ""}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUnblock(b)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-slate-700 hover:bg-emerald-600"
                  >
                    <Unlock className="w-3 h-3" />
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
