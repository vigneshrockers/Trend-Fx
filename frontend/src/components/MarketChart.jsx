<<<<<<< HEAD
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MarketChart({ candles }) {
  const data = (candles || []).map((c) => ({
    time: new Date(c.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    close: Number(c.close),
  }));

  return (
    <div className="card" style={{ height: 360 }}>
      <div className="cardTitle">Forex Price Chart (Close)</div>
      <div style={{ height: 300, marginTop: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" hide />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="close" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
=======
import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function MarketChart({ candles }) {
  const data = (candles || []).map((c) => ({
    time: formatX(c.timestamp),
    close: Number(c.close),
  }));

  if (!data.length) return <div className="small">No candle data.</div>;

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fill: "#a7b0c0" }} />
          <YAxis tick={{ fill: "#a7b0c0" }} domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="close" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function formatX(ts) {
  try {
    const d = new Date(ts);
    if (!Number.isNaN(d.getTime())) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch { /* empty */ }
  return "";
>>>>>>> c89c4f0 (Added Live Price Traking using API)
}