import express from "express";
import { incrementBalance, transferAmount } from "../controllers/account";
import { isLoggedIn } from "../middleware/auth";

const router = express.Router();

router.post("/transfer", isLoggedIn, transferAmount);
router.put("/balance/deposit", isLoggedIn, incrementBalance);

export default router;
