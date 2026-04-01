from datetime import datetime, timedelta
import random
from fastapi import APIRouter, Query

router = APIRouter(prefix="/api/market", tags=["market"])

<<<<<<< HEAD
@router.get("/live")
def live(pair: str = "EURUSD"):
    return {
        "pair": pair,
        "price": f"{(1 + random.random()):.5f}",
        "updated_at": datetime.utcnow().isoformat() + "Z",
    }
=======
import os
import requests
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")


@router.get("/live")
def live(pair: str = "EURUSD"):
    try:
        from_currency = pair[:3]   # EUR
        to_currency = pair[3:]     # USD

        url = "https://www.alphavantage.co/query"

        params = {
            "function": "CURRENCY_EXCHANGE_RATE",
            "from_currency": from_currency,
            "to_currency": to_currency,
            "apikey": API_KEY
        }

        response = requests.get(url, params=params)
        data = response.json()

        # ✅ Debug print (important for beginner)
        print("API RESPONSE:", data)

        if "Realtime Currency Exchange Rate" not in data:
            raise HTTPException(status_code=400, detail="API limit reached or invalid response")

        rate = data["Realtime Currency Exchange Rate"]

        return {
            "pair": pair,
            "price": float(rate["5. Exchange Rate"]),
            "last_updated": rate["6. Last Refreshed"],
            "source": "alpha_vantage"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
>>>>>>> c89c4f0 (Added Live Price Traking using API)

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