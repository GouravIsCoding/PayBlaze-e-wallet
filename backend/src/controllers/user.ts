import { Request, Response, NextFunction } from "express";
import {
  createUser,
  getUser,
  getUserById,
  getUserList,
  uploadImage,
} from "../db/user";
import { comparePasswords, hashPassword } from "../lib/bcrypt";
import { userSchema, loginSchema } from "../validators";
import { sign, verify } from "jsonwebtoken";
import { Env } from "../index";
import { tokenInterface } from "../middleware/auth";
import { uploadOnCloudinary } from "../Cloudinary";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const validation = userSchema.safeParse({
      email,
      firstname,
      lastname,
      password,
    });
    if (!validation.success)
      return res
        .status(400)
        .json({ error: validation.error.errors[0].message });
    const hashedPassword = await hashPassword(password);
    const user = { email, password: hashedPassword, firstname, lastname };

    const result = await createUser(user);
    return res.json({
      message: "User created successfully.",
      data: result,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const validation = loginSchema.safeParse({
      email,
      password,
    });
    if (!validation.success)
      return res
        .status(400)
        .json({ error: validation.error.errors[0].message });

    const user = { email, password };

    const result = await getUser(user);
    const valid = await comparePasswords(password, result.password);
    if (!valid) return res.status(403).json({ error: "Wrong Password" });
    const token = sign(
      {
        id: result.id,
        email: result.email,
        firstname: result.firstname,
        lastname: result.lastname,
      },
      Env.JWT_SECRET
    );
    return res.json({
      message: "User login successful.",
      data: token,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.userId;
    const result = await getUserById(Number(userId));
    return res.json({
      data: result,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};
const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.userId;
    const filter = req.query.filter || "";
    const result = await getUserList(filter);
    const newResult = result.filter((item) => item.id != userId);
    return res.json({
      data: newResult,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};
const uploadProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userId;
    const filePath = req.file?.path;
    if (!filePath) return res.status(500).json({ error: "file upload failed" });
    uploadOnCloudinary(filePath)
      .then(async (profileImage) => {
        await uploadImage(
          profileImage?.public_id,
          profileImage?.secure_url,
          userId
        );
        return res.json({ message: "Successfully uploaded image" });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserInfo,
  searchUsers,
  uploadProfileImage,
};
