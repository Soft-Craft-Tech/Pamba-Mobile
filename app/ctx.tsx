import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { useStorageState } from "@/core/useStorageState";
import { showNotification } from "@/hooks/toastNotication";
import { axiosClient } from "./axiosClient";
import { setItem } from "@/core/storage";

interface ErrorResponse {
  message: string;
  // Add other properties if needed
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface User {
  [key: string]: any;
}

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void; // Changed from Promise<void> to void
  session: User | null;
  isLoading: boolean;
}

const postWithAuthorization = async (
  url: string,
  credentials: SignInCredentials
): Promise<AxiosResponse> => {
  const credentialsBase64 = btoa(
    `${credentials.username}:${credentials.password}`
  );
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "0837e78c2bbaa018a74ddcf00eda51680ec252377a912baa62",
      Authorization: `Basic ${credentialsBase64}`,
    },
  };
  return axios.post(url, {}, config);
};

export const postWithoutAuthorization = async (
  url: string
): Promise<AxiosResponse> => {
  return axiosClient.post(url);
};

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
  const [storedSession, setStoredSession] = useStorageState("session");
  const [session, setSession] = React.useState<User | null>(() =>
    storedSession ? (JSON.parse(storedSession) as User) : null
  );
  const queryClient = useQueryClient();

  const isLoading = storedSession === null;

  React.useEffect(() => {
    console.log("Session updated:", session);
  }, [session]);

  React.useEffect(() => {
    console.log("Stored session updated:", storedSession);
  }, [storedSession]);

  const signInMutation = useMutation<
    User,
    AxiosError<ErrorResponse>,
    SignInCredentials
  >({
    mutationFn: async (credentials: SignInCredentials) => {
      console.log("Attempting to sign in with:", credentials);
      const response = await postWithAuthorization(
        "https://pamba-web.onrender.com/API/clients/login",
        credentials
      );
      console.log("API response:", response);
      return response.data.authToken;
    },
    onSuccess: (data: User) => {
      setItem("userData", data);
      setSession((prevSession) => {
        console.log("Updating session from:", prevSession, "to:", data);
        return data;
      });
      setStoredSession(JSON.stringify(data));
      queryClient.setQueryData(["user"], data);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error("Sign in error:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error response data:", error.response.data);
        showNotification("Error", error.response.data.message);
      } else {
        console.log("Unexpected error:", error);
      }
    },
  });

  const signOut = () => {
    setSession(null);
    setStoredSession(null);
    queryClient.clear();
  };

  const contextValue: AuthContextType = {
    signIn: async (username: string, password: string) => {
      try {
        await signInMutation.mutateAsync({ username, password });
        console.log("Sign in completed");
      } catch (error) {
        console.error("Error during sign in:", error);
        throw error;
      }
    },
    signOut,
    session,
    isLoading: isLoading || signInMutation.isPending,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
