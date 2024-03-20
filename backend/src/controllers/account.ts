import { Request, Response, NextFunction } from "express";
import { transferSchema } from "../validators";
import { createTransfer, addBalance } from "../db/account";
import { Env } from "..";
import Stripe from "stripe";

const stripe = new Stripe(Env.STRIPE_API_KEY);

const transferAmount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { toUserId, amount } = req.body;
    const validation = transferSchema.safeParse({ toUserId, amount });
    const fromUserId = res.locals.userId;
    const result = await createTransfer({ toUserId, fromUserId, amount });
    return res.json({
      message: "transfer successful",
      data: {
        amount: result.amount,
        toUser: result.toUser,
        id: result.id,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

const incrementBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount } = req.body;
    const userId = res.locals.userId;
    const result = await addBalance({ userId, amount });
    return res.json({ data: result, message: "balance added successfully" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};
const initiateDeposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount } = req.body;
    const userId = res.locals.userId;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      description: `${String(userId)} ${amount} `,
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      amount,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export { transferAmount, incrementBalance, initiateDeposit };
