import { Request, Response } from "express";
import * as emailService from "../services/email.service";

export const getEmails = async (req: Request, res: Response) => {
  try {
    const { filter = "inbox" } = req.query;
    
    const queryMap: Record<string, string> = {
      inbox: "", 
      starred: "is:starred",
      sent: "in:sent",
      drafts: "in:drafts",
      spam: "in:spam",
      trash: "in:trash",
      archived: "is:archived",
    };
    const gmailQuery = queryMap[filter as string] || "";
    const emails = await emailService.getEmails(req.user.id, gmailQuery);
    console.log("Fetched inbox emails:", emails);
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inbox emails" });
  }
};

export const getFullEmail = async (
  req: Request<{}, {}, {}, { threadId?: string }>,
  res: Response
) => {
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
