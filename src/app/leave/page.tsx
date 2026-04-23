"use client";

import { useState } from "react";

const data = [
  {
    id: 1,
    name: "John Smith",
    empId: "EMP001",
    type: "casual",
    start: "2026-04-01",
    end: "2026-04-03",
    duration: "3 days",
    reason: "Family function",
    status: "pending",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    empId: "EMP002",
    type: "sick",
    start: "2026-03-25",
    end: "2026-03-26",
    duration: "2 days",
    reason: "Medical appointment",
    status: "approved",
  },
  {
    id: 3,
    name: "Michael Brown",
    empId: "EMP003",
    type: "earned",
    start: "2026-04-10",
    end: "2026-04-12",
    duration: "3 days",
    reason: "Vacation",
    status: "pending",
  },
];

const tabs = ["all", "pending", "approved", "rejected"];

export default function LeavePage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredData =
    activeTab === "all"
      ? data
      : data.filter((item) => item.status === activeTab);

  return (
    <div className="space-y-6">
      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Leave Management</h1>
        <p className="text-gray-500">
          Manage employee leave requests
        </p>
      </div>

      {/* 🔥 SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <Card title="All" value={data.length} />
        <Card
          title="Pending"
          value={data.filter((d) => d.status === "pending").length}
        />
        <Card
          title="Approved"
          value={data.filter((d) => d.status === "approved").length}
        />
        <Card
          title="Rejected"
          value={data.filter((d) => d.status === "rejected").length}
        />
      </div>

      {/* 🔥 TABLE CARD */}
      <div className="bg-white rounded-xl p-4">
        
        {/* TABS */}
        <div className="flex bg-gray-100 rounded-full p-1 w-fit mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1 rounded-full text-sm capitalize transition
                ${
                  activeTab === tab
                    ? "bg-white shadow text-black"
                    : "text-gray-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-left">
              <tr>
                <th className="py-3">Employee</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b">
                  
                  {/* EMPLOYEE */}
                  <td className="py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-400 text-xs">
                        {item.empId}
                      </p>
                    </div>
                  </td>

                  {/* TYPE */}
                  <td>
                    <span className={`badge ${item.type}`}>
                      {item.type}
                    </span>
                  </td>

                  <td>{item.start}</td>
                  <td>{item.end}</td>
                  <td>{item.duration}</td>
                  <td>{item.reason}</td>

                  {/* STATUS */}
                  <td>
                    <span className={`status ${item.status}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="flex gap-2">
                    {item.status === "pending" && (
                      <>
                        <button className="action-btn approve">
                          ✓
                        </button>
                        <button className="action-btn reject">
                          ✕
                        </button>
                      </>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 🔹 CARD COMPONENT */
function Card({ title, value }: any) {
  return (
    <div className="bg-white rounded-xl p-4 text-center">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold">{value}</h2>
    </div>
  );
}