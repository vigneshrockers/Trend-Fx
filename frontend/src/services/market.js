<<<<<<< HEAD
function mockCandles(limit = 120) {
  const now = Date.now();
  let price = 1.08;
  const out = [];

  for (let i = limit - 1; i >= 0; i--) {
    const t = now - i * 60 * 60 * 1000;
    const change = (Math.random() - 0.5) * 0.01;
    const close = Math.max(0.5, price + change);

    out.push({
      timestamp: new Date(t).toISOString(),
      close,
    });

    price = close;
  }
  return out;
}

export async function getCandles() {
  return mockCandles(120);
}

export async function getLive(pair = "EURUSD") {
  return {
    pair,
    price: (1 + Math.random()).toFixed(5),
    updated_at: new Date().toISOString(),
  };
=======
import { apiFetch } from "./api";

export async function getLive(pair = "EURUSD") {
  return apiFetch(`/api/market/live?pair=${encodeURIComponent(pair)}`);
}

export async function getCandles(pair = "EURUSD", limit = 120) {
  const data = await apiFetch(`/api/market/candles?pair=${encodeURIComponent(pair)}&limit=${limit}`);
  return data?.candles || data || [];
>>>>>>> c89c4f0 (Added Live Price Traking using API)
}