import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/authUtils";
import { User, Camera, Calendar, Mail, Edit2, X } from "lucide-react";
import { motion } from "framer-motion";
import SpaceBackground from "../components/SpaceBackground";

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
  const [mongoUserId, setMongoUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Fetch MongoDB _id for the current user
    const fetchMongoUserId = async () => {
      try {
        console.log("Fetching MongoDB ID for user:", user.email);
        const res = await fetch(`/api/user/check?email=${encodeURIComponent(user.email)}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Received MongoDB user data:", data);
          setMongoUserId(data.user.id);
          
          // Set initial avatar from database
          if (data.user.avatar) {
            setAvatarUrl(data.user.avatar);
          }
          
          // Set initial bio from database
          if (data.user.bio) {
            setBio(data.user.bio);
          }
        }
      } catch (err) {
        console.error("Failed to fetch MongoDB user id", err);
      }
    };
    fetchMongoUserId();

    const fetchUserProfile = () => {
      if (!user) return;

      try {
        const storedProfile = localStorage.getItem(`profile_${user.id}`);
        if (storedProfile) {
          const profile = JSON.parse(storedProfile);
          setUsername(profile.username || "Anonymous Hacker");
          setBio(profile.bio || "Click to add bio");
          setAvatarUrl(profile.avatar_url || "/images/default-avatar.svg");
          setMemberSince(profile.member_since);
        } else {
          const defaultUsername =
            user.email?.split("@")[0] || "Anonymous Hacker";
          const now = new Date().toLocaleDateString();

          const newProfile = {
            username: defaultUsername,
            bio: "Click to add bio",
            avatar_url: "/images/default-avatar.svg",
            member_since: now,
          };

          localStorage.setItem(
            `profile_${user.id}`,
            JSON.stringify(newProfile)
          );
          setUsername(defaultUsername);
          setBio("Click to add bio");
          setAvatarUrl("/images/default-avatar.svg");
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

  const handleUpdateUsername = async () => {
    if (!user || !username.trim() || !mongoUserId) return;

    try {
      // Update in local storage
      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      const profile = storedProfile ? JSON.parse(storedProfile) : {};
      profile.username = username.trim();
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));

      // Update in database using MongoDB _id
      const response = await fetch("/api/user/update-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: mongoUserId, newUsername: username.trim() })
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to update username in database");
        return;
      }
      setEditing(false);
    } catch (err) {
      console.error("Error updating username:", err);
      setError("Failed to update username. Please try again.");
    }
  };

  const handleUpdateBio = async () => {
    if (!user || !bio.trim() || !mongoUserId) return; // Validate required fields

    try {
      const storedProfile = localStorage.getItem(`profile_${user.id}`); // Get current profile from storage
      const profile = storedProfile ? JSON.parse(storedProfile) : {}; // Parse or create new profile
      profile.bio = bio.trim(); // Update bio in profile
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile)); // Save updated profile

      const response = await fetch("/api/user/update-bio", { // Send update request to API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: mongoUserId, bio: bio.trim() }) // Send userId and bio
      });
      if (!response.ok) { // Handle API errors
        const data = await response.json();
        setError(data.error || "Failed to update bio in database");
        return;
      }
      setEditingBio(false); // Close edit mode on success
    } catch (err) { // Handle any errors
      console.error("Error updating bio:", err);
      setError("Failed to update bio. Please try again.");
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !mongoUserId) return;

    try {
      const fileUrl = URL.createObjectURL(file);

      // Update in local storage
      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      const profile = storedProfile ? JSON.parse(storedProfile) : {};
      profile.avatar_url = fileUrl;
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));

      // Update in database
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('userId', mongoUserId);

      fetch("/api/user/update-avatar", {
        method: "POST",
        body: formData
      }).then(response => {
        if (!response.ok) {
          throw new Error("Failed to update avatar in database");
        }
        setAvatarUrl(fileUrl);
        setShowAvatarModal(false);
      });
    } catch (err) {
      console.error("Error uploading avatar:", err);
      setError("Failed to upload avatar. Please try again.");
    }
  };

  const handleRemoveAvatar = () => {
    if (!user || !mongoUserId) return;

    try {
      // Update in local storage
      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      const profile = storedProfile ? JSON.parse(storedProfile) : {};
      profile.avatar_url = null;
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));

      // Update in database
      fetch("/api/user/remove-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: mongoUserId })
      }).then(response => {
        if (!response.ok) {
          throw new Error("Failed to remove avatar in database");
        }
        setAvatarUrl(null);
        setShowAvatarModal(false);
      });
    } catch (err) {
      console.error("Error removing avatar:", err);
      setError("Failed to remove avatar. Please try again.");
    }
  };

  const handleSelectIcon = (iconNumber: number) => {
    if (!user || !mongoUserId) return;

    try {
      const iconUrl = `/images/icon${iconNumber}.png`;

      // Update in local storage
      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      const profile = storedProfile ? JSON.parse(storedProfile) : {};
      profile.avatar_url = iconUrl;
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));

      // Update in database
      fetch("/api/user/update-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: mongoUserId, avatarUrl: iconUrl })
      }).then(response => {
        if (!response.ok) {
          throw new Error("Failed to update avatar in database");
        }
        setAvatarUrl(iconUrl);
        setShowAvatarModal(false);
      });
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
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #000000, #111111)' }}>
        {/* 3D Space Animation Background */}
        <SpaceBackground />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
              <p className="text-xl text-gray-400">
                Track your progress and achievements
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Profile Section - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full md:w-1/3"
              >
                <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-white/10 hover:border-white/20 transition-colors duration-300">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 rounded-full bg-white/5 overflow-hidden border-2 border-white/10 hover:border-white/20 transition-colors duration-300">
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
                        className="absolute bottom-0 right-0 p-2 bg-[#9580FF]/20 backdrop-blur-sm rounded-full cursor-pointer hover:bg-[#9580FF]/30 transition-colors duration-300 border border-[#9580FF] hover:border-[#9580FF]/80"
                      >
                        <Camera className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="text-center w-full">
                      {editing ? (
                        <div className="flex flex-col items-center gap-4">
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-[#1A1F2E] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9580FF] text-center w-full"
                            placeholder="Enter username"
                          />
                          <div className="flex gap-4">
                            <button
                              onClick={() => setEditing(false)}
                              className="bg-transparent border-2 border-white/20 text-white py-2 px-4 rounded-[100px] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleUpdateUsername}
                              className="bg-[#9580FF]/20 backdrop-blur-sm border-2 border-[#9580FF] text-white py-2 px-4 rounded-[100px] hover:bg-[#9580FF]/30 hover:border-[#9580FF]/80 transition-all duration-300"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <h2 className="text-2xl font-bold text-center text-white">
                            {username || "Anonymous Hacker"}
                          </h2>
                          <button
                            onClick={() => setEditing(true)}
                            className="text-[#9580FF] hover:text-[#9580FF]/80 mt-2 transition-colors duration-300"
                          >
                            Edit
                          </button>
                        </div>
                      )}

                      {/* Bio Section */}
                      <div className="mt-6 w-full">
                        {editingBio ? (
                          <div className="flex flex-col gap-4">
                            <textarea
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              className="bg-[#1A1F2E] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9580FF] w-full"
                              placeholder="Tell us about yourself..."
                              rows={3}
                            />
                            <div className="flex justify-end gap-4">
                              <button
                                onClick={() => setEditingBio(false)}
                                className="bg-transparent border-2 border-white/20 text-white py-2 px-4 rounded-[100px] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleUpdateBio}
                                className="bg-[#9580FF]/20 backdrop-blur-sm border-2 border-[#9580FF] text-white py-2 px-4 rounded-[100px] hover:bg-[#9580FF]/30 hover:border-[#9580FF]/80 transition-all duration-300"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="bg-[#1A1F2E] p-4 rounded-md text-gray-300 cursor-pointer hover:bg-[#2A2F3E] transition-colors duration-300"
                            onClick={() => setEditingBio(true)}
                          >
                            <div className="flex justify-between items-start">
                              <p className="text-sm">{bio}</p>
                              <Edit2 className="w-4 h-4 text-gray-500 hover:text-[#9580FF] transition-colors duration-300" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex flex-col gap-4">
                        <div className="flex items-center justify-center text-gray-400">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>{user?.email || "No email provided"}</span>
                        </div>
                        <div className="flex items-center justify-center text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Member since {memberSince}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats and Progress - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full md:w-2/3"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-12">
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
                    <h3 className="text-lg font-medium text-white">
                      Total Points
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-[#9580FF]">
                      {totalPoints}
                    </p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
                    <h3 className="text-lg font-medium text-white">
                      Challenges Completed
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-[#9580FF]">
                      {completedChallenges}/{totalChallenges}
                    </p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
                    <h3 className="text-lg font-medium text-white">
                      Completion Rate
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-white/60">
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
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10">
                    <table className="min-w-full divide-y divide-white/10">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                            Challenge
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                            Points
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                            Completed
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {sortedProgress.map((item) => (
                          <tr
                            key={item.challengeId}
                            className="hover:bg-white/5 transition-colors duration-300"
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
              </motion.div>
            </div>
          </div>
        </div>

        {/* Avatar Selection Modal */}
        {showAvatarModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/20 backdrop-blur-sm rounded-lg p-6 max-w-sm w-full border border-white/10"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Profile Picture
                </h3>
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="border-t border-white/10 pt-4">
                <label className="block w-full mb-4">
                  <span className="text-white mb-2 block">
                    Upload your own photo
                  </span>
                  <input
                    type="file"
                    onChange={handleAvatarUpload}
                    accept="image/*"
                    className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-[100px] file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#9580FF]/20 file:text-white
                      file:border-2 file:border-[#9580FF]
                      hover:file:bg-[#9580FF]/30 hover:file:border-[#9580FF]/80
                      transition-all duration-300"
                  />
                </label>
                <button
                  onClick={handleRemoveAvatar}
                  className="w-full bg-transparent border-2 border-white/20 text-white py-2 px-4 rounded-[100px] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                >
                  Remove Photo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
}
