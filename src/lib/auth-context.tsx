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

  // Hydrate from backend session on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        const found = data.profile as UserProfile | null;
        if (found) {
          setProfile(found);
          localStorage.setItem("naibour_profile_id", found.id);
        } else {
          localStorage.removeItem("naibour_profile_id");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (profileId: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId }),
      });
      const data = await res.json();
      const found = data.profile as UserProfile | undefined;
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
    fetch("/api/auth/signout", { method: "POST" }).catch(() => {});
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
