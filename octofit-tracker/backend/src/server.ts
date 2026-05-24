import { pathToFileURL } from 'node:url';
import express from 'express';
import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

export const app = express();
const port = Number(process.env.PORT ?? 8000);
const host = process.env.HOST ?? '0.0.0.0';
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API is running',
    status: 'ok',
    apiUrl: apiBaseUrl,
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    apiUrl: apiBaseUrl,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).lean();
  res.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

async function startServer() {
  app.listen(port, host, async () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);

    try {
      await connectDatabase(mongoUri);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
    }
  });
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  startServer();

  process.on('SIGINT', async () => {
    await disconnectDatabase();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await disconnectDatabase();
    process.exit(0);
  });
}
