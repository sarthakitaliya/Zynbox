import express from "express";
import { getFullEmail, getEmails, getRecentEmails, archiveThread, trashThread, starThread } from "../controllers/emails.controller.js";

const router: express.Router = express.Router();

router.get("/", getEmails);

router.get("/body", getFullEmail);

router.get("/recent", getRecentEmails);

router.post("/archive", archiveThread);

router.post("/trash", trashThread);

router.post("/star", starThread);

export default router;
