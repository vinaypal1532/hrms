import StatCardGrid from "@/components/StatCardGrid";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black">
            Attendance Management
          </h2>
          <p className="text-gray-500 text-sm">
            Track and manage staff attendance
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50">
          ⬇ Export
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCardGrid title="Total Records" value={3} color="text-black" />
        <StatCardGrid title="Present" value={3} color="text-green-500" />
        <StatCardGrid title="Absent" value={0} color="text-red-500" />
        <StatCardGrid title="Avg Hours" value={9.1} color="text-black" />
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-2xl border border-gray-200 p-7">
        {/* FILTER BAR */}
        <div className="flex items-center justify-between p-4 text-gray-500">
          {/* SEARCH */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by employee name..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          {/* DATE */}
          <div className="ml-4">
            <input
              type="date"
              className="border rounded-lg px-3 py-2 text-sm"
              defaultValue="2026-03-28"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Check In</th>
                <th className="px-6 py-3">Check Out</th>
                <th className="px-6 py-3">Hours</th>
                <th className="px-6 py-3">Status</th>
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
                <td className="px-6 py-4">2026-03-28</td>
                <td className="px-6 py-4">09:00</td>
                <td className="px-6 py-4">18:00</td>
                <td className="px-6 py-4">9h</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    present
                  </span>
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
                <td className="px-6 py-4">2026-03-28</td>
                <td className="px-6 py-4">09:00</td>
                <td className="px-6 py-4">18:00</td>
                <td className="px-6 py-4">9h</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    present
                  </span>
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
