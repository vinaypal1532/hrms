const API_URL = "http://localhost:5000/api";

export interface ContractPayload {
  client_id: number;
  start_date: string;
  end_date: string;
  renewal_reminder_days?: number | null;
  rate_card?: string;
  terms?: string;
}

export async function getAllContracts(token: string) {
  const res = await fetch(`${API_URL}/contracts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json().catch(()=>null);
  if(!res.ok){
    const message = body?.message || body?.error || `Request failed ${res.status}`;
    const err = new Error(message) as Error & {status?:number, body?:unknown};
    err.status = res.status; err.body = body; throw err;
  }
  return body;
}

export async function createContract(token: string, payload: ContractPayload) {
  const res = await fetch(`${API_URL}/contracts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(()=>null);
  if(!res.ok){ const message = body?.message || body?.error || `Request failed ${res.status}`; const err = new Error(message) as any; err.status=res.status; err.body=body; throw err; }
  return body;
}

export async function updateContract(token: string, id: number, payload: ContractPayload) {
  const res = await fetch(`${API_URL}/contracts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(()=>null);
  if(!res.ok){ const message = body?.message || body?.error || `Request failed ${res.status}`; const err = new Error(message) as any; err.status=res.status; err.body=body; throw err; }
  return body;
}

export async function deleteContract(token: string, id: number) {
  const res = await fetch(`${API_URL}/contracts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  const body = await res.json().catch(()=>null);
  if(!res.ok){ const message = body?.message || body?.error || `Request failed ${res.status}`; const err = new Error(message) as any; err.status=res.status; err.body=body; throw err; }
  return body;
}
