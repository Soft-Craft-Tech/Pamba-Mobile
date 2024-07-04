import React from "react";
import { useStorageState } from "./(tabs)/useStorageState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "./axiosClient";
import { AxiosError } from "axios";

interface User {
  id: string;
  name: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session: User | null;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useSession(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({
  children,
}: SessionProviderProps): JSX.Element {
  const [[isLoading, storedSession], setStoredSession] =
    useStorageState("session");
  const [session, setSession] = React.useState<User | null>(() =>
    storedSession ? (JSON.parse(storedSession) as User) : null
  );
  const queryClient = useQueryClient();

  const signInMutation = useMutation<User, AxiosError, SignInCredentials>({
    mutationFn: async (credentials: SignInCredentials) => {
      const response = await axiosClient.post<User>("/api/signin", credentials);
      return response.data;
    },
    onSuccess: (data: User) => {
      setSession(data);
      setStoredSession(JSON.stringify(data));
      queryClient.setQueryData(["user"], data);
    },
    onError: (error: AxiosError) => {
      console.error("Sign in error:", error);
    },
  });

  const signOutMutation = useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      await axiosClient.post("/api/signout");
    },
    onSuccess: () => {
      setSession(null);
      setStoredSession(null);
      queryClient.clear();
    },
    onError: (error: AxiosError) => {
      console.error("Sign out error:", error);
    },
  });

  const contextValue: AuthContextType = {
    signIn: async (email: string, password: string) => {
      await signInMutation.mutateAsync({ email, password });
    },
    signOut: async () => {
      await signOutMutation.mutateAsync();
    },
    session,
    isLoading:
      isLoading || signInMutation.isPending || signOutMutation.isPending,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
