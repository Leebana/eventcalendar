class TransactionController {
    constructor(private transactionService: TransactionService) {}

    async createTransaction(req: Request, res: Response): Promise<Response> {
        try {
            const transactionData = req.body;
            const newTransaction = await this.transactionService.addTransaction(transactionData);
            return res.status(201).json(newTransaction);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating transaction', error });
        }
    }

    async getTransactions(req: Request, res: Response): Promise<Response> {
        try {
            const transactions = await this.transactionService.fetchTransactions();
            return res.status(200).json(transactions);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching transactions', error });
        }
    }
}

export default TransactionController;