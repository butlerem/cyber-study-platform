import React from "react";
import { Link } from "react-router-dom";
import { Terminal, Trophy, Layout, Users } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-[#0A0F1C] border-b border-[#1A1F2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Terminal className="h-8 w-8 text-[#9580FF]" />
              <span className="ml-2 text-xl font-bold">HackerLabs</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/challenges"
              className="flex items-center px-3 py-2 rounded-md hover:bg-[#1A1F2E]"
            >
              <Layout className="h-5 w-5 mr-1" />
              <span>Challenges</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center px-3 py-2 rounded-md hover:bg-[#1A1F2E]"
            >
              <Trophy className="h-5 w-5 mr-1" />
              <span>Leaderboard</span>
            </Link>
            <Link
              to="/community"
              className="flex items-center px-3 py-2 rounded-md hover:bg-[#1A1F2E]"
            >
              <Trophy className="h-5 w-5 mr-1" />
              <span>Community</span>
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 rounded-md hover:bg-[#1A1F2E]"
                >
                  <Users className="h-5 w-5 mr-1" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-[#9580FF] text-white px-4 py-2 rounded-md hover:bg-[#6E54C8] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-[#9580FF] text-white px-4 py-2 rounded-md hover:bg-[#6E54C8] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
