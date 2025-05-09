import React, { useState, useEffect } from "react";
import { ArrowLeft, Server, Flag, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../contexts/authUtils";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

interface Challenge {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  points: number;
  flag: string;
  server_credentials: {
    host: string;
    username: string;
    password: string;
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

function ChallengePage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [flag, setFlag] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/challenges/${id}`);
        const challengeData = await response.json();
        setChallenge(challengeData);

        if (user?.email) {
          const progressRes = await fetch(
            `/api/user/progress?user_id=${encodeURIComponent(
              user.email
            )}&challenge_id=${id}`
          );

          const progress = await progressRes.json();

          if (progress) {
            setUserProgress(progress);
            setSuccess(progress.completed);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load challenge. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleSubmitFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !challenge?.id) return;

    try {
      setError("");
      const isCorrect = flag.toLowerCase() === challenge.flag.toLowerCase();

      const payload = {
        user_id: user.id,
        challenge_id: challenge.id,
        completed: isCorrect,
        completed_at: isCorrect ? new Date().toISOString() : null,
        attempts: (userProgress?.attempts || 0) + 1,
      };

      if (userProgress) {
        await fetch(`/api/user/progress?id=${userProgress.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`/api/user/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setUserProgress((prev) => ({
        ...(prev || {
          id: "",
          user_id: user.id,
          challenge_id: challenge.id,
          completed_at: null,
          created_at: new Date().toISOString(),
          completed: false,
          attempts: 0,
        }),
        ...payload,
      }));

      if (isCorrect) setSuccess(true);
      else setError("Incorrect flag. Try again!");
    } catch (err) {
      console.error("Flag submission failed:", err);
      setError("An error occurred. Please try again.");
    }
  };

  if (loading) return <div className="text-white p-8">Loading...</div>;

  if (!challenge) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Challenge not found</p>
        <button onClick={() => router.push("/challenges")} className="btn-secondary mt-4">
          Back to Challenges
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => router.push("/challenges")}
        className="nav-link flex items-center mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Challenges
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="mb-6">{challenge.title}</h1>
          <div className="prose prose-invert prose-light max-w-none">
            <ReactMarkdown>{challenge.content}</ReactMarkdown>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card">
            <h3 className="text-xl mb-4">Server Access</h3>
            <pre className="bg-[#1A1F2E] p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(challenge.server_credentials, null, 2)}
            </pre>
          </div>

          <div className="card">
            <h3 className="text-xl mb-4">Submit Flag</h3>
            {user ? (
              success ? (
                <p className="text-green-500">Challenge completed!</p>
              ) : (
                <form onSubmit={handleSubmitFlag}>
                  <input
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    className="w-full mb-4 px-4 py-3 bg-[#1A1F2E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9580FF]"
                    placeholder="Enter flag"
                  />
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <button
                    type="submit"
                    className="btn-secondary w-full"
                  >
                    Submit Flag
                  </button>
                </form>
              )
            ) : (
              <button
                onClick={() => router.push("/auth/signin")}
                className="btn-secondary w-full"
              >
                Sign in to submit
              </button>
            )}
          </div>

          {userProgress && (
            <div className="card">
              <p className="text-sm">
                Attempts: {userProgress.attempts || 0}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChallengePage;
