import { create } from "zustand";

export const useUIStore = create<State>((set) => ({
  loading: false,
  error: null,
  message: null,
  setLoading: (v) => set({ loading: v }),
  setError: (msg) => set({ error: msg }),
  setMessage: (msg) => set({ message: msg }),
}));

interface State {
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
  setMessage: (msg: string | null) => void;
}