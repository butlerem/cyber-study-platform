import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Server, Flag, CheckCircle, XCircle, Terminal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import type { Database } from '../lib/database.types';

type Challenge = Database['public']['Tables']['challenges']['Row'];
type UserProgress = Database['public']['Tables']['user_progress']['Row'];

function ChallengePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [flag, setFlag] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch challenge data
        const { data: challengeData, error: challengeError } = await supabase
          .from('challenges')
          .select('*')
          .eq('id', id)
          .single();

        if (challengeError) throw challengeError;
        if (!challengeData) throw new Error('Challenge not found');

        setChallenge(challengeData);

        // Only fetch progress if user is logged in
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('challenge_id', id)
            .eq('user_id', user.id)
            .maybeSingle(); // Use maybeSingle() instead of single()

          // Only set progress if there's no error and data exists
          if (!progressError && progressData) {
            setUserProgress(progressData);
            setSuccess(progressData.completed);
          }
        }
      } catch (err) {
        console.error('Error fetching challenge:', err);
        setError('Failed to load challenge. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id, user]);

  const handleSubmitFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !challenge) return;

    try {
      setError('');
      
      if (flag.toLowerCase() === challenge.flag.toLowerCase()) {
        const { error: progressError } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            challenge_id: challenge.id,
            completed: true,
            completed_at: new Date().toISOString(),
            attempts: (userProgress?.attempts || 0) + 1,
          });

        if (progressError) throw progressError;

        setSuccess(true);
        setUserProgress(prev => ({
          ...(prev || {
            id: '',
            user_id: user.id,
            challenge_id: challenge.id,
            completed: true,
            attempts: 1,
            completed_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          }),
          completed: true,
          completed_at: new Date().toISOString(),
          attempts: (prev?.attempts || 0) + 1,
        }));
      } else {
        const { error: progressError } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            challenge_id: challenge.id,
            completed: false,
            attempts: (userProgress?.attempts || 0) + 1,
          });

        if (progressError) throw progressError;

        setUserProgress(prev => ({
          ...(prev || {
            id: '',
            user_id: user.id,
            challenge_id: challenge.id,
            completed: false,
            attempts: 1,
            completed_at: null,
            created_at: new Date().toISOString(),
          }),
          attempts: (prev?.attempts || 0) + 1,
        }));

        setError('Incorrect flag. Try again!');
      }
    } catch (err) {
      console.error('Error submitting flag:', err);
      setError('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-[#12121A] rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-96 bg-[#12121A] rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-[#12121A] rounded-lg"></div>
              <div className="h-48 bg-[#12121A] rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Challenge not found</h2>
          <button
            onClick={() => navigate('/challenges')}
            className="mt-4 bg-[#9580FF] text-white px-4 py-2 rounded-md hover:bg-[#6E54C8]"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/challenges')}
        className="flex items-center text-gray-400 hover:text-white mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Challenges
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-[#0D1117] rounded-lg p-8 border border-[#21262D]">
            <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-[#21262D] text-sm px-3 py-1 rounded-full">
                {challenge.difficulty}
              </span>
              <span className="bg-[#21262D] text-sm px-3 py-1 rounded-full">
                {challenge.points} pts
              </span>
            </div>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{challenge.content}</ReactMarkdown>
            </div>

            {/* Code Example */}
            <div className="mt-8">
              <div className="code-window">
                <div className="code-window-header">
                  <div className="window-dot dot-red"></div>
                  <div className="window-dot dot-yellow"></div>
                  <div className="window-dot dot-green"></div>
                  <span className="text-sm text-gray-400 ml-2">Terminal</span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="flex items-center text-gray-400">
                    <Terminal className="h-4 w-4 mr-2" />
                    <span className="text-[#9580FF]">$</span>
                    <span className="ml-2">john --format=raw-md5 hash.txt --wordlist=/usr/share/wordlists/rockyou.txt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Server Credentials */}
          <div className="bg-[#0D1117] rounded-lg p-6 border border-[#21262D]">
            <div className="flex items-center mb-4">
              <Server className="h-5 w-5 text-[#9580FF] mr-2" />
              <h2 className="text-xl font-semibold">Server Access</h2>
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-gray-400">Host</label>
                <code className="block bg-[#21262D] px-3 py-2 rounded mt-1">
                  {challenge.server_credentials.host}
                </code>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Username</label>
                <code className="block bg-[#21262D] px-3 py-2 rounded mt-1">
                  {challenge.server_credentials.username}
                </code>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Password</label>
                <code className="block bg-[#21262D] px-3 py-2 rounded mt-1">
                  {challenge.server_credentials.password}
                </code>
              </div>
            </div>
          </div>

          {/* Flag Submission */}
          <div className="bg-[#0D1117] rounded-lg p-6 border border-[#21262D]">
            <div className="flex items-center mb-4">
              <Flag className="h-5 w-5 text-[#9580FF] mr-2" />
              <h2 className="text-xl font-semibold">Submit Flag</h2>
            </div>
            {!user ? (
              <div className="text-center">
                <p className="text-gray-400 mb-2">You can view this challenge, but you need to be signed in to:</p>
                <ul className="text-gray-400 text-sm mb-4 text-left list-disc list-inside">
                  <li>Submit flags</li>
                  <li>Track your progress</li>
                  <li>Earn points</li>
                </ul>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-[#9580FF] text-white py-2 rounded-md font-semibold hover:bg-[#6E54C8]"
                >
                  Sign in to Submit
                </button>
              </div>
            ) : success ? (
              <div className="flex items-center text-[#9580FF] mb-4">
                <CheckCircle className="h-5 w-5 mr-2" />
                Challenge completed!
              </div>
            ) : (
              <form onSubmit={handleSubmitFlag}>
                <input
                  type="text"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  placeholder="Enter flag here"
                  className="w-full px-3 py-2 bg-[#21262D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9580FF] mb-4"
                  disabled={success}
                />
                {error && (
                  <div className="flex items-center text-red-500 mb-4">
                    <XCircle className="h-5 w-5 mr-2" />
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#9580FF] text-white py-2 rounded-md font-semibold hover:bg-[#6E54C8] transform hover:scale-105 transition-all"
                  disabled={success}
                >
                  Submit Flag
                </button>
              </form>
            )}
            {userProgress && (
              <div className="mt-4 text-sm text-gray-400">
                Attempts: {userProgress.attempts || 0}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengePage;