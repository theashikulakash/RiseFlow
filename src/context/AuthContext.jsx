import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession, signOut as authSignOut } from "../lib/auth-client";
import api from "../lib/axios";

const AuthContext = createContext(null);

const normalizeProfile = (data) => {
  if (!data) return null;

  const image = data.image || data.photoURL || data.avatar || null;
  const photoURL = data.photoURL || data.image || data.avatar || null;

  return { ...data, image, photoURL };
};

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();
  const [profile, setProfile] = useState(null); // full user doc: role, credits, etc.
  const [profileLoading, setProfileLoading] = useState(true);

  const updateProfile = useCallback((nextProfile) => {
    setProfile((current) => {
      const merged = { ...(current || {}), ...(nextProfile || {}) };
      const image = merged.image || merged.photoURL || merged.avatar || null;
      const photoURL = merged.photoURL || merged.image || merged.avatar || null;
      return { ...merged, image, photoURL };
    });
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session?.user) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/users/me");
      setProfile(normalizeProfile(data));
    } catch (err) {
      console.error("Failed to load profile:", err.message);
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending) refreshProfile();
  }, [isPending, refreshProfile]);

  const logout = async () => {
    await authSignOut();
    setProfile(null);
    window.location.href = "/";
  };

  const value = {
    user: profile, // { id, name, email, image, role, credits }
    loading: isPending || profileLoading,
    refreshProfile,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
