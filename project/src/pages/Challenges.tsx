import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/database.types';

type Challenge = Database['public']['Tables']['challenges']['Row'];

function Challenges() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all challenges
        const { data: challengesData, error: challengesError } = await supabase
          .from('challenges')
          .select('*')
          .order('points', { ascending: true });

        console.log('Challenges data:', challengesData); // Debug log

        if (challengesError) {
          console.error('Error fetching challenges:', challengesError);
          throw challengesError;
        }

        if (!challengesData || challengesData.length === 0) {
          // If no challenges exist, insert sample challenges
          const sampleChallenges = [
            {
              title: 'Web Security Fundamentals',
              description: 'Learn the basics of web application security through hands-on exercises.',
              content: `# Web Security Fundamentals\n\n## Introduction\nWeb security is essential for protecting modern applications from various attacks.\n\n## Topics Covered\n- HTTP Security Headers\n- Input Validation\n- Authentication Basics\n- Common Vulnerabilities\n\n## Your Challenge\nAnalyze the provided web application and identify security vulnerabilities.\n\nAccess the application at: http://{host}:8080\n\nFind and exploit the vulnerability to gain admin access.`,
              difficulty: 'Easy',
              points: 100,
              flag: 'web_security_master',
              server_credentials: { host: 'hack-lab-01.example.com', username: 'student', password: 'training' }
            },
            {
              title: 'SQL Injection Basics',
              description: 'Master the fundamentals of SQL injection and database security.',
              content: `# SQL Injection\n\n## Overview\nSQL injection is one of the most common web vulnerabilities.\n\n## Learning Objectives\n- Understanding SQL syntax\n- Common injection points\n- Prevention techniques\n\n## Challenge\nExploit the login form to bypass authentication.\n\nTarget URL: http://{host}:8080/login`,
              difficulty: 'Medium',
              points: 200,
              flag: 'sql_master_2024',
              server_credentials: { host: 'hack-lab-02.example.com', username: 'hacker', password: 'sqltraining' }
            },
            {
              title: 'Network Security Analysis',
              description: 'Learn network security analysis using professional tools.',
              content: `# Network Security\n\n## Introduction\nNetwork security analysis is crucial for identifying threats.\n\n## Tools\n- Wireshark\n- tcpdump\n- Network scanners\n\n## Challenge\nAnalyze the provided PCAP file to find the hidden message.`,
              difficulty: 'Hard',
              points: 300,
              flag: 'network_ninja_2024',
              server_credentials: { host: 'hack-lab-03.example.com', username: 'analyst', password: 'netanalysis' }
            }
          ];

          const { data: insertedData, error: insertError } = await supabase
            .from('challenges')
            .insert(sampleChallenges)
            .select();

          if (insertError) {
            console.error('Error inserting challenges:', insertError);
            throw insertError;
          }

          console.log('Inserted challenges:', insertedData); // Debug log
          setChallenges(insertedData || []);
        } else {
          setChallenges(challengesData);
        }

        // Only fetch progress if user is authenticated
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .select('challenge_id, completed')
            .eq('user_id', user.id);

          if (progressError) throw progressError;

          const progress = progressData?.reduce<Record<string, boolean>>((acc, curr) => {
            acc[curr.challenge_id] = curr.completed || false;
            return acc;
          }, {}) || {};

          setUserProgress(progress);
        }
      } catch (err) {
        console.error('Error in fetchChallenges:', err);
        setError('Failed to load challenges. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-[#12121A] rounded w-48 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="gradient-border">
                <div className="bg-[#080810] rounded-lg p-6 h-48"></div>
              </div>
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold glow">Challenges</h1>
        {!user && (
          <div className="bg-[#12121A] p-4 rounded-lg">
            <p className="text-gray-400">
              You can view all challenges, but you need to <Link to="/login" className="text-[#9580FF] hover:underline">sign in</Link> to:
            </p>
            <ul className="text-gray-400 text-sm mt-2 list-disc list-inside">
              <li>Submit flags</li>
              <li>Track your progress</li>
              <li>Earn points</li>
            </ul>
          </div>
        )}
      </div>

      {challenges.length === 0 ? (
        <div className="text-center text-gray-400">
          <p>No challenges available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="gradient-border transform hover:scale-105 transition-all"
            >
              <div className="bg-[#080810] rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{challenge.title}</h3>
                  {user ? (
                    userProgress[challenge.id] ? (
                      <CheckCircle className="h-6 w-6 text-[#9580FF]" />
                    ) : (
                      <Lock className="h-6 w-6 text-gray-400" />
                    )
                  ) : null}
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-[#12121A] text-sm px-3 py-1 rounded-full mr-2">
                    {challenge.difficulty}
                  </span>
                  <span className="inline-block bg-[#12121A] text-sm px-3 py-1 rounded-full">
                    {challenge.points} pts
                  </span>
                </div>
                <p className="text-gray-400 mb-4 line-clamp-2">{challenge.description}</p>
                <Link
                  to={`/challenge/${challenge.id}`}
                  className={`block w-full py-2 rounded-md text-center ${
                    user && userProgress[challenge.id]
                      ? 'bg-[#080810] text-[#9580FF] border border-[#9580FF]'
                      : 'bg-[#9580FF] text-white hover:bg-[#6E54C8]'
                  } transition-colors`}
                >
                  {user && userProgress[challenge.id] ? 'Completed' : 'View Challenge'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Challenges;