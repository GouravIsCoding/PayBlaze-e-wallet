import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
interface env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  ClOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

const Env: env = {
  DATABASE_URL: process.env.DATABASEURL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  ClOUDINARY_CLOUD_NAME: process.env.ClOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};

export { Env };

import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/user";
import accountRouter from "./routes/account";
import transactionRouter from "./routes/transaction";

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/account", accountRouter);
app.use("/transaction", transactionRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
