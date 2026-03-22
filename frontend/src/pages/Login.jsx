<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import heroImg from "../assets/forex-hero.jpg";
import { loginUser } from "../services/authApi";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await loginUser({ email, password });
      nav("/dashboard");
    } catch (e2) {
      setErr(e2.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
      <div className="hero-overlay" />

      <div className="navbar">
        <div className="container">
          <Navbar />
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div>
            <h1 className="hero-title">WELCOME BACK</h1>
            <p className="hero-sub">
              Login to access your Trend-Fx dashboard.
            </p>
          </div>

          <div className="card">
            <h2>Login</h2>
            <p>Access your Trend-Fx dashboard.</p>

            <form onSubmit={onSubmit}>
              <div className="field">
                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  required
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                  required
                />
              </div>

              <button disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>

              {err ? <div className="alert">{err}</div> : null}

              <div className="row">
                <Link to="/forgot-password">Forgot Password?</Link>
                <Link to="/register">Create account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
>>>>>>> c89c4f0 (Added Live Price Traking using API)
  );
}