import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/orders";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState({});
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [suggestedDrivers, setSuggestedDrivers] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const mergedDrivers = useMemo(() => {
    const map = new Map();
    for (const d of suggestedDrivers) map.set(d._id, d);
    for (const d of drivers) if (!map.has(d._id)) map.set(d._id, d);
    return Array.from(map.values());
  }, [suggestedDrivers, drivers]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/admin/all`, authConfig);
      setOrders(res.data?.data || []);
    } catch (error) {
      setMsg(error.response?.data?.message || "Failed to load orders");
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/drivers", authConfig);
      setDrivers(res.data?.data || []);
    } catch {
      setDrivers([]);
    }
  };

  const searchOrdersByDestination = async () => {
    try {
      const q = searchDestination.trim();

      if (!q) {
        await fetchOrders();
        setSuggestedDrivers([]);
        return;
      }

      const [ordersRes, driversRes] = await Promise.all([
        axios.get(`${API}/admin/search?destination=${encodeURIComponent(q)}`, authConfig),
        axios.get(
          `${API}/admin/suggested-drivers?destination=${encodeURIComponent(q)}`,
          authConfig
        ),
      ]);

      setOrders(ordersRes.data?.data || []);
      setSuggestedDrivers(driversRes.data?.data || []);
      setMsg("");
    } catch (error) {
      setMsg(error.response?.data?.message || "Search failed");
    }
  };

  const clearSearch = async () => {
    setSearchDestination("");
    setSuggestedDrivers([]);
    await fetchOrders();
  };

  const approveOrder = async (orderId) => {
    try {
      await axios.patch(`${API}/admin/${orderId}/approve`, {}, authConfig);
      setMsg("Order approved successfully");
      await fetchOrders();
    } catch (error) {
      setMsg(error.response?.data?.message || "Approve failed");
    }
  };

  const assignDriver = async (orderId) => {
    const driverId = selectedDriver[orderId];
    if (!driverId) {
      setMsg("Please select a driver first");
      return;
    }

    try {
      await axios.patch(`${API}/admin/${orderId}/assign-driver`, { driverId }, authConfig);
      setMsg("Driver assigned successfully");
      await fetchOrders();
    } catch (error) {
      setMsg(error.response?.data?.message || "Assign driver failed");
    }
  };

  useEffect(() => {
    const load = async () => {
      if (role !== "admin") {
        setMsg("Only admin can access this page.");
        setLoading(false);
        return;
      }

      setLoading(true);
      await Promise.all([fetchOrders(), fetchDrivers()]);
      setLoading(false);
    };

    load();
  }, [role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#C9BEFF] mb-2">Admin Dashboard</h1>
        <p className="text-slate-300 mb-6">Approve orders and assign drivers</p>

        {msg && <p className="mb-4 text-[#d8cfff]">{msg}</p>}
        {loading && <p className="text-slate-300">Loading...</p>}

        <div className="mb-6 rounded-xl border border-white/15 bg-[#111a38] p-4">
          <p className="text-slate-300 mb-2">Search by destination </p>
          <div className="flex gap-2">
            <input
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchOrdersByDestination();
              }}
              placeholder="Enter destination"
              className="flex-1 rounded-lg bg-[#121d40] border border-white/15 px-3 py-2"
            />
            <button
              onClick={searchOrdersByDestination}
              className="px-4 py-2 rounded-lg bg-[#6367FF] text-white font-semibold"
            >
              Search
            </button>
            <button
              onClick={clearSearch}
              className="px-4 py-2 rounded-lg bg-slate-600 text-white font-semibold"
            >
              Clear
            </button>
          </div>

          {suggestedDrivers.length > 0 && (
            <p className="text-sm text-green-300 mt-2">
              Suggested drivers for this destination:{" "}
              {suggestedDrivers.map((d) => d.email || d.username).join(", ")}
            </p>
          )}
        </div>

        {!loading && orders.length === 0 && <p className="text-slate-300">No orders found.</p>}

        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-white/15 bg-[#111a38] p-5">
              <p className="text-sm text-slate-400">Order ID</p>
              <p className="mb-2 break-all">{order._id}</p>

              <p>
                <span className="text-slate-400">Customer:</span> {order.customer?.email || "N/A"}
              </p>
              <p>
                <span className="text-slate-400">From:</span> {order.source}
              </p>
              <p>
                <span className="text-slate-400">To:</span> {order.destination}
              </p>
              <p>
                <span className="text-slate-400">Status:</span> {order.status}
              </p>
              <p>
                <span className="text-slate-400">Driver:</span>{" "}
                {order.driver?.email || "Not assigned"}
              </p>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => approveOrder(order._id)}
                  disabled={order.status !== "pending"}
                  className="w-full px-3 py-2 rounded-lg bg-[#6367FF] text-white font-semibold disabled:opacity-40"
                >
                  Approve Order
                </button>

                <div className="flex gap-2">
                  <select
                    value={selectedDriver[order._id] || ""}
                    onChange={(e) =>
                      setSelectedDriver((prev) => ({ ...prev, [order._id]: e.target.value }))
                    }
                    className="flex-1 rounded-lg bg-[#121d40] border border-white/15 px-3 py-2"
                  >
                    <option value="">Select Driver</option>
                    {mergedDrivers.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.email || d.username}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => assignDriver(order._id)}
                    disabled={order.status !== "approved"}
                    className="px-3 py-2 rounded-lg bg-[#6367FF] text-white font-semibold disabled:opacity-40"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
