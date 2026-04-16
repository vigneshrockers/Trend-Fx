import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
<<<<<<< Updated upstream
    <div className="nav-inner">
      <div className="brand">
        <div className="badge">TF</div>
        <div>Trend-Fx</div>
=======
    <nav className="tf-navbar">
      <div className="tf-navbar-inner">
        <Link to="/" className="tf-brand">
          <div className="tf-logo-box">TF</div>
          <span className="tf-brand-text">Trend-Fx</span>
        </Link>

        <div className="tf-nav-links">
          <Link to="/about">About</Link>
          <Link to="/converter">Currency Converter</Link>
          <Link to="/contact">Contact Us</Link>

          {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
          {isLoggedIn ? (
            <Link to="/logout" className="tf-logout-link">
              Logout
            </Link>
          ) : (
            <Link to="/login">Register / Login</Link>
          )}
        </div>
>>>>>>> Stashed changes
      </div>

      {/* Order: Home, About, Currency Converter, Contact Us, Register/Login */}
      <div className="navlinks">
        <Link to="/">Home</Link>
        <a href="#about">About</a>
        <a href="#converter">Currency Converter</a>
        <a href="#contact">Contact Us</a>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>

      {/* Search removed */}
      <div style={{ width: 0 }} />
    </div>
  );
}
