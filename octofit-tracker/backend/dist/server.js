import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit';
app.use(express.json());
app.get('/', (_req, res) => {
    res.json({
        message: 'OctoFit Tracker API is running',
        status: 'ok',
    });
});
app.get('/health', (_req, res) => {
    res.json({
        status: 'healthy',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
});
function startServer() {
    app.listen(port, async () => {
        console.log(`OctoFit Tracker backend listening on port ${port}`);
        try {
            await mongoose.connect(mongoUri);
            console.log('MongoDB connected');
        }
        catch (error) {
            console.error('MongoDB connection failed:', error);
        }
    });
}
startServer();
process.on('SIGINT', async () => {
    await mongoose.disconnect().catch(() => undefined);
    process.exit(0);
});
