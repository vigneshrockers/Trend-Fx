from datetime import datetime, timedelta
import random
from fastapi import APIRouter, Query

router = APIRouter(prefix="/api/market", tags=["market"])

@router.get("/live")
def live(pair: str = "EURUSD"):
    return {
        "pair": pair,
        "price": f"{(1 + random.random()):.5f}",
        "updated_at": datetime.utcnow().isoformat() + "Z",
    }

@router.get("/candles")
def candles(pair: str = "EURUSD", limit: int = Query(120, ge=10, le=500)):
    now = datetime.utcnow()
    price = 1.08
    out = []
    for i in range(limit):
        t = now - timedelta(hours=(limit - 1 - i))
        change = (random.random() - 0.5) * 0.01
        close = max(0.5, price + change)
        out.append({"timestamp": t.isoformat() + "Z", "close": close})
        price = close
    return {"pair": pair, "candles": out}