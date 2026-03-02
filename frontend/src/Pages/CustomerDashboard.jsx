import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  MapPin,
  Navigation,
  Weight,
  X,
  Truck,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const STATUS_STEPS = ["Pending", "Out for Delivery", "Delivered"];

function formatDateTime(date = new Date()) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Moved outside CustomerDashboard to prevent remount/focus loss on each keypress
function InputField({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
  min,
  step,
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3.5 text-green-400" size={18} />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        className="w-full pl-10 pr-4 py-3 bg-gray-900/80 rounded-xl border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 outline-none"
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

  const [orderData, setOrderData] = useState(null);

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
    const calculatedPrice = distance * numericWeight;

    setPrice(calculatedPrice);
  };

  const addHistory = (prevHistory, text) => [
    {
      text,
      time: formatDateTime(),
    },
    ...prevHistory,
  ];

  const handleOrder = async () => {
    if (!source.trim() || !destination.trim() || !weight || price === null) {
      showPopup("error", "Complete details and calculate price!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/orders/create-order",
        {
          source: source.trim(),
          destination: destination.trim(),
          weight: Number(weight),
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const backendStatus =
        res?.data?.order?.status || res?.data?.status || "Pending";

      const normalizedStatus = STATUS_STEPS.includes(backendStatus)
        ? backendStatus
        : "Pending";

      setOrderData({
        source: source.trim(),
        destination: destination.trim(),
        weight: Number(weight),
        price,
        status: normalizedStatus,
        history: [
          {
            text: `Order placed. Current status: ${normalizedStatus}`,
            time: formatDateTime(),
          },
        ],
      });

      showPopup("success", "Order placed successfully!");

      setSource("");
      setDestination("");
      setWeight("");
      setPrice(null);
    } catch (error) {
      showPopup(
        "error",
        error.response?.data?.message || "Failed to place order!"
      );
    }
  };

  const updateOrderStatus = (newStatus) => {
    if (!orderData) return;

    setOrderData((prev) => {
      if (!prev || prev.status === newStatus) return prev;

      const historyText =
        newStatus === "Out for Delivery"
          ? "Order is out for delivery."
          : "Order delivered successfully.";

      return {
        ...prev,
        status: newStatus,
        history: addHistory(prev.history, historyText),
      };
    });
  };

  const currentStepIndex = orderData
    ? STATUS_STEPS.indexOf(orderData.status)
    : -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="w-full max-w-md mx-auto bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-500/30 border border-green-500/40 p-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-green-400 text-center">
              Place Order
            </h2>

            <InputField
              icon={MapPin}
              placeholder="Pickup Location"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />

            <InputField
              icon={Navigation}
              placeholder="Drop Location"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <InputField
              icon={Weight}
              type="number"
              min="0"
              step="0.1"
              placeholder="Package Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            <button
              onClick={calculatePrice}
              className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-black font-bold text-lg shadow-lg shadow-green-500/30"
            >
              Calculate Price
            </button>

            {price !== null && (
              <div className="space-y-4 text-center">
                <div className="rounded-2xl border border-green-500/40 bg-green-500/10 py-4">
                  <p className="text-lg text-gray-300">Estimated Price</p>
                  <p className="text-2xl font-extrabold text-green-400">
                    ₹{price}
                  </p>
                </div>

                <button
                  onClick={handleOrder}
                  className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-black font-bold shadow-lg shadow-green-500/30"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom 3 sections */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Track */}
          <div className="bg-black/60 border border-green-500/30 rounded-2xl p-5">
            <h3 className="text-xl font-bold text-green-400 mb-4">Track</h3>

            {!orderData && (
              <p className="text-gray-400 text-sm">
                Place an order to see tracking stages.
              </p>
            )}

            {orderData && (
              <div className="space-y-4">
                {STATUS_STEPS.map((step, index) => {
                  const done = index <= currentStepIndex;
                  return (
                    <div key={step} className="flex items-center gap-3">
                      {done ? (
                        <CheckCircle2 className="text-green-400" size={18} />
                      ) : (
                        <Clock3 className="text-gray-500" size={18} />
                      )}
                      <span
                        className={done ? "text-green-300" : "text-gray-400"}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="bg-black/60 border border-green-500/30 rounded-2xl p-5">
            <h3 className="text-xl font-bold text-green-400 mb-4">Status</h3>

            {!orderData && (
              <p className="text-gray-400 text-sm">No active order.</p>
            )}

            {orderData && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 font-semibold">
                  <Truck size={16} />
                  {orderData.status}
                </div>

                {/* Demo controls (remove when backend status update API is connected) */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => updateOrderStatus("Out for Delivery")}
                    className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
                  >
                    Mark Out for Delivery
                  </button>
                  <button
                    onClick={() => updateOrderStatus("Delivered")}
                    className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* History */}
          <div className="bg-black/60 border border-green-500/30 rounded-2xl p-5">
            <h3 className="text-xl font-bold text-green-400 mb-4">History</h3>

            {!orderData && (
              <p className="text-gray-400 text-sm">History will appear here.</p>
            )}

            {orderData && (
              <div className="space-y-3 max-h-64 overflow-auto pr-1">
                {orderData.history.map((item, idx) => (
                  <div
                    key={`${item.time}-${idx}`}
                    className="border border-gray-700 rounded-lg p-3 bg-gray-900/70"
                  >
                    <p className="text-sm text-gray-200">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
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
                : "bg-white text-green-700 border-green-500"
            }`}
          >
            <div className="flex-1 font-semibold">{popup.message}</div>
            <button
              onClick={() => setPopup(null)}
              className="hover:opacity-80 transition"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
