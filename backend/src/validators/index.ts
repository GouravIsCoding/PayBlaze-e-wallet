import { type } from "os";
import z from "zod";
// User related schema and types

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
});
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string(),
});

type UserType = z.infer<typeof userSchema>;
type loginUserType = Pick<UserType, "email" | "password">;

// Account related schema and types

const transferSchema = z.object({
  toUserId: z.number(),
  amount: z.number(),
});

const addBalanceSchema = z.object({
  amount: z.string(),
});

type transferType = {
  toUserId: number;
  fromUserId: number;
  amount: number;
};

type addBalanceType = {
  userId: number;
  amount: number;
};

export {
  userSchema,
  UserType,
  loginSchema,
  loginUserType,
  transferSchema,
  transferType,
  addBalanceType,
  addBalanceSchema,
};
