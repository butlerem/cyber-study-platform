import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Users, MessageSquare, ArrowRight } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchPosts();
    fetchUserCount();
  }, []);

  const fetchPosts = async () => {
    try {
      // TODO: Replace with actual API call
      const mockPosts: CommunityPost[] = [
        {
          id: '1',
          title: 'SQL Injection Challenge Solution',
          content: 'Here\'s how I solved the SQL Injection challenge...',
          author: 'hacker1',
          createdAt: '2024-04-15',
          likes: 15,
          comments: 5
        },
        {
          id: '2',
          title: 'XSS Prevention Tips',
          content: 'Some tips for preventing XSS attacks...',
          author: 'hacker2',
          createdAt: '2024-04-14',
          likes: 10,
          comments: 3
        }
      ];
      setPosts(mockPosts);
    } catch (err) {
      setError('Failed to load community posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCount = async () => {
    try {
      // Simulate fetching user count with animation
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
      console.error('Failed to fetch user count:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
          <div className="text-white">Loading community posts...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
          <div className="text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C] relative overflow-hidden">
        {/* 3D Space Animation Background */}
        <SpaceBackground />
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white">Community</h1>
              <p className="mt-4 text-xl text-gray-400">
                Connect with fellow security enthusiasts and share knowledge
              </p>
            </div>

            {/* User Counter Card */}
            <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <Users className="h-12 w-12 text-[#9580FF] mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Active Members</h2>
                    <p className="text-gray-400">Join our growing community</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  {loading ? (
                    <div className="text-5xl font-bold text-[#9580FF]">...</div>
                  ) : (
                    <div className="text-5xl font-bold text-[#9580FF]">{userCount}</div>
                  )}
                  <p className="text-gray-400 mt-2">Security Enthusiasts</p>
                </div>
              </div>
            </div>

            {/* Discord Join Card */}
            <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <MessageSquare className="h-12 w-12 text-[#9580FF] mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Join Our Discord</h2>
                    <p className="text-gray-400">Connect with the community in real-time</p>
                  </div>
                </div>
                <a
                  href="https://discord.gg/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#5865F2] text-white py-3 px-6 rounded-md hover:bg-[#4752C4] transition-colors duration-200 flex items-center"
                >
                  Join Discord
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </div>
            </div>

            {/* Community Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-6 hover:border-[#9580FF] transition-colors duration-200">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-[#9580FF] mr-2" />
                  <h3 className="text-xl font-bold text-white">Real-time Support</h3>
                </div>
                <p className="text-gray-400">
                  Get help from community members and moderators when you're stuck on a challenge.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-6 hover:border-[#9580FF] transition-colors duration-200">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-[#9580FF] mr-2" />
                  <h3 className="text-xl font-bold text-white">Knowledge Sharing</h3>
                </div>
                <p className="text-gray-400">
                  Share your solutions and learn from others' approaches to security challenges.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-6 hover:border-[#9580FF] transition-colors duration-200">
                <div className="flex items-center mb-4">
                  <ArrowRight className="h-6 w-6 text-[#9580FF] mr-2" />
                  <h3 className="text-xl font-bold text-white">Collaboration</h3>
                </div>
                <p className="text-gray-400">
                  Work together on challenges and build your network of security professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 