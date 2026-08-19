const API_URL = "http://127.0.0.1:5000/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

const DEFAULT_FETCH_TIMEOUT = 15000;

export async function loginUser(payload: LoginPayload) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), DEFAULT_FETCH_TIMEOUT);

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Login failed (${res.status}): ${errorText}`);
    }

    return res.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Login request timed out. Please check your backend and network connection.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function registerUser(payload: RegisterPayload) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}
