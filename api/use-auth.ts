import { UseMutationOptions } from "@tanstack/react-query";
import {
  PasswordRequestVariables,
  ResendOtpVariables,
  SignupVariables,
  VerifcationVariables,
} from "./types";
import { useApiMutation, useApiMutationTwo } from "./use-api-request";

type SignupResponse = {
  [key: string]: any;
};

export function useSignupMutation(
  options?: UseMutationOptions<any, Error, any>
) {
  return useApiMutationTwo<any, any>("/clients/signup", options);
}

export function useVerificationMutation() {
  return useApiMutation<SignupResponse, VerifcationVariables>(
    "/clients/verify-otp",
    "post"
  );
}

export function useResendOtp() {
  return useApiMutation<SignupResponse, ResendOtpVariables>(
    "/clients/resend-otp",
    "post"
  );
}

export function useRequestMutation() {
  return useApiMutation<SignupResponse, PasswordRequestVariables>(
    "/clients/request-password-reset",
    "post"
  );
}

export function useResetPassword(token: string | undefined) {
  return useApiMutation<SignupResponse, PasswordRequestVariables>(
    `/clients/reset-password/${token}`,
    "post"
  );
}
