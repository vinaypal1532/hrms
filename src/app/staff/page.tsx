"use client";
import { useState } from "react";
import { DropDown } from "@/components/DropDown";
import { FiPlus, FiSearch, FiX, FiEye } from "react-icons/fi";
import StaffForm from "@/components/forms/StaffForm";


// Mock staff data
const initialStaff = [
  {
    id: "EMP001",
    name: "John Smith",
    initial: "JS",
    email: "john@hrms.com",
    phone: "9876543210",
    department: "Engineering",
    position: "Senior Developer",
    joiningDate: "2023-01-15",
    status: "active",
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    initial: "SJ",
    email: "sarah@hrms.com",
    phone: "9876543211",
    department: "Marketing",
    position: "Marketing Manager",
    joiningDate: "2023-03-22",
    status: "active",
  },
  {
    id: "EMP003",
    name: "Michael Brown",
    initial: "MB",
    email: "michael@hrms.com",
    phone: "9876543212",
    department: "Sales",
    position: "Sales Executive",
    joiningDate: "2023-06-10",
    status: "active",
  },
  {
    id: "EMP004",
    name: "Emily Davis",
    initial: "ED",
    email: "emily@hrms.com",
    phone: "9876543213",
    department: "HR",
    position: "HR Coordinator",
    joiningDate: "2024-01-05",
    status: "active",
  },
  {
    id: "EMP005",
    name: "Robert Wilson",
    initial: "RW",
    email: "robert@hrms.com",
    phone: "9876543214",
    department: "Finance",
    position: "Accountant",
    joiningDate: "2024-02-18",
    status: "inactive",
  },
];

const departments = [
  "All Departments",
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
];

export default function StaffPage() {
  const [staff, setStaff] = useState(initialStaff);
  const [department, setDepartment] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Engineering",
    position: "",
    joiningDate: "",
  });

  // Filter staff
  const filteredStaff = staff.filter((s) => {
    const matchesDept =
      department === "All Departments" || s.department === department;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Add new staff
  const handleAddStaff = () => {
    const newEmployee = {
      id: `EMP${String(staff.length + 1).padStart(3, "0")}`,
      name: newStaff.name,
      initial: getInitials(newStaff.name),
      email: newStaff.email,
      phone: newStaff.phone,
      department: newStaff.department,
      position: newStaff.position,
      joiningDate: newStaff.joiningDate,
      status: "active",
    };
    setStaff([...staff, newEmployee]);
    setShowAddModal(false);
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      department: "Engineering",
      position: "",
      joiningDate: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            Staff Management
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage all staff members</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#0b0f19] text-white hover:bg-[#1f2937] transition cursor-pointer shadow-sm"
        >
          <FiPlus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* FILTER BAR */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          {/* SEARCH */}
          <div className="relative w-full max-w-sm">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by employee name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] bg-white"
            />
          </div>

          {/* FILTER */}
          <DropDown
            width={"w-48"}
            search={department}
            setSearch={setDepartment}
            list={departments}
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Joining Date
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStaff.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#eff6ff] border border-blue-100 flex items-center justify-center text-xs font-bold text-[#2563eb]">
                        {emp.initial}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {emp.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{emp.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {emp.email}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{emp.phone}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {emp.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {emp.position}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {emp.joiningDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        emp.status === "active"
                          ? "bg-[#e8fbf2] text-[#10b981] border border-[#d1f7e3]"
                          : "bg-red-50 text-red-500 border border-red-100"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition">
                      <FiEye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredStaff.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-gray-400"
                  >
                    No staff members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD STAFF MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-7 mx-4 animate-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Add New Staff</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Fill in the details to add a new team member
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition cursor-pointer text-gray-400"
              >
                <FiX className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Form Fields */}
       <StaffForm
  newStaff={newStaff}
  setNewStaff={setNewStaff}
  onSubmit={handleAddStaff}
  loading={false}
  buttonText="Add Staff"
/>
            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 mt-7 pt-5 border-t border-gray-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStaff}
                disabled={
                  !newStaff.name ||
                  !newStaff.email ||
                  !newStaff.position ||
                  !newStaff.joiningDate
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#0b0f19] text-white hover:bg-[#1f2937] transition cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiPlus className="w-4 h-4" /> Add Staff
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
