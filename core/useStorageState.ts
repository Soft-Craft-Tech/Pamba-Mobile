import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";
import { getItem, removeItem, setItem } from "./storage";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(
  key: string
): [string | null, (value: string | null) => void] {
  const [state, setState] = React.useState<string | null>(() => {
    return getItem(key);
  });

  React.useEffect(() => {
    setState(getItem(key));
  }, [key]);

  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      if (value === null) {
        removeItem(key);
      } else {
        setItem(key, value);
      }
    },
    [key]
  );

  return [state, setValue];
}
