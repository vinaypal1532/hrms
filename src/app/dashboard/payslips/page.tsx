"use client";

import { useEffect, useState } from "react";
import { FiDownload, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";

interface Payslip {
  id: string;
  month: string;
  basic: number;
  allowance: number;
  deductions: number;
  net: number;
  status: "Paid" | "Pending";
}

const DEFAULT_PAYSLIPS: Payslip[] = [
  {
    id: "pay-1",
    month: "July 2026",
    basic: 5000,
    allowance: 500,
    deductions: 600,
    net: 4900,
    status: "Paid",
  },
  {
    id: "pay-2",
    month: "June 2026",
    basic: 5000,
    allowance: 500,
    deductions: 600,
    net: 4900,
    status: "Paid",
  },
  {
    id: "pay-3",
    month: "May 2026",
    basic: 4800,
    allowance: 400,
    deductions: 580,
    net: 4620,
    status: "Paid",
  },
  {
    id: "pay-4",
    month: "April 2026",
    basic: 4800,
    allowance: 400,
    deductions: 580,
    net: 4620,
    status: "Paid",
  },
];

export default function PayslipsPage() {
  const [user, setUser] = useState({
    name: "John Smith",
    employeeId: "EMP001",
    department: "Engineering",
    position: "Senior Developer",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("userName") || "John Smith";
      const employeeId = localStorage.getItem("userEmployeeId") || "EMP001";
      const department = localStorage.getItem("userDepartment") || "Engineering";
      const position = localStorage.getItem("userPosition") || "Senior Developer";
      setUser({ name, employeeId, department, position });
    }
  }, []);

  const handleDownload = (payslip: Payslip) => {
    const textContent = `==================================================
              HRMS SYSTEM - SALARY PAYSLIP
==================================================
Employee Information:
---------------------
Name:        ${user.name}
ID:          ${user.employeeId}
Department:  ${user.department}
Position:    ${user.position}

Payment Details:
----------------
Month/Year:  ${payslip.month}
Status:      ${payslip.status.toUpperCase()}

Earnings Breakdown:
-------------------
Basic Salary:       $${payslip.basic.toLocaleString()}
Allowances:         $${payslip.allowance.toLocaleString()}
Gross Earnings:     $${(payslip.basic + payslip.allowance).toLocaleString()}

Deductions Breakdown:
---------------------
Tax & Provident Fund: $${payslip.deductions.toLocaleString()}
Total Deductions:     $${payslip.deductions.toLocaleString()}

Summary:
--------
Net Paid Amount:      $${payslip.net.toLocaleString()}

==================================================
This is a system generated document. No signature required.
==================================================`;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Payslip_${payslip.month.replace(" ", "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success(`Payslip for ${payslip.month} downloaded successfully!`);
  };

  return (
    <div className="space-y-6 p-2">
      {/* HEADER */}
      <div>
        <h1 className="text-[2.1rem] font-bold text-[#1f2937] tracking-tight">Payslips</h1>
        <p className="text-[#6b7280] text-sm mt-1">View and download your monthly salary statements</p>
      </div>

      {/* PAYSLIPS LIST */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FiFileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Salary Statements</h2>
            <p className="text-xs text-gray-500">Select any statement to download the full details</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 font-semibold bg-[#f9fafb]">
                <th className="px-6 py-4">Month</th>
                <th className="px-6 py-4">Basic Salary</th>
                <th className="px-6 py-4">Allowances</th>
                <th className="px-6 py-4">Deductions</th>
                <th className="px-6 py-4 font-bold">Net Paid</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 divide-y divide-gray-100">
              {DEFAULT_PAYSLIPS.map((payslip) => (
                <tr key={payslip.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900">{payslip.month}</td>
                  <td className="px-6 py-4 text-gray-600">${payslip.basic.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">${payslip.allowance.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500">${payslip.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">${payslip.net.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        payslip.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payslip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDownload(payslip)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition active:scale-95"
                    >
                      <FiDownload className="w-3.5 h-3.5" />
                      Download Statement
                    </button>
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
