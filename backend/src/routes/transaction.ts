import express from "express";

import { isLoggedIn } from "../middleware/auth";
import { getAllTransfers } from "../controllers/transaction";

const router = express.Router();

router.get("/transfer", isLoggedIn, getAllTransfers);

export default router;
