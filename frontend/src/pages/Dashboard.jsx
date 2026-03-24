import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopTabs from "../components/TopTabs.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import MarketChart from "../components/MarketChart.jsx";
import { me } from "../services/authApi";
import { logout } from "../services/auth";
import { getLive, getCandles } from "../services/market";
import { getLatestNews } from "../services/news";

const PAIRS = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD"];

export default function Dashboard() {
  const nav = useNavigate();

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
        const [l, c] = await Promise.all([getLive(pair), getCandles(pair, 120)]);
        if (!alive) { return; }
        setLive(l);
        setCandles(c);
      } catch (e) {
        if (!alive) { return; }
        setErr(e.message || "Failed to load market data");
      } finally {
        if (!alive) { return; }
        setLoadingLive(false);
        setLoadingChart(false);
      }
    }

    loadMarket();

    const t = setInterval(async () => {
      try {
        const l = await getLive(pair);
        if (alive) setLive(l);
      } catch {}
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
      }
    })();

    return () => {
      alive = false;
    };
  }, [pair, activeTab]);

  function onLogout() {
    logout();
    nav("/login");
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="topbar">
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Trend-Fx Dashboard</div>
            <div className="small">Live market + news + timings</div>
          </div>
          <div style={{ width: 160 }}>
            <button onClick={onLogout}>Logout</button>
          </div>
        </div>

        <div className="dash-grid">
          <div className="card">
            <TopTabs active={activeTab} onChange={setActiveTab} />

            <div style={{ marginTop: 14 }}>
              {err ? <div className="alert">{err}</div> : null}

              {activeTab === "Market" && (
                <>
                  <div className="flex" style={{ justifyContent: "space-between" }}>
                    <div className="flex">
                      <div className="field" style={{ minWidth: 220, marginBottom: 0 }}>
                        <label>Pair</label>
                        <select value={pair} onChange={(e) => setPair(e.target.value)}>
                          {PAIRS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="pricebox">
                        <div>
                          <div className="small">Current Price</div>
                          <div className="price">{loadingLive ? "Loading..." : live?.price ?? "-"}</div>
                        </div>
                        <div>
                          <div className="small">Updated</div>
                          <div style={{ fontWeight: 800 }}>
                            {loadingLive ? "..." : formatTime(live?.updated_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <div className="section-title">Market Chart (Close)</div>
                    <div className="card" style={{ padding: 12 }}>
                      {loadingChart ? (
                        <div className="small">Loading chart...</div>
                      ) : (
                        <MarketChart candles={candles} />
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "News" && (
                <div style={{ marginTop: 12 }}>
                  <div className="section-title">Latest News</div>
                  {loadingNews ? (
                    <div className="small">Loading news...</div>
                  ) : (
                    <div className="list">
                      {news.length === 0 ? (
                        <div className="small">No news found.</div>
                      ) : (
                        news.map((n, idx) => (
                          <div key={idx} className="list-item">
                            <div style={{ fontWeight: 900 }}>{n.title || n.headline || "News"}</div>
                            <div className="small">{formatTime(n.published_at || n.timestamp)}</div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "Market Timings" && (
                <div style={{ marginTop: 12 }}>
                  <div className="section-title">Market Sessions (Simple)</div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Session</th>
                        <th>UTC Hours</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timings.map((s) => (
                        <tr key={s.name}>
                          <td style={{ fontWeight: 900 }}>{s.name}</td>
                          <td>{s.open}:00 - {s.close}:00</td>
                          <td className={s.isOpen ? "open" : "closed"}>
                            {s.isOpen ? "Now Open" : "Closed"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="small" style={{ marginTop: 8 }}>
                    *Simple UTC-based check for demo.
                  </div>
                </div>
              )}
            </div>
          </div>

          <RightSidebar user={user} />
        </div>
      </div>
    </div>
  );
}

function formatTime(v) {
  if (!v) return "-";
  try {
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) return d.toLocaleString();
  } catch {}
  return String(v);
}

function getSessions() {
  const utcHour = new Date().getUTCHours();
  const sessions = [
    { name: "Sydney", open: 21, close: 6 },
    { name: "Tokyo", open: 0, close: 9 },
    { name: "London", open: 7, close: 16 },
    { name: "New York", open: 13, close: 22 },
  ];

  return sessions.map((s) => {
    const isOpen =
      s.open < s.close
        ? utcHour >= s.open && utcHour < s.close
        : utcHour >= s.open || utcHour < s.close;

    return { ...s, isOpen };
  });
}