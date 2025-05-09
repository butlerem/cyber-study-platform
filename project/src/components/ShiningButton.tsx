import React from 'react';
import { motion } from 'framer-motion';

interface ShiningButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

function ShiningButton({ onClick, children, className = "" }: ShiningButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Shining wave animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9580FF]/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
      />
      {children}
    </motion.button>
  );
}

export default ShiningButton; 