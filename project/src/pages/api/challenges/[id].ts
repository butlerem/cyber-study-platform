import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Challenge } from "../../../lib/models/Challenge";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Challenge ID is required" });
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

    const challenge = await Challenge.findById(id);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    res.status(200).json(challenge);
  } catch (error) {
    console.error("Error fetching challenge:", error);
    res.status(500).json({ 
      error: "Failed to fetch challenge", 
      details: error instanceof Error ? error.message : "Unknown error" 
    });
  }
}
