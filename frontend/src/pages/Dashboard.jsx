<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopTabs from "../components/TopTabs";
import RightSidebar from "../components/RightSidebar";
import MarketChart from "../components/MarketChart";
import { logout } from "../services/auth";
import { getCandles, getLive } from "../services/market";
=======
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopTabs from "../components/TopTabs.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import MarketChart from "../components/MarketChart.jsx";
import { me } from "../services/authApi";
import { logout } from "../services/auth";
import { getLive, getCandles } from "../services/market";
>>>>>>> c89c4f0 (Added Live Price Traking using API)
import { getLatestNews } from "../services/news";

const PAIRS = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD"];

export default function Dashboard() {
  const nav = useNavigate();
<<<<<<< HEAD
  const [tab, setTab] = useState("Market");
  const [pair, setPair] = useState("EURUSD");

  const [candles, setCandles] = useState([]);
  const [live, setLive] = useState(null);
  const [news, setNews] = useState([]);

  const user = { name: "Demo User", email: "demo@trendfx.com" };

  useEffect(() => {
    (async () => {
      const c = await getCandles(pair);
      const l = await getLive(pair);
      setCandles(c);
      setLive(l);
    })();
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
      }
    })();

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
          </div>
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

                  <select className="select" value={pair} onChange={(e) => setPair(e.target.value)}>
                    {PAIRS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pricePanel">
                  <div>
                    <div className="muted">Current Price</div>
                    <div className="price">{live?.price || "—"}</div>
                  </div>
                  <div className="muted">
                    Updated: {live?.updated_at ? new Date(live.updated_at).toLocaleString() : "—"}
                  </div>
                </div>
              </div>
            </div>

            <MarketChart candles={candles} />
          </>
        )}

        {tab === "News" && (
          <div className="card" style={{ marginTop: 12 }}>
            <div className="cardTitle">Latest News</div>
            <div className="muted">Top forex headlines (demo)</div>

            <ul className="newsList">
              {news.map((n) => (
                <li key={n.id} className="newsItem">
                  <div className="newsHeadline">{n.headline}</div>
                  <div className="muted">
                    {new Date(n.timestamp).toLocaleString()} • {n.source}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "Market Timings" && <MarketTimings />}
      </div>

      <RightSidebar user={user} onLogout={handleLogout} />
=======
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
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      <div className="pricebox">
                        <div>
                          <div className="small">Current Price</div>
                          <div className="price">
                            {loadingLive ? "Loading..." : (live?.price ?? "-")}
                          </div>
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
>>>>>>> c89c4f0 (Added Live Price Traking using API)
    </div>
  );
}

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