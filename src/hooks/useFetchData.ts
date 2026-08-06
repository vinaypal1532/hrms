import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function useFetchData<T>(fetchFn: (token: string) => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function executeFetch() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication session missing.");
          return;
        }
        const result = await fetchFn(token);
        setData(result);
      } catch (err: any) {
        console.error("API Fetch Error:", err);
        toast.error(err.message || "Failed to sync dashboard updates.");
      } finally {
        setLoading(false);
      }
    }

    executeFetch();
  }, dependencies);

  return { data, loading };
}