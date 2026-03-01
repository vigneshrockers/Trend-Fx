import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import HeroLayout from "../components/HeroLayout";

export default function ResetPassword() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const tokenFromUrl = params.get("token") || "";
  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    // demo reset
    setMsg("Password updated (demo). You can login now.");
    setTimeout(() => nav("/login"), 800);
  }

  return (
    <HeroLayout title="FOREX MARKET PREDICTION" subtitle="SET A NEW PASSWORD">
      <div className="authCard heroAuthCard">
        <h2>Reset Password</h2>

        {msg ? <div className="alert ok">{msg}</div> : null}

        <form onSubmit={onSubmit} className="form">
          <label>Token</label>
          <input value={token} onChange={(e) => setToken(e.target.value)} required />

          <label>New Password</label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            required
          />

          <button className="btn">Reset</button>
        </form>

        <div className="authLinks">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </HeroLayout>
  );
}