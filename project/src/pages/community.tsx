import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/authUtils";
import { Users, MessageSquare, ArrowRight } from "lucide-react";
import SpaceBackground from "../components/SpaceBackground";

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
  const [error, setError] = useState("");
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
          id: "1",
          title: "SQL Injection Challenge Solution",
          content: "Here's how I solved the SQL Injection challenge...",
          author: "hacker1",
          createdAt: "2024-04-15",
          likes: 15,
          comments: 5,
        },
        {
          id: "2",
          title: "XSS Prevention Tips",
          content: "Some tips for preventing XSS attacks...",
          author: "hacker2",
          createdAt: "2024-04-14",
          likes: 10,
          comments: 3,
        },
      ];
      setPosts(mockPosts);
    } catch (err) {
      setError("Failed to load community posts");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #000000, #111111)' }}>
        {/* 3D Space Animation Background */}
        <SpaceBackground />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            {/* Header */}
            <div className="text-center mb-32">
              <h1 className="">Community</h1>
              <p className="mt-6">
                Connect with fellow security enthusiasts and share knowledge
              </p>
            </div>

            {/* User Counter Card */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 mb-24">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <Users className="h-12 w-12 text-white/60 mr-4" />
                  <div>
                    <h2 className="">
                      Active Members
                    </h2>
                    <p className="">Join our growing community</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  {loading ? (
                    <div className="text-5xl font-bold text-white/60">...</div>
                  ) : (
                    <div className="text-5xl font-bold text-white/60">
                      {userCount}
                    </div>
                  )}
                  <p className="text-gray-400 mt-2">Security Enthusiasts</p>
                </div>
              </div>
            </div>

            {/* Discord Join Card */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 mb-32">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <MessageSquare className="h-12 w-12 text-white/60 mr-4" />
                  <div>
                    <h2 className="">
                      Join Our Discord
                    </h2>
                    <p className="">
                      Connect with the community in real-time
                    </p>
                  </div>
                </div>
                <a
                  href="https://discord.gg/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 text-white py-3 px-6 rounded-md hover:bg-white/20 transition-colors duration-200 flex items-center"
                >
                  Join Discord
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </div>
            </div>

            {/* Community Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
              {/* Feature 1 */}
              <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center mb-6">
                  <MessageSquare className="h-8 w-8 text-white/60 mr-3" />
                  <h3 className="mb-6">
                    Real-time Support
                  </h3>
                </div>
                <p className="">
                  Get help from community members and moderators when you're
                  stuck on a challenge.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-white/60 mr-3" />
                  <h3 className="mb-6">
                    Knowledge Sharing
                  </h3>
                </div>
                <p className="">
                  Share your solutions and learn from others' approaches to
                  security challenges.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center mb-6">
                  <ArrowRight className="h-8 w-8 text-white/60 mr-3" />
                  <h3 className="mb-6">
                    Collaboration
                  </h3>
                </div>
                <p className="">
                  Work together on challenges and build your network of security
                  professionals.
                </p>
              </div>
            </div>

            {/* Recent Posts Section */}
            <div className="mb-32">
              <h2 className="mb-12">Recent Discussions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 hover:border-white/20 transition-colors duration-300"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">{post.title}</h3>
                    <p className="text-gray-400 mb-4">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>By {post.author}</span>
                      <span>{post.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="flex items-center text-gray-400">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments} comments
                      </span>
                      <span className="flex items-center text-gray-400">
                        <Users className="h-4 w-4 mr-1" />
                        {post.likes} likes
                      </span>
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
