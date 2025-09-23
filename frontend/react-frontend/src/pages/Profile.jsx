// src/pages/Profile.jsx
import React, { useState } from "react";

export default function Profile() {
  const storedUser = localStorage.getItem("sa_user");
  const storedToken = localStorage.getItem("sa_token");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = storedToken || null;

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const [debug, setDebug] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveProfile() {
    setMsg("");
    setDebug(null);
    if (!user) { setMsg("You must be logged in"); return; }

    try {
      const res = await fetch("http://localhost:5000/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          userId: user.id, // send userId for the simple update route
          name: form.name,
          email: form.email,
          password: form.password
        })
      });

      const text = await res.text();
      let body;
      try { body = JSON.parse(text); } catch(e) { body = text; }

      setDebug({ status: res.status, body });

      if (!res.ok) {
        setMsg(`❌ Request failed (${res.status})`);
        return;
      }

      // success: update localStorage user if returned
      if (body?.user) {
        localStorage.setItem("sa_user", JSON.stringify(body.user));
        setMsg("✅ Profile updated");
      } else {
        setMsg("✅ Done (no user returned)");
      }
    } catch (err) {
      setMsg("❌ Request error");
      setDebug({ error: err.message });
    }
  }

  if (!user) {
    return <div style={{ padding: 20 }}>You need to login first.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>My Profile</h2>

      <div style={{ marginBottom: 10 }}>
        <label>Name</label><br />
        <input type="text" name="name" value={form.name} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Email</label><br />
        <input type="email" name="email" value={form.email} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>New Password</label><br />
        <input type="password" name="password" value={form.password} onChange={handleChange} />
      </div>

      <button className="btn" onClick={saveProfile}>Save Changes</button>

      {msg && <div style={{ marginTop: 10 }}>{msg}</div>}

      {/* Debug view — remove when fixed */}
      <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
        <div><strong>Debug</strong></div>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(debug, null, 2)}</pre>
      </div>
    </div>
  );
}
