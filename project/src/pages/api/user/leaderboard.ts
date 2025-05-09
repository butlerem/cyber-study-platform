import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "../../../lib/models/User";
import { UserProgress } from "../../../lib/models/UserProgress";
import { Challenge } from "../../../lib/models/Challenge";

interface LeanUserDocument {
  _id: mongoose.Types.ObjectId;
  username?: string;
  email?: string;
  image?: string;
  bio?: string;
}

interface LeanUserProgressDocument {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  challenge_id: mongoose.Types.ObjectId;
  completed: boolean;
  completed_at: Date | null;
  created_at: Date;
}

interface LeanChallengeDocument {
  _id: mongoose.Types.ObjectId;
  points: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        maxPoolSize: 10,
        minPoolSize: 5,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
    }
    console.log("MongoDB connection established");

    console.log("Fetching users...");
    const users = await User.find({})
      .select('_id username email image bio')
      .lean() as LeanUserDocument[];
    
    console.log(`Found ${users.length} users`);
    
    // Log user details including bio
    users.forEach(user => {
      console.log("Raw user data from DB:", {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        hasBio: !!user.bio
      });
    });

    console.log("Fetching user progress...");
    const userProgress = (await UserProgress.find({ completed: true }).lean()) as unknown as LeanUserProgressDocument[];
    console.log(`Found ${userProgress.length} completed challenges`);

    console.log("Fetching challenges...");
    const challenges = (await Challenge.find({}, "id points").lean()) as unknown as LeanChallengeDocument[];
    console.log(`Found ${challenges.length} challenges`);

    // Create a map of challenge IDs to their points
    const challengePointsMap = new Map(
      challenges.map(challenge => [challenge._id.toString(), challenge.points])
    );

    // Calculate points and completed challenges for each user
    const leaderboardData = users.map(user => {
      // Filter progress for this user
      const userChallenges = userProgress.filter(progress => 
        progress.user_id.toString() === user._id.toString()
      );
      
      // Calculate total points based on actual challenge points
      const points = userChallenges.reduce((total, progress) => {
        const points = challengePointsMap.get(progress.challenge_id.toString()) || 0;
        return total + points;
      }, 0);

      // Strong fallback for avatar
      let avatar = user.image;
      if (!avatar || typeof avatar !== 'string' || avatar.trim() === "") {
        avatar = "/images/default-avatar.svg";
      }

      // Only use fallback if bio is actually undefined
      const bio = user.bio === undefined ? "Security Enthusiast" : user.bio;
      
      console.log(`Processing leaderboard entry for ${user.username}:`, {
        bio,
        hasBio: !!user.bio
      });
      
      return {
        id: user._id.toString(),
        username: user.username || user.email?.split('@')[0] || 'Anonymous',
        points,
        avatar,
        completedChallenges: userChallenges.length,
        bio
      };
    });

    // Sort by points in descending order
    const sortedLeaderboard = leaderboardData.sort((a, b) => b.points - a.points);

    // Add rank
    const leaderboardWithRank = sortedLeaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

    console.log("Sending leaderboard data...");
    res.status(200).json(leaderboardWithRank);
  } catch (error) {
    console.error("Detailed error in leaderboard API:", error);
    res.status(500).json({ 
      error: "Failed to fetch leaderboard data",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
