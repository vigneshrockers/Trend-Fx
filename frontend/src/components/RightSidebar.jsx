<<<<<<< HEAD
import ProfileCard from "./ProfileCard";
import Clock from "./Clock";

export default function RightSidebar({ user, onLogout }) {
  return (
    <aside className="sidebar">
      <ProfileCard user={user} onLogout={onLogout} />
      <Clock />
    </aside>
=======
import React from "react";
import ProfileCard from "./ProfileCard.jsx";
import Clock from "./Clock.jsx";

export default function RightSidebar({ user }) {
  return (
    <div className="card" style={{ height: "fit-content" }}>
      <ProfileCard user={user} />
      <div style={{ height: 12 }} />
      <Clock />
    </div>
>>>>>>> c89c4f0 (Added Live Price Traking using API)
  );
}