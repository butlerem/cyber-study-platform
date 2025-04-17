import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import "@/index.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <div className="min-h-screen bg-black text-white relative">
          <CustomCursor />
          <Component {...pageProps} />
          <ScrollToTop />
        </div>
      </AuthProvider>
    </SessionProvider>
  );
}
