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
    const updatedResult = result.map((item) => {
      const date = new Date(item.timeStamp);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();

      const dateTIme = `${formattedTime}\n${formattedDate}`;
      let amount;
      let fromUser;
      let toUser;
      if (item.fromUser?.user.id === userId) {
        amount = `-${item.amount}`;
        fromUser = item.fromUser?.user;
        toUser = item.toUser?.user;
      } else {
        amount = `+${item.amount}`;
        fromUser = item.toUser?.user;
        toUser = item.fromUser?.user;
      }

      return { ...item, amount, fromUser, toUser, timestamp: dateTIme };
    });
    return res.json({ data: updatedResult });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export { getAllTransfers };
