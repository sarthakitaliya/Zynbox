import { getGmailClient } from "./google";

export class gmailService {
  private gmail;
  constructor(userId: string) {
    this.gmail = getGmailClient(userId);
  }

  async listMessages(){
    const res: any = (await this.gmail).users.messages.list({
      userId: "me",
      maxResults: 10,
    })

    return res.data.messages || [];
  }
}