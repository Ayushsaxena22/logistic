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

  // profile completion logic
  const completion =
    (profile.name ? 20 : 0) +
    (profile.email ? 20 : 0) +
    (profile.role ? 20 : 0) +
    (photo ? 20 : 0) +
    (document ? 20 : 0);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log("Profile saved:", profile, photo, document);
    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-lg">

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-4">
          <label className="relative cursor-pointer">
            <div className="h-24 w-24 rounded-full bg-green-500/10 
                            flex items-center justify-center 
                            border border-green-500">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="text-green-400" size={40} />
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>

          <p className="mt-2 text-sm text-gray-400">
            Upload profile picture
          </p>
        </div>

        {/* Completion */}
        <div className="mb-5">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Profile Completion</span>
            <span className="text-green-400 font-semibold">
              {completion}%
            </span>
          </div>
          <div className="h-2 w-full bg-gray-800 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        {/* Editable fields */}
        <div className="space-y-4">
          <ProfileItem
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
          <ProfileItem
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
          <ProfileItem
            label="Role"
            name="role"
            value={profile.role}
            disabled
          />
        </div>

        {/* Identity Upload */}
        <div className="mt-5">
          <label className="flex items-center justify-between 
                            cursor-pointer border-b 
                            border-green-500/20 pb-3">
            <span className="text-gray-400">
              Upload Identity Document
            </span>
            <span className="flex items-center gap-2 text-green-400">
              <Upload size={16} />
              {document ? "Uploaded" : "Upload"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setDocument(e.target.files[0])}
            />
          </label>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="mt-6 w-full rounded-xl bg-green-500 
                     py-3 font-semibold text-black 
                     hover:bg-green-600 transition"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}

function ProfileItem({ label, name, value, onChange, disabled }) {
  return (
    <div className="flex justify-between items-center 
                    border-b border-green-500/20 pb-3">
      <span className="text-gray-400">{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`bg-transparent text-right 
          ${disabled ? "text-gray-500" : "text-green-400"}
          font-semibold outline-none`}
      />
    </div>
  );
}
