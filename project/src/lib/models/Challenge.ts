import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  difficulty: { type: String, required: true },
  points: { type: Number, required: true },
  flag: { type: String, required: true },
  server_credentials: { type: mongoose.Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now },
});

export const Challenge =
  mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema);
