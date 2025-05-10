import Link from "next/link";
import { useAuth } from "../contexts/authUtils";
import { Code } from "lucide-react";

function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Code className="h-6 w-6" />
              <span className="text-2xl font-light tracking-tight">ExpLab</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/challenges"
              className="nav-link"
            >
              <span>Challenges</span>
            </Link>
            <Link
              href="/leaderboard"
              className="nav-link"
            >
              <span>Leaderboard</span>
            </Link>
            <Link
              href="/community"
              className="nav-link"
            >
              <span>Community</span>
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="nav-link"
                >
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-transparent border-2 border-white py-2 px-6 rounded-[100px] hover:bg-white/5 hover:border-white/40 transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-transparent border-2 border-white py-2 px-6 rounded-[100px] hover:bg-white/5 hover:border-white/40 transition-colors duration-200 font-medium"
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
