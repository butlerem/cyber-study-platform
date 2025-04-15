import React, { useEffect, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  className?: string;
}

function AnimatedCounter({ end, className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / end), 10);

    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(counter);
    }, stepTime);

    return () => clearInterval(counter);
  }, [end]);

  return (
    <div className={className}>
      {count}+
    </div>
  );
}

export default AnimatedCounter; 