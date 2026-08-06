"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { Building2 } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  role: string;
}

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);

  // Load user metadata safely after mounting on the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole") || "Staff";

      // Attempt to load full user details, or fallback gracefully
      const storedName = localStorage.getItem("userName") || "HRMS User";
      const storedEmail = localStorage.getItem("userEmail") || "";

      setUser({
        name: storedName,
        email: storedEmail,
        role: storedRole,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="flex items-center gap-2.5">
        <div className="bg-[#2563eb] p-2 rounded-lg flex items-center justify-center text-white">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 leading-tight">HRMS Portal</h1>
          <p className="text-[11px] text-gray-500 leading-none">{user?.role === "Admin" ? "Admin Panel" : "Staff Portal"}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {user?.name || "Loading..."}
          </p>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition cursor-pointer"
        >
          <FiLogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </header>
  );
}