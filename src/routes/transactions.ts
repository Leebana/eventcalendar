import { Router, Request, Response } from "express";
import { addTransaction, listTransactions, deleteTransaction } from "../services/transactionService";

export const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(listTransactions());
});

router.post("/", (req: Request, res: Response) => {
  const { title, amount, type } = req.body;
  if (!title || typeof amount !== "number") {
    return res.status(400).json({ error: "invalid payload" });
  }
  const tx = addTransaction({ title, amount, type: type || "other" });
  res.status(201).json(tx);
});

router.delete("/:id", (req: Request, res: Response) => {
  const ok = deleteTransaction(req.params.id);
  res.status(ok ? 204 : 404).end();
});
