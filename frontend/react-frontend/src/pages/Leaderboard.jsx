import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call your backend API to fetch users
    fetch("http://localhost:5000/api/users") // adjust if your route is different
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2b8a3e" }}>🌍 Leaderboard</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <table
          style={{
            margin: "20px auto",
            borderCollapse: "collapse",
            width: "80%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ background: "#2b8a3e", color: "#fff" }}>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Rank</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.points - a.points) // sort highest first
              .map((user, index) => (
                <tr key={user._id}>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {user.name}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {user.points}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
