import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopTabs from "../components/TopTabs";
import RightSidebar from "../components/RightSidebar";
import MarketChart from "../components/MarketChart";
import { logout } from "../services/auth";
import { getCandles, getLive } from "../services/market";
import { getLatestNews } from "../services/news";

const PAIRS = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD"];

export default function Dashboard() {
  const nav = useNavigate();
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
    logout();
    nav("/login");
  }

  return (
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
    </div>
  );
}

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
}