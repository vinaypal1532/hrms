"use client";

import { useEffect, useState } from "react";
import { FiSave, FiX, FiBriefcase, FiCalendar, FiDollarSign } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john@hrms.com",
    phone: "+91 90765 43210",
    position: "Senior Developer",
    department: "Engineering",
    employeeId: "EMP001",
    joiningDate: "2023-01-15",
    pfNumber: "PF001234",
    status: "active",
  });

  const [editForm, setEditForm] = useState({ ...profile });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("userName") || "John Smith";
      const email = localStorage.getItem("userEmail") || "john@hrms.com";
      const phone = localStorage.getItem("userPhone") || "+91 90765 43210";
      const position = localStorage.getItem("userPosition") || "Senior Developer";
      const department = localStorage.getItem("userDepartment") || "Engineering";
      const employeeId = localStorage.getItem("userEmployeeId") || "EMP001";
      const joiningDate = localStorage.getItem("userJoiningDate") || "2023-01-15";
      const pfNumber = localStorage.getItem("userPFNumber") || "PF001234";
      const status = localStorage.getItem("userStatus") || "active";

      const data = {
        name,
        email,
        phone,
        position,
        department,
        employeeId,
        joiningDate,
        pfNumber,
        status,
      };
      setProfile(data);
      setEditForm(data);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name || !editForm.email) {
      toast.error("Full Name and Email Address are required.");
      return;
    }

    setProfile(editForm);
    localStorage.setItem("userName", editForm.name);
    localStorage.setItem("userEmail", editForm.email);
    localStorage.setItem("userPhone", editForm.phone);
    localStorage.setItem("userPosition", editForm.position);
    localStorage.setItem("userDepartment", editForm.department);
    localStorage.setItem("userEmployeeId", editForm.employeeId);
    localStorage.setItem("userJoiningDate", editForm.joiningDate);
    localStorage.setItem("userPFNumber", editForm.pfNumber);
    localStorage.setItem("userStatus", editForm.status);

    toast.success("Profile updated successfully!");

    // Refresh application shell to reflect name changes in Header instantly
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleCancel = () => {
    setEditForm({ ...profile });
    toast.error("Changes discarded.");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 p-2">
      {/* HEADER */}
      <div>
        <h1 className="text-[2.1rem] font-bold text-[#1f2937] tracking-tight">My Profile</h1>
        <p className="text-[#6b7280] text-sm mt-1">View and update your profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card Left */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm">
          <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-md mb-4">
            {getInitials(profile.name)}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">{profile.position}</p>
          <p className="text-xs text-gray-400 mt-0.5">{profile.employeeId}</p>

          <hr className="w-full border-gray-100 my-5" />

          <div className="w-full space-y-3.5 text-left text-sm text-gray-600 pl-2">
            <div className="flex items-center gap-3">
              <FiBriefcase className="text-gray-400 w-4 h-4" />
              <span>{profile.department}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCalendar className="text-gray-400 w-4 h-4" />
              <span>Joined {profile.joiningDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiDollarSign className="text-gray-400 w-4 h-4" />
              <span>PF: {profile.pfNumber}</span>
            </div>
          </div>
        </div>

        {/* Personal Info Right */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={editForm.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={editForm.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={editForm.employeeId}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 outline-none transition text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition text-sm active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition text-sm shadow-sm active:scale-[0.98]"
              >
                <FiSave className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Employment Details Bottom */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Employment Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Joining Date</p>
            <p className="font-semibold text-gray-800">{profile.joiningDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Employment Status</p>
            <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 capitalize">
              {profile.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">PF Number</p>
            <p className="font-semibold text-gray-800">{profile.pfNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
