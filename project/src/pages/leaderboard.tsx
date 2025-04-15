import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Medal, Award, User } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  username: string;
  points: number;
  rank: number;
  avatar: string;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // TODO: Replace with actual API call
        // Simulated data
        const mockLeaderboard: LeaderboardEntry[] = [
          {
            id: '1',
            username: 'SecurityMaster',
            points: 1250,
            rank: 1,
            avatar: 'https://i.pravatar.cc/150?img=1'
          },
          {
            id: '2',
            username: 'CryptoQueen',
            points: 1180,
            rank: 2,
            avatar: 'https://i.pravatar.cc/150?img=2'
          },
          {
            id: '3',
            username: 'WebNinja',
            points: 1050,
            rank: 3,
            avatar: 'https://i.pravatar.cc/150?img=3'
          },
          {
            id: '4',
            username: 'HackPro',
            points: 980,
            rank: 4,
            avatar: 'https://i.pravatar.cc/150?img=4'
          },
          {
            id: '5',
            username: 'CodeBreaker',
            points: 920,
            rank: 5,
            avatar: 'https://i.pravatar.cc/150?img=5'
          },
          {
            id: '6',
            username: 'SecurityGuru',
            points: 850,
            rank: 6,
            avatar: 'https://i.pravatar.cc/150?img=6'
          },
          {
            id: '7',
            username: 'PenTester',
            points: 780,
            rank: 7,
            avatar: 'https://i.pravatar.cc/150?img=7'
          },
          {
            id: '8',
            username: 'BugHunter',
            points: 720,
            rank: 8,
            avatar: 'https://i.pravatar.cc/150?img=8'
          },
          {
            id: '9',
            username: 'SecureCoder',
            points: 680,
            rank: 9,
            avatar: 'https://i.pravatar.cc/150?img=9'
          },
          {
            id: '10',
            username: 'CyberWarrior',
            points: 650,
            rank: 10,
            avatar: 'https://i.pravatar.cc/150?img=10'
          }
        ];
        
        setLeaderboard(mockLeaderboard);
      } catch (err) {
        setError('Failed to load leaderboard');
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
        return <span className="text-lg font-bold text-gray-400">{rank}</span>;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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
                  <thead className="bg-[#1A1A24]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Rank
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {leaderboard.map((entry) => (
                      <tr 
                        key={entry.id} 
                        className={`${user?.id === entry.id ? 'bg-[#1A1A24]' : ''} hover:bg-[#1A1A24] transition-colors duration-150`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            {getRankIcon(entry.rank)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-full" 
                                src={entry.avatar} 
                                alt={entry.username} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{entry.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-[#9580FF]">{entry.points}</div>
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