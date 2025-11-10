"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PatreonSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email");
    const linked = searchParams.get("linked");

    if (linked === "true" && email) {
      localStorage.setItem("patreon_email", email);
    }

    const timer = setTimeout(() => {
      router.push("/");
    }, 1200);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-3">Connecting your Patreon...</h1>
      <p className="text-gray-400 text-sm">Please wait a moment.</p>
    </div>
  );
}
