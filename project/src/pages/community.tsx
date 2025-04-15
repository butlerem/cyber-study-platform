import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Users, MessageSquare, ArrowRight } from 'lucide-react';

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
      // Mock data for now
      setUserCount(1234);
    } catch (error) {
      console.error('Failed to fetch user count:', error);
    } finally {
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
        {/* Space Animation Background */}
        <div className="absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Join Our Community</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Connect with other security enthusiasts, share knowledge, and collaborate on challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* User Counter Card */}
              <div className="bg-[#12121A]/90 rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8">
                <div className="flex items-center justify-center mb-6">
                  <Users className="h-12 w-12 text-[#9580FF]" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-2">Active Users</h2>
                {loading ? (
                  <div className="text-center text-gray-400">Loading...</div>
                ) : (
                  <div className="text-4xl font-bold text-[#9580FF] text-center">{userCount}</div>
                )}
                <p className="text-gray-400 text-center mt-4">
                  Join our growing community of security enthusiasts
                </p>
              </div>

              {/* Discord Card */}
              <div className="bg-[#12121A]/90 rounded-lg shadow-lg overflow-hidden border border-gray-700 p-8">
                <div className="flex items-center justify-center mb-6">
                  <MessageSquare className="h-12 w-12 text-[#9580FF]" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-4">Join Our Discord</h2>
                <p className="text-gray-400 text-center mb-6">
                  Get real-time help, share solutions, and connect with other members
                </p>
                <a
                  href="https://discord.gg/your-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-[#9580FF] text-white py-3 px-4 rounded-md hover:bg-[#6E54C8] transition-colors duration-200"
                >
                  Join Discord
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Community Features */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white text-center mb-8">Community Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#12121A]/90 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Real-time Support</h3>
                  <p className="text-gray-400">Get help from experienced members when you're stuck on a challenge</p>
                </div>
                <div className="bg-[#12121A]/90 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Knowledge Sharing</h3>
                  <p className="text-gray-400">Learn from others' experiences and share your own insights</p>
                </div>
                <div className="bg-[#12121A]/90 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Collaboration</h3>
                  <p className="text-gray-400">Work together on challenges and build your network</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              {user && (
                <div className="mb-8">
                  <button className="bg-[#9580FF] text-white px-6 py-3 rounded-md hover:bg-[#6E54C8] transition-colors">
                    Create Post
                  </button>
                </div>
              )}

              <div className="space-y-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden p-6"
                  >
                    <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                    <p className="mt-2 text-gray-400">{post.content}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>Posted by {post.author}</span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>{post.likes} likes</span>
                        <span>•</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 