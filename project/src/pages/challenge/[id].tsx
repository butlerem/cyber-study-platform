// pages/challenge/[id].tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, Server, Database, AlertTriangle, Info, Flag } from "lucide-react";
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
        const response = await fetch(`/api/challenges/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch challenge');
        }
        const data = await response.json();
        setChallenge(data);
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
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #000000, #111111)' }}>
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
                  className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300"
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
                        className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                          activeTab === "overview"
                            ? "bg-white/10 text-white border border-white/20"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab("solution")}
                        className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                          activeTab === "solution"
                            ? "bg-white/10 text-white border border-white/20"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Solution
                      </button>
                    </div>

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
                          {challenge.methodology && challenge.methodology.steps && challenge.methodology.steps.length > 0 && (
                            <div>
                              <h2 className="text-2xl font-bold text-white mb-6">
                                Methodology
                              </h2>
                              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
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
                          {challenge.code_examples && challenge.code_examples.length > 0 && (
                            <div>
                              <h2 className="text-2xl font-bold text-white mb-6">
                                Code Examples
                              </h2>
                              <div className="space-y-6">
                                {challenge.code_examples.map(
                                  (example, index) => (
                                    <motion.div
                                      key={index}
                                      className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                    >
                                      <div className="p-4 border-b border-white/10">
                                        <h3 className="text-lg font-medium text-white">
                                          {example.title}
                                        </h3>
                                        <p className="text-gray-400 mt-1">
                                          {example.description}
                                        </p>
                                      </div>
                                      <div className="p-4 bg-black/40">
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
                          {challenge.hints && challenge.hints.length > 0 && (
                            <div>
                              <h2 className="text-2xl font-bold text-white mb-6">
                                Hints
                              </h2>
                              <div className="space-y-4">
                                {challenge.hints.map((hint, index) => (
                                  <motion.div
                                    key={index}
                                    className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <div className="flex items-start">
                                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#9580FF] text-white text-lg font-medium mr-4 mt-0.5 flex-shrink-0">
                                        {index + 1}
                                      </span>
                                      <p className="text-gray-300">{hint}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
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
                                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
                                    <pre className="text-gray-300 font-mono text-sm">
                                      <code>{challenge.solution.code}</code>
                                    </pre>
                                  </div>
                                </div>

                                <div className="mt-8">
                                  <h3 className="text-xl font-bold text-white mb-4">
                                    Explanation
                                  </h3>
                                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
                                    <p className="text-gray-300">
                                      {challenge.solution.explanation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-12">
                              <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <h3 className="text-xl font-bold text-white mb-2">
                                View Solution
                              </h3>
                              <p className="text-gray-400 mb-6">
                                Are you sure you want to view the solution? You'll
                                receive 50% of the points if you complete the
                                challenge after viewing the solution.
                              </p>
                              <button
                                onClick={() => setShowSolution(true)}
                                className="bg-[#9580FF]/20 hover:bg-[#9580FF]/30 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                              >
                                Show Solution
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Challenge Info Card */}
                <motion.div
                  className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300"
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

                {/* Server Access Card */}
                {challenge.server_credentials && (
                  <motion.div
                    className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <Server className="h-6 w-6 text-[#9580FF] mr-3" />
                        <h2 className="text-2xl font-bold text-white">
                          Server Access
                        </h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Host
                          </label>
                          <div className="text-white font-mono">
                            {challenge.server_credentials.host}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Port
                          </label>
                          <div className="text-white font-mono">
                            {challenge.server_credentials.port}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Username
                          </label>
                          <div className="text-white font-mono">
                            {challenge.server_credentials.username}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Password
                          </label>
                          <div className="text-white font-mono">
                            {challenge.server_credentials.password}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Flag Submission Card */}
                <motion.div
                  className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <Flag className="h-6 w-6 text-[#9580FF] mr-3" />
                      <h2 className="text-2xl font-bold text-white">
                        Submit Flag
                      </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          value={flag}
                          onChange={(e) => setFlag(e.target.value)}
                          placeholder="Enter flag"
                          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#9580FF] transition-colors duration-300"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-secondary w-full"
                      >
                        {submitting ? "Submitting..." : "Submit Flag"}
                      </button>
                      {submitError && (
                        <p className="text-red-500 text-sm">{submitError}</p>
                      )}
                      {submitSuccess && (
                        <p className="text-green-500 text-sm">
                          Flag submitted successfully!
                        </p>
                      )}
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
