"use client";
import { useEffect } from "react";

export default function BackgroundProvider({ children }) {
  useEffect(() => {

    const cookies = Object.fromEntries(
      document.cookie.split("; ").map((c) => c.split("="))
    );

    const top = cookies["ignite-bg-top-color"] || "#006aff";
    const middle = cookies["ignite-bg-middle-color"] || "#f1f1a1";
    const bottom = cookies["ignite-bg-bottom-color"] || "#0438a9";
    document.documentElement.style.setProperty("--bg-top", top);
    document.documentElement.style.setProperty("--bg-middle", middle);
    document.documentElement.style.setProperty("--bg-bottom", bottom);
  }, []);

  return <>{children}</>;
}
