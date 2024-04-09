import { create } from 'zustand';

import { loginClient } from '@/api';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken, setUserData } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  hydrate: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  status: 'idle',
  token: null,
  signIn: async (email, password) => {
    try {
      const data = await loginClient(email, password);
      const { authToken, client } = data;
      setToken(authToken);
      setUserData(client);
      set({ status: 'signIn', token: authToken });
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        set({ status: 'signIn', token: userToken });
      } else {
        set({ status: 'signOut', token: null });
      }
    } catch (e) {
      console.error('Hydration error:', e);
      set({ status: 'signOut', token: null });
    }
  },
}));

export const useAuth = createSelectors(useAuthStore);

export const signOut = () => useAuthStore.getState().signOut();
export const hydrateAuth = () => useAuthStore.getState().hydrate();
