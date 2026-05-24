// Seed the octofit_db database with test data
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';
import { connectDatabase } from '../config/database.js';
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
const seedData = async () => {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase(mongoUri);
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        Leaderboard.deleteMany({}),
        Workout.deleteMany({}),
    ]);
    const users = await User.insertMany([
        {
            username: 'alex',
            email: 'alex@example.com',
            role: 'student',
            age: 15,
            goals: ['run 5k', 'improve strength'],
        },
        {
            username: 'maya',
            email: 'maya@example.com',
            role: 'coach',
            age: 28,
            goals: ['coach soccer team', 'log weekly workouts'],
        },
        {
            username: 'jordan',
            email: 'jordan@example.com',
            role: 'student',
            age: 16,
            goals: ['build endurance', 'join volleyball'],
        },
    ]);
    const teams = await Team.insertMany([
        {
            name: 'Ocean Explorers',
            members: ['alex', 'jordan'],
            coach: 'maya',
            sport: 'cross-country',
        },
        {
            name: 'Rocket Runners',
            members: ['maya'],
            coach: 'maya',
            sport: 'track',
        },
    ]);
    const activities = await Activity.insertMany([
        {
            user: 'alex',
            type: 'running',
            duration: 35,
            calories: 280,
            date: new Date('2026-05-20T08:00:00Z'),
        },
        {
            user: 'jordan',
            type: 'cycling',
            duration: 40,
            calories: 320,
            date: new Date('2026-05-21T12:30:00Z'),
        },
        {
            user: 'maya',
            type: 'strength',
            duration: 50,
            calories: 360,
            date: new Date('2026-05-22T17:00:00Z'),
        },
    ]);
    const leaderboard = await Leaderboard.insertMany([
        { user: 'alex', points: 1280, streak: 4 },
        { user: 'jordan', points: 1210, streak: 3 },
        { user: 'maya', points: 1400, streak: 5 },
    ]);
    const workouts = await Workout.insertMany([
        { title: 'Warm-up jog', difficulty: 'beginner', duration: 15, focus: 'mobility' },
        { title: 'Hill sprints', difficulty: 'advanced', duration: 20, focus: 'speed' },
        { title: 'Core strength circuit', difficulty: 'intermediate', duration: 30, focus: 'strength' },
    ]);
    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded activities:', activities.length);
    console.log('Seeded leaderboard:', leaderboard.length);
    console.log('Seeded workouts:', workouts.length);
};
seedData().catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exit(1);
});
