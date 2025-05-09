import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true 
  },
  challenge_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  completed: { type: Boolean, default: false },
  completed_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
});

export const UserProgress =
  mongoose.models.UserProgress ||
  mongoose.model("UserProgress", userProgressSchema);
