
"use client";

import { FiPlus, FiX } from "react-icons/fi";

interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  joiningDate: string;
}

interface AddFormProps {
  newStaff: StaffFormData;
  setNewStaff: React.Dispatch<React.SetStateAction<StaffFormData>>;
  onSubmit: () => void;
  onClose: () => void;
  loading?: boolean;
}

export default function AddForm({
  newStaff,
  setNewStaff,
  onSubmit,
  onClose,
  loading = false,
}: AddFormProps) {
  const handleChange = (
    field: keyof StaffFormData,
    value: string
  ) => {
    setNewStaff((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    newStaff.name.trim() &&
    newStaff.email.trim() &&
    newStaff.position.trim() &&
    newStaff.joiningDate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-7 mx-4 animate-in">

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Add New Staff
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              Fill in the details to add a new team member
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition cursor-pointer text-gray-400"
          >
            <FiX className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>

            <input
              type="text"
              value={newStaff.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              placeholder="Enter full name"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>

            <input
              type="email"
              value={newStaff.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              placeholder="Enter email address"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone
            </label>

            <input
              type="tel"
              value={newStaff.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
              placeholder="Enter phone number"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Position
            </label>

            <input
              type="text"
              value={newStaff.position}
              onChange={(e) =>
                handleChange("position", e.target.value)
              }
              placeholder="Enter position"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Joining Date
            </label>

            <input
              type="date"
              value={newStaff.joiningDate}
              onChange={(e) =>
                handleChange("joiningDate", e.target.value)
              }
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 mt-7 pt-5 border-t border-gray-100">

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!isFormValid || loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#0b0f19] text-white hover:bg-[#1f2937] transition cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiPlus className="w-4 h-4" />

            {loading ? "Adding..." : "Add Staff"}
          </button>
        </div>
      </div>
    </div>
  );
}

