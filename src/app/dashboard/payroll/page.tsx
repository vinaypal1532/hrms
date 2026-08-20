"use client";

import { useEffect, useState, useMemo } from "react";
import { FiDollarSign, FiPlus, FiTrash2, FiEye, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import StatCardGrid from "@/components/StatCardGrid";

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: string;
  basicSalary: number;
  hra: number;
  allowances: number;
  pfDeduction: number;
  siDeduction: number;
  advanceDeduction: number;
  tax: number;
  netSalary: number;
  status: "Paid" | "Pending";
}

const mockEmployees = [
  { id: "EMP001", name: "John Smith", salary: 75000 },
  { id: "EMP002", name: "Sarah Johnson", salary: 80000 },
  { id: "EMP003", name: "Michael Brown", salary: 60000 },
  { id: "EMP004", name: "Emily Davis", salary: 65000 },
  { id: "EMP005", name: "David Wilson", salary: 70000 },
];

const DEFAULT_PAYROLLS: PayrollRecord[] = [
  {
    id: "pay-1",
    employeeId: "EMP001",
    employeeName: "John Smith",
    month: "February",
    year: "2026",
    basicSalary: 75000,
    hra: 15000,
    allowances: 5000,
    pfDeduction: 9000,
    siDeduction: 1300,
    advanceDeduction: 2000,
    tax: 12000,
    netSalary: 70700,
    status: "Paid",
  },
  {
    id: "pay-2",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    month: "February",
    year: "2026",
    basicSalary: 80000,
    hra: 16000,
    allowances: 6000,
    pfDeduction: 9600,
    siDeduction: 1400,
    advanceDeduction: 0,
    tax: 13000,
    netSalary: 78000,
    status: "Paid",
  },
  {
    id: "pay-3",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    month: "February",
    year: "2026",
    basicSalary: 60000,
    hra: 12000,
    allowances: 4500,
    pfDeduction: 7200,
    siDeduction: 1050,
    advanceDeduction: 1500,
    tax: 9500,
    netSalary: 57250,
    status: "Paid",
  },
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const years = ["2024", "2025", "2026", "2027", "2028"];

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
  const [filterMonth, setFilterMonth] = useState("February");
  const [filterYear, setFilterYear] = useState("2026");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("Staff");

  // Form states
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [formMonth, setFormMonth] = useState("February");
  const [formYear, setFormYear] = useState("2026");
  const [basicSalary, setBasicSalary] = useState(0);
  const [hra, setHra] = useState(0);
  const [allowances, setAllowances] = useState(0);
  const [pfDeduction, setPfDeduction] = useState(0);
  const [siDeduction, setSiDeduction] = useState(0);
  const [advanceDeduction, setAdvanceDeduction] = useState(0);
  const [tax, setTax] = useState(0);
  const [status, setStatus] = useState<"Paid" | "Pending">("Paid");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole") || "Staff";
      setUserRole(storedRole);

      const storedPayrolls = localStorage.getItem("hrms_payrolls");
      if (storedPayrolls) {
        setPayrolls(JSON.parse(storedPayrolls));
      } else {
        setPayrolls(DEFAULT_PAYROLLS);
        localStorage.setItem("hrms_payrolls", JSON.stringify(DEFAULT_PAYROLLS));
      }
    }
  }, []);

  const savePayrolls = (updated: PayrollRecord[]) => {
    setPayrolls(updated);
    localStorage.setItem("hrms_payrolls", JSON.stringify(updated));
  };

  // Auto-fill values when employee is selected
  const handleEmployeeChange = (empId: string) => {
    setSelectedEmpId(empId);
    const emp = mockEmployees.find((e) => e.id === empId);
    if (emp) {
      setBasicSalary(emp.salary);
      // Default HRA to 20%
      setHra(emp.salary * 0.2);
      // Default Allowances
      setAllowances(5000);
      // Default PF to 12%
      setPfDeduction(emp.salary * 0.12);
      // Default SI to 1.75%
      setSiDeduction(Math.round(emp.salary * 0.0175));
      // Default Tax to 15%
      setTax(emp.salary * 0.15);
      setAdvanceDeduction(0);
    } else {
      setBasicSalary(0);
      setHra(0);
      setAllowances(0);
      setPfDeduction(0);
      setSiDeduction(0);
      setTax(0);
      setAdvanceDeduction(0);
    }
  };

  // Watch basic salary to update PF, HRA, SI, Tax automatically
  const handleBasicSalaryChange = (val: number) => {
    setBasicSalary(val);
    setHra(val * 0.2);
    setPfDeduction(val * 0.12);
    setSiDeduction(Math.round(val * 0.0175));
    setTax(val * 0.15);
  };

  // Calculate net salary for the form
  const netSalary = useMemo(() => {
    const gross = basicSalary + hra + allowances;
    const deductions = pfDeduction + siDeduction + advanceDeduction + tax;
    return gross - deductions;
  }, [basicSalary, hra, allowances, pfDeduction, siDeduction, advanceDeduction, tax]);

  // Compute metrics and filter records
  const filteredRecords = useMemo(() => {
    return payrolls.filter((p) => p.month === filterMonth && p.year === filterYear);
  }, [payrolls, filterMonth, filterYear]);

  const metrics = useMemo(() => {
    const totalPayroll = filteredRecords.reduce((sum, p) => sum + p.netSalary, 0);
    const totalPF = filteredRecords.reduce((sum, p) => sum + p.pfDeduction, 0);
    const totalTax = filteredRecords.reduce((sum, p) => sum + p.tax, 0);
    return { totalPayroll, totalPF, totalTax };
  }, [filteredRecords]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId) {
      toast.error("Please select an employee.");
      return;
    }

    const emp = mockEmployees.find((e) => e.id === selectedEmpId);
    if (!emp) return;

    const newRecord: PayrollRecord = {
      id: `pay-${Date.now()}`,
      employeeId: emp.id,
      employeeName: emp.name,
      month: formMonth,
      year: formYear,
      basicSalary,
      hra,
      allowances,
      pfDeduction,
      siDeduction,
      advanceDeduction,
      tax,
      netSalary,
      status,
    };

    savePayrolls([newRecord, ...payrolls]);
    toast.success("Payroll record processed successfully!");
    setIsModalOpen(false);

    // Reset Form
    setSelectedEmpId("");
    setBasicSalary(0);
    setHra(0);
    setAllowances(0);
    setPfDeduction(0);
    setSiDeduction(0);
    setTax(0);
    setAdvanceDeduction(0);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this payroll record?")) {
      const updated = payrolls.filter((p) => p.id !== id);
      savePayrolls(updated);
      toast.success("Payroll record deleted successfully!");
    }
  };

  return (
    <div className="space-y-6 p-2">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[2.1rem] font-bold text-[#1f2937] tracking-tight">Payroll Management</h1>
          <p className="text-[#6b7280] text-sm mt-1">Manage salary and PF deductions</p>
        </div>

        {/* Process Payroll button (only accessible to Admin/HR) */}
        {(userRole === "Admin" || userRole === "HR") && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-gray-800 transition active:scale-[0.98]"
          >
            <FiDollarSign className="w-4 h-4" />
            Process Payroll
          </button>
        )}
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCardGrid
          title="Total Payroll"
          symbol="$"
          value={metrics.totalPayroll.toLocaleString()}
          color="text-black"
          desc={`${filterMonth} ${filterYear}`}
        />
        <StatCardGrid
          title="Total PF Deduction"
          symbol="$"
          value={metrics.totalPF.toLocaleString()}
          color="text-black"
          desc="Provident Fund"
        />
        <StatCardGrid
          title="Total Tax Deduction"
          symbol="$"
          value={metrics.totalTax.toLocaleString()}
          color="text-black"
          desc="Income Tax"
        />
      </div>

      {/* FILTER AND TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 font-semibold bg-[#f9fafb]">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Basic Salary</th>
                <th className="px-6 py-4">HRA</th>
                <th className="px-6 py-4">Allowances</th>
                <th className="px-6 py-4">PF Deduction</th>
                <th className="px-6 py-4">SI Deduction</th>
                <th className="px-6 py-4">Advance</th>
                <th className="px-6 py-4">Tax</th>
                <th className="px-6 py-4 font-bold">Net Salary</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 divide-y divide-gray-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
                    No payroll records found for the selected month/year.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                          {record.employeeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{record.employeeName}</p>
                          <p className="text-gray-500 text-xs">{record.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">${record.basicSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-600">${record.hra.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-600">${record.allowances.toLocaleString()}</td>
                    <td className="px-6 py-4 text-red-500">${record.pfDeduction.toLocaleString()}</td>
                    <td className="px-6 py-4 text-red-500">${record.siDeduction.toLocaleString()}</td>
                    <td className="px-6 py-4 text-red-500">${record.advanceDeduction.toLocaleString()}</td>
                    <td className="px-6 py-4 text-red-500">${record.tax.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-gray-950">${record.netSalary.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {(userRole === "Admin" || userRole === "HR") ? (
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700 transition"
                          title="Delete Record"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROCESS PAYROLL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4 overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Process Payroll</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl transition"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Select Employee *
                  </label>
                  <select
                    required
                    value={selectedEmpId}
                    onChange={(e) => handleEmployeeChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  >
                    <option value="">Choose employee</option>
                    {mockEmployees.map((emp) => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Month
                    </label>
                    <select
                      value={formMonth}
                      onChange={(e) => setFormMonth(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                    >
                      {months.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Year
                    </label>
                    <select
                      value={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Basic Salary *
                  </label>
                  <input
                    type="number"
                    required
                    value={basicSalary || ""}
                    onChange={(e) => handleBasicSalaryChange(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    HRA
                  </label>
                  <input
                    type="number"
                    value={hra || ""}
                    onChange={(e) => setHra(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Allowances
                  </label>
                  <input
                    type="number"
                    value={allowances || ""}
                    onChange={(e) => setAllowances(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
              </div>

              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1 mt-2">Deductions</h3>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    PF Deduction
                  </label>
                  <input
                    type="number"
                    value={pfDeduction || ""}
                    onChange={(e) => setPfDeduction(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    SI Deduction
                  </label>
                  <input
                    type="number"
                    value={siDeduction || ""}
                    onChange={(e) => setSiDeduction(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5" title="Advance taken recovery">
                    Advance Rec.
                  </label>
                  <input
                    type="number"
                    value={advanceDeduction || ""}
                    onChange={(e) => setAdvanceDeduction(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Income Tax
                  </label>
                  <input
                    type="number"
                    value={tax || ""}
                    onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "Paid" | "Pending")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Net Paid Salary (calculated)
                  </label>
                  <div className="w-full px-4 py-2.5 bg-blue-50 text-blue-700 font-bold rounded-xl text-lg">
                    ${netSalary.toLocaleString()}
                  </div>
                </div>
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
                  type="submit"
                  className="flex-1 py-3 bg-black text-white hover:bg-gray-800 rounded-xl font-semibold transition text-sm shadow-sm active:scale-[0.98]"
                >
                  Process Payslip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
