<<<<<<< Updated upstream
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopTabs from "../components/TopTabs";
import RightSidebar from "../components/RightSidebar";
import MarketChart from "../components/MarketChart";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import "../styles/dashboard.css";

const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;

export default function Dashboard() {
  const [pair, setPair] = useState("USD/JPY");
  const [chartData, setChartData] = useState([]);
  const [latestPrice, setLatestPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMarketData();
  }, [pair]);

  useEffect(() => {
    if (tab === "News") {
      (async () => {
        const n = await getLatestNews(pair, 10);
        setNews(n);
      })();
    }
  }, [tab, pair]);

  function handleLogout() {
=======

  const [activeTab, setActiveTab] = useState("Market");
  const [pair, setPair] = useState("EURUSD");

  const [user, setUser] = useState(null);

  const [live, setLive] = useState(null);
  const [candles, setCandles] = useState([]);
  const [news, setNews] = useState([]);

  const [loadingLive, setLoadingLive] = useState(false);
  const [loadingChart, setLoadingChart] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);

  const [err, setErr] = useState("");

  const timings = useMemo(() => getSessions(), []);

  useEffect(() => {
    (async () => {
      try {
        const u = await me();
        setUser(u);
      } catch {
        logout();
        nav("/login");
      }
    })();
  }, [nav]);

  useEffect(() => {
    if (activeTab !== "Market") return;

    let alive = true;

    async function loadMarket() {
      setErr("");
      setLoadingLive(true);
      setLoadingChart(true);

      try {
        const [l, c] = await Promise.all([
          getLive(pair),
          getCandles(pair, 120),
        ]);

        if (!alive) return;
        setLive(l);
        setCandles(c);
      } catch (e) {
        if (!alive) return;
        setErr(e.message || "Failed to load market data");
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        if (!alive) return;
        setLoadingLive(false);
        setLoadingChart(false);
      }
    }

    loadMarket();

    const t = setInterval(async () => {
      try {
        const l = await getLive(pair);
        if (alive) setLive(l);
      } catch {
        // ignore auto refresh errors
      }
    }, 5000);

    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [pair, activeTab]);

  useEffect(() => {
    if (activeTab !== "News") return;

    let alive = true;
    (async () => {
      setErr("");
      setLoadingNews(true);
      try {
        const items = await getLatestNews(pair, 10);
        if (alive) setNews(items);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load news");
      } finally {
        if (alive) setLoadingNews(false);
=======
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  Legend,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const [selectedPair, setSelectedPair] = useState("USD/INR");
  const [livePrice, setLivePrice] = useState("--");
  const [liveTime, setLiveTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState([]);

  const currencyPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "AUD/USD", "USD/INR"];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLiveTime(
        now.toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchMarketData();

    const interval = setInterval(() => {
      fetchMarketData();
    }, 15000);

    return () => clearInterval(interval);
  }, [selectedPair]);

  async function fetchMarketData() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:8000/market-data?symbol=${encodeURIComponent(selectedPair)}&interval=5min&outputsize=60`
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch market data");
>>>>>>> Stashed changes
      }
    })();

<<<<<<< Updated upstream
    return () => { alive = false; };
  }, [activeTab, pair]);

  function onLogout() {
>>>>>>> c89c4f0 (Added Live Price Traking using API)
    logout();
    nav("/login");
  }

  return (
<<<<<<< HEAD
    <div className="dashWrap dashBg">
      <div className="dashMain">
        <div className="dashHeader">
          <div>
            <div className="dashTitle">Trend-Fx Dashboard</div>
            <div className="muted">Market • News • Market Timings</div>
=======
      const cleaned = (data.data || []).filter(
        (item) =>
          item.price !== null &&
          item.price !== undefined
      );

      setChartData(cleaned);

      if (cleaned.length > 0) {
        setLivePrice(cleaned[cleaned.length - 1].price);
      } else {
        setLivePrice("--");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setChartData([]);
      setLivePrice("--");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    navigate("/logout");
  }

  const rsiData = useMemo(() => {
    return chartData.filter((item) => item.rsi !== null);
  }, [chartData]);

  const macdData = useMemo(() => {
    return chartData.filter(
      (item) =>
        item.macd !== null &&
        item.signal !== null &&
        item.histogram !== null
    );
  }, [chartData]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#081a4b",
        color: "white",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#0b1f5e",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0 }}>Live Forex Dashboard</h2>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="pair-select"
            style={{ fontWeight: "bold", marginRight: "10px" }}
          >
            Currency Pair:
          </label>

          <select
            id="pair-select"
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              minWidth: "220px",
            }}
          >
            {currencyPairs.map((pair) => (
              <option key={pair} value={pair}>
                {pair}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={cardStyle}>
            <p style={labelStyle}>Selected Pair</p>
            <h3 style={{ margin: 0 }}>{selectedPair}</h3>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>Live Price</p>
            <h1 style={{ margin: 0, fontSize: "40px" }}>
              {loading ? "Loading..." : livePrice}
            </h1>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>Live Time</p>
            <h3 style={{ margin: 0 }}>{liveTime}</h3>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "#7a1f1f",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            {error}
>>>>>>> Stashed changes
          </div>
        )}

        <h3 style={sectionTitle}>Price Chart</h3>
        <div style={chartBoxStyle}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#29407a" />
              <XAxis dataKey="time" stroke="#ffffff" />
              <YAxis stroke="#ffffff" domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#67a4ff"
                strokeWidth={2}
                dot={false}
                name="Close Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <h3 style={sectionTitle}>RSI Indicator</h3>
        <div style={chartBoxStyle}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={rsiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#29407a" />
              <XAxis dataKey="time" stroke="#ffffff" />
              <YAxis stroke="#ffffff" domain={[0, 100]} />
              <Tooltip />
              <ReferenceLine y={70} stroke="#ff6b6b" strokeDasharray="5 5" />
              <ReferenceLine y={30} stroke="#4cd964" strokeDasharray="5 5" />
              <Area
                type="monotone"
                dataKey="rsi"
                stroke="#d0b3ff"
                fill="#d0b3ff"
                fillOpacity={0.08}
                strokeWidth={2}
                dot={false}
                name="RSI"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <h3 style={sectionTitle}>MACD Indicator</h3>
        <div style={chartBoxStyle}>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={macdData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#29407a" />
              <XAxis dataKey="time" stroke="#ffffff" />
              <YAxis stroke="#ffffff" domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#cccccc" />
              <Bar dataKey="histogram" fill="#7fd1ff" name="Histogram" />
              <Line
                type="monotone"
                dataKey="macd"
                stroke="#00d2ff"
                strokeWidth={2}
                dot={false}
                name="MACD"
              />
              <Line
                type="monotone"
                dataKey="signal"
                stroke="#ff6f91"
                strokeWidth={2}
                dot={false}
                name="Signal"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <TopTabs active={tab} onChange={setTab} />

        {tab === "Market" && (
          <>
            <div className="row">
              <div className="card" style={{ flex: 1 }}>
                <div className="rowBetween">
                  <div>
                    <div className="cardTitle">Market</div>
                    <div className="muted">Live price + chart (demo)</div>
                  </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Live Market Graph</h2>

          <p className="price-text">
            Latest Price: {loading ? "Loading..." : latestPrice || "Not available"}
          </p>

          {latestPoint && !loading && !error && (
            <div className="indicator-summary">
              <div className="indicator-box">
                <span>RSI (14)</span>
                <strong>
                  {latestPoint.rsi != null ? latestPoint.rsi.toFixed(2) : "N/A"}
                </strong>
              </div>

              <div className="indicator-box">
                <span>MACD</span>
                <strong>
                  {latestPoint.macd != null ? latestPoint.macd.toFixed(5) : "N/A"}
                </strong>
              </div>

              <div className="indicator-box">
                <span>Signal</span>
                <strong>
                  {latestPoint.signal != null ? latestPoint.signal.toFixed(5) : "N/A"}
                </strong>
              </div>
            </div>
          )}

          {error && <p className="error-text">{error}</p>}

          {loading ? (
            <p>Loading chart...</p>
          ) : error ? null : (
            <>
              <div className="chart-block">
                <h3>Price Chart</h3>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#22356f" />
                      <XAxis dataKey="time" stroke="#d8e3ff" />
                      <YAxis stroke="#d8e3ff" domain={["auto", "auto"]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#5e8bff"
                        strokeWidth={3}
                        dot={false}
                        name="Close Price"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-block">
                <h3>RSI Indicator</h3>
                <div style={{ width: "100%", height: 250 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#22356f" />
                      <XAxis dataKey="time" stroke="#d8e3ff" />
                      <YAxis stroke="#d8e3ff" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <ReferenceLine y={70} stroke="#ff6b6b" strokeDasharray="5 5" />
                      <ReferenceLine y={30} stroke="#51cf66" strokeDasharray="5 5" />
                      <Line
                        type="monotone"
                        dataKey="rsi"
                        stroke="#f59f00"
                        strokeWidth={2.5}
                        dot={false}
                        name="RSI (14)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-block">
                <h3>MACD Indicator</h3>
                <div style={{ width: "100%", height: 250 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#22356f" />
                      <XAxis dataKey="time" stroke="#d8e3ff" />
                      <YAxis stroke="#d8e3ff" domain={["auto", "auto"]} />
                      <Tooltip />
                      <Legend />
                      <ReferenceLine y={0} stroke="#cdd6f4" strokeDasharray="4 4" />
                      <Line
                        type="monotone"
                        dataKey="macd"
                        stroke="#00c2ff"
                        strokeWidth={2.5}
                        dot={false}
                        name="MACD"
                      />
                      <Line
                        type="monotone"
                        dataKey="signal"
                        stroke="#ff4d6d"
                        strokeWidth={2.5}
                        dot={false}
                        name="Signal"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="dashboard-card">
          <h2>Market Timings</h2>
          <div className="timings-list">
            {sessions.map((session) => (
              <div key={session.name} className="timing-item">
                <span>{session.name}</span>
                <strong>{session.isOpen ? "Open" : "Closed"}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< Updated upstream
<<<<<<< HEAD
function MarketTimings() {
  const sessions = [
    { name: "Sydney", open: "21:00", close: "06:00" },
    { name: "Tokyo", open: "23:00", close: "08:00" },
    { name: "London", open: "07:00", close: "16:00" },
    { name: "New York", open: "12:00", close: "21:00" },
  ];

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="cardTitle">Market Timings</div>
      <div className="muted">Static session table</div>

      <table className="table">
        <thead>
          <tr>
            <th>Session</th>
            <th>Open</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{s.open}</td>
              <td>{s.close}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
=======
function formatTime(v) {
  if (!v) return "-";
  try {
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) return d.toLocaleString();
  } catch { /* empty */ }
  return String(v);
}

// Simple UTC session logic for demo
function getSessions() {
  const utcHour = new Date().getUTCHours();
  const sessions = [
    { name: "Sydney", open: 21, close: 6 }, // crosses midnight
    { name: "Tokyo", open: 0, close: 9 },
    { name: "London", open: 7, close: 16 },
    { name: "New York", open: 13, close: 22 },
  ];
  return sessions.map((s) => {
    const isOpen =
      s.open < s.close
        ? utcHour >= s.open && utcHour < s.close
        : utcHour >= s.open || utcHour < s.close; // crosses midnight
    return { ...s, isOpen };
  });
>>>>>>> c89c4f0 (Added Live Price Traking using API)
}
=======
const cardStyle = {
  background: "#13286d",
  borderRadius: "14px",
  padding: "20px",
};

const labelStyle = {
  margin: "0 0 10px 0",
  color: "#cfd8ff",
};

const sectionTitle = {
  marginBottom: "10px",
};

const chartBoxStyle = {
  background: "#13286d",
  borderRadius: "14px",
  padding: "16px",
  marginBottom: "24px",
};
>>>>>>> Stashed changes
