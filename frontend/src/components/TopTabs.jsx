<<<<<<< HEAD
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
=======
import React from "react";

const TABS = ["Market", "News", "Market Timings"];

export default function TopTabs({ active, onChange }) {
  return (
    <div className="tabs">
      {TABS.map((t) => (
        <div
          key={t}
          className={`tab ${active === t ? "active" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </div>
>>>>>>> c89c4f0 (Added Live Price Traking using API)
      ))}
    </div>
  );
}