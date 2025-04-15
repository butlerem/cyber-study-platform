import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

interface UserProgress {
  challengeId: string;
  title: string;
  completed: boolean;
  completedAt: string | null;
  points: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchProgress();
  }, [user]);

  const fetchProgress = async () => {
    try {
      // TODO: Replace with actual API call
      const mockProgress: UserProgress[] = [
        {
          challengeId: '1',
          title: 'SQL Injection Basics',
          completed: true,
          completedAt: '2024-04-15',
          points: 100
        },
        {
          challengeId: '2',
          title: 'XSS Attack Prevention',
          completed: false,
          completedAt: null,
          points: 200
        }
      ];
      setProgress(mockProgress);
    } catch (err) {
      setError('Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  const totalPoints = progress.reduce((sum, p) => sum + (p.completed ? p.points : 0), 0);
  const completedChallenges = progress.filter(p => p.completed).length;
  const totalChallenges = progress.length;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
          <div className="text-white">Loading dashboard...</div>
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
      <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Dashboard
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-400">
              Track your progress and achievements
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-[#12121A] rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-white">Total Points</h3>
              <p className="mt-2 text-3xl font-bold text-[#9580FF]">{totalPoints}</p>
            </div>
            <div className="bg-[#12121A] rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-white">Challenges Completed</h3>
              <p className="mt-2 text-3xl font-bold text-[#9580FF]">{completedChallenges}/{totalChallenges}</p>
            </div>
            <div className="bg-[#12121A] rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-white">Completion Rate</h3>
              <p className="mt-2 text-3xl font-bold text-[#9580FF]">
                {totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0}%
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Challenge Progress</h2>
            <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Challenge
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Completed
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {progress.map((item) => (
                    <tr key={item.challengeId} className="hover:bg-[#1A1F2E]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.completed
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {item.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9580FF]">
                        {item.points}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {item.completedAt || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 