import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 bg-[#f8fafc] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
