"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiUsers, FiTrendingUp, FiDollarSign, FiCalendar, FiMapPin, FiBriefcase } from "react-icons/fi";

interface DeploymentItem {
  id: number;
  employee: string;
  employeeRole: string;
  client: string;
  clientType: string;
  location: string;
  billingType: string;
  payRate: number;
  billingRate: number;
  profitMargin: number;
  startDate: string;
  status: "Active" | "Inactive";
}

const initialData: DeploymentItem[] = [
  {
    id: 1,
    employee: "John Smith",
    employeeRole: "Senior Developer",
    client: "TechCorp Solutions Pvt. Ltd.",
    clientType: "Information Technology",
    location: "Mumbai, Maharashtra",
    billingType: "Per Employee",
    payRate: 75000,
    billingRate: 120000,
    profitMargin: 37.5,
    startDate: "2024-01-01",
    status: "Active",
  },
  {
    id: 2,
    employee: "Priya Sharma",
    employeeRole: "Full Stack Developer",
    client: "TechCorp Solutions Pvt. Ltd.",
    clientType: "Information Technology",
    location: "Mumbai, Maharashtra",
    billingType: "Per Employee",
    payRate: 65000,
    billingRate: 130000,
    profitMargin: 34.6,
    startDate: "2024-04-01",
    status: "Active",
  },
  {
    id: 3,
    employee: "Sarah Johnson",
    employeeRole: "Marketing Manager",
    client: "Innovate Solutions Ltd.",
    clientType: "Consulting",
    location: "Bengaluru, Karnataka",
    billingType: "Monthly Fixed",
    payRate: 65000,
    billingRate: 95000,
    profitMargin: 31.6,
    startDate: "2023-03-01",
    status: "Active",
  },
  {
    id: 4,
    employee: "Rahul Verma",
    employeeRole: "Financial Analyst",
    client: "Innovate Solutions Ltd.",
    clientType: "Consulting",
    location: "Bengaluru, Karnataka",
    billingType: "Monthly Fixed",
    payRate: 70000,
    billingRate: 100000,
    profitMargin: 30.0,
    startDate: "2024-02-01",
    status: "Active",
  },
  {
    id: 5,
    employee: "Michael Brown",
    employeeRole: "Sales Executive",
    client: "FinanceHub Technologies",
    clientType: "Banking & Finance",
    location: "Pune, Maharashtra",
    billingType: "Per Employee",
    payRate: 55000,
    billingRate: 80000,
    profitMargin: 31.3,
    startDate: "2024-06-01",
    status: "Active",
  },
];

