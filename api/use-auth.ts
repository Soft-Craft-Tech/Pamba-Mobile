import {
  PasswordRequestVariables,
  ResendOtpVariables,
  SignupVariables,
  VerifcationVariables,
} from "./types";
import { useApiMutation } from "./use-api-request";

type SignupResponse = {
  [key: string]: any;
};

export function useSignupMutation() {
  return useApiMutation<SignupResponse, SignupVariables>(
    "/clients/signup",
    "post"
  );
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
