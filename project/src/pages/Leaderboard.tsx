import React, { useState, useEffect } from 'react';
import { Trophy, Medal, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  avatar_url: string | null;
  points: number;
  solved: number;
}

interface Challenge {
  id: string;
  points: number;
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        
        // First check if we have any user progress
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select(`
            user_id,
            completed,
            challenges!inner (points)
          `)
          .eq('completed', true);

        if (progressError) throw progressError;

        // If no progress data, create some sample data
        if (!progressData || progressData.length === 0) {
          // Get all challenges to calculate total points
          const { data: challenges } = await supabase
            .from('challenges')
            .select('id, points');

          if (challenges && challenges.length > 0) {
            // Create sample users with varying progress
            const sampleUsers: LeaderboardEntry[] = [
              { 
                rank: 1,
                user_id: 'sample-1',
                username: 'SecurityMaster',
                avatar_url: null,
                points: 500,
                solved: 3
              },
              { 
                rank: 2,
                user_id: 'sample-2',
                username: 'CodeNinja',
                avatar_url: null,
                points: 300,
                solved: 2
              },
              { 
                rank: 3,
                user_id: 'sample-3',
                username: 'HackPro',
                avatar_url: null,
                points: 200,
                solved: 1
              }
            ];

            setLeaderboard(sampleUsers);
            return;
          }
        }

        // If we have progress data, fetch profiles and calculate rankings
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, username, avatar_url');

        if (profilesError) throw profilesError;

        // Calculate points and solved challenges for each user
        const userStats = progressData.reduce((acc: Record<string, { points: number; solved: number }>, curr) => {
          const userId = curr.user_id;
          if (!acc[userId]) {
            acc[userId] = { points: 0, solved: 0 };
          }
          acc[userId].points += curr.challenges.points;
          acc[userId].solved += 1;
          return acc;
        }, {});

        // Combine with profile data and sort
        const leaderboardData: LeaderboardEntry[] = Object.entries(userStats)
          .map(([userId, stats]) => ({
            user_id: userId,
            ...stats,
            ...profiles.find(p => p.id === userId),
            rank: 0, // Will be set in the next step
            username: profiles.find(p => p.id === userId)?.username || 'Anonymous Hacker',
            avatar_url: profiles.find(p => p.id === userId)?.avatar_url || null,
          }))
          .sort((a, b) => b.points - a.points)
          .map((entry, index) => ({
            ...entry,
            rank: index + 1,
          }));

        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-[#12121A] rounded w-48 mb-8"></div>
          <div className="gradient-border">
            <div className="bg-[#080810] rounded-lg p-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-[#12121A] rounded mb-4 last:mb-0"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 glow">Global Leaderboard</h1>
      <div className="gradient-border">
        <div className="bg-[#080810] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#12121A]">
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-right">Points</th>
                <th className="px-6 py-4 text-right">Challenges Solved</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.user_id} className="border-t border-[#12121A] hover:bg-[#12121A] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {entry.rank === 1 && <Trophy className="h-5 w-5 text-yellow-400 mr-2" />}
                      {entry.rank === 2 && <Medal className="h-5 w-5 text-gray-400 mr-2" />}
                      {entry.rank === 3 && <Medal className="h-5 w-5 text-orange-400 mr-2" />}
                      {entry.rank > 3 && <span className="w-7">{entry.rank}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#12121A] overflow-hidden mr-3">
                        {entry.avatar_url ? (
                          <img src={entry.avatar_url} alt={entry.username} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-full h-full p-1 text-gray-400" />
                        )}
                      </div>
                      <span>{entry.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-[#9580FF]">{entry.points}</td>
                  <td className="px-6 py-4 text-right">{entry.solved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;