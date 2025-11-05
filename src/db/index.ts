import { MongoClient } from 'mongodb';
import { config } from '../config';

const uri = config.DB_URI;

export const connectDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Database connected successfully');
        return client;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};