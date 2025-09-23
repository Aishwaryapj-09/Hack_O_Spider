import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    api.get("/challenge/today")
      .then(setChallenge)
      .catch(() => {});
  }, []);

  if (!challenge) return null;

  return (
    <div className="card" style={{ marginBottom: 12, padding: 12 }}>
      <h4>Daily Challenge</h4>
      <p style={{ marginTop: 6 }}>{challenge.text}</p>
      <small className="small">Bonus: {challenge.points} pts</small>
      <div style={{ marginTop: 8 }}>
        <button className="btn" onClick={() => {
          api.post("/challenge/complete").then(() => alert("Nice!")).catch(()=>alert("Failed"));
        }}>
          Mark Complete
        </button>
      </div>
    </div>
  );
}
