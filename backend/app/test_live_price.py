import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_live_price_status():
    response = client.get("/live-price?pair=EURUSD")
    assert response.status_code == 200



def test_live_price_structure():
    response = client.get("/live-price?pair=EURUSD")
    data = response.json()

    assert "pair" in data
    assert "price" in data
    assert isinstance(data["price"], (int, float))



def test_invalid_pair():
    response = client.get("/live-price?pair=INVALID")
    assert response.status_code in [400, 404]



def test_missing_pair():
    response = client.get("/live-price")
    assert response.status_code == 422   # FastAPI validation error



def test_price_positive():
    response = client.get("/live-price?pair=EURUSD")
    data = response.json()

    assert data["price"] > 0



def test_response_time():
    import time
    start = time.time()

    client.get("/live-price?pair=EURUSD")

    end = time.time()
    assert (end - start) < 2  



def test_price_consistency(monkeypatch):
    def mock_price():
        return {"pair": "EURUSD", "price": 1.10}

    monkeypatch.setattr("services.price_service.get_live_price", mock_price)

    response = client.get("/live-price?pair=EURUSD")
    data = response.json()

    assert data["price"] == 1.10