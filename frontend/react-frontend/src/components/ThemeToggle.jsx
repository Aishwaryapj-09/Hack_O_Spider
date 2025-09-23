// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";

const LIGHT = "light";
const DARK = "dark";
const KEY = "sa_theme_pref";

function applyTheme(theme) {
  if (theme === DARK) {
    document.documentElement.setAttribute("data-theme", DARK);
    document.documentElement.style.setProperty("--bg", "#0f1724");
    document.documentElement.style.setProperty("--card", "#0b1220");
    document.documentElement.style.setProperty("--text", "#e6f0ea");
    document.documentElement.style.setProperty("--muted", "#9aa6a0");
    document.documentElement.style.setProperty("--accent", "#2ea24a");
  } else {
    document.documentElement.setAttribute("data-theme", LIGHT);
    document.documentElement.style.setProperty("--bg", "#f6fbf7");
    document.documentElement.style.setProperty("--card", "#ffffff");
    document.documentElement.style.setProperty("--text", "#0b2a18");
    document.documentElement.style.setProperty("--muted", "#6b7a6e");
    document.documentElement.style.setProperty("--accent", "#2ea24a");
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === DARK || saved === LIGHT) return saved;
    } catch (e) {}
    // default to light
    return LIGHT;
  });

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }, [theme]);

  return (
    <button
      aria-pressed={theme === DARK}
      onClick={() => setTheme(t => (t === DARK ? LIGHT : DARK))}
      className="btn ghost"
      title={theme === DARK ? "Switch to light theme" : "Switch to dark theme"}
      style={{ marginLeft: 12 }}
    >
      {theme === DARK ? "Light" : "Dark"}
    </button>
  );
}
