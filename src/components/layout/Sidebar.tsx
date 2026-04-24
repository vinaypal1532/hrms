"use client";

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

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: FiHome },
  { name: "Staff", path: "/employees", icon: FiUsers },
  { name: "Attendance", path: "/attendance", icon: FiCalendar },
  { name: "Payroll", path: "/payroll", icon: FiDollarSign },
  { name: "Leave", path: "/leave", icon: FiClipboard },
  { name: "Performance", path: "/performance", icon: FiTrendingUp },
  { name: "Hiring", path: "/hiring", icon: FiUserPlus },
  { name: "Departments", path: "/department", icon: FiLayers },
  { name: "Reports", path: "/reports", icon: FiBarChart2 },
  { name: "Settings", path: "/settings", icon: FiSettings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white flex flex-col">
      
      <nav className="flex flex-col gap-1 p-3">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`text-lg ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-700"
                }`}
              />

              <span>{item.name}</span>

              {isActive && (
                <span className="ml-auto w-1.5 h-6 bg-blue-600 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}