import { apiFetch } from "./api";
import { setToken } from "./auth";

export async function registerUser({ full_name, email, password }) {
  const data = await apiFetch("/api/auth/register", {
    method: "POST",
    body: { full_name, email, password },
  });
  if (data?.access_token) setToken(data.access_token);
  return data;
}

export async function loginUser({ email, password }) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
  if (data?.access_token) setToken(data.access_token);
  return data;
}

export async function me() {
  return apiFetch("/api/users/me", { auth: true });
}

export async function forgotPassword(email) {
  return apiFetch("/api/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

export async function resetPassword(token, new_password) {
  return apiFetch("/api/auth/reset-password", {
    method: "POST",
    body: { token, new_password },
  });
}