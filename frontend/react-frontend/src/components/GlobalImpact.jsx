import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function GlobalImpact() {
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    api.get("/impact/totals")
      .then(setTotals)
      .catch((err) => console.error("Failed to load totals", err));
  }, []);

  if (!totals) return null;

  return (
    <div className="card" style={{ marginBottom: 12, padding: 16 }}>
      <h3>🌍 Global Impact</h3>
      <p style={{ fontSize: 14, color: "#555" }}>Together we are making a difference!</p>
      <div style={{ marginTop: 12 }}>
        <div>🌳 Trees planted: <strong>{totals.trees}</strong></div>
        <div>♻️ Bottles reused: <strong>{totals.bottles}</strong></div>
        <div>⚡ kWh saved: <strong>{totals.energy}</strong></div>
      </div>
    </div>
  );
}
