"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StatCardGrid from "@/components/StatCardGrid";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AttendanceModal from "@/components/forms/AttendanceModal";
import {
  AttendanceRecord,
  AttendanceSummary,
} from "@/features/attendance/attendanceSlice";
import {
  fetchAttendanceRecords,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
  exportAttendance,
} from "@/lib/attendanceAPI";

const mockEmployees = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Michael Brown" },
  { id: "4", name: "Emily Davis" },
  { id: "5", name: "David Wilson" },
];

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary>({
    total: 0,
    present: 0,
    absent: 0,
    avgHours: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [submitting, setSubmitting] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  // Fetch attendance records
  const fetchRecords = async () => {
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchAttendanceRecords(token, {
        date: dateValue,
        search: searchValue,
      });

      setRecords(result.data || []);
      setSummary(
        result.summary || {
          total: 0,
          present: 0,
          absent: 0,
          avgHours: 0,
        }
      );
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch attendance records";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when filters change
  useEffect(() => {
    if (token) {
      fetchRecords();
    }
  }, [token, dateValue, searchValue]);

  const handleAddClick = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (record: AttendanceRecord) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleModalSubmit = async (formData: any) => {
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    setSubmitting(true);

    try {
      if (editingRecord) {
        await updateAttendanceRecord(editingRecord.id, formData, token);
        toast.success("Attendance record updated successfully!");
      } else {
        await createAttendanceRecord(formData, token);
        toast.success("Attendance record added successfully!");
      }

      setIsModalOpen(false);
      setEditingRecord(null);
      await fetchRecords();
    } catch (err: any) {
      const errorMessage = err.message || "Failed to save attendance record";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) {
      return;
    }

    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    try {
      await deleteAttendanceRecord(id, token);
      toast.success("Attendance record deleted successfully!");
      await fetchRecords();
    } catch (err: any) {
      const errorMessage = err.message || "Failed to delete attendance record";
      toast.error(errorMessage);
    }
  };

  const handleExport = async () => {
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    try {
      const toastId = toast.loading("Exporting attendance records...");
      const blob = await exportAttendance(token, dateValue);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `attendance_${dateValue}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.dismiss(toastId);
      toast.success("Attendance records exported successfully!");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to export records";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black">
            Attendance Management
          </h2>
          <p className="text-gray-500 text-sm">
            Track and manually manage staff attendance
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50"
            disabled={loading}
          >
            ⬇ Export
          </button>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
            disabled={loading || submitting}
          >
            + Add Record
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCardGrid
          title="Total Records"
          value={summary.total}
          color="text-black"
        />
        <StatCardGrid
          title="Present"
          value={summary.present}
          color="text-green-500"
        />
        <StatCardGrid
          title="Absent"
          value={summary.absent}
          color="text-red-500"
        />
        <StatCardGrid
          title="Avg Hours"
          value={`${summary.avgHours}h`}
          color="text-blue-500"
        />
      </div>

      {/* TABLE */}
      <AttendanceTable
        records={records}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onSearchChange={setSearchValue}
        onDateChange={setDateValue}
        searchValue={searchValue}
        dateValue={dateValue}
      />

      {/* MODAL */}
      <AttendanceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        employees={mockEmployees}
        editingRecord={editingRecord}
        loading={submitting || loading}
      />
    </div>
  );
}
