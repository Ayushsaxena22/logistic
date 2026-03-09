// src/Pages/DriverDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/orders";

export default function DriverDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  const fetchAssignedOrders = async () => {
    try {
      const res = await axios.get(`${API}/driver/my-assigned`, authConfig);
      setOrders(res.data?.data || []);
    } catch (error) {
      setMsg(error.response?.data?.message || "Failed to load assigned orders");
    } finally {
      setLoading(false);
    }
  };

  const markOutForDelivery = async (orderId) => {
    try {
      await axios.patch(`${API}/driver/${orderId}/out-for-delivery`, {}, authConfig);
      setMsg("Marked as out for delivery");
      fetchAssignedOrders();
    } catch (error) {
      setMsg(error.response?.data?.message || "Update failed");
    }
  };

  const markDelivered = async (orderId) => {
    try {
      await axios.patch(`${API}/driver/${orderId}/delivered`, {}, authConfig);
      setMsg("Marked as delivered");
      fetchAssignedOrders();
    } catch (error) {
      setMsg(error.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    if (role !== "driver") {
      setMsg("Only driver can access this page.");
      setLoading(false);
      return;
    }
    fetchAssignedOrders();
  }, [role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#C9BEFF] mb-2">Driver Dashboard</h1>
        <p className="text-slate-300 mb-6">Manage your assigned deliveries</p>

        {msg && <p className="mb-4 text-[#d8cfff]">{msg}</p>}
        {loading && <p>Loading...</p>}
        {!loading && orders.length === 0 && <p className="text-slate-300">No assigned orders.</p>}

        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-white/15 bg-[#111a38] p-5">
              <p className="text-sm text-slate-400">Order ID</p>
              <p className="mb-2 break-all">{order._id}</p>

              <p><span className="text-slate-400">Pickup:</span> {order.source}</p>
              <p><span className="text-slate-400">Drop:</span> {order.destination}</p>
              <p><span className="text-slate-400">Status:</span> {order.status}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => markOutForDelivery(order._id)}
                  disabled={order.status !== "assigned"}
                  className="px-3 py-2 rounded-lg bg-[#6367FF] text-white font-semibold disabled:opacity-40"
                >
                  Out for Delivery
                </button>
                <button
                  onClick={() => markDelivered(order._id)}
                  disabled={order.status !== "out_for_delivery"}
                  className="px-3 py-2 rounded-lg bg-[#6367FF] text-white font-semibold disabled:opacity-40"
                >
                  Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
