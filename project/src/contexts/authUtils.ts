// src/contexts/authUtils.ts
import { signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export interface AuthContextType {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  } | null;
  loading: boolean;
  signOut: () => void;
}

export const handleSignOut = async () => {
  await signOut();
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
