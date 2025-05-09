// src/contexts/AuthContext.tsx
import React, { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { AuthContextType } from "./authUtils";
import { handleSignOut } from "./authUtils";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const user = session?.user
    ? {
        id: session.user.id || "",
        name: session.user.name || "Anonymous",
        email: session.user.email || "",
        image: session.user.image || "",
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut: handleSignOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
