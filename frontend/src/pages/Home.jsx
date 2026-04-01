import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import heroImg from "../assets/forex-hero.jpg";

export default function Home() {
  return (
    <div className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="hero-overlay" />

      <div className="navbar">
        <div className="container">
          <Navbar />
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div>
            <h1 className="hero-title">FOREX MARKET PREDICTION</h1>
            <p className="hero-sub">
              Trend-Fx helps you view live prices, charts, and simple trading signals
              for demo and academic purposes.
            </p>

            <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="tab" to="/login">Login</Link>
              <Link className="tab" to="/register">Create Account</Link>
              <Link className="tab" to="/dashboard">Go to Dashboard</Link>
            </div>
          </div>

          <div className="card">
            <h2>Quick Access</h2>
            <p>Login to access your dashboard and live market view.</p>
            <div className="small">
              Tip: Make sure backend is running at <b>http://localhost:8000</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}