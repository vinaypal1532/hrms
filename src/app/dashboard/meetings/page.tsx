"use client";

import { useEffect, useMemo, useState } from "react";
import { 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiGlobe, 
  FiLock, 
  FiTrash2, 
  FiPlus, 
  FiChevronLeft, 
  FiChevronRight,
  FiList
} from "react-icons/fi";
import toast from "react-hot-toast";

interface Meeting {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  visibility: "Public" | "Private";
  color: string;
  deletable: boolean;
}

const monthName = "August 2026";
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const DEFAULT_MEETINGS: Meeting[] = [
  {
    id: "meet-1",
    title: "Sprint Planning",
    description: "Quarterly sprint planning for Q3 deliverables.",
    location: "Conference Room A",
    startDate: "2026-08-05",
    startTime: "10:00 am",
    endDate: "2026-08-05",
    endTime: "11:30 am",
    visibility: "Public",
    color: "#2f80ed",
    deletable: true,
  },
  {
    id: "meet-2",
    title: "Client Presentation",
    description: "Presenting Q2 marketing results to stakeholders.",
    location: "Zoom",
    startDate: "2026-08-06",
    startTime: "02:00 pm",
    endDate: "2026-08-06",
    endTime: "03:00 pm",
    visibility: "Public",
    color: "#27ae60",
    deletable: false,
  },
  {
    id: "meet-3",
    title: "One-on-One Review",
    description: "Monthly performance check-in.",
    location: "Manager's Office",
    startDate: "2026-08-07",
    startTime: "09:00 am",
    endDate: "2026-08-07",
    endTime: "09:30 am",
    visibility: "Private",
    color: "#f2994a",
    deletable: true,
  },
  {
    id: "meet-4",
    title: "Sales Strategy Meeting",
    description: "Discuss Q3 sales targets and territories.",
    location: "Board Room",
    startDate: "2026-08-08",
    startTime: "11:00 am",
    endDate: "2026-08-08",
    endTime: "12:30 pm",
    visibility: "Public",
    color: "#9b51e0",
    deletable: false,
  },
];

const firstDayOfMonth = 1;
const totalDays = 31;
const emptyCellsBefore = 6; // August 1, 2026 is Saturday

