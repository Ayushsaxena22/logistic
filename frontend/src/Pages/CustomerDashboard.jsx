// src/Pages/CustomerDashboard.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { MapPin, Navigation, Weight, X } from "lucide-react";

const API = "http://localhost:8080/api/orders";

function InputField({ icon: Icon, placeholder, value, onChange, type = "text", min, step }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3.5 text-[#C9BEFF]" size={18} />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        className="w-full pl-10 pr-4 py-3 bg-[#121d40]/90 rounded-xl border border-white/15 focus:border-[#C9BEFF] focus:ring-2 focus:ring-[#C9BEFF]/30 outline-none"
      />
    </div>
  );
}

export default function CustomerDashboard() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(null);
  const [popup, setPopup] = useState(null);
  const [orderId, setOrderId] = useState(localStorage.getItem("lastOrderId") || null);

  useEffect(() => {
    const savedOrderId = localStorage.getItem("lastOrderId");
    if (savedOrderId) setOrderId(savedOrderId);
  }, []);

  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 3000);
  };

  const calculatePrice = () => {
    const numericWeight = Number(weight);

    if (!source.trim() || !destination.trim() || !weight) {
      showPopup("error", "Please fill all fields first!");
      return;
    }

    if (Number.isNaN(numericWeight) || numericWeight <= 0) {
      showPopup("error", "Weight must be greater than 0.");
      return;
    }

    const distance = (source.trim().length + destination.trim().length) * 5;
    setPrice(distance * numericWeight);
  };

  const handleOrder = async () => {
    if (!source.trim() || !destination.trim() || !weight || price === null) {
      showPopup("error", "Complete details and calculate price!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/create-order`,
        { source: source.trim(), destination: destination.trim(), weight: Number(weight), price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const createdOrder = res.data?.data || res.data;
      const newOrderId = createdOrder?._id || null;

      setOrderId(newOrderId);
      if (newOrderId) localStorage.setItem("lastOrderId", newOrderId);

      showPopup("success", "Order placed successfully! Status: pending");
      setSource("");
      setDestination("");
      setWeight("");
      setPrice(null);
    } catch (error) {
      showPopup("error", error.response?.data?.message || "Failed to place order!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="w-full max-w-md mx-auto rounded-3xl border border-white/15 bg-[#111a38] p-8 shadow-2xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-[#C9BEFF] text-center">Place Order</h2>

            <InputField icon={MapPin} placeholder="Pickup Location" value={source} onChange={(e) => setSource(e.target.value)} />
            <InputField icon={Navigation} placeholder="Drop Location" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <InputField icon={Weight} type="number" min="0" step="0.1" placeholder="Package Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />

            <button
              onClick={calculatePrice}
              className="w-full py-3 rounded-2xl bg-[#6367FF] hover:bg-[#565bff] text-white font-bold text-lg"
            >
              Calculate Price
            </button>

            {price !== null && (
              <div className="space-y-4 text-center">
                <div className="rounded-2xl border border-white/15 bg-[#121d40]/60 py-4">
                  <p className="text-lg text-slate-300">Estimated Price</p>
                  <p className="text-2xl font-extrabold text-[#C9BEFF]">₹{price}</p>
                </div>

                <button
                  onClick={handleOrder}
                  className="w-full py-3 rounded-2xl bg-[#6367FF] hover:bg-[#565bff] text-white font-bold"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>

        {orderId && (
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-4">
            <Link to={`/customer/track/${orderId}`} className="text-center rounded-xl border border-white/15 bg-[#111a38] p-4 hover:bg-[#1a295f]/50">
              Track
            </Link>
            <Link to={`/customer/status/${orderId}`} className="text-center rounded-xl border border-white/15 bg-[#111a38] p-4 hover:bg-[#1a295f]/50">
              Status
            </Link>
            <Link to={`/customer/history/${orderId}`} className="text-center rounded-xl border border-white/15 bg-[#111a38] p-4 hover:bg-[#1a295f]/50">
              History
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            className={`fixed bottom-4 right-4 z-50 rounded-xl px-5 py-4 shadow-xl flex items-start gap-4 min-w-[260px] border ${
              popup.type === "error"
                ? "bg-red-50 text-red-700 border-red-400"
                : "bg-white text-[#2a3170] border-[#C9BEFF]"
            }`}
          >
            <div className="flex-1 font-semibold">{popup.message}</div>
            <button onClick={() => setPopup(null)} className="hover:opacity-80 transition">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
