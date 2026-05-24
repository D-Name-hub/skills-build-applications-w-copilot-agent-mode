import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer: MongoMemoryServer | null = null;

function shouldUseMemoryFallback(mongoUri: string) {
  return /localhost:27017|127\.0\.0\.1:27017/.test(mongoUri);
}

function isConnectionRefusedError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('ECONNREFUSED') || message.includes('connect ECONNREFUSED');
}

export async function connectDatabase(mongoUri: string) {
  try {
    await mongoose.connect(mongoUri);
    return null;
  } catch (error) {
    if (!shouldUseMemoryFallback(mongoUri) || !isConnectionRefusedError(error)) {
      throw error;
    }

    if (!memoryServer) {
      memoryServer = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbName: 'octofit_db',
        },
      });
      console.log('Started local MongoDB memory server on port 27017');
    }

    await mongoose.connect(memoryServer.getUri());
    return memoryServer;
  }
}

export async function disconnectDatabase() {
  await mongoose.disconnect().catch(() => undefined);

  if (memoryServer) {
    await memoryServer.stop().catch(() => undefined);
    memoryServer = null;
  }
}
