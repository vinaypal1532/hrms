"use client";

import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiCheck, FiClock, FiSend, FiPlus, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

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

const DEFAULT_ROWS: TimesheetRow[] = [
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
  const [activeTab, setActiveTab] = useState<"My Timesheets" | "All (Public)">("My Timesheets");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timesheets, setTimesheets] = useState<TimesheetRow[]>([]);
  const [user, setUser] = useState({
    name: "John Smith",
    role: "Staff",
    email: "john@hrms.com",
  });

  // Load user info and timesheets
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName") || "John Smith";
      const storedRole = localStorage.getItem("userRole") || "Staff";
      const storedEmail = localStorage.getItem("userEmail") || "john@hrms.com";
      setUser({ name: storedName, role: storedRole, email: storedEmail });

      // Automatically set active tab for Admin to "All (Public)"
      if (storedRole === "Admin") {
        setActiveTab("All (Public)");
      }

      const storedTimesheets = localStorage.getItem("hrms_timesheets");
      if (storedTimesheets) {
        setTimesheets(JSON.parse(storedTimesheets));
      } else {
        setTimesheets(DEFAULT_ROWS);
        localStorage.setItem("hrms_timesheets", JSON.stringify(DEFAULT_ROWS));
      }
    }
  }, []);

  const saveTimesheets = (updated: TimesheetRow[]) => {
    setTimesheets(updated);
    localStorage.setItem("hrms_timesheets", JSON.stringify(updated));
  };

  // Form states
  const [formDate, setFormDate] = useState(new Date().toISOString().split("T")[0]);
  const [formHours, setFormHours] = useState("");
  const [formProject, setFormProject] = useState("");
  const [formTask, setFormTask] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.toLowerCase();
    return timesheets.filter((row) => {
      // Role & Tab filter
      const isOwnRecord = row.employee.toLowerCase() === user.name.toLowerCase();
      if (user.role !== "Admin") {
        if (activeTab === "My Timesheets" && !isOwnRecord) return false;
        if (activeTab === "All (Public)" && isOwnRecord) return false;
      }

      // Status filter
      const matchesStatus = statusFilter === "All Status" || row.status === statusFilter;
      if (!matchesStatus) return false;

      // Text search filter
      const matchesSearch =
        row.employee.toLowerCase().includes(q) ||
        row.project.toLowerCase().includes(q) ||
        row.task.toLowerCase().includes(q);

      return matchesSearch;
    });
  }, [timesheets, search, statusFilter, activeTab, user]);

  // Compute metrics (based on own timesheets for Staff/HR, or all for Admin)
  const stats = useMemo(() => {
    const relevant = timesheets.filter((row) =>
      user.role === "Admin" ? true : row.employee.toLowerCase() === user.name.toLowerCase()
    );

    const pending = relevant.filter((row) => row.status === "Submitted").length;
    const approved = relevant.filter((row) => row.status === "Approved").length;
    const totalHours = relevant.reduce((sum, row) => sum + row.hours, 0);

    return { pending, approved, totalHours };
  }, [timesheets, user]);

  const handleAddWorkSummary = (status: "Submitted" | "Draft") => {
    if (!formDate || !formHours || !formProject || !formTask || !formDescription) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const hoursNum = parseFloat(formHours);
    if (isNaN(hoursNum) || hoursNum <= 0) {
      toast.error("Hours worked must be a positive number.");
      return;
    }

    const newRecord: TimesheetRow = {
      id: Date.now(),
      employee: user.name,
      role: user.role === "Admin" ? "Management" : user.role === "HR" ? "HR Department" : "Engineering",
      date: formDate,
      project: formProject,
      task: formTask,
      hours: hoursNum,
      description: formDescription,
      status,
    };

    saveTimesheets([newRecord, ...timesheets]);
    toast.success(status === "Submitted" ? "Work summary submitted successfully!" : "Saved as draft.");
    setIsModalOpen(false);

    // Reset Form
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormHours("");
    setFormProject("");
    setFormTask("");
    setFormDescription("");
  };

  const handleApprove = (id: number) => {
    const updated = timesheets.map((row) => (row.id === id ? { ...row, status: "Approved" as const } : row));
    saveTimesheets(updated);
    toast.success("Timesheet entry approved!");
  };

  const handleReject = (id: number) => {
    const updated = timesheets.map((row) => (row.id === id ? { ...row, status: "Draft" as const } : row));
    saveTimesheets(updated);
    toast.error("Timesheet entry rejected (sent back to Draft).");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      const updated = timesheets.filter((row) => row.id !== id);
      saveTimesheets(updated);
      toast.success("Timesheet entry deleted successfully!");
    }
  };

  return (
    <div className="space-y-6 p-2">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[2.1rem] font-bold text-[#1f2937] tracking-tight">Timesheet</h1>
          <p className="mt-1 text-[1.05rem] text-[#6b7280]">Submit your daily work summary</p>
        </div>

        {/* Add Work Summary button (available to all roles) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-gray-800 transition active:scale-[0.98]"
        >
          <FiPlus className="w-4 h-4" />
          Add Work Summary
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard
          icon={<FiClock className="text-[#2563eb]" />}
          value={`${stats.totalHours.toFixed(1)}h`}
          label="Total Hours Logged"
          accent="blue"
        />
        <MetricCard
          icon={<FiCheck className="text-[#22c55e]" />}
          value={stats.approved}
          label="Approved Entries"
          accent="green"
        />
        <MetricCard
          icon={<FiSend className="text-[#e28743]" />}
          value={stats.pending}
          label="Pending Approval"
          accent="orange"
        />
      </div>

      {/* TABS (For non-admin users) */}
      {user.role !== "Admin" && (
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("My Timesheets")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition ${
              activeTab === "My Timesheets"
                ? "bg-[#0b0f19] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            My Timesheets
          </button>
          <button
            onClick={() => setActiveTab("All (Public)")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition ${
              activeTab === "All (Public)"
                ? "bg-[#0b0f19] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            All (Public)
          </button>
        </div>
      )}

      {/* SEARCH AND TABLE */}
      <div className="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-4 p-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by employee, project or task..."
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
                {(user.role === "Admin" || activeTab === "All (Public)") && (
                  <th className="px-6 py-4 font-semibold">Employee</th>
                )}
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
                filteredRows.map((row) => {
                  const isOwnRecord = row.employee.toLowerCase() === user.name.toLowerCase();
                  return (
                    <tr key={row.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition">
                      {(user.role === "Admin" || activeTab === "All (Public)") && (
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
                      )}
                      <td className="px-6 py-4 text-[#374151]">{row.date}</td>
                      <td className="px-6 py-4 text-[#374151]">{row.project}</td>
                      <td className="px-6 py-4 text-[#374151]">{row.task}</td>
                      <td className="px-6 py-4 text-[#374151] font-semibold">{row.hours}h</td>
                      <td className="px-6 py-4 text-[#374151] max-w-[240px] truncate" title={row.description}>
                        {row.description}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.role === "Admin" && row.status === "Submitted" && (
                            <>
                              <button
                                onClick={() => handleApprove(row.id)}
                                className="rounded-lg bg-[#22c55e] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#16a34a] transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(row.id)}
                                className="rounded-lg bg-[#ef4444] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#dc2626] transition"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {isOwnRecord && (row.status === "Draft" || row.status === "Submitted") && (
                            <button
                              onClick={() => handleDelete(row.id)}
                              className="rounded-lg border border-red-200 text-red-600 px-2.5 py-1.5 text-xs font-medium hover:bg-red-50 transition"
                            >
                              Delete
                            </button>
                          )}
                          {(!isOwnRecord || row.status === "Approved") && !(user.role === "Admin" && row.status === "Submitted") && (
                            <span className="text-xs text-[#6b7280]">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD DAILY WORK SUMMARY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Add Daily Work Summary</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl transition"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Hours Worked *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8"
                    value={formHours}
                    onChange={(e) => setFormHours(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Project / Client *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TechCorp API Integration"
                  value={formProject}
                  onChange={(e) => setFormProject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Task *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Backend development, Code review"
                  value={formTask}
                  onChange={(e) => setFormTask(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Work Description *
                </label>
                <textarea
                  required
                  placeholder="Describe what you worked on today in detail..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800 h-28 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition text-sm active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleAddWorkSummary("Draft")}
                  className="flex-1 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition text-sm active:scale-[0.98]"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleAddWorkSummary("Submitted")}
                  className="flex-1 py-3 bg-black text-white hover:bg-gray-800 rounded-xl font-semibold transition text-sm shadow-sm active:scale-[0.98]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
  accent: "blue" | "green" | "orange";
}) {
  const accentMap = {
    blue: "bg-[#eff6ff] border-[#dbeafe]",
    green: "bg-[#ecfdf5] border-[#d1fae5]",
    orange: "bg-[#fffaf0] border-[#fee2e2]",
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
