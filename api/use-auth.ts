import { useApiMutation } from "./use-api-request";

type SignupVariables = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type VerifcationVariables = {
  email: string;
  otp?: string;
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

export function useVerificationMutation() {
  return useApiMutation<SignupResponse, VerifcationVariables>(
    "/clients/verify-otp",
    "post"
  );
}

export function useResendOtp() {
  return useApiMutation<SignupResponse, VerifcationVariables>(
    "/clients/resend-otp",
    "post"
  );
}
