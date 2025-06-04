import { apiEmail } from "@repo/api-client/apis";
import { create } from "zustand";
import { useUIStore } from "./useUIStore.ts";

const { setLoading, setError, setMessage } = useUIStore.getState();
export const useEmailStore = create<State>((set) => ({
  emails: [],
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
}));
interface State {
  emails: any[];
  selectedEmail: any | null;
  setSelectedEmail: (email: any) => void;
  clearSelectedEmail: () => void;
  getInbox: () => Promise<void>;
}
