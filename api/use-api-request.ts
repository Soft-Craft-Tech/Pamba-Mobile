import {
  API_BASE_URL,
  axiosStrategy,
  createAxiosClient,
} from "@/app/axiosClient";
import { getItem } from "@/core/storage";
import { showNotification } from "@/hooks/toastNotication";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  [key: string]: any;
};

type MutationHttpMethod = "post" | "put" | "patch" | "delete";

// Hook for GET requests
export function useApiQuery<TData>(
  endpoint: string
): UseQueryResult<ApiResponse<TData>, Error> {
  return useQuery<ApiResponse<TData>, Error>({
    queryKey: [endpoint],
    queryFn: async () => {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get<ApiResponse<TData>>(endpoint);
      return response.data;
    },
  });
}

// Hook for mutation requests (POST, PUT, PATCH, DELETE)
export function useApiMutation<TData, TVariables>(
  endpoint: string,
  method: MutationHttpMethod = "post"
): UseMutationResult<ApiResponse<TData>, Error, TVariables> {
  return useMutation<ApiResponse<TData>, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await axiosStrategy[method]<ApiResponse<TData>>(
        endpoint,
        variables
      );
      return response.data;
    },
    onSuccess: (data) => {
      showNotification("Success", data?.message);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error?.response) {
        showNotification("Error", error?.response?.data?.message);
      }
    },
  });
}
const accessToken = getItem("authenticationToken");

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const useApiQueryTwo = (
  endpoint: string,
  queryParams = {},
  options = {}
) => {
  return useQuery({
    queryKey: [endpoint, queryParams],
    queryFn: async ({ queryKey }) => {
      const [url, params] = queryKey;
      const response = await axiosInstance.get(url as string, { params });
      return response.data;
    },
    ...options,
  });
};

export const useApiMutationTwo = <TData = unknown, TVariables = unknown>(
  endpoint: string,
  options: UseMutationOptions<TData, Error, TVariables> = {}
) => {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await axiosInstance.post(endpoint, variables);
      return response.data;
    },
    ...options,
  });
};

export const usePutMutation = <TData = unknown, TVariables = unknown>(
  endpoint: string,
  options: UseMutationOptions<TData, Error, TVariables> = {}
) => {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await axiosInstance.put(endpoint, variables);
      return response.data;
    },
    ...options,
  });
};

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Set headers using the proper method
    config.headers.set("Content-Type", "application/json");
    config.headers.set(
      "X-API-KEY",
      "0837e78c2bbaa018a74ddcf00eda51680ec252377a912baa62"
    );
    config.headers.set("x-access-token", accessToken as string);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
