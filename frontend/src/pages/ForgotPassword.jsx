<<<<<<< HEAD
import { useState } from "react";
import { Link } from "react-router-dom";
import HeroLayout from "../components/HeroLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("demo@trendfx.com");
  const [msg, setMsg] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    // demo reset link
    setMsg(`Reset link (demo): http://localhost:5173/reset-password?token=demo123`);
  }

  return (
    <HeroLayout title="FOREX MARKET PREDICTION" subtitle="RESET YOUR PASSWORD (DEMO)">
      <div className="authCard heroAuthCard">
        <h2>Forgot Password</h2>
        <p className="muted">We will generate a reset link (demo mode).</p>

        {msg ? <div className="alert ok">{msg}</div> : null}

        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <button className="btn">Request reset link</button>
        </form>

        <div className="authLinks">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </HeroLayout>
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import heroImg from "../assets/forex-hero.jpg";
import { forgotPassword } from "../services/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setMsg(res.reset_link ? `Reset Link (demo): ${res.reset_link}` : (res.message || "Reset link generated."));
    } catch (e2) {
      setErr(e2.message || "Failed to request reset");
    } finally {
      setLoading(false);
    }
  }

  return (
<<<<<<< Updated upstream
    <div className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
      <div className="hero-overlay" />
=======
    <div className="auth-wrap">
      <div className="card auth-card">
        <div className="auth-title">Forgot Password</div>
        <div className="auth-sub">Enter your email to receive a 6-digit reset passcode.</div>
>>>>>>> Stashed changes

      <div className="navbar">
        <div className="container">
          <Navbar />
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div>
            <h1 className="hero-title">FORGOT PASSWORD</h1>
            <p className="hero-sub">Enter your email and get a reset link (demo returns link in response).</p>
          </div>

          <div className="card">
            <h2>Request Reset Link</h2>
            <p>We’ll generate a reset link valid for a short time.</p>

<<<<<<< Updated upstream
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

              <button disabled={loading}>
                {loading ? "Requesting..." : "Get Reset Link"}
              </button>

              {err ? <div className="alert">{err}</div> : null}
              {msg ? <div className="alert" style={{ color: "#86efac" }}>{msg}</div> : null}

              <div className="row">
                <Link to="/login">Back to Login</Link>
                <Link to="/reset-password">Already have token?</Link>
              </div>
            </form>
          </div>
=======
        <div className="auth-foot">
          <Link to="/reset-password">Already have a passcode?</Link>
          <br />
          <br />
          <Link to="/login">Back to Login</Link>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
>>>>>>> c89c4f0 (Added Live Price Traking using API)
  );
}
