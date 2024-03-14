import { Request, Response, NextFunction } from "express";
import { getMyTransfers } from "../db/transaction";

const getAllTransfers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userId;
    const result = await getMyTransfers(userId);
    return res.json({ data: result });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export { getAllTransfers };
