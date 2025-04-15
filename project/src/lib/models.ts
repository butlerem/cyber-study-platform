import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  challengesCompleted: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  difficulty: { type: String, required: true },
  points: { type: Number, required: true },
  flag: { type: String, required: true },
  server_credentials: { type: mongoose.Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now }
});

const userProgressSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  challenge_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  completed: { type: Boolean, default: false },
  attempts: { type: Number, default: 0 },
  completed_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);
export const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', userProgressSchema); 