import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-black border-b border-green-500/30 px-8 py-4 flex items-center justify-between">
      
      {/* Logo (Left) */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-green-400 cursor-pointer"
      >
        GreenLogix
      </h1>

      {/* Right Side Links */}
      <div className="flex items-center gap-8">
        <Link
          to="/about"
          className="text-gray-300 hover:text-green-400 transition font-medium"
        >
          About
        </Link>

        <Link
          to="/contact"
          className="text-gray-300 hover:text-green-400 transition font-medium"
        >
          Contact
        </Link>

        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 cursor-pointer 
                     rounded-xl border border-green-500/40 
                     px-4 py-2 hover:bg-green-500/10 transition"
        >
          <User size={18} className="text-green-400" />
          <span className="text-green-400 font-semibold">My Account</span>
        </div>
      </div>
    </nav>
  );
}
