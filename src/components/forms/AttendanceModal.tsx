"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AttendanceRecord } from "@/features/attendance/attendanceSlice";

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  employees: Array<{ id: string; name: string }>;
  editingRecord?: AttendanceRecord | null;
  loading?: boolean;
}

export default function AttendanceModal({
  isOpen,
  onClose,
  onSubmit,
  employees,
  editingRecord,
  loading = false,
}: AttendanceModalProps) {
  const [formData, setFormData] = useState({
    employee_id: "",
    date: "",
    check_in: "",
    check_out: "",
    status: "Present",
    notes: "",
  });

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        employee_id: editingRecord.employeeId,
        date: editingRecord.date,
        check_in: editingRecord.checkIn || "",
        check_out: editingRecord.checkOut || "",
        status: editingRecord.status,
        notes: editingRecord.notes || "",
      });
    } else {
      setFormData({
        employee_id: "",
        date: new Date().toISOString().split("T")[0],
        check_in: "",
        check_out: "",
        status: "Present",
        notes: "",
      });
    }
  }, [editingRecord, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.employee_id || !formData.date || !formData.status) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({
        employee_id: "",
        date: new Date().toISOString().split("T")[0],
        check_in: "",
        check_out: "",
        status: "Present",
        notes: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">
            {editingRecord ? "Edit Attendance Record" : "Add Attendance Record"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Employee Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee <span className="text-red-500">*</span>
            </label>
            <select
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              disabled={loading}
              required
            >
              <option value="">Select employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              disabled={loading}
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>

          {/* Check In */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check In Time
            </label>
            <input
              type="time"
              name="check_in"
              value={formData.check_in}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check Out Time
            </label>
            <input
              type="time"
              name="check_out"
              value={formData.check_out}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Saving..." : editingRecord ? "Update Record" : "Add Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
