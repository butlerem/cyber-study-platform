import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  className?: string;
}

function AnimatedCounter({ end, className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1500; // Animation duration in milliseconds
    const stepTime = Math.max(Math.floor(duration / end), 10); // Minimum 10ms per step

    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(counter);
    }, stepTime);

    return () => clearInterval(counter);
  }, [end]);

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {count.toLocaleString()}
    </motion.div>
  );
}

export default AnimatedCounter; 