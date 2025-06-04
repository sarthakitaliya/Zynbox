import { Request, Response } from "express";
import * as emailService from "../services/email.service";

export const getInbox = async (req: Request, res: Response) => {
  try {
    console.log("Fetching inbox for user:", req.user.id);
    const emails = await emailService.getInbox(req.user.id);
    console.log("Fetched inbox emails:", emails);
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inbox emails" });
  }
};

export const getFullEmail = async (req: Request<{}, {}, {}, { threadId?: string }>, res: Response) => {
  try {
    const { threadId } = req.query;
    if (!threadId) {
      res.status(400).json({ message: "Email thread ID is required" });
      return;
    }
    const email = await emailService.getEmailById(req.user.id, threadId);
    if (!email) {
      res.status(404).json({ message: "Email not found" });
      return;
    }
    res.status(200).json(email);
  } catch (error) {
    res.status(500).json({ message: "Error fetching email" });
  }
};