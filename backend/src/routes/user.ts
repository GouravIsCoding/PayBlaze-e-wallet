import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  searchUsers,
  uploadProfileImage,
} from "../controllers/user";
import { isLoggedIn } from "../middleware/auth";
import { upload } from "../middleware/multer";

const router = express.Router();

router.get("/info", isLoggedIn, getUserInfo);

router.get("/search", isLoggedIn, searchUsers);

router.post("/picture", isLoggedIn, upload.single("image"), uploadProfileImage);
router.post("/signup", registerUser);

router.post("/signin", loginUser);

export default router;
