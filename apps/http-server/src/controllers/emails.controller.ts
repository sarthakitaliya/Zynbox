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
