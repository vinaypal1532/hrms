"use client";

import { useMemo, useState } from "react";

interface Meeting {
  title: string;
  time: string;
  day: number;
  weekIndex: number;
  color: string;
}

const month = "August 2026";
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const meetings: Meeting[] = [
  { title: "Sprint Planning", time: "10:00 am", day: 5, weekIndex: 0, color: "bg-[#2f80ed]" },
  { title: "Client Presentation", time: "02:00 pm", day: 6, weekIndex: 0, color: "bg-[#27ae60]" },
  { title: "One-On-One Review", time: "09:00 am", day: 7, weekIndex: 0, color: "bg-[#f2994a]" },
  { title: "Strategy Meeting", time: "11:00 am", day: 8, weekIndex: 0, color: "bg-[#9b51e0]" },
];

const firstDayOfMonth = 1;
const totalDays = 31;

export default function MeetingsPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(18);

  const calendarDays = useMemo(() => {
    const cells: Array<{ day: number | null; isCurrentMonth: boolean }> = [];

    for (let i = 0; i < 42; i += 1) {
      const dayNumber = i - 1 + firstDayOfMonth;
      if (i < 1 || dayNumber > totalDays) {
        cells.push({ day: null, isCurrentMonth: false });
      } else {
        cells.push({ day: dayNumber, isCurrentMonth: true });
      }
    }

    return cells;
  }, []);

  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[2.1rem] font-bold text-[#1f2937] tracking-tight">Meetings</h1>
          <p className="text-[#6b7280] text-sm mt-1">All staff meeting bookings</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] shadow-sm hover:bg-[#f9fafb]">
            <span className="inline-block h-4 w-4 rounded-md border border-[#6b7280] bg-white relative">
              <span className="absolute inset-[2px] rounded-sm bg-[#f3f4f6]" />
            </span>
            Calendar
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] shadow-sm hover:bg-[#f9fafb]">
            <span className="flex flex-col gap-[2px]">
              <span className="h-[2px] w-4 rounded-full bg-[#374151]" />
              <span className="h-[2px] w-4 rounded-full bg-[#374151]" />
              <span className="h-[2px] w-4 rounded-full bg-[#374151]" />
            </span>
            List
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
          <h2 className="text-[2rem] font-bold text-[#1f2937]">{month}</h2>
          <div className="flex items-center gap-4 text-[#374151]">
            <button className="text-xl font-medium">‹</button>
            <button className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-[#d1d5db] bg-white">Today</button>
            <button className="text-xl font-medium">›</button>
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
            const dayMeetings = meetings.filter((meeting) => meeting.day === cell.day);

            return (
              <div
                key={`${cell.day ?? "empty"}-${index}`}
                className={`relative min-h-[130px] border-r border-b border-[#e5e7eb] p-2 ${cell.day === null ? "bg-[#f9fafb]" : "bg-white"}`}
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

                <div className="mt-3 space-y-2">
                  {dayMeetings.map((meeting) => (
                    <button
                      key={`${meeting.day}-${meeting.title}`}
                      className={`block w-full rounded-md px-2 py-1.5 text-left text-[11px] font-medium text-white shadow-sm ${meeting.color}`}
                    >
                      <span className="block">{meeting.time}</span>
                      <span className="block text-[10px] opacity-90">{meeting.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
