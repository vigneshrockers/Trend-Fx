import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authApi";

export default function Register() {
  const nav = useNavigate();
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< Updated upstream
=======
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
>>>>>>> Stashed changes
  const [loading, setLoading] = useState(false);

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
    <div className="auth-wrap">
      <div className="card auth-card">
        <div className="auth-title">Register</div>
        <div className="auth-sub">Create your Trend-Fx account.</div>

        {err ? <div className="alert">{err}</div> : null}

        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Full Name</label>
            <input
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
