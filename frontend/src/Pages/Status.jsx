// src/Pages/Status.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8080/api/orders";

export default function Status() {
  const { id } = useParams();
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/${id}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatusData(res.data?.data);
      } catch (e) {
        setErr(e.response?.data?.message || "Failed to load status");
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (err) return <div className="p-6 text-red-400">{err}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] text-white p-6">
      <h1 className="text-3xl text-[#C9BEFF] font-bold mb-6">Order Status</h1>

      <div className="max-w-md border border-white/15 rounded-2xl p-6 bg-[#111a38]">
        <p className="text-slate-300">Order ID</p>
        <p className="mb-4">{statusData?.orderId}</p>

        <p className="text-slate-300">Current Status</p>
        <p className="text-2xl font-bold text-[#C9BEFF]">{statusData?.status}</p>

        <p className="text-xs text-slate-400 mt-2">
          Updated: {new Date(statusData?.updatedAt).toLocaleString("en-IN")}
        </p>
      </div>

      <Link to="/customer-dashboard" className="inline-block mt-6 text-[#C9BEFF] hover:underline">
        Back
      </Link>
    </div>
  );
}
