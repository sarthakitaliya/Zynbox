import express from "express";
import { getFullEmail, getInbox } from "../controllers/emails.controller.js";

const router: express.Router = express.Router();

router.get("/inbox", getInbox);

router.get("/body", getFullEmail);

// router.get("/starred");
// router.get("/archived");
// router.get("/drafts");
// router.get("/spam");
// router.get("/trash");
// router.get("/sent");

export default router;
