import { gmailClient } from "../lib/gmailClient.js";


export const getInbox = async (userId: string) => {
  try {
    const g = new gmailClient();
    await g.init(userId);
    console.log("Gmail client initialized for user:", userId);

    const messages = await g.listEmails("in:inbox", 10);
    console.log("Fetched messages:", messages);

    return messages;
  } catch (error) {
    console.error("Error fetching inbox:", error);
    throw new Error("Failed to fetch inbox");
  }
};
