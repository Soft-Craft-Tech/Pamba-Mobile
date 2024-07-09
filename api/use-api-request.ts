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
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

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

const getHeaders = () => ({
  "Content-Type": "application/json",
  "X-API-KEY": "0837e78c2bbaa018a74ddcf00eda51680ec252377a912baa62",
  "x-access-token": accessToken as string,
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
      const response = await axios.get(`${API_BASE_URL}${url}`, {
        params,
        headers: getHeaders(),
      });
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
      const response = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        variables,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    },
    ...options,
  });
};
