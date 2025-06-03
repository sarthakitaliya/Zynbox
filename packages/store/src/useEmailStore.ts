import { apiEmail } from "@repo/api-client/apis";
import { create } from "zustand";

export const useEmailStore = create<State>((set) => ({
  inbox: [],
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
    const res = await apiEmail.getInbox();
    console.log("Fetched inbox emails:", res);
    set({ inbox: res });
    return res;
  },
}));
interface State {
  inbox: any[];
    selectedEmail: any | null;
  setSelectedEmail: (email: any) => void;
  clearSelectedEmail: () => void;
  getInbox: () => Promise<void>;
}
