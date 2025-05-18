import express, { Router } from "express";
import { googleAuth, googleCallback } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = express.Router();
router.use(authMiddleware);

router.get("/connect-account", googleAuth);
router.get("/google/callback", googleCallback);

export default router;
