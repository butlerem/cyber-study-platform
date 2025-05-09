import { NextApiRequest, NextApiResponse } from "next";
import mongoose, { LeanDocument } from "mongoose";
import { Challenge } from "../../../lib/models/Challenge";
import { UserProgress } from "../../../lib/models/UserProgress";

interface ChallengeDocument {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  flag: string;
  points: number;
  category: string;
  difficulty: string;
  created_at: Date;
  updated_at: Date;
}

type LeanChallengeDocument = LeanDocument<ChallengeDocument>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        maxPoolSize: 10,
        minPoolSize: 5,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
    }

    // Get all challenges
    const challenges = await Challenge.find({}).lean() as LeanChallengeDocument[];
    console.log(`Found ${challenges.length} challenges`);

    // Get existing progress entries for the user
    const existingProgress = await UserProgress.find({ user_id }).lean();
    console.log(`Found ${existingProgress.length} existing progress entries`);

    // Create a map of challenge IDs that already have progress entries
    const existingChallengeIds = new Set(
      existingProgress.map((p) => p.challenge_id.toString())
    );

    // Create progress entries for challenges that don't have one
    const newProgressEntries = challenges
      .filter((c) => !existingChallengeIds.has(c._id.toString()))
      .map((challenge) => ({
        user_id,
        challenge_id: challenge._id,
        completed: false,
        attempts: 0,
        completed_at: null,
        created_at: new Date(),
      }));

    if (newProgressEntries.length > 0) {
      await UserProgress.insertMany(newProgressEntries);
      console.log(`Created ${newProgressEntries.length} new progress entries`);
    }

    res.status(200).json({
      message: `Initialized ${newProgressEntries.length} progress entries`,
      total_challenges: challenges.length,
      existing_progress: existingProgress.length,
      new_progress: newProgressEntries.length,
    });
  } catch (error) {
    console.error("Error initializing user progress:", error);
    res.status(500).json({
      error: "Failed to initialize user progress",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
} 