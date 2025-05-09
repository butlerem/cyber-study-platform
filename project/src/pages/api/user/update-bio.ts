import { NextApiRequest, NextApiResponse } from "next"; // Import Next.js API types
import mongoose from "mongoose"; // Import mongoose for MongoDB operations
import { User } from "../../../lib/models/User"; // Import User model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") { // Only allow POST requests
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, bio } = req.body; // Extract userId and bio from request body
  if (!userId || !bio) { // Validate required fields
    return res.status(400).json({ error: "Missing userId or bio" });
  }

  try {
    if (!mongoose.connections[0].readyState) { // Check if MongoDB is connected
      await mongoose.connect(process.env.MONGODB_URI!); // Connect if not
    }

    const objectId = new mongoose.Types.ObjectId(userId); // Convert string ID to ObjectId

    console.log("Attempting to update user bio for userId:", objectId, "with bio:", bio); // Log update attempt
    const updatedUser = await User.findByIdAndUpdate( // Find and update user
      objectId,
      { $set: { bio: bio } }, // Set new bio value
      { new: true } // Return updated document
    );

    if (!updatedUser) { // Check if user exists
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ // Return success response
      message: "Bio updated successfully",
      user: { // Return updated user data
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
        bio: updatedUser.bio
      }
    });
  } catch (error) { // Handle any errors
    console.error("Error updating bio:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
} 