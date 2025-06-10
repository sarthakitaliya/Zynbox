import express from "express";
import { getFullEmail, getEmails } from "../controllers/emails.controller.js";

const router: express.Router = express.Router();

router.get("/", getEmails);

router.get("/body", getFullEmail);


export default router;
