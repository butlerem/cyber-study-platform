import { Link } from "react-router-dom";
import { Flag, Trophy, Brain, HelpCircle, TerminalSquare } from "lucide-react";
import SpaceBackground from "../components/SpaceBackground";
import AnimatedCounter from "./Community";

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080810] text-white">
      <SpaceBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-8 glow">
              Hacker<span className="text-[#9580FF]">Labs</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Master your cybersecurity skills through hands-on challenges. From
              web exploitation to cryptography, prove your expertise in our
              gamified hacking environment. View challenges anytime, sign in to
              track your progress and earn points.
            </p>
            <div className="flex justify-center space-x-6">
              <Link
                to="/register"
                className="bg-[#9580FF] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#6E54C8] transform hover:scale-105 transition-all"
              >
                Get Started
              </Link>
              <Link
                to="/challenges"
                className="border border-[#9580FF] text-[#9580FF] px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#12121A] transform hover:scale-105 transition-all"
              >
                Browse Challenges
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Flag className="h-12 w-12 text-[#9580FF]" />,
                title: "Capture The Flag",
                desc: "Test your skills with our diverse range of CTF challenges designed to simulate real-world scenarios.",
              },
              {
                icon: <Trophy className="h-12 w-12 text-[#9580FF]" />,
                title: "Global Rankings",
                desc: "Compete with hackers worldwide and climb the leaderboard as you solve increasingly difficult challenges.",
              },
              {
                icon: <Brain className="h-12 w-12 text-[#9580FF]" />,
                title: "Learn & Grow",
                desc: "Each challenge comes with detailed writeups and resources to help you understand the concepts better.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="gradient-border">
                <div className="bg-[#080810] p-8 rounded-lg transform hover:scale-105 transition-all">
                  <div className="flex justify-center mb-6">{icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-center">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-[#0C0C1C] py-20">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-10">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-gray-300">
              <div>
                <TerminalSquare className="mx-auto mb-4 h-10 w-10 text-[#9580FF]" />
                <h4 className="text-lg font-semibold mb-2">
                  Choose Your Challenge
                </h4>
                <p>
                  Select from beginner to advanced levels across multiple
                  categories like reverse engineering, web, and forensics.
                </p>
              </div>
              <div>
                <HelpCircle className="mx-auto mb-4 h-10 w-10 text-[#9580FF]" />
                <h4 className="text-lg font-semibold mb-2">Solve & Learn</h4>
                <p>
                  Use built-in hints, explore tool recommendations, and unlock
                  writeups after completion to deepen your knowledge.
                </p>
              </div>
              <div>
                <Trophy className="mx-auto mb-4 h-10 w-10 text-[#9580FF]" />
                <h4 className="text-lg font-semibold mb-2">Track Progress</h4>
                <p>
                  Earn points, unlock badges, and see how you stack up against
                  others in the community leaderboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Community and Support */}
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <h2 className="text-4xl font-bold mb-8">Join the Community</h2>
          <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
            You're not alone. Engage with others, ask questions, share
            knowledge, and contribute to writeups and challenge development.
          </p>

          <AnimatedCounter
            end={243}
            className="text-5xl text-[#9580FF] font-bold mb-6 glow"
          />

          <p className="text-gray-400 mb-10">
            members already learning and hacking together
          </p>

          <div className="flex justify-center space-x-6">
            <Link
              to="/community"
              className="bg-[#12121A] border border-[#9580FF] text-[#9580FF] px-6 py-3 rounded-md font-semibold hover:bg-[#1A1A28] transition"
            >
              Visit Community Hub
            </Link>
          </div>
        </div>

        {/* Testimonials (optional placeholder) */}
        <div className="bg-[#0A0A18] py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
            <p className="text-gray-400 italic">
              “One of the best learning platforms I’ve used. The challenges are
              practical, the community is amazing, and I’ve learned more here in
              a month than a semester at school.”
            </p>
            <p className="mt-4 text-gray-500">– A budding ethical hacker</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
