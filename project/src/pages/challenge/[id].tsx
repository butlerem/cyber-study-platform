import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Server, Flag, CheckCircle, XCircle, Terminal, Code, Database, AlertTriangle, Info } from 'lucide-react';
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
  code_examples?: {
    title: string;
    description: string;
    code: string;
    language: string;
  }[];
  methodology?: {
    steps: string[];
  };
  solution?: {
    approach: string;
    code: string;
    explanation: string;
  };
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
  const [activeTab, setActiveTab] = useState('overview');
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchChallenge = async () => {
      try {
        // TODO: Replace with actual API call
        const mockChallenge: Challenge = {
          id: id as string,
          title: 'SQL Injection Basics',
          description: 'Learn about SQL injection vulnerabilities and how to prevent them. Your task is to find the flag hidden in the database.',
          content: `# SQL Injection Basics

SQL injection is one of the most powerful and widely used web hacking techniques. It allows you to manipulate database queries to extract sensitive information, bypass authentication, and even take control of the entire database server.

## What is SQL Injection?

SQL injection is a web security vulnerability that lets you interfere with the queries an application makes to its database. When an application doesn't properly sanitize user input, you can inject malicious SQL code that the database will execute, giving you access to data you shouldn't have.

## How to Exploit SQL Injection

SQL injection attacks work by manipulating input fields to include SQL commands that the application will execute. This happens when user input is directly included in SQL queries without proper sanitization.

### Common Attack Vectors:
- Login forms
- Search boxes
- URL parameters
- HTTP headers
- Cookie values

## Impact of Successful SQL Injection

A successful SQL injection attack can:
- Extract sensitive data (passwords, personal information, financial records)
- Bypass authentication and gain unauthorized access
- Modify or delete data in the database
- Execute administrative operations on the database
- In some cases, execute commands on the operating system

## Prevention (What You Need to Know to Defend)

To prevent SQL injection (and understand how to bypass these protections):
- Parameterized queries (prepared statements)
- Input validation and sanitization
- Escape special characters
- Use ORM frameworks
- Implement proper access controls

## Your Mission

Your task is to find the flag hidden in the database by exploiting a SQL injection vulnerability. The flag is stored in a table called 'flags' with a column named 'flag'. Use your knowledge of SQL injection techniques to extract it.`,
          difficulty: 'easy',
          points: 100,
          flag: 'flag{sql_injection_master}',
          server_credentials: {
            host: '10.10.10.123',
            port: 80,
            username: '********',
            password: '********'
          },
          category: 'Web Security',
          hints: [
            'Try using single quotes in the search field',
            'Look for error messages that might reveal the database structure',
            'The flag might be stored in a users table'
          ],
          code_examples: [
            {
              title: 'Vulnerable Query',
              description: 'This is an example of a vulnerable SQL query that is susceptible to SQL injection:',
              code: `// Vulnerable code
const query = "SELECT * FROM users WHERE username = '" + userInput + "'";

// If userInput is "admin' --", the query becomes:
// SELECT * FROM users WHERE username = 'admin' --'
// This will return all users with username 'admin' and ignore the rest of the query`,
              language: 'javascript'
            },
            {
              title: 'Secure Query',
              description: 'This is how to properly parameterize the query to prevent SQL injection:',
              code: `// Secure code using parameterized query
const query = "SELECT * FROM users WHERE username = ?";
const params = [userInput];

// Using a prepared statement with parameters
// The database will treat the user input as data, not as SQL code`,
              language: 'javascript'
            },
            {
              title: 'Example Exploit',
              description: 'Here\'s an example of how an attacker might exploit a SQL injection vulnerability:',
              code: `// Original query: SELECT * FROM users WHERE username = 'user' AND password = 'pass'

// Attacker input: username = "admin' --" and password = "anything"
// Modified query: SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'
// The -- comments out the rest of the query, bypassing the password check`,
              language: 'javascript'
            }
          ],
          methodology: {
            steps: [
              'Identify input fields that interact with the database',
              'Test for SQL injection vulnerabilities using various payloads',
              'Analyze error messages for database information',
              'Determine the database type and structure',
              'Extract the flag from the database'
            ]
          },
          solution: {
            approach: 'The solution involves exploiting a SQL injection vulnerability in the search functionality.',
            code: `// Payload to extract the flag
' UNION SELECT flag FROM flags -- 

// Or using error-based injection
' AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT(flag,':',FLOOR(RAND(0)*2))x FROM flags GROUP BY x)a) --`,
            explanation: 'This payload exploits the SQL injection vulnerability to extract the flag from the database. The UNION SELECT statement combines the original query with a new query that selects the flag from the flags table.'
          }
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
          <button
            onClick={() => router.push('/challenges')}
            className="flex items-center text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Challenges
          </button>
          
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

                  {/* Tabs */}
                  <div className="mt-8 border-b border-gray-700">
                    <nav className="flex space-x-8">
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'overview'
                            ? 'border-[#9580FF] text-[#9580FF]'
                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab('solution')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'solution'
                            ? 'border-[#9580FF] text-[#9580FF]'
                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                        }`}
                      >
                        Solution
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="mt-6">
                    {activeTab === 'overview' && (
                      <div className="space-y-8">
                        {/* Overview Content */}
                        <div className="prose prose-invert max-w-none">
                          <ReactMarkdown>{challenge.content}</ReactMarkdown>
                        </div>

                        {/* Methodology Section */}
                        {challenge.methodology && (
                          <div className="mt-8">
                            <h2 className="text-xl font-semibold text-white mb-4">Methodology</h2>
                            <ol className="space-y-3">
                              {challenge.methodology.steps.map((step, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#9580FF] text-white text-sm mr-3 mt-0.5">
                                    {index + 1}
                                  </span>
                                  <span className="text-gray-300">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* Code Examples Section */}
                        {challenge.code_examples && (
                          <div className="mt-8">
                            <h2 className="text-xl font-semibold text-white mb-4">Code Examples</h2>
                            <div className="space-y-6">
                              {challenge.code_examples.map((example, index) => (
                                <div key={index} className="bg-[#1A1A24] rounded-lg p-4 border border-gray-700">
                                  <h3 className="text-lg font-medium text-white mb-2">{example.title}</h3>
                                  <p className="text-gray-400 mb-4">{example.description}</p>
                                  <div className="bg-[#0D1117] rounded p-4 overflow-x-auto">
                                    <pre className="text-gray-300 font-mono text-sm">
                                      <code>{example.code}</code>
                                    </pre>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'solution' && challenge.solution && (
                      <div className="space-y-6">
                        {!showSolution ? (
                          <div className="bg-[#1A1A24] rounded-lg p-6 border border-yellow-500/30">
                            <div className="flex items-start mb-4">
                              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <h2 className="text-xl font-semibold text-white">Solution Warning</h2>
                                <p className="text-gray-400 mt-2">
                                  Viewing the solution will result in receiving only 50% of the challenge points.
                                  This is to encourage learning through problem-solving rather than just copying solutions.
                                </p>
                                <p className="text-gray-400 mt-2">
                                  Are you sure you want to view the solution?
                                </p>
                                <div className="mt-6 flex space-x-4">
                                  <button
                                    onClick={() => setShowSolution(true)}
                                    className="bg-yellow-500/20 text-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-500/30 transition-colors duration-200"
                                  >
                                    Yes, show solution
                                  </button>
                                  <button
                                    onClick={() => setActiveTab('overview')}
                                    className="bg-[#1A1A24] text-gray-400 py-2 px-4 rounded-md hover:bg-[#2A2A34] transition-colors duration-200"
                                  >
                                    No, go back
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4 mb-6">
                              <div className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                <p className="text-yellow-500 text-sm">
                                  You are viewing the solution. You will receive only 50% of the challenge points ({Math.floor(challenge.points / 2)} points) for completing this challenge.
                                </p>
                              </div>
                            </div>
                            
                            <h2 className="text-xl font-semibold text-white mb-4">Solution</h2>
                            <div className="bg-[#1A1A24] rounded-lg p-4 border border-gray-700">
                              <h3 className="text-lg font-medium text-white mb-2">Approach</h3>
                              <p className="text-gray-400">{challenge.solution.approach}</p>
                            </div>
                            <div className="bg-[#1A1A24] rounded-lg p-4 border border-gray-700">
                              <h3 className="text-lg font-medium text-white mb-2">Exploit Code</h3>
                              <div className="bg-[#0D1117] rounded p-4 overflow-x-auto">
                                <pre className="text-gray-300 font-mono text-sm">
                                  <code>{challenge.solution.code}</code>
                                </pre>
                              </div>
                            </div>
                            <div className="bg-[#1A1A24] rounded-lg p-4 border border-gray-700">
                              <h3 className="text-lg font-medium text-white mb-2">Explanation</h3>
                              <p className="text-gray-400">{challenge.solution.explanation}</p>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Hints</h2>
                    <ul className="mt-2 space-y-2">
                      {challenge.hints.map((hint, index) => (
                        <li key={index} className="flex items-start">
                          <Info className="h-5 w-5 text-[#9580FF] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-400">{hint}</span>
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
                      <div className="mt-2 text-red-500 text-sm flex items-center">
                        <XCircle className="h-5 w-5 mr-2" />
                        {submitError}
                      </div>
                    )}

                    {submitSuccess && (
                      <div className="mt-2 text-green-500 text-sm flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
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
                  <div className="flex items-center mb-4">
                    <Server className="h-5 w-5 text-[#9580FF] mr-2" />
                    <h2 className="text-xl font-semibold text-white">Server Access</h2>
                  </div>
                  
                  {challenge.server_credentials ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Host</label>
                        <div className="mt-1 bg-[#1A1A24] border border-gray-700 rounded-md py-2 px-3 text-white font-mono">
                          {challenge.server_credentials.host}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Port</label>
                        <div className="mt-1 bg-[#1A1A24] border border-gray-700 rounded-md py-2 px-3 text-white font-mono">
                          {challenge.server_credentials.port}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Username</label>
                        <div className="mt-1 bg-[#1A1A24] border border-gray-700 rounded-md py-2 px-3 text-white font-mono">
                          {challenge.server_credentials.username}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Password</label>
                        <div className="mt-1 bg-[#1A1A24] border border-gray-700 rounded-md py-2 px-3 text-white font-mono">
                          {challenge.server_credentials.password}
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
                        <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-yellow-500 text-sm">
                            The server is only accessible from within the HackerLabs network. Make sure you're connected to the VPN before attempting to access it.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">No server credentials available for this challenge.</p>
                  )}
                </div>
              </div>
              
              <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 mt-6">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Database className="h-5 w-5 text-[#9580FF] mr-2" />
                    <h2 className="text-xl font-semibold text-white">Challenge Info</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400">Category</label>
                      <div className="mt-1 text-white">{challenge.category}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400">Points</label>
                      <div className="mt-1 text-white">{challenge.points} points</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400">Difficulty</label>
                      <div className="mt-1 text-white capitalize">{challenge.difficulty}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 