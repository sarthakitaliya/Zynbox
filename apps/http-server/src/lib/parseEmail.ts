import md5 from "md5";

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
  body?: string;
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

function extractBody(payload: any): string {
  const parts = payload?.parts || [];

  for (const part of parts) {
    if (part.mimeType === "text/plain" && part.body?.data) {
      return Buffer.from(part.body.data, "base64").toString("utf-8");
    }

    if (part.parts) {
      const inner = extractBody(part);
      if (inner) return inner;
    }
  }

  if (payload.body?.data) {
    return Buffer.from(payload.body.data, "base64").toString("utf-8");
  }

  return "";
}

export function parseEmail(fullMessage: any): ParsedEmail {
  const headers: GmailHeader[] = fullMessage.payload.headers || [];
  const from = extractHeader(headers, "From") || "(Unknown)";
  const to = extractHeader(headers, "To");
  const subject = extractHeader(headers, "Subject") || "(No Subject)";
  const date = formatEmailDate(extractHeader(headers, "Date"));
  const senderEmail = extractEmail(from);
  const profileImage = getGravatarUrl(senderEmail);
  const senderName = extractSenderName(from);

  return {
    id: fullMessage.id,
    snippet: fullMessage.snippet,
    from,
    senderEmail,
    senderName,
    profileImage,
    to,
    subject,
    date,
    labelIds: fullMessage.labelIds,
    body: extractBody(fullMessage.payload)
  };
}