import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TradingViewChart from "../components/TradingViewChart";
import { logout } from "../services/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  const [selectedPair, setSelectedPair] = useState("USD/INR");
  const [livePrice, setLivePrice] = useState("--");
  const [liveTime, setLiveTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        `http://localhost:8000/market-data?symbol=${encodeURIComponent(
          selectedPair
        )}&interval=5min&outputsize=60`
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch market data");
      }

      const cleaned = (data.data || []).filter(
        (item) => item.price !== null && item.price !== undefined
      );

      if (cleaned.length > 0) {
        setLivePrice(cleaned[cleaned.length - 1].price);
      } else {
        setLivePrice("--");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setLivePrice("--");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#081a4b",
        color: "white",
        padding: "20px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          background: "#0b1f5e",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          boxSizing: "border-box",
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

        <div style={{ marginBottom: "20px", width: "100%" }}>
          <label
            htmlFor="pair-select"
            style={{
              fontWeight: "bold",
              marginRight: "10px",
              display: "block",
              marginBottom: "8px",
            }}
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
              border: "1px solid #fff",
              background: "#081a4b",
              color: "#fff",
              fontWeight: "bold",
              width: "100%",
              boxSizing: "border-box",
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
            width: "100%",
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
          </div>
        )}

        <h3 style={sectionTitle}>Market Chart</h3>
        <div style={chartBoxStyle}>
          <TradingViewChart pair={selectedPair} />
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#13286d",
  borderRadius: "14px",
  padding: "20px",
  width: "100%",
  boxSizing: "border-box",
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
  width: "100%",
  boxSizing: "border-box",
};