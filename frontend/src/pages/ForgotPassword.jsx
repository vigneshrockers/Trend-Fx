import { useState } from "react";
import { Link } from "react-router-dom";
import HeroLayout from "../components/HeroLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("demo@trendfx.com");
  const [msg, setMsg] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    // demo reset link
    setMsg(`Reset link (demo): http://localhost:5173/reset-password?token=demo123`);
  }

  return (
    <HeroLayout title="FOREX MARKET PREDICTION" subtitle="RESET YOUR PASSWORD (DEMO)">
      <div className="authCard heroAuthCard">
        <h2>Forgot Password</h2>
        <p className="muted">We will generate a reset link (demo mode).</p>

        {msg ? <div className="alert ok">{msg}</div> : null}

        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <button className="btn">Request reset link</button>
        </form>

        <div className="authLinks">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </HeroLayout>
  );
}