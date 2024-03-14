import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { json } from "stream/consumers";
import { Env } from "../index";

export interface tokenInterface {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authArr = req.headers.authorization?.split(" ");

    if (authArr?.length !== 2) {
      return res.status(403).json({
        message: "Authorization failed",
      });
    }
    const [Bearer, token] = authArr;
    if (Bearer != "Bearer")
      return res.status(403).json({
        message: "Authorization failed",
      });
    const verified = verify(token, Env.JWT_SECRET);

    if (!verified)
      return res.status(403).json({
        message: "Authorization failed",
      });

    res.locals.userId = (verified as tokenInterface).id;
    return next();
  } catch (error) {
    if (error instanceof Error)
      return res.status(403).json({
        error: error.message,
      });
  }
};

export { isLoggedIn };
