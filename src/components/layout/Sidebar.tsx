"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiClipboard,
  FiTrendingUp,
  FiUserPlus,
  FiLayers,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

// Define menu config with role permissions
const menu = [
  { name: "Dashboard", path: "/dashboard", icon: FiHome, roles: ["Admin", "Staff"] },
  { name: "Staff", path: "/staff", icon: FiUsers, roles: ["Admin"] },
  { name: "Attendance", path: "/dashboard/attendance", icon: FiCalendar, roles: ["Admin", "Staff"] },
  { name: "Payroll", path: "/dashboard/payroll", icon: FiDollarSign, roles: ["Admin"] },
  { name: "Leave", path: "/dashboard/leave", icon: FiClipboard, roles: ["Admin", "Staff"] },
  { name: "Performance", path: "/dashboard/performance", icon: FiTrendingUp, roles: ["Admin", "Staff"] },
  { name: "Hiring", path: "/dashboard/hiring", icon: FiUserPlus, roles: ["Admin"] },
  { name: "Departments", path: "/dashboard/department", icon: FiLayers, roles: ["Admin"] },
  { name: "Reports", path: "/dashboard/reports", icon: FiBarChart2, roles: ["Admin"] },
  { name: "Settings", path: "/dashboard/setting", icon: FiSettings, roles: ["Admin", "Staff"] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  // Read role safely after mounting on the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole");
      setUserRole(storedRole || "Staff"); // Default fall-back
    }
  }, []);

  // Filter items based on the user's role
  const filteredMenu = menu.filter((item) =>
    userRole ? item.roles.includes(userRole) : false
  );

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col min-h-[calc(100vh-64px)] flex-shrink-0">
      <nav className="flex flex-col gap-1.5 p-4 flex-1">
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.path ||
            (item.path !== "/dashboard" && pathname.startsWith(item.path));

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`group flex items-center gap-3.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer
              ${
                isActive
                  ? "bg-[#eff6ff] text-[#2563eb]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`text-base ${
                  isActive
                    ? "text-[#2563eb]"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Role tag badge at bottom */}
      <div className="p-4 border-t border-gray-100 text-[11px] text-gray-400 font-medium">
        Access Tier: <span className="text-gray-700 font-bold ml-1">{userRole || "Fetching..."}</span>
      </div>
    </aside>
  );
}