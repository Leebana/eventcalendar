#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "Bootstrapping finance-tracking project in: $ROOT_DIR"

# create directories
mkdir -p src/routes src/services tests

# package.json
cat > package.json <<'EOF'
{
  "name": "financetracking",
  "version": "0.1.0",
  "private": true,
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest --runInBand"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.3",
    "@types/node": "^20.5.1",
    "@types/supertest": "^2.0.12",
    "jest": "^29.6.1",
    "supertest": "^6.4.3",
    "ts-jest": "^29.1.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.2"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "roots": ["<rootDir>/tests"]
  }
}
EOF

# tsconfig.json
cat > tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules", "dist"]
}
EOF

# .gitignore
cat > .gitignore <<'EOF'
node_modules/
dist/
.env
.vscode/
EOF

# src/index.ts
mkdir -p src
cat > src/index.ts <<'EOF'
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
EOF

# src/routes/transactions.ts
mkdir -p src/routes
cat > src/routes/transactions.ts <<'EOF'
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
EOF

# src/services/transactionService.ts
mkdir -p src/services
cat > src/services/transactionService.ts <<'EOF'
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
EOF

# tests/transaction.test.ts
mkdir -p tests
cat > tests/transaction.test.ts <<'EOF'
import request from "supertest";
import app from "../src/index";

describe("transactions API", () => {
  it("creates and lists transactions", async () => {
    const createRes = await request(app)
      .post("/transactions")
      .send({ title: "Coffee", amount: 3.5, type: "expense" })
      .expect(201);
    expect(createRes.body.id).toBeDefined();

    const listRes = await request(app).get("/transactions").expect(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.find((t: any) => t.id === createRes.body.id)).toBeTruthy();
  });

  it("returns 400 on bad payload", async () => {
    await request(app).post("/transactions").send({ title: "bad" }).expect(400);
  });
});
EOF

# README
cat > README.md <<'EOF'
# Finance Tracking (minimal scaffold)

Run locally:
1. npm install
2. npm run dev     # start server (ts-node-dev)
3. npm test        # run tests
EOF

chmod +x "$0" || true

echo "Installing npm packages (this may take a minute)..."
npm install

echo "Running tests..."
npm test || true

# Git init and optional push
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Add finance-tracking scaffold (express + typescript + tests)" || true
fi

read -r -p "Add git remote URL to push? (leave empty to skip): " GIT_REMOTE
if [ -n "${GIT_REMOTE:-}" ]; then
  set +e
  git remote remove origin >/dev/null 2>&1 || true
  git remote add origin "$GIT_REMOTE"
  git branch -M main >/dev/null 2>&1 || true
  read -r -p "Push to remote now? (y/N): " PUSH_ANS
  if [[ "$PUSH_ANS" =~ ^[Yy]$ ]]; then
    git push -u origin main
  else
    echo "Skipping push."
  fi
  set -e
else
  echo "No remote provided; skipping git push."
fi

echo "Bootstrap finished. To start dev server: npm run dev"
EOF