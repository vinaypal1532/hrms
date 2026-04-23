import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-shell">
      <Sidebar />

      <div className="dashboard-main">
        <Header />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
