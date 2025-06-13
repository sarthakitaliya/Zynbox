import { apiEmail } from "@repo/api-client/apis";
import { create } from "zustand";
import { useUIStore } from "./useUIStore.ts";

const { setLoading, setError, setMessage } = useUIStore.getState();

interface Email {
  threadId: string;
  messageCount: number;
  latest: {
    from: string;
    subject: string;
    snippet: string;
    date: string;
    category: string;
    read: boolean;
    body?: {
      content: string;
      contentType: string;
    };
    profileImage?: string;
    senderEmail?: string;
    senderName?: string;
    to: string;
  };
}
interface threadEmail {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  category: string;
  read: boolean;
  body?: {
    content: string;
    contentType: string;
  };
  profileImage?: string;
  senderEmail?: string;
  senderName?: string;
  to: string;
}
interface threadEmail {
  threadId: string;
  subject: string;
  messageCount: number;
  messages: threadEmail[];
}
interface State {
  emails: Email[];
  selectedThread: threadEmail | null;
  loadingList: boolean;
  setEmails: (emails: Email[]) => void;
  clearEmails: () => void;
  selectedEmail: { threadId: string; message: Email[] } | null;
  setSelectedThread: (
    email: threadEmail | null
  ) => void;
  clearSelectedEmail: () => void;
  getEmails: (filter: string) => Promise<Email[]>;
  getFullEmail: (threadId: string) => Promise<Email>;
}

export const useEmailStore = create<State>((set) => ({
  emails: [],
  selectedThread: null,
  loadingList: false,
  setEmails: (emails) => {
    console.log("Setting emails:", emails);
    set({ emails });
  },
  clearEmails: () => {
    console.log("Clearing emails");
    set({ emails: [] });
    set({ selectedEmail: null });
  },
  selectedEmail: null,
  setSelectedThread: (email) => {
    console.log("Setting selected thread:", email);
    
    set({ selectedThread: email });
  },
  clearSelectedEmail: () => {
    console.log("Clearing selected email");
    set({ selectedEmail: null });
  },
  getEmails: async (filter) => {
    try {
      set({ loadingList: true });
      const res = await apiEmail.getEmails(filter);
      console.log("Fetched emails:", res);
      set({ emails: res });
      return res;
    } catch (error) {
      console.error("Failed to fetch emails", error);
      setError("Failed to fetch emails");
      throw error;
    } finally {
      set({ loadingList: false });
    }
  },
  getFullEmail: async (threadId: string) => {
    try {
      setLoading(true);
      const res = await apiEmail.getFullEmail(threadId);
      console.log("Fetched full email:", res);

      // Update both selectedEmail and mark the email as read in the list
      set({selectedThread: res});

      return res;
    } catch (error) {
      console.error("Failed to fetch full email", error);
      setError("Failed to fetch full email");
      throw error;
    } finally {
      setLoading(false);
    }
  },
}));
