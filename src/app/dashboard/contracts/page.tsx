"use client";

import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { getAllClients } from "@/app/api/clients";
import { createContract, deleteContract, getAllContracts, updateContract } from "@/app/api/contracts";

interface ContractRow {
  id: number;
  contract_number: string;
  client_name: string;
  start_date: string;
  end_date: string;
  renewal_reminder_days: number | null;
  status: string;
  rate_card?: string;
  terms?: string;
}

const initialForm = {
  client_id: 0,
  start_date: "",
  end_date: "",
  renewal_reminder_days: 30,
  rate_card: "",
  terms: "",
};

export default function ContractsPage() {
  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<any>(initialForm);
  const [search, setSearch] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchAll();
    fetchClients();
  }, []);

  const fetchAll = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getAllContracts(token);
      setContracts(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    if (!token) return;
    try {
      const res = await getAllClients(token);
      setClients(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return contracts.filter((c) => c.contract_number.toLowerCase().includes(q) || c.client_name.toLowerCase().includes(q));
  }, [contracts, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const openEdit = (c: ContractRow) => {
    setEditingId(c.id);
    setForm({
      client_id: clients.find((cl) => cl.company_name === c.client_name)?.id || 0,
      start_date: c.start_date,
      end_date: c.end_date,
      renewal_reminder_days: c.renewal_reminder_days,
      rate_card: c.rate_card || "",
      terms: c.terms || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!token) return;
    try {
      if (editingId) {
        await updateContract(token, editingId, form);
      } else {
        await createContract(token, form);
      }
      setShowModal(false);
      await fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("Delete contract?")) return;
    try {
      await deleteContract(token, id);
      await fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage client contracts and renewal tracking</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b0f19] text-white"> <FiPlus /> New Contract</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search contracts..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40 text-gray-600">
                <th className="px-6 py-3.5">Contract #</th>
                <th className="px-6 py-3.5">Client</th>
                <th className="px-6 py-3.5">Start Date</th>
                <th className="px-6 py-3.5">End Date</th>
                <th className="px-6 py-3.5">Days Left</th>
                <th className="px-6 py-3.5">Renewal Reminder</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-6 py-12 text-center">Loading...</td></tr>
              ) : filtered.length===0 ? (
                <tr><td colSpan={8} className="px-6 py-12 text-center">No contracts</td></tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50/60">
                    <td className="px-6 py-4">{c.contract_number}</td>
                    <td className="px-6 py-4">{c.client_name}</td>
                    <td className="px-6 py-4">{c.start_date}</td>
                    <td className="px-6 py-4">{c.end_date}</td>
                    <td className="px-6 py-4">—</td>
                    <td className="px-6 py-4">{c.renewal_reminder_days ? `${c.renewal_reminder_days} days before` : "—"}</td>
                    <td className="px-6 py-4">{c.status}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={()=>{/* view modal later */}} className="p-2 rounded-lg hover:bg-gray-100"><FiEye /></button>
                        <button onClick={()=>openEdit(c)} className="p-2 rounded-lg hover:bg-gray-100"><FiEdit2 /></button>
                        <button onClick={()=>handleDelete(c.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><FiTrash2 /></button>
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
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{editingId?"Edit Contract":"New Contract"}</h3>
              <button onClick={()=>setShowModal(false)} className="text-2xl text-gray-400">×</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block"><span className="text-sm text-gray-700 mb-1 block">Client *</span>
                <select value={form.client_id} onChange={(e)=>setForm({...form, client_id: Number(e.target.value)})} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm">
                  <option value={0}>Select client</option>
                  {clients.map((cl)=> <option key={cl.id} value={cl.id}>{cl.company_name}</option>)}
                </select>
              </label>
              <label className="block"><span className="text-sm text-gray-700 mb-1 block">Start Date *</span>
                <input type="date" value={form.start_date} onChange={(e)=>setForm({...form, start_date: e.target.value})} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
              </label>
              <label className="block"><span className="text-sm text-gray-700 mb-1 block">End Date *</span>
                <input type="date" value={form.end_date} onChange={(e)=>setForm({...form, end_date: e.target.value})} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
              </label>
              <label className="block"><span className="text-sm text-gray-700 mb-1 block">Renewal Reminder (days)</span>
                <input type="number" value={form.renewal_reminder_days} onChange={(e)=>setForm({...form, renewal_reminder_days: Number(e.target.value)})} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
              </label>
              <label className="md:col-span-2 block"><span className="text-sm text-gray-700 mb-1 block">Rate Card</span>
                <textarea value={form.rate_card} onChange={(e)=>setForm({...form, rate_card: e.target.value})} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" rows={3}></textarea>
              </label>
              <label className="md:col-span-2 block"><span className="text-sm text-gray-700 mb-1 block">Terms & Conditions</span>
                <textarea value={form.terms} onChange={(e)=>setForm({...form, terms: e.target.value})} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" rows={3}></textarea>
              </label>

            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 rounded-xl border border-gray-200">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-[#0b0f19] text-white">Create Contract</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
