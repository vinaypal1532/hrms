"use client";

import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiBriefcase, FiUsers, FiCheckCircle, FiXCircle, FiDollarSign, FiClock, FiBuilding2, FiMapPin } from "react-icons/fi";
import { createClient, deleteClient, getAllClients, updateClient, type ClientPayload } from "@/app/api/clients";

interface ClientRow {
  id: number;
  company_name: string;
  industry: string;
  contact_name: string;
  contact_mobile: string;
  contact_email: string;
  billing_model: string;
  rate_per_employee: string | number | null;
  status: boolean;
  city: string;
  state: string;
  address: string;
  gst_number?: string;
  pan_number?: string;
  website?: string;
  contact_designation?: string;
}

const initialForm: ClientPayload = {
  company_name: "",
  industry: "",
  gst_number: "",
  pan_number: "",
  website: "",
  address: "",
  city: "",
  state: "",
  contact_name: "",
  contact_designation: "",
  contact_mobile: "",
  contact_email: "",
  billing_model: "Per Employee",
  rate_per_employee: "",
  status: true,
};

const currency = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") return "—";
  const amount = Number(value);
  if (Number.isNaN(amount)) return String(value);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ClientPayload>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientRow | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchClients = async () => {
    if (!token) {
      setError("Token not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await getAllClients(token);
      setClients(Array.isArray(res?.data) ? res.data : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const q = search.toLowerCase();
      return (
        c.company_name.toLowerCase().includes(q) ||
        c.contact_name.toLowerCase().includes(q) ||
        c.contact_email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    });
  }, [clients, search]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setSelectedClient(null);
    setShowModal(true);
  };

  const openEditModal = (client: ClientRow) => {
    setEditingId(client.id);
    setSelectedClient(client);
    setForm({
      company_name: client.company_name,
      industry: client.industry,
      gst_number: client.gst_number || "",
      pan_number: client.pan_number || "",
      website: client.website || "",
      address: client.address,
      city: client.city,
      state: client.state,
      contact_name: client.contact_name,
      contact_designation: client.contact_designation || "",
      contact_mobile: client.contact_mobile,
      contact_email: client.contact_email,
      billing_model: client.billing_model,
      rate_per_employee: client.rate_per_employee ?? "",
      status: client.status,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!token) return;

    const payload = {
      ...form,
      rate_per_employee: form.rate_per_employee === "" ? null : form.rate_per_employee,
      status: form.status ?? true,
    };

    try {
      setSaving(true);
      if (editingId) {
        await updateClient(token, editingId, payload);
      } else {
        await createClient(token, payload);
      }
      setShowModal(false);
      setForm(initialForm);
      setEditingId(null);
      setSelectedClient(null);
      await fetchClients();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!window.confirm("Delete this client?")) return;

    try {
      await deleteClient(token, id);
      await fetchClients();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const activeClients = clients.filter((c) => c.status).length;
  const monthlyRevenue = clients.reduce((sum, c) => {
    const value = Number(c.rate_per_employee ?? 0);
    return Number.isFinite(value) ? sum + value : sum;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900 tracking-tight">Client Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage client accounts, contracts, and deployments</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b0f19] text-white text-sm font-semibold shadow-sm hover:bg-[#1f2937] transition"
        >
          <FiPlus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard icon={<FiBriefcase />} label="Active Clients" value={String(activeClients)} tone="blue" />
        <StatCard icon={<FiDollarSign />} label="Monthly Revenue" value={`₹${(monthlyRevenue / 100000).toFixed(1)}L`} tone="green" />
        <StatCard icon={<FiUsers />} label="Active Contracts" value={String(clients.length)} tone="purple" />
        <StatCard icon={<FiClock />} label="Expiring Soon" value="1" tone="amber" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40 text-gray-600">
                <th className="px-6 py-3.5 font-semibold">Company</th>
                <th className="px-6 py-3.5 font-semibold">Contact Person</th>
                <th className="px-6 py-3.5 font-semibold">Active Contract</th>
                <th className="px-6 py-3.5 font-semibold">Billing Model</th>
                <th className="px-6 py-3.5 font-semibold">Employees</th>
                <th className="px-6 py-3.5 font-semibold">Monthly Billing</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">Loading clients...</td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">No clients found.</td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50/60">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] font-bold flex items-center justify-center text-xs">
                          {client.company_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{client.company_name}</div>
                          <div className="text-xs text-gray-500">{client.industry}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{client.contact_name}</div>
                      <div className="text-xs text-gray-500">{client.contact_mobile}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-semibold">
                        {client.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{client.billing_model}</td>
                    <td className="px-6 py-4 text-gray-700">2</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{currency(client.rate_per_employee)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${client.status ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                        {client.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelectedClient(client)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="View"><FiEye className="w-4 h-4" /></button>
                        <button onClick={() => openEditModal(client)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="Edit"><FiEdit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(client.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500" title="Delete"><FiTrash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/35 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">{editingId ? "Edit Client" : "Add New Client"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><FiBriefcase className="text-gray-600" /> Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input label="Company Name *" value={form.company_name} onChange={(v) => setForm({ ...form, company_name: v })} />
                  <Input label="Industry *" value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} />
                  <Input label="GST Number" value={form.gst_number || ""} onChange={(v) => setForm({ ...form, gst_number: v })} />
                  <Input label="PAN Number" value={form.pan_number || ""} onChange={(v) => setForm({ ...form, pan_number: v })} />
                  <Input label="Website" value={form.website || ""} onChange={(v) => setForm({ ...form, website: v })} />
                  <div className="md:col-span-2">
                    <Input label="Address *" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                  </div>
                  <Input label="City *" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                  <Input label="State *" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><FiUsers className="text-gray-600" /> Contact Person</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input label="Name *" value={form.contact_name} onChange={(v) => setForm({ ...form, contact_name: v })} />
                  <Input label="Designation" value={form.contact_designation || ""} onChange={(v) => setForm({ ...form, contact_designation: v })} />
                  <Input label="Mobile *" value={form.contact_mobile} onChange={(v) => setForm({ ...form, contact_mobile: v })} />
                  <Input label="Email *" type="email" value={form.contact_email} onChange={(v) => setForm({ ...form, contact_email: v })} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><FiDollarSign className="text-gray-600" /> Billing Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Select
                    label="Billing Model *"
                    value={form.billing_model}
                    options={["Per Employee", "Fixed Monthly", "Yearly", "Custom"]}
                    onChange={(v) => setForm({ ...form, billing_model: v })}
                  />
                  <Input
                    label="Rate per Employee/Month (₹)"
                    type="number"
                    value={String(form.rate_per_employee ?? "")}
                    onChange={(v) => setForm({ ...form, rate_per_employee: v })}
                  />
                </div>
              </div>

              {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSubmit} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#0b0f19] text-white hover:bg-[#1f2937] disabled:opacity-60">
                  {saving ? (editingId ? "Updating..." : "Creating...") : editingId ? "Update Client" : "Add Client"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedClient && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-4">
          <div className="max-w-6xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] font-bold flex items-center justify-center text-xs">
                  {selectedClient.company_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedClient.company_name}</h3>
                  <p className="text-sm text-gray-500">{selectedClient.industry} • {selectedClient.city}, {selectedClient.state}</p>
                </div>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
              <MiniCard icon={<FiUsers />} title="Total Deployed" value="2" />
              <MiniCard icon={<FiCheckCircle />} title="Active" value="2" />
              <MiniCard icon={<FiClock />} title="Vacant Positions" value="2" />
              <MiniCard icon={<FiDollarSign />} title="Monthly Payroll" value="₹160K" />
            </div>

            <div className="px-6 pb-6">
              <div className="border-b border-gray-200 pb-2 mb-4">
                <div className="flex gap-6 text-sm font-medium">
                  <button className="border-b-2 border-gray-900 pb-2">Overview</button>
                  <button className="text-gray-500 pb-2">Employees (2)</button>
                  <button className="text-gray-500 pb-2">Contracts (1)</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex gap-2"><FiBuilding2 className="mt-1 text-gray-500" /> <span>Industry: {selectedClient.industry}</span></div>
                    <div className="flex gap-2"><FiMapPin className="mt-1 text-gray-500" /> <span>Address: {selectedClient.address}, {selectedClient.city}, {selectedClient.state}</span></div>
                    {selectedClient.website && <div className="flex gap-2"><FiBriefcase className="mt-1 text-gray-500" /> <span>Website: {selectedClient.website}</span></div>}
                    {selectedClient.gst_number && <div className="flex gap-2"><FiBriefcase className="mt-1 text-gray-500" /> <span>GST: {selectedClient.gst_number}</span></div>}
                    {selectedClient.pan_number && <div className="flex gap-2"><FiBriefcase className="mt-1 text-gray-500" /> <span>PAN: {selectedClient.pan_number}</span></div>}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Person</h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div><span className="text-gray-500">Name:</span> {selectedClient.contact_name}</div>
                    <div><span className="text-gray-500">Designation:</span> {selectedClient.contact_designation || "—"}</div>
                    <div><span className="text-gray-500">Mobile:</span> {selectedClient.contact_mobile}</div>
                    <div><span className="text-gray-500">Email:</span> {selectedClient.contact_email}</div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Billing Configuration</h4>
                    <div className="text-sm text-gray-700">
                      <div>Model: {selectedClient.billing_model}</div>
                      <div>Rate: {currency(selectedClient.rate_per_employee)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "blue" | "green" | "purple" | "amber" }) {
  const map = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${map[tone]}`}>{icon}</div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}

function MiniCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-gray-600">{icon}</div>
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-lg font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1.5">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}
