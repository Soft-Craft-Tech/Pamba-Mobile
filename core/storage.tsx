import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(JSON.stringify(value)) || null : null;
}

export async function removeItem(key: string): Promise<void> {
  await storage.delete(key);
}

export async function setItem(key: string, value: string): Promise<void> {
  await storage.set(key, value);
}

export function getAllKeys(): string[] {
  return storage.getAllKeys();
}

export async function getNewItem(
  key: string
): Promise<string | undefined | null> {
  try {
    const value = await storage.getString(key);
    return value;
  } catch (error) {
    console.error(`Error getting item with key '${key}':`, error);
    return null;
  }
}
