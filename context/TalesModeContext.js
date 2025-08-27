"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const TalesModeContext = createContext();

export function TalesModeProvider({ children }) {
  const [talesMode, setTalesMode] = useState(Cookies.get("ignite-tales-mode") === "true");

  useEffect(() => {
    Cookies.set("ignite-tales-mode", talesMode ? "true" : "false", { expires: 365 });
    window.localStorage.setItem("ignite-tales-mode", talesMode ? "true" : "false");
  }, [talesMode]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ignite-tales-mode") {
        const cookieValue = Cookies.get("ignite-tales-mode");
        setTalesMode(cookieValue === "true");
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const cookieValue = Cookies.get("ignite-tales-mode");
      setTalesMode((prev) => (cookieValue === "true" ? true : cookieValue === "false" ? false : prev));
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <TalesModeContext.Provider value={{ talesMode, setTalesMode }}>
      {children}
    </TalesModeContext.Provider>
  );
}

export function useTalesMode() {
  return useContext(TalesModeContext);
}