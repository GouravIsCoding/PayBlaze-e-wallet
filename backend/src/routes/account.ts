import express from "express";
import {
  incrementBalance,
  initiateDeposit,
  transferAmount,
} from "../controllers/account";
import { isLoggedIn } from "../middleware/auth";

const router = express.Router();

router.post("/transfer", isLoggedIn, transferAmount);
router.put("/balance/deposit/initiate", isLoggedIn, initiateDeposit);
router.put("/balance/deposit/complete", isLoggedIn, incrementBalance);

export default router;
