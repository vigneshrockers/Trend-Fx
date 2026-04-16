import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setLoading(true);
    try {
      const res = await forgotPassword({ email });
      setMsg(res?.message || "Reset link request submitted.");
    } catch (error) {
      setErr(error.message || "Request failed");
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

          <button type="submit" style={{ width: "100%" }}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

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
  );
}
