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
  );
}