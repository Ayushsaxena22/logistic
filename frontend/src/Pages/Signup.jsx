import { useState } from "react";
import { User, Shield, Truck } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/signup", form);
    if (response.status === 201) {
      navigate("/login");
    } else {
      alert("Error creating account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900 p-4">
      <div className="w-full max-w-lg bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/40">
        <div className="p-10">
          <h2 className="text-4xl font-extrabold text-center text-green-400 mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Join as Customer, Driver, or Admin
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full mt-1 px-4 py-3 bg-gray-900/80 text-white rounded-xl border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full mt-1 px-4 py-3 bg-gray-900/80 text-white rounded-xl border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
                className="w-full mt-1 px-4 py-3 bg-gray-900/80 text-white rounded-xl border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Select Role</label>
              <div className="grid grid-cols-3 gap-4">
                <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center gap-2 transition ${
                  form.role === "customer"
                    ? "border-green-500 bg-green-500/10"
                    : "border-gray-700 hover:border-green-500/50"
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={form.role === "customer"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <User className="text-green-400" />
                  <span className="text-gray-200">Customer</span>
                </label>

                <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center gap-2 transition ${
                  form.role === "driver"
                    ? "border-green-500 bg-green-500/10"
                    : "border-gray-700 hover:border-green-500/50"
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="driver"
                    checked={form.role === "driver"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <Truck className="text-green-400" />
                  <span className="text-gray-200">Driver</span>
                </label>

                <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center gap-2 transition ${
                  form.role === "admin"
                    ? "border-green-500 bg-green-500/10"
                    : "border-gray-700 hover:border-green-500/50"
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={form.role === "admin"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <Shield className="text-green-400" />
                  <span className="text-gray-200">Admin</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-black font-bold text-lg transition shadow-lg shadow-green-500/30"
            >
              Sign Up
            </button>

            <p className="text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-green-400 hover:underline cursor-pointer font-semibold">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
