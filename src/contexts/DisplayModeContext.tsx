
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

type DisplayMode = "easy-read" | "high-contrast";

interface DisplayModeContextProps {
  displayMode: DisplayMode;
  toggleDisplayMode: () => void;
}

const DisplayModeContext = createContext<DisplayModeContextProps | undefined>(undefined);

export const DisplayModeProvider = ({ children }: { children: ReactNode }) => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("displayMode");
      if (saved === "high-contrast") return "high-contrast";
    }
    return "easy-read";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("easy-read-bg", "high-contrast-bg");
      document.body.classList.add(
        displayMode === "high-contrast" ? "high-contrast-bg" : "easy-read-bg"
      );

      // Add additional styles for different display modes
      if (displayMode === "high-contrast") {
        document.documentElement.style.setProperty('--background-color', '#1A1F2C');
        document.documentElement.style.setProperty('--text-color', '#FFFFFF');
      } else {
        document.documentElement.style.setProperty('--background-color', '#F1F0FB');
        document.documentElement.style.setProperty('--text-color', '#333333');
      }
    }
    if (typeof window !== "undefined")
      localStorage.setItem("displayMode", displayMode);
  }, [displayMode]);

  const toggleDisplayMode = () => {
    setDisplayMode((prev) => (prev === "easy-read" ? "high-contrast" : "easy-read"));
  };

  return (
    <DisplayModeContext.Provider value={{ displayMode, toggleDisplayMode }}>
      {children}
    </DisplayModeContext.Provider>
  );
};

export const useDisplayMode = () => {
  const ctx = useContext(DisplayModeContext);
  if (!ctx) throw new Error("useDisplayMode must be used within DisplayModeProvider");
  return ctx;
};
