export class TransactionModel {
    id: string;
    amount: number;
    description: string;
    date: Date;

    constructor(id: string, amount: number, description: string, date: Date) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.date = date;
    }

    static fromData(data: any): TransactionModel {
        return new TransactionModel(data.id, data.amount, data.description, new Date(data.date));
    }

    toData(): any {
        return {
            id: this.id,
            amount: this.amount,
            description: this.description,
            date: this.date.toISOString(),
        };
    }
}