// app/dashboard/page.tsx
"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import { getDashboardStats } from "@/app/api/dashboard";
import { useFetchData } from "@/hooks/useFetchData";
import { FiUsers, FiClock, FiDollarSign, FiUserPlus } from "react-icons/fi";

const recentStaff = [
  { name: "John Smith", role: "Senior Developer", initial: "JS" },
  { name: "Sarah Johnson", role: "Marketing Manager", initial: "SJ" },
  { name: "Michael Brown", role: "Sales Executive", initial: "MB" },
];

const recentAttendance = [
  {
    name: "John Smith",
    date: "2026-03-28",
    time: "09:00 - 18:00",
    hours: "9h",
  },
  {
    name: "Sarah Johnson",
    date: "2026-03-28",
    time: "09:15 - 18:30",  
    hours: "9.25h",
  },
  {
    name: "Michael Brown",
    date: "2026-03-28",
    time: "09:00 - 18:00",
    hours: "9h",
  },
];

interface DashboardApiResponse {
  success: boolean;
  data: {
    totalUsers: number;
  };
}

export default function DashboardPage() {
  const { data: response, loading } =
    useFetchData<DashboardApiResponse>(getDashboardStats);

  const totalStaffCount = response?.data?.totalUsers ?? 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Staff"
          value={loading ? "..." : totalStaffCount.toString()}
          subtitle={
            loading ? "Updating..." : `${totalStaffCount} active employees`
          }
          icon={<FiUsers />}
          color="bg-[#2563eb]"
        />
        <StatsCard
          title="Today's Attendance"
          value="3"
          subtitle="60% present"
          icon={<FiClock />}
          color="bg-[#10b981]"
        />
        <StatsCard
          title="Pending Payrolls"
          value="0"
          subtitle="To be processed"
          icon={<FiDollarSign />}
          color="bg-[#eab308]"
        />
        <StatsCard
          title="Active Candidates"
          value="4"
          subtitle="In pipeline"
          icon={<FiUserPlus />}
          color="bg-[#a855f7]"
        />
      </div>

      {/* Bottom Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Staff */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-5">Recent Staff</h3>
          <div className="divide-y divide-gray-100">
            {recentStaff.map((staff, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-[#eff6ff] text-[#2563eb] border border-blue-100">
                    {staff.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {staff.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{staff.role}</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e8fbf2] text-[#10b981] border border-[#d1f7e3] capitalize">
                  active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-5">
            Recent Attendance
          </h3>
          <div className="divide-y divide-gray-100">
            {recentAttendance.map((record, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {record.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{record.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">
                    {record.time}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{record.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
