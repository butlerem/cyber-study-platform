import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Filter, Search, Server, Lock, Bug } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  category: string;
  completed?: boolean;
}

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';
type CategoryFilter = 'all' | 'web' | 'network' | 'crypto';

export default function ChallengesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // TODO: Replace with actual API call
        const mockChallenges: Challenge[] = [
          // Web Security Challenges
          {
            id: 'web-1',
            title: 'SQL Injection Basics',
            description: 'Learn about SQL injection vulnerabilities and how to prevent them.',
            difficulty: 'easy',
            points: 100,
            category: 'web',
            completed: false
          },
          {
            id: 'web-2',
            title: 'XSS Attack Lab',
            description: 'Practice identifying and exploiting Cross-Site Scripting vulnerabilities.',
            difficulty: 'medium',
            points: 150,
            category: 'web',
            completed: false
          },
          {
            id: 'web-3',
            title: 'CSRF Exploitation',
            description: 'Understand Cross-Site Request Forgery attacks and their impact.',
            difficulty: 'easy',
            points: 100,
            category: 'web',
            completed: false
          },
          {
            id: 'web-4',
            title: 'File Upload Vulnerabilities',
            description: 'Learn about insecure file upload mechanisms and how to exploit them.',
            difficulty: 'medium',
            points: 150,
            category: 'web',
            completed: false
          },
          {
            id: 'web-5',
            title: 'Advanced SQL Injection',
            description: 'Master advanced SQL injection techniques and bypass security measures.',
            difficulty: 'hard',
            points: 200,
            category: 'web',
            completed: false
          },
          
          // Network Security Challenges
          {
            id: 'network-1',
            title: 'Port Scanning Basics',
            description: 'Learn the fundamentals of port scanning and service enumeration.',
            difficulty: 'easy',
            points: 100,
            category: 'network',
            completed: false
          },
          {
            id: 'network-2',
            title: 'FTP Exploitation',
            description: 'Identify and exploit common FTP server vulnerabilities.',
            difficulty: 'easy',
            points: 100,
            category: 'network',
            completed: false
          },
          {
            id: 'network-3',
            title: 'SMB Enumeration',
            description: 'Learn to enumerate SMB shares and identify misconfigurations.',
            difficulty: 'medium',
            points: 150,
            category: 'network',
            completed: false
          },
          {
            id: 'network-4',
            title: 'SSH Key Authentication',
            description: 'Understand SSH key-based authentication and common misconfigurations.',
            difficulty: 'medium',
            points: 150,
            category: 'network',
            completed: false
          },
          {
            id: 'network-5',
            title: 'Advanced Network Pivoting',
            description: 'Master the art of network pivoting and lateral movement techniques.',
            difficulty: 'hard',
            points: 200,
            category: 'network',
            completed: false
          },
          
          // Cryptography Challenges
          {
            id: 'crypto-1',
            title: 'Caesar Cipher',
            description: 'Learn about the Caesar cipher and how to break it.',
            difficulty: 'easy',
            points: 100,
            category: 'crypto',
            completed: false
          },
          {
            id: 'crypto-2',
            title: 'Vigenère Cipher',
            description: 'Understand the Vigenère cipher and methods to crack it.',
            difficulty: 'easy',
            points: 100,
            category: 'crypto',
            completed: false
          },
          {
            id: 'crypto-3',
            title: 'RSA Basics',
            description: 'Learn the fundamentals of RSA encryption and common attacks.',
            difficulty: 'medium',
            points: 150,
            category: 'crypto',
            completed: false
          },
          {
            id: 'crypto-4',
            title: 'Hash Cracking',
            description: 'Practice cracking common hash algorithms and rainbow tables.',
            difficulty: 'medium',
            points: 150,
            category: 'crypto',
            completed: false
          },
          {
            id: 'crypto-5',
            title: 'Advanced Cryptanalysis',
            description: 'Master advanced cryptanalysis techniques and side-channel attacks.',
            difficulty: 'hard',
            points: 200,
            category: 'crypto',
            completed: false
          }
        ];
        
        setChallenges(mockChallenges);
      } catch (err) {
        setError('Failed to load challenges');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleStartChallenge = (id: string) => {
    router.push(`/challenge/${id}`);
  };

  const filteredChallenges = challenges.filter(challenge => {
    // Apply difficulty filter
    if (difficultyFilter !== 'all' && challenge.difficulty !== difficultyFilter) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter !== 'all' && challenge.category !== categoryFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery && !challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !challenge.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <Bug className="h-5 w-5 text-[#9580FF]" />;
      case 'network':
        return <Server className="h-5 w-5 text-[#9580FF]" />;
      case 'crypto':
        return <Lock className="h-5 w-5 text-[#9580FF]" />;
      default:
        return null;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'web':
        return 'Web Security';
      case 'network':
        return 'Network Security';
      case 'crypto':
        return 'Cryptography';
      default:
        return category;
    }
  };

  // Group challenges by category
  const groupedChallenges = filteredChallenges.reduce((acc, challenge) => {
    if (!acc[challenge.category]) {
      acc[challenge.category] = [];
    }
    acc[challenge.category].push(challenge);
    return acc;
  }, {} as Record<string, Challenge[]>);

  // Get categories in a specific order
  const categories = ['web', 'network', 'crypto'];

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white">Challenges</h1>
            <p className="mt-4 text-xl text-gray-400">
              Test your skills with our hands-on security challenges
            </p>
          </div>

          {/* Filters */}
          <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-[#9580FF]" />
                <span className="text-white font-medium">Filters:</span>
                
                {/* Difficulty Filter */}
                <div className="flex items-center space-x-2">
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                    className="bg-[#1A1A24] border border-gray-700 rounded-md py-1 px-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9580FF]"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                
                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                    className="bg-[#1A1A24] border border-gray-700 rounded-md py-1 px-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9580FF]"
                  >
                    <option value="all">All Categories</option>
                    <option value="web">Web Security</option>
                    <option value="network">Network Security</option>
                    <option value="crypto">Cryptography</option>
                  </select>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#1A1A24] border border-gray-700 rounded-md py-1 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9580FF] w-full md:w-64"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-gray-400">Loading challenges...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : filteredChallenges.length === 0 ? (
            <div className="text-center text-gray-400">No challenges match your filters.</div>
          ) : (
            <div className="space-y-12">
              {categoryFilter === 'all' ? (
                // Show all categories with headers
                categories.map(category => (
                  groupedChallenges[category] && groupedChallenges[category].length > 0 ? (
                    <div key={category} className="space-y-6">
                      <div className="flex items-center space-x-2 border-b border-gray-700 pb-2">
                        {getCategoryIcon(category)}
                        <h2 className="text-2xl font-bold text-white">{getCategoryName(category)}</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedChallenges[category].map((challenge) => (
                          <div
                            key={challenge.id}
                            className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-[#9580FF] transition-colors duration-200"
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  {getCategoryIcon(challenge.category)}
                                  <span className="ml-2 text-sm text-gray-400">
                                    {getCategoryName(challenge.category)}
                                  </span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm border ${
                                  challenge.difficulty === 'easy' ? 'bg-green-500/10 text-green-500 border-green-500' :
                                  challenge.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500' :
                                  'bg-red-500/10 text-red-500 border-red-500'
                                }`}>
                                  {challenge.difficulty}
                                </span>
                              </div>
                              
                              <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                              <p className="text-gray-400 mb-4">{challenge.description}</p>
                              
                              <div className="flex items-center justify-between">
                                <div className="text-[#9580FF] font-bold">{challenge.points} pts</div>
                                <button
                                  onClick={() => handleStartChallenge(challenge.id)}
                                  className="bg-[#9580FF] text-white py-2 px-4 rounded-md hover:bg-[#6E54C8] transition-colors duration-200"
                                >
                                  Start Challenge
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null
                ))
              ) : (
                // Show only the selected category
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-[#9580FF] transition-colors duration-200"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            {getCategoryIcon(challenge.category)}
                            <span className="ml-2 text-sm text-gray-400">
                              {getCategoryName(challenge.category)}
                            </span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm border ${
                            challenge.difficulty === 'easy' ? 'bg-green-500/10 text-green-500 border-green-500' :
                            challenge.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500' :
                            'bg-red-500/10 text-red-500 border-red-500'
                          }`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                        <p className="text-gray-400 mb-4">{challenge.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-[#9580FF] font-bold">{challenge.points} pts</div>
                          <button
                            onClick={() => handleStartChallenge(challenge.id)}
                            className="bg-[#9580FF] text-white py-2 px-4 rounded-md hover:bg-[#6E54C8] transition-colors duration-200"
                          >
                            Start Challenge
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 