<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> c89c4f0 (Added Live Price Traking using API)

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
<<<<<<< HEAD
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card">
      <div className="cardTitle">Current Time</div>
      <div className="clockTime">{now.toLocaleTimeString()}</div>
      <div className="muted">{Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
=======
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div>
      <div className="section-title">Current Time</div>
      <div className="list-item">
        <div style={{ fontWeight: 900, fontSize: 18 }}>
          {now.toLocaleTimeString()}
        </div>
        <div className="small">{now.toLocaleDateString()} • {tz}</div>
      </div>
>>>>>>> c89c4f0 (Added Live Price Traking using API)
    </div>
  );
}