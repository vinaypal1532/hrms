"use client";

import { AttendanceRecord } from "@/features/attendance/attendanceSlice";
import { BiEdit2, BiTrash2 } from "react-icons/bi";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  loading: boolean;
  onEdit: (record: AttendanceRecord) => void;
  onDelete: (id: string) => void;
  onSearchChange: (value: string) => void;
  onDateChange: (date: string) => void;
  searchValue: string;
  dateValue: string;
}

export default function AttendanceTable({
  records,
  loading,
  onEdit,
  onDelete,
  onSearchChange,
  onDateChange,
  searchValue,
  dateValue,
}: AttendanceTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-600";
      case "Absent":
        return "bg-red-100 text-red-600";
      case "Leave":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7">
      {/* FILTER BAR */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        {/* SEARCH */}
        <div className="relative flex-1 min-w-80">
          <input
            type="text"
            placeholder="Search by employee name..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        {/* DATE PICKER */}
        <div className="min-w-fit">
          <input
            type="date"
            value={dateValue}
            onChange={(e) => onDateChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading attendance records...</div>
          </div>
        ) : records.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">No attendance records found</div>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Hours</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-900">
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                      {getInitials(record.employee?.name || "")}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {record.employee?.name || "Unknown"}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {record.employeeId}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{record.date}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {record.checkIn || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {record.checkOut || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {record.hoursWorked ? `${record.hoursWorked}h` : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => onEdit(record)}
                      className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700 transition-colors"
                      title="Edit"
                    >
                      <BiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(record.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <BiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
