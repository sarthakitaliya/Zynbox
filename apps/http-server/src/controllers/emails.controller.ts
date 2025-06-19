import { Request, Response } from "express";
import * as emailService from "../services/email.service";

export const getEmails = async (req: Request, res: Response) => {
  try {
    const { filter = "inbox" } = req.query;
    
    const queryMap: Record<string, string> = {
      inbox: "in:inbox", 
      starred: "is:starred",
      sent: "in:sent",
      drafts: "in:drafts",
      spam: "in:spam",
      bin: "in:trash",
      archive: "is:archived",
    };
    const gmailQuery = queryMap[filter as string] || "";
    const emails = await emailService.getMergedInboxEmails(req.user.id, gmailQuery);
    console.log("Fetched emails:", emails);
    
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

export const getRecentEmails = async (
  req: Request<{}, {}, {}, { since?: string }>,
  res: Response
) => {
  try {
    const { since } = req.query;
    const timestamp = since ? parseInt(since) : Math.floor(Date.now() / 1000) - 60;

    const query = `in:inbox after:${timestamp}`;
    console.log("recent");
    
    const emails = await emailService.getEmails(req.user.id, query);
    console.log(emails);
    
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching recent emails:", error);
    res.status(500).json({ message: "Error fetching recent emails" });
  }
};
