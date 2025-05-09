import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/authUtils";
import {
  Filter,
  Search,
  Server,
  Lock,
  Bug,
  Terminal,
  Code,
  Database,
} from "lucide-react";
import DifficultyIcon from "../components/DifficultyIcon";

interface Challenge {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  category: string;
  completed?: boolean;
}

type DifficultyFilter = "all" | "easy" | "medium" | "hard";
type CategoryFilter = "all" | "web" | "network" | "crypto" | "getting-started";

export default function ChallengesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('/api/challenges');
        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }
        const data = await response.json();
        setChallenges(data);
      } catch (err) {
        setError("Failed to load challenges");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleStartChallenge = (id: string) => {
    router.push(`/challenge/${id}`);
  };

  const filteredChallenges = challenges.filter((challenge) => {
    if (
      difficultyFilter !== "all" &&
      challenge.difficulty !== difficultyFilter
    ) {
      return false;
    }

    if (categoryFilter !== "all" && challenge.category !== categoryFilter) {
      return false;
    }

    if (
      searchQuery &&
      !challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <Bug className="h-5 w-5 text-[#9580FF]" />;
      case "network":
        return <Server className="h-5 w-5 text-[#9580FF]" />;
      case "crypto":
        return <Lock className="h-5 w-5 text-[#9580FF]" />;
      case "getting-started":
        return <Terminal className="h-5 w-5 text-[#9580FF]" />;
      default:
        return null;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "web":
        return "Web Security";
      case "network":
        return "Network Security";
      case "crypto":
        return "Cryptography";
      case "getting-started":
        return "Getting Started";
      default:
        return category;
    }
  };

  const groupedChallenges = filteredChallenges.reduce((acc, challenge) => {
    const category = challenge.category || "getting-started";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(challenge);
    return acc;
  }, {} as Record<string, Challenge[]>);

  const categories = ["getting-started", "web", "network", "crypto"];

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #000000, #111111)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Challenges</h1>
              <p className="text-white/60">
                Test your skills with our collection of security challenges
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9580FF]/50 focus:border-[#9580FF]/30 hover:bg-black/30 transition-colors duration-300 w-full sm:w-64"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9580FF]/50 focus:border-[#9580FF]/30 hover:bg-black/30 transition-colors duration-300 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%239580FF%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M7.247%2011.14L2.451%205.658C1.885%205.013%202.345%204%203.204%204h9.592a1%201%200%200%201%20.753%201.659l-4.796%205.48a1%201%200%200%201-1.506%200z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:16px_16px] bg-[right_1rem_center] pr-10 [&>option]:bg-[#12121A] [&>option]:text-white [&>option]:hover:bg-[#9580FF]/20 [&>option]:hover:text-white"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9580FF]/50 focus:border-[#9580FF]/30 hover:bg-black/30 transition-colors duration-300 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%239580FF%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M7.247%2011.14L2.451%205.658C1.885%205.013%202.345%204%203.204%204h9.592a1%201%200%200%201%20.753%201.659l-4.796%205.48a1%201%200%200%201-1.506%200z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:16px_16px] bg-[right_1rem_center] pr-10 [&>option]:bg-[#12121A] [&>option]:text-white [&>option]:hover:bg-[#9580FF]/20 [&>option]:hover:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="web">Web Security</option>
                  <option value="network">Network Security</option>
                  <option value="crypto">Cryptography</option>
                  <option value="getting-started">Getting Started</option>
                </select>
              </div>
            </div>
          </div>

          {/* Challenges Grid */}
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-[#12121A] rounded w-48 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-48 bg-[#12121A] rounded-lg"></div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="space-y-12">
              {categories.map(
                (category) =>
                  groupedChallenges[category] && (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-6">
                        {getCategoryIcon(category)}
                        <h2 className="text-2xl font-bold text-white">
                          {getCategoryName(category)}
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedChallenges[category].map((challenge) => (
                          <div
                            key={challenge._id}
                            className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-colors duration-300"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-xl font-bold text-white">
                                {challenge.title}
                              </h3>
                              <DifficultyIcon
                                difficulty={challenge.difficulty}
                              />
                            </div>
                            <p className="text-white/60 mb-4">
                              {challenge.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Terminal className="h-5 w-5 text-white/60" />
                                <span className="text-white/60">
                                  {challenge.points} points
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleStartChallenge(challenge._id)
                                }
                                className="bg-white/10 text-white px-4 py-2 rounded-md hover:bg-white/20 transition-colors duration-300"
                              >
                                Start Challenge
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
