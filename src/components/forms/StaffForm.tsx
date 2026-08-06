"use client";

interface StaffFormProps {
  newStaff: {
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    joiningDate: string;
      status: string;
  };
  setNewStaff: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      phone: string;
      department: string;
      position: string;
      joiningDate: string;
        status: string;
    }>
  >;
  onSubmit?: () => void;
  loading?: boolean;
  buttonText?: string;
}

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
];

const status = [
  {
    id: 1,
    value: "1",
    label: "Active",
  },
  {
    id: 2,
    value: "0",
    label: "Pending",
  },
  {
    id: 3,
    value: "2",
    label: "Blocked",
  },
];

export default function StaffForm({
  newStaff,
  setNewStaff,
  onSubmit,
  loading = false,
  buttonText = "Save Staff",
}: StaffFormProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

      <div className="space-y-5">

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={newStaff.name}
              onChange={(e) =>
                setNewStaff((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="John Smith"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={newStaff.email}
              onChange={(e) =>
                setNewStaff((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="john@company.com"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* Row 2 */}

        <div className="grid grid-cols-2 gap-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone
            </label>

            <input
              type="text"
              value={newStaff.phone}
              onChange={(e) =>
                setNewStaff((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              placeholder="9876543210"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Department
            </label>

            <select
              value={newStaff.department}
              onChange={(e) =>
                setNewStaff((prev) => ({
                  ...prev,
                  department: e.target.value,
                }))
              }
              className="w-full border rounded-lg px-4 py-3"
            >
              {departments.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3 */}

        <div className="grid grid-cols-2 gap-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Position
            </label>

            <input
              type="text"
              value={newStaff.position}
              onChange={(e) =>
                setNewStaff((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
              placeholder="Software Engineer"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              value={newStaff.status}
              onChange={(e) =>
                setNewStaff((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              className="w-full border rounded-lg px-4 py-3"
            >
             {status.map((item) => (
  <option
    key={item.id}
    value={item.value}
  >
    {item.label}
  </option>
))}
            </select>
          </div>
          </div>
        </div>

      </div>    

    </div>
  );
}