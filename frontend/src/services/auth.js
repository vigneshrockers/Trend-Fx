const TOKEN_KEY = "trendfx_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
<<<<<<< HEAD
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function logout() {
  clearToken();
=======
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
>>>>>>> c89c4f0 (Added Live Price Traking using API)
}