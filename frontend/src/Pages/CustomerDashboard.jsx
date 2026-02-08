import { useState } from "react";
import Navbar from "../Components/Navbar";
import {
  ShoppingCart,
  Truck,
  ClipboardList,
  History,
  MapPin,
  Navigation,
  Weight
} from "lucide-react";

export default function CustomerDashboard() {
  const [active, setActive] = useState("place");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(null);

  const calculatePrice = () => {
    const distance = Math.abs(source.length - destination.length) * 10 || 50;
    setPrice(distance * Number(weight || 1));
  };

  const handleOrder = async () => {
    // Here you would typically send the order details to your backend API
       const response = await axios.post("/api/orders", {
        source,
        destination,
        weight,
        price
      });
  };

  const NavItem = ({ icon: Icon, label, value }) => (
    <button
      onClick={() => setActive(value)}
      className={`flex flex-col items-center gap-1 py-3 rounded-2xl transition
        ${
          active === value
            ? "bg-green-500 text-black shadow-lg shadow-green-500/40"
            : "text-green-400 hover:bg-green-500/10"
        }`}
    >
      <Icon size={22} />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );

  const InputField = ({ icon: Icon, placeholder, value, onChange, type="text" }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-3.5 text-green-400" size={18} />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-gray-900/80 rounded-xl border border-gray-700 
                   focus:border-green-500 focus:ring-2 focus:ring-green-500/30 outline-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white flex flex-col">

      <Navbar/>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-500/30 border border-green-500/40 p-8">

          {active === "place" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-green-400 text-center">
                Place Order
              </h2>

              <InputField
                icon={MapPin}
                placeholder="Pickup Location"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />

              <InputField
                icon={Navigation}
                placeholder="Drop Location"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />

              <InputField
                icon={Weight}
                type="number"
                placeholder="Package Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />

              <button
                onClick={calculatePrice}
                className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 
                           text-black font-bold text-lg shadow-lg shadow-green-500/30"
              >
                Calculate Price
              </button>

              {price && (
                <div className="space-y-4 text-center">
                  <div className="rounded-2xl border border-green-500/40 bg-green-500/10 py-4">
                    <p className="text-lg text-gray-300">Estimated Price</p>
                    <p className="text-2xl font-extrabold text-green-400">
                      ₹{price}
                    </p>
                  </div>

                  <button className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 
                                     text-black font-bold shadow-lg shadow-green-500/30">
                    Place Order
                  </button>
                </div>
              )}
            </div>
          )}

          {active === "track" && (
            <h2 className="text-2xl font-bold text-green-400 text-center">
              Track Orders
            </h2>
          )}

          {active === "status" && (
            <h2 className="text-2xl font-bold text-green-400 text-center">
              Application Status
            </h2>
          )}

          {active === "history" && (
            <h2 className="text-2xl font-bold text-green-400 text-center">
              Order History
            </h2>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="grid grid-cols-4 gap-3 px-6 py-4 bg-black/70 backdrop-blur-xl border-t border-green-500/40">
        <NavItem icon={ShoppingCart} label="Place" value="place" />
        <NavItem icon={Truck} label="Track" value="track" />
        <NavItem icon={ClipboardList} label="Status" value="status" />
        <NavItem icon={History} label="History" value="history" />
      </div>
    </div>
  );
}
