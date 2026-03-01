import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card">
      <div className="cardTitle">Current Time</div>
      <div className="clockTime">{now.toLocaleTimeString()}</div>
      <div className="muted">{Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
    </div>
  );
}