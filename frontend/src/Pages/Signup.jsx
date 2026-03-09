import { useState } from "react";
import { User, Shield, Truck, Mail, Lock, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });

      if (response.status === 201) {
        alert("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error creating account. Please try again.";
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,14,34,0.35)_0%,rgba(6,9,20,0.78)_62%,rgba(4,6,14,0.9)_100%)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#0c142bcc] backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
          <div className="p-6 md:p-10">
            <p className="text-center text-[11px] tracking-[0.28em] text-[#aeb9ff] mb-4">
              SWIFTDROP LOGISTICS
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-2 leading-tight">
              Create Account
            </h2>
            <p className="text-center text-slate-300 mb-8">
              Join as Customer, Driver, or Admin
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-slate-200">Username</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 text-[#b8c2ff]" size={18} />
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#121d40]/90 text-white rounded-xl border border-[#8ea2ff4d] placeholder:text-slate-400 focus:border-[#c8d2ff] focus:ring-2 focus:ring-[#c8d2ff33] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-200">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 text-[#b8c2ff]" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
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
                    placeholder="Create a strong password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#121d40]/90 text-white rounded-xl border border-[#8ea2ff4d] placeholder:text-slate-400 focus:border-[#c8d2ff] focus:ring-2 focus:ring-[#c8d2ff33] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-200 mb-2 block">Select Role</label>
                <div className="grid grid-cols-3 gap-3">
                  <label
                    className={`cursor-pointer rounded-xl border p-3 flex flex-col items-center gap-2 transition ${
                      form.role === "customer"
                        ? "border-[#c8d2ff] bg-[#1a295f]/60"
                        : "border-[#8ea2ff40] hover:border-[#c8d2ff80]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="customer"
                      checked={form.role === "customer"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <User className="text-[#c8d2ff]" size={18} />
                    <span className="text-slate-200 text-sm">Customer</span>
                  </label>

                  <label
                    className={`cursor-pointer rounded-xl border p-3 flex flex-col items-center gap-2 transition ${
                      form.role === "driver"
                        ? "border-[#c8d2ff] bg-[#1a295f]/60"
                        : "border-[#8ea2ff40] hover:border-[#c8d2ff80]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="driver"
                      checked={form.role === "driver"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <Truck className="text-[#c8d2ff]" size={18} />
                    <span className="text-slate-200 text-sm">Driver</span>
                  </label>

                  <label
                    className={`cursor-pointer rounded-xl border p-3 flex flex-col items-center gap-2 transition ${
                      form.role === "admin"
                        ? "border-[#c8d2ff] bg-[#1a295f]/60"
                        : "border-[#8ea2ff40] hover:border-[#c8d2ff80]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={form.role === "admin"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <Shield className="text-[#c8d2ff]" size={18} />
                    <span className="text-slate-200 text-sm">Admin</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-[#6367FF] hover:bg-[#565bff] text-white font-bold text-lg disabled:opacity-60 transition inline-flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? "Creating..." : "Sign Up"}
              </button>

              <p className="text-center text-slate-300 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-white hover:underline font-semibold">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
