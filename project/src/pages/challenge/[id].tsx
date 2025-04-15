import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Server, Flag, CheckCircle, XCircle, Terminal } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';

interface Challenge {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty: string;
  points: number;
  flag: string;
  server_credentials?: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
  category: string;
  hints: string[];
}

interface UserProgress {
  id: string;
  user_id: string;
  challenge_id: string;
  completed: boolean;
  attempts: number;
  completed_at: string | null;
  created_at: string;
}

export default function ChallengePage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [flag, setFlag] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchChallenge = async () => {
      try {
        // TODO: Replace with actual API call
        const mockChallenge: Challenge = {
          id: id as string,
          title: 'SQL Injection Basics',
          description: 'Learn about SQL injection vulnerabilities and how to prevent them. Your task is to find the flag hidden in the database.',
          content: 'This is a placeholder content. The actual content of the challenge will be fetched from the API.',
          difficulty: 'easy',
          points: 100,
          flag: 'flag{sql_injection_master}',
          server_credentials: {
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password'
          },
          category: 'Web Security',
          hints: [
            'Try using single quotes in the search field',
            'Look for error messages that might reveal the database structure',
            'The flag might be stored in a users table'
          ]
        };
        setChallenge(mockChallenge);
      } catch (err) {
        setError('Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge) return;

    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // TODO: Replace with actual API call
      if (flag === challenge.flag) {
        setSubmitSuccess(true);
        // TODO: Update user progress
        setTimeout(() => {
          router.push('/challenges');
        }, 2000);
      } else {
        setSubmitError('Incorrect flag. Try again!');
      }
    } catch (err) {
      setSubmitError('Failed to submit flag');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
          <div className="text-white">Loading challenge...</div>
        </div>
      </Layout>
    );
  }

  if (error || !challenge) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
          <div className="text-red-500">{error || 'Challenge not found'}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white">{challenge.title}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm border ${
                      challenge.difficulty === 'easy' ? 'bg-green-500/10 text-green-500 border-green-500' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500' :
                      'bg-red-500/10 text-red-500 border-red-500'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-400">{challenge.description}</p>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-white">Hints</h2>
                    <ul className="mt-2 space-y-2">
                      {challenge.hints.map((hint, index) => (
                        <li key={index} className="text-gray-400">
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8">
                    <div>
                      <label htmlFor="flag" className="block text-sm font-medium text-gray-400">
                        Submit Flag
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="flag"
                          value={flag}
                          onChange={(e) => setFlag(e.target.value)}
                          className="block w-full bg-[#1A1A24] border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9580FF] focus:border-transparent"
                          placeholder="Enter flag here..."
                          disabled={submitting || submitSuccess}
                        />
                      </div>
                    </div>

                    {submitError && (
                      <div className="mt-2 text-red-500 text-sm">
                        {submitError}
                      </div>
                    )}

                    {submitSuccess && (
                      <div className="mt-2 text-green-500 text-sm">
                        Correct flag! Redirecting...
                      </div>
                    )}

                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={submitting || submitSuccess}
                        className="w-full bg-[#9580FF] text-white py-2 px-4 rounded-md hover:bg-[#6E54C8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? 'Submitting...' : 'Submit Flag'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Server Credentials Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Server Credentials</h2>
                  {challenge.server_credentials ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Host</label>
                        <div className="mt-1 text-white">{challenge.server_credentials.host}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Port</label>
                        <div className="mt-1 text-white">{challenge.server_credentials.port}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Username</label>
                        <div className="mt-1 text-white">{challenge.server_credentials.username}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Password</label>
                        <div className="mt-1 text-white">{challenge.server_credentials.password}</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">No server credentials available for this challenge.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 