"use client";

import { useMemo, useState } from "react";
import { FiSearch, FiDownload, FiEye, FiDollarSign, FiCheckCircle, FiClock, FiAlertTriangle } from "react-icons/fi";

interface InvoiceItem {
  id: number;
  invoiceNumber: string;
  client: string;
  period: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Sent" | "Overdue" | "Draft";
}

const initialInvoices: InvoiceItem[] = [
  {
    id: 1,
    invoiceNumber: "INV-2026-001",
    client: "TechCorp Solutions Pvt. Ltd.",
    period: "May 2026",
    amount: 250000,
    dueDate: "2026-06-15",
    status: "Paid",
  },
  {
    id: 2,
    invoiceNumber: "INV-2026-002",
    client: "Innovate Solutions Ltd.",
    period: "May 2026",
    amount: 380000,
    dueDate: "2026-06-15",
    status: "Sent",
  },
  {
    id: 3,
    invoiceNumber: "INV-2026-003",
    client: "FinanceHub Technologies",
    period: "May 2026",
    amount: 80000,
    dueDate: "2026-06-01",
    status: "Overdue",
  },
  {
    id: 4,
    invoiceNumber: "INV-2026-004",
    client: "TechCorp Solutions Pvt. Ltd.",
    period: "June 2026",
    amount: 250000,
    dueDate: "2026-07-15",
    status: "Draft",
  },
];

const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function BillingPage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>(initialInvoices);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return invoices.filter((invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(q) ||
      invoice.client.toLowerCase().includes(q)
    );
  }, [invoices, search]);

  const totalCollected = invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0);
  const pending = invoices.filter((i) => i.status === "Sent").reduce((sum, i) => sum + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0);
  const draft = invoices.filter((i) => i.status === "Draft").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900 tracking-tight">Billing & Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">Track client invoices and payment status</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b0f19] text-white text-sm font-semibold shadow-sm hover:bg-[#1f2937] transition">
          <FiDollarSign className="w-4 h-4" />
          Generate Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard icon={<FiCheckCircle />} label="Total Collected" value={`₹${(totalCollected / 100000).toFixed(1)}L`} tone="green" />
        <StatCard icon={<FiClock />} label="Pending" value={`₹${(pending / 100000).toFixed(1)}L`} tone="blue" />
        <StatCard icon={<FiAlertTriangle />} label="Overdue" value={`₹${(overdue / 100000).toFixed(1)}K`} tone="red" />
        <StatCard icon={<FiDollarSign />} label="Draft" value={`₹${(draft / 100000).toFixed(1)}L`} tone="amber" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40 text-gray-600">
                <th className="px-6 py-3.5 font-semibold">Invoice #</th>
                <th className="px-6 py-3.5 font-semibold">Client</th>
                <th className="px-6 py-3.5 font-semibold">Period</th>
                <th className="px-6 py-3.5 font-semibold">Amount</th>
                <th className="px-6 py-3.5 font-semibold">Due Date</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500">No invoices found.</td></tr>
              ) : (
                filtered.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50/60">
                    <td className="px-6 py-4">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#eff6ff] text-[#2563eb] font-bold text-[11px] flex items-center justify-center">
                          {invoice.client.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-gray-800">{invoice.client}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{invoice.period}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{currency(invoice.amount)}</td>
                    <td className="px-6 py-4 text-gray-700">{invoice.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"><FiEye className="w-4 h-4" /></button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"><FiDownload className="w-4 h-4" /></button>
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

function statusClass(status: InvoiceItem["status"]) {
  switch (status) {
    case "Paid":
      return "bg-emerald-100 text-emerald-700";
    case "Sent":
      return "bg-blue-100 text-blue-700";
    case "Overdue":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "green" | "blue" | "red" | "amber" }) {
  const map = {
    green: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
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
