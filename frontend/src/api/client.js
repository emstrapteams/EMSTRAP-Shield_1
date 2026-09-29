const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const COMPANY_ID = import.meta.env.VITE_COMPANY_ID || "";

async function request(path, { method = "GET", body, params } = {}) {
  let url = `${BASE_URL}${path}`;

  if (params) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== ""
      )
    ).toString();

    if (qs) url += `?${qs}`;
  }

  const headers = { "Content-Type": "application/json" };

  if (COMPANY_ID) {
    headers["x-company-id"] = COMPANY_ID;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload;

  try {
    payload = await res.json();
  } catch {
    payload = {
      success: false,
      message: "Invalid server response.",
    };
  }

  if (!res.ok || payload.success === false) {
    const err = new Error(
      payload.message || `Request failed (${res.status})`
    );
    err.status = res.status;
    err.errors = payload.errors;
    throw err;
  }

  return payload;
}

export const api = {
  get: (path, params) => request(path, { method: "GET", params }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
};
export async function downloadReport(path, params, fallbackFilename = "report") {
  let url = `${BASE_URL}${path}`;

  const qs = new URLSearchParams(
    Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== null && v !== ""
    )
  ).toString();

  if (qs) url += `?${qs}`;

  const headers = {};
  if (COMPANY_ID) headers["x-company-id"] = COMPANY_ID;

  const res = await fetch(url, { headers });

  if (!res.ok) {
    let message = `Report request failed (${res.status})`;

    try {
      const payload = await res.json();
      message = payload.message || message;
    } catch {
      // Keep the default message if the response is not JSON.
    }

    throw new Error(message);
  }

  const blob = await res.blob();

  const disposition = res.headers.get("Content-Disposition") || "";
  const match = disposition.match(/filename="?([^"]+)"?/);
  const filename = match ? match[1] : fallbackFilename;

  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = blobUrl;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(blobUrl);
}