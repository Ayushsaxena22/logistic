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
import Navbar from "./Components/Navbar";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* New customer order pages */}
          <Route path="/customer/track/:id" element={<Track />} />
          <Route path="/customer/status/:id" element={<Status />} />
          <Route path="/customer/history/:id" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
