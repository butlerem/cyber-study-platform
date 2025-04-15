import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Code, Users, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchUserCount = async () => {
      try {
        // Mock data for now
        setUserCount(1234);
      } catch (error) {
        console.error('Failed to fetch user count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C] relative overflow-hidden">
        {/* Space Animation Background */}
        <div className="absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/80 to-[#12121A]/80 opacity-90"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                  Master Cybersecurity Through
                  <span className="block text-[#9580FF]">Hands-on Challenges</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
                  Learn real-world security concepts through interactive challenges. From web security to cryptography, level up your skills with practical exercises.
                </p>
                <div className="mt-10">
                  <button
                    onClick={() => router.push('/challenges')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#9580FF] hover:bg-[#6E54C8] transition-colors duration-200"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Why Choose Our Platform</h2>
                <p className="mt-4 text-xl text-gray-400">
                  Learn cybersecurity through practical, hands-on experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {/* Practical Learning Card */}
                <div className="bg-[#12121A]/90 rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Code className="h-12 w-12 text-[#9580FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-4">Practical Learning</h3>
                  <p className="text-gray-400 text-center">
                    Hands-on challenges that simulate real-world security scenarios
                  </p>
                </div>

                {/* Active Community Card */}
                <div className="bg-[#12121A]/90 rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Users className="h-12 w-12 text-[#9580FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">Active Community</h3>
                  {loading ? (
                    <div className="text-center text-gray-400">Loading...</div>
                  ) : (
                    <div className="text-4xl font-bold text-[#9580FF] text-center">{userCount}</div>
                  )}
                  <p className="text-gray-400 text-center mt-4">
                    Join our growing community of security enthusiasts
                  </p>
                </div>

                {/* Expert Guidance Card */}
                <div className="bg-[#12121A]/90 rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Shield className="h-12 w-12 text-[#9580FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-4">Expert Guidance</h3>
                  <p className="text-gray-400 text-center">
                    Learn from industry experts and get help when you need it
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#12121A]/90 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Ready to Start Learning?</h2>
                <p className="mt-4 text-xl text-gray-400">
                  Join our community and begin your cybersecurity journey today
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => router.push('/challenges')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#9580FF] hover:bg-[#6E54C8] transition-colors duration-200"
                  >
                    View Challenges
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 