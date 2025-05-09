import mongoose from 'mongoose';
import * as argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  image: { type: String, default: "/images/default-avatar.svg" },
  bio: { type: String, default: "Security Enthusiast" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return argon2.verify(this.password, candidatePassword);
};

export const User = mongoose.models.User || mongoose.model('User', userSchema); 