import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import heroImg from "../assets/forex-hero.jpg";
import { resetPassword } from "../services/authApi";

export default function ResetPassword() {
  const nav = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
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
            <h1 className="hero-title">RESET PASSWORD</h1>
            <p className="hero-sub">Paste token from reset link and set a new password.</p>
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
        </div>
      </div>
    </div>
  );
}