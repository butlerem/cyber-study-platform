import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Challenge } from "../../../lib/models/Challenge";
import { UserProgress } from "../../../lib/models/UserProgress";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Get all challenges
    const challenges = await db.collection('challenges').find({}).toArray();

    // Create initial progress entries for each challenge
    const progressEntries = challenges.map((challenge) => ({
      userId: new mongoose.Types.ObjectId(userId),
      challengeId: challenge._id,
      status: 'not_started',
      attempts: 0,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert progress entries
    await db.collection('user_progress').insertMany(progressEntries);

    return res.status(200).json({
      message: "User progress initialized successfully",
      count: progressEntries.length,
    });
  } catch (error) {
    console.error("Error initializing user progress:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
} 