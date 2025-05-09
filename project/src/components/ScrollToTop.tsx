import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress percentage
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Show button when scrolled down 20% of the page
      const shouldBeVisible = scrollTop > windowHeight * 0.2;
      setIsVisible(shouldBeVisible);
    };

    // Add initial scroll check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    []
  );

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      onClick={handleClick}
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#9580FF]/20 backdrop-blur-sm 
        flex items-center justify-center cursor-pointer z-50 border-2 border-[#9580FF] hover:border-[#9580FF]/80
        hover:bg-[#9580FF]/30 transition-all duration-300"
      role="button"
      tabIndex={0}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.3 }}
    >
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 19V5M12 5L5 12M12 5L19 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Progress circle */}
      <svg
        className="absolute inset-0 w-full h-full transform -rotate-90"
        viewBox="0 0 48 48"
      >
        <circle
          className="text-[#9580FF]/20"
          strokeWidth="2"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className="text-[#9580FF]"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference - (scrollProgress / 100) * circumference
          }
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
      </svg>
    </motion.div>
  );
};

export default ScrollToTop;
