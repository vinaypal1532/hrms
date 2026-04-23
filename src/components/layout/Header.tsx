"use client";

import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <header className="h-16 bg-white flex items-center justify-between px-6">
      
      {/* LEFT */}
      <h1 className="text-lg font-semibold text-gray-800">
        Dashboard
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* User Info */}
        <div className="flex items-center gap-2 text-right">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Admin User
            </p>
            <p className="text-xs text-gray-500">
              admin@hrms.com
            </p>
          </div>

          <div className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full">
            <FiUser className="text-gray-600" />
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border hover:bg-gray-100 transition"
        >
          <FiLogOut />
          Logout
        </button>

      </div>
    </header>
  );
}