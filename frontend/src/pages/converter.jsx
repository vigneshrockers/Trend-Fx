import { useState } from "react";
import "../styles/pages.css";

export default function Converter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleConvert = async () => {
    try {
      setError("");
      setResult("");

      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );

      if (!response.ok) {
        throw new Error("Failed conversion");
      }

      const data = await response.json();

      if (data.rates && data.rates[toCurrency] !== undefined) {
        setResult(`${amount} ${fromCurrency} = ${data.rates[toCurrency]} ${toCurrency}`);
      } else {
        setError("Conversion failed.");
      }
    } catch (err) {
      setError("Unable to fetch conversion right now.");
    }
  };

  return (
    <div className="simple-page">
      <div className="simple-card">
        <h1>Currency Converter</h1>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="two-column">
          <div className="form-group">
            <label>From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
          </div>

          <div className="form-group">
            <label>To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
        </div>

        <button className="page-btn" onClick={handleConvert}>
          Convert
        </button>

        {result && <p className="result-text">{result}</p>}
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}