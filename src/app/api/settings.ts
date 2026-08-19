const API_URL = "http://127.0.0.1:5000/api";

export interface SystemSetting {
  id: number;
  key: string;
  value: string | number | boolean | null;
  type: "string" | "integer" | "number" | "boolean" | "time" | "json";
  category: string;
  label: string;
  description?: string;
  isEditable: boolean;
  isActive: boolean;
  sortOrder: number;
}

export async function getAllSettings(token: string): Promise<SystemSetting[]> {
  const res = await fetch(`${API_URL}/settings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  const result = await res.json();

  return result.data;
}

export async function getSettingsByCategory(
  token: string,
  category: string,
): Promise<SystemSetting[]> {
  const res = await fetch(
    `${API_URL}/settings/category?category=${encodeURIComponent(category)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  const result = await res.json();

  return result.data;
}

export async function updateSettings(
  token: string,
  settings: Record<string, unknown>,
) {
  const res = await fetch(`${API_URL}/settings`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(settings),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update settings");
  }

  return result;
}
