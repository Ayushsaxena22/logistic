// frontend/src/Pages/Login.jsx
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      const { token, role } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "customer") navigate("/customer-dashboard");
      else if (role === "driver") navigate("/driver-dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video1.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlay for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,14,34,0.35)_0%,rgba(6,9,20,0.78)_62%,rgba(4,6,14,0.9)_100%)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#0c142bcc] backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
          <div className="p-10">
            <p className="text-center text-[11px] tracking-[0.28em] text-[#aeb9ff] mb-4">
              SWIFTDROP LOGISTICS
            </p>
            <h2 className="text-5xl font-black text-center text-white mb-2 leading-tight">
              Welcome Back
            </h2>
            <p className="text-center text-slate-300 mb-8">Login to your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-slate-200">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 text-[#b8c2ff]" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-[#121d40]/90 text-white rounded-xl border border-[#8ea2ff4d] placeholder:text-slate-400 focus:border-[#c8d2ff] focus:ring-2 focus:ring-[#c8d2ff33] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-200">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 text-[#b8c2ff]" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 bg-[#121d40]/90 text-white rounded-xl border border-[#8ea2ff4d] placeholder:text-slate-400 focus:border-[#c8d2ff] focus:ring-2 focus:ring-[#c8d2ff33] outline-none"
                  />
                </div>
              </div>

              <div className="text-right">
                <Link to="/forgot-password" className="text-[#d4dcff] hover:text-white hover:underline text-sm">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-[#6367FF] hover:bg-[#565bff] text-white font-bold text-lg disabled:opacity-60 transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-slate-300 mt-4">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-white hover:underline font-semibold">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
