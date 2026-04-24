"use client";

import { useState } from "react";
import { FiPlus, FiEye, FiStar } from "react-icons/fi";

interface Review {
  id: number;
  name: string;
  role: string;
  period: string;
  rating: number;
  date: string;
  status: "completed" | "pending";
}

export default function PerformancePage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "John Smith",
      role: "Senior Developer",
      period: "Q1 2026",
      rating: 4.5,
      date: "2026-03-15",
      status: "completed",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Marketing Manager",
      period: "Q1 2026",
      rating: 4,
      date: "2026-03-10",
      status: "completed",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    period: "",
    rating: "",
    strengths: "",
    improvements: "",
    goals: "",
  });

  // 🔥 Stats
  const totalReviews = reviews.length;
  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) /
    reviews.length || 0;

  const thisQuarter = reviews.length;

  // 🔥 Add Review
  const handleCreate = () => {
    if (!form.employee || !form.period || !form.rating) return;

    const newReview: Review = {
      id: Date.now(),
      name: form.employee,
      role: "Employee",
      period: form.period,
      rating: Number(form.rating),
      date: new Date().toISOString().split("T")[0],
      status: "completed",
    };

    setReviews([...reviews, newReview]);

    setForm({
      employee: "",
      period: "",
      rating: "",
      strengths: "",
      improvements: "",
      goals: "",
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Performance Reviews
          </h1>
          <p className="text-gray-500">
            Conduct and manage employee performance reviews
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          <FiPlus />
          New Review
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total Reviews" value={totalReviews} />
        <StatCard
          title="Average Rating"
          value={avgRating.toFixed(1)}
        />
        <StatCard title="This Quarter" value={thisQuarter} />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3 text-left">Period</th>
              <th className="px-6 py-3 text-left">Rating</th>
              <th className="px-6 py-3 text-left">Review Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-t">

                {/* EMPLOYEE */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    {r.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-gray-400 text-xs">
                      {r.role}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">{r.period}</td>

                {/* RATING */}
                <td className="px-6 py-4 flex items-center gap-1">
                  <FiStar className="text-yellow-500" />
                  {r.rating}
                </td>

                <td className="px-6 py-4">{r.date}</td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    {r.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-4">
                  <button className="text-gray-600 hover:text-black">
                    <FiEye />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-[500px] rounded-xl p-6 space-y-4">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Create Performance Review
              </h2>
              <button onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            {/* ROW */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.employee}
                onChange={(e) =>
                  setForm({ ...form, employee: e.target.value })
                }
                className="border px-3 py-2 rounded-md"
              >
                <option value="">Select employee</option>
                <option>John Smith</option>
                <option>Sarah Johnson</option>
              </select>

              <input
                type="text"
                placeholder="e.g., Q1 2026"
                value={form.period}
                onChange={(e) =>
                  setForm({ ...form, period: e.target.value })
                }
                className="border px-3 py-2 rounded-md"
              />
            </div>

            {/* RATING */}
            <input
              type="number"
              placeholder="Overall Rating (1-5)"
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-md"
            />

            {/* TEXTAREAS */}
            <textarea
              placeholder="Strengths"
              value={form.strengths}
              onChange={(e) =>
                setForm({ ...form, strengths: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-md"
            />

            <textarea
              placeholder="Areas for Improvement"
              value={form.improvements}
              onChange={(e) =>
                setForm({ ...form, improvements: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-md"
            />

            <textarea
              placeholder="Goals for Next Period"
              value={form.goals}
              onChange={(e) =>
                setForm({ ...form, goals: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-md"
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Create Review
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/* STAT CARD */
function StatCard({ title, value }: any) {
  return (
    <div className="bg-white border rounded-xl p-4 text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
    </div>
  );
}