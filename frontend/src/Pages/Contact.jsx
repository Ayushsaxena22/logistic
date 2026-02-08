import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "../Components/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white px-6 py-16">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12">

          {/* Left Info */}
          <div>
            <h1 className="text-4xl font-extrabold text-green-400 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-400 mb-8">
              Have questions or need support? Our team is always here to help you.
            </p>

            <div className="space-y-6">
              <ContactItem icon={Mail} text="support@greenlogix.com" />
              <ContactItem icon={Phone} text="+91 98765 43210" />
              <ContactItem icon={MapPin} text="Nainital, Uttarakhand, India" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-green-500/30 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-green-400">
              Send a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl bg-black p-3 border border-green-500/30 
                           focus:border-green-500 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl bg-black p-3 border border-green-500/30 
                           focus:border-green-500 outline-none"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full rounded-xl bg-black p-3 border border-green-500/30 
                           focus:border-green-500 outline-none"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 
                           rounded-xl bg-green-500 py-3 font-semibold 
                           text-black hover:bg-green-600 transition"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

function ContactItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-4 text-gray-300">
      <Icon className="text-green-400" />
      <span>{text}</span>
    </div>
  );
}
