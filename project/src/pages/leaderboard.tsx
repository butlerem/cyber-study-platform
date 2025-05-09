import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Trophy, Medal, Award, User } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  username: string;
  points: number;
  rank: number;
  avatar: string | null;
  completedChallenges: number;
  bio: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/user/leaderboard");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || "Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError(error instanceof Error ? error.message : "Failed to load leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold">{rank}</span>;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #000000, #111111)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
            <p className="mt-4 text-xl text-gray-400">
              Top performers in our cybersecurity challenges
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-400">Loading leaderboard...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <Trophy className="h-12 w-12 text-white/60 mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
                    <p className="text-gray-400">Top performers in security challenges</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-5xl font-bold text-white/60">{leaderboard.length}</div>
                  <p className="text-gray-400 mt-2">Active Participants</p>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Table */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Challenges
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {leaderboard.map((entry, index) => {
                  // Debug: log avatar value
                  console.log('Rendering avatar for', entry.username, 'avatar:', entry.avatar);
                  return (
                    <tr key={entry.id} className="hover:bg-white/5 transition-colors duration-300">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white/60">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={entry.avatar && typeof entry.avatar === 'string' && entry.avatar.trim() !== "" ? entry.avatar : "/images/default-avatar.svg"}
                              alt={entry.username}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{entry.username}</div>
                            <div className="text-sm text-white/60">{entry.bio}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                        {entry.points}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                        {entry.completedChallenges}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
} 