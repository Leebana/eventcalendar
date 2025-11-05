import express from "express";
import cors from "cors";
import { router as transactionsRouter } from "./routes/transactions";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/transactions", transactionsRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
