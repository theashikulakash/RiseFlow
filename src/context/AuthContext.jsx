import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession, signOut as authSignOut } from "../lib/auth-client";
import api from "../lib/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();
  const [profile, setProfile] = useState(null); // full user doc: role, credits, etc.
  const [profileLoading, setProfileLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (!session?.user) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/users/me");
      setProfile(data);
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
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
