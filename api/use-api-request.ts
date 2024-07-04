import { axiosClient } from "@/app/axiosClient";
import { showNotification } from "@/hooks/toastNotication";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type MutationHttpMethod = "post" | "put" | "patch" | "delete";

// Hook for GET requests
export function useApiQuery<TData>(
  endpoint: string
): UseQueryResult<ApiResponse<TData>, Error> {
  return useQuery<ApiResponse<TData>, Error>({
    queryKey: [endpoint],
    queryFn: async () => {
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
      const response = await axiosClient[method]<ApiResponse<TData>>(
        endpoint,
        variables
      );
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        showNotification("Error", error.response.data.message);
      }
    },
  });
}
