import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post("/api/login", form);
      const { token, role } = response.data.data;

      localStorage.setItem("token", token);

      if (role === "customer") navigate("/customer-dashboard");
      else if (role === "driver") navigate("/driver/dashboard");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900 p-4">
      <div className="w-full max-w-md bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/40">
        <div className="p-10">
          <h2 className="text-4xl font-extrabold text-center text-green-400 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 text-green-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/80 text-white rounded-xl border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 text-green-400" size={18} />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/80 text-white rounded-xl border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-black font-bold text-lg transition shadow-lg shadow-green-500/30 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-400 mt-4">
              Don’t have an account?{" "}
              <a href="/signup" className="text-green-400 hover:underline cursor-pointer font-semibold">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
