<<<<<<< HEAD
export async function getLatestNews(pair = "EURUSD", limit = 10) {
  const now = Date.now();
  return Array.from({ length: limit }).map((_, i) => ({
    id: i + 1,
    headline: `Forex update: ${pair} market movement ${i + 1}`,
    timestamp: new Date(now - i * 15 * 60 * 1000).toISOString(),
    source: "Demo Feed",
  }));
=======
import { apiFetch } from "./api";

export async function getLatestNews(pair = "EURUSD", limit = 10) {
  const data = await apiFetch(`/api/news/latest?pair=${encodeURIComponent(pair)}&limit=${limit}`);
  return data?.news || data || [];
>>>>>>> c89c4f0 (Added Live Price Traking using API)
}