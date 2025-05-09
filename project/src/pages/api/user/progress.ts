import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { UserProgress } from "../../../lib/models/UserProgress";

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
          const { user_id, challenge_id } = req.query;
          const query: any = {};

          if (user_id) query.user_id = user_id;
          if (challenge_id) query.challenge_id = challenge_id;

          const progress = await UserProgress.find(query).populate(
            "challenge_id"
          );
          res.status(200).json(progress);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch user progress" });
        }
        break;

      case "POST":
        try {
          const progress = await UserProgress.create(req.body);
          res.status(201).json(progress);
        } catch (error) {
          console.error("Error creating progress:", error);
          res.status(500).json({ error: "Failed to create user progress", details: error instanceof Error ? error.message : "Unknown error" });
        }
        break;

      case "PUT":
        try {
          const { id } = req.query;
          const progress = await UserProgress.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.status(200).json(progress);
        } catch (error) {
          res.status(500).json({ error: "Failed to update user progress" });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed", details: error instanceof Error ? error.message : "Unknown error" });
  }
}
