// Career.jsx
import { Link } from "react-router-dom";

export default function Career() {
  const roles = [
    {
      title: "Delivery Partner",
      type: "Full-time / Contract",
      location: "Multiple Cities",
      desc: "Handle parcel pickups and safe last-mile delivery.",
    },
    {
      title: "Operations Executive",
      type: "Full-time",
      location: "Nainital, Uttarakhand",
      desc: "Manage dispatch, tracking workflows, and customer coordination.",
    },
    {
      title: "Customer Support Associate",
      type: "Full-time",
      location: "Remote / On-site",
      desc: "Help customers with tracking, status updates, and issue resolution.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-3 text-[#C9BEFF]">
          Careers At SwiftDrop Logistics
        </h1>
        <p className="text-slate-300 mb-10">
          Build the future of logistics with us. We are hiring passionate people
          across operations, delivery, and support.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((job, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/15 bg-[#111a38] p-6"
            >
              <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
              <p className="text-sm text-[#C9BEFF] mb-1">{job.type}</p>
              <p className="text-sm text-slate-300 mb-3">{job.location}</p>
              <p className="text-slate-300 mb-5">{job.desc}</p>
              <button className="px-4 py-2 rounded-lg bg-[#6367FF] hover:bg-[#565bff] font-semibold">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/login" className="text-[#C9BEFF] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
