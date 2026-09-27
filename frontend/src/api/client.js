const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function getToken() {
  return localStorage.getItem("shield_token");
}

async function request(path, { method = "GET", body, params } = {}) {
  let url = `${BASE_URL}${path}`;

  if (params) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
    ).toString();
    if (qs) url += `?${qs}`;
  }

  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload;
  try {
    payload = await res.json();
  } catch {
    payload = { success: false, message: "Invalid server response." };
  }

  if (!res.ok || payload.success === false) {
    const err = new Error(payload.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.errors = payload.errors;
    throw err;
  }

  return payload; // { success, data, meta? }
}

export const api = {
  get: (path, params) => request(path, { method: "GET", params }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
};

export function setToken(token) {
  localStorage.setItem("shield_token", token);
}
export function clearToken() {
  localStorage.removeItem("shield_token");
}
export function isAuthenticated() {
  return !!getToken();
}
