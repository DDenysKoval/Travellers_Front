import { User } from "@/types/user";
import { create } from "zustand";

export interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(()=>({user:user, isAuthenticated: true}))
  },
  clearIsAuthenticated: () => {
    set(()=>({user:null, isAuthenticated: false}))
  },
}))