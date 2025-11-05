import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/financetracking',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    apiVersion: process.env.API_VERSION || 'v1',
};

export default config;