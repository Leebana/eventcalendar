export interface Transaction {
    id: string;
    amount: number;
    description: string;
    date: Date;
    category: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}