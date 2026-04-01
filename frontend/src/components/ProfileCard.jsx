<<<<<<< HEAD
export default function ProfileCard({ user, onLogout }) {
  return (
    <div className="card">
      <div className="cardTitle">My Profile</div>

      <div className="profileRow">
        <div className="avatar">{user?.name?.slice(0, 1)?.toUpperCase() || "U"}</div>
        <div>
          <div className="profileName">{user?.name || "Demo User"}</div>
          <div className="muted">{user?.email || "demo@trendfx.com"}</div>
        </div>
      </div>

      <button className="btn btnGhost" onClick={onLogout} style={{ marginTop: 12 }}>
        Logout
      </button>
=======
import React from "react";

export default function ProfileCard({ user }) {
  return (
    <div>
      <div className="section-title">My Profile</div>
      <div className="list-item">
        <div style={{ fontWeight: 900, fontSize: 16 }}>
          {user?.full_name || user?.name || "Loading..."}
        </div>
        <div className="small">{user?.email || "-"}</div>
      </div>
>>>>>>> c89c4f0 (Added Live Price Traking using API)
    </div>
  );
}