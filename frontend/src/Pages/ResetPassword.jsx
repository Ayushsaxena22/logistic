
// src/Pages/ResetPassword.jsx
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post("http://localhost:8080/api/verify-otp", {
        email: form.email.trim().toLowerCase(),
        otp: form.otp.trim(),
      });
      alert("OTP verified");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/reset-password", {
        email: form.email.trim().toLowerCase(),
        otp: form.otp.trim(),
        newPassword: form.newPassword,
      });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#111a38] p-8">
        <h2 className="text-3xl font-bold text-[#C9BEFF] text-center mb-6">Reset Password</h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 bg-[#121d40]/90 text-white rounded-xl border border-white/15"
          />

          <div className="flex gap-2">
            <input
              type="text"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              required
              className="flex-1 px-4 py-3 bg-[#121d40]/90 text-white rounded-xl border border-white/15"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="px-4 py-3 rounded-xl bg-[#6367FF] text-white font-semibold"
            >
              Verify
            </button>
          </div>

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            required
            className="w-full px-4 py-3 bg-[#121d40]/90 text-white rounded-xl border border-white/15"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-[#6367FF] hover:bg-[#565bff] text-white font-bold disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
