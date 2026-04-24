"use client";
import { DropDown } from "@/components/DropDown";
import StatCardGrid from "@/components/StatCardGrid";
import React, { useState } from "react";

const page = () => {
  const [sMonth, setSMonth] = useState("");
  const [sYear, setSYear] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2024", "2025", "2026", "2027", "2028"];
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black">
            Payroll Management
          </h2>
          <p className="text-gray-500 text-sm">
            Manage salary and PF deductions
          </p>
        </div>

        <div className="flex items-center px-4 py-2 border rounded-lg text-white font-semibold bg-black">
          <span className="mr-4">$</span>
          <span>Process Payroll</span>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCardGrid
          title="Total Records"
          symbol="$"
          value="192,600"
          color="text-black"
          desc="February 2026"
        />
        <StatCardGrid
          title="Total PF Deduction"
          symbol="$"
          value={"23,400"}
          color="text-black"
          desc="Provident Fund"
        />
        <StatCardGrid
          title="Total Tax Deduction"
          symbol="$"
          value={"30,000"}
          color="text-black"
          desc="Income Tax"
        />
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-2xl border border-gray-200 p-7">
        {/* FILTER BAR */}
        <div className="flex items-center gap-4 p-4 text-gray-500">
          {/* SEARCH */}
          {/* <DropDown title="" search="" /> */}

          {/* Month */}
          <DropDown
            width={"w-55"}
            search={sMonth}
            setSearch={setSMonth}
            list={months}
          />

          {/* Year */}
          <DropDown
            width={"w-32"}
            search={sYear}
            setSearch={setSYear}
            list={years}
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Basic Salary</th>
                <th className="px-6 py-3">HRA</th>
                <th className="px-6 py-3">Allowances</th>
                <th className="px-6 py-3">PF Deduction</th>
                <th className="px-6 py-3">Tax</th>
                <th className="px-6 py-3">Net Salary</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="text-black">
              <tr className="border-t border-gray-400 hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
                    JS
                  </div>
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-gray-500 text-xs">EMP001</p>
                  </div>
                </td>
                <td className="px-6 py-4">$75,000</td>
                <td className="px-6 py-4">$15,000</td>
                <td className="px-6 py-4">$5,000</td>
                <td className="px-6 py-4 text-red-500">$9,000</td>
                <td className="px-6 py-4 text-red-500">$12,000</td>
                <td className="px-6 py-4 font-semibold">$74,000</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </td>
              </tr>
              <tr className="border-t border-gray-400 hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
                    JS
                  </div>
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-gray-500 text-xs">EMP001</p>
                  </div>
                </td>
                <td className="px-6 py-4">$75,000</td>
                <td className="px-6 py-4">$15,000</td>
                <td className="px-6 py-4">$5,000</td>
                <td className="px-6 py-4 text-red-500">$9,000</td>
                <td className="px-6 py-4 text-red-500">$12,000</td>
                <td className="px-6 py-4 font-semibold">$74,000</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
