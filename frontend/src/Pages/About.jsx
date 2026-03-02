// about.jsx
import { Truck, ShieldCheck, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-4xl font-extrabold text-green-400 mb-4">
          About Us
        </h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          We are a modern logistics platform providing fast, secure, and
          transparent shipment services across India.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <AboutCard
            icon={Truck}
            title="Fast Delivery"
            desc="Optimized logistics and smart routing ensure faster deliveries every time."
          />
          <AboutCard
            icon={ShieldCheck}
            title="Secure Shipments"
            desc="Your packages are protected with identity verification and real-time tracking."
          />
          <AboutCard
            icon={Users}
            title="Customer First"
            desc="We focus on transparency, trust, and an excellent customer experience."
          />
        </div>
      </div>
    </div>
  );
}

function AboutCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-green-500/30 shadow-lg hover:shadow-green-500/20 transition">
      <Icon size={36} className="text-green-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
