import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, MessageSquare, ArrowRight, Code, Trophy, Shield, Rocket, User, Github, GitPullRequest } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
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
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=cyber_ninja_42&backgroundColor=12121A&textureChance=100",
      role: "Web Security Expert"
    },
    {
      username: "null.ptr",
      avatar: null,
      role: "System Hacker"
    },
    {
      username: "0xDEADBEEF",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=0xDEADBEEF&backgroundColor=12121A&textureChance=100",
      role: "Reverse Engineer"
    },
    {
      username: "l33t_h4ck3r",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=l33t_h4ck3r&backgroundColor=12121A&textureChance=100",
      role: "CTF Champion"
    },
    {
      username: "ghost_in_the_shell",
      avatar: null,
      role: "Network Security"
    },
    {
      username: "binary_wizard",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=binary_wizard&backgroundColor=12121A&textureChance=100",
      role: "Binary Exploitation"
    }
  ];

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        // Simulate fetching user count with animation
        await new Promise(resolve => setTimeout(resolve, 500));

        // Set loading to false after the delay
        setLoading(false);
        
        // Set the target count directly
        setUserCount(234);
      } catch (error) {
        console.error('Failed to fetch user count:', error);
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C] relative overflow-hidden">
        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-[#9580FF] z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        
        {/* 3D Space Animation Background */}
        <SpaceBackground />
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Hero Section */}
            <motion.div 
              className="text-center mb-32 relative"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl font-bold text-white mb-8 relative z-10">
                Learn Cybersecurity Through Hands-On Challenges
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                Master practical security skills with our interactive labs and real-world scenarios.
                Join our community of student security enthusiasts and advance your skills together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.button
                  onClick={() => router.push('/register')}
                  className="bg-[#9580FF] text-white py-4 px-8 rounded-md hover:bg-[#6E54C8] transition-colors duration-200 font-medium text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
                <motion.button
                  onClick={() => router.push('/challenges')}
                  className="bg-transparent border border-[#9580FF] text-white py-4 px-8 rounded-md hover:bg-[#9580FF]/10 transition-colors duration-200 font-medium text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Challenges
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-12 mb-32 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.6 }}
            >
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <motion.div 
                    className="text-center"
                    variants={fadeInUp}
                  >
                    <div className="text-6xl font-bold text-[#9580FF] mb-4">
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
                            {userCount.toLocaleString()}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className="text-gray-400 text-lg">Active Learners</p>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    variants={fadeInUp}
                  >
                    <div className="text-6xl font-bold text-[#9580FF] mb-4">50+</div>
                    <p className="text-gray-400 text-lg">Security Challenges</p>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    variants={fadeInUp}
                  >
                    <div className="text-6xl font-bold text-[#9580FF] mb-4">24/7</div>
                    <p className="text-gray-400 text-lg">Community Support</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Features Section */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Feature 1 */}
              <motion.div 
                className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8 hover:border-[#9580FF] transition-colors duration-200"
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(149, 128, 255, 0.1)" }}
              >
                <div className="flex items-center mb-6">
                  <BookOpen className="h-8 w-8 text-[#9580FF] mr-3" />
                  <h3 className="text-2xl font-bold text-white">Practical Learning</h3>
                </div>
                <p className="text-gray-400 text-lg">
                  Hands-on labs and real-world scenarios to build practical security skills.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8 hover:border-[#9580FF] transition-colors duration-200"
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(149, 128, 255, 0.1)" }}
              >
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-[#9580FF] mr-3" />
                  <h3 className="text-2xl font-bold text-white">Active Community</h3>
                </div>
                <p className="text-gray-400 text-lg">
                  Join our community of student security enthusiasts and learn together.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8 hover:border-[#9580FF] transition-colors duration-200"
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(149, 128, 255, 0.1)" }}
              >
                <div className="flex items-center mb-6">
                  <GitPullRequest className="h-8 w-8 text-[#9580FF] mr-3" />
                  <h3 className="text-2xl font-bold text-white">Contribute</h3>
                </div>
                <p className="text-gray-400 text-lg">
                  Submit your own challenges, improve existing ones, and help build this platform.
                </p>
              </motion.div>
            </motion.div>

            {/* Learning Path Section */}
            <motion.div 
              className="mb-32 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Your Learning Journey</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <motion.div 
                    className="bg-[#12121A] rounded-lg p-8 border border-gray-700"
                    variants={fadeInUp}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(149, 128, 255, 0.1)" }}
                  >
                    <div className="flex items-center mb-6">
                      <Code className="h-8 w-8 text-[#9580FF] mr-3" />
                      <h3 className="text-xl font-bold text-white">Basics</h3>
                    </div>
                    <p className="text-gray-400 text-lg">Start with fundamental security concepts and tools</p>
                  </motion.div>
                  <motion.div 
                    className="bg-[#12121A] rounded-lg p-8 border border-gray-700"
                    variants={fadeInUp}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(149, 128, 255, 0.1)" }}
                  >
                    <div className="flex items-center mb-6">
                      <Shield className="h-8 w-8 text-[#9580FF] mr-3" />
                      <h3 className="text-xl font-bold text-white">Web Security</h3>
                    </div>
                    <p className="text-gray-400 text-lg">Learn about common web vulnerabilities and defenses</p>
                  </motion.div>
                  <motion.div 
                    className="bg-[#12121A] rounded-lg p-8 border border-gray-700"
                    variants={fadeInUp}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(149, 128, 255, 0.1)" }}
                  >
                    <div className="flex items-center mb-6">
                      <Rocket className="h-8 w-8 text-[#9580FF] mr-3" />
                      <h3 className="text-xl font-bold text-white">Advanced</h3>
                    </div>
                    <p className="text-gray-400 text-lg">Tackle complex security challenges and CTF-style problems</p>
                  </motion.div>
                  <motion.div 
                    className="bg-[#12121A] rounded-lg p-8 border border-gray-700"
                    variants={fadeInUp}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(149, 128, 255, 0.1)" }}
                  >
                    <div className="flex items-center mb-6">
                      <Trophy className="h-8 w-8 text-[#9580FF] mr-3" />
                      <h3 className="text-xl font-bold text-white">Expert</h3>
                    </div>
                    <p className="text-gray-400 text-lg">Master advanced techniques and contribute to the community</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Student Projects Section */}
            <motion.div 
              className="mb-32 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Built By Students, For Students</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div 
                    className="bg-[#12121A] rounded-lg p-8 border border-gray-700"
                    variants={fadeInUp}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(149, 128, 255, 0.1)" }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Community Contributions</h3>
                    <p className="text-gray-400 text-lg mb-6">
                      This platform is built and maintained by students passionate about cybersecurity.
                      We actively contribute by creating new challenges, improving existing ones, 
                      and sharing our knowledge with the community.
                    </p>
                    <motion.a
                      href="https://github.com/your-username/hackerlabs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9580FF] hover:text-[#6E54C8] transition-colors duration-200 flex items-center text-lg"
                      whileHover={{ x: 5 }}
                    >
                      <Github className="h-6 w-6 mr-2" />
                      Contribute on GitHub
                    </motion.a>
                  </motion.div>
                  <motion.div 
                    className="bg-[#12121A] rounded-lg p-8 border border-gray-700"
                    variants={fadeInUp}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(149, 128, 255, 0.1)" }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Submit Your Challenges</h3>
                    <p className="text-gray-400 text-lg mb-6">
                      Have a great challenge idea? Submit it to our platform! We welcome contributions
                      from all students. Create challenges, share your knowledge, and help others learn.
                    </p>
                    <motion.a
                      href="https://github.com/your-username/hackerlabs/issues/new?template=challenge-submission.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9580FF] hover:text-[#6E54C8] transition-colors duration-200 flex items-center text-lg"
                      whileHover={{ x: 5 }}
                    >
                      <GitPullRequest className="h-6 w-6 mr-2" />
                      Submit a Challenge
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