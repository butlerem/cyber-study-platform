"use client";

import { signIn } from "next-auth/react";
import { Github, Mail } from "lucide-react";
import { motion } from "framer-motion";
import SpaceBackground from "@/components/SpaceBackground";

export default function SignIn() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #000000, #111111)' }}>
      {/* 3D Space Animation Background */}
      <SpaceBackground />

      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-white text-center mb-2">
                Welcome Back
              </h1>
              <p className="text-xl text-gray-400 text-center">
                Choose your preferred sign in method
              </p>
            </motion.div>

            <div className="mt-8 space-y-6">
              <motion.button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-full flex items-center justify-center bg-[#9580FF]/20 backdrop-blur-sm border-2 border-[#9580FF] text-white py-4 px-8 rounded-[100px] hover:bg-[#9580FF]/30 hover:border-[#9580FF]/80 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-[#9580FF]/20 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="h-6 w-6 mr-3" />
                Continue with GitHub
              </motion.button>

              <motion.button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full flex items-center justify-center bg-transparent border-2 border-white/20 text-white py-4 px-8 rounded-[100px] hover:bg-white/5 hover:border-white/40 transition-all duration-300 font-medium text-lg group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-6 w-6 mr-3" />
                Continue with Google
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 