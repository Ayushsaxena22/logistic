// Contact.jsx
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] text-white px-6 py-16">
      <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-extrabold text-[#C9BEFF] mb-4">
            Contact Us
          </h1>
          <p className="text-slate-300 mb-8">
            Have questions or need support? Our team is always here to help you.
          </p>

          <div className="space-y-6">
            <ContactItem icon={Mail} text="support@swiftdrop.com" />
            <ContactItem icon={Phone} text="+91 98765 43210" />
            <ContactItem icon={MapPin} text="Nainital, Uttarakhand, India" />
          </div>
        </div>

        <div className="rounded-2xl p-8 border border-white/15 bg-[#111a38] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-[#C9BEFF]">
            Send a Message
          </h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl bg-[#121d40]/90 text-white p-3 border border-[#8ea2ff4d] focus:border-[#C9BEFF] focus:ring-2 focus:ring-[#C9BEFF]/30 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl bg-[#121d40]/90 text-white p-3 border border-[#8ea2ff4d] focus:border-[#C9BEFF] focus:ring-2 focus:ring-[#C9BEFF]/30 outline-none"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full rounded-xl bg-[#121d40]/90 text-white p-3 border border-[#8ea2ff4d] focus:border-[#C9BEFF] focus:ring-2 focus:ring-[#C9BEFF]/30 outline-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#6367FF] py-3 font-semibold text-white hover:bg-[#565bff] transition"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-4 text-slate-300">
      <Icon className="text-[#C9BEFF]" />
      <span>{text}</span>
    </div>
  );
}
