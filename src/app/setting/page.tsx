"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiBell,
  FiBriefcase,
  FiClock,
  FiLock,
  FiSave,
} from "react-icons/fi";

type Tab = "company" | "attendance" | "notifications" | "payroll";

export default function SettingsPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("company");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole") || "Staff";
      setUserRole(storedRole);
      if (storedRole !== "Admin") {
        router.push("/dashboard");
      }
    }
  }, [router]);

  const tabs = [
    { id: "company", label: "Company", icon: <FiBriefcase className="w-3.5 h-3.5" /> },
    { id: "attendance", label: "Attendance", icon: <FiClock className="w-3.5 h-3.5" /> },
    { id: "notifications", label: "Notifications", icon: <FiBell className="w-3.5 h-3.5" /> },
    { id: "payroll", label: "Payroll", icon: <FiLock className="w-3.5 h-3.5" /> },
  ];

  if (userRole === null) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 text-sm">Loading settings...</p>
      </div>
    );
  }

  if (userRole !== "Admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-500 text-sm">
          You do not have permission to access the System Settings page.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          System Settings
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Configure system-wide settings and preferences
        </p>
      </div>

      {/* TABS */}
      <div className="inline-flex bg-gray-100 p-1 rounded-xl gap-0.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer
              ${
                activeTab === tab.id
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* CARD */}
      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        {/* COMPANY TAB */}
        {activeTab === "company" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900">
              Company Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="HRMS Corporation"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Company Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@hrms.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Company Phone
                </label>
                <input
                  type="text"
                  defaultValue="+1234567890"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Company Address
              </label>
              <textarea
                rows={3}
                defaultValue="123 Business St, City, State 12345"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-[#0b0f19] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1f2937] transition cursor-pointer shadow-sm">
                <FiSave className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === "attendance" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900">
              Attendance Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Office Start Time
                </label>
                <input
                  type="time"
                  defaultValue="09:00"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Office End Time
                </label>
                <input
                  type="time"
                  defaultValue="18:00"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Late Mark After
                </label>
                <input
                  type="text"
                  defaultValue="15 Minutes"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Working Days
                </label>
                <input
                  type="text"
                  defaultValue="Monday - Friday"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-[#0b0f19] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1f2937] transition cursor-pointer shadow-sm">
                <FiSave className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900">
              Notification Settings
            </h2>

            <div className="space-y-4">
              {[
                "Email Notifications",
                "Push Notifications",
                "Leave Request Alerts",
                "Payroll Alerts",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border border-gray-100 rounded-xl p-5"
                >
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">{item}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Enable or disable {item.toLowerCase()}
                    </p>
                  </div>

                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#0b0f19] peer-checked:after:translate-x-full" />
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-[#0b0f19] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1f2937] transition cursor-pointer shadow-sm">
                <FiSave className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* PAYROLL TAB */}
        {activeTab === "payroll" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900">
              Payroll Configuration
            </h2>

            {/* PF Contribution Rate */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                PF Contribution Rate (%)
              </label>
              <input
                type="number"
                defaultValue="12"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
              />
              <p className="text-xs text-[#2563eb] mt-1.5 font-medium">
                Both employer and employee contribution rate
              </p>
            </div>

            {/* Tax Slabs */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Tax Slabs (%)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Basic (0-50K)
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Medium (50K-100K)
                  </label>
                  <input
                    type="number"
                    defaultValue="20"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    High (100K+)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-[#0b0f19] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1f2937] transition cursor-pointer shadow-sm">
                <FiSave className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}