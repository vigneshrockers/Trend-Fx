<<<<<<< HEAD
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroLayout from "../components/HeroLayout";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@trendfx.com");
  const [password, setPassword] = useState("Demo@1234");

  function onSubmit(e) {
    e.preventDefault();
    // demo register (backend later)
    nav("/login");
  }

  return (
    <HeroLayout title="FOREX MARKET PREDICTION" subtitle="CREATE YOUR ACCOUNT TO GET STARTED!">
      <div className="authCard heroAuthCard">
        <h2>Create account</h2>
        <p className="muted">Register to access Trend-Fx features.</p>

        <form onSubmit={onSubmit} className="form">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />

          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <button className="btn">Register</button>
        </form>

        <div className="authLinks">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </HeroLayout>
=======
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import heroImg from "../assets/forex-hero.jpg";
import { registerUser } from "../services/authApi";

export default function Register() {
  const nav = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await registerUser({ full_name: fullName, email, password });
      nav("/dashboard");
    } catch (e2) {
      setErr(e2.message || "Register failed");
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
            <h1 className="hero-title">CREATE ACCOUNT</h1>
            <p className="hero-sub">
              Register to access live market view, news, and sessions timing.
            </p>
          </div>

          <div className="card">
            <h2>Register</h2>
            <p>Create your Trend-Fx account.</p>

            <form onSubmit={onSubmit}>
              <div className="field">
                <label>Full Name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>

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
                <label>Password (min 6)</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  type="password"
                  minLength={6}
                  required
                />
              </div>

              <button disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>

              {err ? <div className="alert">{err}</div> : null}

              <div className="row">
                <span />
                <Link to="/login">Already have an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
>>>>>>> c89c4f0 (Added Live Price Traking using API)
  );
}