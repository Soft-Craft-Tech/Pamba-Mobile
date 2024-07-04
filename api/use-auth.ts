import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "./use-api-request";

type SignupVariables = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type SignupResponse = {
  userId: string;
  token: string;
};

export function useSignupMutation() {
  return useApiMutation<SignupResponse, SignupVariables>(
    "/clients/signup",
    "post"
  );
}
