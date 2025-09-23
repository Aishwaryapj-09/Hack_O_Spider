import React, { useEffect, useState } from "react";
import tips from "../data/tips.json";

export default function EcoTips() {
  const [tip, setTip] = useState("");

  useEffect(() => {
    if (tips?.length) setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  if (!tip) return null;

  return (
    <div className="card" style={{ padding: 16, maxWidth: 360 }}>
      <h4 style={{ margin: 0 }}>Eco Tip</h4>
      <p style={{ marginTop: 8 }}>{tip}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn ghost" onClick={() => setTip(tips[Math.floor(Math.random() * tips.length)])}>
          Another tip
        </button>
      </div>
    </div>
  );
}
