import md5 from "md5";
// Removed DOMPurify imports
import linkifyHtml from "linkify-html";

interface GmailHeader {
  name: string;
  value: string;
}

export interface ParsedEmail {
  id: string;
  snippet?: string;
  from: string;
  senderEmail: string;
  profileImage: string;
  to?: string;
  subject: string;
  date?: string;
  labelIds?: string[];
  body?: {
    content: string;
    type: "html" | "plain";
  };
  senderName?: string;
}

function extractHeader(headers: GmailHeader[], key: string): string | undefined {
  return headers.find(h => h.name.toLowerCase() === key.toLowerCase())?.value;
}

function extractEmail(fromValue: string): string {
  const match = fromValue.match(/<(.+?)>/);
  //@ts-ignore
  return match ? match[1] : fromValue;
}

function getGravatarUrl(email: string): string {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

function extractSenderName(fromValue: string): string {
  const match = fromValue.match(/^(.*?)</);
  return match && match[1] ? match[1].trim().replace(/"|'/g, '') : fromValue;
}

function formatEmailDate(rawDate?: string): string | undefined {
  if (!rawDate) return undefined;
  const date = new Date(rawDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  }); // e.g., "Jun 02"
}

function extractBody(payload: any): { content: string; type: "html" | "plain" } {
  let htmlContent: string | null = null;
  let plainContent: string | null = null;

  const walkParts = (node: any) => {
    const parts = node?.parts || [];
    for (const part of parts) {
      if (part.mimeType === "text/html" && part.body?.data) {
        const html = Buffer.from(part.body.data, "base64").toString("utf-8");
        htmlContent = html;
      }

      if (part.mimeType === "text/plain" && part.body?.data) {
        const text = Buffer.from(part.body.data, "base64").toString("utf-8");
        const linkified = linkifyHtml(text.replace(/\r?\n/g, "<br>"), { target: "_blank" });
        plainContent = linkified;
      }

      if (part.parts) walkParts(part);
    }
  };

  walkParts(payload);

  if (htmlContent) return { content: htmlContent, type: "html" };
  if (plainContent) return { content: plainContent, type: "plain" };

  if (payload.body?.data) {
    const fallback = Buffer.from(payload.body.data, "base64").toString("utf-8");
    const type = payload.mimeType === "text/html" ? "html" : "plain";
    if (type === "html") {
      return { content: fallback, type: "html" };
    } else {
      const linkified = linkifyHtml(fallback.replace(/\r?\n/g, "<br>"), { target: "_blank" });
      return { content: linkified, type: "plain" };
    }
  }

  return { content: "", type: "plain" };
}

export function parseEmail(mail: any): ParsedEmail {
  const headers: GmailHeader[] = mail.payload.headers || [];
  const from = extractHeader(headers, "From") || "(Unknown)";
  const to = extractHeader(headers, "To");
  const subject = extractHeader(headers, "Subject") || "(No Subject)";
  const date = formatEmailDate(extractHeader(headers, "Date"));
  const senderEmail = extractEmail(from);
  const profileImage = getGravatarUrl(senderEmail);
  const senderName = extractSenderName(from);

  return {
    id: mail.id,
    snippet: mail.snippet,
    from,
    senderEmail,
    senderName,
    profileImage,
    to,
    subject,
    date,
    labelIds: mail.labelIds,
    body: extractBody(mail.payload)
  };
}