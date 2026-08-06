"use client";

import { useMemo, useState } from "react";
import {
    FiDownload,
    FiTrendingUp,
    FiUsers,
    FiCalendar,
    FiDollarSign,
} from "react-icons/fi";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const departmentData = [
    { name: "Engineering", employees: 2 },
    { name: "Marketing", employees: 1 },
    { name: "Sales", employees: 1 },
    { name: "HR", employees: 1 },
];

const attendanceData = [
    { date: "03-24", present: 45, absent: 5 },
    { date: "03-25", present: 47, absent: 3 },
    { date: "03-26", present: 46, absent: 4 },
    { date: "03-27", present: 48, absent: 2 },
    { date: "03-28", present: 46, absent: 4 },
];

const leaveData = [
    { name: "Approved", value: 33, color: "#3B82F6" },
    { name: "Pending", value: 67, color: "#10B981" },
    { name: "Rejected", value: 0, color: "#F59E0B" },
];

const payrollData = [
    {
        name: "John",
        gross: 98000,
        deductions: 21000,
    },
    {
        name: "Sarah",
        gross: 83000,
        deductions: 18000,
    },
    {
        name: "Michael",
        gross: 69000,
        deductions: 15000,
    },
];

const tableData = [
    {
        department: "Engineering",
        employees: 2,
        budget: "$2500K",
        payroll: "$74K",
        utilization: "3.0%",
    },
    {
        department: "Marketing",
        employees: 1,
        budget: "$800K",
        payroll: "$64K",
        utilization: "8.0%",
    },
    {
        department: "Sales",
        employees: 1,
        budget: "$1200K",
        payroll: "$54K",
        utilization: "4.5%",
    },
    {
        department: "HR",
        employees: 1,
        budget: "$600K",
        payroll: "$0K",
        utilization: "0.0%",
    },
];

export default function ReportsAnalyticsPage() {
    const [range, setRange] = useState("This Month");

    const stats = useMemo(
        () => [
            {
                title: "Total Staff",
                value: "5",
                sub: "↑ 5% from last month",
                icon: <FiUsers size={22} />,
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
            },
            {
                title: "Total Payroll",
                value: "$193K",
                sub: "This month",
                icon: <FiDollarSign size={22} />,
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
            },
            {
                title: "Attendance Rate",
                value: "100.0%",
                sub: "↑ 2% from last week",
                icon: <FiTrendingUp size={22} />,
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600",
            },
            {
                title: "Leave Requests",
                value: "3",
                sub: "2 pending",
                icon: <FiCalendar size={22} />,
                iconBg: "bg-yellow-100",
                iconColor: "text-yellow-600",
            },
        ],
        []
    );

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Reports & Analytics
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Comprehensive insights and data analysis
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        className="border rounded-lg px-4 py-2 text-sm bg-white"
                    >
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>This Year</option>
                    </select>

                    <button className="flex items-center gap-2 border rounded-lg px-4 py-2 bg-white hover:bg-gray-50">
                        <FiDownload />
                        Export
                    </button>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((item) => (
                    <div
                        key={item.title}
                        className="bg-white border rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {item.title}
                                </p>

                                <h2 className="text-4xl font-bold mt-2">
                                    {item.value}
                                </h2>

                                <p className="text-sm text-green-600 mt-3">
                                    {item.sub}
                                </p>
                            </div>

                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}
                            >
                                <span className={item.iconColor}>
                                    {item.icon}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* DEPARTMENT DISTRIBUTION */}
                <div className="bg-white border rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-6">
                        Department Distribution
                    </h3>

                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={departmentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />

                                <Bar
                                    dataKey="employees"
                                    fill="#3B82F6"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ATTENDANCE TREND */}
                <div className="bg-white border rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-6">
                        Attendance Trend
                    </h3>

                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="date" />
                                <YAxis />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="present"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="absent"
                                    stroke="#EF4444"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* SECOND ROW */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* PIE CHART */}
                <div className="bg-white border rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-6">
                        Leave Requests Status
                    </h3>

                    <div className="h-[320px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={leaveData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={110}
                                    label={({ name, value }) =>
                                        `${name}: ${value}%`
                                    }
                                >
                                    {leaveData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* PAYROLL */}
                <div className="bg-white border rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-6">
                        Payroll Breakdown
                    </h3>

                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={payrollData}>
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />
                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="gross"
                                    fill="#10B981"
                                    radius={[6, 6, 0, 0]}
                                />

                                <Bar
                                    dataKey="deductions"
                                    fill="#EF4444"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white border rounded-2xl p-6 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-6">
                    Department-wise Analysis
                </h3>

                <table className="w-full min-w-[700px]">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="pb-4 font-semibold text-gray-700">
                                Department
                            </th>

                            <th className="pb-4 font-semibold text-gray-700">
                                Employees
                            </th>

                            <th className="pb-4 font-semibold text-gray-700">
                                Budget
                            </th>

                            <th className="pb-4 font-semibold text-gray-700">
                                Payroll
                            </th>

                            <th className="pb-4 font-semibold text-gray-700">
                                Utilization
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((item) => (
                            <tr
                                key={item.department}
                                className="border-b last:border-none"
                            >
                                <td className="py-5 font-medium">
                                    {item.department}
                                </td>

                                <td className="py-5">
                                    {item.employees}
                                </td>

                                <td className="py-5">
                                    {item.budget}
                                </td>

                                <td className="py-5">
                                    {item.payroll}
                                </td>

                                <td className="py-5">
                                    <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                                        {item.utilization}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}