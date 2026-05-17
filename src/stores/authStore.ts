import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserPublic } from "../apis/types";

type AuthState = {
  user: UserPublic | null;
  setUser: (user: UserPublic) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "auth" },
  ),
);
