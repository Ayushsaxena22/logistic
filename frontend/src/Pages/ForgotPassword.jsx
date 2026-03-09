// src/Pages/ForgotPassword.jsx
import { useState } from "react";
import axios from "axios";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/forgot-password", {
        email: email.trim().toLowerCase(),
      });
      alert("OTP sent successfully");
      navigate("/reset-password", { state: { email: email.trim().toLowerCase() } });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#111a38] p-8">
        <h2 className="text-3xl font-bold text-[#C9BEFF] text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSendOtp} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-[#C9BEFF]" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-3 bg-[#121d40]/90 text-white rounded-xl border border-white/15"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-[#6367FF] hover:bg-[#565bff] text-white font-bold disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