const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<DeploymentItem[]>(initialData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    employee: "",
    client: "",
    project: "",
    location: "",
    billingType: "Per Employee",
    payRate: "",
    billingRate: "",
    startDate: "",
    endDate: "",
    overtimeRate: "0",
    notes: "",
  });

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return deployments.filter((d) =>
      d.employee.toLowerCase().includes(q) ||
      d.client.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q)
    );
  }, [deployments, search]);

  const activeDeployments = deployments.length;
  const monthlyBilling = deployments.reduce((sum, item) => sum + item.billingRate, 0);
  const monthlyPayroll = deployments.reduce((sum, item) => sum + item.payRate, 0);
  const avgProfitMargin =
    deployments.length > 0
      ? deployments.reduce((sum, item) => sum + item.profitMargin, 0) / deployments.length
      : 0;

  const openCreateModal = () => {
    setEditId(null);
    setForm({
      employee: "",
      client: "",
      project: "",
      location: "",
      billingType: "Per Employee",
      payRate: "",
      billingRate: "",
      startDate: "",
      endDate: "",
      overtimeRate: "0",
      notes: "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const nextItem: DeploymentItem = {
      id: editId ?? Date.now(),
      employee: form.employee || "New Employee",
      employeeRole: "Deployment Role",
      client: form.client || "New Client",
      clientType: "Information Technology",
      location: form.location || "Remote",
      billingType: form.billingType,
      payRate: Number(form.payRate || 0),
      billingRate: Number(form.billingRate || 0),
      profitMargin: 33.3,
      startDate: form.startDate || new Date().toISOString().slice(0, 10),
      status: "Active",
    };

    if (editId) {
      setDeployments((prev) => prev.map((item) => (item.id === editId ? { ...item, ...nextItem } : item)));
    } else {
      setDeployments((prev) => [nextItem, ...prev]);
    }

    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setDeployments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900 tracking-tight">Deployments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage employee-to-client deployments</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b0f19] text-white text-sm font-semibold shadow-sm hover:bg-[#1f2937] transition"
        >
          <FiPlus className="w-4 h-4" />
          New Deployment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard icon={<FiUsers />} label="Active Deployments" value={String(activeDeployments)} tone="blue" />
        <StatCard icon={<FiTrendingUp />} label="Monthly Billing" value={`₹${(monthlyBilling / 100000).toFixed(1)}L`} tone="green" />
        <StatCard icon={<FiDollarSign />} label="Monthly Payroll" value={`₹${(monthlyPayroll / 100000).toFixed(1)}L`} tone="purple" />
        <StatCard icon={<FiTrendingUp />} label="Avg Profit Margin" value={`${avgProfitMargin.toFixed(1)}%`} tone="amber" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by employee or client..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40 text-gray-600">
                <th className="px-6 py-3.5 font-semibold">Employee</th>
                <th className="px-6 py-3.5 font-semibold">Client</th>
                <th className="px-6 py-3.5 font-semibold">Location</th>
                <th className="px-6 py-3.5 font-semibold">Billing Type</th>
                <th className="px-6 py-3.5 font-semibold">Pay Rate</th>
                <th className="px-6 py-3.5 font-semibold">Billing Rate</th>
                <th className="px-6 py-3.5 font-semibold">Profit Margin</th>
                <th className="px-6 py-3.5 font-semibold">Start Date</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-gray-500">No deployments found.</td>
                </tr>
              ) : (
                filtered.map((d) => (
                  <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50/60">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#eff6ff] text-[#2563eb] font-bold text-[11px] flex items-center justify-center">
                          {d.employee.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{d.employee}</div>
                          <div className="text-xs text-gray-500">{d.employeeRole}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{d.client}</div>
                      <div className="text-xs text-gray-500">{d.clientType}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <div className="flex items-center gap-2"><FiMapPin className="text-gray-400" /> {d.location}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{d.billingType}</td>
                    <td className="px-6 py-4 text-gray-700">{currency(d.payRate)}</td>
                    <td className="px-6 py-4 text-gray-700">{currency(d.billingRate)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-semibold">
                        {d.profitMargin}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{d.startDate}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-semibold">
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="View"><FiEye className="w-4 h-4" /></button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="Edit"><FiEdit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(d.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500" title="Delete"><FiTrash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/35 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">{editId ? "Edit Deployment" : "New Employee Deployment"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">Employee *</span>
                  <select value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                    <option value="">Select employee</option>
                    <option value="John Smith">John Smith</option>
                    <option value="Priya Sharma">Priya Sharma</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Rahul Verma">Rahul Verma</option>
                  </select>
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">Client *</span>
                  <select value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                    <option value="">Select client</option>
                    <option value="TechCorp Solutions Pvt. Ltd.">TechCorp Solutions Pvt. Ltd.</option>
                    <option value="Innovate Solutions Ltd.">Innovate Solutions Ltd.</option>
                    <option value="FinanceHub Technologies">FinanceHub Technologies</option>
                  </select>
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">Project / Work Site *</span>
                  <input value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Project name" />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">Location *</span>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="City, State" />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">Start Date *</span>
                  <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">End Date</span>
                  <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">Billing Type *</span>
                  <select value={form.billingType} onChange={(e) => setForm({ ...form, billingType: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                    <option>Per Employee</option>
                    <option>Monthly Fixed</option>
                    <option>Hourly</option>
                    <option>Custom</option>
                  </select>
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">Overtime Rate (₹/hr)</span>
                  <input type="number" value={form.overtimeRate} onChange={(e) => setForm({ ...form, overtimeRate: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">Employee Pay Rate (₹/mo) *</span>
                  <input type="number" value={form.payRate} onChange={(e) => setForm({ ...form, payRate: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1.5">Client Billing Rate (₹/mo) *</span>
                  <input type="number" value={form.billingRate} onChange={(e) => setForm({ ...form, billingRate: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                </label>
              </div>

              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1.5">Notes</span>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={4} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Add notes about the engagement" />
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} className="px-5 py-2.5 rounded-xl bg-[#0b0f19] text-white hover:bg-[#1f2937]">
                  {editId ? "Update Deployment" : "Create Deployment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "blue" | "green" | "purple" | "amber" }) {
  const map = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${map[tone]}`}>{icon}</div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}