export default function MeetingsPage() {
  const [view, setView] = useState<"Calendar" | "List">("Calendar");
  const [selectedDay, setSelectedDay] = useState<number | null>(18);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [userRole, setUserRole] = useState("Staff");

  // Load user role and meetings
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole") || "Staff";
      setUserRole(storedRole);

      const storedMeetings = localStorage.getItem("hrms_meetings");
      if (storedMeetings) {
        setMeetings(JSON.parse(storedMeetings));
      } else {
        setMeetings(DEFAULT_MEETINGS);
        localStorage.setItem("hrms_meetings", JSON.stringify(DEFAULT_MEETINGS));
      }
    }
  }, []);

  // Sync meetings with localStorage
  const saveMeetings = (updatedMeetings: Meeting[]) => {
    setMeetings(updatedMeetings);
    localStorage.setItem("hrms_meetings", JSON.stringify(updatedMeetings));
  };

  // Form states for booking modal
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("2026-08-18");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("2026-08-18");
  const [endTime, setEndTime] = useState("");
  const [agenda, setAgenda] = useState("");
  const [colorLabel, setColorLabel] = useState("#2f80ed");
  const [visibility, setVisibility] = useState<"Public" | "Private">("Public");

  const calendarDays = useMemo(() => {
    const cells: Array<{ day: number | null; isCurrentMonth: boolean }> = [];

    for (let i = 0; i < emptyCellsBefore; i++) {
      cells.push({ day: null, isCurrentMonth: false });
    }
    for (let i = 1; i <= totalDays; i++) {
      cells.push({ day: i, isCurrentMonth: true });
    }
    while (cells.length < 42) {
      cells.push({ day: null, isCurrentMonth: false });
    }

    return cells;
  }, []);

  // Filter meetings for calendar view cells
  const getMeetingsForDay = (day: number | null) => {
    if (!day) return [];
    return meetings.filter((m) => {
      if (!m.startDate) return false;
      const parts = m.startDate.split("-");
      const y = parseInt(parts[0], 10);
      const mMonth = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      return y === 2026 && mMonth === 8 && d === day;
    });
  };

  // Date and Time formatter
  const formatDateString = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = String(date.getDate()).padStart(2, "0");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatTimeString = (timeStr: string) => {
    if (!timeStr) return "";
    if (timeStr.toLowerCase().includes("am") || timeStr.toLowerCase().includes("pm")) return timeStr;
    const parts = timeStr.split(":");
    if (parts.length < 2) return timeStr;
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !location || !startDate || !startTime || !endDate || !endTime) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newMeeting: Meeting = {
      id: `meet-${Date.now()}`,
      title: eventName,
      description: agenda,
      location,
      startDate,
      startTime: formatTimeString(startTime),
      endDate,
      endTime: formatTimeString(endTime),
      visibility,
      color: colorLabel,
      deletable: true,
    };

    saveMeetings([newMeeting, ...meetings]);
    toast.success("Meeting booked successfully!");
    setIsModalOpen(false);

    // Reset Form
    setEventName("");
    setLocation("");
    setStartDate("2026-08-18");
    setStartTime("");
    setEndDate("2026-08-18");
    setEndTime("");
    setAgenda("");
    setColorLabel("#2f80ed");
    setVisibility("Public");
  };

  const handleDeleteMeeting = (id: string) => {
    if (confirm("Are you sure you want to delete this meeting?")) {
      const updated = meetings.filter((m) => m.id !== id);
      saveMeetings(updated);
      toast.success("Meeting deleted successfully!");
    }
  };

  const colorOptions = [
    { value: "#2f80ed", label: "Blue" },
    { value: "#27ae60", label: "Green" },
    { value: "#f2994a", label: "Orange" },
    { value: "#ef4444", label: "Red" },
    { value: "#ec4899", label: "Pink" },
    { value: "#14b8a6", label: "Teal" },
    { value: "#9b51e0", label: "Purple" },
  ];

  return (
    <div className="space-y-6 p-2">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[2.1rem] font-bold text-[#1f2937] tracking-tight">Meetings</h1>
          <p className="text-[#6b7280] text-sm mt-1">Book and manage your meetings</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle buttons */}
          <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setView("Calendar")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                view === "Calendar"
                  ? "bg-white text-[#2563eb] shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FiCalendar className="w-4 h-4" />
              Calendar
            </button>
            <button
              onClick={() => setView("List")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                view === "List"
                  ? "bg-[#2563eb] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FiList className="w-4 h-4" />
              List
            </button>
          </div>

          {/* Book meeting button (available to all roles) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-gray-800 transition active:scale-[0.98]"
          >
            <FiPlus className="w-4 h-4" />
            Book Meeting
          </button>
        </div>
      </div>

      {/* CALENDAR VIEW */}
      {view === "Calendar" && (
        <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
            <h2 className="text-[2rem] font-bold text-[#1f2937]">{monthName}</h2>
            <div className="flex items-center gap-3 text-[#374151]">
              <button className="text-xl font-medium p-1 hover:bg-gray-100 rounded-lg transition"><FiChevronLeft /></button>
              <button className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-[#d1d5db] bg-white hover:bg-gray-50 transition">Today</button>
              <button className="text-xl font-medium p-1 hover:bg-gray-100 rounded-lg transition"><FiChevronRight /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-[#e5e7eb] bg-[#f9fafb] text-[0.7rem] font-semibold text-[#9ca3af] uppercase">
            {weekDays.map((day) => (
              <div key={day} className="px-3 py-4 text-center">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 bg-white">
            {calendarDays.map((cell, index) => {
              const isSelected = cell.day === selectedDay;
              const dayMeetings = getMeetingsForDay(cell.day);

              return (
                <div
                  key={`${cell.day ?? "empty"}-${index}`}
                  className={`relative min-h-[130px] border-r border-b border-[#e5e7eb] p-2 transition-all ${
                    cell.day === null ? "bg-[#f9fafb]" : "bg-white hover:bg-gray-50/50"
                  }`}
                >
                  {cell.day !== null && (
                    <button
                      onClick={() => setSelectedDay(cell.day ?? null)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition ${
                        isSelected ? "bg-[#2563eb] text-white shadow-md" : "text-[#374151] hover:bg-[#f3f4f6]"
                      }`}
                    >
                      {cell.day}
                    </button>
                  )}

                  <div className="mt-3 space-y-1.5 max-h-[85px] overflow-y-auto">
                    {dayMeetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="block w-full rounded-lg px-2 py-1 text-left text-[11px] font-medium text-white shadow-sm relative group cursor-default"
                        style={{ backgroundColor: meeting.color }}
                      >
                        <span className="block truncate font-bold">{meeting.title}</span>
                        <span className="block text-[9px] opacity-90">{meeting.startTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {view === "List" && (
        <div className="space-y-6">
          {/* My Meetings Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">My Meetings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600 font-semibold bg-[#f9fafb]">
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Start</th>
                    <th className="px-6 py-4">End</th>
                    <th className="px-6 py-4">Visibility</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 divide-y divide-gray-100">
                  {meetings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No meetings scheduled.
                      </td>
                    </tr>
                  ) : (
                    meetings.map((meeting) => (
                      <tr key={meeting.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3 w-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: meeting.color }}
                            />
                            <div>
                              <p className="font-semibold text-gray-900">{meeting.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">
                                {meeting.description || "No agenda description provided."}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <FiMapPin className="text-gray-400" />
                            {meeting.location}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {formatDateString(meeting.startDate)}, {meeting.startTime}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {formatDateString(meeting.endDate)}, {meeting.endTime}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                              meeting.visibility === "Public"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {meeting.visibility === "Public" ? (
                              <FiGlobe className="w-3.5 h-3.5" />
                            ) : (
                              <FiLock className="w-3.5 h-3.5" />
                            )}
                            {meeting.visibility}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {meeting.deletable ? (
                            <button
                              onClick={() => handleDeleteMeeting(meeting.id)}
                              className="p-2 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700 transition"
                              title="Delete Meeting"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Meetings section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Meetings</h2>
            <div className="py-8 text-center text-gray-400 text-sm">
              No upcoming meetings
            </div>
          </div>
        </div>
      )}

      {/* BOOK MEETING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Book a Meeting</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl transition"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleBookMeeting} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Event Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sprint Planning"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Conference Room A, Zoom"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    End Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Message / Agenda
                </label>
                <textarea
                  placeholder="Describe the purpose or agenda..."
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-sm text-gray-800 h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Color Label
                </label>
                <div className="flex items-center gap-3">
                  {colorOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setColorLabel(opt.value)}
                      className={`h-7 w-7 rounded-full transition-transform active:scale-95 flex items-center justify-center ${
                        colorLabel === opt.value
                          ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: opt.value }}
                      title={opt.label}
                    >
                      {colorLabel === opt.value && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Visibility
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibility("Public")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition active:scale-[0.98] ${
                      visibility === "Public"
                        ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700 bg-white"
                    }`}
                  >
                    <FiGlobe className="w-4 h-4" />
                    Public
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibility("Private")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition active:scale-[0.98] ${
                      visibility === "Private"
                        ? "border-purple-500 bg-[#f5f3ff] text-purple-600"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700 bg-white"
                    }`}
                  >
                    <FiLock className="w-4 h-4" />
                    Private
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition text-sm active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-black text-white hover:bg-gray-800 rounded-xl font-semibold transition text-sm shadow-sm active:scale-[0.98]"
                >
                  Book Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
