import { apiEmail } from "@repo/api-client/apis";
import { create } from "zustand";
import { useUIStore } from "./useUIStore.ts";

const { setLoading, setError, setMessage } = useUIStore.getState();

interface Email {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  category: string;
  read: boolean;
  body?: string;
  profileImage?: string;
  senderEmail?: string;
  senderName?: string;
  to: string;
}

interface State {
  emails: Email[];
  setEmails: (emails: Email[]) => void;
  clearEmails: () => void;
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email) => void;
  clearSelectedEmail: () => void;
  getInbox: () => Promise<Email[]>;
  getFullEmail: (threadId: string) => Promise<Email>;
}

export const useEmailStore = create<State>((set) => ({
  emails: [],
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
  setSelectedEmail: (email) => {
    console.log("Setting selected email:", email);
    set((state) => ({
      selectedEmail: email,
      emails: state.emails.map((e) =>
        e.id === email.id ? { ...e, read: true } : e
      ),
    }));
  },
  clearSelectedEmail: () => {
    console.log("Clearing selected email");
    set({ selectedEmail: null });
  },
  getInbox: async () => {
    try {
      setLoading(true);
      const res = await apiEmail.getInbox();
      console.log("Fetched inbox emails:", res);
      set({ emails: res });
      return res;
    } catch (error) {
      console.error("Failed to fetch inbox emails", error);
      setError("Failed to fetch inbox emails");
      throw error;
    } finally {
      setLoading(false);
    }
  },
  getFullEmail: async (threadId: string) => {
    try {
      setLoading(true);
      const res = await apiEmail.getFullEmail(threadId);
      console.log("Fetched full email:", res);

      // Update both selectedEmail and mark the email as read in the list
      set((state) => ({
        selectedEmail: res,
        emails: state.emails.map((email) =>
          email.id === threadId ? { ...email, read: true } : email
        ),
      }));

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
