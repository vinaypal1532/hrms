
"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiEye } from "react-icons/fi";
import StaffForm from "@/components/forms/StaffForm";
import { getAllUsers, addstaff  } from "@/app/api/staff";

interface Staff {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  joiningDate?: string;
  createdAt?: string;
  status?: string;
  initial?: string;
  roles?: {
    name: string;
  }[];
}

interface NewStaff {
  name: string;
  email: string;
  phone: string;
  position: string;
  joiningDate: string;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [newStaff, setNewStaff] = useState<NewStaff>({
    name: "",
    email: "",
    phone: "",
    position: "",
    joiningDate: "",
  });

  // Fetch staff
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Token not found in localStorage. Please login."
          );
        }

        const data = await getAllUsers(token);

        console.log("Users response:", data);

        const usersArray = Array.isArray(data)
          ? data
          : data?.data ?? [];

        setStaff(usersArray);
        setErrorMsg(null);
      } catch (error) {
        console.error("Failed to fetch users:", error);

        setErrorMsg(
          error instanceof Error
            ? error.message
            : "Failed to fetch users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter staff
  const filteredStaff = staff.filter((s) => {
    const name = s.name?.toLowerCase() || "";
    const email = s.email?.toLowerCase() || "";
    const search = searchQuery.toLowerCase();

    return (
      name.includes(search) ||
      email.includes(search)
    );
  });

  // Generate initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Add new staff
const handleAddStaff = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Token not found in localStorage. Please login."
      );
    }

    const response = await addstaff(token, newStaff);

    console.log("Staff created:", response);

    // API response me created user ho to directly add kar sakte ho
    const createdStaff = response?.data;

    if (createdStaff) {
      setStaff((prev) => [...prev, createdStaff]);
    } else {
      // API response me user object nahi hai,
      // to list dobara fetch karna better hai.
      const data = await getAllUsers(token);

      const usersArray = Array.isArray(data)
        ? data
        : data?.data ?? [];

      setStaff(usersArray);
    }

    setShowAddModal(false);

    setNewStaff({
      name: "",
      email: "",
      phone: "",
      position: "",
      joiningDate: "",
    });

    setErrorMsg(null);
  } catch (error) {
    console.error("Failed to add staff:", error);

    setErrorMsg(
      error instanceof Error
        ? error.message
        : "Failed to add staff"
    );
  }
};

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Staff Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all staff members
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#0b0f19] text-white hover:bg-[#1f2937] transition cursor-pointer shadow-sm"
        >
          <FiPlus className="w-4 h-4" />
          Add Staff
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
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] bg-white"
            />
          </div>
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

              {/* ERROR */}
              {errorMsg ? (
                <tr>
                  <td
                    className="px-6 py-4"
                    colSpan={6}
                  >
                    <div className="text-sm text-red-500">
                      Error: {errorMsg}
                    </div>
                  </td>
                </tr>

              /* LOADING */
              ) : loading ? (
                <tr>
                  <td
                    className="px-6 py-4"
                    colSpan={6}
                  >
                    <div className="text-sm text-gray-500">
                      Loading staff...
                    </div>
                  </td>
                </tr>

              /* EMPTY */
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-gray-400"
                  >
                    No staff members found.
                  </td>
                </tr>

              /* DATA */
              ) : (
                filteredStaff.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >

                    {/* NAME */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-[#eff6ff] border border-blue-100 flex items-center justify-center text-xs font-bold text-[#2563eb]">
                          {emp.initial ||
                            getInitials(emp.name)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-gray-800">
                            {emp.name}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            {emp.id}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* CONTACT */}
                    <td className="px-6 py-4">
                      <div>

                        <p className="text-sm font-medium text-gray-700">
                          {emp.email}
                        </p>

                        <p className="text-xs text-gray-400 mt-0.5">
                          {emp.phone || "—"}
                        </p>

                      </div>
                    </td>

                    {/* POSITION */}
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {emp.position ??
                        emp.roles?.[0]?.name ??
                        "—"}
                    </td>

                    {/* JOINING DATE */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {emp.joiningDate ??
                        (emp.createdAt
                          ? new Date(
                              emp.createdAt
                            ).toLocaleDateString()
                          : "—")}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          emp.status === "active"
                            ? "bg-[#e8fbf2] text-[#10b981] border border-[#d1f7e3]"
                            : "bg-red-50 text-red-500 border border-red-100"
                        }`}
                      >
                        {emp.status || "inactive"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition">
                        <FiEye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* ADD STAFF MODAL */}
      {showAddModal && (
        <StaffForm
          newStaff={newStaff}
          setNewStaff={setNewStaff}
          onSubmit={handleAddStaff}
          onClose={() => setShowAddModal(false)}
          loading={false}
        />
      )}

    </div>
  );
}

