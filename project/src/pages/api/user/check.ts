import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "../../../lib/models/User";

interface UserDocument {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  image?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user by email from query string
    const email = req.query.email as string;
    if (!email) {
      return res.status(400).json({ error: "Missing email query param" });
    }
    const user = await User.findOne({ email }).lean() as UserDocument | null;
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User found",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        image: user.image
      }
    });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ 
      error: "Failed to check user",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
} 