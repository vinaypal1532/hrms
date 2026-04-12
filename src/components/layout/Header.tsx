// components/layout/Header.tsx
"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <header className="dashboard-header">
      <h1 className="dashboard-header-title">Dashboard</h1>

      <div className="dashboard-header-meta">
        <div className="dashboard-user-info">
          <p>Admin User</p>
          <p>admin@hrms.com</p>
        </div>

        <button onClick={handleLogout} className="dashboard-logout-button">
          Logout
        </button>
      </div>
    </header>
  );
}