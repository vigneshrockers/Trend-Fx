import React from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar.jsx";

export default function Home() {
  return (
    <>
      <PublicNavbar />
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div>
            <h1>AI-Based Forex Prediction Website</h1>
            <p>
              View live forex prices, charts, market timings, and a simple demo
              dashboard for your Trend-Fx project.
            </p>
            <div className="hero-actions">
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button className="outline-btn">Register</button>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="section-title">Project Overview</div>
            <div className="list">
              <div className="list-item">Live Market Price</div>
              <div className="list-item">Market Chart</div>
              <div className="list-item">News Section</div>
              <div className="list-item">Market Timings</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}