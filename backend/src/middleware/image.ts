import { Request, Response, NextFunction } from "express";
import { getUserById } from "../db/user";
import { destroyOnCloudinary } from "../Cloudinary";

export const destroyImageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userId;
    const result = await getUserById(userId);
    if (!result.image_id) return next();
    await destroyOnCloudinary(result.image_id);
    return next();
  } catch (error) {
    if (error instanceof Error)
      return res.status(403).json({
        error: error.message,
      });
  }
};
