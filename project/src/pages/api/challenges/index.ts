import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Challenge } from "../../../lib/models/Challenge";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        maxPoolSize: 10,
        minPoolSize: 5,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
    }

    switch (req.method) {
      case "GET":
        try {
          const challenges = await Challenge.find({});
          res.status(200).json(challenges);
        } catch (error) {
          console.error("Error fetching challenges:", error);
          res.status(500).json({ error: "Failed to fetch challenges", details: error instanceof Error ? error.message : "Unknown error" });
        }
        break;

      case "POST":
        try {
          const challenge = await Challenge.create(req.body);
          res.status(201).json(challenge);
        } catch (error) {
          console.error("Error creating challenge:", error);
          res.status(500).json({ error: "Failed to create challenge", details: error instanceof Error ? error.message : "Unknown error" });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed", details: error instanceof Error ? error.message : "Unknown error" });
  }
}
