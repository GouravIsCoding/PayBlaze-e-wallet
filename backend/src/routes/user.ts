import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  searchUsers,
} from "../controllers/user";
import { isLoggedIn } from "../middleware/auth";

const router = express.Router();

router.get("/info", isLoggedIn, getUserInfo);

router.get("/search", isLoggedIn, searchUsers);

router.post("/signup", registerUser);

router.post("/signin", loginUser);

export default router;
