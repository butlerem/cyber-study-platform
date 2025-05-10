import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/authUtils";
import {
  BookOpen,
  Users,
  MessageSquare,
  ArrowRight,
  Code,
  Trophy,
  Shield,
  Rocket,
  User,
  Github,
  GitPullRequest,
} from "lucide-react";
import SpaceBackground from "../components/SpaceBackground";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import AnimatedCounter from "../components/AnimatedCounter";
import ShiningButton from "../components/ShiningButton";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

interface ExampleUser {
  username: string;
  avatar: string | null;
  role: string;
}

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Example users with diverse usernames and avatars
  const exampleUsers: ExampleUser[] = [
    {
      username: "cyber_ninja_42",
      avatar:
        "https://api.dicebear.com/7.x/pixel-art/svg?seed=cyber_ninja_42&backgroundColor=12121A&textureChance=100",
      role: "Web Security Expert",
    },
    {
      username: "null.ptr",
      avatar: null,
      role: "System Hacker",
    },
    {
      username: "0xDEADBEEF",
      avatar:
        "https://api.dicebear.com/7.x/pixel-art/svg?seed=0xDEADBEEF&backgroundColor=12121A&textureChance=100",
      role: "Reverse Engineer",
    },
    {
      username: "l33t_h4ck3r",
      avatar:
        "https://api.dicebear.com/7.x/pixel-art/svg?seed=l33t_h4ck3r&backgroundColor=12121A&textureChance=100",
      role: "CTF Champion",
    },
    {
      username: "ghost_in_the_shell",
      avatar: null,
      role: "Network Security",
    },
    {
      username: "binary_wizard",
      avatar:
        "https://api.dicebear.com/7.x/pixel-art/svg?seed=binary_wizard&backgroundColor=12121A&textureChance=100",
      role: "Binary Exploitation",
    },
  ];

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        // Simulate fetching user count with animation
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Animate the counter from 0 to 234
        const targetCount = 234;
        const duration = 2000; // 2 seconds
        const steps = 60; // 60 steps for smooth animation
        const stepDuration = duration / steps;
        const increment = targetCount / steps;

        let currentCount = 0;
        const interval = setInterval(() => {
          currentCount += increment;
          if (currentCount >= targetCount) {
            setUserCount(targetCount);
            clearInterval(interval);
            setLoading(false);
          } else {
            setUserCount(Math.floor(currentCount));
          }
        }, stepDuration);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <Layout>
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #000000, #111111)" }}
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#9580FF] z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* 3D Space Animation Background */}
        <SpaceBackground />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            {/* Hero Section */}
            <motion.div
              className="text-center mb-40 relative"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-8 relative z-10">
                Master Web Security Through Interactive Challenges
              </h1>
              <p className="max-w-3xl mx-auto mb-12">
                Learn web security through hands-on challenges in a safe,
                browser-based environment. Practice SQL injection, XSS, IDOR,
                and more.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <ShiningButton
                  onClick={() => router.push("/auth/signin")}
                  className="bg-[#9580FF]/20 backdrop-blur-sm border-2 border-[#9580FF] text-white py-4 px-8 rounded-[100px] hover:bg-[#9580FF]/30 hover:border-[#9580FF]/80 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-[#9580FF]/20"
                >
                  Get Started
                </ShiningButton>
                <motion.button
                  onClick={() => router.push("/challenges")}
                  className="bg-transparent border-2 border-white/20 text-white py-4 px-8 rounded-[100px] hover:bg-white/5 hover:border-white/40 transition-all duration-300 font-medium text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Challenges
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-12 mb-40 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.6 }}
            >
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <motion.div className="text-center" variants={fadeInUp}>
                    <div className="text-6xl font-bold mb-4">
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            ...
                          </motion.span>
                        ) : (
                          <motion.span
                            key={userCount}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <AnimatedCounter end={userCount} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <p>Active Learners</p>
                  </motion.div>
                  <motion.div className="text-center" variants={fadeInUp}>
                    <div className="text-6xl font-bold mb-4">50+</div>
                    <p>Security Challenges</p>
                  </motion.div>
                  <motion.div className="text-center" variants={fadeInUp}>
                    <div className="text-6xl font-bold mb-4">24/7</div>
                    <p>Community Support</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Feature 1 */}
              <motion.div
                className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 hover:border-white/20 transition-colors duration-300"
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex items-center mb-6">
                  <BookOpen className="h-8 w-8 text-white/60 mr-3" />
                  <h3 className="text-2xl font-bold">Practical Learning</h3>
                </div>
                <p>
                  Hands-on labs and real-world scenarios to build practical
                  security skills.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 hover:border-white/20 transition-colors duration-300"
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-white/60 mr-3" />
                  <h3 className="text-2xl font-bold">Active Community</h3>
                </div>
                <p>
                  Join our community of student security enthusiasts and learn
                  together.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 hover:border-white/20 transition-colors duration-300"
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex items-center mb-6">
                  <GitPullRequest className="h-8 w-8 text-white/60 mr-3" />
                  <h3 className="text-2xl font-bold">Contribute</h3>
                </div>
                <p>
                  Submit your own challenges, improve existing ones, and help
                  build our community.
                </p>
              </motion.div>
            </motion.div>

            {/* Learning Path Section */}
            <motion.div
              className="mb-40 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="relative z-10">
                <h2 className="text-center mb-12">Your Learning Journey</h2>
                <div className="relative w-full overflow-hidden">
                  <div
                    className="flex gap-8 animate-carousel"
                    style={{
                      width: "fit-content",
                    }}
                  >
                    {/* First set of cards */}
                    <div className="flex gap-8">
                      <div
                        className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300 min-w-[300px]"
                        style={{
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                          WebkitFontSmoothing: "antialiased",
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <Code className="h-8 w-8 text-white/60 mr-3" />
                          <h3>Web Basics</h3>
                        </div>
                        <p>
                          Start with fundamental web security concepts and
                          common vulnerabilities
                        </p>
                      </div>
                      <div
                        className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300 min-w-[300px]"
                        style={{
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                          WebkitFontSmoothing: "antialiased",
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <Shield className="h-8 w-8 text-white/60 mr-3" />
                          <h3>Web Security</h3>
                        </div>
                        <p>
                          Master common web vulnerabilities like SQL injection
                          and XSS
                        </p>
                      </div>
                      <div
                        className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300 min-w-[300px]"
                        style={{
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                          WebkitFontSmoothing: "antialiased",
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <Rocket className="h-8 w-8 text-white/60 mr-3" />
                          <h3>Advanced</h3>
                        </div>
                        <p>
                          Tackle complex security challenges and advanced
                          exploitation techniques
                        </p>
                      </div>
                      <div
                        className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300 min-w-[300px]"
                        style={{
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                          WebkitFontSmoothing: "antialiased",
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <Trophy className="h-8 w-8 text-white/60 mr-3" />
                          <h3>Expert</h3>
                        </div>
                        <p>
                          Master advanced web security techniques and real-world
                          scenarios
                        </p>
                      </div>
                    </div>
                    {/* Duplicate set of cards for seamless loop */}
                    <div className="flex gap-8">
                      <div
                        className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300 min-w-[300px]"
                        style={{
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                          WebkitFontSmoothing: "antialiased",
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <Code className="h-8 w-8 text-white/60 mr-3" />
                          <h3>Web Basics</h3>
                        </div>
                        <p>
                          Start with fundamental web security concepts and
                          common vulnerabilities
                        </p>
                      </div>
                      <div
                        className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300 min-w-[300px]"
                        style={{
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                          WebkitFontSmoothing: "antialiased",
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <Shield className="h-8 w-8 text-white/60 mr-3" />
                          <h3>Web Security</h3>
                        </div>
                        <p>
                          Master common web vulnerabilities like SQL injection
                          and XSS
                        </p>
                      </div>
                      <div
                        className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300 min-w-[300px]"
                        style={{
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                          WebkitFontSmoothing: "antialiased",
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <Rocket className="h-8 w-8 text-white/60 mr-3" />
                          <h3>Advanced</h3>
                        </div>
                        <p>
                          Tackle complex security challenges and advanced
                          exploitation techniques
                        </p>
                      </div>
                      <div
                        className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300 min-w-[300px]"
                        style={{
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                          WebkitFontSmoothing: "antialiased",
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <Trophy className="h-8 w-8 text-white/60 mr-3" />
                          <h3>Expert</h3>
                        </div>
                        <p>
                          Master advanced web security techniques and real-world
                          scenarios
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Why Choose ExpLab Section */}
            <motion.div
              className="mb-40 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="relative z-10">
                <h2 className="text-center mb-12">Why Choose ExpLab?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div
                    className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300"
                    variants={fadeInUp}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <h3 className="mb-6">Real-World Vulnerabilities</h3>
                    <p className="mb-6">
                      Each challenge simulates real-world vulnerabilities,
                      guiding you from basic concepts to advanced techniques.
                      Learn by doing in a safe, controlled environment.
                    </p>
                    <motion.a
                      href="/challenges"
                      className="text-white/60 hover:text-white transition-colors duration-300 flex items-center text-lg"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="h-6 w-6 mr-2" />
                      Explore Challenges
                    </motion.a>
                  </motion.div>
                  <motion.div
                    className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300"
                    variants={fadeInUp}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <h3 className="mb-6">No Setup Required</h3>
                    <p className="mb-6">
                      Start learning immediately in our browser-based
                      environment. No complex setup or configuration needed -
                      just focus on mastering web security concepts and
                      techniques.
                    </p>
                    <motion.a
                      href="/register"
                      className="text-white/60 hover:text-white transition-colors duration-300 flex items-center text-lg"
                      whileHover={{ x: 5 }}
                    >
                      <User className="h-6 w-6 mr-2" />
                      Start Learning
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
