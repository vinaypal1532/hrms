import { API_URL } from "@/api/Axois";

export async function getProfile(token: string) {
  const res = await fetch(`${API_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function updateProfile(token: string, payload: any) {
  const res = await fetch(`${API_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

export async function getUserOrders(token: string) {
  const res = await fetch(`${API_URL}/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function getAllUsers(token: string) {
  const res = await fetch(`${API_URL}/user/all-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getUserById(token: string, id: string) {
  const res = await fetch(`${API_URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user details");
  return res.json();
}

export async function deleteUser(token: string, id: string) {
  const res = await fetch(`${API_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}
