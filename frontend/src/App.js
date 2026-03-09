import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CustomerDashboard from "./Pages/CustomerDashboard";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Track from "./Pages/Track";
import Status from "./Pages/Status";
import History from "./Pages/History";
import AdminDashboard from "./Pages/AdminDashboard";
import DriverDashboard from "./Pages/DriverDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import Career from "./Pages/Career";




function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Forgot/Reset password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Customer routes */}
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/track/:id"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Track />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/status/:id"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Status />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/history/:id"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <History />
              </ProtectedRoute>
            }
          />

          {/* Admin route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Driver route */}
          <Route
            path="/driver-dashboard"
            element={
              <ProtectedRoute allowedRoles={["driver"]}>
                <DriverDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
