import ProfileCard from "./ProfileCard";
import Clock from "./Clock";

export default function RightSidebar({ user, onLogout }) {
  return (
    <aside className="sidebar">
      <ProfileCard user={user} onLogout={onLogout} />
      <Clock />
    </aside>
  );
}