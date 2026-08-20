const API_URL = "http://127.0.0.1:5000/api";

export type CreateAttendancePayload = {
  employee_id: string;
  date: string;
  check_in?: string;
  check_out?: string;
  status: string;
  notes?: string;
};

export type UpdateAttendancePayload = {
  employee_id?: string;
  date?: string;
  check_in?: string;
  check_out?: string;
  status?: string;
  notes?: string;
};

export type AttendanceFilters = {
  date?: string;
  search?: string;
  status?: string;
};

export async function fetchAttendanceRecords(
  token: string,
  filters?: AttendanceFilters
) {
  const queryParams = new URLSearchParams();
  if (filters?.date) queryParams.append("date", filters.date);
  if (filters?.search) queryParams.append("search", filters.search);
  if (filters?.status) queryParams.append("status", filters.status);

  const res = await fetch(`${API_URL}/attendance?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export async function createAttendanceRecord(
  payload: CreateAttendancePayload,
  token: string
) {
  const res = await fetch(`${API_URL}/attendance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
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

export async function updateAttendanceRecord(
  id: string,
  payload: UpdateAttendancePayload,
  token: string
) {
  const res = await fetch(`${API_URL}/attendance/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
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

export async function deleteAttendanceRecord(id: string, token: string) {
  const res = await fetch(`${API_URL}/attendance/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
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

export async function exportAttendance(token: string, date?: string) {
  const queryParams = new URLSearchParams();
  if (date) queryParams.append("date", date);

  const res = await fetch(`${API_URL}/attendance/export?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to export attendance records");
  }

  return res.blob();
}
