import { create } from "zustand";

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

interface State {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}
interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
