"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "./types";

interface AuthState {
  profile: UserProfile | null;
  loading: boolean;
  signIn: (profileId: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthState>({
  profile: null,
  loading: true,
  signIn: async () => false,
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("naibour_profile_id");
    if (stored) {
      fetch(`/api/profiles?id=${stored}`)
        .then((r) => r.json())
        .then((data) => {
          const found = (data.profiles as UserProfile[])?.find((p) => p.id === stored);
          if (found) setProfile(found);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (profileId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/profiles?id=${profileId}`);
      const data = await res.json();
      const found = (data.profiles as UserProfile[])?.find((p) => p.id === profileId);
      if (found) {
        setProfile(found);
        localStorage.setItem("naibour_profile_id", found.id);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const signOut = () => {
    setProfile(null);
    localStorage.removeItem("naibour_profile_id");
  };

  return (
    <AuthContext.Provider value={{ profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
