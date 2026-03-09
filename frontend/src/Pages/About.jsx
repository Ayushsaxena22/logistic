// About.jsx
import { Truck, ShieldCheck, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-4xl font-extrabold text-[#C9BEFF] mb-4">
          About SwiftDrop Logistics
        </h1>

        <p className="text-center text-slate-300 max-w-2xl mx-auto mb-16">
          We are a modern logistics platform delivering fast, secure, and
          transparent shipping experiences across India.
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
    <div className="rounded-2xl p-6 border border-white/15 bg-[#0f1836] shadow-lg hover:shadow-[0_10px_40px_rgba(99,103,255,0.2)] transition">
      <Icon size={36} className="text-[#C9BEFF] mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-slate-300 text-sm">{desc}</p>
    </div>
  );
}
