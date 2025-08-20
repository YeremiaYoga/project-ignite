"use client";
import { useEffect } from "react";

export default function BackgroundProvider({ children }) {
  useEffect(() => {

    const cookies = Object.fromEntries(
      document.cookie.split("; ").map((c) => c.split("="))
    );

    const top = cookies["ignite-bg-top-color"] || "#1f2937";
    const middle = cookies["ignite-bg-middle-color"] || "#1f1f1f";
    const bottom = cookies["ignite-bg-bottom-color"] || "#111827";
    document.documentElement.style.setProperty("--bg-top", top);
    document.documentElement.style.setProperty("--bg-middle", middle);
    document.documentElement.style.setProperty("--bg-bottom", bottom);
  }, []);

  return <>{children}</>;
}
