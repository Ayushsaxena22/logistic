import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginOrSignup =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between absolute top-0 left-0 z-20 bg-transparent">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-extrabold tracking-tight text-white cursor-pointer"
      >
        SwiftDrop Logistics
      </h1>

      <div className="flex items-center gap-8">
        {!isLoginOrSignup && (
          <Link to="/login" className="text-slate-200 hover:text-white transition font-medium">
            Home
          </Link>
        )}

        <Link to="/about" className="text-slate-200 hover:text-white transition font-medium">
          About
        </Link>

        <Link to="/contact" className="text-slate-200 hover:text-white transition font-medium">
          Contact
        </Link>

        <Link to="/career" className="text-slate-200 hover:text-white transition font-medium">
          Career
        </Link>

        {!isLoginOrSignup && (
          <button
            onClick={() => navigate("/profile")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-slate-100 hover:bg-white/10 transition"
          >
            <User size={16} />
            My Account
          </button>
        )}
      </div>
    </nav>
  );
}
