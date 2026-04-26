"use client";

import { useState } from "react";
import { FiUserPlus } from "react-icons/fi";

type Status =
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  date: string;
  status: Status;
}

const initialData: Candidate[] = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice@example.com",
    phone: "+1234567895",
    position: "Frontend Developer",
    experience: "3 years",
    date: "2026-03-15",
    status: "interview",
  },
  {
    id: 2,
    name: "Bob Martin",
    email: "bob@example.com",
    phone: "+1234567896",
    position: "Backend Developer",
    experience: "5 years",
    date: "2026-03-20",
    status: "screening",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    phone: "+1234567897",
    position: "UI/UX Designer",
    experience: "4 years",
    date: "2026-03-10",
    status: "offer",
  },
];

const tabs = [
  "all",
  "applied",
  "screening",
  "interview",
  "offer",
  "hired",
  "rejected",
];

export default function HiringPage() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all" ? data : data.filter((c) => c.status === activeTab);

  const updateStatus = (id: number, status: Status) => {
    setData((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const count = (status: string) =>
    status === "all"
      ? data.length
      : data.filter((d) => d.status === status).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Hiring & Recruitment</h1>
          <p className="text-gray-500">Manage candidates and hiring process</p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm">
          <FiUserPlus />
          Add Candidate
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-7 gap-3">
        {tabs.map((t) => (
          <StatCard key={t} label={t} value={count(t)} />
        ))}
      </div>

      {/* TABLE CARD */}
      <div className="bg-white border rounded-xl p-4">
        {/* TABS */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm capitalize text-black rounded-full transition
                ${activeTab === tab ? "bg-white " : "opacity-70 hover:opacity-100"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 text-left">Candidate</th>
              <th>Contact</th>
              <th>Position</th>
              <th>Experience</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b">
                {/* NAME */}
                <td className="py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full">
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="font-medium">{c.name}</span>
                </td>

                {/* CONTACT */}
                <td>
                  <p>{c.email}</p>
                  <p className="text-gray-400 text-xs">{c.phone}</p>
                </td>

                <td>{c.position}</td>
                <td>{c.experience}</td>
                <td>{c.date}</td>

                {/* STATUS */}
                <td>
                  <span className={`status ${c.status}`}>{c.status}</span>
                </td>

                {/* ACTION */}
                <td>
                  <select
                    value={c.status}
                    onChange={(e) =>
                      updateStatus(c.id, e.target.value as Status)
                    }
                    className="border px-2 py-1 rounded-md text-sm"
                  >
                    {tabs
                      .filter((t) => t !== "all")
                      .map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* STAT CARD */
function StatCard({ label, value }: any) {
  return (
    <div className="bg-white border rounded-xl p-3 text-center">
      <p className="text-gray-500 text-sm capitalize">{label}</p>
      <h2 className="text-lg font-semibold">{value}</h2>
    </div>
  );
}
