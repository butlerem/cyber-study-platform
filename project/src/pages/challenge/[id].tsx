// pages/challenge/[id].tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, Server, Database, AlertTriangle, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import Image from "next/image";

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

export default function ChallengePage() {
  const router = useRouter();
  const { id } = router.query;
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [flag, setFlag] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchChallenge = async () => {
      try {
        // TODO: Replace with actual API call
        const mockChallenge: Challenge = {
          id: id as string,
          title: "SQL Injection Basics",
          description:
            "Learn about SQL injection vulnerabilities and how to prevent them. Your task is to find the flag hidden in the database.",
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
          difficulty: "easy",
          points: 100,
          flag: "flag{sql_injection_master}",
          server_credentials: {
            host: "10.10.10.123",
            port: 80,
            username: "********",
            password: "********",
          },
          category: "Web Security",
          hints: [
            "Try using single quotes in the search field",
            "Look for error messages that might reveal the database structure",
            "The flag might be stored in a users table",
          ],
          code_examples: [
            {
              title: "Vulnerable Query",
              description:
                "This is an example of a vulnerable SQL query that is susceptible to SQL injection:",
              code: `// Vulnerable code
const query = "SELECT * FROM users WHERE username = '" + userInput + "'";

// If userInput is "admin' --", the query becomes:
// SELECT * FROM users WHERE username = 'admin' --'
// This will return all users with username 'admin' and ignore the rest of the query`,
              language: "javascript",
            },
            {
              title: "Secure Query",
              description:
                "This is how to properly parameterize the query to prevent SQL injection:",
              code: `// Secure code using parameterized query
const query = "SELECT * FROM users WHERE username = ?";
const params = [userInput];

// Using a prepared statement with parameters
// The database will treat the user input as data, not as SQL code`,
              language: "javascript",
            },
            {
              title: "Example Exploit",
              description:
                "Here's an example of how an attacker might exploit a SQL injection vulnerability:",
              code: `// Original query: SELECT * FROM users WHERE username = 'user' AND password = 'pass'

// Attacker input: username = "admin' --" and password = "anything"
// Modified query: SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'
// The -- comments out the rest of the query, bypassing the password check`,
              language: "javascript",
            },
          ],
          methodology: {
            steps: [
              "Identify input fields that interact with the database",
              "Test for SQL injection vulnerabilities using various payloads",
              "Analyze error messages for database information",
              "Determine the database type and structure",
              "Extract the flag from the database",
            ],
          },
          solution: {
            approach:
              "The solution involves exploiting a SQL injection vulnerability in the search functionality.",
            code: `// Payload to extract the flag
' UNION SELECT flag FROM flags -- 

// Or using error-based injection
' AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT(flag,':',FLOOR(RAND(0)*2))x FROM flags GROUP BY x)a) --`,
            explanation:
              "This payload exploits the SQL injection vulnerability to extract the flag from the database. The UNION SELECT statement combines the original query with a new query that selects the flag from the flags table.",
          },
        };
        setChallenge(mockChallenge);
      } catch (err: unknown) {
        setError("Failed to load challenge");
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
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      // TODO: Replace with actual API call
      if (flag === challenge.flag) {
        setSubmitSuccess(true);
        // TODO: Update user progress
        setTimeout(() => {
          router.push("/challenges");
        }, 2000);
      } else {
        setSubmitError("Incorrect flag. Try again!");
      }
    } catch (err) {
      setSubmitError("Failed to submit flag");
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
          <div className="text-red-500">{error || "Challenge not found"}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C]">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.button
              onClick={() => router.push("/challenges")}
              className="flex items-center text-gray-400 hover:text-white mb-12 group"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
              Back to Challenges
            </motion.button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  className="bg-[#12121A]/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="p-8">
                    {/* Title and Difficulty */}
                    <div className="flex items-center justify-between mb-6">
                      <motion.h1
                        className="text-4xl font-bold text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {challenge.title}
                      </motion.h1>
                      <motion.span
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${
                          challenge.difficulty === "easy"
                            ? "bg-green-500/10 text-green-500 border-green-500"
                            : challenge.difficulty === "medium"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500"
                            : "bg-red-500/10 text-red-500 border-red-500"
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {challenge.difficulty}
                      </motion.span>
                    </div>

                    {/* Challenge Image */}
                    <div className="mb-6">
                      <div className="relative w-full h-[400px]">
                        <Image
                          src="/images/cyberimage1.png"
                          alt="SQL Injection visualization"
                          className="rounded-lg"
                          fill
                          style={{ objectFit: "contain" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-gray-400 text-lg mb-8">
                        {challenge.description}
                      </p>
                    </motion.div>

                    {/* Tab Navigation */}
                    <div className="flex space-x-4 mb-8">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                          activeTab === "overview"
                            ? "bg-[#9580FF] text-white"
                            : "text-gray-400 hover:text-white hover:bg-[#9580FF]/10"
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab("solution")}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                          activeTab === "solution"
                            ? "bg-[#9580FF] text-white"
                            : "text-gray-400 hover:text-white hover:bg-[#9580FF]/10"
                        }`}
                      >
                        Solution
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-8">
                      {activeTab === "overview" ? (
                        <motion.div
                          className="space-y-12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Overview Content */}
                          <div className="prose prose-invert max-w-none">
                            <ReactMarkdown>{challenge.content}</ReactMarkdown>
                          </div>

                          {/* Methodology Section */}
                          {challenge.methodology && (
                            <div>
                              <h2 className="text-2xl font-bold text-white mb-6">
                                Methodology
                              </h2>
                              <div className="bg-[#1A1A24]/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                                <ol className="space-y-4">
                                  {challenge.methodology.steps.map(
                                    (step, index) => (
                                      <motion.li
                                        key={index}
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                      >
                                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#9580FF] text-white text-lg font-medium mr-4 mt-0.5 flex-shrink-0">
                                          {index + 1}
                                        </span>
                                        <span className="text-gray-300 text-lg">
                                          {step}
                                        </span>
                                      </motion.li>
                                    )
                                  )}
                                </ol>
                              </div>
                            </div>
                          )}

                          {/* Code Examples Section */}
                          {challenge.code_examples && (
                            <div>
                              <h2 className="text-2xl font-bold text-white mb-6">
                                Code Examples
                              </h2>
                              <div className="space-y-6">
                                {challenge.code_examples.map(
                                  (example, index) => (
                                    <motion.div
                                      key={index}
                                      className="bg-[#1A1A24]/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                    >
                                      <div className="p-4 border-b border-gray-700">
                                        <h3 className="text-lg font-medium text-white">
                                          {example.title}
                                        </h3>
                                        <p className="text-gray-400 mt-1">
                                          {example.description}
                                        </p>
                                      </div>
                                      <div className="p-4 bg-[#0D1117]">
                                        <pre className="text-gray-300 font-mono text-sm">
                                          <code>{example.code}</code>
                                        </pre>
                                      </div>
                                    </motion.div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {/* Hints Section */}
                          <div>
                            <h2 className="text-2xl font-bold text-white mb-6">
                              Hints
                            </h2>
                            <div className="bg-[#1A1A24]/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                              <ul className="space-y-4">
                                {challenge.hints.map((hint, index) => (
                                  <motion.li
                                    key={index}
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                  >
                                    <Info className="h-5 w-5 text-[#9580FF] mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-gray-300">
                                      {hint}
                                    </span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="space-y-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Solution Content */}
                          {showSolution && challenge.solution ? (
                            <>
                              <div className="bg-yellow-500/10 border border-yellow-500 rounded-lg p-4 mb-8">
                                <div className="flex items-center">
                                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                                  <p className="text-yellow-500">
                                    You will receive {challenge.points / 2}{" "}
                                    points (50%) for completing this challenge
                                    after viewing the solution.
                                  </p>
                                </div>
                              </div>
                              <div className="prose prose-invert max-w-none">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                  Solution Approach
                                </h2>
                                <p className="text-gray-300">
                                  {challenge.solution.approach}
                                </p>

                                <div className="mt-8">
                                  <h3 className="text-xl font-bold text-white mb-4">
                                    Solution Code
                                  </h3>
                                  <div className="bg-[#1A1A24]/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                                    <pre className="text-gray-300 font-mono text-sm">
                                      <code>{challenge.solution.code}</code>
                                    </pre>
                                  </div>
                                </div>

                                <div className="mt-8">
                                  <h3 className="text-xl font-bold text-white mb-4">
                                    Explanation
                                  </h3>
                                  <div className="bg-[#1A1A24]/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                                    <p className="text-gray-300">
                                      {challenge.solution.explanation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="bg-[#1A1A24]/80 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
                              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                              <h3 className="text-xl font-bold text-white mb-4">
                                View Solution?
                              </h3>
                              <p className="text-gray-400 mb-6">
                                You will only receive 50% of the points (
                                {challenge.points / 2} points) if you view the
                                solution before solving the challenge.
                              </p>
                              <div className="flex justify-center gap-4">
                                <button
                                  onClick={() => setShowSolution(true)}
                                  className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-200"
                                >
                                  Yes, show solution
                                </button>
                                <button
                                  onClick={() => setActiveTab("overview")}
                                  className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
                                >
                                  No, go back
                                </button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Flag Submission */}
                <motion.div
                  className="bg-[#12121A]/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Submit Flag
                    </h2>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={flag}
                        onChange={(e) => setFlag(e.target.value)}
                        placeholder="Enter the flag"
                        className="flex-1 bg-[#1A1A24] border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9580FF] focus:border-transparent"
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="bg-[#9580FF] text-white px-8 py-2 rounded-md hover:bg-[#6E54C8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                    {submitError && (
                      <p className="mt-4 text-red-500">{submitError}</p>
                    )}
                    {submitSuccess && (
                      <p className="mt-4 text-green-500">
                        Congratulations! Flag is correct!
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Challenge Info Card */}
                <motion.div
                  className="bg-[#12121A]/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <Database className="h-6 w-6 text-[#9580FF] mr-3" />
                      <h2 className="text-2xl font-bold text-white">
                        Challenge Info
                      </h2>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Category
                        </label>
                        <div className="text-lg text-white font-medium">
                          {challenge.category}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Points
                        </label>
                        <div className="text-lg text-[#9580FF] font-bold">
                          {challenge.points} points
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Difficulty
                        </label>
                        <div className="text-lg text-white font-medium capitalize">
                          {challenge.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Server Credentials Card */}
                {challenge.server_credentials && (
                  <motion.div
                    className="bg-[#12121A]/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-700"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <Server className="h-6 w-6 text-[#9580FF] mr-3" />
                        <h2 className="text-2xl font-bold text-white">
                          Server Access
                        </h2>
                      </div>
                      <div className="bg-[#1A1A24] rounded-lg p-4 font-mono text-sm">
                        <div className="mb-4">
                          <span className="text-gray-400">Host: </span>
                          <span className="text-white">
                            {challenge.server_credentials.host}
                          </span>
                        </div>
                        <div className="mb-4">
                          <span className="text-gray-400">Port: </span>
                          <span className="text-white">
                            {challenge.server_credentials.port}
                          </span>
                        </div>
                        <div className="mb-4">
                          <span className="text-gray-400">Username: </span>
                          <span className="text-white">
                            {challenge.server_credentials.username}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Password: </span>
                          <span className="text-white">
                            {challenge.server_credentials.password}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-yellow-500">
                        <AlertTriangle className="h-4 w-4 inline mr-2" />
                        VPN connection required for access
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
