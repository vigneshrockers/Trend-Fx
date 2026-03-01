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
    </div>
  );
}