"use client";

import { useState } from "react";
import { FiUsers, FiDollarSign, FiPlus } from "react-icons/fi";

interface Department {
  id: number;
  name: string;
  head: string;
  budget: number;
  employees: number;
}

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: "Engineering",
      head: "John Smith",
      budget: 2000000,
      employees: 25,
    },
    {
      id: 2,
      name: "Marketing",
      head: "Sarah Johnson",
      budget: 1200000,
      employees: 15,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    head: "",
    budget: "",
  });

  // 🔥 Add Department
  const handleAddDepartment = () => {
    if (!form.name || !form.head || !form.budget) return;

    const newDept: Department = {
      id: Date.now(),
      name: form.name,
      head: form.head,
      budget: Number(form.budget),
      employees: 0,
    };

    setDepartments([...departments, newDept]);

    setForm({ name: "", head: "", budget: "" });
    setShowModal(false);
  };

  // 🔥 Stats
  const totalDepartments = departments.length;
  const totalEmployees = departments.reduce(
    (acc, d) => acc + d.employees,
    0
  );
  const totalBudget = departments.reduce(
    (acc, d) => acc + d.budget,
    0
  );

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Department Management
          </h1>
          <p className="text-gray-500">
            Manage departments and structure
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          <FiPlus />
          Add Department
        </button>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-3 gap-4">

        <StatCard
          title="Total Departments"
          value={totalDepartments}
          icon={<FiUsers />}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<FiUsers />}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Total Budget"
          value={`$${(totalBudget / 1000000).toFixed(1)}M`}
          icon={<FiDollarSign />}
          color="bg-yellow-100 text-yellow-600"
        />

      </div>

      {/* 🔥 TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">Head</th>
              <th className="px-6 py-3 text-left">Employees</th>
              <th className="px-6 py-3 text-left">Budget</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} className="border-t">
                <td className="px-6 py-4 font-medium">
                  {dept.name}
                </td>
                <td className="px-6 py-4">
                  {dept.head}
                </td>
                <td className="px-6 py-4">
                  {dept.employees}
                </td>
                <td className="px-6 py-4">
                  ${dept.budget.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-[420px] rounded-xl p-6 space-y-4">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Add New Department
              </h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            {/* NAME */}
            <div>
              <label className="text-sm">Department Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md mt-1"
              />
            </div>

            {/* HEAD */}
            <div>
              <label className="text-sm">Department Head</label>
              <select
                value={form.head}
                onChange={(e) =>
                  setForm({ ...form, head: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md mt-1"
              >
                <option value="">Select department head</option>
                <option>John Smith</option>
                <option>Sarah Johnson</option>
                <option>Michael Brown</option>
              </select>
            </div>

            {/* BUDGET */}
            <div>
              <label className="text-sm">Annual Budget ($)</label>
              <input
                type="number"
                value={form.budget}
                onChange={(e) =>
                  setForm({ ...form, budget: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md mt-1"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleAddDepartment}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Add Department
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/* 🔥 STAT CARD */
function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  );
}