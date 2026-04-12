"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Staff", path: "/employees" },
  { name: "Attendance", path: "/attendance" },
  { name: "Payroll", path: "/payroll" },
  { name: "Leave", path: "/leave" },
  { name: "Performance", path: "/performance" },
  { name: "Hiring", path: "/hiring" },
  { name: "Departments", path: "/departments" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-header">
        <h2>HRMS Portal</h2>
        <p>Admin Panel</p>
      </div>

      <nav className="dashboard-sidebar-nav">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`dashboard-nav-link ${
              pathname === item.path ? "active" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="dashboard-sidebar-footer">
        <p>Need help?</p>
        <p className="dashboard-footer-note">support@hrms.com</p>
      </div>
    </aside>
  );
}