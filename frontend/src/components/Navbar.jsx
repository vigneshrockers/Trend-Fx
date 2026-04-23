import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav-inner">
      <div className="brand">
        <div className="badge">TF</div>
        <div>Trend-Fx</div>
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