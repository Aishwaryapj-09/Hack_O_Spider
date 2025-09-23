import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function Achievements() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/stats/my")
      .then((res) => setStats(res))
      .catch((err) => console.error("Failed to load stats", err));
  }, []);

  if (!stats) return <div style={{ padding: 20 }}>Loading...</div>;

  const bar = (label, val, goal, color = "#2b8a3e") => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <strong>{label}</strong>
        <span>{val}/{goal}</span>
      </div>
      <div style={{ height: 10, background: "#e6efe8", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ width: `${Math.min(100, Math.round((val/goal)*100))}%`, height: "100%", background: color }} />
      </div>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Achievements & Progress</h2>
      {bar("Trees planted", stats.trees || 0, stats.treesGoal || 10)}
      {bar("Reusable bottles", stats.bottles || 0, stats.bottlesGoal || 20, "#1f6f31")}
      {bar("Electricity saves", stats.electricity || 0, stats.electricityGoal || 5, "#1160a8")}
    </div>
  );
}
