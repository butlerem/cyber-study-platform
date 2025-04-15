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
  role: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // TODO: Replace with actual API call
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Using the same users from the home page with added stats
        const mockLeaderboard: LeaderboardEntry[] = [
          {
            id: '1',
            username: 'cyber_ninja_42',
            points: 1250,
            rank: 1,
            avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=cyber_ninja_42&backgroundColor=12121A&textureChance=100',
            completedChallenges: 12,
            role: 'Web Security Expert'
          },
          {
            id: '2',
            username: 'null.ptr',
            points: 1180,
            rank: 2,
            avatar: null,
            completedChallenges: 11,
            role: 'System Hacker'
          },
          {
            id: '3',
            username: '0xDEADBEEF',
            points: 1120,
            rank: 3,
            avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=0xDEADBEEF&backgroundColor=12121A&textureChance=100',
            completedChallenges: 10,
            role: 'Reverse Engineer'
          },
          {
            id: '4',
            username: 'l33t_h4ck3r',
            points: 1050,
            rank: 4,
            avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=l33t_h4ck3r&backgroundColor=12121A&textureChance=100',
            completedChallenges: 9,
            role: 'CTF Champion'
          },
          {
            id: '5',
            username: 'ghost_in_the_shell',
            points: 980,
            rank: 5,
            avatar: null,
            completedChallenges: 8,
            role: 'Network Security'
          },
          {
            id: '6',
            username: 'binary_wizard',
            points: 920,
            rank: 6,
            avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=binary_wizard&backgroundColor=12121A&textureChance=100',
            completedChallenges: 7,
            role: 'Binary Exploitation'
          }
        ];
        
        setLeaderboard(mockLeaderboard);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setError('Failed to load leaderboard data');
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
      <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
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
            <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr className="bg-[#1A1A24]">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Points
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Challenges
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {leaderboard.map((entry) => (
                      <tr key={entry.id} className="hover:bg-[#1A1A24] transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getRankIcon(entry.rank)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border border-gray-700">
                              {entry.avatar ? (
                                <img 
                                  src={entry.avatar} 
                                  alt={entry.username} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-[#1A1A24] flex items-center justify-center">
                                  <User className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{entry.username}</div>
                              <div className="text-xs text-gray-400">{entry.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-bold text-[#9580FF]">{entry.points}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-400">{entry.completedChallenges}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 