import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/authUtils";
import { User, Camera, Calendar, Mail, Edit2, X } from "lucide-react";

interface UserProgress {
  challengeId: string;
  title: string;
  completed: boolean;
  completedAt: string | null;
  points: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [memberSince, setMemberSince] = useState<string>("");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchUserProfile = () => {
      if (!user) return;

      try {
        const storedProfile = localStorage.getItem(`profile_${user.id}`);
        if (storedProfile) {
          const profile = JSON.parse(storedProfile);
          setUsername(profile.username || "Anonymous Hacker");
          setBio(profile.bio || "Click to add bio");
          setAvatarUrl(profile.avatar_url);
          setMemberSince(profile.member_since);
        } else {
          const defaultUsername =
            user.email?.split("@")[0] || "Anonymous Hacker";
          const now = new Date().toLocaleDateString();

          const newProfile = {
            username: defaultUsername,
            bio: "Click to add bio",
            avatar_url: null,
            member_since: now,
          };

          localStorage.setItem(
            `profile_${user.id}`,
            JSON.stringify(newProfile)
          );
          setUsername(defaultUsername);
          setBio("Click to add bio");
          setMemberSince(now);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try refreshing the page.");
      }
    };

    fetchProgress();
    fetchUserProfile();
  }, [user, router]);

  const handleUpdateUsername = () => {
    if (!user || !username.trim()) return;

    try {
      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      const profile = storedProfile ? JSON.parse(storedProfile) : {};

      profile.username = username.trim();

      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));
      setEditing(false);
    } catch (err) {
      console.error("Error updating username:", err);
      setError("Failed to update username. Please try again.");
    }
  };

  const handleUpdateBio = () => {
    if (!user) return;

    try {
      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      const profile = storedProfile ? JSON.parse(storedProfile) : {};

      profile.bio = bio.trim();

      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));
      setEditingBio(false);
    } catch (err) {
      console.error("Error updating bio:", err);
      setError("Failed to update bio. Please try again.");
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      const fileUrl = URL.createObjectURL(file);

      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      const profile = storedProfile ? JSON.parse(storedProfile) : {};

      profile.avatar_url = fileUrl;

      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));

      setAvatarUrl(fileUrl);
      setShowAvatarModal(false);
    } catch (err) {
      console.error("Error uploading avatar:", err);
      setError("Failed to upload avatar. Please try again.");
    }
  };

  const handleSelectIcon = (iconNumber: number) => {
    if (!user) return;

    try {
      const iconUrl = `/images/icon${iconNumber}.png`;

      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      const profile = storedProfile ? JSON.parse(storedProfile) : {};

      profile.avatar_url = iconUrl;

      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));

      setAvatarUrl(iconUrl);
      setShowAvatarModal(false);
    } catch (err) {
      console.error("Error selecting icon:", err);
      setError("Failed to select icon. Please try again.");
    }
  };

  const fetchProgress = async () => {
    try {
      const mockProgress: UserProgress[] = [
        // Mock progress data for testing
      ];
      setProgress(mockProgress);
    } catch (err) {
      setError("Failed to load progress");
    } finally {
      setLoading(false);
    }
  };

  // Move sorting logic outside JSX for better performance
  const sortedProgress = [...progress].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;

    if (a.completed && b.completed) {
      const dateA = a.completedAt ? new Date(a.completedAt) : new Date(0);
      const dateB = b.completedAt ? new Date(b.completedAt) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    }
    return b.points - a.points;
  });

  const totalPoints = progress.reduce(
    (sum, p) => sum + (p.completed ? p.points : 0),
    0
  );
  const completedChallenges = progress.filter((p) => p.completed).length;
  const totalChallenges = progress.length;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
          <div className="text-white">Loading dashboard...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
          <div className="text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
            <p className="text-xl text-gray-400">
              Track your progress and achievements
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Section - Left Side */}
            <div className="w-full md:w-1/3">
              <div className="bg-[#12121A] rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-[#1A1F2E] overflow-hidden">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-8 text-gray-400" />
                      )}
                    </div>
                    <button
                      onClick={() => setShowAvatarModal(true)}
                      className="absolute bottom-0 right-0 p-2 bg-[#9580FF] rounded-full cursor-pointer hover:bg-[#6E54C8] transition-colors"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="text-center w-full">
                    {editing ? (
                      <div className="flex flex-col items-center gap-2">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="bg-[#1A1F2E] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9580FF] text-center"
                          placeholder="Enter username"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditing(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleUpdateUsername}
                            className="bg-[#9580FF] text-white px-4 py-2 rounded-md hover:bg-[#6E54C8]"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-center">
                          {username || "Anonymous Hacker"}
                        </h2>
                        <button
                          onClick={() => setEditing(true)}
                          className="text-[#9580FF] hover:text-[#6E54C8] mt-1"
                        >
                          Edit
                        </button>
                      </div>
                    )}

                    {/* Bio Section */}
                    <div className="mt-4 w-full">
                      {editingBio ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="bg-[#1A1F2E] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9580FF] w-full"
                            placeholder="Tell us about yourself..."
                            rows={3}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingBio(false)}
                              className="text-gray-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleUpdateBio}
                              className="bg-[#9580FF] text-white px-4 py-2 rounded-md hover:bg-[#6E54C8]"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="bg-[#1A1F2E] p-4 rounded-md text-gray-300 cursor-pointer hover:bg-[#2A2F3E] transition-colors"
                          onClick={() => setEditingBio(true)}
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-sm">{bio}</p>
                            <Edit2 className="w-4 h-4 text-gray-500 hover:text-[#9580FF]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Email Display - Moved under bio */}
                    <div className="mt-4 flex items-center justify-center text-gray-400">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{user?.email || "No email provided"}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Member since {memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats and Progress - Right Side */}
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
                <div className="bg-[#12121A] rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-medium text-white">
                    Total Points
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-[#9580FF]">
                    {totalPoints}
                  </p>
                </div>
                <div className="bg-[#12121A] rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-medium text-white">
                    Challenges Completed
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-[#9580FF]">
                    {completedChallenges}/{totalChallenges}
                  </p>
                </div>
                <div className="bg-[#12121A] rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-medium text-white">
                    Completion Rate
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-[#9580FF]">
                    {totalChallenges > 0
                      ? Math.round(
                          (completedChallenges / totalChallenges) * 100
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Challenge Progress
                </h2>
                <div className="bg-[#12121A] rounded-lg shadow-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Challenge
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Completed
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {sortedProgress.map((item) => (
                        <tr
                          key={item.challengeId}
                          className="hover:bg-[#1A1F2E]"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {item.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.completed
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-gray-500/10 text-gray-400"
                              }`}
                            >
                              {item.completed ? "Completed" : "Not Started"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9580FF]">
                            {item.points}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {item.completedAt || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#12121A] rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                Choose Profile Picture
              </h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => handleSelectIcon(num)}
                  className="flex justify-center items-center"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#9580FF] hover:border-[#6E54C8] transition-colors">
                    <img
                      src={`/images/icon${num}.png`}
                      alt={`Icon ${num}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4">
              <label className="block w-full">
                <span className="text-white mb-2 block">
                  Or upload your own photo
                </span>
                <input
                  type="file"
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#9580FF] file:text-white
                    hover:file:bg-[#6E54C8]"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
