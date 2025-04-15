import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Filter, Search, Server, Lock, Bug, Terminal, Code, Database } from 'lucide-react';
import DifficultyIcon from '../components/DifficultyIcon';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  category: string;
  completed?: boolean;
  content?: {
    overview: string;
    prerequisites: string[];
    setup: string;
    serverInfo?: {
      ip: string;
      ports: string[];
      credentials?: {
        username: string;
        password: string;
      };
    };
    examples: {
      title: string;
      description: string;
      code: string;
      explanation: string;
    }[];
    hints: string[];
  };
}

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';
type CategoryFilter = 'all' | 'web' | 'network' | 'crypto' | 'getting-started';

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
          // Getting Started Challenges
          {
            id: 'getting-started-1',
            title: 'Setting Up Your Pentesting Environment',
            description: 'Learn how to set up a proper ethical hacking environment with Kali Linux and essential tools.',
            difficulty: 'easy',
            points: 50,
            category: 'getting-started',
            completed: false,
            content: {
              overview: `Setting up a proper pentesting environment is the first step in your ethical hacking journey. This challenge will guide you through the process of setting up Kali Linux, configuring your tools, and understanding the basics of ethical hacking.`,
              prerequisites: [
                'Basic computer knowledge',
                'Understanding of operating systems',
                'Familiarity with command line interfaces'
              ],
              setup: `1. Download and install Kali Linux (or use a pre-configured VM)
2. Configure your network settings
3. Update your system and tools
4. Install additional recommended tools
5. Set up a practice environment`,
              serverInfo: {
                ip: '10.10.10.100',
                ports: ['22'],
                credentials: {
                  username: 'kali',
                  password: 'kali'
                }
              },
              examples: [
                {
                  title: 'Basic Kali Linux Commands',
                  description: 'Essential commands to get started with Kali Linux:',
                  code: `# Update system
sudo apt update && sudo apt upgrade -y

# Install additional tools
sudo apt install -y nmap metasploit-framework burpsuite

# Check network configuration
ifconfig
ip addr show

# Basic reconnaissance
nmap -sV 10.10.10.1`,
                  explanation: 'These commands help you update your system, install essential tools, check your network configuration, and perform basic reconnaissance.'
                }
              ],
              hints: [
                'Make sure your network adapter is properly configured in bridge mode',
                'Update your system before installing additional tools',
                'Check that your tools are working correctly by running them with --help',
                'Document your setup process for future reference'
              ]
            }
          },
          {
            id: 'getting-started-2',
            title: 'Basic Reconnaissance Techniques',
            description: 'Master the fundamentals of information gathering and reconnaissance in ethical hacking.',
            difficulty: 'easy',
            points: 50,
            category: 'getting-started',
            completed: false,
            content: {
              overview: `Reconnaissance is the first phase of any penetration test. This challenge will teach you the basics of passive and active reconnaissance techniques, including DNS enumeration, port scanning, and service identification.`,
              prerequisites: [
                'Completed "Setting Up Your Pentesting Environment" challenge',
                'Basic understanding of networking concepts',
                'Familiarity with command line tools'
              ],
              setup: `1. Ensure your Kali Linux environment is properly configured
2. Install additional reconnaissance tools if needed
3. Set up a target system for practice
4. Configure your network to allow scanning`,
              serverInfo: {
                ip: '10.10.10.101',
                ports: ['22'],
                credentials: {
                  username: 'kali',
                  password: 'kali'
                }
              },
              examples: [
                {
                  title: 'Basic Reconnaissance Commands',
                  description: 'Essential commands for information gathering:',
                  code: `# DNS enumeration
dig example.com
whois example.com

# Port scanning with nmap
nmap -sS -sV -p- 10.10.10.1

# Service enumeration
enum4linux -a 10.10.10.1

# Web reconnaissance
dirb http://10.10.10.1`,
                  explanation: 'These commands help you gather information about your target, including DNS records, open ports, running services, and web directories.'
                }
              ],
              hints: [
                'Start with passive reconnaissance before moving to active techniques',
                'Use multiple tools to cross-reference your findings',
                'Document everything you discover',
                'Be mindful of scanning policies and legal considerations'
              ]
            }
          },
          {
            id: 'getting-started-3',
            title: 'Introduction to Exploitation',
            description: 'Learn the basics of vulnerability assessment and exploitation in a controlled environment.',
            difficulty: 'easy',
            points: 50,
            category: 'getting-started',
            completed: false,
            content: {
              overview: `Exploitation is the process of taking advantage of vulnerabilities to gain unauthorized access to systems. This challenge introduces you to the basics of vulnerability assessment and exploitation in a safe, controlled environment.`,
              prerequisites: [
                'Completed "Basic Reconnaissance Techniques" challenge',
                'Understanding of common vulnerabilities',
                'Familiarity with Metasploit Framework'
              ],
              setup: `1. Ensure your Kali Linux environment is properly configured
2. Install Metasploit Framework if not already installed
3. Set up a vulnerable target system for practice
4. Configure your network to allow exploitation`,
              serverInfo: {
                ip: '10.10.10.102',
                ports: ['22'],
                credentials: {
                  username: 'kali',
                  password: 'kali'
                }
              },
              examples: [
                {
                  title: 'Basic Exploitation with Metasploit',
                  description: 'Essential commands for using Metasploit Framework:',
                  code: `# Start Metasploit
msfconsole

# Search for exploits
search exploit windows smb

# Select an exploit
use exploit/windows/smb/ms17_010_eternalblue

# Set target
set RHOST 10.10.10.1

# Run the exploit
exploit

# Post-exploitation
shell
whoami
ipconfig`,
                  explanation: 'These commands demonstrate the basic workflow of using Metasploit Framework to exploit a vulnerability and gain access to a target system.'
                }
              ],
              hints: [
                'Always start with information gathering before attempting exploitation',
                'Use the search function in Metasploit to find relevant exploits',
                'Set all required options before running an exploit',
                'Document your exploitation process for learning purposes'
              ]
            }
          },
          
          // Web Security Challenges
          {
            id: 'web-1',
            title: 'SQL Injection Basics',
            description: 'Learn about SQL injection vulnerabilities and how to prevent them.',
            difficulty: 'easy',
            points: 100,
            category: 'web',
            completed: false,
            content: {
              overview: `SQL Injection (SQLi) is a web security vulnerability that allows attackers to interfere with the queries that an application makes to its database. This can allow attackers to view data that they are not normally able to retrieve, modify data, and potentially take control of the server.`,
              prerequisites: [
                'Basic understanding of SQL',
                'Knowledge of web applications',
                'Familiarity with HTTP requests'
              ],
              setup: `1. Download and install the vulnerable web application
2. Configure your local environment
3. Start the application server
4. Access the application through your browser`,
              serverInfo: {
                ip: '10.10.10.123',
                ports: ['80', '3306'],
                credentials: {
                  username: 'admin',
                  password: 'super_secure_password_123!'
                }
              },
              examples: [
                {
                  title: 'Basic SQL Injection',
                  description: 'A simple login form vulnerable to SQL injection',
                  code: `// Vulnerable code
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($conn, $query);

// Malicious input
username: admin' --
password: anything

// Resulting query
SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'`,
                  explanation: 'The comment operator (--) causes the rest of the query to be ignored, bypassing the password check.'
                },
                {
                  title: 'Union-Based SQL Injection',
                  description: 'Using UNION to extract data from other tables',
                  code: `// Vulnerable code
$query = "SELECT id, name, email FROM users WHERE id = $id";
$result = mysqli_query($conn, $query);

// Malicious input
id: 1 UNION SELECT 1, username, password FROM admin_users

// Resulting query
SELECT id, name, email FROM users WHERE id = 1 UNION SELECT 1, username, password FROM admin_users`,
                  explanation: 'The UNION operator allows us to combine results from multiple SELECT statements, potentially exposing sensitive data.'
                }
              ],
              hints: [
                'Try using the comment operator (--) to bypass authentication',
                'Look for error messages that might reveal the database structure',
                'Consider using UNION-based attacks to extract data',
                'Remember to URL encode special characters'
              ]
            }
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
    if (difficultyFilter !== 'all' && challenge.difficulty !== difficultyFilter) {
      return false;
    }
    
    if (categoryFilter !== 'all' && challenge.category !== categoryFilter) {
      return false;
    }
    
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
      case 'getting-started':
        return <Terminal className="h-5 w-5 text-[#9580FF]" />;
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
      case 'getting-started':
        return 'Getting Started';
      default:
        return category;
    }
  };

  const groupedChallenges = filteredChallenges.reduce((acc, challenge) => {
    if (!acc[challenge.category]) {
      acc[challenge.category] = [];
    }
    acc[challenge.category].push(challenge);
    return acc;
  }, {} as Record<string, Challenge[]>);

  const categories = ['getting-started', 'web', 'network', 'crypto'];

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Security Challenges</h1>
            <p className="text-xl text-gray-400">
              Test your skills with our hands-on security challenges
            </p>
          </div>

          {/* Filters */}
          <div className="bg-[#12121A] rounded-lg p-4 mb-8 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search challenges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#1A1A24] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9580FF]"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                  className="bg-[#1A1A24] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9580FF]"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                  className="bg-[#1A1A24] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9580FF]"
                >
                  <option value="all">All Categories</option>
                  <option value="web">Web Security</option>
                  <option value="network">Network Security</option>
                  <option value="crypto">Cryptography</option>
                  <option value="getting-started">Getting Started</option>
                </select>
              </div>
            </div>
          </div>

          {/* Challenges Grid */}
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-[#12121A] rounded w-48 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-48 bg-[#12121A] rounded-lg"></div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="space-y-12">
              {categories.map(category => (
                groupedChallenges[category] && (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-6">
                      {getCategoryIcon(category)}
                      <h2 className="text-2xl font-bold text-white">{getCategoryName(category)}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groupedChallenges[category].map(challenge => (
                        <div
                          key={challenge.id}
                          className="bg-[#12121A] rounded-lg p-6 border border-gray-700 hover:border-[#9580FF] transition-colors duration-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                            <DifficultyIcon difficulty={challenge.difficulty} />
                          </div>
                          <p className="text-gray-400 mb-4">{challenge.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Terminal className="h-5 w-5 text-[#9580FF]" />
                              <span className="text-[#9580FF]">{challenge.points} points</span>
                            </div>
                            <button
                              onClick={() => handleStartChallenge(challenge.id)}
                              className="bg-[#9580FF] text-white px-4 py-2 rounded-md hover:bg-[#6E54C8] transition-colors duration-200"
                            >
                              Start Challenge
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 