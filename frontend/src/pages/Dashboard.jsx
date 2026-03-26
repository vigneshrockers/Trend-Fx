import { useEffect, useMemo, useState } from "react";
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
  const [latestPrice, setLatestPrice] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [priceError, setPriceError] = useState("");
  const [chartError, setChartError] = useState("");

  const priceSymbol = useMemo(() => pair, [pair]);
  const chartSymbol = useMemo(() => pair, [pair]);

  useEffect(() => {
    fetchLivePrice();
    fetchChartData();
  }, [pair]);

  const fetchLivePrice = async () => {
    try {
      setLoadingPrice(true);
      setPriceError("");

      const response = await fetch(
        `https://api.twelvedata.com/exchange_rate?symbol=${encodeURIComponent(
          priceSymbol
        )}&apikey=${API_KEY}`
      );

      const data = await response.json();
      console.log("Live price response:", data);

      if (!response.ok || data.code || !data.rate) {
        throw new Error(data.message || "Failed to fetch live price");
      }

      setLatestPrice(Number(data.rate).toFixed(5));
    } catch (error) {
      console.error("Live price error:", error);
      setPriceError("Unable to load live forex price.");
      setLatestPrice("");
    } finally {
      setLoadingPrice(false);
    }
  };

  const fetchChartData = async () => {
    try {
      setLoadingChart(true);
      setChartError("");

      const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(
          chartSymbol
        )}&interval=5min&outputsize=100&apikey=${API_KEY}`
      );

      const data = await response.json();
      console.log("Chart response:", data);

      if (!response.ok || data.code || !data.values) {
        throw new Error(data.message || "Failed to fetch chart data");
      }

      const candles = data.values
        .slice()
        .reverse()
        .map((item) => ({
          datetime: item.datetime,
          time: new Date(item.datetime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          close: Number(item.close),
        }));

      const closes = candles.map((item) => item.close);

      const rsiValues = calculateRSI(closes, 14);
      const macdData = calculateMACD(closes, 12, 26, 9);

      const mergedData = candles.map((item, index) => ({
        ...item,
        rsi: rsiValues[index],
        macd: macdData[index]?.macd ?? null,
        signal: macdData[index]?.signal ?? null,
        histogram: macdData[index]?.histogram ?? null,
      }));

      setChartData(mergedData);
    } catch (error) {
      console.error("Chart error:", error);
      setChartError("Unable to load market graph.");
      setChartData([]);
    } finally {
      setLoadingChart(false);
    }
  };

  const latestIndicatorData = chartData.length ? chartData[chartData.length - 1] : null;

  const getForexSessions = () => {
    const now = new Date();
    const utcHour = now.getUTCHours() + now.getUTCMinutes() / 60;

    const sessions = [
      { name: "Sydney", start: 21, end: 6 },
      { name: "Tokyo", start: 0, end: 9 },
      { name: "London", start: 8, end: 17 },
      { name: "New York", start: 13, end: 22 },
    ];

    return sessions.map((session) => {
      let isOpen = false;

      if (session.start > session.end) {
        isOpen = utcHour >= session.start || utcHour < session.end;
      } else {
        isOpen = utcHour >= session.start && utcHour < session.end;
      }

      return { ...session, isOpen };
    });
  };

  const sessions = getForexSessions();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Forex Dashboard</h1>

        <div className="pair-select-box">
          <label>Select Pair</label>
          <select value={pair} onChange={(e) => setPair(e.target.value)}>
            <option value="EUR/USD">EUR/USD</option>
            <option value="GBP/USD">GBP/USD</option>
            <option value="USD/JPY">USD/JPY</option>
            <option value="USD/INR">USD/INR</option>
            <option value="AUD/USD">AUD/USD</option>
            <option value="USD/CAD">USD/CAD</option>
          </select>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Live Market Graph</h2>

          <p className="price-text">
            Latest Price: {loadingPrice ? "Loading..." : latestPrice || "Not available"}
          </p>

          {priceError && <p className="error-text">{priceError}</p>}

          {latestIndicatorData && (
            <div className="indicator-summary">
              <div className="indicator-box">
                <span>RSI (14)</span>
                <strong>
                  {latestIndicatorData.rsi !== null && latestIndicatorData.rsi !== undefined
                    ? latestIndicatorData.rsi.toFixed(2)
                    : "N/A"}
                </strong>
              </div>

              <div className="indicator-box">
                <span>MACD</span>
                <strong>
                  {latestIndicatorData.macd !== null && latestIndicatorData.macd !== undefined
                    ? latestIndicatorData.macd.toFixed(5)
                    : "N/A"}
                </strong>
              </div>

              <div className="indicator-box">
                <span>Signal</span>
                <strong>
                  {latestIndicatorData.signal !== null && latestIndicatorData.signal !== undefined
                    ? latestIndicatorData.signal.toFixed(5)
                    : "N/A"}
                </strong>
              </div>
            </div>
          )}

          {loadingChart ? (
            <p>Loading chart...</p>
          ) : chartError ? (
            <p className="error-text">{chartError}</p>
          ) : (
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
                <div style={{ width: "100%", height: 260 }}>
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
                        connectNulls={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-block">
                <h3>MACD Indicator</h3>
                <div style={{ width: "100%", height: 260 }}>
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
                        connectNulls={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="signal"
                        stroke="#ff4d6d"
                        strokeWidth={2.5}
                        dot={false}
                        name="Signal"
                        connectNulls={false}
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

function calculateEMA(values, period) {
  const multiplier = 2 / (period + 1);
  const ema = new Array(values.length).fill(null);

  if (values.length < period) return ema;

  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += values[i];
  }

  ema[period - 1] = sum / period;

  for (let i = period; i < values.length; i++) {
    ema[i] = (values[i] - ema[i - 1]) * multiplier + ema[i - 1];
  }

  return ema;
}

function calculateRSI(values, period = 14) {
  const rsi = new Array(values.length).fill(null);

  if (values.length <= period) return rsi;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = values[i] - values[i - 1];
    if (change >= 0) {
      gains += change;
    } else {
      losses += Math.abs(change);
    }
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  if (avgLoss === 0) {
    rsi[period] = 100;
  } else {
    const rs = avgGain / avgLoss;
    rsi[period] = 100 - 100 / (1 + rs);
  }

  for (let i = period + 1; i < values.length; i++) {
    const change = values[i] - values[i - 1];
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    if (avgLoss === 0) {
      rsi[i] = 100;
    } else {
      const rs = avgGain / avgLoss;
      rsi[i] = 100 - 100 / (1 + rs);
    }
  }

  return rsi;
}

function calculateMACD(values, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) {
  const shortEMA = calculateEMA(values, shortPeriod);
  const longEMA = calculateEMA(values, longPeriod);

  const macdLine = values.map((_, index) => {
    if (shortEMA[index] === null || longEMA[index] === null) return null;
    return shortEMA[index] - longEMA[index];
  });

  const validMacdValues = macdLine.filter((value) => value !== null);
  const signalOnly = calculateEMA(validMacdValues, signalPeriod);

  const signalLine = new Array(values.length).fill(null);
  let signalIndex = 0;

  for (let i = 0; i < macdLine.length; i++) {
    if (macdLine[i] !== null) {
      signalLine[i] = signalOnly[signalIndex];
      signalIndex++;
    }
  }

  return values.map((_, index) => {
    const macd = macdLine[index];
    const signal = signalLine[index];

    return {
      macd,
      signal,
      histogram:
        macd !== null && signal !== null ? macd - signal : null,
    };
  });
}