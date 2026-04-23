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
<<<<<<< Updated upstream
=======
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
>>>>>>> Stashed changes
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
<<<<<<< Updated upstream
      await registerUser({ full_name: fullName, email, password });
      nav("/dashboard");
    } catch (e2) {
      setErr(e2.message || "Register failed");
=======
      await register({ full_name, email, password });
      nav("/dashboard");
    } catch (error) {
      setErr(error.message || "Registration failed");
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={{ width: "100%" }}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="auth-foot">
          Already have an account? <Link to="/login">Login</Link>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
}
