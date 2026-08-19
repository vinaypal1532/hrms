const API_URL = "http://localhost:5000/api";

export interface ClientPayload {
  company_name: string;
  industry: string;
  gst_number?: string;
  pan_number?: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  contact_name: string;
  contact_designation?: string;
  contact_mobile: string;
  contact_email: string;
  billing_model: string;
  rate_per_employee?: number | string;
  status?: boolean;
}

export async function getAllClients(token: string) {
  const res = await fetch(`${API_URL}/clients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = body?.message || body?.error || `Request failed with status ${res.status}`;
    const err = new Error(message) as Error & { status?: number; body?: unknown };
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body;
}

export async function createClient(token: string, payload: ClientPayload) {
  const res = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = body?.message || body?.error || `Request failed with status ${res.status}`;
    const err = new Error(message) as Error & { status?: number; body?: unknown };
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body;
}

export async function updateClient(token: string, id: number, payload: ClientPayload) {
  const res = await fetch(`${API_URL}/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = body?.message || body?.error || `Request failed with status ${res.status}`;
    const err = new Error(message) as Error & { status?: number; body?: unknown };
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body;
}

export async function deleteClient(token: string, id: number) {
  const res = await fetch(`${API_URL}/clients/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = body?.message || body?.error || `Request failed with status ${res.status}`;
    const err = new Error(message) as Error & { status?: number; body?: unknown };
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body;
}
