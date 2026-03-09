// src/Pages/Track.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8080/api/orders";

export default function Track() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/${id}/track`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data?.data || []);
      } catch (e) {
        setErr(e.response?.data?.message || "Failed to load track data");
      } finally {
        setLoading(false);
      }
    };
    fetchTrack();
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (err) return <div className="p-6 text-red-400">{err}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] text-white p-6">
      <h1 className="text-3xl text-[#C9BEFF] font-bold mb-6">Track Order</h1>

      <div className="space-y-3">
        {events.map((item, idx) => (
          <div key={idx} className="border border-white/15 rounded-xl p-4 bg-[#111a38]">
            <p className="font-semibold text-[#C9BEFF]">{item.status}</p>
            <p className="text-slate-300 text-sm">{item.note}</p>
            <p className="text-slate-400 text-xs">{new Date(item.at).toLocaleString("en-IN")}</p>
          </div>
        ))}
      </div>

      <Link to="/customer-dashboard" className="inline-block mt-6 text-[#C9BEFF] hover:underline">
        Back
      </Link>
    </div>
  );
}
