export default function TopTabs({ active, onChange }) {
  const tabs = ["Market", "News", "Market Timings"];

  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t}
          className={`tab ${active === t ? "tabActive" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}