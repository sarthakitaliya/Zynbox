import { apiEmail } from "@repo/api-client/apis";
import { create } from "zustand";
import { useUIStore } from "./useUIStore.ts";

const { setLoading, setError, setMessage } = useUIStore.getState();
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
    set({ selectedEmail: email });
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
    }finally{
      setLoading(false);
    }
  },
  getFullEmail: async (threadId: string) => {
    try {
      setLoading(true);
      const res = await apiEmail.getFullEmail(threadId);
      console.log("Fetched full email:", res);
      set({ selectedEmail: res });
      return res;
    } catch (error) {
      console.error("Failed to fetch full email", error);
      setError("Failed to fetch full email");
      throw error;
    } finally {
      setLoading(false);
    }
  }
}));

interface State {
  emails: any[];
  setEmails: (emails: any[]) => void;
  clearEmails: () => void;
  selectedEmail: any | null;
  setSelectedEmail: (email: any) => void;
  clearSelectedEmail: () => void;
  getInbox: () => Promise<any[]>;
  getFullEmail: (threadId: string) => Promise<any>;
}
