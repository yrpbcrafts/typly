import { create } from 'zustand';
import type { User } from '@/types/user';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const storedUser = localStorage.getItem('user');

export const useUserStore = create<UserStore>((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));