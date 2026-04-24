// app/dashboard/page.tsx
"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { FiUsers, FiDollarSign, FiPlus } from "react-icons/fi";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // if (!getToken()) {
    //   router.push("/auth/login");
    // }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Dashboard</h2>
      <p className="text-gray-500 mb-6">
        Welcome back! Here's what's happening today.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Staff"
          value="5"
          subtitle="5 active"
         icon={<FiUsers />}
          color="bg-blue-500"
        />
        <StatsCard
          title="Today's Attendance"
          value="3"
          subtitle="60% present"
            icon={<FiUsers />}
          color="bg-green-500"
        />
        <StatsCard
          title="Pending Payrolls"
          value="0"
          subtitle="To be processed"
          color="bg-yellow-500"
        />
        <StatsCard
          title="Active Candidates"
          value="4"
          subtitle="In pipeline"
          color="bg-purple-500"
        />
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">Recent Staff</h3>
          <p>John Smith - Senior Developer</p>
          <p>Sarah Johnson - Marketing Manager</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">Recent Attendance</h3>
          <p>John Smith - 09:00 - 18:00</p>
          <p>Sarah Johnson - 09:15 - 18:30</p>
        </div>
      </div>
    </div>
  );
}
