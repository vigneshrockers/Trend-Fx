import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../services/auth";
import { me } from "../services/authApi";

export default function ProtectedRoute({ children }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (!token) return setOk(false);
      try {
        await me(); // verify token
        setOk(true);
      } catch {
        setOk(false);
      }
    })();
  }, []);

  if (ok === null) return <div className="container" style={{ padding: 20 }}>Checking session...</div>;
  if (!ok) return <Navigate to="/login" replace />;
  return children;
}