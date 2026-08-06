"use client";

import StaffForm from "@/components/forms/StaffForm";
import { useState } from "react";

export default function AddStaffPage() {
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Engineering",
    position: "",
    joiningDate: "",
  });

  return (
    <div className="p-10">

      <h1 className="text-4xl mb-10">
        ADD STAFF PAGE
      </h1>

      <StaffForm
        newStaff={newStaff}
        setNewStaff={setNewStaff}
        onSubmit={() => console.log(newStaff)}
        buttonText="Save Staff"
      />

    </div>
  );
}