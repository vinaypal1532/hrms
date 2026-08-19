const API_URL = "http://127.0.0.1:5000/api";

export async function getAllUsers(token: string) {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      body?.message ||
      body?.error ||
      `Request failed with status ${res.status}`;

    const err = new Error(message);

    (err as any).status = res.status;
    (err as any).body = body;

    throw err;
  }

  return body;
}

export interface AddStaffData {
  name: string;
  email: string;
  phone: string;
  position: string;
  joiningDate: string;
}

export async function addstaff(token: string, staffData: AddStaffData) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      name: staffData.name,
      email: staffData.email,
      phone: staffData.phone,
      position: staffData.position,
      joiningDate: staffData.joiningDate,
    }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      body?.message ||
      body?.error ||
      `Request failed with status ${res.status}`;

    const err = new Error(message);

    (err as any).status = res.status;
    (err as any).body = body;

    throw err;
  }

  return body;
}
