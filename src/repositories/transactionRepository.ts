class TransactionRepository {
    constructor(database) {
        this.database = database;
    }

    async saveTransaction(transaction) {
        try {
            const result = await this.database.collection('transactions').insertOne(transaction);
            return result.ops[0];
        } catch (error) {
            throw new Error('Error saving transaction: ' + error.message);
        }
    }

    async findAllTransactions() {
        try {
            const transactions = await this.database.collection('transactions').find().toArray();
            return transactions;
        } catch (error) {
            throw new Error('Error fetching transactions: ' + error.message);
        }
    }

    async findTransactionById(id) {
        try {
            const transaction = await this.database.collection('transactions').findOne({ _id: id });
            return transaction;
        } catch (error) {
            throw new Error('Error finding transaction: ' + error.message);
        }
    }

    async deleteTransaction(id) {
        try {
            const result = await this.database.collection('transactions').deleteOne({ _id: id });
            return result.deletedCount > 0;
        } catch (error) {
            throw new Error('Error deleting transaction: ' + error.message);
        }
    }
}

export default TransactionRepository;