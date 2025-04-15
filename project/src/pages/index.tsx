import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, MessageSquare, ArrowRight, Code, Trophy, Shield, Rocket, User, Github, GitPullRequest } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';

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

        // Animate the counter from 0 to 1234
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
        console.error('Failed to fetch user count:', error);
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C] relative overflow-hidden">
        {/* 3D Space Animation Background */}
        <SpaceBackground />
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">
                Learn Cybersecurity Through Hands-On Challenges
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Master practical security skills with our interactive labs and real-world scenarios.
                Join our community of student security enthusiasts and advance your skills together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => router.push('/register')}
                  className="bg-[#9580FF] text-white py-3 px-6 rounded-md hover:bg-[#6E54C8] transition-colors duration-200 font-medium"
                >
                  Get Started
                </button>
                <button
                  onClick={() => router.push('/challenges')}
                  className="bg-transparent border border-[#9580FF] text-white py-3 px-6 rounded-md hover:bg-[#9580FF]/10 transition-colors duration-200 font-medium"
                >
                  Browse Challenges
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#9580FF] mb-2">
                    {loading ? '...' : userCount.toLocaleString()}
                  </div>
                  <p className="text-gray-400">Active Learners</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#9580FF] mb-2">50+</div>
                  <p className="text-gray-400">Security Challenges</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#9580FF] mb-2">24/7</div>
                  <p className="text-gray-400">Community Support</p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Feature 1 */}
              <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-6 hover:border-[#9580FF] transition-colors duration-200">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-[#9580FF] mr-2" />
                  <h3 className="text-xl font-bold text-white">Practical Learning</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Hands-on labs and real-world scenarios to build practical security skills.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-6 hover:border-[#9580FF] transition-colors duration-200">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-[#9580FF] mr-2" />
                  <h3 className="text-xl font-bold text-white">Active Community</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Join our community of student security enthusiasts and learn together.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-6 hover:border-[#9580FF] transition-colors duration-200">
                <div className="flex items-center mb-4">
                  <GitPullRequest className="h-6 w-6 text-[#9580FF] mr-2" />
                  <h3 className="text-xl font-bold text-white">Contribute</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Submit your own challenges, improve existing ones, and help build this platform.
                </p>
              </div>
            </div>

            {/* Learning Path Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Your Learning Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#12121A] rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <Code className="h-6 w-6 text-[#9580FF] mr-2" />
                    <h3 className="text-lg font-bold text-white">Basics</h3>
                  </div>
                  <p className="text-gray-400">Start with fundamental security concepts and tools</p>
                </div>
                <div className="bg-[#12121A] rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-[#9580FF] mr-2" />
                    <h3 className="text-lg font-bold text-white">Web Security</h3>
                  </div>
                  <p className="text-gray-400">Learn about common web vulnerabilities and defenses</p>
                </div>
                <div className="bg-[#12121A] rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <Rocket className="h-6 w-6 text-[#9580FF] mr-2" />
                    <h3 className="text-lg font-bold text-white">Advanced</h3>
                  </div>
                  <p className="text-gray-400">Tackle complex security challenges and CTF-style problems</p>
                </div>
                <div className="bg-[#12121A] rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <Trophy className="h-6 w-6 text-[#9580FF] mr-2" />
                    <h3 className="text-lg font-bold text-white">Expert</h3>
                  </div>
                  <p className="text-gray-400">Master advanced techniques and contribute to the community</p>
                </div>
              </div>
            </div>

            {/* Student Projects Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Built By Students, For Students</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#12121A] rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Community Contributions</h3>
                  <p className="text-gray-400 mb-4">
                    This platform is built and maintained by students passionate about cybersecurity.
                    We actively contribute by creating new challenges, improving existing ones, 
                    and sharing our knowledge with the community.
                  </p>
                  <a
                    href="https://github.com/your-username/hackerlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9580FF] hover:text-[#6E54C8] transition-colors duration-200 flex items-center"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    Contribute on GitHub
                  </a>
                </div>
                <div className="bg-[#12121A] rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Submit Your Challenges</h3>
                  <p className="text-gray-400 mb-4">
                    Have a great challenge idea? Submit it to our platform! We welcome contributions
                    from all students. Create challenges, share your knowledge, and help others learn.
                  </p>
                  <a
                    href="https://github.com/your-username/hackerlabs/issues/new?template=challenge-submission.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9580FF] hover:text-[#6E54C8] transition-colors duration-200 flex items-center"
                  >
                    <GitPullRequest className="h-5 w-5 mr-2" />
                    Submit a Challenge
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join our platform today and take the first step towards mastering cybersecurity.
                Connect with fellow students and build your skills together.
              </p>
              <button
                onClick={() => router.push('/register')}
                className="bg-[#9580FF] text-white py-3 px-8 rounded-md hover:bg-[#6E54C8] transition-colors duration-200 font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 