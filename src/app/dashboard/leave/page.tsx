"use client";

import { useEffect, useState, useMemo } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

interface LeaveRecord {
  id: number;
  name: string;
  empId: string;
  type: string;
  start: string;
  end: string;
  duration: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

const DEFAULT_LEAVES: LeaveRecord[] = [
  {
    id: 1,
    name: "John Smith",
    empId: "EMP001",
    type: "casual",
    start: "2026-07-01",
    end: "2026-07-03",
    duration: "3 days",
    reason: "Family function",
    status: "pending",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    empId: "EMP002",
    type: "sick",
    start: "2026-06-25",
    end: "2026-06-26",
    duration: "2 days",
    reason: "Medical appointment",
    status: "approved",
  },
  {
    id: 3,
    name: "Michael Brown",
    empId: "EMP003",
    type: "earned",
    start: "2026-07-10",
    end: "2026-07-12",
    duration: "3 days",
    reason: "Vacation",
    status: "pending",
  },
];

const tabs = ["all", "pending", "approved", "rejected"];

export default function LeaveManagementPage() {
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLeaves = localStorage.getItem("hrms_leaves");
      if (storedLeaves) {
        setLeaves(JSON.parse(storedLeaves));
      } else {
        setLeaves(DEFAULT_LEAVES);
        localStorage.setItem("hrms_leaves", JSON.stringify(DEFAULT_LEAVES));
      }
    }
  }, []);

  const saveLeaves = (updated: LeaveRecord[]) => {
    setLeaves(updated);
    localStorage.setItem("hrms_leaves", JSON.stringify(updated));
  };

  const handleApprove = (id: number) => {
    const updated = leaves.map((item) =>
      item.id === id ? { ...item, status: "approved" as const } : item
    );
    saveLeaves(updated);
    toast.success("Leave request approved successfully!");
  };

  const handleReject = (id: number) => {
    const updated = leaves.map((item) =>
      item.id === id ? { ...item, status: "rejected" as const } : item
    );
    saveLeaves(updated);
    toast.error("Leave request rejected.");
  };

  const filteredLeaves = useMemo(() => {
    return activeTab === "all"
      ? leaves
      : leaves.filter((item) => item.status === activeTab);
  }, [leaves, activeTab]);

  const counts = useMemo(() => {
    return {
      all: leaves.length,
      pending: leaves.filter((d) => d.status === "pending").length,
      approved: leaves.filter((d) => d.status === "approved").length,
      rejected: leaves.filter((d) => d.status === "rejected").length,
    };
  }, [leaves]);

  const getLeaveTypeBadgeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case "casual":
        return "bg-purple-50 text-purple-600 border border-purple-100";
      case "sick":
        return "bg-blue-50 text-blue-600 border border-blue-100";
      case "earned":
        return "bg-green-50 text-green-600 border border-green-100";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-100";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6 p-2">
      {/* HEADER */}
      <div>
        <h1 className="text-[2.1rem] font-bold text-[#1f2937] tracking-tight">Leave Management</h1>
        <p className="text-[#6b7280] text-sm mt-1">Manage employee leave requests</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <SummaryCard title="All" value={counts.all} />
        <SummaryCard title="Pending" value={counts.pending} />
        <SummaryCard title="Approved" value={counts.approved} />
        <SummaryCard title="Rejected" value={counts.rejected} />
      </div>

      {/* FILTER AND TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        {/* TABS */}
        <div className="flex bg-gray-100 rounded-full p-1.5 w-full mb-6 border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full text-xs font-bold capitalize transition-all active:scale-[0.98] ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 font-semibold bg-[#f9fafb]">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Leave Type</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">End Date</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 divide-y divide-gray-100">
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    {/* EMPLOYEE */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-gray-500 text-xs">{item.empId}</p>
                      </div>
                    </td>

                    {/* TYPE */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${getLeaveTypeBadgeClass(item.type)}`}>
                        {item.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">{item.start}</td>
                    <td className="px-6 py-4 text-gray-600">{item.end}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{item.duration}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate" title={item.reason}>{item.reason}</td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {item.status === "pending" ? (
                          <>
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="p-1.5 border border-green-500 bg-white hover:bg-green-50 text-green-600 rounded-lg transition active:scale-95"
                              title="Approve"
                            >
                              <FiCheck size={16} />
                            </button>
                            <button
                              onClick={() => handleReject(item.id)}
                              className="p-1.5 border border-red-500 bg-white hover:bg-red-50 text-red-600 rounded-lg transition active:scale-95"
                              title="Reject"
                            >
                              <FiX size={16} />
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 mt-2">{value}</h2>
    </div>
  );
}
