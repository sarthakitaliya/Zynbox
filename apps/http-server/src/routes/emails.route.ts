import express, { Router } from "express";
import { getInbox } from "../controllers/emails.controller.js";


const router: Router = express.Router();

router.get("/inbox", getInbox);
// router.get("/starred");
// router.get("/archived");
// router.get("/drafts");
// router.get("/spam");
// router.get("/trash");
// router.get("/sent");

export default router;
