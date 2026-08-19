"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiStar,
  FiUserPlus,
  FiLayers,
  FiBriefcase,
  FiFileText,
  FiCreditCard,
  FiBarChart2,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";

type MenuItem = {
  name: string;
  path: string;
  icon: any;
  roles: string[];
};

type MenuGroup = {
  name: string;
  icon: any;
  roles: string[];
  children: MenuItem[];
};

// ===============================
// HR MENU
// ===============================
const hrMenu: MenuItem[] = [
  {
    name: "Employees",
    path: "/staff",
    icon: FiUsers,
    roles: ["Admin"],
  },
  {
    name: "Attendance",
    path: "/dashboard/attendance",
    icon: FiClock,
    roles: ["Admin", "Staff"],
  },
  {
    name: "Payroll",
    path: "/dashboard/payroll",
    icon: FiDollarSign,
    roles: ["Admin"],
  },
  {
    name: "Leave",
    path: "/dashboard/leave",
    icon: FiCalendar,
    roles: ["Admin", "Staff"],
  },
  {
    name: "Performance",
    path: "/dashboard/performance",
    icon: FiStar,
    roles: ["Admin", "Staff"],
  },
  {
    name: "Hiring",
    path: "/dashboard/hiring",
    icon: FiUserPlus,
    roles: ["Admin"],
  },
  {
    name: "Departments",
    path: "/dashboard/department",
    icon: FiLayers,
    roles: ["Admin"],
  },
];

// ===============================
// CLIENT MENU
// ===============================
const clientMenu: MenuItem[] = [
  {
    name: "Clients",
    path: "/dashboard/clients",
    icon: FiBriefcase,
    roles: ["Admin"],
  },
  {
    name: "Deployments",
    path: "/dashboard/deployments",
    icon: FiUsers,
    roles: ["Admin"],
  },
  {
    name: "Contracts",
    path: "/dashboard/contracts",
    icon: FiFileText,
    roles: ["Admin"],
  },
  {
    name: "Billing",
    path: "/dashboard/billing",
    icon: FiCreditCard,
    roles: ["Admin"],
  },
];

// ===============================
// STANDALONE MENU
// ===============================
const standaloneMenu: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
    roles: ["Admin", "Staff"],
  },
  {
    name: "Meetings",
    path: "/dashboard/meetings",
    icon: FiCalendar,
    roles: ["Admin", "Staff"],
  },
  {
    name: "Timesheet",
    path: "/dashboard/timesheet",
    icon: FiFileText,
    roles: ["Admin", "Staff"],
  },
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: FiBarChart2,
    roles: ["Admin"],
  },
  {
    name: "Settings",
    path: "/dashboard/setting",
    icon: FiSettings,
    roles: ["Admin", "Staff"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [userRole, setUserRole] = useState<string | null>(null);

  // HR and Client open by default
  const [openHR, setOpenHR] = useState(true);
  const [openClient, setOpenClient] = useState(true);

  // ===============================
  // GET USER ROLE
  // ===============================
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole");

      setUserRole(storedRole || "Staff");
    }
  }, []);

  // ===============================
  // CHECK ACTIVE ROUTE
  // ===============================
  const isActive = (path: string) => {
    return (
      pathname === path ||
      (path !== "/dashboard" && pathname.startsWith(path))
    );
  };

  // ===============================
  // FILTER BY ROLE
  // ===============================
  const filteredHR = hrMenu.filter((item) =>
    userRole ? item.roles.includes(userRole) : false
  );

  const filteredClient = clientMenu.filter((item) =>
    userRole ? item.roles.includes(userRole) : false
  );

  const filteredStandalone = standaloneMenu.filter((item) =>
    userRole ? item.roles.includes(userRole) : false
  );

  // ===============================
  // MENU ITEM COMPONENT
  // ===============================
  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon;
    const active = isActive(item.path);

    return (
      <Link
        key={item.name}
        href={item.path}
        className={`
          group flex items-center gap-3
          px-3 py-2.5
          rounded-xl
          text-[14px]
          font-medium
          transition-all duration-200
          ${
            active
              ? "bg-[#eff6ff] text-[#2563eb]"
              : "text-[#334155] hover:bg-gray-50 hover:text-[#111827]"
          }
        `}
      >
        <Icon
          size={18}
          strokeWidth={1.7}
          className={`
            flex-shrink-0
            ${
              active
                ? "text-[#2563eb]"
                : "text-[#475569] group-hover:text-[#2563eb]"
            }
          `}
        />

        <span>{item.name}</span>
      </Link>
    );
  };

  // ===============================
  // GROUP COMPONENT
  // ===============================
  const renderGroup = (
    groupName: string,
    GroupIcon: any,
    items: MenuItem[],
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (items.length === 0) return null;

    const groupActive = items.some((item) => isActive(item.path));

    return (
      <div className="mb-1">
        {/* Group Header */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full
            flex
            items-center
            justify-between
            px-4
            py-2.5
            rounded-xl
            text-[14px]
            font-medium
            transition-all
            ${
              groupActive
                ? "bg-[#eff6ff] text-[#2563eb]"
                : "text-[#334155] hover:bg-gray-50"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <GroupIcon
              size={19}
              strokeWidth={1.7}
              className={
                groupActive ? "text-[#2563eb]" : "text-[#475569]"
              }
            />

            <span>{groupName}</span>
          </div>

          <FiChevronDown
            size={16}
            className={`
              transition-transform duration-200
              ${isOpen ? "rotate-0" : "-rotate-90"}
            `}
          />
        </button>

        {/* Children */}
        {isOpen && (
          <div className="relative ml-5 mt-1 pl-2 border-l border-[#e5e7eb]">
            <div className="space-y-0.5">
              {items.map((item) => renderMenuItem(item))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-[228px] h-screen bg-white border-r border-[#e5e7eb] flex flex-col">

      {/* ===============================
          SIDEBAR MENU
      =============================== */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">

        {/* DASHBOARD */}
        {filteredStandalone
          .filter((item) => item.name === "Dashboard")
          .map((item) => (
            <div key={item.name} className="mb-2">
              {renderMenuItem(item)}
            </div>
          ))}

        {/* ===============================
            HR
        =============================== */}
        {renderGroup(
          "HR",
          FiUsers,
          filteredHR,
          openHR,
          setOpenHR
        )}

        {/* ===============================
            CLIENT
        =============================== */}
        {renderGroup(
          "Client",
          FiBriefcase,
          filteredClient,
          openClient,
          setOpenClient
        )}

        {/* ===============================
            OTHER MENU ITEMS
        =============================== */}
        <div className="mt-1 space-y-0.5">
          {filteredStandalone
            .filter((item) => item.name !== "Dashboard")
            .map((item) => renderMenuItem(item))}
        </div>
      </nav>

      {/* ===============================
          ROLE FOOTER
      =============================== */}
      <div className="px-4 py-3 border-t border-[#f1f5f9] text-[11px] text-gray-400">
        Access Tier:

        <span className="ml-1 font-semibold text-gray-700">
          {userRole || "Fetching..."}
        </span>
      </div>
    </aside>
  );
}