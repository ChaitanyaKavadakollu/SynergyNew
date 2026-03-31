import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserSession } from "../lib/roleRouter";

interface AuthState {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "synergy_user_session",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
