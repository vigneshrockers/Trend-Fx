import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroLayout from "../components/HeroLayout";
import { setToken } from "../services/auth";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("demo@trendfx.com");
  const [password, setPassword] = useState("Demo@1234");
  const [err, setErr] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setErr("");

    // Demo login (backend later)
    if (!email || !password) {
      setErr("Email and password required");
      return;
    }

    setToken("demo_token_123");
    nav("/dashboard");
  }

  return (
    <HeroLayout title="FOREX MARKET PREDICTION" subtitle="WELCOME TO THE FUTURE OF FOREX TRADING!">
      <div className="authCard heroAuthCard">
        <h2>Login</h2>
        <p className="muted">Access your Trend-Fx dashboard.</p>

        {err ? <div className="alert">{err}</div> : null}

        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />

          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <button className="btn">Login</button>
        </form>

        <div className="authLinks">
          <Link to="/forgot-password">Forgot password?</Link>
          <span>•</span>
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </HeroLayout>
  );
}