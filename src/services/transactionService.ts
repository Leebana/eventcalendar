import { v4 as uuidv4 } from "uuid";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: string;
  createdAt: string;
};

let store: Transaction[] = [];

export function listTransactions(): Transaction[] {
  return store;
}

export function addTransaction(payload: { title: string; amount: number; type?: string }): Transaction {
  const tx: Transaction = {
    id: uuidv4(),
    title: payload.title,
    amount: payload.amount,
    type: payload.type || "other",
    createdAt: new Date().toISOString()
  };
  store.push(tx);
  return tx;
}

export function deleteTransaction(id: string): boolean {
  const before = store.length;
  store = store.filter((t) => t.id !== id);
  return store.length < before;
}
