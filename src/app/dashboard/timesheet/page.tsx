"use client";

import { useMemo, useState } from "react";
import { FiSearch, FiCheck, FiClock, FiSend, FiX } from "react-icons/fi";

interface TimesheetRow {
  id: number;
  employee: string;
  role: string;
  date: string;
  project: string;
  task: string;
  hours: number;
  description: string;
  status: "Approved" | "Submitted" | "Draft";
}

const rows: TimesheetRow[] = [
  {
    id: 1,
    employee: "John Smith",
    role: "Engineering",
    date: "2026-07-28",
    project: "TechCorp API Integration",
    task: "Backend development",
    hours: 8,
    description: "Completed REST API endpoints for user auth and project modules.",
    status: "Approved",
  },
  {
    id: 2,
    employee: "John Smith",
    role: "Engineering",
    date: "2026-07-29",
    project: "TechCorp API Integration",
    task: "Code review & bug fixes",
    hours: 7.5,
    description: "Reviewed PRs from team. Fixed 3 critical bugs in the reporting module.",
    status: "Approved",
  },
  {
    id: 3,
    employee: "Sarah Johnson",
    role: "Marketing",
    date: "2026-07-28",
    project: "Innovate Solutions Campaign",
    task: "Campaign strategy",
    hours: 8,
    description: "Drafted Q3 digital marketing strategy presentation for stakeholders.",
    status: "Submitted",
  },
  {
    id: 4,
    employee: "John Smith",
    role: "Engineering",
    date: "2026-07-30",
    project: "Internal HRMS",
    task: "Feature development",
    hours: 6,
    description: "Working on timesheet module integration and QA improvements.",
    status: "Draft",
  },
];

export default function TimesheetPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredRows = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter((row) => {
      const matchesSearch =
        row.employee.toLowerCase().includes(q) ||
        row.project.toLowerCase().includes(q) ||
        row.task.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "All Status" || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const pending = rows.filter((row) => row.status === "Submitted").length;
  const approved = rows.filter((row) => row.status === "Approved").length;
  const todayHours = rows.reduce((sum, row) => sum + row.hours, 0);

  return (
    <div className="space-y-6 p-1">
      <div>
        <h1 className="text-[2.1rem] font-bold text-[#1f2937] tracking-tight">Timesheet</h1>
        <p className="mt-1 text-[1.05rem] text-[#6b7280]">Review and approve staff daily work summaries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard
          icon={<FiSend className="text-[#2563eb]" />}
          value={pending}
          label="Pending Review"
          accent="blue"
        />
        <MetricCard
          icon={<FiCheck className="text-[#22c55e]" />}
          value={approved}
          label="Approved"
          accent="green"
        />
        <MetricCard
          icon={<FiClock className="text-[#8b5cf6]" />}
          value={`${todayHours.toFixed(0)}h`}
          label="Hours Logged Today"
          accent="purple"
        />
      </div>

      <div className="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-4 p-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by employee or project..."
              className="w-full rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] py-3 pl-11 pr-4 text-sm text-[#111827] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option>All Status</option>
            <option>Approved</option>
            <option>Submitted</option>
            <option>Draft</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb] text-[#374151]">
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Project</th>
                <th className="px-6 py-4 font-semibold">Task</th>
                <th className="px-6 py-4 font-semibold">Hours</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[#6b7280]">
                    No timesheet entries found.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e0e7ff] text-[11px] font-bold text-[#3b82f6]">
                          {row.employee
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-[#111827]">{row.employee}</div>
                          <div className="text-xs text-[#6b7280]">{row.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#374151]">{row.date}</td>
                    <td className="px-6 py-4 text-[#374151]">{row.project}</td>
                    <td className="px-6 py-4 text-[#374151]">{row.task}</td>
                    <td className="px-6 py-4 text-[#374151]">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#cbd5e1] text-[10px] text-[#64748b]">
                          ◌
                        </span>
                        {row.hours}h
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#374151] max-w-[240px] truncate">{row.description}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-6 py-4">
                      {row.status === "Submitted" ? (
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg bg-[#2563eb] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#1d4ed8]">
                            Approve
                          </button>
                          <button className="rounded-lg bg-[#ef4444] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#dc2626]">
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-[#6b7280]">—</span>
                      )}
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

function MetricCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accent: "blue" | "green" | "purple";
}) {
  const accentMap = {
    blue: "bg-[#eff6ff] border-[#dbeafe]",
    green: "bg-[#ecfdf5] border-[#d1fae5]",
    purple: "bg-[#f5f3ff] border-[#e9d5ff]",
  };

  return (
    <div className={`flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm ${accentMap[accent]}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-sm">
        {icon}
      </div>
      <div>
        <div className="text-[2rem] font-bold leading-none text-[#111827]">{value}</div>
        <div className="mt-1 text-sm text-[#6b7280]">{label}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: TimesheetRow["status"] }) {
  const statusClasses = {
    Approved: "bg-[#dcfce7] text-[#15803d]",
    Submitted: "bg-[#dbeafe] text-[#1d4ed8]",
    Draft: "bg-[#f3f4f6] text-[#6b7280]",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}>
      {status}
    </span>
  );
}
