import express from "express";
import cors from "cors";
import path from "path";
// import { router as transactionsRouter } from "./routes/transactions";
import { router as eventsRouter } from "./routes/events";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// app.use("/transactions", transactionsRouter);
app.use("/events", eventsRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
