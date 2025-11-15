import { User } from "@/types/user";
import { create } from "zustand";

export interface AuthStore {
  isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (value: boolean) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => {
    set(()=>({user, isAuthenticated: !!user}))
    },
  setIsAuthenticated: (value) => {
    set({ isAuthenticated: value });
  },
  clearIsAuthenticated: () => {
    set(()=>({user:null, isAuthenticated: false}))
  },
}))