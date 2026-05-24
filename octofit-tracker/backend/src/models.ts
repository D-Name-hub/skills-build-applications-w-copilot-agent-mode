import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['student', 'coach', 'admin'] },
    age: Number,
    goals: [String],
  },
  { timestamps: true },
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    members: [{ type: String, required: true }],
    coach: { type: String, required: true },
    sport: { type: String, required: true },
  },
  { timestamps: true },
);

const activitySchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, unique: true },
    points: { type: Number, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    duration: { type: Number, required: true },
    focus: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
