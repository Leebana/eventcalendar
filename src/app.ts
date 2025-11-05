import express from 'express';
import { json } from 'body-parser';
import { connectDB } from './db';
import { setTransactionRoutes } from './routes/transactionRoutes';
import { logger } from './utils/logger';
import { config } from './config';

const app = express();
const PORT = config.PORT || 3000;

app.use(json());
app.use(logger);

connectDB()
    .then(() => {
        setTransactionRoutes(app);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });