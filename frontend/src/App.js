import logo from './logo.svg';
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerDashboard from './Pages/CustomerDashboard';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Contact from './Pages/Contact';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
