import React, { useState, useEffect } from 'react';
import { Award, Target, Clock, ArrowUp, User, Camera, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

function Dashboard() {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    rank: 42,
    points: 850,
    solved: 5,
    totalTime: '24h 35m',
  });

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          setLoading(true);
          setError(null);

          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username, avatar_url')
            .eq('id', user.id)
            .single();

          if (profileError) {
            // If no profile exists, create one
            if (profileError.code === 'PGRST116') {
              const defaultUsername = user.email?.split('@')[0] || 'Anonymous Hacker';
              const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                  id: user.id,
                  username: defaultUsername,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                });

              if (insertError) throw insertError;
              setUsername(defaultUsername);
            } else {
              throw profileError;
            }
          } else if (profile) {
            setUsername(profile.username || 'Anonymous Hacker');
            setAvatarUrl(profile.avatar_url);
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError('Failed to load profile. Please try refreshing the page.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  const handleUpdateUsername = async () => {
    if (!user || !username.trim()) return;

    try {
      setError(null);
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: username.trim(),
          updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;
      setEditing(false);
    } catch (err) {
      console.error('Error updating username:', err);
      setError('Failed to update username. Please try again.');
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setError(null);
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;
      setAvatarUrl(publicUrl);
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError('Failed to upload avatar. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-32 bg-[#12121A] rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-[#12121A] rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-xl font-semibold text-red-500">{error}</h3>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#9580FF] text-white px-4 py-2 rounded-md hover:bg-[#6E54C8]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Section */}
      <div className="bg-[#080810] rounded-lg p-8 mb-12 gradient-border">
        <div className="flex items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#12121A] overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-full h-full p-4 text-gray-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-[#9580FF] rounded-full cursor-pointer hover:bg-[#6E54C8] transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
            </label>
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#12121A] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9580FF]"
                  placeholder="Enter username"
                />
                <button
                  onClick={handleUpdateUsername}
                  className="bg-[#9580FF] text-white px-4 py-2 rounded-md hover:bg-[#6E54C8]"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">{username || 'Anonymous Hacker'}</h2>
                <button
                  onClick={() => setEditing(true)}
                  className="text-[#9580FF] hover:text-[#6E54C8]"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="gradient-border">
          <div className="bg-[#080810] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <Award className="h-8 w-8 text-[#9580FF]" />
              <span className="text-2xl font-bold">#{stats.rank}</span>
            </div>
            <p className="mt-2 text-gray-400">Global Rank</p>
          </div>
        </div>
        <div className="gradient-border">
          <div className="bg-[#080810] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <Target className="h-8 w-8 text-[#9580FF]" />
              <span className="text-2xl font-bold">{stats.points}</span>
            </div>
            <p className="mt-2 text-gray-400">Total Points</p>
          </div>
        </div>
        <div className="gradient-border">
          <div className="bg-[#080810] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <ArrowUp className="h-8 w-8 text-[#9580FF]" />
              <span className="text-2xl font-bold">{stats.solved}</span>
            </div>
            <p className="mt-2 text-gray-400">Challenges Solved</p>
          </div>
        </div>
        <div className="gradient-border">
          <div className="bg-[#080810] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <Clock className="h-8 w-8 text-[#9580FF]" />
              <span className="text-2xl font-bold">{stats.totalTime}</span>
            </div>
            <p className="mt-2 text-gray-400">Total Time</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="gradient-border">
        <div className="bg-[#080810] rounded-lg">
          <div className="px-6 py-4 border-b border-[#12121A]">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="divide-y divide-[#12121A]">
            {[
              { id: 1, challenge: 'Web Basics', points: 100, timestamp: '2 hours ago' },
              { id: 2, challenge: 'Cryptography 101', points: 150, timestamp: '1 day ago' },
            ].map((activity) => (
              <div key={activity.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{activity.challenge}</h3>
                  <p className="text-sm text-gray-400">{activity.timestamp}</p>
                </div>
                <span className="text-[#9580FF]">+{activity.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;