// src/contexts/authUtils.ts
import { signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export interface AuthContextType {
  user: {
    id: string;
    email: string;
    username: string;
  } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>; // ✅ FIXED
  signOut: () => void;
}

export const handleSignIn = async (email: string, password: string) => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    throw new Error(result.error);
  }
};

export const handleSignUp = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to register");
  }

  await handleSignIn(email, password);
};

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
