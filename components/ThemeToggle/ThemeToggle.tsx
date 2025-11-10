"use client";

import { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="themebutton">
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};
