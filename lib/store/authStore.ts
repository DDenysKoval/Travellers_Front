import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", 
    }
  )
);
