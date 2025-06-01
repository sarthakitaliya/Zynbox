import { apiEmail } from "@repo/api-client/apis";
import { create } from "zustand";

export const useEmailStore = create<State>((set) => ({
  inbox: [],
  getInbox: async () => {
    const res = await apiEmail.getInbox();
    console.log("Fetched inbox emails:", res);
    set({ inbox: res });
    return res;
  },
}));
interface State {
  inbox: any[];
  getInbox: () => Promise<void>;
}
