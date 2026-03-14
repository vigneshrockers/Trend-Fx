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
  );
}