import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import ARWorld from "./pages/ARWorld";
import Leaderboard from "./pages/Leaderboard";
import Achievements from "./pages/Achievements";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile"; // ✅ new page

// Widgets / Components
import EcoTips from "./components/EcoTips";
import DailyChallenge from "./components/DailyChallenge";
import GlobalImpact from "./components/GlobalImpact";
import ThemeToggle from "./components/ThemeToggle";

import "./index.css";

export default function App() {
  return (
    <div className="app">
      {/* --- Navigation Bar --- */}
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/achievements">Achievements</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/profile">Profile</Link> {/* ✅ added link */}
        <a href="/ar.html" target="_blank" rel="noreferrer">
          Open AR (new tab)
        </a>
        {/* Toggle dark/light theme */}
        <ThemeToggle />
      </nav>

      {/* --- Routes --- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ar" element={<ARWorld />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} /> {/* ✅ new route */}
        {/* Optional routes for widgets if you want them standalone */}
        <Route path="/tips" element={<EcoTips />} />
        <Route path="/challenge" element={<DailyChallenge />} />
        <Route path="/impact" element={<GlobalImpact />} />
      </Routes>
    </div>
  );
}
