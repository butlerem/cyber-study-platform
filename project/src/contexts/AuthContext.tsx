// src/contexts/AuthContext.tsx
import React, { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { AuthContextType } from "./authUtils";
import { handleSignIn, handleSignUp, handleSignOut } from "./authUtils"; // Import utility functions

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // Ensure user has email and username
  const user = session?.user
    ? {
        id: session.user.email || "",
        email: session.user.email || "", // Fallback to empty string if email is missing
        username: session.user.name || "Anonymous", // Fallback to 'Anonymous' if name is missing
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
