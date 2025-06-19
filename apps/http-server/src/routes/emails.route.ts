import express from "express";
import { getFullEmail, getEmails, getRecentEmails } from "../controllers/emails.controller.js";

const router: express.Router = express.Router();

router.get("/", getEmails);

router.get("/body", getFullEmail);

router.get("/recent", getRecentEmails);

export default router;
