<<<<<<< HEAD
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import HeroLayout from "../components/HeroLayout";

export default function ResetPassword() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const tokenFromUrl = params.get("token") || "";
  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    // demo reset
    setMsg("Password updated (demo). You can login now.");
    setTimeout(() => nav("/login"), 800);
  }

  return (
    <HeroLayout title="FOREX MARKET PREDICTION" subtitle="SET A NEW PASSWORD">
      <div className="authCard heroAuthCard">
        <h2>Reset Password</h2>

        {msg ? <div className="alert ok">{msg}</div> : null}

        <form onSubmit={onSubmit} className="form">
          <label>Token</label>
          <input value={token} onChange={(e) => setToken(e.target.value)} required />

          <label>New Password</label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            required
          />

          <button className="btn">Reset</button>
        </form>

        <div className="authLinks">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </HeroLayout>
=======
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import heroImg from "../assets/forex-hero.jpg";
import { resetPassword } from "../services/authApi";

export default function ResetPassword() {
  const nav = useNavigate();
<<<<<<< Updated upstream
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
=======

  const [token, setToken] = useState(search.get("token") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
>>>>>>> Stashed changes
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
<<<<<<< Updated upstream
    setMsg("");
=======

    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

>>>>>>> Stashed changes
    setLoading(true);
    try {
      const res = await resetPassword(token, newPassword);
      setMsg(res.message || "Password updated. You can login now.");
      setTimeout(() => nav("/login"), 800);
    } catch (e2) {
      setErr(e2.message || "Reset failed");
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
        <div className="auth-title">Reset Password</div>
        <div className="auth-sub">Enter the passcode sent to your email and set a new password.</div>
>>>>>>> Stashed changes

      <div className="navbar">
        <div className="container">
          <Navbar />
        </div>
      </div>

<<<<<<< Updated upstream
      <div className="container">
        <div className="hero-content">
          <div>
            <h1 className="hero-title">RESET PASSWORD</h1>
            <p className="hero-sub">Paste token from reset link and set a new password.</p>
=======
        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Reset Passcode</label>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter 6-digit code"
              required
            />
>>>>>>> Stashed changes
          </div>

          <div className="card">
            <h2>Reset</h2>
            <p>Use the token and set a new password.</p>

            <form onSubmit={onSubmit}>
              <div className="field">
                <label>Token</label>
                <input
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="paste token here"
                  required
                />
              </div>

              <div className="field">
                <label>New Password (min 6)</label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="new password"
                  type="password"
                  minLength={6}
                  required
                />
              </div>

              <button disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>

              {err ? <div className="alert">{err}</div> : null}
              {msg ? <div className="alert" style={{ color: "#86efac" }}>{msg}</div> : null}

              <div className="row">
                <Link to="/forgot-password">Get reset link</Link>
                <Link to="/login">Back to Login</Link>
              </div>
            </form>
          </div>
<<<<<<< Updated upstream
=======

          <div className="field">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={{ width: "100%" }}>
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <div className="auth-foot">
          <Link to="/forgot-password">Request a new passcode</Link>
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
