import { useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../lib/axios";
import { uploadToImgBB } from "../lib/imgbb.js";

const buildAvatarUrl = (name = "User") =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F5257&color=fff`;

const updateUserImage = async (imageUrl) => {
  const payload = { image: imageUrl, photoURL: imageUrl };

  try {
    return await api.patch("/users/me", payload);
  } catch (error) {
    if (error.response?.status === 404 || error.response?.status === 405) {
      return await api.put("/users/me", payload);
    }
    throw error;
  }
};

const UserProfile = () => {
  const { user, refreshProfile, loading } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  if (loading) return <div className="max-w-4xl mx-auto px-5 py-16 text-center text-ink/60">Loading profile...</div>;
  if (!user) return <div className="max-w-4xl mx-auto px-5 py-16 text-center">Please log in to view your profile.</div>;

  const profileImage = user.image || user.photoURL || buildAvatarUrl(user.name || "User");

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadedUrl = await uploadToImgBB(file);
      await updateUserImage(uploadedUrl);
      await refreshProfile();
      toast.success("Profile picture updated successfully.");
    } catch (error) {
      toast.error(error.message || "Unable to update profile picture.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-16">
      <div className="bg-white rounded-2xl border border-teal/10 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-teal-dark to-teal p-8 text-cream">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={profileImage}
                alt={user.name || "User profile"}
                className="h-28 w-28 rounded-full object-cover border-4 border-white/80 shadow-lg"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 bg-amber text-teal-dark rounded-full p-2 shadow-md hover:scale-105 transition-transform"
                aria-label="Change profile image"
              >
                <FiCamera size={18} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cream/70">Profile</p>
              <h1 className="text-3xl font-semibold mt-2">{user.name || "User"}</h1>
              <p className="text-cream/80 mt-1">{user.email || "No email available"}</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl bg-cream p-5 border border-teal/10">
            <p className="text-sm text-ink/50 uppercase tracking-[0.12em] mb-2">Role</p>
            <p className="text-lg font-medium capitalize">{user.role || "supporter"}</p>
          </div>

          <div className="rounded-xl bg-cream p-5 border border-teal/10">
            <p className="text-sm text-ink/50 uppercase tracking-[0.12em] mb-2">Credits</p>
            <p className="text-lg font-medium">{user.credits ?? 0}</p>
          </div>

          <div className="rounded-xl bg-cream p-5 border border-teal/10 md:col-span-2">
            <p className="text-sm text-ink/50 uppercase tracking-[0.12em] mb-2">Status</p>
            <p className="text-lg font-medium text-teal-dark">
              {uploading ? "Updating your profile picture..." : "Profile ready"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
