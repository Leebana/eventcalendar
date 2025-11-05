import { Router } from 'express';
import TransactionController from '../controllers/transactionController';

const router = Router();
const transactionController = new TransactionController();

export const setTransactionRoutes = (app) => {
    app.use('/api/transactions', router);
    
    router.post('/', transactionController.createTransaction.bind(transactionController));
    router.get('/', transactionController.getTransactions.bind(transactionController));
};