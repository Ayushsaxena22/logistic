// src/Pages/Profile.jsx
import { useState } from "react";
import { User, Upload } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Rohan Mer",
    email: "rohan@email.com",
    role: "Customer",
  });

  const [photo, setPhoto] = useState(null);
  const [document, setDocument] = useState(null);

  const completion =
    (profile.name ? 20 : 0) +
    (profile.email ? 20 : 0) +
    (profile.role ? 20 : 0) +
    (photo ? 20 : 0) +
    (document ? 20 : 0);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log("Profile saved:", profile, photo, document);
    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1022] via-[#101833] to-[#1a2450] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#111a38] p-6 shadow-lg">
        <div className="flex flex-col items-center mb-4">
          <label className="relative cursor-pointer">
            <div className="h-24 w-24 rounded-full bg-[#1a295f]/60 flex items-center justify-center border border-[#C9BEFF]">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="text-[#C9BEFF]" size={40} />
              )}
            </div>
            <input type="file" className="hidden" onChange={(e) => setPhoto(e.target.files[0])} />
          </label>

          <p className="mt-2 text-sm text-slate-300">Upload profile picture</p>
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300">Profile Completion</span>
            <span className="text-[#C9BEFF] font-semibold">{completion}%</span>
          </div>
          <div className="h-2 w-full bg-[#1a295f]/50 rounded-full">
            <div
              className="h-2 bg-[#6367FF] rounded-full transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <ProfileItem label="Name" name="name" value={profile.name} onChange={handleChange} />
          <ProfileItem label="Email" name="email" value={profile.email} onChange={handleChange} />
          <ProfileItem label="Role" name="role" value={profile.role} disabled />
        </div>

        <div className="mt-5">
          <label className="flex items-center justify-between cursor-pointer border-b border-white/15 pb-3">
            <span className="text-slate-300">Upload Identity Document</span>
            <span className="flex items-center gap-2 text-[#C9BEFF]">
              <Upload size={16} />
              {document ? "Uploaded" : "Upload"}
            </span>
            <input type="file" className="hidden" onChange={(e) => setDocument(e.target.files[0])} />
          </label>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full rounded-xl bg-[#6367FF] py-3 font-semibold text-white hover:bg-[#565bff] transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

function ProfileItem({ label, name, value, onChange, disabled }) {
  return (
    <div className="flex justify-between items-center border-b border-white/15 pb-3">
      <span className="text-slate-300">{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`bg-transparent text-right ${disabled ? "text-slate-400" : "text-[#C9BEFF]"} font-semibold outline-none`}
      />
    </div>
  );
}
