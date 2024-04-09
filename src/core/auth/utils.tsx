import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'authToken';

const USERDATA = 'client';

export type TokenType = string;
type UserData = {
  email: string;
  id: number;
  name: string;
  phone: number;
  verified: true;
};

export type NameType = string;

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);
export const setUserData = (value: UserData) =>
  setItem<UserData>(USERDATA, value);
export const getUserData = () => getItem<UserData>(USERDATA);
