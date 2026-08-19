"use client";

import { loginUser } from "@/app/api/auth/auth";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Building2 } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginUser({ email: form.email, password: form.password });
      if (result && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userRole", result.user.roles?.[0] ?? "");
        localStorage.setItem("userName", result.user.name);
        localStorage.setItem("userEmail", result.user.email);
        toast.success("Login successful");
        router.push("/dashboard");
      } else {
        toast.error("Login failed: invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center px-4 bg-[#eef2f6]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-[#2563eb] p-3.5 rounded-full flex items-center justify-center text-white">
                <Building2 className="w-7 h-7" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">HRMS Portal</h1>
            <p className="text-sm text-gray-500">Sign in to access your account</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb] focus:border-transparent outline-none transition-all text-sm"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#2563eb] focus:border-transparent outline-none transition-all text-sm"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#0b0f19] hover:bg-[#1f2937] text-white py-3 rounded-lg font-semibold transition active:scale-[0.98] disabled:bg-gray-400 text-sm shadow-sm cursor-pointer mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-6 bg-[#eff6ff] p-4 rounded-xl text-left border border-[#d6e4f8]">
            <p className="font-bold text-gray-800 text-sm mb-1.5">Demo Credentials:</p>
            <div className="text-gray-700 text-xs space-y-1">
              <p>
                <span className="font-semibold text-gray-900">Admin:</span> admin@hrms.com / admin123
              </p>
              <p>
                <span className="font-semibold text-gray-900">Staff:</span> john@hrms.com / staff123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
